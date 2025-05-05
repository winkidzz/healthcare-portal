package com.healthcare.portal.preferences.service;

import com.healthcare.portal.preferences.model.UserPreferences;
import com.healthcare.portal.preferences.repository.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPreferencesService {
    private final UserPreferencesRepository repository;
    private static final Logger log = LoggerFactory.getLogger(UserPreferencesService.class);

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
        log.info("[updateUserPreferences] userId: {}, incoming: {}", userId, preferences);
        UserPreferences existing = getUserPreferences(userId);
        if (preferences.getTheme() != null) existing.setTheme(preferences.getTheme());
        if (preferences.getNotifications() != null) existing.setNotifications(preferences.getNotifications());
        if (preferences.getSecurity() != null) existing.setSecurity(preferences.getSecurity());
        log.info("[updateUserPreferences] merged state: {}", existing);
        UserPreferences saved = repository.save(existing);
        log.info("[updateUserPreferences] saved: {}", saved);
        return saved;
    }

    public UserPreferences updateTheme(String userId, String theme) {
        log.info("[updateTheme] userId: {}, theme: {}", userId, theme);
        UserPreferences preferences = getUserPreferences(userId);
        preferences.setTheme(theme);
        log.info("[updateTheme] merged state: {}", preferences);
        UserPreferences saved = repository.save(preferences);
        log.info("[updateTheme] saved: {}", saved);
        return saved;
    }

    public UserPreferences updateNotificationPreference(String userId, String type, boolean enabled) {
        log.info("[updateNotificationPreference] userId: {}, type: {}, enabled: {}", userId, type, enabled);
        UserPreferences preferences = getUserPreferences(userId);
        UserPreferences.NotificationPreferences notifications = preferences.getNotifications();
        
        switch (type) {
            case "email" -> notifications.setEmail(enabled);
            case "push" -> notifications.setPush(enabled);
            case "sms" -> notifications.setSms(enabled);
            default -> throw new IllegalArgumentException("Invalid notification type: " + type);
        }
        
        log.info("[updateNotificationPreference] merged state: {}", preferences);
        UserPreferences saved = repository.save(preferences);
        log.info("[updateNotificationPreference] saved: {}", saved);
        return saved;
    }

    public UserPreferences updateSecurityPreference(String userId, String type, boolean enabled) {
        log.info("[updateSecurityPreference] userId: {}, type: {}, enabled: {}", userId, type, enabled);
        UserPreferences preferences = getUserPreferences(userId);
        UserPreferences.SecurityPreferences security = preferences.getSecurity();
        
        switch (type) {
            case "twoFactorAuth" -> security.setTwoFactorAuth(enabled);
            case "passwordChangeReminder" -> security.setPasswordChangeReminder(enabled);
            case "loginAlerts" -> security.setLoginAlerts(enabled);
            default -> throw new IllegalArgumentException("Invalid security preference type: " + type);
        }
        
        log.info("[updateSecurityPreference] merged state: {}", preferences);
        UserPreferences saved = repository.save(preferences);
        log.info("[updateSecurityPreference] saved: {}", saved);
        return saved;
    }

    public void deleteUserPreferences(String userId) {
        log.info("[deleteUserPreferences] userId: {}", userId);
        repository.deleteById(userId);
    }
} 