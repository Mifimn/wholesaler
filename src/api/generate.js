export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { image, surface } = req.body;

  try {
    const response = await fetch('https://api.claid.ai/v1/process', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: image, // This is the URL of the image you just snapped/uploaded
        operations: {
          background: { remove: true }, // Removes the background
          scene: { 
            model: "v2", 
            prompt: `Professional product shot on a ${surface} surface, realistic soft shadows, studio lighting, 4k` 
          }
        }
      })
    });

    const data = await response.json();
    
    // Check if Claid returned the new image successfully
    if (data.output?.url) {
      return res.status(200).json({ url: data.output.url });
    } else {
      return res.status(400).json({ error: 'AI Synthesis failed', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
