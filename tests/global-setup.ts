import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Setup for Playwright Tests
 * Initializes test environment and prepares test data
 */

async function globalSetup(config: FullConfig) {
  console.log('🔧 Setting up global test environment...');

  // Launch browser for setup tasks
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Environment setup
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
    console.log(`📍 Base URL: ${baseURL}`);

    // Health check - ensure server is running
    try {
      console.log('🏥 Performing health check...');
      const response = await page.goto(`${baseURL}/api/health`);
      
      if (response && response.status() === 200) {
        console.log('✅ Health check passed');
      } else {
        console.warn('⚠️ Health check returned non-200 status');
      }
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw new Error('Server is not responding. Please ensure the development server is running.');
    }

    // Database setup for testing
    console.log('💾 Preparing test database...');
    await setupTestDatabase(page, baseURL);

    // Authentication setup
    console.log('🔐 Setting up test authentication...');
    await setupTestAuth(page, baseURL);

    // Create test data
    console.log('📝 Creating test data...');
    await createTestData(page, baseURL);

    console.log('✅ Global setup completed successfully');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Setup test database with required data
 */
async function setupTestDatabase(page: any, baseURL: string) {
  try {
    // Check if we can connect to database
    const response = await page.evaluate(async (url: string) => {
      try {
        const res = await fetch(`${url}/api/test/database-status`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        return { success: res.ok, status: res.status };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, baseURL);

    if (response.success) {
      console.log('✅ Database connection verified');
    } else {
      console.warn('⚠️ Database connection issue:', response);
    }

    // Clean existing test data
    await page.evaluate(async (url: string) => {
      await fetch(`${url}/api/test/cleanup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cleanup: 'test-data' })
      });
    }, baseURL);

    console.log('🧹 Test data cleaned');

  } catch (error) {
    console.warn('⚠️ Database setup warning:', error.message);
  }
}

/**
 * Setup test authentication tokens
 */
async function setupTestAuth(page: any, baseURL: string) {
  try {
    // Create test user session
    const testUsers = [
      {
        email: 'test@shonenark.test',
        name: 'Test User',
        role: 'fan'
      },
      {
        email: 'creator@shonenark.test',
        name: 'Test Creator',
        role: 'creator'
      },
      {
        email: 'admin@shonenark.test',
        name: 'Test Admin',
        role: 'admin'
      }
    ];

    for (const user of testUsers) {
      await page.evaluate(async (data: any) => {
        const { user, url } = data;
        try {
          await fetch(`${url}/api/test/create-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
          });
        } catch (error) {
          console.warn(`Warning: Could not create test user ${user.email}:`, error.message);
        }
      }, { user, url: baseURL });
    }

    console.log('👥 Test users created');

  } catch (error) {
    console.warn('⚠️ Auth setup warning:', error.message);
  }
}

/**
 * Create test data for content and interactions
 */
async function createTestData(page: any, baseURL: string) {
  try {
    // Create test theories
    const testTheories = [
      {
        title: 'Test Theory: Naruto Character Development',
        description: 'A comprehensive analysis of character growth throughout the series.',
        category: 'theories',
        tags: ['naruto', 'character-development', 'analysis'],
        author: 'test@shonenark.test'
      },
      {
        title: 'Test Theory: One Piece World Building',
        description: 'Exploring the intricate world structure and lore connections.',
        category: 'theories',
        tags: ['one-piece', 'world-building', 'lore'],
        author: 'creator@shonenark.test'
      }
    ];

    for (const theory of testTheories) {
      await page.evaluate(async (data: any) => {
        const { theory, url } = data;
        try {
          await fetch(`${url}/api/test/create-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(theory)
          });
        } catch (error) {
          console.warn(`Warning: Could not create test theory:`, error.message);
        }
      }, { theory, url: baseURL });
    }

    // Create test calendar entries
    const testCalendarEntries = [
      {
        title: 'Attack on Titan',
        episode_number: 87,
        release_date: new Date().toISOString(),
        type: 'anime',
        genre: 'action'
      },
      {
        title: 'One Piece',
        chapter_number: 1095,
        release_date: new Date().toISOString(),
        type: 'manga',
        genre: 'adventure'
      }
    ];

    for (const entry of testCalendarEntries) {
      await page.evaluate(async (data: any) => {
        const { entry, url } = data;
        try {
          await fetch(`${url}/api/test/create-calendar-entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
          });
        } catch (error) {
          console.warn(`Warning: Could not create calendar entry:`, error.message);
        }
      }, { entry, url: baseURL });
    }

    console.log('📅 Test calendar entries created');
    console.log('💭 Test theories created');

  } catch (error) {
    console.warn('⚠️ Test data creation warning:', error.message);
  }
}

export default globalSetup;
