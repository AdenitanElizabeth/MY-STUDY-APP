const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availabeQuestion = []
let questions = [
    {
        question: "C Programming Language is often called as:",
        choice1: "High Level Language",
        choice2: "Middle Level Language",
        choice3: "Low Level Language",
        choice4: "None of these",
        answer: 2,
    },
    {
        question: "Which of the following is not a programming language?",
        choice1: "Java",
        choice2: "Python",
        choice3: "HTML",
        choice4: "C++",
        answer: 3,
    },
    {
        question: "Which of the following is true about C programming language ?",
        choice1: "C is a structural language.",
        choice2: "C is a procedural language.",
        choice3: "C does not support functions within functions.",
        choice4: "All of these",
        answer: 4,

    },
    {
        question: "How many keywords are there in Standard C programming language?",
        choice1: "32",
        choice2: "28",
        choice3: "21",
        choice4: "44",
        answer: 4,
    },
    {
        question: "Process in which source code is combined with object code is termed as:",

          choice1: "Linker",
           choice2: "Loading",
          choice3: "Linking",
           Choice4: "None of these",

          answer: 3,
    },
    {
        question: "Which operator is used to return the length of the variables in bytes?",
        choice1: "size()",
        choice2: "length()",
        choice3: "leng()",
        choice4: "sizeof()",
        answer: 4,




    },
    {
        question: "Which data type is best for storing a number 65000 in a 32-bit system?",
        choice1: "int",
        choice2: "long",
        choice3: "signed short",
        choice4: "unsigned short",
        answer: 4,
    },
    {
        question: "Which data type is best for storing a number 65000 in a 32-bit system?",
        choice1: "int",
        choice2: "long",
        choice3: "signed short",
        choice4: "unsigned short",
        answer: 4,
    },
    {
        question: "_______ is used to take user input in C.",
        choice1: "input()",
        choice2: "printf()",
        choice3: "scanf()",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "To avoid repetition of code and bulky programs, statements are isolated inside a _.",
        choice1: "Functions",
        choice2: "Modules",
        choice3: "Header Files",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Which of the following attributes is used to add link to any element?",
        choice1: "link",
        choice2: "ref",
        choice3: "href",
        choice4: "newref",
        answer: 3,
    },
    {
        question: "Which of the following is the correct way of creating an hyperlink in HTML?",
        choice1: "<a>www.geeksforgeeks.org <Geeksforgeeks /a>",
        choice2: '<a href="www.geeksforgeeks.org">Geeksforgeeks</a>',
        choice3: '<a href=“www.geeksforgeeks.org” Geeksforgeeks /a>',
        choice4: '<a link=“www.geeksforgeeks.org” Geeksforgeeks> </a>',
        answer: 2,




    },
    {
        question: "What is the purpose of using div tags in HTML?",
        choice1: "For creating different styles.",
        choice2: "For creating different sections.",
        choice3: "For adding headings.",
        choice4: "For adding titles.",
        answer: 2,
    },
    {
        question: "Which of the following tags is used to make a portion of text italic in HTML?",
        choice1: "<italic>",
        choice2: "<i>",
        choice3: "<style= “i”>",
        choice4: "<style=“italic”>",
        answer: 2,
    },
    {
        question: "Which of the following tags is used to add a line-break in HTML?",
        choice1: "<br>",
        choice2: "<break>",
        choice3: "</break>",
        choice4: "</br>",
        answer: 1,
    },
    {
        question: "How many heading tags are there in HTML5?",
        choice1: "2",
        choice2: "3",
        choice3: "5",
        choice4: "6",
        answer: 4,
    },
    {
        question: "Which of the following HTML Elements is used for making any text bold?",

            choice1: "<p>",
            choice2:" <i>",
            choice3: "<li>",
            choice4: "<b>",

            Answer: 4,
    },
    {
        question: "How is document type initialized in HTML5?",

     choice1: "</DOCTYPE HTML>",
    choice2: "</DOCTYPE>",
    choice3: "<!DOCTYPE HTML>",
    choice4: "</DOCTYPE html>",

     Answer: 3,
    },
    {
        question: "Which of the following characters indicate closing of a tag?",

           choice1: ".",
           choice2: "/",
           choice3: "//",
           choice4: "!",

                Answer: 2
    },
    {
        question: "HTML stands for __________?",
        choice1: "HyperText Markup Language",
        choice2: " HyperText Machine Language",
        choice3: " HyperText Marking Language",
        choice4: " HighText Marking Language",
        Answer: 1,
    },
    {
        question: "Which of the following is used to read an HTML page and render it?",
        choice1: " Web server",
        choice2: " Web network",
        choice3: "Web browser",
        choice4: " Web matrix",
        Answer: 3,
        },

]
const SCORE_POINTS = 100;
const MAX_QUESTION = 100;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTION) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startQuiz()