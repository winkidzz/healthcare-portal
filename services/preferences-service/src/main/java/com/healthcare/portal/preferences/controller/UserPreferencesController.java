package com.healthcare.portal.preferences.controller;

import com.healthcare.portal.preferences.model.UserPreferences;
import com.healthcare.portal.preferences.service.UserPreferencesService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preferences")
@RequiredArgsConstructor
public class UserPreferencesController {
    private final UserPreferencesService service;
    private static final String DEFAULT_USER_ID = "test-user";
    private static final Logger log = LoggerFactory.getLogger(UserPreferencesController.class);

    @GetMapping
    public ResponseEntity<UserPreferences> getUserPreferences() {
        log.info("[GET /preferences] Fetching preferences for userId: {}", DEFAULT_USER_ID);
        UserPreferences result = service.getUserPreferences(DEFAULT_USER_ID);
        log.info("[GET /preferences] Result: {}", result);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<UserPreferences> createUserPreferences(@RequestBody UserPreferences preferences) {
        log.info("[POST /preferences] Creating preferences for userId: {} with body: {}", DEFAULT_USER_ID, preferences);
        UserPreferences result = service.updateUserPreferences(DEFAULT_USER_ID, preferences);
        log.info("[POST /preferences] Result: {}", result);
        return ResponseEntity.ok(result);
    }

    @PutMapping
    public ResponseEntity<UserPreferences> updateUserPreferences(@RequestBody UserPreferences preferences) {
        log.info("[PUT /preferences] Updating preferences for userId: {} with body: {}", DEFAULT_USER_ID, preferences);
        UserPreferences result = service.updateUserPreferences(DEFAULT_USER_ID, preferences);
        log.info("[PUT /preferences] Result: {}", result);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/theme")
    public ResponseEntity<UserPreferences> updateTheme(@RequestParam String theme) {
        log.info("[PUT /preferences/theme] Updating theme for userId: {} to: {}", DEFAULT_USER_ID, theme);
        UserPreferences result = service.updateTheme(DEFAULT_USER_ID, theme);
        log.info("[PUT /preferences/theme] Result: {}", result);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/notifications/{type}")
    public ResponseEntity<UserPreferences> updateNotificationPreference(
            @PathVariable String type,
            @RequestParam boolean enabled) {
        log.info("[PUT /preferences/notifications/{}] Updating notification for userId: {} to: {}", type, DEFAULT_USER_ID, enabled);
        UserPreferences result = service.updateNotificationPreference(DEFAULT_USER_ID, type, enabled);
        log.info("[PUT /preferences/notifications/{}] Result: {}", type, result);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/security/{type}")
    public ResponseEntity<UserPreferences> updateSecurityPreference(
            @PathVariable String type,
            @RequestParam boolean enabled) {
        log.info("[PUT /preferences/security/{}] Updating security for userId: {} to: {}", type, DEFAULT_USER_ID, enabled);
        UserPreferences result = service.updateSecurityPreference(DEFAULT_USER_ID, type, enabled);
        log.info("[PUT /preferences/security/{}] Result: {}", type, result);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUserPreferences(@RequestBody UserPreferences preferences) {
        log.info("[DELETE /preferences] Deleting preferences for userId: {}", preferences.getUserId());
        service.deleteUserPreferences(preferences.getUserId());
        log.info("[DELETE /preferences] Deleted for userId: {}", preferences.getUserId());
        return ResponseEntity.ok().build();
    }
} 