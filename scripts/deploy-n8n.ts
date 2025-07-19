#!/usr/bin/env node

/**
 * n8n Workflow Deployment Script
 * Deploys workflow JSON files to n8n instance
 * Supports both staging and production environments
 */

import fs from 'fs';
import fetch, { Response } from 'node-fetch';

const path = require('path');

interface N8nWorkflow {
  id?: string;
  name: string;
  nodes: any[];
  connections: any;
  active: boolean;
  settings?: any;
  tags?: string[];
}

interface DeploymentConfig {
  n8nUrl: string;
  apiKey: string;
  environment: 'staging' | 'production';
  workflowsDir: string;
}

class N8nDeployer {
  private config: DeploymentConfig;

  constructor(config: DeploymentConfig) {
    this.config = config;
  }

  /**
   * Deploy all workflows from the workflows directory
   */
  async deployAll(): Promise<void> {
    console.log(`🚀 Starting n8n deployment to ${this.config.environment}`);
    console.log(`📍 Target URL: ${this.config.n8nUrl}`);
    
    try {
      // Test connection first
      await this.testConnection();
      
      // Get workflow files
      const workflowFiles = this.getWorkflowFiles();
      console.log(`📁 Found ${workflowFiles.length} workflow files`);

      // Deploy each workflow
      const results = [];
      for (const file of workflowFiles) {
        const result = await this.deployWorkflow(file);
        results.push(result);
      }

      // Summary
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      console.log(`\n✅ Deployment Summary:`);
      console.log(`   Successful: ${successful}`);
      console.log(`   Failed: ${failed}`);
      console.log(`   Total: ${results.length}`);

      if (failed > 0) {
        console.log(`\n❌ Failed deployments:`);
        results.filter(r => !r.success).forEach(r => {
          console.log(`   - ${r.name}: ${r.error}`);
        });
        process.exit(1);
      }

      console.log(`\n🎉 All workflows deployed successfully!`);

    } catch (error) {
      console.error('❌ Deployment failed:', error);
      process.exit(1);
    }
  }

  /**
   * Test connection to n8n instance
   */
  private async testConnection(): Promise<void> {
    try {
      console.log(`🔍 Testing connection to: ${this.config.n8nUrl}`);
      
      const response = await fetch(`${this.config.n8nUrl}/api/v1/workflows`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(`Authentication failed: Invalid or expired API token. Status: ${response.status}`);
        } else if (response.status === 404) {
          throw new Error(`API endpoint not found. Check if n8n API is enabled and URL is correct. Status: ${response.status}`);
        } else {
          throw new Error(`Connection test failed: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log(`✅ Connection to n8n successful (found ${data?.data?.length || 0} workflows)`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('ECONNREFUSED')) {
        throw new Error(`Cannot connect to n8n at ${this.config.n8nUrl}. Is n8n running?`);
      } else if (errorMessage.includes('Authentication failed')) {
        console.log('');
        console.log('🔑 Authentication Help:');
        console.log('1. Open n8n in browser while logged in');
        console.log('2. Press F12 → Application tab → Local Storage');
        console.log('3. Find your n8n domain and copy the auth token');
        console.log('4. Set N8N_API_KEY environment variable');
        console.log('');
        throw new Error(`Authentication failed: ${errorMessage}`);
      }
      
      throw new Error(`Failed to connect to n8n: ${errorMessage}`);
    }
  }

  /**
   * Get all workflow JSON files
   */
  private getWorkflowFiles(): string[] {
    const workflowsPath = path.resolve(this.config.workflowsDir);
    
    if (!fs.existsSync(workflowsPath)) {
      throw new Error(`Workflows directory not found: ${workflowsPath}`);
    }

    const files = fs.readdirSync(workflowsPath)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(workflowsPath, file));

    if (files.length === 0) {
      throw new Error('No workflow JSON files found');
    }

    return files;
  }

  /**
   * Deploy a single workflow
   */
  private async deployWorkflow(filePath: string): Promise<{
    name: string;
    success: boolean;
    error?: string;
    id?: string;
  }> {
    const fileName = path.basename(filePath, '.json');
    
    try {
      // Read workflow file
      const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Validate workflow structure
      this.validateWorkflow(workflowData);
      
      // Check if workflow already exists
      const existingWorkflow = await this.findWorkflowByName(workflowData.name);
      
      let result;
      if (existingWorkflow) {
        // Update existing workflow
        console.log(`🔄 Updating workflow: ${workflowData.name}`);
        result = await this.updateWorkflow(existingWorkflow.id, workflowData);
      } else {
        // Create new workflow
        console.log(`➕ Creating workflow: ${workflowData.name}`);
        result = await this.createWorkflow(workflowData);
      }

      // Activate workflow if specified
      if (workflowData.active) {
        await this.activateWorkflow(result.id);
      }

      console.log(`✅ Successfully deployed: ${workflowData.name} (ID: ${result.id})`);
      
      return {
        name: fileName,
        success: true,
        id: result.id
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Failed to deploy ${fileName}:`, errorMessage);
      
      return {
        name: fileName,
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Validate workflow structure
   */
  private validateWorkflow(workflow: any): void {
    if (!workflow.name) {
      throw new Error('Workflow must have a name');
    }

    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
      throw new Error('Workflow must have nodes array');
    }

    if (workflow.nodes.length === 0) {
      throw new Error('Workflow must have at least one node');
    }

    // Check for required webhook nodes
    const hasWebhookTrigger = workflow.nodes.some(node => 
      node.type === 'n8n-nodes-base.webhook'
    );

    if (!hasWebhookTrigger) {
      console.warn(`⚠️  Warning: Workflow '${workflow.name}' has no webhook trigger`);
    }
  }

  /**
   * Find workflow by name
   */
  private async findWorkflowByName(name: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.n8nUrl}/api/v1/workflows`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workflows: ${response.statusText}`);
      }

      const workflows = await response.json();
      return workflows.data?.find((w: any) => w.name === name);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Warning: Could not search for existing workflow: ${errorMessage}`);
      return null;
    }
  }

  /**
   * Create new workflow
   */
  private async createWorkflow(workflow: N8nWorkflow): Promise<any> {
    const response = await fetch(`${this.config.n8nUrl}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflow)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create workflow: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  /**
   * Update existing workflow
   */
  private async updateWorkflow(id: string, workflow: N8nWorkflow): Promise<any> {
    const response = await fetch(`${this.config.n8nUrl}/api/v1/workflows/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflow)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update workflow: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  /**
   * Activate workflow
   */
  private async activateWorkflow(id: string): Promise<void> {
    const response = await fetch(`${this.config.n8nUrl}/api/v1/workflows/${id}/activate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to activate workflow: ${response.statusText}`);
    }

    console.log(`🟢 Workflow activated: ${id}`);
  }
}

/**
 * Main deployment function
 */
async function main() {
  try {
    // Get environment
    const environment = (process.env.NODE_ENV === 'production' && process.env.RAILWAY_ENVIRONMENT !== 'staging') 
      ? 'production' 
      : 'staging';

    // Configuration
    const config: DeploymentConfig = {
      n8nUrl: process.env.N8N_URL || 'http://localhost:5678',
      apiKey: process.env.N8N_API_KEY || '',
      environment,
      workflowsDir: process.env.WORKFLOWS_DIR || './workflows'
    };

    // Validate configuration
    if (!config.n8nUrl) {
      throw new Error('N8N_URL environment variable is required');
    }

    if (!config.apiKey) {
      throw new Error('N8N_API_KEY environment variable is required');
    }

    // Deploy workflows
    const deployer = new N8nDeployer(config);
    await deployer.deployAll();

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Deployment script failed:', errorMessage);
    process.exit(1);
  }
}

// CLI execution
if (require.main === module) {
  main();
}

export type { DeploymentConfig };
export { N8nDeployer };
