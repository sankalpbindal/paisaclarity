module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key missing' });

  // Try every possible way to get the body
  let messages, system;

  try {
    // Method 1: already parsed by Vercel
    if (req.body && req.body.messages) {
      messages = req.body.messages;
      system   = req.body.system || '';
    }
    // Method 2: body is a string
    else if (typeof req.body === 'string') {
      const p = JSON.parse(req.body);
      messages = p.messages;
      system   = p.system || '';
    }
    // Method 3: read raw stream
    else {
      const raw = await new Promise((resolve, reject) => {
        let d = '';
        req.on('data', c => d += c);
        req.on('end',  () => resolve(d));
        req.on('error', reject);
      });
      const p = JSON.parse(raw);
      messages = p.messages;
      system   = p.system || '';
    }
  } catch (e) {
    return res.status(400).json({ error: 'Body parse failed: ' + e.message, body: String(req.body) });
  }

  if (!messages || !messages.length) {
    return res.status(400).json({ error: 'No messages found', body: String(req.body) });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system,
        messages,
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'Anthropic error' });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
};
