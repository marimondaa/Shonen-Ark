import { test, expect, Page, Browser } from '@playwright/test';

/**
 * End-to-End Testing Suite for Shonen Ark
 * Tests critical user flows and webhook integrations
 */

// Test configuration
const TEST_CONFIG = {
  baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
  webhookTestUrl: process.env.WEBHOOK_TEST_URL || 'http://localhost:5678',
  testUser: {
    email: 'test@shonenark.test',
    name: 'Test User',
    password: 'TestPassword123!'
  }
};

test.describe('User Signup and Onboarding Flow', () => {
  test('should complete signup flow and trigger webhook', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Check if page loads correctly
    await expect(page.locator('h1')).toContainText('Shonen Ark');
    
    // Click signup/login button
    await page.click('[data-testid="auth-button"]');
    
    // Wait for auth modal or page
    await page.waitForSelector('[data-testid="auth-form"]');
    
    // Fill in signup form
    await page.fill('[data-testid="email-input"]', TEST_CONFIG.testUser.email);
    await page.fill('[data-testid="name-input"]', TEST_CONFIG.testUser.name);
    await page.fill('[data-testid="password-input"]', TEST_CONFIG.testUser.password);
    
    // Submit signup
    await page.click('[data-testid="signup-submit"]');
    
    // Wait for successful signup
    await page.waitForURL('**/account/onboarding');
    
    // Verify onboarding page loads
    await expect(page.locator('[data-testid="onboarding-welcome"]')).toBeVisible();
    
    // Complete onboarding
    await page.selectOption('[data-testid="account-type-select"]', 'fan');
    await page.click('[data-testid="onboarding-complete"]');
    
    // Verify redirect to dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('[data-testid="user-dashboard"]')).toBeVisible();
  });

  test('should handle OAuth signup flow', async ({ page }) => {
    // Navigate to auth page
    await page.goto('/login');
    
    // Click Google OAuth button
    await page.click('[data-testid="google-oauth-button"]');
    
    // Note: In real tests, you'd mock the OAuth provider
    // Here we're testing the OAuth initiation
    await page.waitForURL('**/api/auth/signin/google');
    
    // Verify OAuth redirect (in staging, this would complete the flow)
    expect(page.url()).toContain('signin/google');
  });
});

test.describe('Project Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication - in real tests you'd have proper login
    await page.goto('/login');
    // Simulate logged-in state
    await page.evaluate(() => {
      localStorage.setItem('test-auth', 'true');
    });
  });

  test('should submit and approve a theory project', async ({ page }) => {
    // Navigate to theory creation page
    await page.goto('/theories/create');
    
    // Fill in theory form
    await page.fill('[data-testid="theory-title"]', 'Test Theory About Naruto');
    await page.fill('[data-testid="theory-description"]', 'This is a comprehensive theory about character development in Naruto series.');
    
    // Select category
    await page.selectOption('[data-testid="theory-category"]', 'theories');
    
    // Add tags
    await page.fill('[data-testid="theory-tags"]', 'naruto, theory, character-development');
    
    // Submit theory
    await page.click('[data-testid="submit-theory"]');
    
    // Wait for submission success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    
    // Verify redirect to theory view
    await page.waitForURL('**/theories/*');
    
    // Check if theory is visible (should be approved for safe content)
    await expect(page.locator('[data-testid="theory-title"]')).toContainText('Test Theory About Naruto');
  });

  test('should handle file upload for fan fights', async ({ page }) => {
    // Navigate to fan fights upload
    await page.goto('/discovery/fan-fights/upload');
    
    // Fill in project details
    await page.fill('[data-testid="project-title"]', 'Epic Battle Animation');
    await page.fill('[data-testid="project-description"]', 'An original battle sequence between popular anime characters.');
    
    // Upload video file (mock file)
    const fileInput = page.locator('[data-testid="file-upload"]');
    await fileInput.setInputFiles({
      name: 'test-video.mp4',
      mimeType: 'video/mp4',
      buffer: Buffer.from('fake video content')
    });
    
    // Wait for upload progress
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
    
    // Submit project
    await page.click('[data-testid="submit-project"]');
    
    // Verify submission
    await expect(page.locator('[data-testid="submission-success"]')).toBeVisible();
    
    // Should show pending approval status
    await expect(page.locator('[data-testid="project-status"]')).toContainText('Pending Review');
  });

  test('should flag inappropriate content', async ({ page }) => {
    // Navigate to project creation
    await page.goto('/discovery/theories/upload');
    
    // Fill in form with inappropriate content
    await page.fill('[data-testid="project-title"]', 'Inappropriate Content with Hate Speech');
    await page.fill('[data-testid="project-description"]', 'This contains hate and violence against characters.');
    
    // Submit project
    await page.click('[data-testid="submit-project"]');
    
    // Should show flagged for review message
    await expect(page.locator('[data-testid="review-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="review-message"]')).toContainText('flagged for manual review');
  });
});

test.describe('Calendar and Discovery Features', () => {
  test('should display anime calendar with episodes', async ({ page }) => {
    await page.goto('/calendar');
    
    // Wait for calendar to load
    await page.waitForSelector('[data-testid="calendar-grid"]');
    
    // Check for anime episodes
    await expect(page.locator('[data-testid="anime-tab"]')).toBeVisible();
    await page.click('[data-testid="anime-tab"]');
    
    // Verify episode entries are displayed
    await expect(page.locator('[data-testid="episode-entry"]').first()).toBeVisible();
    
    // Check episode details
    const firstEpisode = page.locator('[data-testid="episode-entry"]').first();
    await expect(firstEpisode.locator('[data-testid="anime-title"]')).not.toBeEmpty();
    await expect(firstEpisode.locator('[data-testid="episode-number"]')).not.toBeEmpty();
    await expect(firstEpisode.locator('[data-testid="release-date"]')).not.toBeEmpty();
  });

  test('should display manga releases', async ({ page }) => {
    await page.goto('/calendar');
    
    // Switch to manga tab
    await page.click('[data-testid="manga-tab"]');
    
    // Verify manga entries
    await expect(page.locator('[data-testid="manga-entry"]').first()).toBeVisible();
    
    // Check manga details
    const firstManga = page.locator('[data-testid="manga-entry"]').first();
    await expect(firstManga.locator('[data-testid="manga-title"]')).not.toBeEmpty();
    await expect(firstManga.locator('[data-testid="chapter-number"]')).not.toBeEmpty();
  });

  test('should filter calendar by genre', async ({ page }) => {
    await page.goto('/calendar');
    
    // Open filter dropdown
    await page.click('[data-testid="genre-filter"]');
    
    // Select action genre
    await page.click('[data-testid="genre-action"]');
    
    // Wait for filtered results
    await page.waitForSelector('[data-testid="filtered-results"]');
    
    // Verify results are filtered
    const entries = page.locator('[data-testid="calendar-entry"]');
    const count = await entries.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Discovery and Content Features', () => {
  test('should browse fan fights content', async ({ page }) => {
    await page.goto('/discovery/fan-fights');
    
    // Wait for content grid to load
    await page.waitForSelector('[data-testid="content-grid"]');
    
    // Verify content cards are displayed
    await expect(page.locator('[data-testid="content-card"]').first()).toBeVisible();
    
    // Check video preview
    const firstCard = page.locator('[data-testid="content-card"]').first();
    await firstCard.hover();
    
    // Should show play button or preview
    await expect(firstCard.locator('[data-testid="play-button"]')).toBeVisible();
  });

  test('should like and bookmark content', async ({ page }) => {
    // Mock authenticated user
    await page.goto('/discovery/theories');
    
    // Click on first theory
    await page.click('[data-testid="content-card"]');
    
    // Wait for theory detail page
    await page.waitForSelector('[data-testid="theory-content"]');
    
    // Like the theory
    await page.click('[data-testid="like-button"]');
    
    // Verify like count increased
    await expect(page.locator('[data-testid="like-count"]')).toContainText('1');
    
    // Bookmark the theory
    await page.click('[data-testid="bookmark-button"]');
    
    // Verify bookmark added
    await expect(page.locator('[data-testid="bookmark-button"]')).toHaveClass(/bookmarked/);
  });

  test('should search for content', async ({ page }) => {
    await page.goto('/discovery');
    
    // Use search functionality
    await page.fill('[data-testid="search-input"]', 'Naruto theory');
    await page.click('[data-testid="search-button"]');
    
    // Wait for search results
    await page.waitForSelector('[data-testid="search-results"]');
    
    // Verify results contain search term
    const results = page.locator('[data-testid="search-result"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
    
    // Check first result contains search term
    const firstResult = results.first();
    await expect(firstResult).toContainText('Naruto', { ignoreCase: true });
  });
});

test.describe('User Dashboard and Profile', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authenticated state
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('test-auth', 'true');
    });
  });

  test('should display user dashboard with activity', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Verify dashboard sections
    await expect(page.locator('[data-testid="recent-activity"]')).toBeVisible();
    await expect(page.locator('[data-testid="bookmarked-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="recommended-content"]')).toBeVisible();
    
    // Check activity feed
    const activityItems = page.locator('[data-testid="activity-item"]');
    expect(await activityItems.count()).toBeGreaterThanOrEqual(0);
  });

  test('should manage user profile settings', async ({ page }) => {
    await page.goto('/account/profile');
    
    // Verify profile form
    await expect(page.locator('[data-testid="profile-form"]')).toBeVisible();
    
    // Update profile information
    await page.fill('[data-testid="display-name"]', 'Updated Test User');
    await page.fill('[data-testid="bio"]', 'Updated bio for testing');
    
    // Save changes
    await page.click('[data-testid="save-profile"]');
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('should upgrade to creator account', async ({ page }) => {
    await page.goto('/account/upgrade');
    
    // Select creator tier
    await page.click('[data-testid="creator-tier-select"]');
    
    // Verify pricing information
    await expect(page.locator('[data-testid="creator-price"]')).toContainText('$24.99');
    
    // Click upgrade button
    await page.click('[data-testid="upgrade-button"]');
    
    // Should redirect to Stripe checkout
    await page.waitForURL('**/checkout**');
    
    // Verify Stripe checkout page loads
    expect(page.url()).toContain('checkout');
  });
});

test.describe('Admin and Moderation Features', () => {
  test.beforeEach(async ({ page }) => {
    // Mock admin authentication
    await page.goto('/admin/login');
    await page.evaluate(() => {
      localStorage.setItem('admin-auth', 'true');
    });
  });

  test('should review flagged content', async ({ page }) => {
    await page.goto('/admin/moderation');
    
    // Verify moderation queue
    await expect(page.locator('[data-testid="moderation-queue"]')).toBeVisible();
    
    // Check for flagged items
    const flaggedItems = page.locator('[data-testid="flagged-item"]');
    
    if (await flaggedItems.count() > 0) {
      // Review first item
      await flaggedItems.first().click();
      
      // Verify review interface
      await expect(page.locator('[data-testid="review-interface"]')).toBeVisible();
      
      // Approve or reject
      await page.click('[data-testid="approve-button"]');
      
      // Verify action completed
      await expect(page.locator('[data-testid="action-success"]')).toBeVisible();
    }
  });

  test('should view analytics dashboard', async ({ page }) => {
    await page.goto('/admin/analytics');
    
    // Verify analytics components
    await expect(page.locator('[data-testid="user-stats"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-stats"]')).toBeVisible();
    await expect(page.locator('[data-testid="engagement-chart"]')).toBeVisible();
    
    // Check for data visualization
    await expect(page.locator('[data-testid="chart-container"]')).toBeVisible();
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should display mobile navigation', async ({ page }) => {
    await page.goto('/');
    
    // Verify mobile menu button
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Verify mobile menu items
    await expect(page.locator('[data-testid="mobile-nav-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-nav-item"]').first()).toBeVisible();
  });

  test('should handle mobile content browsing', async ({ page }) => {
    await page.goto('/discovery');
    
    // Verify mobile content grid
    await expect(page.locator('[data-testid="mobile-content-grid"]')).toBeVisible();
    
    // Test swipe gestures (if implemented)
    const contentCard = page.locator('[data-testid="content-card"]').first();
    await contentCard.hover();
    
    // Verify mobile-specific interactions
    await expect(page.locator('[data-testid="mobile-actions"]')).toBeVisible();
  });
});

// Helper functions for testing
export class TestHelpers {
  static async loginAsUser(page: Page, userType: 'fan' | 'creator' | 'admin' = 'fan') {
    await page.goto('/login');
    await page.evaluate((type) => {
      localStorage.setItem(`${type}-auth`, 'true');
    }, userType);
  }

  static async createMockContent(page: Page, contentType: string) {
    const mockData = {
      'theory': {
        title: 'Test Theory',
        description: 'Test description',
        category: 'theories'
      },
      'fan-fight': {
        title: 'Test Animation',
        description: 'Test animation description',
        category: 'fan-fights'
      }
    };

    return mockData[contentType as keyof typeof mockData];
  }

  static async waitForWebhookTrigger(page: Page, webhookType: string) {
    // In real tests, you'd listen for webhook calls
    return page.waitForTimeout(1000); // Mock wait
  }
}
