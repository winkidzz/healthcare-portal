import React from 'react';
import { ReactNode } from 'react';
interface PreferencesProviderProps {
    children: ReactNode;
}
export declare const PreferencesProvider: React.ComponentType<PreferencesProviderProps>;
export declare const Preferences: React.ComponentType<{}>;
export declare const loadPreferencesMFE: () => Promise<void>;
export declare const loadICDTestsMFE: () => Promise<void>;
export {};
