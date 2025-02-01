// The multiplication table
var d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
// permutation table p
var p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];
// inverse table inv
var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

export function validateAadhaarNumber(text, aadhaarString = null) {
  const aadhaarRegex = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}/;
  if (aadhaarString == null) {
    const aadhaarNumber = text.match(aadhaarRegex);
    aadhaarString = aadhaarNumber ? aadhaarNumber[0] : "Not Found";
  }
  if (aadhaarString.length != 12) {
    return {
      isValid: false,
    };
  }
  if (aadhaarString.match(/[^$,.\d]/)) {
    return {
      isValid: false,
    };
  }
  var aadhaarArray = aadhaarString.split("");
  var toCheckChecksum = aadhaarArray.pop();
  if (generate(aadhaarArray) == toCheckChecksum) {
    console.log(aadhaarString);

    return {
      isValid: true,
    };
  } else {
    return { isValid: false };
  }
}

function generate(array) {
  var c = 0;
  var invertedArray = array.reverse();
  for (var i = 0; i < invertedArray.length; i++) {
    c = d[c][p[(i + 1) % 8][invertedArray[i]]];
  }
  return inv[c];
}

// console.log(validateAadhaarNumber("216618862674"));
