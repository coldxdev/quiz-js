/* All questions */
const questions = [
    {
        question: 'Что в JavaScript означет "use strict"?',
        options: [
            'Медленный режим',
            'Нежный режим',
            'Строгий режим',
            'Турбо режим',
        ],
        answer: 2,

    },
    {
        question: 'Почему используют стрелочные функции, вместо обычных?',
        options: [
            'Быстрее работают',
            'Обычные функции в ECMAScript6 запрещены',
            'По приколу',
            'Потому что они задают собственное значение this',
        ],
        answer: 0,
    },
    {
        question: 'Что такое babel?',
        options: [
            'Слайдер, написанный на чистом JavaScript',
            'JavaScript транспилятор',
            'Таск-менеджер, для оптимизации задач',
            'Метод в JavaScript, который появится в ECMAScript2022',
        ],
        answer: 1,
    },
]

/* Quiz State */
const quizState = {
    result: {
        good: ['Замечательно!', 'Молодец!', 'Крутышка!'],
        bad: ['Постарайся лучше!', 'Можно и лучше! :(', 'Не твой уровень']
    },
}

/* Buttons  */
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnTryAgain = document.getElementById('btn-try-again');

/* Modals */
const quiz = document.querySelector('.quiz');
const quizResult = document.querySelector('.quiz-result');

/* Numbers */
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions2');
const quizResultScore = document.getElementById('quiz-result-score');

/* Options */
const optionsElems = document.querySelectorAll('.quiz__option');

/* Question  */
const question = document.getElementById('question');

/* Error  */
const quizError = document.querySelector('.quiz__error');

/* Quiz result title */
const quizResultTitle = document.querySelector('.quiz-result__title');

/* Values */
let indexOfQuestion;
let indexOfPage = 0;
let amountOfQuestions = questions.length;
let score = 0;
let completedQuestions = [];

/* Quiz modal  */
btnStart.addEventListener('click', () => {
    quiz.classList.add('active');
});
quiz.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal__body')
        || target.classList.contains('modal__close')) {
        quizReset();
        quiz.classList.remove('active');
    }
});

/* Quiz result modal  */
quizResult.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('modal__body')
        || target.classList.contains('modal__close')) {
        quizReset();
        quizResult.classList.remove('active');
    }
});

/* Quiz logic  */
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * amountOfQuestions)
    let isDuplicate = false;

    completedQuestions.forEach(i => {
        isDuplicate = i === randomNumber;
    })

    if (!isDuplicate) {
        indexOfQuestion = randomNumber;
        completedQuestions.push(indexOfQuestion);
        quizLoad();
    } else {
        randomQuestion();
    }
};

const quizCheckAnswer = () => {
    optionsElems.forEach(option => {
        option.addEventListener('click', () => {
            if (parseInt(option.dataset.id) === questions[indexOfQuestion].answer) {
                option.classList.add('correct');
                score++;
            } else {
                option.classList.add('wrong');
            }
            if (indexOfPage === amountOfQuestions) {
                btnNext.innerHTML = 'Узнать результаты';
            }
            disableOptions();
        });
    })
};

const enableOptions = () => {
    optionsElems.forEach(option => {
        option.classList.remove('wrong', 'correct', 'disabled');
    })
};

const disableOptions = () => {
    optionsElems.forEach(option => {
        option.classList.add('disabled');
        if (parseInt(option.dataset.id) === questions[indexOfQuestion].answer) {
            option.classList.add('correct');
        }
    })
};

const quizOptionsLoad = () => {
    optionsElems.forEach((option, i) => {
        option.innerHTML = questions[indexOfQuestion].options[i]
    })
};

const quizLoad = () => {
    question.innerHTML = questions[indexOfQuestion].question;
    numberOfQuestion.innerHTML = indexOfPage + 1;
    numberOfAllQuestions.innerHTML = amountOfQuestions;
    quizOptionsLoad();
    indexOfPage++;
};

const quizOver = () => {
    quiz.classList.remove('active');
    quizResult.classList.add('active');
    let scorePercent = score / amountOfQuestions * 100;
    let randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber)
    if (scorePercent > 50) {
        quizResultTitle.innerHTML = quizState.result.good[randomNumber];
    } else {
        quizResultTitle.innerHTML = quizState.result.bad[randomNumber];
    }
    quizResultScore.innerHTML = score;
    numberOfAllQuestions2.innerHTML = amountOfQuestions;
}

const quizQuestionReset = () => {
    enableOptions();
    quizError.classList.remove('active');
}

const quizReset = () => {
    quizQuestionReset();
    completedQuestions = [];
    indexOfPage = 0;
    score = 0;
    btnNext.innerHTML = 'Перейти дальше';
    randomQuestion();
};

const quizCheck = () => {
    if (indexOfPage === amountOfQuestions) {
        quizOver();
    } else {
        randomQuestion();
    }
}

const quizValidate = () => {
    if (optionsElems[0].classList.contains('disabled')) {
        quizQuestionReset();
        quizCheck();
    } else {
        quizError.classList.add('active');
    }
}

btnNext.addEventListener('click', () => {
    quizValidate();
});

btnTryAgain.addEventListener('click', () => {
    quizResult.classList.remove('active');
    quiz.classList.add('active');
    quizReset();
})

document.addEventListener('DOMContentLoaded', () => {
    quizCheckAnswer();
    randomQuestion();
});