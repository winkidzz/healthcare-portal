import { NextApiRequest, NextApiResponse } from 'next';
import { log } from '../../../utils/logger';

interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    log.info('Notification preferences update request received', { 
      method: req.method,
      query: req.query,
      body: req.body,
      headers: req.headers
    });

    if (req.method !== 'PUT') {
      log.warn('Invalid method for notification preferences update', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const updates: NotificationPreferences = req.body;
    
    // Validate the update payload
    if (typeof updates !== 'object' || updates === null) {
      log.error('Invalid notification preferences format', { body: req.body });
      return res.status(400).json({ message: 'Invalid notification preferences format' });
    }

    // Validate each preference is a boolean if provided
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && typeof value !== 'boolean') {
        log.error('Invalid notification preference value', { key, value });
        return res.status(400).json({ 
          message: `Invalid value for ${key}. Expected boolean, got ${typeof value}` 
        });
      }
    }

    // Get current preferences
    const currentPrefs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => res.json());

    log.info('Current preferences retrieved', { currentPrefs });

    // Update notifications
    const updatedPrefs = {
      ...currentPrefs,
      notifications: {
        ...currentPrefs.notifications,
        ...updates
      }
    };

    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updatedPrefs),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      log.error('Notification preferences update failed', { 
        status: updateResponse.status,
        statusText: updateResponse.statusText,
        error: errorText,
        requestBody: updates
      });
      throw new Error(`Failed to update notification preferences: ${errorText}`);
    }

    const result = await updateResponse.json();
    log.info('Notification preferences updated successfully', {
      oldPreferences: currentPrefs.notifications,
      updates,
      newPreferences: result.notifications
    });

    return res.status(200).json(result);
  } catch (error) {
    log.error('Error in notification preferences update', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error
    });
    return res.status(500).json({
      message: 'Failed to update notification preferences',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 