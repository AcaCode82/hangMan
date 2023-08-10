const btns = document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", renderLetters);
});

let zivotinjeNiz = [
  "krava",
  "macka",
  "pas",
  "zmija",
  "medved",
  "zec",
  "lisica",
];
let drzaveNiz = [
  "engleska",
  "austrija",
  "obala slonovace",
  "australija",
  "saudijska arabija",
  "meksiko",
];
let gradoviNiz = [
  "beograd",
  "bec",
  "moskva",
  "pariz",
  "madrid",
  "lisabon",
  "kambera",
];

const allLetters = document.querySelector(".allLetters");
let flegLetters = 0;

function renderLetters() {
  if (flegLetters == 0) {
    for (let i = 65; i < 91; i++) {
      let letter = document.createElement("div");
      letter.classList.add("letters");
      letter.innerText = String.fromCharCode(i);
      allLetters.appendChild(letter);
      flegLetters = 1;
    }
  }
  pickWord(this);
  renderWord(this);
  pickedLetter();
}

let randomOption = "";
console.log(randomOption);
function pickWord(btn) {
  if (btn.innerText.toLowerCase() == "zivotinje") {
    randomOption =
      zivotinjeNiz[Math.floor(Math.random() * zivotinjeNiz.length)];
  }
  if (btn.innerText.toLowerCase() == "drzave") {
    randomOption = drzaveNiz[Math.floor(Math.random() * drzaveNiz.length)];
  }
  if (btn.innerText.toLowerCase() == "gradovi") {
    randomOption = gradoviNiz[Math.floor(Math.random() * gradoviNiz.length)];
  }
  return randomOption;
}

let chosenDiv = document.querySelector(".chosenOption");
let flegWord = 0;
let remainingAttempts = 6;

function renderWord(word) {
  let chosenWord = [...pickWord(word)];
  if (flegWord == 0) {
    for (let i = 0; i < chosenWord.length; i++) {
      let chosenLetter = document.createElement("span");
      chosenLetter.classList.add("chosenLetter");
      chosenLetter.innerText = chosenWord[i];
      chosenDiv.appendChild(chosenLetter);
    }
  }
  const lettersDiv = document.querySelector(".lettersDiv");
  let attempts = document.createElement("div");
  attempts.classList.add("attempts");
  lettersDiv.appendChild(attempts);
  attempts.innerText = `Preostali pokusaji: ${remainingAttempts}/6`;
  return chosenWord;
}

function pickedLetter() {
  let letters = document.querySelectorAll(".letters").forEach((letter) => {
    letter.addEventListener("click", checkLetter);
  });
}

let count = 0;

function checkLetter() {
  let pickedLetter = this;
  if (winFlag ==0) {
  pickedLetter.style.opacity = "0.5";
  // nodeLetter.disabled = true;
  let letters = document.querySelectorAll(".chosenLetter");
  let array = [...randomOption];
  let arrayCorect = [];
  let indexOf = array.indexOf(pickedLetter.innerText.toLowerCase());
  // da li je pogodio ovo slovo?
  if (count < 5 && indexOf !== -1) {
    // pogodio je
    while (indexOf !== -1) {
      arrayCorect.push(indexOf);
      indexOf = array.indexOf(
        pickedLetter.innerText.toLowerCase(),
        indexOf + 1
      );
      arrayCorect.forEach((index) => {
        letters[index].classList.add("corect");
        letters[index].style.color = "red";
      });
      checkWin(letters);
      newGame();
    }
  } else {
    // promasio je
    if (count < 5 && indexOf == -1) {
      count++;
      remainingAttempts--;
      let attempts = document.querySelector(".attempts");
      attempts.innerText = `Preostali pokusaji: ${remainingAttempts}/6`;
      //ispis coveculjka
      let elem = document.querySelector(`#element${remainingAttempts}`);
      elem.style.display = "flex";
    } else {
      let chosenDiv = document.querySelector(".chosenOption");
      let alertText = document.createElement("p");
      alertText.classList.add("gameOver");
      alertText.innerText = "Game Over!";
      if (remainingAttempts > 0) {
        remainingAttempts--;
        let attempts = document.querySelector(".attempts");
        attempts.innerText = `Preostali pokusaji: ${remainingAttempts}/6`;
        chosenDiv.appendChild(alertText);
        letters.forEach((letter) => {
          letter.style.color = "red";
        });
        winFlag = 1;
        newGame();
      }
    }
  }
}
}

let winFlag = 0;

function checkWin(corectLetters) {
  let countRed = 0;
  corectLetters.forEach((elem) => {
    if (elem.classList.contains("corect")) {
      countRed++;
    }
  });
  if (countRed == corectLetters.length) {
    let winText = document.createElement("div");
    winText.innerText = "Pobedili ste!";
    winText.classList.add("winText");
    let chosenDiv = document.querySelector(".chosenOption");
    chosenDiv.appendChild(winText);
    winFlag = 1;
  } else {
    winFlag = 0;
  }
  return winFlag;
}

function newGame() {
  if (winFlag == 1) {
    let newGameBtn = document.querySelector(".newGameBtn");
    newGameBtn.style.display = "block";
    newGameBtn.addEventListener("click", reset);
  }
}

function reset() {
  winFlag = 0;
  randomOption = "";
  count = 0;
  flegWord = 0;
  flegLetters = 0;
  remainingAttempts = 6;
  //brisanje coveculjka
  let elem = document.querySelectorAll(".elem");
  elem.forEach((img)=>{
    img.style.display="none";
  });

  let attempts = document.querySelector(".attempts");
  attempts.remove();
  let randomWord = document.querySelectorAll(".chosenLetter");
  randomWord.forEach((word) => {
    word.remove();
  });
  let winText = document.querySelector(".winText");
  let gameOverText = document.querySelector(".gameOver");
  if (winText) {
    winText.remove();
  } else {
    gameOverText.remove();
  }
  let newGameBtn = document.querySelector(".newGameBtn");
  newGameBtn.style.display = "none";
  let allLetters = document.querySelectorAll(".letters");
  allLetters.forEach((letter) => {
    letter.remove();
  });
}
