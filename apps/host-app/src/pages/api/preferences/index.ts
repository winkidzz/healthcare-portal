import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } }; // Disable Next.js body parsing for raw streaming

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'http://localhost:3001/api/preferences';

  // Prepare headers, omitting problematic ones
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (
      key.toLowerCase() !== 'host' &&
      key.toLowerCase() !== 'content-length' &&
      typeof value === 'string'
    ) {
      headers[key] = value;
    }
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method: req.method,
    headers,
    // @ts-ignore
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined, // Pipe the raw body
    redirect: 'manual',
  };

  // Log incoming request and fetch options
  console.log('[Proxy] Incoming request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
  });
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    console.log('[Proxy] Incoming body:', req.body);
  }
  console.log('[Proxy] Outgoing fetch options:', fetchOptions);

  try {
    const response = await fetch(url, fetchOptions);
    console.log('[Proxy] Backend response status:', response.status);

    // Pipe status and headers
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(key, value);
    });

    // Pipe the response body (Web ReadableStream to Node.js response)
    if (response.body) {
      // Node 18+ supports Readable.fromWeb
      // @ts-ignore
      if (typeof Readable !== 'undefined' && Readable.fromWeb) {
        // @ts-ignore
        const { Readable } = await import('stream');
        // @ts-ignore
        Readable.fromWeb(response.body).pipe(res);
      } else {
        // Fallback: buffer the response and send
        const buffer = Buffer.from(await response.arrayBuffer());
        res.end(buffer);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error('[Proxy] Streaming proxy error:', error);
    // Fallback: try a simple fetch (GET only, no streaming)
    try {
      console.log('[Proxy] Fallback: simple fetch (GET)');
      const fallbackRes = await fetch(url, { method: 'GET', headers });
      const text = await fallbackRes.text();
      res.status(fallbackRes.status).send(text);
      console.log('[Proxy] Fallback response status:', fallbackRes.status);
    } catch (fallbackError) {
      console.error('[Proxy] Fallback fetch error:', fallbackError);
      res.status(500).json({ error: 'Proxy failed', details: fallbackError instanceof Error ? fallbackError.message : fallbackError });
    }
  }
} 