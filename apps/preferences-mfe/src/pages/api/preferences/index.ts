import { NextApiRequest, NextApiResponse } from 'next';
import { log } from '../../../utils/logger';

interface UserPreferences {
  userId: string;
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordChangeReminder: boolean;
    loginAlerts: boolean;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    log.info('API Request received', { 
      method: req.method, 
      url: req.url,
      query: req.query,
      headers: req.headers
    });

    switch (req.method) {
      case 'GET':
        // Forward request to preferences service
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          const errorText = await response.text();
          log.error('Preferences service GET error', { 
            status: response.status, 
            statusText: response.statusText,
            error: errorText
          });
          throw new Error(`Preferences service returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        log.info('Preferences retrieved successfully', { data });
        return res.status(200).json(data);

      case 'POST':
      case 'PUT':
        const body = req.body as Partial<UserPreferences>;
        log.info('Updating preferences', { body });

        // Get current preferences first
        const currentPrefs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        }).then(res => res.json());

        // Merge current preferences with updates
        const updatedPrefs = {
          ...currentPrefs,
          ...body,
          notifications: {
            ...currentPrefs.notifications,
            ...(body.notifications || {})
          },
          security: {
            ...currentPrefs.security,
            ...(body.security || {})
          }
        };

        const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
          method: req.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updatedPrefs),
        });

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          log.error('Preferences service update error', { 
            status: updateResponse.status, 
            statusText: updateResponse.statusText,
            error: errorText,
            requestBody: updatedPrefs
          });
          throw new Error(`Preferences service returned ${updateResponse.status}: ${errorText}`);
        }

        const updatedData = await updateResponse.json();
        log.info('Preferences updated successfully', { 
          original: currentPrefs,
          updates: body,
          final: updatedData 
        });
        return res.status(200).json(updatedData);

      case 'DELETE':
        log.info('Deleting preferences');
        const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          log.error('Preferences service DELETE error', { 
            status: deleteResponse.status, 
            statusText: deleteResponse.statusText,
            error: errorText
          });
          throw new Error(`Preferences service returned ${deleteResponse.status}: ${errorText}`);
        }

        log.info('Preferences deleted successfully');
        return res.status(200).json({ message: 'Preferences deleted successfully' });

      default:
        log.warn('Unsupported method', { method: req.method });
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    log.error('Error in preferences API', { 
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error,
      request: {
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body
      }
    });
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 