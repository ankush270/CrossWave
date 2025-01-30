import { createCanvas, loadImage } from "canvas";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import { createWorker } from "tesseract.js";

// Tesseract.recognize(
//   "AnkurPCard.jpg",
//   "eng", // Language
//   {
//     logger: (m) => console.log(m),
//   }
// ).then(({ data: { text } }) => {
//   console.log(text); // Extracted text from image
// });

// Path to your local image file
// const imagePath = path.join(__dirname, "UditACard.jpg"); // Update the file path

async function preprocessImage(imageBuffer) {
  const image = await loadImage(imageBuffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  // Convert to grayscale
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);

  // save the processed image to a file
  fs.writeFileSync("processedImage.jpg", canvas.toBuffer());

  // Return the processed image as a Data URL
  return canvas.toDataURL();
}

// Read the image file from local disk
fs.readFile("RohitNNN.jpg", (err, data) => {
  if (err) {
    console.error("Error reading image file:", err);
    return;
  }

  // Process the image and perform OCR
  preprocessImage(data)
    .then(async (processedImage) => {
      // save the processed image to a file
      //   fs.writeFileSync("processedImage.jpg", processedImage);

      const worker = await createWorker("eng");

      await worker.setParameters({
        tessedit_char_whitelist: "0123456789",
      });
      const {
        data: { text },
      } = await worker.recognize(
        "https://tesseract.projectnaptha.com/img/eng_bw.png"
      );
      console.log(text);
      await worker.terminate();

      //   Tesseract.recognize(processedImage, "eng", {
      //     tessedit_char_whitelist: "0123456789", // Whitelist digits only
      //   })
      //     .then(({ data: { text } }) => {
      //       console.log("Extracted text:", text);
      //       const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]/;
      //       const panNumber = text.match(panRegex);
      //       console.log("PAN Number:", panNumber ? panNumber[0] : "Not Found");
      //       const aadhaarRegex = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}/;
      //       const aadhaarNumber = text.match(aadhaarRegex);
      //       console.log(
      //         "Aadhar Number:",
      //         aadhaarNumber ? aadhaarNumber[0] : "Not Found"
      //       );
      //     })
      //     .catch((error) => {
      //       console.error("Error during OCR processing:", error);
      //     });
    })
    .catch((error) => {
      console.error("Error processing image:", error);
    });
});
