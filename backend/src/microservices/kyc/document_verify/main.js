import { extractText } from "./extract_text.js";
import { validateAadhaarNumber } from "./aadhaar/aadhaar_verify.js";
import { validatePAN } from "./PAN/PAN_verify.js";
import { validateTAN } from "./TAN/TAN_verify.js";
import { validateCIN } from "./CIN/CIN_verify.js";
import { validateIEC } from "./IEC/IEC_verify.js";
import { validateGSTIN } from "./GSTIN/GSTIN_verify.js";
import { LLMverifyDocument } from "./llm_verify.js";

const dummy = (num) => {
  return { isValid: false };
};

const docTypeFunctionMap = {
  aadhaar: [validateAadhaarNumber],
  pancard: [validatePAN],
  tan: [validateTAN],
  cic: [validateCIN, validatePAN, validateTAN],
  iec: [validateIEC],
  gstin: [validateGSTIN],
};

const docTypeDetails = {
  cic: "Company Incorporation Certificate",
  bis: "BIS Certificate",
  coo: "Certificate Of Origin",
  gstin: "GST Registration Certificate",
  iec: "Import Export Code Certificate",
  shipping: "Shipping Bill",
  tradeLicense: "Trade License",
  UAEcoo: "UAE Certificate Of Origin",
  UAEesma: "UAE ESMA Certificate",
  UAEid: "UAE ID Card",
  UAEvat: "UAE VAT Certificate",
  aadhaar: "Aadhaar Card",
  pan: "PAN Card",
};

function getFuncForDocType(docType) {
  return docTypeFunctionMap[docType] || [dummy];
}

export async function verifyDocument(filePath, docType) {
  try {
    // 1. Extract text from the document using OCR.
    let extractedText = "";
    try {
      extractedText = await extractText(filePath);
    } catch (e) {
      console.log(e);
    }
    // console.log("OCR Extracted Text:", extractedText);

    // 2. Retrieve the expected regex patterns for this document type.
    const checks = getFuncForDocType(docType);
    let goodToGo = true;
    for (let i = 0; i < checks.length; i++) {
      const results = checks[i](extractedText);
      if (!results.isValid) {
        goodToGo = false;
        break;
      }
    }
    // const results = validate(extractedText);
    if (goodToGo) {
      return {
        verified: true,
        method: "ocr",
      };
    }
    // return {
    //   verified: false,
    //   method: "ocr",
    // };
    // 3. Call the LLM API for further verification if OCR failed.
    const fullDocTypeName = docTypeDetails[docType] || docType;
    const llmResult = await LLMverifyDocument(filePath, fullDocTypeName);

    // You can choose to combine llmResult with any partial results from OCR if needed.
    return {
      verified: llmResult.verified,
      method: "llm",
      // llmDetails: llmResult.details, // any additional info from LLM
    };
  } catch (error) {
    console.error("Error during document verification:", error);
    throw error;
  }
}

// loop over the docTypeDetails and call verifyDocument for each document type
// const docTypes = Object.keys(docTypeDetails);
// for (let i = 0; i < docTypes.length; i++) {
//   const docType = docTypes[i];
//   const filePath = `Test Docs/${docTypeDetails[docType]}.jpg`;
//   const result = await verifyDocument(filePath, docType);
//   console.log(`Verification Result for ${docType}:`, result);
// }

// verifyDocument("Test Docs/Certificate Of Origin.jpg", "coo").then((result) => {
//   console.log("Document Verification Result:", result);
// });
