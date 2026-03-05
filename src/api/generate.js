export default async function handler(req, res) {
  // Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, bg_color } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Source image is required' });
  }

  try {
    const formData = new FormData();
    formData.append('image_url', image);
    formData.append('size', 'auto');

    // Step 2 uses this to apply the white background
    if (bg_color) {
      formData.append('bg_color', bg_color);
    }

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVE_BG_API_KEY, // Set this in Vercel Dashboard
      },
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const buffer = Buffer.from(await blob.arrayBuffer());
      const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

      return res.status(200).json({ url: base64Image });
    } else {
      const errorData = await response.json();
      return res.status(400).json({ error: 'AI processing failed', details: errorData });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}