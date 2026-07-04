# CookPlan - AI Meal Planner 🍳

![CookPlan Header](https://via.placeholder.com/1200x400/2B2620/D97B3F?text=CookPlan+-+Your+Personalized+AI+Meal+Assistant)

**CookPlan** is a smart, AI-powered meal planning assistant designed to generate personalized daily menus, automate grocery lists, and provide actionable nutritional and budget insights. Built for students, working professionals, and culinary enthusiasts alike.

## ✨ Features

- **🧠 Context-Aware Meal Generation**: Leverages LLaMA 3.3 70b (via Groq) to generate highly tailored breakfast, lunch, and dinner plans based on your age, gender, occupation (Student/Professional), and daily schedule busyness.
- **💰 Smart Budget Analysis**: Estimates meal costs in Indian Rupees (₹), visually tracks against your daily budget, and intelligently suggests ingredient swaps if you are over budget.
- **🍗 Nutritional & Protein Insights**: Calculates macros (Calories, Protein, Carbs, Fat) for every meal and isolates high-protein sources into a dedicated dashboard view.
- **🛒 Automated Grocery & Checklists**: Consolidates ingredients across all meals into categorized grocery lists, complete with an interactive shopping checklist UI.
- **🔄 Intelligent Substitutions**: Recommends smart ingredient swaps for items you dislike or don't have available.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React (Icons)
- **Backend / API**: Vercel Serverless Functions (`@vercel/node`)
- **AI Integration**: Groq API (`llama-3.3-70b-versatile`)
- **Deployment**: Vercel / Google Cloud Run

## 📂 Project Structure

```text
├── api/
│   └── generate-plan.ts    # Vercel Serverless Function handling AI logic
├── public/
│   └── favicon.svg         # App branding and logo
├── src/
│   ├── components/         # Modular React UI components (Sidebar, MealPlan, etc.)
│   ├── types.ts            # Global TypeScript interfaces
│   ├── App.tsx             # Main application state and layout
│   └── index.css           # Tailwind configuration and CSS variables
├── .env.example            # Environment variables template
└── vite.config.ts          # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A [Groq API Key](https://console.groq.com/keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cookplan.git
   cd cookplan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Copy the `.env.example` file to `.env` and add your Groq API key:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and set `GROQ_API_KEY=your_actual_api_key_here`*

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The app will start locally, generally accessible at `http://localhost:3000`.

## ☁️ Deployment

CookPlan is optimized for deployment on **Vercel**. 

1. Push your code to a GitHub repository.
2. Import the repository into your Vercel Dashboard.
3. In the Vercel project settings, add your `GROQ_API_KEY` to the **Environment Variables**.
4. Deploy! The `/api/generate-plan.ts` endpoint will automatically be deployed as a Vercel Serverless Function.

## 💡 Why CookPlan? (Hackathon Insight)

Meal planning often involves a disconnect between *what we want to eat*, *what we can afford*, and *how much time we have*. CookPlan bridges this gap by using a generative AI model to act as a personal nutritionist, financial planner, and chef—all wrapped into one clean, modern interface.

---
*Built with ❤️ for a healthier, more organized lifestyle.*
