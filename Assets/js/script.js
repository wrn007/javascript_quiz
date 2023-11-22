let startbutton = document.querySelector("#startButton")
let submitbutton = document.querySelector("#submitButton")
let quiz = document.querySelector("#questions")
let timeEl = document.querySelector("#timer")
let initials = document.querySelector("#name")
let scorebutton =document.querySelector("#viewScores")
let secondsLeft = 60
let questionGroup = 0
let timer;
let startpage = document.querySelector("#startpage")
let endpage = document.querySelector("#endPage")
let qtext = document.querySelector('#qtext')
let choices = document.querySelector('#choices')
let scoreset = []
let questions = [ 
	{ 
        prompt: `which file type is used primarily for customizing the appearance of specific website elements`, 
		options: [ 
			".css", 
			".js", id
			".html", 
			".pdf", 
		], 
		answer: ".css", 
	}, { 
        prompt: `what is the standard layout order for these HTML elements?`, 
		options: [ 
			"head, header, body ", 
			"header, head, body", 
			"head, body, header", 
			"body, head, header", 
		], 
		answer: "head, body, header", 
	}, { 
		prompt: `what is the proper way to reference something with the ID of element`, 
		options: [ 
			"#element", 
			".element", 
			"!element", 
			"?element", 
		], 
		answer: "#element", 
	}, { 
		prompt: `what is the proper comparator to check that the value and type are equal`, 
		options: [
            "=", 
            "==", 
            "===", 
            "!==="
        ], 
		answer: "===", 
	}, { 
		prompt: `how often will a function call when set to an interval of 1000`, 
		options: [ 
			"every 1 second", 
			"every 1 milisecond", 
			"every 1000 seconds", 
			"every 1 minute", 
		], 
		answer: "every 1 second", 
	}, 
]; 


function startquiz() {
    timeEl.textContent = secondsLeft;
    timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft === 0)
        {
            clearInterval(timer);
            endQuiz;
        }
    }, 1000); 
    startpage.setAttribute("class", "hidden");
    quiz.removeAttribute("class");
    displayQuestions;
}

function startTimer(){
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    if (secondsLeft == 0){
        endQuiz;
    }
}

function displayQuestions(){
    let questionactive = questions[questionGroup];
    qtext.textContent = questionactive.prompt;
    
    choices.innerHTML = "";
    questionactive.options.forEach(
function (choice, i){

    let answerbutton = document.createElement("button");
    answerbutton.setAttribute("value", choice);
    answerbutton.textContent = i + 1 + choice;
    answerbutton.onclick = chooseanswer;
    choices.appendChild(answerbutton);
});}



function chooseanswer(){
    
    if (this.value !== questions[activequestion].answer)
    {
        questionGroup++; 
        secondsLeft -= 10;
        if (time < 0){
            time = 0;
            timer.textContent = secondsLeft;
            quizEnd;
        }
        
        if (activequestion === questions.length) { 
            quizEnd(); 
        }  
        
        else {
        displayQuestions();
        } 
    }

    if ( this.value === questions[questionGroup].answer)
    {
        activequestion++; 
        if (activequestion === questions.length) { 
            quizEnd(); 
        } else {
            displayQuestions();
        } 
    }
}

function endQuiz() {
    clearInterval()
 endpage.removeAttribute("class");
 quiz.setAttribute("class", "hidden");
 let finalscore = secondsLeft;

}


function submitScore(){
    let nameinput = initials.value();
if (nameinput !== null) {
    let storedscores = JSON.parse(localstorage.getItem("highscores"))
    if (storedscores !== null){
        scoreset=storedscores;
    }
    localStorage.setItem("highscores", JSON.stringify(scoreset));


    alert("score submitted! check to see how you stand amongst your friends.")
}
}

function highscores(){}

startbutton.addEventListener("click", startquiz);

scorebutton.addEventListener("click", highscores);

submitbutton.addEventListener("click", submitScore);

