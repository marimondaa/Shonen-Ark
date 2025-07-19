#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Use built-in fetch (Node.js 18+)
const fetch = globalThis.fetch;

// Load environment variables from process.env (they should already be loaded)
// If you need to load a .env file, do it before running this script

interface N8nWorkflow {
  name: string;
  id: string;
  nodes: any[];
  connections: any;
  active: boolean;
  settings: any;
  versionId: string;
  meta: any;
  tags: any[];
}

interface N8nCredential {
  name: string;
  type: string;
  data: any;
}

class N8nDeployment {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

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
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'GET',
        headers: this.headers
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Deploy a workflow to n8n
   */
  async deployWorkflow(workflowPath: string): Promise<boolean> {
    try {
      console.log(`📋 Deploying workflow: ${path.basename(workflowPath)}`);
      
      const workflowData: N8nWorkflow = JSON.parse(fs.readFileSync(workflowPath, 'utf-8'));
      
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
      console.error(`❌ Error deploying workflow ${workflowPath}:`, error);
      return false;
    }
  }

  /**
   * Get workflow by name
   */
  private async getWorkflowByName(name: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (response.ok) {
        const workflows = await response.json();
        return workflows.data?.find((w: any) => w.name === name);
      }
      return null;
    } catch (error) {
      console.error('Error fetching workflows:', error);
      return null;
    }
  }

  /**
   * Activate a workflow
   */
  private async activateWorkflow(workflowId: string): Promise<boolean> {
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
      console.error('Error activating workflow:', error);
      return false;
    }
  }

  /**
   * Setup required credentials
   */
  async setupCredentials(): Promise<void> {
    console.log('🔑 Setting up credentials...');

    const credentials: N8nCredential[] = [
      {
        name: 'Railway PostgreSQL',
        type: 'postgres',
        data: {
          host: process.env.PGHOST || 'localhost',
          database: process.env.PGDATABASE || 'railway',
          user: process.env.PGUSER || 'postgres',
          password: process.env.PGPASSWORD || '',
          port: parseInt(process.env.PGPORT || '5432'),
          ssl: process.env.NODE_ENV === 'production'
        }
      },
      {
        name: 'SMTP Email Service',
        type: 'smtp',
        data: {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          user: process.env.SMTP_USER || '',
          password: process.env.SMTP_PASSWORD || ''
        }
      },
      {
        name: 'Twitter OAuth2',
        type: 'twitterOAuth2Api',
        data: {
          clientId: process.env.TWITTER_CLIENT_ID || '',
          clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
          accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
          accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
        }
      }
    ];

    for (const credential of credentials) {
      await this.createOrUpdateCredential(credential);
    }
  }

  /**
   * Create or update a credential
   */
  private async createOrUpdateCredential(credential: N8nCredential): Promise<void> {
    try {
      // Check if credential exists
      const response = await fetch(`${this.baseUrl}/credentials`, {
        method: 'GET',
        headers: this.headers
      });

      if (response.ok) {
        const credentials = await response.json();
        const existing = credentials.data?.find((c: any) => c.name === credential.name);

        if (existing) {
          console.log(`🔄 Updating credential: ${credential.name}`);
          await fetch(`${this.baseUrl}/credentials/${existing.id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(credential)
          });
        } else {
          console.log(`🆕 Creating credential: ${credential.name}`);
          await fetch(`${this.baseUrl}/credentials`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(credential)
          });
        }
        console.log(`✅ Credential ready: ${credential.name}`);
      }
    } catch (error) {
      console.error(`❌ Error with credential ${credential.name}:`, error);
    }
  }

  /**
   * Deploy all workflows from the workflows directory
   */
  async deployAllWorkflows(): Promise<void> {
    console.log('🚀 Starting n8n workflow deployment...\n');

    // Test connection first
    const isConnected = await this.testConnection();
    if (!isConnected) {
      throw new Error('❌ Cannot connect to n8n instance. Check your N8N_API_URL and N8N_API_KEY.');
    }
    console.log('✅ Connected to n8n instance\n');

    // Setup credentials
    await this.setupCredentials();
    console.log('');

    // Deploy workflows
    const workflowsDir = path.join(process.cwd(), 'workflows');
    const workflowFiles = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.json'));

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
  async getWorkflowInfo(): Promise<void> {
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
          const webhookNodes = workflow.nodes?.filter((node: any) => node.type === 'n8n-nodes-base.webhook') || [];
          for (const webhook of webhookNodes) {
            const path = webhook.parameters?.path || '';
            const method = webhook.parameters?.httpMethod || 'POST';
            const webhookUrl = `${process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook'}/${path}`;
            console.log(`  📡 ${method} ${webhookUrl}`);
          }
        }
        console.log('='.repeat(50));
      }
    } catch (error) {
      console.error('Error fetching workflow info:', error);
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
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { N8nDeployment };
