import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set in environment.' });
  }

  try {
    const { imageData } = req.body;
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:analyzeImage?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error?.message || 'Gemini API error');
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to suggest style.' });
  }
}
