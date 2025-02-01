// function calculateCheckDigit(pan) {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const values = {};
//   for (let i = 0; i < chars.length; i++) {
//     values[chars[i]] = i + 1; // A=1, B=2, ..., Z=26
//   }

//   const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6];
//   let sum = 0;

//   for (let i = 0; i < 9; i++) {
//     const char = pan[i];
//     const value = isNaN(char) ? values[char] : parseInt(char, 10);
//     sum += value * weights[i];
//   }

//   const remainder = sum % 26; // Use modulus 26 since the check digit is a letter

//   // If remainder is 0, the check digit should be 'Z'
//   return remainder === 0 ? 'Z' : chars[remainder - 1];
// }

export function validatePAN(text) {
  // Regular expression to match the PAN format
  const panRegex = /[A-Z]{3}[ABCFGHLJPT]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}/;
  let panNumber = text.match(panRegex);

  if (panNumber) console.log(panNumber[0]);

  return panNumber ? { isValid: true, pan: panNumber[0] } : { isValid: false };
  // Verify the check digit
  // const expectedCheckDigit = calculateCheckDigit(pan);
  // console.log(expectedCheckDigit);

  // return pan[9] === expectedCheckDigit;
}

// Example usage:
// const panNumber = 'CSFPJ3536D';
// if (validatePAN(panNumber)) {
//   console.log('Valid PAN number.');
// } else {
//   console.log('Invalid PAN number.');
// }
