package com.healthcare.portal.preferences.service;

import com.healthcare.portal.preferences.model.UserPreferences;
import com.healthcare.portal.preferences.repository.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPreferencesService {
    private final UserPreferencesRepository repository;

    public UserPreferences getUserPreferences(String userId) {
        return repository.findById(userId)
                .orElseGet(() -> {
                    UserPreferences defaultPrefs = new UserPreferences();
                    defaultPrefs.setUserId(userId);
                    defaultPrefs.setTheme("system");
                    
                    UserPreferences.NotificationPreferences notifications = new UserPreferences.NotificationPreferences();
                    notifications.setEmail(true);
                    notifications.setPush(true);
                    notifications.setSms(false);
                    defaultPrefs.setNotifications(notifications);
                    
                    UserPreferences.SecurityPreferences security = new UserPreferences.SecurityPreferences();
                    security.setTwoFactorAuth(false);
                    security.setPasswordChangeReminder(true);
                    security.setLoginAlerts(true);
                    defaultPrefs.setSecurity(security);
                    
                    return repository.save(defaultPrefs);
                });
    }

    public UserPreferences updateUserPreferences(String userId, UserPreferences preferences) {
        preferences.setUserId(userId);
        return repository.save(preferences);
    }

    public UserPreferences updateTheme(String userId, String theme) {
        UserPreferences preferences = getUserPreferences(userId);
        preferences.setTheme(theme);
        return repository.save(preferences);
    }

    public UserPreferences updateNotificationPreference(String userId, String type, boolean enabled) {
        UserPreferences preferences = getUserPreferences(userId);
        UserPreferences.NotificationPreferences notifications = preferences.getNotifications();
        
        switch (type) {
            case "email" -> notifications.setEmail(enabled);
            case "push" -> notifications.setPush(enabled);
            case "sms" -> notifications.setSms(enabled);
            default -> throw new IllegalArgumentException("Invalid notification type: " + type);
        }
        
        return repository.save(preferences);
    }

    public UserPreferences updateSecurityPreference(String userId, String type, boolean enabled) {
        UserPreferences preferences = getUserPreferences(userId);
        UserPreferences.SecurityPreferences security = preferences.getSecurity();
        
        switch (type) {
            case "twoFactorAuth" -> security.setTwoFactorAuth(enabled);
            case "passwordChangeReminder" -> security.setPasswordChangeReminder(enabled);
            case "loginAlerts" -> security.setLoginAlerts(enabled);
            default -> throw new IllegalArgumentException("Invalid security preference type: " + type);
        }
        
        return repository.save(preferences);
    }

    public void deleteUserPreferences(String userId) {
        repository.deleteById(userId);
    }
} 