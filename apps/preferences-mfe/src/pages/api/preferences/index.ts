import { NextApiRequest, NextApiResponse } from 'next';
import type { UserPreferences } from '@healthcare-portal/shared-library/src/types/preferences';

const mockPreferences: UserPreferences = {
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  security: {
    twoFactorAuth: false,
    passwordChangeReminder: true,
    loginAlerts: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreferences | { error: string }>
) {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json(mockPreferences);
      case 'PUT':
        const updatedPreferences = { ...mockPreferences, ...req.body };
        return res.status(200).json(updatedPreferences);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in preferences API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 