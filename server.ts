import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Groq from 'groq-sdk';

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const groqKey = process.env.GROQ_API_KEY;
      if (!groqKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY environment variable is missing.' });
      }

      const groq = new Groq({ apiKey: groqKey });
      const { people, diet, budget, disliked, busyness } = req.body;

      const systemPrompt = `You are a culinary AI assistant that generates meal plans and grocery lists.
You must return a valid JSON object matching this schema exactly:

{
  "meals": {
    "breakfast": { "name": "...", "type": "breakfast", "prepTime": "...", "desc": "..." },
    "lunch": { "name": "...", "type": "lunch", "prepTime": "...", "desc": "..." },
    "dinner": { "name": "...", "type": "dinner", "prepTime": "...", "desc": "..." }
  },
  "groceryList": {
    "Produce": [{ "name": "...", "totalQty": 1, "unit": "..." }],
    "Dairy": [{ "name": "...", "totalQty": 1, "unit": "..." }],
    // ...other logical categories like Grains, Spices, Protein, etc.
  },
  "substitutions": [
    // only if the user disliked something, suggest a swap
    { "original": "...", "replacement": "...", "reason": "..." }
  ],
  "budget": {
    "totalCost": 1500, 
    "budget": ${budget},
    "isWithinBudget": true, // or false
    "difference": 500, // absolute difference between budget and total cost
    // If over budget, provide ONE suggested swap to save money:
    "suggestedSwap": { "original": "...", "replacement": "...", "reason": "..." } 
  }
}

Use Indian Rupees (₹) as the currency context for estimating budget costs.`;

      const userPrompt = `Please generate a meal plan for:
- People: ${people}
- Diet: ${diet}
- Daily Budget: ₹${budget}
- Disliked/Unavailable Ingredients: ${disliked || 'None'}
- Busyness Level: ${busyness} (If very busy, pick quick meals under 20 mins. If relaxed, can take 60+ mins.)

Make sure the grocery list quantities match the number of people. Only return valid JSON, no markdown formatting or extra text.`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        response_format: { type: 'json_object' }
      });

      const jsonStr = completion.choices[0]?.message?.content || '{}';
      res.json(JSON.parse(jsonStr));

    } catch (error: any) {
      console.error("Groq API Error:", error);
      res.status(500).json({ error: error.message || 'Failed to generate plan.' });
    }
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
