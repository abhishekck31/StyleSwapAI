
import { NextRequest } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request: NextRequest) {
  try {
    // Read image from request
    const imageBuffer = Buffer.from(await request.arrayBuffer());

    // Get API key from env
    const apiKey = process.env.NANO_BANANA_API_KEY || '';
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not set in environment.' }), { status: 500 });
    }

    // Get prompt from query
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get('prompt') || 'Add new elements and designs to this room.';

    // Prepare form data for Nano Banana API (Node.js compatible)
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'room.png',
      contentType: 'image/png',
    });
    formData.append('prompt', prompt);

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
      return new Response(JSON.stringify({ error: 'Nano Banana API error', details: apiError?.response?.data || apiError.message }), { status: 500 });
    }

    if (nanoResponse.status !== 200) {
      console.error('Nano Banana API non-200 response:', nanoResponse.status, nanoResponse.data);
      return new Response(JSON.stringify({ error: 'Failed to edit image.', details: nanoResponse.data }), { status: 500 });
    }

    console.log('Nano Banana API success, returning image.');
    return new Response(Buffer.from(new Uint8Array(nanoResponse.data as ArrayBuffer)), {
      status: 200,
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to process image.' }), { status: 500 });
  }
}
