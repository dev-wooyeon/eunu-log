# CSS Visual Regression Testing Implementation Plan

This document outlines a phased approach to implementing CSS visual regression testing using Playwright. The plan is structured to facilitate an open-source model (devstral) in executing the tasks efficiently.

## Core Mandates

*   **Technology Stack:** Playwright (for cross-browser testing and screenshot comparison).
*   **Budget:** Free and Open Source only.
*   **Priorities:**
    *   Verify color differences across browsers.
    *   Verify responsive design across various viewports.
*   **CI/CD:** Vercel.
*   **Project Type:** Personal project (no collaboration features needed).

---

## Implementation Phases (6-Phase Strategy)

### Phase 1: Playwright Installation and Basic Configuration

**Objective:** Set up the Playwright environment, install necessary browsers, and configure the basic visual testing setup.

*   **Task 1.1: Install Playwright:**
    *   **Action:** Add Playwright to `package.json` dependencies.
    *   **Command:** `npm install --save-dev @playwright/test`
    *   **Verification:** Confirm `@playwright/test` is listed in `package.json`.

*   **Task 1.2: Install Browser Binaries:**
    *   **Action:** Install Chromium, Firefox, and WebKit browser binaries required by Playwright.
    *   **Command:** `npx playwright install --with-deps chromium firefox webkit`
    *   **Verification:** Confirm successful installation messages.

*   **Task 1.3: Create `playwright.config.ts`:**
    *   **Action:** Create a new configuration file for Playwright in the project root.
    *   **Path:** `./playwright.config.ts`
    *   **Content:**
        ```typescript
        import { defineConfig, devices } from '@playwright/test';

        export default defineConfig({
          testDir: './tests/visual',
          fullyParallel: true,
          forbidOnly: !!process.env.CI,
          retries: process.env.CI ? 2 : 0,
          workers: process.env.CI ? 1 : undefined,
          reporter: 'html',
          use: {
            trace: 'on-first-retry',
            screenshot: 'only-on-failure',
            video: 'retain-on-failure',
          },
          projects: [
            {
              name: 'chromium-desktop',
              use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
            },
            {
              name: 'chromium-tablet',
              use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
            },
            {
              name: 'chromium-mobile',
              use: { ...devices['Pixel 5'], viewport: { width: 375, height: 667 } }, // Pixel 5 is 393x851, adjusting to common 375 width
            },
            {
              name: 'firefox-desktop',
              use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
            },
            {
              name: 'firefox-tablet',
              use: { ...devices['Desktop Firefox'], viewport: { width: 768, height: 1024 } },
            },
            {
              name: 'firefox-mobile',
              use: { ...devices['Pixel 5'], viewport: { width: 375, height: 667 } },
            },
            {
              name: 'webkit-desktop',
              use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
            },
            {
              name: 'webkit-tablet',
              use: { ...devices['Desktop Safari'], viewport: { width: 768, height: 1024 } },
            },
            {
              name: 'webkit-mobile',
              use: { ...devices['Pixel 5'], viewport: { width: 375, height: 667 } },
            },
          ],
          expect: {
            timeout: 10 * 1000,
            toHaveScreenshot: {
              maxDiffPixels: 100, // Allow minor pixel differences
              threshold: 0.2,     // Percentage of pixels allowed to be different
              animations: 'disabled', // Disable animations during screenshot comparison
            },
          },
          webServer: {
            command: 'npm run dev', // Assuming 'npm run dev' starts your local development server
            url: 'http://localhost:3000',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000, // 2 minutes timeout for server to start
          },
        });
        ```

*   **Task 1.4: Update `package.json` scripts:**
    *   **Action:** Add new npm scripts for running visual tests.
    *   **File:** `package.json`
    *   **Content to Add:**
        ```json
        "test:visual": "playwright test",
        "test:visual:ui": "playwright test --ui",
        "test:visual:update": "playwright test --update-snapshots",
        "test:ci": "playwright test --reporter=github"
        ```

*   **Task 1.5: Create Visual Test Directory:**
    *   **Action:** Create the directory specified in `playwright.config.ts` for visual tests.
    *   **Path:** `./tests/visual`
    *   **Command:** `mkdir -p tests/visual`

*   **Task 1.6: Configure Three.js/Canvas Hiding (Optional, if applicable):**
    *   **Action:** If 3D animations are present (e.g., `HeroScene.tsx`), add CSS to hide canvas elements during testing to ensure stable snapshots. This might require creating a specific test-only CSS file or injecting styles.
    *   **Strategy:** Inject a style tag into the page or create a global CSS rule that is only active during visual tests.
    *   **Example (Playwright test file):**
        ```typescript
        test.beforeEach(async ({ page }) => {
          await page.addStyleTag({ content: 'canvas { display: none !important; }' });
          // Optionally, wait for fonts to load for consistent rendering
          await page.evaluate(() => document.fonts.ready);
        });
        ```

### Phase 2: Core Page Test Cases

**Objective:** Write initial visual tests for critical pages and components to establish a baseline.

*   **Task 2.1: Test `HomePage` (`src/app/page.tsx`):**
    *   **Action:** Create a visual test for the main landing page.
    *   **Path:** `./tests/visual/home.spec.ts`
    *   **Content Example:**
        ```typescript
        import { test, expect } from '@playwright/test';

        test('homepage visual regression test', async ({ page }) => {
          await page.goto('/'); // Adjust URL as necessary for your dev server
          // Hide dynamic elements or animations if present
          await page.addStyleTag({ content: 'canvas { display: none !important; }' });
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
        });
        ```

*   **Task 2.2: Test `BlogListingsPage` (`src/app/blog/page.tsx`):**
    *   **Action:** Create a visual test for the blog listing page, focusing on consistent layout and post card rendering.
    *   **Path:** `./tests/visual/blog-list.spec.ts`
    *   **Content Example:**
        ```typescript
        import { test, expect } from '@playwright/test';

        test('blog listing page visual regression test', async ({ page }) => {
          await page.goto('/blog');
          await page.addStyleTag({ content: 'canvas { display: none !important; }' });
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot('blog-list.png', { fullPage: true });
        });
        ```

*   **Task 2.3: Test `PostCard` Component Variants:**
    *   **Action:** Isolate the `PostCard` component (e.g., `src/components/blog/PostCard/PostCard.tsx`) and test its different visual states (e.g., default, featured, hover states if applicable). This might require a Storybook-like environment or direct component rendering in a test page.
    *   **Strategy:** If a Storybook-like setup doesn't exist, create a temporary test page that renders different `PostCard` variants.
    *   **Path:** `./tests/visual/post-card.spec.ts`
    *   **Content Example:** (Assuming a test page `/tests/visual-render/post-card` exists)
        ```typescript
        import { test, expect } from '@playwright/test';

        test('PostCard component visual regression test - default', async ({ page }) => {
          await page.goto('/tests/visual-render/post-card?variant=default');
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot('post-card-default.png');
        });

        test('PostCard component visual regression test - featured', async ({ page }) => {
          await page.goto('/tests/visual-render/post-card?variant=featured');
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot('post-card-featured.png');
        });
        ```

### Phase 3: Responsive Viewport Verification

**Objective:** Extend existing tests to cover various responsive breakpoints (mobile, tablet, desktop) as defined in `playwright.config.ts` projects.

*   **Task 3.1: Run Existing Tests Across Viewports:**
    *   **Action:** Execute the already created tests (`home.spec.ts`, `blog-list.spec.ts`, etc.) using the configured Playwright projects that define different viewports (e.g., `chromium-mobile`, `chromium-tablet`, `chromium-desktop`).
    *   **Command:** `npx playwright test --project=chromium-mobile --project=chromium-tablet --project=chromium-desktop` (and similarly for firefox/webkit)
    *   **Verification:** Ensure snapshots are generated for each viewport, and identify any responsive layout issues.

*   **Task 3.2: Specifically Test Responsive Components:**
    *   **Action:** Create dedicated tests for components known to have complex responsive behaviors, like `Header.tsx` (mobile hamburger menu).
    *   **Path:** `./tests/visual/header.spec.ts`
    *   **Content Example:**
        ```typescript
        import { test, expect } from '@playwright/test';

        test('header component visual regression test - mobile', async ({ page }) => {
          await page.goto('/');
          // For mobile, ensure hamburger menu is visible and other elements are hidden
          await page.evaluate(() => document.fonts.ready);
          await expect(page.locator('header')).toHaveScreenshot('header-mobile.png');
        });

        test('header component visual regression test - desktop', async ({ page }) => {
          // This test will run in a desktop viewport based on Playwright config
          await page.goto('/');
          // For desktop, ensure full navigation is visible
          await page.evaluate(() => document.fonts.ready);
          await expect(page.locator('header')).toHaveScreenshot('header-desktop.png');
        });
        ```

### Phase 4: Browser Cross-Compatibility Testing

**Objective:** Verify visual consistency across different browser engines (Chromium, Firefox, WebKit) using the configured projects.

*   **Task 4.1: Run All Tests Across All Browsers:**
    *   **Action:** Execute all existing visual tests using the full matrix of Playwright projects (Chromium, Firefox, WebKit for desktop, tablet, mobile).
    *   **Command:** `npm run test:visual` (This will run all configured projects by default)
    *   **Verification:** Analyze the generated reports (`npx playwright show-report`) to identify any rendering discrepancies between browsers. Update snapshots (`npm run test:visual:update`) if differences are intended or acceptable, or fix CSS issues if not.

### Phase 5: Vercel CI Integration

**Objective:** Integrate visual regression tests into the Vercel CI/CD pipeline to automate checks on every push.

*   **Task 5.1: Create Vercel Deployment Hook (if not already present):**
    *   **Action:** Ensure Vercel is configured to build and deploy the project. This is usually set up when the project is linked to Vercel.
    *   **Verification:** Confirm deployments are triggered on `git push`.

*   **Task 5.2: Configure Vercel Build Command for Playwright:**
    *   **Action:** Modify the Vercel build command to include Playwright browser installation and test execution.
    *   **Strategy:** Vercel automatically detects `playwright` in `package.json` and runs `npx playwright install`. If not, configure it manually.
    *   **Vercel Project Settings -> Build & Development Settings -> Build Command:**
        *   Example: `npm install && npx playwright install --with-deps chromium firefox webkit && npm run build`
    *   **Vercel Project Settings -> Build & Development Settings -> Install Command:**
        *   Example: `npm install` (Playwright binaries are installed with `npx playwright install` as part of the build command)

*   **Task 5.3: Add Playwright Test Step to Vercel CI:**
    *   **Action:** Run the visual tests *before* the deployment step.
    *   **Strategy:** Configure a `test:ci` script and ensure Vercel runs it.
    *   **Vercel Project Settings -> Build & Development Settings -> Build Command (updated):**
        *   Example: `npm install && npx playwright install --with-deps chromium firefox webkit && npm run build && npm run test:ci`
    *   **Verification:** Push a change and observe the Vercel CI logs. Tests should run and report results. Failures should halt the deployment.

### Phase 6: Baseline Management and Maintenance

**Objective:** Establish a robust workflow for managing screenshot baselines and maintaining tests.

*   **Task 6.1: Initial Baseline Generation:**
    *   **Action:** Generate the initial set of reference screenshots after all tests are written and the application is visually stable.
    *   **Command:** `npm run test:visual:update`
    *   **Verification:** Confirm that screenshots are generated in `tests/visual/**/*.spec.ts-snapshots/`.

*   **Task 6.2: Git Ignore Configuration:**
    *   **Action:** Configure `.gitignore` to ignore Playwright test reports and potentially other temporary files, while committing the screenshot baselines.
    *   **File:** `.gitignore`
    *   **Content to Add (if not already present):**
        ```
        # Playwright
        /test-results/
        /playwright-report/
        ```
    *   **Verification:** Run `git status` to ensure `test-results/` and `playwright-report/` are ignored, but snapshot directories are tracked.

*   **Task 6.3: Regular Test Review and Update:**
    *   **Action:** Periodically review visual test reports. When UI changes are intentional, update the baselines.
    *   **Process:**
        1.  Make UI changes.
        2.  Run `npm run test:visual`.
        3.  Review differences in the Playwright UI report (`npm run test:visual:ui` or `npx playwright show-report`).
        4.  If changes are approved, update baselines: `npm run test:visual:update`.
        5.  Commit updated snapshots.

*   **Task 6.4: Integrate into Development Workflow:**
    *   **Action:** Encourage developers to run `npm run test:visual` locally before pushing changes.
    *   **Strategy:** Add a pre-commit hook (e.g., using Husky) to run critical visual tests or linting to catch issues early.
    *   **Example (`.husky/pre-commit`):**
        ```bash
        #!/usr/bin/env sh
        . "$(dirname -- "$0")/_/husky.sh"

        npm run lint
        # npm run test:visual # Consider if this is too slow for every commit
        ```
    *   **Verification:** Discuss and implement with the team or as a personal best practice.
