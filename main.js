let htmlButton = document.querySelector(".html-button");
let cssButton = document.querySelector(".css-button");
let jsButton = document.querySelector(".js-button");
let category = document.querySelector(".category");
let content = document.querySelector("#content");
let head = document.querySelector(".head .kind span");
let count = document.querySelector(".count span");
let bubble = document.querySelector(".bullets .spans");
let ques = document.querySelector(".question");
let ansOne = document.querySelector(".num-one");
let ansTwo = document.querySelector(".num-two");
let ansThree = document.querySelector(".num-three");
let ansFour = document.querySelector(".num-four");
let submit = document.querySelector(".submit button");
let answers = document.getElementsByName("question");
let text = document.querySelectorAll(".answer label");
let rightAnswer = 0, falseAnswer = 0;
htmlButton.addEventListener("click", () => {
    content.style.display = "block";  
    category.style.display = "none";  
    head.innerHTML = htmlButton.innerHTML;
    getQuestions("/html.json");
})
cssButton.addEventListener("click", () => {
    content.style.display = "block";  
    category.style.display = "none";  
    head.innerHTML = cssButton.innerHTML;
    getQuestions("/css.json");
})
jsButton.addEventListener("click", () => {
    content.style.display = "block";
    category.style.display = "none";
    head.innerHTML = jsButton.innerHTML;
    getQuestions("/js.json");
});
function getQuestions(url) {
    let index = 0;
    let req = new XMLHttpRequest();
    req.onload = function() {
        if (this.status === 200 && this.readyState === 4) {
            let questions = JSON.parse(this.responseText);
            let num = questions.length;
            count.innerHTML = num;
            createBubbles(num);
            displayQuestion(questions, index);
            answers[0].checked = true;
            submit.addEventListener("click", () => {
                index++;
                displayQuestion(questions, index);
                handleBubbles(index);
            });
        }
    }
    req.open("GET", url, true);
    req.send();
}
let right;
function displayQuestion(questions, index) {
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].checked){
            right = text[i].innerHTML;
            checkAnswer(right,index,questions);
            if(falseAnswer + rightAnswer === questions.length){
                showGrade(rightAnswer , questions.length);
            }
        }
    }
    answers[0].checked = true;
    if (index < questions.length) {
        ques.innerHTML = questions[index].title;
        ansOne.innerHTML = questions[index].answer_1;
        ansOne.setAttribute("data-progress" , questions[index].answer_1);
        ansTwo.innerHTML = questions[index].answer_2;
        ansTwo.setAttribute("data-progress" , questions[index].answer_2);
        ansThree.innerHTML = questions[index].answer_3;
        ansThree.setAttribute("data-progress" , questions[index].answer_3);
        ansFour.innerHTML = questions[index].answer_4;
        ansFour.setAttribute("data-progress" , questions[index].answer_4);
    }
}
function createBubbles(num){
    for (let index = 0; index < num; index++) {
        let circle = document.createElement("span");
        if(index === 0){
            circle.className = "on"
        }
        bubble.appendChild(circle)
    }
}
function handleBubbles(index){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, i) => {
        if (index === i) {
            span.className = "on";
        }
    });
}
function checkAnswer(ans,index,questions){
    if(ans === questions[index-1].right_answer){
        rightAnswer++;
    }
    else{
        falseAnswer++;
    }
}
function showGrade(rightAnswer , count){
    let quiz = document.querySelector(".container");
    quiz.style.display = "none";
    let result = document.querySelector(".result");
    let resultSpan = document.querySelector(".result p span");
    result.style.display = "block";
    if (rightAnswer > count / 2 && rightAnswer < count){
        resultSpan.innerHTML = `${rightAnswer} from ${count}, Good`;
        resultSpan.className = "good";
    } else if (rightAnswer === count) {
        resultSpan.innerHTML = `${rightAnswer} from ${count}, Perfect`;
        resultSpan.className = "perfect";
    } else {
        resultSpan.innerHTML = `${rightAnswer} from ${count}, Bad`;
        resultSpan.className = "bad";
    }
    
}
