import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserPreferences } from '@healthcare-portal/shared-library/src/types';

const BACKEND_URL = 'http://localhost:8080/api/preferences';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreferences>
) {
  if (req.method === 'GET' || req.method === 'PUT') {
    const backendRes = await fetch(BACKEND_URL, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      ...(req.method === 'PUT' ? { body: JSON.stringify(req.body) } : {})
    });
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 