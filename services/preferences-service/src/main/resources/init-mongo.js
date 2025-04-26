db = db.getSiblingDB('healthcare_portal');

db.user_preferences.insertOne({
    userId: "test-user",
    theme: "light",
    notifications: {
        email: true,
        push: true,
        sms: false
    },
    security: {
        twoFactorAuth: false,
        passwordChangeReminder: true,
        loginAlerts: true
    }
}); 