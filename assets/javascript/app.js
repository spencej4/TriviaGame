$(document).ready(function () {
    triviaGame.makeGameBoard(0);
});

let triviaGame = {
    num: 0,
    timeLeft: 5000,
    correctNum: 0,
    incorrectNum: 0,
    header: "",
    timerId: "",
    gif: "",
    answerClicked: false,
    questions: [
        {
            question: "This person wanted to be a ventriloquist",
            gifLink: "assets/images/surfing.gif",
            answer: "Kelly_Slater",
            options: [{
                    answer: "David Beckham"
                },
                {
                    answer: "Beyonce"
                },
                {
                    answer: "Kelly Slater"
                },
                {
                    answer: "Ashton Kutcher"
                }
            ]
        },
        {
            question: "The sky is...",
            gifLink: "assets/images/butWhy.gif",
            answer: "Blue",
            options: [{
                    answer: "Green"
                },
                {
                    answer: "Blue"
                },
                {
                    answer: "Yellow"
                },
                {
                    answer: "White"
                }
            ]
        },
        {
            question: "The rain in spain falls mainly in the plain",
            gifLink: "assets/images/mfl.gif",
            answer: "My_Fair_Lady",
            options: [{
                    answer: "Sound of Music"
                },
                {
                    answer: "Westside Story"
                },
                {
                    answer: "My Fair Lady"
                },
                {
                    answer: "Pink Panther"
                }
            ]
        },
        {
            question: "What about the animal cargo?",
            answer: "Ace_Ventura",
            gifLink: "assets/images/ventura.gif",
            options: [{
                    answer: "Jurassic Park"
                },
                {
                    answer: "Pulp Fiction"
                },
                {
                    answer: "Dumb and Dumber"
                },
                {
                    answer: "Ace Ventura"
                }
            ]
        },
        {
            question: "The sun is made mostly from what element?",
            answer: "Hydrogen",
            gifLink: "assets/images/sun.gif",
            options: [{
                    answer: "Hydrogen"
                },
                {
                    answer: "Helium"
                },
                {
                    answer: "Nitrogen"
                },
                {
                    answer: "Carbon"
                },

            ]
        },
        {
            question: "What type of galaxy is our Milky Way?",
            answer: "A_spiral_galaxy",
            gifLink: "assets/images/galaxy.gif",
            options: [{
                    answer: "An irregular galaxy"
                },
                {
                    answer: "A spiral galaxy"
                },
                {
                    answer: "An intermediate galaxy"
                },
                {
                    answer: "An elliptical galacxy"
                },
            ]
        },
        {
            question: "A Schwarzschild radius:",
            answer: "Is_the_event_horizon_of_a_non-rotating_black_hole",
            gifLink: "assets/images/blackHole.gif",
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

    makeHeaderStats: function () {
        //header
        triviaGame.header = $('<div></div>');
        triviaGame.header.attr('id', 'header');
        $('#triviaGame').append(triviaGame.header);

        // number  of correct answers
        let score1 = $('<div></div>');
        score1.attr('id', 'score1');
        triviaGame.header.append(score1);

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


        // number of incorrect answers
        let score2 = $('<div></div>');
        score2.attr('id', 'score2');
        triviaGame.header.append(score2);

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

        //number of questions
        let count = $('<div></div>');
        count.attr('id', 'count');
        triviaGame.header.append(count);

        let countTop = $('<div></div>');
        countTop.attr('id', 'countTop')
        count.append(countTop);
        countTop.text(`Question`);

        let countBottom = $('<div></div>');
        countBottom.attr('id', 'countBottom')
        count.append(countBottom);
        countBottom.text(`Count:`);

        let countSpan = $('<div></div>');
        countSpan.attr('id', 'countSpan');
        count.append(countSpan);
        countSpan.text(triviaGame.num + 1);

        let countSpan2 = $('<div></div>');
        countSpan2.attr('id', 'countSpan2');
        count.append(countSpan2);
        countSpan2.text(`/${triviaGame.questions.length}`);

        // #timerSpan
        let timer = $('<div></div>');
        timer.attr('id', 'timer');
        triviaGame.header.append(timer);

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
        timerSpan.text(triviaGame.timeLeft);
    },

    stopGame: function () {
        let numLeft = triviaGame.questions.length;
        console.log(numLeft);
        if (numLeft === triviaGame.num) {
            console.log('game over');
            triviaGame.showGameOverGif();
            triviaGame.showPlayAgain();
        } else {
            triviaGame.makeGameBoard(triviaGame.num);
        }
    },

    makeGameBoard: function (num) {
        this.emptyBoard();
        this.makeHeaderStats();

        for (var i = num; i <= num; i++) {
            // saves index of question as global 
            triviaGame.index = i; /* (used in checkAnswer function) */
            triviaGame.gif = triviaGame.questions[i].gifLink;
            // creates
            let gifBoard = $('<div></div>');
            let question = $('<div></div>');
            let optionsBoard = $('<div></div>');
            let answerColumn = $('<div></div>');
            // adds attributes
            gifBoard.attr('id', 'gifBoard');
            question.attr('id', 'question');
            optionsBoard.attr('id', 'optionsBoard');
            answerColumn.attr('id', 'answerColumn');
            // appends DOM
            $('#triviaGame').append(gifBoard);
            $('#triviaGame').append(question);
            $('#triviaGame').append(optionsBoard);
            optionsBoard.append(answerColumn);
            // sets text
            question.text(`Q: ${triviaGame.questions[i].question}`);

            for (var j = 0; j < triviaGame.questions[i].options.length; j++) {
                // creates
                let answer = $('<div></div>');
                // joins empty spaces in answers to create ID's
                let answerID =
                    triviaGame.questions[i].options[j].answer.split(" ").join("_");                
                // adds attributes
                answer.addClass('answer').attr('id', answerID);
                // appends DOM
                $('#answerColumn').append(answer);
                answer.text(triviaGame.questions[i].options[j].answer);
            }
            break;
        }
        this.makeTimer();
        this.checkAnswer();
    },

    emptyBoard: function () {
        // resets the board values
        triviaGame.answerClicked = false;
        $('#triviaGame').empty();
    },

    emptyHeaderStats: function () {
        // resets header 
        $('#header').empty();
    },

    makeTimer: function () {
        clearTimeout(triviaGame.timerId);
        triviaGame.timeLeft = 5000;
        triviaGame.timerId = setInterval(triviaGame.countdown, 1000);
    },

    countdown: function () {
        // player ran out of time, didn't answer
        if (triviaGame.timeLeft === 0) {
            triviaGame.incorrectNum++
            triviaGame.stopTimer();
            triviaGame.num++
            triviaGame.makeGameBoard(triviaGame.num);
        // player clicked an answer
        } else if (triviaGame.answerClicked) {
            triviaGame.stopTimer();
        } else {
            $('#timerSpan').text(triviaGame.timeLeft);
            triviaGame.timeLeft--;
        }
    },

    stopTimer: function () {
        clearTimeout(triviaGame.timerId);
    },

    checkAnswer: function () {
        $('.answer').click(function () {
            // prevents ability to choose more than one answer
            if (!triviaGame.answerClicked) {
                let selection = this.id;
                triviaGame.answerClicked = true;
                triviaGame.showGIF();

                if (this.id === triviaGame.questions[triviaGame.index].answer) {
                    triviaGame.answerSelected(selection);
                } else {
                    triviaGame.answerNotSelected(selection);
                }
            }
        })
    },

    showGIF: function () {
        $('#gifBoard').css("background-image", "url('" + triviaGame.gif + "')");
    },

    showGameOverGif: function () {
        $('#gifBoard').css("background-image", 'url("assets/images/gameOver.gif")');
    },

    showPlayAgain: function() {
        // empties the options board
        $('#optionsBoard').empty();
        // creates new div (play again button)
        let playAgain = $('<div></div>');
        // adds id to new div
        playAgain.attr('id', 'playAgain');
        playAgain.text('Play Again');
        // appends new div to DOM
        $('#optionsBoard').append(playAgain);

        $('#playAgain').click(function() {
            triviaGame.reset();
            triviaGame.makeGameBoard(0);
        });
    },

    reset: function() {
        // resets global stat values
        triviaGame.num = 0;
        triviaGame.correctNum = 0;
        triviaGame.incorrectNum = 0;
    },

    answerSelected: function (selection) {
        let selected = document.getElementById(selection);
        selected.style.backgroundColor = '#C9FF7E';
        selected.style.color = '#666';
        triviaGame.correctNum++
        $('#correctNumSpan').text(triviaGame.correctNum);
        triviaGame.num++;
        $('#question').text("Nice Job!");

        myVar = setTimeout(function () {
            triviaGame.makeTimer();
            // check if game is out of questions
            triviaGame.stopGame();
            // triviaGame.makeGameBoard(triviaGame.num);
        }, 5000);
    },

    answerNotSelected: function (selection) {
        console.log(selection);
        let selected = $("#" + selection);
        console.log(selected);
        // changes background of selected answer
        selected.css('background-color', '#F33C62');
        selected = "";
        //updates number of incorrect
        triviaGame.incorrectNum++
        // changes text of incorrectNum in header
        $('#incorrectNumSpan').text(triviaGame.incorrectNum);
        // increments number of question
        triviaGame.num++;
        // displays message
        $('#question').text("Nice try...");

        myVar = setTimeout(function () {
            triviaGame.makeTimer();
            triviaGame.stopGame();
            // triviaGame.makeGameBoard(triviaGame.num);
        }, 5000);
    },
}



// add more questions
// and gifs

// create game over div             DONE
// create play again button and     DONE
// create play again function

// create tally            DONE
// 5/10                DONE

// randomize answers 
// create tally         DONE
// correct, incorrect,  DONE