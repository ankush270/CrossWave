export function validateTAN(tan) {
  const tanRegex = /[A-Z]{4}[0-9]{5}[A-Z]/;
  let tanNumber = tan.match(tanRegex);
  if (tanNumber) console.log(tanNumber[0]);
  return tanNumber ? { isValid: true, tan: tanNumber[0] } : { isValid: false };
}
