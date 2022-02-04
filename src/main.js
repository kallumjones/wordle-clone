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

function focus() {
    //TO DO
}

// Grab Dom Elements needed
const words = document.querySelectorAll('.word');
const wordContainer = document.querySelector('.words-container');
const letterFives = document.querySelectorAll('.letter_five');

// Set up
const correctWord = generateWord();
let currentWordIndex = 0;
console.log(correctWord);

//Check full words
letterFives.forEach(letter => {
    letter.addEventListener('keyup', () => {
        if(currentWordIndex === 4){
            const parentWord = words[currentWordIndex].querySelectorAll('.letter');
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
                const losingMessage = document.createElement('h1');
                losingMessage.innerText = `Word: ${correctWord} Try Again!`;
                wordContainer.appendChild(losingMessage);
            } else if (checkCorrectWord(enteredValue)) {
                const winningMessage = document.createElement('h1');
                winningMessage.innerText = `Well Done You Win!`;
                wordContainer.appendChild(winningMessage);
            }
        } else {
            const parentWord = words[currentWordIndex].querySelectorAll('.letter');
            const nextWord = words[currentWordIndex + 1].querySelectorAll('.letter');
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
            console.log(currentWordIndex);
            currentWordIndex++;
        }
    })
})
