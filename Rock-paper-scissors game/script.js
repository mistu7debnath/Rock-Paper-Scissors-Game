const btnEle = document.querySelectorAll("button");
const userScoreEle = document.getElementById("user-score");
const compScoreEle = document.getElementById("comp-score");
const resultEle = document.getElementById("result");
const userHand = document.getElementById("user-hand");
const compHand = document.getElementById("comp-hand");
const matchCountEle = document.getElementById("match-count");

let userScore = 0;
let compScore = 0;
let matchCount = 0;

const handIcons = {
    rock: "✊",
    paper: "🖐",
    scissor: "✌"
};


// Speak helper function
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Speed of voice
    utterance.pitch = 1; // Pitch of voice
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
}

// Say rules when page loads
speak("Welcome to Rock Paper Scissors. Play 5 matches to win a round. Let's begin!");

btnEle.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (matchCount >= 5) return;

        const userChoice = btn.id;
        const compChoiceValue = compChoice();

        userHand.textContent = "🤜";
        compHand.textContent = "🤛";

        userHand.classList.add("animate");
        compHand.classList.add("animate");

        speak(`Match ${matchCount + 1} started`);

        setTimeout(() => {
            userHand.classList.remove("animate");
            compHand.classList.remove("animate");

            userHand.textContent = handIcons[userChoice];
            compHand.textContent = handIcons[compChoiceValue];

            const result = playRound(userChoice, compChoiceValue);
            resultEle.textContent = result;
            speak(result);

            matchCount++;
            matchCountEle.textContent = matchCount;

            if (matchCount === 5) {
                setTimeout(() => {
                    const finalResult =
                        userScore > compScore
                            ? "🏆 Congratulation! You won the round!"
                            : userScore < compScore
                            ? "😢 You lost the round!"
                            : "🤝 The round is a tie!";
                    
                    speak(finalResult);
                    alert(finalResult);

                    userScore = 0;
                    compScore = 0;
                    matchCount = 0;
                    userScoreEle.textContent = userScore;
                    compScoreEle.textContent = compScore;
                    matchCountEle.textContent = matchCount;
                    resultEle.textContent = "Result...";
                    userHand.textContent = "🤜";
                    compHand.textContent = "🤛";

                    speak("New round begins.");
                }, 1000);
            }
        }, 1000);
    });
});

function compChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(user, comp) {
    if (user === comp) return "It's a tie!";

    const winCond =
        (user === "rock" && comp === "scissor") ||
        (user === "paper" && comp === "rock") ||
        (user === "scissor" && comp === "paper");

    if (winCond) {
        userScore++;
        userScoreEle.textContent = userScore;
        return `You won! ${user} beats ${comp}`;
    } else {
        compScore++;
        compScoreEle.textContent = compScore;
        return `You lose! ${comp} beats ${user}`;
    }
}