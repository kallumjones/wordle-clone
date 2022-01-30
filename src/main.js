import { wordsArray } from "./assets/words.js";

function generateWord() {
    const randomNum = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomNum];
}

function getWord(letters) {
    const word = [];
    letters.forEach(letter => {
        word.push(letter.value);
    })
    return word.join('');
}

function checkLetter(letter, index) {
    if(correctWord[index] === letter) {
        return 'green';
    } else if (correctWord.includes(letter) && letter !== '') {
        return 'orange'
    }
}

function checkCorrectWord(word) {
    return word === correctWord;
}

// Grab Dom Elements needed
const words = document.querySelectorAll('.word');
const wordContainer = document.querySelector('.words-container');
const wordOneLetterFive = document.getElementById('word-one__letter-five');
const wordTwoLetterFive = document.getElementById('word-two__letter-five');

// Set up
const correctWord = generateWord();
console.log(correctWord);

//Check full words
wordOneLetterFive.addEventListener('keyup', (event) => {
    const parentWord = words[0].querySelectorAll('.word-one');
    const nextWord = words[1].querySelectorAll('.word-two');
    console.log(parentWord)
    const enteredValue = getWord(parentWord);

    parentWord.forEach((letter, index) => {
        const currentLetter = letter.value
        if(checkLetter(currentLetter, index) === 'green') {
            letter.classList.add('green');
        } else if (checkLetter(currentLetter, index) === 'orange') {
            letter.classList.add('orange');
        }

        letter.disabled = true;
    })

    if(!checkCorrectWord(enteredValue)) {
        nextWord.forEach(letter => {
            letter.disabled = false;
        })
    } else if (checkCorrectWord(enteredValue)) {
        const winningMessage = document.createElement('h1');
        winningMessage.innerText = `Well Done You Win!`;
        wordContainer.appendChild(winningMessage);
    }


    console.log(checkCorrectWord(enteredValue));
});