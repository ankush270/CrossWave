// Make sure to include these imports:
import multer from "multer";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { fileURLToPath } from "url";

// console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Create __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =================================================================================================
// Ensure the "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration (Saves to /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

// =================================================================================================
// Utility function to upload a file to Gemini.
async function uploadToGemini(filePath, mimeType) {
  const uploadResult = await fileManager.uploadFile(filePath, {
    mimeType,
    displayName: filePath,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

// Define the output schema for document verification
const docSchema = {
  description: "Document Verification Result",
  type: SchemaType.OBJECT,
  properties: {
    verified: {
      type: SchemaType.BOOLEAN,
      description: "Whether the document is verified as valid.",
    },
  },
  required: ["verified"],
};

// Helper function to generate a system instruction based on document type.
function getSystemInstruction(documentType) {
  return `You are an AI document verifier specialized in ${documentType} documents. Analyze the provided image and determine whether it is a valid ${documentType}. Return a JSON object strictly following the schema: {verified: BOOLEAN}.`;
}

export async function LLMverifyDocument(filePath, documentType) {
  const referenceFilePath = path.join(
    __dirname,
    "Test Docs",
    `${documentType}.jpg`
  );
  const referenceUploadResult = await uploadToGemini(
    referenceFilePath,
    "image/jpg"
  );
  const referenceFileContent = {
    fileData: {
      fileUri: referenceUploadResult.uri,
      mimeType: referenceUploadResult.mimeType,
    },
  };
  // Assume the image is a JPG. Adjust the MIME type if needed.
  const mimeType = "image/jpg";

  // Upload the document image
  const uploadResult = await uploadToGemini(filePath, mimeType);

  // Wrap the uploaded file info to pass as content
  const userFileContent = {
    fileData: { fileUri: uploadResult.uri, mimeType: uploadResult.mimeType },
  };

  // Create a dedicated generative model instance with the tailored system instruction
  const docModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemInstruction(documentType),
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: docSchema,
    },
  });

  // One-shot prompting: pass a text instruction along with the file data.
  const result = await docModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an AI document verifier specialized in ${documentType} documents. Below is a reference image showing what a valid ${documentType} should look like.`,
          },
          referenceFileContent,
          {
            text: `Now, please verify the following uploaded ${documentType} document. Return a JSON object strictly following the schema: {verified: BOOLEAN}.`,
          },
          userFileContent,
        ],
      },
    ],
  });

  // Parse and return the JSON response from the model
  const outputText = result.response.text();
  return JSON.parse(outputText);
}

/*
===============================
Example usage:
===============================

import { verifyDocument } from "./path/to/this/file.js";

(async () => {
  try {
    // Example: Verify a passport document
    const filePath = path.join(__dirname, "uploads", "example-passport.jpg");
    const documentType = "passport";
    const verificationResult = await LLMverifyDocument(filePath, documentType);
    console.log("Verification Result:", verificationResult);
  } catch (error) {
    console.error("Error during document verification:", error);
  }
})();
*/
