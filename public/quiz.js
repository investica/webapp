var currentNumber = 0;
var questions = [
"What are some reasons to invest?",
"Which of the following are necessary to start investing?",
"Which of the following best describe compound interest?",
"Which of the following would lead to earning more on your investment?",
"Which of the following is not a type of investment?",
"What are some common mistakes people make when investing?",
"Which of the following is a low risk way to invest?",
"Why is a savings account not enough if you want your investment to grow?"
];
var answers =[
["To have money for retirement","To have money for emergencies","To have money for family","All of the above"],
["Risk-taking personality","An initial investment amount","A high-paying job","A large stock portfolio"],
["Your initial investment squared","The amount of money you earn in a year","Gaining interest on previously earned interest","Combining different investments together"],
["Start investing earlier","Invest a lot initially","Invest a lot monthly","All of the above"],
["Bond","Stock","Progressive", "Mutual Fund"],
["Having unrealistic expectations","Not letting their investment mature","Not consistently making monthly additions","All of the above"],
["IPO's","Roth IRA CDs","Penny stocks","Venture capital"],
["It is low risk","Very low return","Easily accessible money","No penalties when withdrawing money"]
];
var highScore = 0;


// Function for when page first loads, what you want it to do
$(document).ready( function () {
	nextQuestion();
	//Set Button Functions
	$("#nextButton").bind("click", nextQuestion);
	
} );

function nextQuestion(){
	if(currentNumber < 8){
		$('#questionNumber').text("Question " + (currentNumber+1));
		$('#questionText').text(questions[currentNumber]);
		$('#answer1Text').text(answers[currentNumber][0]);
		$('#answer2Text').text(answers[currentNumber][1]);
		$('#answer3Text').text(answers[currentNumber][2]);
		$('#answer4Text').text(answers[currentNumber][3]);
		
		currentNumber++;
		
		var ele = document.getElementsByName("answer");
		for(var i=0;i<ele.length;i++)
			ele[i].checked = false;
	}
	else{
		highScore = 80;
		$('#questionNumber').text("Quiz Complete! You scored "+ highScore +"/100!");
		
		$('#questionText').remove();
		$('#answer1Text').remove();
		$('#answer2Text').remove();
		$('#answer3Text').remove();
		$('#answer4Text').remove();
		$('#answers').remove();
		
		$("#nextButton").bind("click", returnToMain);
	}
}

function returnToMain(){
	location.href="quizzes"+'?param=' + highScore;
}
