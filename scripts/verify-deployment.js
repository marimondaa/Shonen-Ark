#!/usr/bin/env node
/**
 * Pre-deployment Verification Script
 * Ensures environment is ready for deployment
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VARS = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
];

const OPTIONAL_ENV_VARS = [
    'STRIPE_SECRET_KEY',
    'CLOUDINARY_CLOUD_NAME',
    'OPENAI_API_KEY'
];

function checkEnvVars() {
    console.log('🔍 Checking environment variables...\n');

    let missing = [];
    let optional = [];

    REQUIRED_ENV_VARS.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
            console.log(`❌ ${varName}: MISSING (required)`);
        } else {
            console.log(`✅ ${varName}: Set`);
        }
    });

    OPTIONAL_ENV_VARS.forEach(varName => {
        if (!process.env[varName]) {
            optional.push(varName);
            console.log(`⚠️  ${varName}: Not set (optional)`);
        } else {
            console.log(`✅ ${varName}: Set`);
        }
    });

    return { missing, optional };
}

function checkBuildArtifacts() {
    console.log('\n📦 Checking build artifacts...\n');

    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
        console.log('✅ .next directory exists');
        return true;
    } else {
        console.log('❌ .next directory not found - run npm run build');
        return false;
    }
}

function checkDependencies() {
    console.log('\n📚 Checking dependencies...\n');

    const nodeModules = path.join(process.cwd(), 'node_modules');
    if (fs.existsSync(nodeModules)) {
        console.log('✅ node_modules exists');
        return true;
    } else {
        console.log('❌ node_modules not found - run npm install');
        return false;
    }
}

async function main() {
    console.log('🚀 Pre-Deployment Verification\n' + '='.repeat(50) + '\n');

    const { missing, optional } = checkEnvVars();
    const hasBuiltartifacts = checkBuildArtifacts();
    const hasDeps = checkDependencies();

    console.log('\n' + '='.repeat(50));

    if (missing.length > 0) {
        console.log(`\n❌ Deployment NOT ready: ${missing.length} required env var(s) missing`);
        process.exit(1);
    }

    if (!hasDeps) {
        console.log('\n❌ Deployment NOT ready: dependencies not installed');
        process.exit(1);
    }

    if (!hasBuiltartifacts) {
        console.log('\n⚠️  Warning: Build artifacts not found');
        console.log('Run: npm run build');
    }

    if (optional.length > 0) {
        console.log(`\n⚠️  ${optional.length} optional service(s) not configured`);
    }

    console.log('\n✅ Deployment ready!');
    process.exit(0);
}

main().catch(err => {
    console.error('Verification error:', err);
    process.exit(1);
});
