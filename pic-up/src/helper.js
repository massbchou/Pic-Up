function parseString(inputString) {
  // Split the string into pairs based on commas
  const pairs = inputString.split('\n');

  // Create an empty object to store key-value pairs
  const resultObject = {};

  // Iterate over each pair and split based on ':'
  pairs.forEach(pair => {
      //a = pair
      const [key, value] = pair.split(': ');
      resultObject[key] = pair;
  });
  return resultObject;
}

module.exports = { parseString }