export default async function handler(req, res) {
  // 1. Security Check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, surface } = req.body;

  // 2. Data Validation
  if (!image) {
    return res.status(400).json({ error: 'Source image is required' });
  }

  try {
    // 3. Connect to Claid.ai API
    const response = await fetch('https://api.claid.ai/v1/process', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: image,
        operations: {
          background: { remove: true }, // Removes original snap
          scene: { 
            model: "v2", 
            prompt: `Product sitting on a professional ${surface} surface, soft studio lighting, realistic contact shadows, 4k resolution` 
          } // Generates the environment stage
        }
      })
    });

    const data = await response.json();

    // 4. Return the AI-generated image URL
    if (data.output?.url) {
      return res.status(200).json({ url: data.output.url });
    } else {
      console.error("Claid Error Response:", data);
      return res.status(400).json({ error: 'AI Synthesis failed', details: data });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
