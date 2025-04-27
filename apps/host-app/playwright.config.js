var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: __assign({}, devices['Desktop Chrome']),
        },
    ],
    webServer: [
        {
            command: 'cd /Users/sanantha/healthcare-portal/apps/preferences-mfe && NEXT_PRIVATE_LOCAL_WEBPACK=true PORT=3001 npm run dev',
            url: 'http://localhost:3001',
            reuseExistingServer: !process.env.CI,
            timeout: 120000,
        },
        {
            command: 'cd /Users/sanantha/healthcare-portal/apps/icd-tests-mfe && NEXT_PRIVATE_LOCAL_WEBPACK=true PORT=3002 npm run dev',
            url: 'http://localhost:3002',
            reuseExistingServer: !process.env.CI,
            timeout: 120000,
        },
        {
            command: 'cd /Users/sanantha/healthcare-portal/apps/host-app && NEXT_PRIVATE_LOCAL_WEBPACK=true npm run dev',
            url: 'http://localhost:3000',
            reuseExistingServer: !process.env.CI,
            timeout: 120000,
        }
    ],
});
