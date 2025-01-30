// Make sure to include these imports:
import multer from "multer";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
const genAI = new GoogleGenerativeAI("AIzaSyDiHYdawicnFhpGcZMoMSbpTBi65Rg6F68");
const fileManager = new GoogleAIFileManager(
  "AIzaSyDiHYdawicnFhpGcZMoMSbpTBi65Rg6F68"
);
import { fileURLToPath } from "url";
import { log } from "console";

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

    // Ensure the directory exists
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

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

const schema = {
  description: "Product Verification Results",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      status: {
        type: SchemaType.BOOLEAN,
        description: "Whether the image matches the product description.",
      },
      score: {
        type: SchemaType.NUMBER,
        description:
          "Confidence score of the image matching the product description.",
      },
      manualReview: {
        type: SchemaType.BOOLEAN,
        description: "Whether the result requires manual review.",
      },
      reason: {
        type: SchemaType.STRING,
        description: "Reason for the result.",
      },
    },
    required: ["status"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  //   systemInstruction: "Explain the images to the user.",
  systemInstruction:
    "You are an AI system responsible for verifying product listings on an e-commerce platform. Here are the things you need to check - 1. Is the product legal and suitable to be listed online. 2. Given the product description, name and images, determine if the images matches the product name and description. Give separate result for each image.\n",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

// export a function that takes in an array of image paths and returns the result of the model
const verify = async (name, description, imagePaths) => {
  // upload all images to gemini
  const promises = imagePaths.map((image) =>
    uploadToGemini(image, "image/jpg")
  );
  const uploadResults = await Promise.all(promises);
  // console.log(uploadResults);

  const allFiles = uploadResults.map((uploadResult) => ({
    fileData: { fileUri: uploadResult.uri, mimeType: uploadResult.mimeType },
  }));

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Product Name : ${name} | Product description : ${description}`,
          },
          ...allFiles,
        ],
      },
    ],
  });
  // console.log(result.response.text());
  return result.response.text();
};

export const verifyProduct = async (req, res) => {
  // console.log("Hell");

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }

  // Extract text fields
  const { name, description } = req.body;

  // Collect file paths
  const filePaths = req.files.map((file) =>
    path.join(__dirname, "uploads", file.filename)
  );

  let results = await verify(name, description, filePaths);

  results = JSON.parse(results);
  console.log(typeof results);
  // console.log(results);

  // if all images are verified, return success
  for (let result of results) {
    // console.log(result);

    if (!result["status"]) {
      return res.json({ success: false });
    }
  }
  res.json({ success: true });
  // else return failure
  // res.json({ success: false, message: result });
};

// =================================================================================================
// const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

// const promises = images.map((image) => uploadToGemini(image, "image/jpg"));
// const uploadResults = await Promise.all(promises);
// // console.log(uploadResults);

// // create data to send with prompt with all the image uris
// const allFiles = uploadResults.map((uploadResult) => ({
//   fileData: { fileUri: uploadResult.uri, mimeType: uploadResult.mimeType },
// }));
// // console.log(allFiles);

// const result = await model.generateContent({
//   contents: [
//     {
//       role: "user",
//       parts: [{ text: "Laptop" }, ...allFiles],
//     },
//   ],
// });
// console.log(result.response.text());
// =================================================================================================
