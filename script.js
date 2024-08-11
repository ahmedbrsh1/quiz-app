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
    countdown(60);
    
})


function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            let questions = JSON.parse(this.responseText);
            gradeBox.lastElementChild.innerText = questions.length;
            for (let i = 0; i < questions.length; i++) {
                let questionBox = document.createElement("div");
                questionBox.classList.add("question");
                let questionNumber = document.createElement("div");
                questionNumber.classList.add("question-number");
                questionNumber.innerHTML = `Question ${i+1}`
                questionBox.appendChild(questionNumber);
                let questionTitle = document.createElement("div");
                let questionTitleText = document.createTextNode(questions[i].title);
                questionTitle.appendChild(questionTitleText);
                questionTitle.classList.add("question-title");
                questionBox.appendChild(questionTitle);                
                for (let j = 1; j <= 4; j++) {
                    let questionAnswer = document.createElement("div");
                    questionAnswer.dataset.answer = questions[i].right_answer;
                    questionAnswer.classList.add("question-answer");
                    let radioInput = document.createElement("input");
                    radioInput.setAttribute("type","radio");
                    let dataId = document.createAttribute("data-id");
                    // radioInput.id = `answer_${j}`;
                    radioInput.setAttribute("data-id",`answer_${j}`);
                    radioInput.name = `question_${i}`;
                    
                    let inputLabel = document.createElement("label");
                    // inputLabel.setAttribute("for",`answer_${j}`);
                    inputLabelText = document.createTextNode(questions[i][`answer_${j}`]);
                    inputLabel.appendChild(radioInput);
                    inputLabel.appendChild(inputLabelText);
                    
                    // questionAnswer.appendChild(radioInput);
                    questionAnswer.appendChild(inputLabel);
                    questionBox.appendChild(questionAnswer); 
                }

                container.insertBefore(questionBox,submitBtn);
                
            }
            
        }
    }

    myRequest.open("GET","html_questions.json",true);
    myRequest.send();
    
    
}


submitBtn.addEventListener("click",function () {
    let allAnswers = document.getElementsByClassName("question-answer");
    let userAnswers = document.querySelectorAll(".question-answer:has(input:checked)");
    

    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].innerText == allAnswers[i].dataset.answer){
            allAnswers[i].style.borderColor = "#8cd68a";
        }
        
    }

    for (let i = 0; i < userAnswers.length; i++) {

        if(userAnswers[i].innerText == userAnswers[i].dataset.answer){
            grade++;
        }
        else{
            userAnswers[i].style.borderColor = "red";
        }
        
    }
    
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
          submitButton.click();
        }
      }, 1000);
    
}
        
    
    
    








