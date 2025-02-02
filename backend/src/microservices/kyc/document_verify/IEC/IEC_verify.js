export function validateIEC(text) {
  const iecRegex = /([0-9]{10})/;
  const iecNumber = text.match(iecRegex);
  if (iecNumber) console.log(iecNumber[0]);
  return iecNumber ? { isValid: true, iec: iecNumber[0] } : { isValid: false };
}
