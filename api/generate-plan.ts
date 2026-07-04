import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY environment variable is missing.' });
    }

    const groq = new Groq({ apiKey: groqKey });
    const { people, diet, budget, disliked, busyness, profileType, age, college, gender } = req.body;

    const systemPrompt = `You are a culinary AI assistant that generates meal plans and grocery lists.
You must return a valid JSON object matching this schema exactly:

{
  "meals": {
    "breakfast": { 
      "name": "...", "type": "breakfast", "prepTime": "...", "desc": "...",
      "nutrition": { "calories": 300, "protein": "15g", "carbs": "30g", "fat": "10g" }
    },
    "lunch": { 
      "name": "...", "type": "lunch", "prepTime": "...", "desc": "...",
      "nutrition": { "calories": 500, "protein": "30g", "carbs": "45g", "fat": "15g" }
    },
    "dinner": { 
      "name": "...", "type": "dinner", "prepTime": "...", "desc": "...",
      "nutrition": { "calories": 600, "protein": "40g", "carbs": "50g", "fat": "20g" }
    }
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
  },
  "proteinSources": [
    { "meal": "Breakfast", "source": "Eggs", "amount": "12g" },
    { "meal": "Lunch", "source": "Chicken Breast", "amount": "30g" }
  ]
}

Use Indian Rupees (₹) as the currency context for estimating budget costs. Calculate protein amount properly based on typical nutritional data.`;

    const userPrompt = `Please generate a meal plan for:
- Profile: ${profileType} (Age: ${age}, Gender: ${gender}${profileType === 'student' ? `, College: ${college}` : `, Workplace: ${college}`})
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
}
