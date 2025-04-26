package com.healthcare.portal.preferences.controller;

import com.healthcare.portal.preferences.model.UserPreferences;
import com.healthcare.portal.preferences.service.UserPreferencesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/preferences")
@RequiredArgsConstructor
public class UserPreferencesController {
    private final UserPreferencesService service;
    private static final String DEFAULT_USER_ID = "test-user";

    @GetMapping
    public ResponseEntity<UserPreferences> getUserPreferences() {
        return ResponseEntity.ok(service.getUserPreferences(DEFAULT_USER_ID));
    }

    @PostMapping
    public ResponseEntity<UserPreferences> createUserPreferences(@RequestBody UserPreferences preferences) {
        return ResponseEntity.ok(service.updateUserPreferences(DEFAULT_USER_ID, preferences));
    }

    @PutMapping
    public ResponseEntity<UserPreferences> updateUserPreferences(@RequestBody UserPreferences preferences) {
        return ResponseEntity.ok(service.updateUserPreferences(DEFAULT_USER_ID, preferences));
    }

    @PutMapping("/theme")
    public ResponseEntity<UserPreferences> updateTheme(@RequestParam String theme) {
        return ResponseEntity.ok(service.updateTheme(DEFAULT_USER_ID, theme));
    }

    @PutMapping("/notifications/{type}")
    public ResponseEntity<UserPreferences> updateNotificationPreference(
            @PathVariable String type,
            @RequestParam boolean enabled) {
        return ResponseEntity.ok(service.updateNotificationPreference(DEFAULT_USER_ID, type, enabled));
    }

    @PutMapping("/security/{type}")
    public ResponseEntity<UserPreferences> updateSecurityPreference(
            @PathVariable String type,
            @RequestParam boolean enabled) {
        return ResponseEntity.ok(service.updateSecurityPreference(DEFAULT_USER_ID, type, enabled));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUserPreferences(@RequestBody UserPreferences preferences) {
        service.deleteUserPreferences(preferences.getUserId());
        return ResponseEntity.ok().build();
    }
} 