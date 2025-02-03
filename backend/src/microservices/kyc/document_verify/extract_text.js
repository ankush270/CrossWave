import { createCanvas, loadImage } from "canvas";
import fs from "fs/promises";
import { createWorker } from "tesseract.js";

async function preprocessImage(imageBuffer) {
  const image = await loadImage(imageBuffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  // Draw the original image on the canvas.
  ctx.drawImage(image, 0, 0);

  // Convert to grayscale.
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);

  // Optionally, save the processed image to a file for debugging.
  fs.writeFile("processedImage.jpg", canvas.toBuffer(), (err) => {
    if (err) console.error("Error writing processed image:", err);
  });

  // Return the processed image as a Data URL.
  return canvas.toDataURL();
}

export async function extractText(imagePath) {
  try {
    // Read the image file from disk.
    const imageBuffer = await fs.readFile(imagePath);

    // Preprocess the image (e.g., convert to grayscale).
    const processedImage = await preprocessImage(imageBuffer);

    // Create and configure the Tesseract worker.
    const worker = await createWorker("eng");

    // (Optional) Set parameters, e.g., to whitelist digits only.
    // await worker.setParameters({
    //   tessedit_char_whitelist: "0123456789",
    // });

    // Recognize text from the processed image.
    const {
      data: { text },
    } = await worker.recognize(processedImage);

    // Terminate the worker to free up resources.
    await worker.terminate();

    // Return the extracted text.
    return text;
  } catch (error) {
    console.error("Error during OCR processing:", error);
    throw error;
  }
}

// const text = await extractText("Test Docs/UAE/Identity.jpg");
// console.log("Extracted Text:", text);
