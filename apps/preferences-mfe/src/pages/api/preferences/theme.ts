import { NextApiRequest, NextApiResponse } from 'next';
import { log } from '../../../utils/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    log.info('Theme update request received', { 
      method: req.method,
      query: req.query,
      body: req.body,
      headers: req.headers
    });

    if (req.method !== 'PUT') {
      log.warn('Invalid method for theme update', { method: req.method });
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { theme } = req.body;
    if (!theme) {
      log.error('Theme value missing in request', { body: req.body });
      return res.status(400).json({ message: 'Theme value is required' });
    }

    // Get current preferences
    const currentPrefs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(res => res.json());

    log.info('Current preferences retrieved', { currentPrefs });

    // Update theme
    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...currentPrefs,
        theme
      }),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      log.error('Theme update failed', { 
        status: updateResponse.status,
        statusText: updateResponse.statusText,
        error: errorText,
        requestBody: { theme }
      });
      throw new Error(`Failed to update theme: ${errorText}`);
    }

    const updatedPrefs = await updateResponse.json();
    log.info('Theme updated successfully', {
      oldTheme: currentPrefs.theme,
      newTheme: theme,
      updatedPrefs
    });

    return res.status(200).json(updatedPrefs);
  } catch (error) {
    log.error('Error in theme update', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error
    });
    return res.status(500).json({
      message: 'Failed to update theme',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 