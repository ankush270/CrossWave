export function validateCIN(text) {
  const cinRegex = /([LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6})\.?/;
  let cinNumber = text.match(cinRegex);
  console.log(text);

  console.log(cinNumber);
  if (cinNumber) console.log(cinNumber[0]);

  return cinNumber ? { isValid: true, cin: cinNumber[0] } : { isValid: false };
  // cinNumber = cinNumber ? cinNumber[0] : "Not Found";
  // if(cin == null) {

  // }

  // if (!cinRegex.test(cin)) {
  //   console.log("Invalid Corporate Identity Number!");

  //   return {
  //     isValid: false
  //   }
  // }

  // return {
  //   isValid: true
  // }
}
