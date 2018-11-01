$(document).ready(function () {
    triviaGame.makeGameBoard(0);
});

let triviaGame = {
    num: 0,
    timeLeft: 30,
    correctNum: 0,
    incorrectNum: 0,
    header: "",
    timerId: "",
    timerPauseId: "",
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
            question: "Can't turn left...",
            answer: "Zoolander",
            gifLink: "assets/images/zoolander.gif",
            options: [{
                answer: "Magnetic particles"
            },
            {
                answer: "The first airplane"
            },
            {
                answer: "Three-wheeler"
            },
            {
                answer: "Zoolander"
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
            question: "In which film do two cats sing “The Siamese Cat Song”?",
            gifLink: "assets/images/siamese.gif",
            answer: "Lady_and_the_Tramp",
            options: [{
                answer: "101 Dalmations"
            },
            {
                answer: "Lady and the Tramp"
            },
            {
                answer: "My Fair Lady"
            },
            {
                answer: "An American Tail"
            }
            ]
        },
        {
            question: "(4 * 3) / 2",
            gifLink: "assets/images/willfarrell.gif",
            answer: "Six",
            options: [{
                answer: "Three"
            },
            {
                answer: "Six"
            },
            {
                answer: "No thanks"
            },
            {
                answer: "Uraguay"
            }
            ]
        },
    ],

   
    stopGame: function () {
        let numLeft = triviaGame.questions.length;
        // if there are no questions left
        if (numLeft === triviaGame.num) {
            triviaGame.showGameOverGif();
            triviaGame.showPlayAgain();
        } else {
            triviaGame.makeGameBoard(triviaGame.num);
        }
    },

    makeHeaderStats: function () {
    // header
        triviaGame.header = $('<div></div>').attr('id', 'header');
        $('#triviaGame').append(triviaGame.header);

    // number  of correct answers
        let score1 = $('<div></div>').attr('id', 'score1');
        triviaGame.header.append(score1);

        let numCorrectTop = $('<div></div>').attr('id', 'numCorrectTop');
        score1.append(numCorrectTop);
        numCorrectTop.text(`Number`);

        let numCorrectBottom = $('<div></div>').attr('id', 'numCorrectBottom');
        score1.append(numCorrectBottom);
        numCorrectBottom.text(`Correct:`);

        let correctNumSpan = $('<div></div>').attr('id', 'correctNumSpan');
        score1.append(correctNumSpan);
        correctNumSpan.text(triviaGame.correctNum);


    // number of incorrect answers
        let score2 = $('<div></div>').attr('id', 'score2');
        triviaGame.header.append(score2);

        let numIncorrectTop = $('<div></div>').attr('id', 'numIncorrectTop');
        score2.append(numIncorrectTop);
        numIncorrectTop.text(`Number`);

        let numIncorrectBottom = $('<div></div>').attr('id', 'numIncorrectBottom');
        score2.append(numIncorrectBottom);
        numIncorrectBottom.text(`Incorrect:`);

        let incorrectNumSpan = $('<div></div>').attr('id', 'incorrectNumSpan');
        score2.append(incorrectNumSpan);
        incorrectNumSpan.text(triviaGame.incorrectNum);

    // number of questions
        let count = $('<div></div>').attr('id', 'count');
        triviaGame.header.append(count);

        let countTop = $('<div></div>').attr('id', 'countTop');
        count.append(countTop);
        countTop.text(`Question`);

        let countBottom = $('<div></div>').attr('id', 'countBottom');
        count.append(countBottom);
        countBottom.text(`Count:`);

        let countSpan = $('<div></div>').attr('id', 'countSpan');
        count.append(countSpan);
        countSpan.text(triviaGame.num + 1);

        let countSpan2 = $('<div></div>').attr('id', 'countSpan2');
        count.append(countSpan2);
        countSpan2.text(`/${triviaGame.questions.length}`);

    // timer
        let timer = $('<div></div>').attr('id', 'timer');
        triviaGame.header.append(timer);

        let timerTop = $('<div></div>').attr('id', 'timerTop');
        timer.append(timerTop);
        timerTop.text(`Seconds`);

        let timerBottom = $('<div></div>').attr('id', 'timerBottom');
        timer.append(timerBottom);
        timerBottom.text(`Remaining:`);

        let timerSpan = $('<div></div>').attr('id', 'timerSpan');
        timer.append(timerSpan);
        timerSpan.text(triviaGame.timeLeft);
    },

    makeGameBoard: function (num) {
        this.emptyBoard();
        this.makeHeaderStats();
        this.makeTimer();
        for (var i = num; i <= num; i++) {
            // saves index of question as global 
            triviaGame.index = i; /* (used in checkAnswer function) */
            triviaGame.gif = triviaGame.questions[i].gifLink;
            // creates and adds ID's
            let gifBoard = $('<div></div>').attr('id', 'gifBoard');
            let question = $('<div></div>').attr('id', 'question');
            let optionsBoard = $('<div></div>').attr('id', 'optionsBoard');
            let answerColumn = $('<div></div>').attr('id', 'answerColumn');
            // appends 
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
                // appends 
                $('#answerColumn').append(answer);
                // sets text
                answer.text(triviaGame.questions[i].options[j].answer);
            }
            break;
        }
        this.checkAnswer();
    },

    emptyBoard: function () {
        // resets the board values
        triviaGame.answerClicked = false;
        $('#triviaGame').empty();
    },

    emptyHeaderStats: function () {
        $('#header').empty();
    },

    makeTimer: function () {
        clearTimeout(triviaGame.timerId);
        triviaGame.timeLeft = 30;
        triviaGame.timerId = setInterval(triviaGame.countdown, 1000);
        triviaGame.countdown();
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
        // called when user clicks any answer
        $('.answer').click(function () {
            // prevents ability to choose more than one answer
            if (!triviaGame.answerClicked) {
                let selection = this.id;
                triviaGame.answerClicked = true;
                triviaGame.showGIF();

                // if answer chosen is the actual answer
                if (this.id === triviaGame.questions[triviaGame.index].answer) {
                    triviaGame.answerSelected(selection);
                // otherwise...
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
        $('#optionsBoard').empty();
        let playAgain = $('<div></div>').attr('id', 'playAgain');
        playAgain.text('Play Again');
        $('#optionsBoard').append(playAgain);

        $('#playAgain').click(function() {
            triviaGame.reset();
            triviaGame.makeGameBoard(0);
        });
    },

    reset: function() {
        // resets global values
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
        $('#question').text("Correct!");
        
        // pauses game to show correct answer
        triviaGame.timerPauseId = setTimeout(function () {
            // makes timer
            triviaGame.makeTimer();
            // checks if game is out of questions
            triviaGame.stopGame();
        }, 4000);
    },

    answerNotSelected: function (selection) {
        // shows the correct answer
        triviaGame.showAnswer();
        let selected = $("#" + selection);
        // changes background of selected answer
        selected.css('background-color', '#F33C62');
        // resets selected variable
        selected = "";

        //updates number of incorrect
        triviaGame.incorrectNum++
        // changes text of incorrectNum in header
        $('#incorrectNumSpan').text(triviaGame.incorrectNum);
        // increments number of question
        triviaGame.num++;
        // displays message
        $('#question').text("Nice try...");

        //pause game to show correct answer
        triviaGame.timerPauseId = setTimeout(function () {
            // make timer
            triviaGame.makeTimer();
            // check if game is out of questions
            triviaGame.stopGame();
        }, 4000);
    },

    showAnswer: function() {
        // searches answers
        $('.answer').each(function () {
            // finds the correct answer
            if (this.id === triviaGame.questions[triviaGame.index].answer) {
                // changes the colors for the correct asnwer
                this.style.backgroundColor = '#C9FF7E';
                this.style.color = '#666';
            }
        });
    }
}