"use server";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const schema: any = {
  description: "Aura Link structured response for critical intent",
  type: SchemaType.OBJECT,
  properties: {
    intent: {
      type: SchemaType.STRING,
      description: "Classification of intent (EMERGENCY_ACCIDENT, HEALTHCARE_TRIAGE, CIVIC_ISSUE, GENERAL_ASSISTANCE)",
    },
    urgency: {
      type: SchemaType.STRING,
      description: "Urgency category (CRITICAL, HIGH, NORMAL, LOW)",
    },
    payload: {
      type: SchemaType.OBJECT,
      description: "Extracted data payload based on context",
    },
    actions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Immediate automated or suggested real-world actions",
    },
    explanation: {
      type: SchemaType.STRING,
      description: "Brief rationale for the classification and actions taken",
    }
  },
  required: ["intent", "urgency", "payload", "actions", "explanation"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Using the confirmed available high-performance model
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const SYSTEM_PROMPT = `
You are the Aura Link Core Engine, a critical AI response layer for societal benefit. 
Your task is to convert messy, multimodal human inputs (text, voice, images) into high-integrity structured payloads.

### OUTPUT GUIDELINES:
1.  **intent**: Choose from [EMERGENCY_ACCIDENT, HEALTHCARE_TRIAGE, CIVIC_ISSUE, ACCESSIBILITY_GUIDE, GENERAL_ASSISTANCE].
2.  **urgency**: Choose from [CRITICAL, HIGH, NORMAL, LOW].
3.  **payload**: A detailed object containing extracted tokens (e.g., location, symptoms, identifiers).
4.  **actions**: A list of specific, real-world strings (e.g., "Dispatch Fire Unit 7", "Alert Nearest Hospital").
5.  **explanation**: A 1-sentence professional summary.

### EXAMPLE:
Input: "Flipped car on 5th Ave, lots of smoke!"
Output: {
  "intent": "EMERGENCY_ACCIDENT",
  "urgency": "CRITICAL",
  "payload": { "location": "5th Ave", "incident": "Vehicle Rollover", "hazards": ["Smoke", "Fire"] },
  "actions": ["Dispatch Fire & Rescue", "Signal Police for Traffic Control"],
  "explanation": "Critical vehicle accident with active fire hazard detected on 5th Ave."
}
`;

export async function processSignal(formData: FormData) {
  const text = formData.get("text") as string;
  const file = formData.get("image") as File;

  // Safe check: If key is non-existent or placeholder, fall back to heuristic processing
  const isValidKey = API_KEY && API_KEY !== "YOUR_GEMINI_API_KEY_HERE";

  if (!isValidKey) {
    console.warn("Aura Link: Valid GEMINI_API_KEY is not configured. Using local logic bridge.");
    return mockHeuristic(text);
  }

  try {
    const parts: any[] = [{ text: `${SYSTEM_PROMPT}\nUser Input: ${text}` }];

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error: any) {
    console.error("Gemini Engine Error:", error);
    // Return detailed error if possible for diagnosis
    const msg = error?.message || "Internal engine collision. Check GCP quota/API key.";
    return { error: `Gemini Error: ${msg}` };
  }
}

// Heuristic fallback for when API key is not yet set up locally but the user wants to test "functionality"
function mockHeuristic(text: string) {
  const lower = text.toLowerCase();
  
  // Emergency Context
  if (lower.includes("crash") || lower.includes("smoke") || lower.includes("fire") || lower.includes("accident")) {
    return {
      intent: "EMERGENCY_ACCIDENT",
      urgency: "CRITICAL",
      payload: { incident: "Active Crash/Fire", detection: "Aura Audio/Text Analysis" },
      actions: ["Dispatching Emergency Services", "Initiating Area Evacuation Protocol"],
      explanation: "Life-threatening signal detected via primary emergency keywords."
    };
  }
  
  // Healthcare Context
  if (lower.includes("pain") || lower.includes("chest") || lower.includes("blood") || lower.includes("symptom")) {
    return {
      intent: "HEALTHCARE_TRIAGE",
      urgency: "HIGH",
      payload: { status: "Acute Distress", primary_concern: "Medical Emergency" },
      actions: ["Alerting Nearest Cardiology/Trauma Unit", "Sending First-Aid Protocols"],
      explanation: "Medical distress indicators identified. Escalating to high priority."
    };
  }

  // Civic Context
  if (lower.includes("broken") || lower.includes("traffic") || lower.includes("leak") || lower.includes("infrastructure")) {
    return {
      intent: "CIVIC_ISSUE",
      urgency: "NORMAL",
      payload: { issue: "Infrastructure Failure", severity: "Moderate" },
      actions: ["Logging to Public Works Dashboard", "Mapping Incident to City Grid"],
      explanation: "Non-critical civic infrastructure issue identified for standard maintenance workflow."
    };
  }

  return {
    intent: "GENERAL_ASSISTANCE",
    urgency: "NORMAL",
    payload: { status: "Query Verified", data: "Knowledge Base Search Active" },
    actions: ["Providing Information Hub Access", "Connecting to Specialist Node"],
    explanation: "Standard assistance requested. No immediate critical threat detected."
  };
}
