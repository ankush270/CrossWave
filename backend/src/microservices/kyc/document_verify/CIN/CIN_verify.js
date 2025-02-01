export function validateCIN(cin) {
    const cinRegex =  /^[0-9]{10}$/;
    if (!cinRegex.test(cin)) {
      console.log("Invalid Corporate Identity Number!");
      
      return {
        isValid: false
      }
    }
  
    return {
      isValid: true
    }
    
  }