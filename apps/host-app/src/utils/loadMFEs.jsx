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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import dynamic from 'next/dynamic';
var MAX_RETRIES = 3;
var RETRY_DELAY = 1000;
var loadWithRetry = function (importFn_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([importFn_1], args_1, true), void 0, function (importFn, retries) {
        var error_1;
        if (retries === void 0) { retries = MAX_RETRIES; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, importFn()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    if (!(retries > 0)) return [3 /*break*/, 4];
                    console.log("Retrying import, ".concat(retries, " attempts remaining..."));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, RETRY_DELAY); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, loadWithRetry(importFn, retries - 1)];
                case 4: throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
};
export var PreferencesProvider = dynamic(function () {
    console.log('Loading PreferencesProvider module');
    return loadWithRetry(function () { return import('preferences_mfe/contexts/PreferencesContext'); })
        .then(function (mod) {
        console.log('PreferencesProvider module loaded successfully');
        return mod.PreferencesProvider;
    })
        .catch(function (error) {
        console.error('Failed to load PreferencesProvider module:', error);
        return function () { return function (_a) {
            var children = _a.children;
            return <>{children}</>;
        }; }; // Return a no-op provider on failure
    });
}, {
    ssr: false,
    loading: function () {
        console.log('Showing PreferencesProvider loading state');
        return <div>Loading preferences provider...</div>;
    }
});
export var Preferences = dynamic(function () {
    console.log('Loading Preferences module');
    return loadWithRetry(function () { return import('preferences_mfe/pages/preferences'); })
        .then(function (mod) {
        console.log('Preferences module loaded successfully');
        return mod.default;
    })
        .catch(function (error) {
        console.error('Failed to load Preferences module:', error);
        return function () { return <div>Failed to load preferences. Please try again later.</div>; };
    });
}, {
    ssr: false,
    loading: function () {
        console.log('Showing Preferences loading state');
        return <div>Loading preferences...</div>;
    }
});
export var loadPreferencesMFE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var container;
    return __generator(this, function (_a) {
        if (typeof window !== 'undefined') {
            try {
                container = document.getElementById('preferences-mfe');
                if (!container) {
                    console.error('Preferences MFE container not found');
                    return [2 /*return*/];
                }
                console.log('Loading preferences MFE...');
                // The remoteEntry is automatically loaded by Module Federation
                console.log('Preferences MFE loaded successfully');
            }
            catch (error) {
                console.error('Failed to load preferences MFE:', error);
            }
        }
        return [2 /*return*/];
    });
}); };
export var loadICDTestsMFE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var container, ICDTests, root, React_1, ReactDOM_1, reactRoot, error_2, container;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(typeof window !== 'undefined')) return [3 /*break*/, 6];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                container = document.getElementById('icd-tests-mfe');
                if (!container) {
                    console.error('ICD Tests MFE container not found');
                    return [2 /*return*/];
                }
                // Show loading state
                container.innerHTML = '<div class="loading">Loading ICD tests...</div>';
                return [4 /*yield*/, import('icd_tests_mfe/ICDTests')];
            case 2:
                ICDTests = (_a.sent()).default;
                root = document.createElement('div');
                container.innerHTML = '';
                container.appendChild(root);
                return [4 /*yield*/, import('react')];
            case 3:
                React_1 = _a.sent();
                return [4 /*yield*/, import('react-dom/client')];
            case 4:
                ReactDOM_1 = _a.sent();
                reactRoot = ReactDOM_1.createRoot(root);
                reactRoot.render(React_1.createElement(ICDTests));
                // Store root for cleanup
                window.icdTestsRoot = reactRoot;
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('Failed to load ICD tests MFE:', error_2);
                container = document.getElementById('icd-tests-mfe');
                if (container) {
                    container.innerHTML = '<div class="error">Failed to load ICD tests</div>';
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
