#!/usr/bin/env node
/**
 * Deployment Health Check Script
 * Verifies all critical services are running before/after deployment
 */

const https = require('https');
const http = require('http');

const CHECKS = {
    database: {
        name: 'Supabase Database',
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        critical: true
    },
    api: {
        name: 'API Health',
        url: (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/api/health',
        critical: true
    },
    auth: {
        name: 'Authentication',
        url: (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/api/auth/providers',
        critical: true
    }
};

async function checkEndpoint(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { timeout: 5000 }, (res) => {
            resolve({ status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 300 });
        });
        req.on('error', (err) => {
            resolve({ status: 0, ok: false, error: err.message });
        });
        req.on('timeout', () => {
            req.destroy();
            resolve({ status: 0, ok: false, error: 'Timeout' });
        });
    });
}

async function runHealthChecks() {
    console.log('🏥 Running Deployment Health Checks...\n');

    let failures = 0;

    for (const [key, check] of Object.entries(CHECKS)) {
        if (!check.url) {
            console.log(`⚠️  ${check.name}: SKIPPED (no URL configured)`);
            continue;
        }

        process.stdout.write(`Checking ${check.name}... `);
        const result = await checkEndpoint(check.url);

        if (result.ok) {
            console.log(`✅ OK (${result.status})`);
        } else {
            console.log(`❌ FAILED ${result.error || result.status}`);
            if (check.critical) failures++;
        }
    }

    console.log('\n' + '='.repeat(50));
    if (failures === 0) {
        console.log('✅ All health checks passed!');
        process.exit(0);
    } else {
        console.log(`❌ ${failures} critical check(s) failed`);
        process.exit(1);
    }
}

runHealthChecks().catch(err => {
    console.error('Health check error:', err);
    process.exit(1);
});
