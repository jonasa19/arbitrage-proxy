export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { apiKey } = req.query;
  if (!apiKey) return res.status(400).json({ error: 'Missing apiKey' });
  const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
  try {
    const upstream = await fetch(url);
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
