#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Use built-in fetch (Node.js 18+)
if (!globalThis.fetch) {
  console.error('❌ Node.js 18+ is required for built-in fetch support');
  process.exit(1);
}

class N8nDeployment {
  constructor() {
    this.baseUrl = process.env.N8N_API_URL || 'http://localhost:5678/api/v1';
    this.apiKey = process.env.N8N_API_KEY || '';
    
    if (!this.apiKey) {
      throw new Error('N8N_API_KEY environment variable is required');
    }

    this.headers = {
      'Content-Type': 'application/json',
      'X-N8N-API-KEY': this.apiKey,
      'Accept': 'application/json'
    };
  }

  /**
   * Test connection to n8n instance
   */
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'GET',
        headers: this.headers
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Connection test failed:', error.message);
      return false;
    }
  }

  /**
   * Deploy a workflow to n8n
   */
  async deployWorkflow(workflowPath) {
    try {
      console.log(`📋 Deploying workflow: ${path.basename(workflowPath)}`);
      
      const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf-8'));
      
      // Check if workflow already exists
      const existingWorkflow = await this.getWorkflowByName(workflowData.name);
      
      let response;
      
      if (existingWorkflow) {
        console.log(`🔄 Updating existing workflow: ${workflowData.name}`);
        response = await fetch(`${this.baseUrl}/workflows/${existingWorkflow.id}`, {
          method: 'PUT',
          headers: this.headers,
          body: JSON.stringify(workflowData)
        });
      } else {
        console.log(`🆕 Creating new workflow: ${workflowData.name}`);
        response = await fetch(`${this.baseUrl}/workflows`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(workflowData)
        });
      }

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully deployed: ${workflowData.name} (ID: ${result.id})`);
        
        // Activate workflow if it's not already active
        if (workflowData.active) {
          await this.activateWorkflow(result.id);
        }
        
        return true;
      } else {
        const error = await response.text();
        console.error(`❌ Failed to deploy ${workflowData.name}:`, error);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error deploying workflow ${workflowPath}:`, error.message);
      return false;
    }
  }

  /**
   * Get workflow by name
   */
  async getWorkflowByName(name) {
    try {
      const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (response.ok) {
        const workflows = await response.json();
        return workflows.data?.find((w) => w.name === name);
      }
      return null;
    } catch (error) {
      console.error('Error fetching workflows:', error.message);
      return null;
    }
  }

  /**
   * Activate a workflow
   */
  async activateWorkflow(workflowId) {
    try {
      const response = await fetch(`${this.baseUrl}/workflows/${workflowId}/activate`, {
        method: 'POST',
        headers: this.headers
      });
      
      if (response.ok) {
        console.log(`🟢 Activated workflow: ${workflowId}`);
        return true;
      } else {
        console.error(`❌ Failed to activate workflow: ${workflowId}`);
        return false;
      }
    } catch (error) {
      console.error('Error activating workflow:', error.message);
      return false;
    }
  }

  /**
   * Deploy all workflows from the workflows directory
   */
  async deployAllWorkflows() {
    console.log('🚀 Starting n8n workflow deployment...\n');

    // Test connection first
    const isConnected = await this.testConnection();
    if (!isConnected) {
      throw new Error('❌ Cannot connect to n8n instance. Check your N8N_API_URL and N8N_API_KEY.');
    }
    console.log('✅ Connected to n8n instance\n');

    // Deploy workflows
    const workflowsDir = path.join(process.cwd(), 'infrastructure', 'workflows');
    
    if (!fs.existsSync(workflowsDir)) {
      throw new Error(`❌ Workflows directory not found: ${workflowsDir}`);
    }
    
    const workflowFiles = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.json'));

    if (workflowFiles.length === 0) {
      console.log('⚠️  No workflow files found in workflows directory');
      return;
    }

    let successCount = 0;
    let totalCount = workflowFiles.length;

    for (const workflowFile of workflowFiles) {
      const workflowPath = path.join(workflowsDir, workflowFile);
      const success = await this.deployWorkflow(workflowPath);
      if (success) successCount++;
      console.log(''); // Add spacing between deployments
    }

    console.log('📊 Deployment Summary:');
    console.log(`✅ Successfully deployed: ${successCount}/${totalCount} workflows`);
    
    if (successCount === totalCount) {
      console.log('🎉 All workflows deployed successfully!');
      console.log('\n🔗 Access your n8n dashboard at:', process.env.N8N_WEB_URL || 'http://localhost:5678');
    } else {
      console.log(`⚠️  ${totalCount - successCount} workflows failed to deploy`);
    }
  }

  /**
   * Get workflow status and webhook URLs
   */
  async getWorkflowInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'GET',
        headers: this.headers
      });

      if (response.ok) {
        const workflows = await response.json();
        
        console.log('\n📋 Workflow Status:');
        console.log('='.repeat(50));
        
        for (const workflow of workflows.data || []) {
          const status = workflow.active ? '🟢 Active' : '🔴 Inactive';
          console.log(`${status} ${workflow.name} (ID: ${workflow.id})`);
          
          // Find webhook nodes and display URLs
          const webhookNodes = workflow.nodes?.filter((node) => node.type === 'n8n-nodes-base.webhook') || [];
          for (const webhook of webhookNodes) {
            const webhookPath = webhook.parameters?.path || '';
            const method = webhook.parameters?.httpMethod || 'POST';
            const webhookUrl = `${process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook'}/${webhookPath}`;
            console.log(`  📡 ${method} ${webhookUrl}`);
          }
        }
        console.log('='.repeat(50));
      }
    } catch (error) {
      console.error('Error fetching workflow info:', error.message);
    }
  }
}

// Main execution
async function main() {
  try {
    const deployer = new N8nDeployment();
    
    const command = process.argv[2] || 'deploy';
    
    switch (command) {
      case 'deploy':
        await deployer.deployAllWorkflows();
        await deployer.getWorkflowInfo();
        break;
      case 'info':
        await deployer.getWorkflowInfo();
        break;
      case 'test':
        const connected = await deployer.testConnection();
        console.log(connected ? '✅ Connection successful' : '❌ Connection failed');
        break;
      default:
        console.log('Usage: npm run deploy:n8n [deploy|info|test]');
    }
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { N8nDeployment };
