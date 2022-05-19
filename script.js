
//Global variables
const htmlInput = document.getElementById("userInput");
const htmlResults = document.getElementById("results");
const htmlHeading = document.getElementById("header");
const newHeading = document.createElement("h3");
const newLine = document.createElement("p");
const memeImage = document.getElementById("meme");
let result = [];


function translateToPigLatin(text) {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const words = text.toLowerCase().split(' ')
    for (const word of words) {
        if (vowels.includes(word[0])) {
            result.push(word + "way")
        } else {
            const firstMatch = word.match(/[aeiou]/g) || 0;
            const vowelIndex = word.indexOf(firstMatch[0]);
            const newWord = word.substring(vowelIndex) + word.substring(0, vowelIndex) + "ay";
            result.push(newWord)
        }
    }
}

const beginTranslation = () => {
    result = [];
    const userInput = htmlInput.value;
    if(userInput === "") {
        return alert("Please enter your word to translate");
    } else {
        translateToPigLatin(userInput);
        newHeading.innerHTML = `Translating: <i>"${userInput}"</i>`;
        htmlHeading.appendChild(newHeading);
        newLine.innerText = result.join(' ');
        htmlResults.appendChild(newLine);
        memeImage.style.display="inline";
    }
}

