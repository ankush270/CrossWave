import { spawn } from "child_process";
import { join } from "path";
import { execSync } from "child_process";

export const extractText = (imagePath) => {
  try {
    console.log("Checking and installing Python dependencies...");
    execSync(
      "python -m pip install --user easyocr opencv-python ultralytics huggingface_hub",
      { stdio: "inherit" }
    );
    console.log("Dependencies installed.");
  } catch (error) {
    console.error("Failed to install dependencies:", error);
  }

  console.log("Starting Aadhaar OCR process...");
  // Call Python script from Node.js
  execSync(`python ./src/microservices/kyc/aadhaar.py ${imagePath}`, {
    stdio: "inherit",
  });
};
// Function to extract text using Python script
// function extractText(imagePath) {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn("python3", [
//       join(__dirname, "aadhaar.py"),
//       imagePath,
//     ]);

//     let dataString = "";
//     pythonProcess.stdout.on("data", (data) => {
//       dataString += data.toString();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//       console.error(`Error: ${data}`);
//     });

//     pythonProcess.on("close", (code) => {
//       if (code === 0) {
//         try {
//           resolve(JSON.parse(dataString));
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         reject(new Error(`Python script exited with code ${code}`));
//       }
//     });
//   });
// }

// // Example Usage
// extractText("flower.jpg")
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
