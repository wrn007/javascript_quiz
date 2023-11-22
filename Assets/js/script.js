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
let qtext = document.querySelector('#questext');
let choices = document.querySelector('#choices')
let scoreset = []
let questions = [ 
	{ 
        prompt: `which file type is used primarily for customizing the appearance of specific website elements`, 
		options: [ 
			".css", 
			".js",
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

//when the start button is pressed, this function will run
function startquiz() {
    //display questions function should show questions, with options as buttons
    //when the timer reaches 0 the interval will clear so the timer no longer counts down, and it will run the endQuiz function
    //the starting page is no longer displayed and the hidden attribute from the quiz element is removed 
    displayQuestions;
    timeEl.textContent = secondsLeft;
    timer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft === 0)
        {
            clearInterval(timer);
            endQuiz;
        }
        //repeats every 1 sec
    }, 1000); 
    startpage.setAttribute("class", "hidden");
    quiz.removeAttribute("class");
   
}


//this function is called from the startquiz function
//this sets an active question from the questions available in my let statements
function displayQuestions(){
    let questionactive = questions[questionGroup];
   //sets text element to be the promt value of the active question 
    qtext.textContent = questionactive.prompt;
    
    choices.innerHTML = "";
    //repeatedly executes
    questionactive.options.forEach( function (choice, i){
//creates a button element for each option in the question,
//gives it a 1 2 3 or 4 depending on which one it is, and appends it to the parent div
// on click, it will run the choose answer function
    let answerbutton = document.createElement("button");
    answerbutton.setAttribute("value", choice);
    answerbutton.textContent = i + 1 + choice;
    answerbutton.onclick = chooseanswer;
    choices.appendChild(answerbutton);
});}


//this function is called when clicking on an option from display questions
function chooseanswer(){
    //if the value from choose answer is NOT equal to the answer declared in the let statements,
    //then it moves onto the next question and adds 10 seconds
    if (this.value !== questions[questionactive].answer)
    {
        questionGroup++; 
        secondsLeft -= 10;
        //double checks to see if the timer is less than 0 after decreasing by 10, if so, update the timer to 0 and
        //call the end quiz function
        if (time < 0){
            time = 0;
            timer.textContent = secondsLeft;
            quizEnd();
        }
        //ends the quiz if the last question is answered
        if (activequestion === questions.length) { 
            quizEnd(); 
        }  
        //display next question
        else {
        displayQuestions();
        } 
    }
//if it was the correct answer then it moves onto the next question or ends the quiz if it was the last question
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
//called when the game ends either by finishing all the questions or the timer running out
function endQuiz() {
    //recheck the interval was cleared
    clearInterval(timer)
    //remove the hidden class from the endpage
 endpage.removeAttribute("class");
 //rehide the quiz section
 quiz.setAttribute("class", "hidden");
 //set your final score to the seconds you had left when it ended
 let finalscore = secondsLeft;

}

//is called when the user clickes on the submit button
function submitScore(){
    let nameinput = initials.value();
if (nameinput !== null) {
    //past here i could not add much more. since my earlier code does not work, i could not test or debug anything
    let storedscores = JSON.parse(localstorage.getItem("highscores"))
    if (storedscores !== null){
        scoreset=storedscores;
    }
    localStorage.setItem("highscores", JSON.stringify(scoreset));
    //alert the user that their score has been submitted, and to check their score on the scoreboard
    alert("score submitted! check to see how you stand amongst your friends.")
}
}

function highscores(){
    
}

startbutton.addEventListener("click", startquiz);

scorebutton.addEventListener("click", highscores);

submitbutton.addEventListener("click", submitScore);

