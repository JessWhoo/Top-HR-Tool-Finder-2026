
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { HRTool, HRAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * A utility function to retry a promise-based function with exponential backoff.
 * @param fn The async function to retry.
 * @param retries The maximum number of retries.
 * @param delay The initial delay in milliseconds.
 * @param backoff The multiplier for the delay.
 * @returns The result of the function if successful.
 */
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 4,
  delay = 2000,
  backoff = 2
): Promise<T> => {
  let attempt = 1;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) {
        console.error(`All retry attempts failed. Last error: ${error}`);
        throw error;
      }
      console.warn(
        `Attempt ${attempt} failed. Retrying in ${delay}ms... Error: ${error}`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= backoff;
      attempt++;
    }
  }
  // This part should be unreachable if logic is correct
  throw new Error("Retry mechanism failed unexpectedly.");
};


export async function fetchHRTools(): Promise<HRTool[]> {
  try {
    const prompt = `Generate a list of 6 innovative, fictional top HR tools for the year 2026. For each tool, provide its name, category (e.g., 'Recruitment & Onboarding', 'Employee Wellness', 'Performance Analytics', 'Learning & Development', 'Compensation & Benefits', 'HR Operations'), a short description, 3 key features as a string array, a rationale for why it will be a top tool in 2026, and a fictional website URL.`;

    // FIX: Explicitly type the response from the API call to ensure correct type inference.
    const response = await retryWithBackoff<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tools: {
              type: Type.ARRAY,
              description: "A list of innovative HR tools for 2026.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "The name of the HR tool.",
                  },
                  category: {
                    type: Type.STRING,
                    description: "The category the HR tool belongs to.",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A brief description of the tool.",
                  },
                  keyFeatures: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of key features.",
                  },
                  rationale: {
                    type: Type.STRING,
                    description: "Why this tool is considered a top choice for 2026.",
                  },
                  website: {
                    type: Type.STRING,
                    description: "A fictional website URL for the tool.",
                  },
                },
                required: ["name", "category", "description", "keyFeatures", "rationale", "website"],
              },
            },
          },
          required: ["tools"],
        },
      },
    }));

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    if (parsedResponse && Array.isArray(parsedResponse.tools)) {
      return parsedResponse.tools;
    } else {
      throw new Error("Invalid data structure received from API.");
    }
  } catch (error) {
    console.error("Error fetching HR tools:", error);
    throw new Error("Failed to generate HR tool insights. The service may be temporarily overloaded.");
  }
}

export async function fetchDEITools(): Promise<HRTool[]> {
  try {
    const prompt = `Generate a list of 3 innovative, fictional top HR tools for the year 2026, specifically focused on Diversity, Equity, and Inclusion (DEI). For each tool, provide its name, set its category to 'Diversity, Equity & Inclusion', provide a short description, 3 key features as a string array, a rationale for why it will be a top tool in 2026, and a fictional website URL.`;

    const response = await retryWithBackoff<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tools: {
              type: Type.ARRAY,
              description: "A list of innovative DEI-focused HR tools for 2026.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                  rationale: { type: Type.STRING },
                  website: { type: Type.STRING },
                },
                required: ["name", "category", "description", "keyFeatures", "rationale", "website"],
              },
            },
          },
          required: ["tools"],
        },
      },
    }));

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse && Array.isArray(parsedResponse.tools)) {
      return parsedResponse.tools;
    } else {
      throw new Error("Invalid data structure received from API for DEI tools.");
    }
  } catch (error) {
    console.error("Error fetching DEI tools:", error);
    throw new Error("Failed to generate DEI tool insights. The service may be temporarily overloaded.");
  }
}


export async function fetchHRAnalysis(): Promise<HRAnalysis> {
  try {
    const prompt = `Provide a concise analysis of how AI is currently impacting HR and predict its key growth areas for 2026. Then, list and briefly describe the top 5 emerging HR technologies and tools expected to be prominent in 2026, detailing their potential impact.`;

    // FIX: Explicitly type the response from the API call to ensure correct type inference.
    const response = await retryWithBackoff<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                currentImpact: {
                  type: Type.STRING,
                  description: "Analysis of AI's current impact on HR, written in a comprehensive paragraph.",
                },
                futureGrowth: {
                  type: Type.STRING,
                  description: "Prediction of AI's growth areas in HR for 2026, written in a comprehensive paragraph.",
                },
                emergingTechnologies: {
                  type: Type.ARRAY,
                  description: "A list of the top 5 emerging HR technologies for 2026.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: {
                        type: Type.STRING,
                        description: "The name of the technology.",
                      },
                      description: {
                        type: Type.STRING,
                        description: "A brief description of the technology.",
                      },
                      impact: {
                        type: Type.STRING,
                        description: "The potential impact of the technology on HR functions.",
                      },
                    },
                    required: ["name", "description", "impact"],
                  },
                },
              },
              required: ["currentImpact", "futureGrowth", "emergingTechnologies"],
            },
          },
          required: ["analysis"],
        },
      },
    }));

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse && parsedResponse.analysis) {
      return parsedResponse.analysis;
    } else {
      throw new Error("Invalid data structure received from API for analysis.");
    }
  } catch (error) {
    console.error("Error fetching HR analysis:", error);
    throw new Error("Failed to generate HR analysis. The service may be temporarily overloaded.");
  }
}
