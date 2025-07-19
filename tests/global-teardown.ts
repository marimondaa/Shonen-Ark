import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Teardown for Playwright Tests
 * Cleans up test environment and test data
 */

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown...');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
    console.log(`📍 Cleaning up test environment at: ${baseURL}`);

    // Clean up test data
    console.log('🗑️ Cleaning up test data...');
    await cleanupTestData(page, baseURL);

    // Clean up test users
    console.log('👥 Cleaning up test users...');
    await cleanupTestUsers(page, baseURL);

    // Clean up uploaded files
    console.log('📁 Cleaning up test files...');
    await cleanupTestFiles(page, baseURL);

    // Clear test caches
    console.log('💾 Clearing test caches...');
    await clearTestCaches(page, baseURL);

    // Generate cleanup report
    console.log('📊 Generating cleanup report...');
    await generateCleanupReport(page, baseURL);

    console.log('✅ Global teardown completed successfully');

  } catch (error) {
    console.error('❌ Global teardown error:', error);
    // Don't throw - we want tests to complete even if cleanup fails
  } finally {
    await browser.close();
  }
}

/**
 * Clean up all test data from database
 */
async function cleanupTestData(page: any, baseURL: string) {
  try {
    const result = await page.evaluate(async (url: string) => {
      try {
        const response = await fetch(`${url}/api/test/cleanup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cleanup: 'all',
            tables: [
              'projects',
              'calendar_entries',
              'newsletter_subscribers',
              'admin_logs',
              'analytics_events'
            ]
          })
        });

        return {
          success: response.ok,
          status: response.status,
          message: response.ok ? 'Data cleaned successfully' : `Failed with status ${response.status}`
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }, baseURL);

    if (result.success) {
      console.log('✅ Test data cleaned successfully');
    } else {
      console.warn('⚠️ Test data cleanup warning:', result.error || result.message);
    }

  } catch (error) {
    console.warn('⚠️ Test data cleanup error:', error.message);
  }
}

/**
 * Clean up test users and authentication data
 */
async function cleanupTestUsers(page: any, baseURL: string) {
  try {
    const testUserEmails = [
      'test@shonenark.test',
      'creator@shonenark.test',
      'admin@shonenark.test'
    ];

    for (const email of testUserEmails) {
      await page.evaluate(async (data: any) => {
        const { email, url } = data;
        try {
          await fetch(`${url}/api/test/delete-user`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
        } catch (error) {
          console.warn(`Warning: Could not delete test user ${email}:`, error.message);
        }
      }, { email, url: baseURL });
    }

    console.log('👥 Test users cleaned up');

  } catch (error) {
    console.warn('⚠️ Test user cleanup error:', error.message);
  }
}

/**
 * Clean up test uploaded files
 */
async function cleanupTestFiles(page: any, baseURL: string) {
  try {
    const result = await page.evaluate(async (url: string) => {
      try {
        const response = await fetch(`${url}/api/test/cleanup-files`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pattern: 'test-*',
            directories: ['uploads', 'temp', 'cache']
          })
        });

        return {
          success: response.ok,
          data: response.ok ? await response.json() : null
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }, baseURL);

    if (result.success && result.data) {
      console.log(`📁 Cleaned up ${result.data.filesDeleted || 0} test files`);
    } else {
      console.warn('⚠️ File cleanup warning:', result.error);
    }

  } catch (error) {
    console.warn('⚠️ File cleanup error:', error.message);
  }
}

/**
 * Clear test caches and temporary data
 */
async function clearTestCaches(page: any, baseURL: string) {
  try {
    // Clear browser caches
    await page.evaluate(() => {
      // Clear localStorage
      if (typeof localStorage !== 'undefined') {
        Object.keys(localStorage).forEach(key => {
          if (key.includes('test') || key.includes('Test')) {
            localStorage.removeItem(key);
          }
        });
      }

      // Clear sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        Object.keys(sessionStorage).forEach(key => {
          if (key.includes('test') || key.includes('Test')) {
            sessionStorage.removeItem(key);
          }
        });
      }
    });

    // Clear server-side caches
    await page.evaluate(async (url: string) => {
      try {
        await fetch(`${url}/api/test/clear-cache`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cacheType: 'test' })
        });
      } catch (error) {
        console.warn('Warning: Could not clear server cache:', error.message);
      }
    }, baseURL);

    console.log('💾 Test caches cleared');

  } catch (error) {
    console.warn('⚠️ Cache cleanup error:', error.message);
  }
}

/**
 * Generate a cleanup report
 */
async function generateCleanupReport(page: any, baseURL: string) {
  try {
    const report = await page.evaluate(async (url: string) => {
      const timestamp = new Date().toISOString();
      
      // Check remaining test data
      const checks = await Promise.allSettled([
        fetch(`${url}/api/test/count-users`).then(r => r.json()).catch(() => ({ count: 'unknown' })),
        fetch(`${url}/api/test/count-projects`).then(r => r.json()).catch(() => ({ count: 'unknown' })),
        fetch(`${url}/api/test/count-calendar-entries`).then(r => r.json()).catch(() => ({ count: 'unknown' }))
      ]);

      return {
        timestamp,
        remainingUsers: checks[0].status === 'fulfilled' ? checks[0].value.count : 'unknown',
        remainingProjects: checks[1].status === 'fulfilled' ? checks[1].value.count : 'unknown',
        remainingCalendarEntries: checks[2].status === 'fulfilled' ? checks[2].value.count : 'unknown'
      };
    }, baseURL);

    console.log('📊 Cleanup Report:', {
      timestamp: report.timestamp,
      remainingTestUsers: report.remainingUsers,
      remainingTestProjects: report.remainingProjects,
      remainingTestCalendarEntries: report.remainingCalendarEntries
    });

    // Save report to file (optional)
    const fs = require('fs');
    const path = require('path');
    
    const reportsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, `cleanup-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`📄 Cleanup report saved to: ${reportPath}`);

  } catch (error) {
    console.warn('⚠️ Report generation error:', error.message);
  }
}

export default globalTeardown;
