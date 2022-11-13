const tutorialButton = document.querySelector(".tutorial-button");
const introStartButton = document.querySelector(".intro-start-button");
const introContainer = document.querySelector(".intro-container");
const yahtzeeScore = document.querySelector(".yahtzee-score");
const scoreButtons = document.querySelectorAll(".score-button");
const rollCountDisplay = document.querySelectorAll(".roll-count-display");
const scoreRoundContainer = document.querySelector(".score-round-container");
const scoreRoundAccept = document.querySelector(".score-round-accept");

const dice = document.querySelectorAll(".dice");

const rollButton = document.querySelector(".roll-overlay");

const diceUrlList = ["./resources/dice_1.jpg", "./resources/dice_2.jpg", "./resources/dice_3.jpg", "./resources/dice_4.jpg", "./resources/dice_5.jpg", "./resources/dice_6.jpg"];

const scoreButtonList = ["ones-score-button","twos-score-button", "threes-score-button", "fours-score-button", "fives-score-button", "sixes-score-button", "three-kind-score-button", "four-kind-score-button", "full-house-score-button", "sm-straight-score-button", "lg-straight-score-button", "chance-score-button"];

let diceKeepStatus = [0, 0, 0, 0, 0];
let diceList = [0, 0, 0, 0, 0];
let rollCount = 0;
let score = {
    upper: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        bonusSection: 0
    },
    lower: {
        threeKind: 0,
        fourKind: 0,
        fullHouse: 0,
        smStraight: 0,
        lgStraight: 0,
        yahtzee: 0,
        chance: 0
    }
}

/*
intro screen
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
*/

const slideIntro = () => {
    introContainer.style.left = "100vw";
}

tutorialButton.addEventListener("click", slideIntro);
introStartButton.addEventListener("click", slideIntro);

/*
board
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
*/

const handleScoreButtonClick = (event) => {
    // console.log(event.target);
    for(let i=0; i<scoreButtonList.length; i++) {
        if(event.target.classList.contains(scoreButtonList[i])) {
            if(rollCount == 0) {
                return;
            }
            if(event.target.innerText != "") {
                return;
            }
            let roundScoreCount = 0;
            switch(i) {
                case 0:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 1) {
                            roundScoreCount++;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 1:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 2) {
                            roundScoreCount += 2;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 2:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 3) {
                            roundScoreCount += 3;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 3:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 4) {
                            roundScoreCount += 4;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 4:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 5) {
                            roundScoreCount += 5;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 5:
                    for(let i=0; i<diceList.length; i++) {
                        if(diceList[i] == 6) {
                            roundScoreCount += 6;
                        }
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 6:
                    // three of a kind
                    let threeCount = 0;
                    let threeNumber = 0;
                    for(let i=0; i<diceList.length; i++) {
                        for(let j=0; j<diceList.length; j++) {
                            if(diceList[i] == diceList[j] && i != j) {
                                threeCount++;
                                threeNumber = diceList[i];
                            }
                        }
                        if(threeCount > 1) {
                            for(let i=0; i<diceList.length; i++) {
                                roundScoreCount += diceList[i];
                            }
                            event.target.innerText = roundScoreCount;
                            event.target.style.backgroundColor = "#f9b91a";
                            resetRound();
                            break;
                        }else {
                            threeCount = 0;
                            threeNumber = 0;
                        }
                    }
                    event.target.innerText = 0;
                    resetRound();
                    break;
                case 7:
                    // four of a kind
                    let fourCount = 0;
                    let fourNumber = 0;
                    for(let i=0; i<diceList.length; i++) {
                        for(let j=0; j<diceList.length; j++) {
                            if(diceList[i] == diceList[j] && i != j) {
                                fourCount++;
                                fourNumber = diceList[i];
                            }
                        }
                        if(fourCount > 2) {
                            for(let i=0; i<diceList.length; i++) {
                                roundScoreCount += diceList[i];
                            }
                            event.target.innerText = roundScoreCount;
                            event.target.style.backgroundColor = "#f9b91a";
                            resetRound();
                            return;
                        }else {
                            fourCount = 0;
                            fourNumber = 0;
                        }
                    }
                    event.target.innerText = 0;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
                case 8:
                    // full house
                    diceList.sort();
                    if(diceList[0] == diceList[1] && diceList[0] == diceList[2] && diceList[3] == diceList[4] || diceList[0] == diceList[1] && diceList[2] == diceList[3] && diceList[2] == diceList[4]) {
                        event.target.innerText = 25;
                        event.target.style.backgroundColor = "#f9b91a";
                    }else {
                        event.target.innerText = 0;
                        event.target.style.backgroundColor = "#f9b91a";
                    }
                    resetRound();
                    break;
                case 9:
                    // small straight
                    diceList.sort();
                    console.log(diceList);
                    let threeKindCount = 0;
                    for(let i=1; i<diceList.length; i++) {
                        if(diceList[i-1] == diceList[i]-1) {
                            threeKindCount++;
                        }else if(diceList[i-1] == diceList[i]) {
                            continue;
                        }else {
                            if(threeKindCount < 3) {
                                threeKindCount = 0;
                            }
                        }
                    }
                    if(threeKindCount > 2) {
                        event.target.innerText = 30;
                        event.target.style.backgroundColor = "#f9b91a";
                    }else {
                        event.target.innerText = 0;
                        event.target.style.backgroundColor = "#f9b91a";
                    }
                    resetRound();
                    break;
                case 10:
                    //large straight
                    diceList.sort();
                    let fourKindCount = 0;
                    for(let i=1; i<diceList.length; i++) {
                        if(diceList[i-1] == diceList[i]-1) {
                            fourKindCount++;
                        }else if(diceList[i-1] == diceList[i]) {
                            continue;
                        }else{
                            fourKindCount = 0;
                        }
                    }
                    if(fourKindCount > 3) {
                        event.target.innerText = 40;
                        event.target.style.backgroundColor = "#f9b91a";
                    }else {
                        event.target.innerText = 0;
                        event.target.style.backgroundColor = "#f9b91a";
                    }
                    resetRound();
                    break;
                case 11:
                    // chance
                    for(let i=0; i<diceList.length; i++) {
                        roundScoreCount += diceList[i];
                    }
                    event.target.innerText = roundScoreCount;
                    event.target.style.backgroundColor = "#f9b91a";
                    resetRound();
                    break;
            }
        }
    }
}

for(let i=0; i<scoreButtons.length; i++) {
    scoreButtons[i].addEventListener("click", handleScoreButtonClick);
}

/*
dice
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
*/

const toggleDiceOverlay = (e) => {
    let diceId = "";

    for(let i=0; i<e.target.classList.length; i++) {
        switch(e.target.classList[i]) {
            case "dice-1":
                diceId = 0;
                break;
            case "dice-2":
                diceId = 1;
                break;
            case "dice-3":
                diceId = 2;
                break; 
            case "dice-4":
                diceId = 3;
                break;
            case "dice-5":
                diceId = 4;
                break;
        }
    }

    for(let i=0; i<e.target.classList.length; i++) {
        if(e.target.classList[i] == "dice-overlay") {
            diceKeepStatus[diceId] = 0;
            e.target.classList.remove("dice-overlay");
            return;
        }
    }
    diceKeepStatus[diceId] = 1;
    e.target.classList.add("dice-overlay");
}

const handleDiceClick = (e) => {
    if(rollCount == 0) {
        return;
    }
    toggleDiceOverlay(e);
}

for(let i=0; i<dice.length; i++) {
    dice[i].addEventListener("click", handleDiceClick);
}

/*
roll button play button
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
*/

const displayDice = () => {
    for(let i=0; i<dice.length; i++) {
        if(diceKeepStatus[i] == 0) {
            const randomDice = Math.floor(Math.random()*6);
            diceList[i] = randomDice + 1;
            dice[i].style.backgroundImage = "url(" + diceUrlList[randomDice] + ")";
            dice[i].style.backgroundSize = "cover";
            dice[i].style.backgroundPosition = "center";
        }
    }
}

const scoreYahtzee = () => {
    if(score["yahtzee"] == 50) {
        score["yahtzee"] += 100;
    }else {
        score["yahtzee"] = 50;
    }

    yahtzeeScore.innerText = score["yahtzee"];
    resetRound();
}

const checkYahtzee = () => {
    let yahtzeeBool = true;
    console.log(diceList);
    for(let i=0; i<diceList.length; i++) {
        if(diceList[0] != diceList[i]) {
            yahtzeeBool = false;
        }
    }
    if(yahtzeeBool == true) {
        scoreYahtzee();
    }
}

const handleYahtzeeScoreClick = () => {
    if(rollCount == 0) {
        return;
    }
    if(yahtzeeScore.innerText != "") {
        return;
    }else {
        yahtzeeScore.innerText = 0;
        yahtzeeScore.style.backgroundColor = "#f9b91a";
        resetRound();
    }
}

yahtzeeScore.addEventListener("click", handleYahtzeeScoreClick);

const resetRound = () => {
    rollCount = 0;
    diceKeepStatus = [0 ,0, 0, 0, 0];
    for(let i=0; i<dice.length; i++) {
            dice[i].style.backgroundImage = "";
    }
    for(let i=0; i<dice.length; i++) {
        dice[i].classList.remove("dice-overlay");
    }
    for(let i=0; i<rollCountDisplay.length; i++) {
        rollCountDisplay[i].style.backgroundColor = "#f9b91a";
    }
}

const updateRollCountDisplay = () => {
    if(rollCount == 0) {
        rollCountDisplay[0].style.backgroundColor = "#7c0000";
    }else if(rollCount == 1) {
        rollCountDisplay[1].style.backgroundColor = "#7c0000";
    }else if(rollCount == 2) {
        rollCountDisplay[2].style.backgroundColor = "#7c0000";
    }
}

const handleScoreRoundAcceptClick = () => {
    scoreRoundContainer.style.width = "0px";
}

scoreRoundAccept.addEventListener("click", handleScoreRoundAcceptClick);

const slideScoreRoundContainer = () => {
    scoreRoundContainer.style.width = "100vw";
}

const handleRollButtonClick = () => {
    if(rollCount<3) {
        updateRollCountDisplay();
        displayDice();
        rollCount++;
        checkYahtzee();
    }else {
        slideScoreRoundContainer();
        return;
    }
}

rollButton.addEventListener("click", handleRollButtonClick);