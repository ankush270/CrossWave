import { validatePAN } from "../PAN/PAN_verify.js";

const stateCodeMapping = {
    "01": "Jammu & Kashmir",
    "02": "Himachal Pradesh",
    "03": "Punjab",
    "04": "Chandigarh",
    "05": "Uttarakhand",
    "06": "Haryana",
    "07": "Delhi",
    "08": "Rajasthan",
    "09": "Uttar Pradesh",
    "10": "Bihar",
    "11": "Sikkim",
    "12": "Arunachal Pradesh",
    "13": "Nagaland",
    "14": "Manipur",
    "15": "Mizoram",
    "16": "Tripura",
    "17": "Meghalaya",
    "18": "Assam",
    "19": "West Bengal",
    "20": "Jharkhand",
    "21": "Orissa",
    "22": "Chhattisgarh",
    "23": "Madhya Pradesh",
    "24": "Gujarat",
    "25": "Daman & Diu",
    "26": "Dadra & Nagar Haveli",
    "27": "Maharashtra",
    "28": "Andhra Pradesh",
    "29": "Karnataka",
    "30": "Goa",
    "31": "Lakshadweep",
    "32": "Kerala",
    "33": "Tamil Nadu",
    "34": "Pondicherry",
    "35": "Andaman & Nicobar Islands"
  };
  

function isValidGSTIN(gstin) {
    // Regular expression to match the GSTIN format
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
    if (!gstinRegex.test(gstin)) {
      return { isValid: false, pan: null, state: null };
    }
  
    // Extract the state code and PAN number from the GSTIN
    const stateCode = gstin.substring(0, 2);
    const pan = gstin.substring(2, 12);
  
    // List of valid state codes as per GST
    const validStateCodes = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34', '35', '36', '37'
    ];
  
    // Validate the state code
    if (!validStateCodes.includes(stateCode)) {
      return { isValid: false, pan: null, state: null };
    }
  
    // Function to validate the PAN number
    // function isValidPAN(pan) {
    //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    //   return panRegex.test(pan);
    // }
  
    // Validate the PAN extracted from GSTIN
    if (!validatePAN(pan)) {
      return { isValid: false, pan: null, state: null };
    }
  
    // If all validations pass
    return { isValid: true, pan: pan, state: stateCodeMapping[stateCode] };
  }


console.log(isValidGSTIN("29CSFPJ3536D2Z2"));
