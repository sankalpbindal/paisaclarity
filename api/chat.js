// /api/chat.js — Vercel Serverless Function
// Proxies requests from your frontend to Anthropic API
// API key stays server-side, never exposed to browser

export const config = {
  runtime: 'edge', // Vercel Edge Runtime — fastest, global CDN
};

// ── Rate limiting (simple in-memory per edge instance) ──
// For production, replace with Vercel KV or Upstash Redis
const requestCounts = new Map();

function getRateLimit(ip) {
  const key = ip + ':' + new Date().toDateString();
  const count = requestCounts.get(key) || 0;
  return count;
}

function incrementRateLimit(ip) {
  const key = ip + ':' + new Date().toDateString();
  requestCounts.set(key, (requestCounts.get(key) || 0) + 1);
  // Clean up old keys occasionally
  if (requestCounts.size > 10000) requestCounts.clear();
}

export default async function handler(req) {
  // ── CORS headers — allow only your domain ──
  const allowedOrigins = [
    'https://paisaclarity.vercel.app',
    'https://paisaclarity.in',
    'http://localhost:3000',  // for local testing
    'http://127.0.0.1:5500', // VS Code Live Server
  ];

  const origin = req.headers.get('origin') || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── Rate limiting — 20 requests per IP per day ──
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const dailyCount = getRateLimit(ip);
  const DAILY_LIMIT = 20; // adjust as needed

  if (dailyCount >= DAILY_LIMIT) {
    return new Response(
      JSON.stringify({ error: 'Daily limit reached. Please try again tomorrow.' }),
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  // ── Parse request body ──
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { messages, system } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── API key from environment variable (set in Vercel dashboard) ──
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured. Contact support.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  // ── Forward to Anthropic ──
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,                  // key added SERVER-SIDE only
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: system || '',
        messages: messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message || 'Anthropic API error' }),
        {
          status: anthropicRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Increment rate limit only on success
    incrementRateLimit(ip);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to reach AI service. Try again.' }),
      {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
