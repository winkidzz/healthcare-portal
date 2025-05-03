import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserPreferences } from '@healthcare-portal/shared-library/src/types';

// In-memory preferences store (for demo; replace with DB in production)
let preferences: UserPreferences = {
  theme: "light",
  notifications: {
    email: true,
    push: false,
    sms: false
  },
  security: {
    twoFactorAuth: false,
    passwordChangeReminder: true,
    loginAlerts: true
  }
};

function validatePreferences(obj: any): UserPreferences {
  // Ensure all required fields are present and fallback to defaults if missing
  return {
    theme: obj.theme || "light",
    notifications: {
      email: obj.notifications?.email ?? true,
      push: obj.notifications?.push ?? false,
      sms: obj.notifications?.sms ?? false
    },
    security: {
      twoFactorAuth: obj.security?.twoFactorAuth ?? false,
      passwordChangeReminder: obj.security?.passwordChangeReminder ?? true,
      loginAlerts: obj.security?.loginAlerts ?? true
    }
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreferences>
) {
  if (req.method === 'GET') {
    console.log('[API] GET /api/preferences', preferences);
    res.status(200).json(preferences);
  } else if (req.method === 'PUT') {
    let update = req.body;
    if (typeof update === 'string') {
      try { update = JSON.parse(update); } catch (e) { update = {}; }
    }
    console.log('[API] PUT /api/preferences update:', update);
    preferences = validatePreferences({
      ...preferences,
      ...update,
      notifications: {
        ...preferences.notifications,
        ...(update.notifications || {})
      },
      security: {
        ...preferences.security,
        ...(update.security || {})
      }
    });
    console.log('[API] PUT /api/preferences new state:', preferences);
    res.status(200).json(preferences);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 