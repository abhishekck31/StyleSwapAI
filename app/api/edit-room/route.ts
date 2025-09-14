import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};


// Helper to get API key from env
function getApiKey() {
  return process.env.NANO_BANANA_API_KEY || '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read image from request
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.from(chunk));
    }
    const imageBuffer = Buffer.concat(chunks);

    // Get API key from env
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not set in environment.' });
    }

    // Get prompt from query
    const prompt = req.query.prompt || 'Add new elements and designs to this room.';

    // Prepare form data for Nano Banana API (Node.js compatible)
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'room.png',
      contentType: 'image/png',
    });
    formData.append('prompt', prompt as string);

    // Send request to Nano Banana API using axios
    let nanoResponse;
    try {
      nanoResponse = await axios.post(
        'https://api.nanobanana.com/v1/edit-room',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${apiKey}`,
          },
          responseType: 'arraybuffer',
        }
      );
    } catch (apiError: any) {
      console.error('Nano Banana API error:', apiError?.response?.data || apiError.message);
      return res.status(500).json({ error: 'Nano Banana API error', details: apiError?.response?.data || apiError.message });
    }

    if (nanoResponse.status !== 200) {
      console.error('Nano Banana API non-200 response:', nanoResponse.status, nanoResponse.data);
      return res.status(500).json({ error: 'Failed to edit image.', details: nanoResponse.data });
    }

    console.log('Nano Banana API success, returning image.');
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(Buffer.from(new Uint8Array(nanoResponse.data as ArrayBuffer)));
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to process image.' });
  }
}
