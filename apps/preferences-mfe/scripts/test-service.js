const { preferencesService } = require('../src/services/preferencesService.ts');

async function testPreferencesService() {
    try {
        console.log('Testing preferences service...');
        
        // Test 1: Get user preferences
        console.log('\n1. Getting user preferences...');
        const preferences = await preferencesService.getUserPreferences();
        console.log('User preferences:', JSON.stringify(preferences, null, 2));
        
        // Test 2: Update theme
        console.log('\n2. Updating theme to "dark"...');
        await preferencesService.updateTheme('dark');
        console.log('Theme updated successfully');
        
        // Test 3: Get updated preferences
        console.log('\n3. Getting updated preferences...');
        const updatedPreferences = await preferencesService.getUserPreferences();
        console.log('Updated preferences:', JSON.stringify(updatedPreferences, null, 2));
        
        // Test 4: Update notification preference
        console.log('\n4. Updating email notification to false...');
        await preferencesService.updateNotificationPreference('email', false);
        console.log('Notification preference updated successfully');
        
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