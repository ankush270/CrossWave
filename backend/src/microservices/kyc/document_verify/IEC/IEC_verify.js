export function validateIEC(iec) {
    const iecRegex =  /^[0-9]{10}$/;
    if (!iecRegex.test(iec)) {
      console.log("Invalid IEC!");
      
      return {
        isValid: false
      }
    }
  
    return {
        isValid: true
      }
    
  }