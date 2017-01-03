/* Global Variables */
var allQuestions = [
    {question: "What does the acronym WWW stand for?",
    choices: ["Web Wide Wave", "World Wide Web", "Web World Wall", "Who What Where"],
    correctAnswer: 2},
    {question: "What does a cascading style sheet do?",
    choices: ["It makes your page cascade.", "Controls the scripts in your web page.", "Controls the way your content looks (or is presented).", "Makes your browser window bigger."],
    correctAnswer: 3},
    {question: "Which iconic designer famously carved words into his own flesh for an AIGA poster?",
    choices: ["Jonathan Ive", "Paul Rand", "Stefan Sagmeister", "Zaha Hadid"],
    correctAnswer: 3},
    {question: "When did Adobe finally ditch Flash?",
     choices: ["2011", "2010", "2012", "2009"],
     correctAnswer: 1}
    ];
var noOfQuestions = allQuestions.length;
console.log("Number of questions: " + noOfQuestions);
    
var totalScore = 0;
var currentQuestion = 0;
var qanda = "";
var answerList = "";
var answers = [];

$(document).ready(function() {
    $('#content, #back, #next, #warning').hide();
    $('#start').click(function() {
        $('#welcome').fadeOut(function() {
            $('#content').fadeIn(displayQA());
        });        
    });    
    $('#next').click(function() {
        storeAnswers();
        if ( currentQuestion < (noOfQuestions -1) ) {
            if (checkAnswer()) {
                currentQuestion++;
                $('#content').fadeOut(500, function() {displayQA()});
                
            }
            else {
                $('#warning').slideDown('fast');       
            }
        }
        else if (currentQuestion === (noOfQuestions - 1)) {
            $('#content').fadeOut(500, function() {displayResult()});
        }
    });
    
    $('#back').click(function() {
        if ( currentQuestion >= 0 ) {
            currentQuestion--;
            $('#content').fadeOut(500, function() {displayQA()});
        }
    });
});

function displayQA() {
        $('#warning').hide();
        console.log ("Current Question: " + currentQuestion);
        qanda = "";
        answerList = "";
        var checked = "";
        for (var i=0; i < allQuestions[currentQuestion].choices.length; i++) {
            if (i === parseInt(answers[currentQuestion]) ) {
                checked = "checked";
            }             
            answerList += "<input type=\"radio\" name=\"radioAns\" value=\"" + i + "\" " + checked + "/>" + allQuestions[currentQuestion].choices[i] + "</input><br/>";
            checked = "";
        };
    qanda = "<h3>Question " + (currentQuestion + 1) + ":</h3><p>" +
        allQuestions[currentQuestion].question +
        "</p>" +
        "<h3>Choose an answer:</h3><p>" +
        answerList;
        
        $('#content').hide().html(qanda);

        if (currentQuestion === 0) {
            $('#back').hide();
            $('#content, #next').fadeIn(1000);
        }
        else if (currentQuestion < noOfQuestions) {
            $('#content, #next, #back').fadeIn(1000);
        }

}

function checkAnswer() {
    if (!$("input[name='radioAns']:checked").val()) {
       //alert('Nothing is checked!');
        return false;
    }
    else {
        //alert('One of the radio buttons is checked!');
        return true;
    }
}

function storeAnswers() {
    if ($("input[name='radioAns']:checked").val()) {
        var selection = $('input[name=radioAns]');
        var checkedValue = selection.filter(':checked').val();
        answers[currentQuestion] = checkedValue;
        console.log(answers);
    }
}

function displayResult() {
    for (var i=0; i < noOfQuestions; i++) {
        console.log("Selected answer: " + answers[i]);
        console.log("Correct answer: " + allQuestions[i].correctAnswer);
        if (parseInt(answers[i]) === allQuestions[i].correctAnswer) {
            totalScore ++;
            console.log("Score so far: " + totalScore);
        }
    }
    $('#content').hide().html("Your score is: " + totalScore + " out of " + noOfQuestions).fadeIn(1000);
    $('#next, #back').hide();
}