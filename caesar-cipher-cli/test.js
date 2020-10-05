const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);

function isAlpha(string) {
  return /[a-z]/i.test(string);
}

function isString(input) {
  return typeof input === "string";
}

function shiftAlphabet(shift, actionType) {
  return alphabet.reduce((map, char, index, array) => {
    const alphabetLength = alphabet.length;
    let totalIndex;
    if (actionType === "encode") {
      totalIndex = index + shift;
    } else if (actionType === "decode") {
      totalIndex = index - shift;
    } else {
      // TODO: terminate process!!!
      console.error(
        `Action is a required field. Please, put "encode" or "decode" after -a or --action flag`
      );
    }
    const effectiveIndex = Math.abs(totalIndex) % alphabetLength;
    map[char] = array[effectiveIndex];

    return map;
  }, {});
}

module.exports = function cipher(input, shift, actionType) {
  if (!isString(input)) return "";
  shift = shift == null ? 3 : shift;

  const shiftedCharacters = shiftAlphabet(shift, actionType);

  const modifiedString = input.split("").reduce((result, char) => {
    const modifiedCharacter = isAlpha(char) ? shiftedCharacters[char] : char;

    return result + modifiedCharacter;
  }, "");

  return modifiedString;
};
