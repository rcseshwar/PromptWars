const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // Note: listModels is not directly on genAI in early versions, 
    // but we can try to find the models via the client or just try common names.
    console.log("Checking API access for key:", process.env.GEMINI_API_KEY?.substring(0, 10) + "...");
    
    // In newer SDKs, we might need a separate client.
    // For now, let's try a direct fetch to the discovery endpoint.
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log("Available Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Discovery failed:", e);
  }
}

listModels();
