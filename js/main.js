//array of words

const words = [
  "Python",
  "Scala",
  "Marina",
  "Fady",
  "Madline",
  "Michael",
  "Programming",
  "Documentation",
  "Mina",
  "Mario",
];

//setting levels

const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};

//get all selectors
let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".msg .lvl");
let secondsSpan = document.querySelector(".msg .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let changeLevel = document.querySelector(".select-level select");
let addDefaultValueToOptionOne = document.querySelector(
  ".select-level select option:nth-child(1)"
);
let option = document.getElementsByTagName("option");

//default level
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

/*-------------------------------------setting level name + seconds + score-----------------------------*/

//by default before the user choose the level set the default value values
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
//set time left depends on default level
timeLeftSpan.innerHTML = defaultLevelSeconds;

//set total score depends on array length
scoreTotal.innerHTML = words.length;

//add the default value to the first choise in the select box
addDefaultValueToOptionOne.value = defaultLevelName;

//change level from select box
changeLevel.addEventListener("change", function () {
  var levelName = changeLevel.value;
  var levelSeconds = lvls[levelName];
  lvlNameSpan.innerHTML = levelName;
  secondsSpan.innerHTML = levelSeconds;
  //change time left depends on user level choosen
  timeLeftSpan.innerHTML = levelSeconds;

  for (var i = 0; i < option.length; i++) {
    if (option[i] !== "Normal") {
      defaultLevelName = levelName;
      defaultLevelSeconds = lvls[levelName];
    }
  }
});

/*------------------------------------------------------deisable paste event---------------------------------------------*/
input.onpaste = function () {
  return false;
};

/*------------------------------------------------------start test---------------------------------------------*/
startBtn.onclick = function () {
  this.remove();
  changeLevel.remove();
  input.focus();

  //call generateWords function
  generateWords();
};

//generate word function
function generateWords() {
  //get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //get index of the random word
  let wordIndex = words.indexOf(randomWord);
  //remove the random word from array
  words.splice(wordIndex, 1);
  //show the random word
  theWord.innerHTML = randomWord;
  //empty upcoming words
  upComingWords.innerHTML = "";
  //generate upcoming words
  for (let i = 0; i < words.length; i++) {
    //create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    //add text (upcoming word from array) into the div
    div.appendChild(txt);
    //add div into upcoming word section
    upComingWords.appendChild(div);
  }

  //call startPlay function (control on the time)
  startPlay();
}

//startPlay function (control on the time)
function startPlay() {
  //reset timer
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    //count down the seconds of the level in the time left span
    timeLeftSpan.innerHTML--;

    //stop the timer when it = 0 and compare the random word by the word user wrote
    if (timeLeftSpan.innerHTML === "0") {
      //stop timer
      clearInterval(start);

      //compare the words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input field
        input.value = "";
        //increase score
        scoreGot.innerHTML++;

        //check if there are words in the array if yes call the generateWords function
        if (words.length > 0) {
          //call the generatewords function
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode(
            "congratulations you got " +
              scoreGot.innerHTML +
              " from " +
              scoreTotal.innerHTML
          );
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
          upComingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
