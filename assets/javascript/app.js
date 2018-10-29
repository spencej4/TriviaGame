$(document).ready(function () {
    triviaGame.makeGameBoard(0);
});

let triviaGame = {
    num: 0,
    timeLeft: 30,

    timerId: "",
    answerClicked: false,
    questions: [{
            question: "The rain in spain falls mainly in the plain",
            answer: "My Fair Lady",
            options: [
                { answer: "Sound of Music" },
                { answer: "Westside Story" },
                { answer: "My Fair Lady" },
                { answer: "Pink Panther" }
            ]
        },
        {
            question: "What about the animal cargo?",
            answer: "Ace Ventura",
            options: [
                { answer: "Jurassic Park" },
                { answer: "Pulp Fiction" },
                { answer: "Dumb and Dumber" },
                { answer: "Ace Ventura" }
            ]
        },
        {
            question: "The sun is made mostly from what element?",
            answer: "Hydrogen",
            options: [
                { answer: "Hydrogen" },
                { answer: "Helium" },
                { answer: "Nitrogen" },
                { answer: "Carbon" },

            ]
        }
    ],

    makeGameBoard: function (num) {
        triviaGame.answerClicked = false;
        // resets the board
        $('#triviaGame').empty();

        for (var i=num; i <= num; i++) {
            // saves index of question as global 
            // used in checkAnswer function
            triviaGame.index = i;
            // creates
            let question = $('<div></div>');
            let optionsBoard = $('<div></div>');
            // adds attributes
            question.attr('id', 'question');
            optionsBoard.attr('id', 'optionsBoard');
            // appends DOM
            $('#triviaGame').append(question);
            $('#triviaGame').append(optionsBoard);
            // sets text
            question.text(triviaGame.questions[i].question);

            for (var j=0; j < triviaGame.questions[i].options.length; j++) {
                // console.log(triviaGame.questions[i].options[j].answer);
                // creates
                let answer = $('<div></div>');

                // adds attributes
                answer.addClass('answer').attr('id', triviaGame.questions[i].options[j].answer);

                // appends DOM
                $('#optionsBoard').append(answer);

                answer.text(triviaGame.questions[i].options[j].answer);
                
            }
            break;
        }
        triviaGame.makeTimer();
        triviaGame.checkAnswer();
    },


    makeTimer: function () {
        // clears the timer from DOM
        $('#timer').remove();
        clearTimeout(triviaGame.timerId);
        triviaGame.timeLeft = 30;

        // creates DOM element
        let timerDisplay = $('<div></div>');
        // gives ID attribute to new DOM element
        timerDisplay.attr('id', 'timer');
        // appends to the DOM
        $('#question').append(timerDisplay);

        triviaGame.timerId = setInterval(triviaGame.countdown, 1000);
    },

    countdown: function() {
        if (triviaGame.timeLeft === 0) {
            // update points here
            triviaGame.stopTimer();
        } else if (triviaGame.answerClicked) {
            triviaGame.stopTimer();
        } else {
            $('#timer').text(`Seconds Remaining: ${triviaGame.timeLeft}`);
            triviaGame.timeLeft--;
        }
    },

    stopTimer: function () {
        clearTimeout(triviaGame.timerId);
        $('#timer').remove();
    },

    checkAnswer: function() {
        $('.answer').click(function() {
            triviaGame.answerClicked = true;
            console.log(this.id);
            if (this.id === triviaGame.questions[triviaGame.index].answer) {
                console.log('match found!');
                triviaGame.num++;
                triviaGame.makeTimer();
                triviaGame.makeGameBoard(triviaGame.num);
            }else {
                console.log('nope');
                triviaGame.num++;
                triviaGame.makeTimer();
                triviaGame.makeGameBoard(triviaGame.num);
            }
        })
    },

}

// randomize answers 
// create tally
    // correct, incorrect, 
// create tally
    // 5/10
