let startBtn = document.getElementsByClassName("startBtn")[0];
let quizInfo = document.getElementsByClassName("quiz-info")[0];
let timer = document.getElementsByClassName("timer")[0];
let instructions = document.getElementsByClassName("instructions")[0];
let container = document.getElementsByClassName("container")[0];
let submitBtn = document.getElementsByClassName("submitBtn")[0];
let gradeBox = document.getElementsByClassName("grade")[0];
let grade = 0;




startBtn.addEventListener("click",function () {
    startBtn.style.display = "none";
    quizInfo.style.display = "none";
    instructions.style.display = "none";
    timer.style.display = "block";
    submitBtn.style.display = "block";
    getQuestions();
    countdown(20);
    
})


function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            let questions = JSON.parse(this.responseText);
            gradeBox.lastElementChild.innerText = questions.length;
            addQuestionsData(questions);
            
        }
    }

    myRequest.open("GET","html_questions.json",true);
    myRequest.send();
    
    
}


function addQuestionsData(questions) {
    for (let i = 0; i < questions.length; i++) {
        // Create Question Box
        let questionBox = document.createElement("div");
        questionBox.classList.add("question");
        // Create Question Number
        let questionNumber = document.createElement("div");
        questionNumber.classList.add("question-number");
        questionNumber.innerHTML = `Question ${i+1}`
        // Append Question Number To Question Box
        questionBox.appendChild(questionNumber);
        // Create Question Title
        let questionTitle = document.createElement("div");
        let questionTitleText = document.createTextNode(questions[i].title);
        questionTitle.appendChild(questionTitleText);
        questionTitle.classList.add("question-title");
        // Append Question Title To Question Box
        questionBox.appendChild(questionTitle);
        // -------------------------- Answers -------------------
        for (let j = 1; j <= 4; j++) {
            // Create Answer Container
            let questionAnswer = document.createElement("div");
            // Give Every answer a dataset containing the question's right answer
            questionAnswer.dataset.answer = questions[i].right_answer;
            questionAnswer.classList.add("question-answer");
            // Create Radio Input
            let radioInput = document.createElement("input");
            radioInput.setAttribute("type","radio");
            // Verify ------------------------------------------------------------------------
            radioInput.setAttribute("data-id",`answer_${j}`);
            radioInput.name = `question_${i}`;
            
            let inputLabel = document.createElement("label");
            inputLabelText = document.createTextNode(questions[i][`answer_${j}`]);
            inputLabel.appendChild(radioInput);
            inputLabel.appendChild(inputLabelText);
            questionAnswer.appendChild(inputLabel);
            questionBox.appendChild(questionAnswer); 
        }

        // Append Question Box to Container before Submit BTN

        container.insertBefore(questionBox,submitBtn);
        
    }
}



// Submit Button ON CLICK
submitBtn.addEventListener("click",function () {
    // Selecting all answers
    let allAnswers = document.getElementsByClassName("question-answer");
    // Selecting user's Answers
    let userAnswers = document.querySelectorAll(".question-answer:has(input:checked)");
    
    // Marking all module right answers green
    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].innerText == allAnswers[i].dataset.answer){
            allAnswers[i].style.borderColor = "#50e64a";
        }
        
    }

    // if user selected the right answer increase count by 1 , else , mark answer red 

    for (let i = 0; i < userAnswers.length; i++) {

        if(userAnswers[i].innerText == userAnswers[i].dataset.answer){
            grade++;
        }
        else{
            userAnswers[i].style.borderColor = "#e03838";
        }
        
    }

    //  Display Result
    
    gradeBox.style.display = "block";
    gradeBox.firstElementChild.innerText = grade;
    timer.style.display = "none";
    submitBtn.style.display = "none";
    


    
})



function countdown(duration) {
      let minutes, seconds;
      countdownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
  
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
  
        timer.innerHTML = `${minutes}:${seconds}`;
  
        if (--duration < 0) {
          clearInterval(countdownInterval);
          submitBtn.click();
        }
      }, 1000);
    
}
        
    
    
    








