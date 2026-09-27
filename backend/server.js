const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "DevFix AI Backend is running 🚀",
  });
});

// Analyze code/error with Gemini
app.post("/api/analyze", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({
      message: "Please provide code or an error message.",
    });
  }

  const selectedLanguage = language || "Unknown";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: `
You are DevFix AI, an expert software debugging assistant.

The programming language selected by the user is:
${selectedLanguage}

Analyze the following code or error specifically in the context of that language.

Return a structured debugging report containing:

1. problem
2. likely cause
3. clear explanation
4. suggested fix
5. corrected code
6. testing suggestion
7. test cases

Requirements:
- Be technically accurate.
- Explain the issue clearly.
- Give practical fixes.
- Keep corrected code valid for the selected language.
- Do not invent an error that is not present.
- If corrected code is not possible, return an empty string for correctedCode.
- Always return all requested fields.
- Return only valid JSON.

User input:

${code}
      `,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            problem: {
              type: "string",
            },

            cause: {
              type: "string",
            },

            explanation: {
              type: "string",
            },

            suggestedFix: {
              type: "string",
            },

            correctedCode: {
              type: "string",
            },

            testingSuggestion: {
              type: "string",
            },

            testCases: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "problem",
            "cause",
            "explanation",
            "suggestedFix",
            "correctedCode",
            "testingSuggestion",
            "testCases",
          ],
        },
      },
    });

    const analysis = JSON.parse(response.text);

    res.json({
      success: true,
      language: selectedLanguage,
      analysis,
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed.",
    });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevFix AI Backend running on port ${PORT}`);
});