const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const next = document.querySelector("footer .next_button");
const bottom_ques_counter = document.querySelector("footer .total");
const result_box = document.querySelector(".result_box");
const restart = result_box.querySelector(".buttons .restart");
const quit = result_box.querySelector(".buttons .quit");

let que_count = 0;
let que_numb = 1;
let userScore = 0;

let tick = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let cross = '<div class="icon cross"><i class="fas fa-times"></i></div>';

next.onclick = () => {
    if(que_count < questions.length-1){
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb); 
        next.classList.remove("show");
    }
    else{
        showResult();
    }
};

restart.onclick = () => {

    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");

    que_count = 0;
    que_numb = 1;
    userScore = 0;

    showQuetions(0);

    next.classList.remove("show"); 

};

quit.onclick = () => {
    window.history.back();
};

// getting questions and options from array
function showQuetions(index){
    queCounter(1);
    const question = document.querySelector(".questions");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("correct"); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", cross);
        console.log("Wrong Answer"); 
    }

    for(i=0; i < allOptions; i++){
        if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
            option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            option_list.children[i].insertAdjacentHTML("beforeend", tick); //adding tick icon to matched option
            console.log("Auto selected correct answer.");
        }
    }

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    next.classList.add("show");
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

function showResult(){
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    const scoreText = result_box.querySelector(".score_text");

    let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}

quiz_box.classList.add("activeQuiz");
showQuetions(0);