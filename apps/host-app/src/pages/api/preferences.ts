import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserPreferences } from '@healthcare-portal/shared-library/src/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreferences>
) {
  const preferences: UserPreferences = {
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
  res.status(200).json(preferences);
} 