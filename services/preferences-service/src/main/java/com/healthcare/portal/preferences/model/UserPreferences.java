package com.healthcare.portal.preferences.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_preferences")
public class UserPreferences {
    @Id
    private String userId;
    private String theme;
    private NotificationPreferences notifications;
    private SecurityPreferences security;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NotificationPreferences {
        private boolean email;
        private boolean push;
        private boolean sms;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SecurityPreferences {
        private boolean twoFactorAuth;
        private boolean passwordChangeReminder;
        private boolean loginAlerts;
    }
} 