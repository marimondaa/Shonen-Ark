#!/usr/bin/env node

/**
 * n8n Token Helper Script
 * Helps extract authentication token from browser session
 */

console.log('🔍 n8n API Token Helper');
console.log('');
console.log('To get your n8n API token, follow these steps:');
console.log('');
console.log('1. Open your n8n instance in the browser and login');
console.log('2. Open Developer Tools (F12)');
console.log('3. Go to the "Application" or "Storage" tab');
console.log('4. Look in "Local Storage" or "Session Storage" for your n8n domain');
console.log('5. Find entries like:');
console.log('   - "n8n-auth-token"');
console.log('   - "authToken"');
console.log('   - "sessionToken"');
console.log('   - "accessToken"');
console.log('');
console.log('OR in the "Network" tab:');
console.log('1. Go to Network tab in Developer Tools');
console.log('2. Refresh the n8n page');
console.log('3. Look for API calls to "/api/v1/"');
console.log('4. Check the "Authorization" header in the request');
console.log('5. Copy the Bearer token value');
console.log('');
console.log('🔧 Alternative: Enable n8n API Access');
console.log('');
console.log('If you\'re running n8n yourself, add these environment variables:');
console.log('N8N_API_KEY_AUTH_ENABLED=true');
console.log('N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true');
console.log('');
console.log('Then restart n8n and check Settings > API Keys in the web interface.');
