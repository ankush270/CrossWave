import { extractText } from "./extract_text";
import { validateAadhaarNumber } from "./aadhaar/aadhaar_verify";
import { validatePAN } from "./PAN/PAN_verify";
import { validateTAN } from "./TAN/TAN_verify";
import { validateCIN } from "./CIN/CIN_verify";
import { validateIEC } from "./IEC/IEC_verify";


const docTypeRegexMap = {
    aadhaar: {
      aadhaarNumber: /\b\d{4}\s?\d{4}\s?\d{4}\b/,
    },
    pancard: {
      panNumber: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/,
    },
};

function getRegexesForDocType(docType) {
    return docTypeRegexMap[docType] || {};
}


async function verifyDocument(filePath, docType) {
try {
    // 1. Extract text from the document using OCR.
    const extractedText = await extractText(filePath);
    // console.log("OCR Extracted Text:", extractedText);

    // 2. Retrieve the expected regex patterns for this document type.
    const regexes = getRegexesForDocType(docType);
    const foundPatterns = {};
    let allPatternsFound = true;

    // Check each expected pattern in the OCR extracted text.
    for (const [patternName, regex] of Object.entries(regexes)) {
    const match = extractedText.match(regex);
    if (match) {
        foundPatterns[patternName] = match[0];
    } else {
        allPatternsFound = false;
    }
    }

    // If all patterns were found via OCR, return the result.
    if (allPatternsFound) {
    return {
        verified: true,
        method: "ocr",
        patterns: foundPatterns,
    };
    } else {
    console.log("OCR verification incomplete. Falling back to LLM verification.");

    // 3. Call the LLM API for further verification if OCR failed.
    const llmResult = await callLLMApi(filePath, docType);

    // You can choose to combine llmResult with any partial results from OCR if needed.
    return {
        verified: llmResult.verified,
        method: "llm",
        patterns: llmResult.patterns || foundPatterns,
        llmDetails: llmResult.details, // any additional info from LLM
    };
    }
} catch (error) {
    console.error("Error during document verification:", error);
    throw error;
}
}