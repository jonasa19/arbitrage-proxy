export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { sport, apiKey } = req.query;
  if (!sport || !apiKey) return res.status(400).json({ error: 'Missing params' });
  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=us,uk&markets=h2h&oddsFormat=decimal`;
  const upstream = await fetch(url);
  const data = await upstream.json();
  const remaining = upstream.headers.get('x-requests-remaining');
  if (remaining) res.setHeader('x-requests-remaining', remaining);
  return res.status(upstream.status).json(data);
}
