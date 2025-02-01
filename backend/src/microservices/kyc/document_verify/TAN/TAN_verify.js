export function validateTAN(tan) {
    const tanRegex =  /^[A-Z]{4}[0-9]{5}[A-Z]$/;
    if (!tanRegex.test(tan)) {
      console.log("Invalid TAN!");
      
      return {
        isValid: false
      }
    }
  
    return {
        isValid: true
      }
    
  }