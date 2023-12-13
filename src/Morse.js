function textToMorse(text) {
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..',
        ' ': ' '
    };

    const upperCaseText = text.toUpperCase(); // Convert the text to uppercase
    const result = [];

    for (const char of upperCaseText) {
        if (morseCodeMap.hasOwnProperty(char)) {
            result.push(morseCodeMap[char]);
        } else {
            result.push(char); // Keep non-alphabetic characters as is
        }
    }
    return result.join(' ');
}

function genString(len) {
    const alp = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let result = ""
    for (let i = 0; i < len; i++) {
        result += alp[Math.floor(Math.random() * 100) % alp.length];
    }
    return result;
}

export const morseAns = genString(5);
export const morseCode = textToMorse(morseAns);