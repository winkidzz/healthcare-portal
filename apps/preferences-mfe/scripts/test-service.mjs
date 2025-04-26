import fetch from 'node-fetch';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class PreferencesServiceError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'PreferencesServiceError';
        this.status = status;
    }
}

const preferencesService = {
    async getUserPreferences() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/preferences`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new PreferencesServiceError('Failed to fetch user preferences', response.status);
            }
            
            return response.json();
        } catch (error) {
            if (error instanceof PreferencesServiceError) {
                throw error;
            }
            throw new PreferencesServiceError('Error fetching user preferences');
        }
    },

    async updateTheme(theme) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/preferences/theme?theme=${theme}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new PreferencesServiceError('Failed to update theme', response.status);
            }
            return response.json();
        } catch (error) {
            if (error instanceof PreferencesServiceError) {
                throw error;
            }
            throw new PreferencesServiceError('Error updating theme');
        }
    },

    async updateNotificationPreference(type, enabled) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/preferences/notifications/${type}?enabled=${enabled}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new PreferencesServiceError('Failed to update notification preference', response.status);
            }
            return response.json();
        } catch (error) {
            if (error instanceof PreferencesServiceError) {
                throw error;
            }
            throw new PreferencesServiceError('Error updating notification preference');
        }
    }
};

async function testPreferencesService() {
    try {
        console.log('Testing preferences service...');
        
        // Test 1: Get user preferences
        console.log('\n1. Getting user preferences...');
        const preferences = await preferencesService.getUserPreferences();
        console.log('User preferences:', JSON.stringify(preferences, null, 2));
        
        // Test 2: Update theme
        console.log('\n2. Updating theme to "dark"...');
        const updatedTheme = await preferencesService.updateTheme('dark');
        console.log('Theme updated:', JSON.stringify(updatedTheme, null, 2));
        
        // Test 3: Get updated preferences
        console.log('\n3. Getting updated preferences...');
        const updatedPreferences = await preferencesService.getUserPreferences();
        console.log('Updated preferences:', JSON.stringify(updatedPreferences, null, 2));
        
        // Test 4: Update notification preference
        console.log('\n4. Updating email notification to false...');
        const updatedNotifications = await preferencesService.updateNotificationPreference('email', false);
        console.log('Notification preference updated:', JSON.stringify(updatedNotifications, null, 2));
        
        // Test 5: Get final preferences
        console.log('\n5. Getting final preferences...');
        const finalPreferences = await preferencesService.getUserPreferences();
        console.log('Final preferences:', JSON.stringify(finalPreferences, null, 2));
        
        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Error testing preferences service:', error);
        process.exit(1);
    }
}

testPreferencesService(); 