$(document).ready(function () {
    triviaGame.makeGameBoard(0);
});

let triviaGame = {
    num: 0,
    timeLeft: 30,
    correctNum: 0,
    incorrectNum: 0,
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
        }, 
        {
            question: "What type of galaxy is our Milky Way?",
            answer: "A spiral galaxy",
            options: [
                { answer: "An irregular galaxy" },
                { answer: "A spiral galaxy" },
                { answer: "An intermediate galaxy" },
                { answer: "An elliptical galacxy" },
            ]
        },
        {
            question: "A Schwarzschild radius:",
            answer: "Is the event horizon of a non-rotating black hole",
            options: [{
                    answer: "Requires a theory of quantum gravity"
                },
                {
                    answer: "Is the event horizon of a non-rotating black hole"
                },
                {
                    answer: "Is responsible for the redshift of ancient light"
                },
                {
                    answer: "Is a biproduct of Hawking radiation"
                },
            ]
        },
    ],

    makeHeaderStats: function() {
        let header = $('<div></div>');
        header.attr('id', 'header');
        $('#triviaGame').append(header);

        let score1 = $('<div></div>');
        score1.attr('id', 'score1');
        header.append(score1);

        let numCorrectTop = $('<div></div>');
        numCorrectTop.attr('id', 'numCorrectTop')
        score1.append(numCorrectTop);
        numCorrectTop.text(`Number`);

        let numCorrectBottom = $('<div></div>');
        numCorrectBottom.attr('id', 'numCorrectBottom')
        score1.append(numCorrectBottom);
        numCorrectBottom.text(`Correct:`);

        let correctNumSpan = $('<div></div>');
        correctNumSpan.attr('id', 'correctNumSpan');
        score1.append(correctNumSpan);
        correctNumSpan.text(triviaGame.correctNum);



        let score2 = $('<div></div>');
        score2.attr('id', 'score2');
        header.append(score2);

        let numIncorrectTop = $('<div></div>');
        numIncorrectTop.attr('id', 'numIncorrectTop')
        score2.append(numIncorrectTop);
        numIncorrectTop.text(`Number`);

        let numIncorrectBottom = $('<div></div>');
        numIncorrectBottom.attr('id', 'numIncorrectBottom')
        score2.append(numIncorrectBottom);
        numIncorrectBottom.text(`Incorrect:`);

        let incorrectNumSpan = $('<div></div>');
        incorrectNumSpan.attr('id', 'incorrectNumSpan');
        score2.append(incorrectNumSpan);
        incorrectNumSpan.text(triviaGame.incorrectNum);

        // #timerSpan
        let timer = $('<div></div>');
        timer.attr('id', 'timer');
        header.append(timer);

        let timerTop = $('<div></div>');
        timerTop.attr('id', 'timerTop')
        timer.append(timerTop);
        timerTop.text(`Seconds`);

        let timerBottom = $('<div></div>');
        timerBottom.attr('id', 'timerBottom')
        timer.append(timerBottom);
        timerBottom.text(`Remaining:`);

        let timerSpan = $('<div></div>');
        timerSpan.attr('id', 'timerSpan');
        timer.append(timerSpan);
        timerSpan.text(triviaGame.incorrectNum);
    },

    makeGameBoard: function (num) {
        triviaGame.answerClicked = false;
        // resets the board
        $('#triviaGame').empty();
        triviaGame.makeHeaderStats();

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
        // $('#timer').remove();
        clearTimeout(triviaGame.timerId);
        triviaGame.timeLeft = 30;

        // // creates DOM element
        // let timerDisplay = $('<div></div>');
        // // gives ID attribute to new DOM element
        // timerDisplay.attr('id', 'timer');
        // // appends to the DOM
        // $('#question').append(timerDisplay);

        triviaGame.timerId = setInterval(triviaGame.countdown, 1000);
    },

    countdown: function() {
        if (triviaGame.timeLeft === 0) {
            // player ran out of time, didn't answer
            triviaGame.incorrectNum++
            triviaGame.stopTimer();
            triviaGame.num++
            triviaGame.makeGameBoard(triviaGame.num);
        } else if (triviaGame.answerClicked) {
            triviaGame.stopTimer();
        } else {
            $('#timerSpan').text(triviaGame.timeLeft);
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
                triviaGame.correctNum++
                triviaGame.makeTimer();
                triviaGame.makeGameBoard(triviaGame.num);
            }else {
                console.log('nope');
                triviaGame.incorrectNum++
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
