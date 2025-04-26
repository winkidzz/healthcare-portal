const axios = require('axios');

async function testPreferencesService() {
    try {
        // Test GET request
        console.log('Testing GET /preferences...');
        const getResponse = await axios.get('http://localhost:8080/api/preferences');
        console.log('GET Response:', getResponse.data);

        // Test POST request
        console.log('\nTesting POST /preferences...');
        const postResponse = await axios.post('http://localhost:8080/api/preferences', {
            userId: 'test-user-2',
            theme: 'light',
            notifications: {
                email: true,
                push: false,
                sms: true
            },
            security: {
                twoFactorAuth: true,
                passwordChangeReminder: false,
                loginAlerts: true
            }
        });
        console.log('POST Response:', postResponse.data);

        // Test PUT request
        console.log('\nTesting PUT /preferences...');
        const putResponse = await axios.put('http://localhost:8080/api/preferences', {
            userId: 'test-user-2',
            theme: 'dark',
            notifications: {
                email: true,
                push: true,
                sms: false
            },
            security: {
                twoFactorAuth: true,
                passwordChangeReminder: true,
                loginAlerts: true
            }
        });
        console.log('PUT Response:', putResponse.data);

        // Test DELETE request
        console.log('\nTesting DELETE /preferences...');
        const deleteResponse = await axios.delete('http://localhost:8080/api/preferences', {
            data: { userId: 'test-user-2' }
        });
        console.log('DELETE Response:', deleteResponse.data);

    } catch (error) {
        console.error('Error testing preferences service:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
    }
}

testPreferencesService(); 