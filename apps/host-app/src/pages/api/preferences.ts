import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
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
    },
    language: "en",
    email: "user@example.com",
    displayName: "Jane Doe",
    timezone: "America/New_York",
    // Add more fields as needed for the Preferences component
  });
} 