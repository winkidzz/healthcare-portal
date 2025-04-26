package com.healthcare.portal.preferences.repository;

import com.healthcare.portal.preferences.model.UserPreferences;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPreferencesRepository extends MongoRepository<UserPreferences, String> {
} 