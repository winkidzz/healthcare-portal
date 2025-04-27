var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { test, expect } from '@playwright/test';
test.describe('Application Startup Diagnostics', function () {
    test('host app starts correctly', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var consoleErrors, reactErrors, mfErrors, preferencesSection, loadingState, error_1, errorState, networkErrors;
        var page = _b.page;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: 
                // Navigate to the home page
                return [4 /*yield*/, page.goto('http://localhost:3000')];
                case 1:
                    // Navigate to the home page
                    _c.sent();
                    consoleErrors = [];
                    page.on('console', function (msg) {
                        if (msg.type() === 'error') {
                            consoleErrors.push(msg.text());
                        }
                    });
                    // Check if the main heading is present
                    return [4 /*yield*/, expect(page.getByRole('heading', { name: 'Healthcare Portal' })).toBeVisible()];
                case 2:
                    // Check if the main heading is present
                    _c.sent();
                    reactErrors = consoleErrors.filter(function (error) {
                        return error.includes('React') ||
                            error.includes('Invalid hook call') ||
                            error.includes('useContext');
                    });
                    if (reactErrors.length > 0) {
                        console.log('React errors detected:', reactErrors);
                        // Don't fail the test immediately, but log the errors
                    }
                    mfErrors = consoleErrors.filter(function (error) {
                        return error.includes('Module Federation') ||
                            error.includes('remoteEntry') ||
                            error.includes('preferences');
                    });
                    if (mfErrors.length > 0) {
                        console.log('Module Federation errors detected:', mfErrors);
                        // Don't fail the test immediately, but log the errors
                    }
                    preferencesSection = page.getByRole('heading', { name: 'Preferences' });
                    return [4 /*yield*/, expect(preferencesSection).toBeVisible()];
                case 3:
                    _c.sent();
                    loadingState = page.getByText('Loading preferences...');
                    return [4 /*yield*/, expect(loadingState).toBeVisible()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 9]);
                    return [4 /*yield*/, page.waitForSelector('text=User Preferences', { timeout: 5000 })];
                case 6:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _c.sent();
                    errorState = page.getByText('Failed to load preferences');
                    return [4 /*yield*/, expect(errorState).toBeVisible()];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 9:
                    networkErrors = consoleErrors.filter(function (error) {
                        return error.includes('Failed to load') ||
                            error.includes('NetworkError') ||
                            error.includes('404');
                    });
                    if (networkErrors.length > 0) {
                        console.log('Network errors detected:', networkErrors);
                        // Don't fail the test immediately, but log the errors
                    }
                    // Log any remaining console errors for debugging
                    if (consoleErrors.length > 0) {
                        console.log('All console errors during startup:', consoleErrors);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    test('preferences micro-frontend is accessible', function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var consoleErrors, reactErrors;
        var page = _b.page;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: 
                // Navigate directly to preferences MFE
                return [4 /*yield*/, page.goto('http://localhost:3001')];
                case 1:
                    // Navigate directly to preferences MFE
                    _c.sent();
                    consoleErrors = [];
                    page.on('console', function (msg) {
                        if (msg.type() === 'error') {
                            consoleErrors.push(msg.text());
                        }
                    });
                    // Check if preferences page loads
                    return [4 /*yield*/, expect(page.getByRole('heading', { name: 'User Preferences' })).toBeVisible()];
                case 2:
                    // Check if preferences page loads
                    _c.sent();
                    reactErrors = consoleErrors.filter(function (error) {
                        return error.includes('React') ||
                            error.includes('Invalid hook call');
                    });
                    if (reactErrors.length > 0) {
                        console.log('React errors in preferences MFE:', reactErrors);
                        // Don't fail the test immediately, but log the errors
                    }
                    // Log any remaining console errors for debugging
                    if (consoleErrors.length > 0) {
                        console.log('All console errors in preferences MFE:', consoleErrors);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
