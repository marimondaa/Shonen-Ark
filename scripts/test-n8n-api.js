#!/usr/bin/env node

/**
 * n8n API Test Script
 * Tests connection to n8n API and helps debug authentication
 */

const fetch = require('node-fetch');

async function testN8nAPI() {
  const n8nUrl = process.env.N8N_URL || 'http://localhost:5678';
  
  console.log('🧪 Testing n8n API Access');
  console.log(`📍 Target URL: ${n8nUrl}`);
  console.log('');

  try {
    // Test 1: Check if API endpoint exists
    console.log('1️⃣ Testing API endpoint...');
    const response = await fetch(`${n8nUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    if (response.status === 401) {
      console.log('✅ API endpoint exists but requires authentication');
      console.log('');
      console.log('🔑 You need to provide an API token. Try these steps:');
      console.log('');
      console.log('Option A - Browser Token:');
      console.log('1. Open n8n in browser (logged in)');
      console.log('2. Open Developer Tools (F12)');
      console.log('3. Go to Application > Local Storage');
      console.log('4. Find your n8n domain and look for auth tokens');
      console.log('5. Copy the token value');
      console.log('');
      console.log('Option B - Enable API Keys (if you control n8n):');
      console.log('Set these environment variables in your n8n instance:');
      console.log('N8N_API_KEY_AUTH_ENABLED=true');
      console.log('N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true');
      console.log('');
      console.log('Then go to Settings > API Keys in n8n web interface');
      return;
    }

    if (response.status === 404) {
      console.log('❌ API endpoint not found. This n8n instance might not support API access.');
      console.log('Make sure you\'re using n8n version that supports REST API (v0.90.0+)');
      return;
    }

    if (response.ok) {
      console.log('🎉 API endpoint accessible without authentication!');
      const data = await response.json();
      console.log(`Found ${data?.data?.length || 0} workflows`);
      return;
    }

    console.log('🤔 Unexpected response. API might be configured differently.');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('');
    console.log('💡 Possible issues:');
    console.log('- n8n is not running');
    console.log('- Wrong URL (check N8N_URL environment variable)');
    console.log('- Network/firewall issues');
    console.log('- CORS restrictions');
  }
}

// Test with token if provided
async function testWithToken(token) {
  const n8nUrl = process.env.N8N_URL || 'http://localhost:5678';
  
  console.log('🔑 Testing with provided token...');
  
  try {
    const response = await fetch(`${n8nUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token works!');
      console.log(`Found ${data?.data?.length || 0} workflows`);
      return true;
    } else {
      console.log('❌ Token invalid or insufficient permissions');
      return false;
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  // Check if token was provided as argument
  const token = process.argv[2];
  
  if (token) {
    await testWithToken(token);
  } else {
    await testN8nAPI();
    console.log('');
    console.log('💡 Usage: node test-n8n-api.js YOUR_TOKEN_HERE');
    console.log('   to test with a specific token');
  }
}

main().catch(console.error);
