let startbutton = document.querySelector("#startButton");
let submitbutton = document.querySelector("#submitButton");
let quiz = document.querySelector("#questions");
let timeEl = document.querySelector("#timer");
let initials = document.querySelector("#name");
let scorebutton = document.querySelector("#viewScores");
let secondsLeft = 60;
let questionGroup = 0;
let timer;
let startpage = document.querySelector("#startpage");
let endpage = document.querySelector("#endPage");
let qtext = document.querySelector('#questext');
let choices = document.querySelector('#choices');
let scoreset = [];
let questions = [
    {
        prompt: `Which file type is used primarily for customizing the appearance of specific website elements?`,
        options: [
            ".css",
            ".js",
            ".html",
            ".pdf",
        ],
        answer: ".css",
    }, {
        prompt: `What is the standard layout order for these HTML elements?`,
        options: [
            "head, header, body ",
            "header, head, body",
            "head, body, header",
            "body, head, header",
        ],
        answer: "head, body, header",
    }, {
        prompt: `What is the proper way to reference something with the ID of element?`,
        options: [
            "#element",
            ".element",
            "!element",
            "?element",
        ],
        answer: "#element",
    }, {
        prompt: `What is the proper comparator to check that the value and type are equal?`,
        options: [
            "=",
            "==",
            "===",
            "!==",
        ],
        answer: "===",
    }, {
        prompt: `How often will a function call when set to an interval of 1000 milliseconds?`,
        options: [
            "Every 1 second",
            "Every 1 millisecond",
            "Every 1000 seconds",
            "Every 1 minute",
        ],
        answer: "Every 1 second",
    },
];

function startquiz() {
    displayQuestions();
    timeEl.textContent = secondsLeft;
    timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
    startpage.setAttribute("class", "hidden");
    quiz.removeAttribute("class");
}

function displayQuestions() {
    let questionactive = questions[questionGroup];
    qtext.textContent = questionactive.prompt;

    choices.innerHTML = "";
    questionactive.options.forEach(function (choice, i) {
        let answerbutton = document.createElement("button");
        answerbutton.setAttribute("value", choice);
        answerbutton.textContent = choice;
        answerbutton.onclick = chooseanswer;
        choices.appendChild(answerbutton);
    });
}

function chooseanswer() {
    if (this.value !== questions[questionGroup].answer) {
        questionGroup++;
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
            timeEl.textContent = secondsLeft;
            endQuiz();
        }
        if (questionGroup === questions.length) {
            endQuiz();
        } else {
            displayQuestions();
        }
    }
    if (this.value === questions[questionGroup].answer) {
        questionGroup++;
        if (questionGroup === questions.length) {
            endQuiz();
        } else {
            displayQuestions();
        }
    }
}

function endQuiz() {
    clearInterval(timer);
    endpage.removeAttribute("class");
    quiz.setAttribute("class", "hidden");
    let finalscore = secondsLeft;
    document.getElementById("score").textContent = finalscore;
}

function submitScore() {
    let nameinput = initials.value;
    if (nameinput !== "") {
        let storedscores = JSON.parse(localStorage.getItem("highscores")) || [];
        storedscores.push({ name: nameinput, score: secondsLeft });
        localStorage.setItem("highscores", JSON.stringify(storedscores));
        alert("Score submitted! Check to see how you stand amongst your friends.");
    }
}

function highscores() {
    let storedscores = JSON.parse(localStorage.getItem("highscores")) || [];
    storedscores.sort((a, b) => b.score - a.score); 
    let scoresList = document.getElementById("Scores");
    scoresList.innerHTML = "";
    storedscores.forEach(score => {
        let li = document.createElement("li");
        li.textContent = `${score.name}: ${score.score}`;
        scoresList.appendChild(li);
    });
    startpage.setAttribute("class", "hidden");
    quiz.setAttribute("class", "hidden");
    endpage.setAttribute("class", "hidden");
    let scorechart = document.getElementById("scorechart");
    scorechart.removeAttribute("class");

    let backButton = document.getElementById("back");
    backButton.addEventListener("click", function() {
        scorechart.setAttribute("class", "hidden");
        startpage.removeAttribute("class");
    });
}


startbutton.addEventListener("click", startquiz);
scorebutton.addEventListener("click", highscores);
submitbutton.addEventListener("click", submitScore);
