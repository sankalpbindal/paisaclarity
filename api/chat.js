module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key missing' });

  // Read raw body
  let messages, system;
  try {
    const buf = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });
    const parsed = JSON.parse(buf.toString('utf8'));
    messages = parsed.messages;
    system   = parsed.system || '';
  } catch (e) {
    return res.status(400).json({ error: 'Parse error: ' + e.message });
  }

  if (!messages || !messages.length) {
    return res.status(400).json({ error: 'No messages found' });
  }

  // Groq uses OpenAI-compatible API format
  // System prompt goes as first message with role 'system'
  const groqMessages = [
    { role: 'system', content: system },
    ...messages
  ];

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // best free model on Groq
        max_tokens: 1024,
        messages: groqMessages,
      }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'Groq error' });

    // Convert Groq response format to Anthropic format so ask.html needs no changes
    const text = data.choices?.[0]?.message?.content || 'No response received';
    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
};
