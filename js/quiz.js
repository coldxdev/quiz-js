const questions = [{
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

/* Buttons */
const nextBtn = document.getElementById('next-btn'),
    startBtn = document.getElementById('start-btn'),
    tryAgainBtn = document.getElementById('try-again-btn');

/*  Numbers */
const numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions2');

const question = document.getElementById('question'),
    options = document.querySelectorAll('.quiz__option'),
    error = document.querySelector('.quiz__error'),
    modals = document.querySelectorAll('.modal');

let indexOfQuestion,
    indexOfPage = 0;

let score = 0,
    quizResultScore = document.getElementById('quiz-result-score');

const quizResult = document.querySelector('.quiz-result'),
    quiz = document.querySelector('.quiz');

startBtn.addEventListener('click', () => {
    randomQuestion();
    quiz.classList.add('active');
})


tryAgainBtn.addEventListener('click', () => {
    quizResult.classList.remove('active');
    quiz.classList.add('active');
    randomQuestion();
})
quizResult.addEventListener('click', e => {
    const targetClass = e.target.classList;

    if (targetClass.contains("modal__overlay") || targetClass.contains("modal__body") || targetClass.contains("modal__close")) {
        modals.forEach(modal => {
            modal.classList.remove('active');
        })

        quizReset();
    }
})

quiz.addEventListener('click', e => {
    const targetClass = e.target.classList;
    if (targetClass.contains("modal__overlay") || targetClass.contains("modal__body") || targetClass.contains("modal__close")) {
        quiz.classList.remove('active');
        quizReset();
    }
})

const loadNumbersOfQuestions = () => {
    numberOfQuestion.innerHTML = indexOfPage + 1;
    numberOfAllQuestions.innerHTML = questions.length;
}

const loadOptions = () => {
    options.forEach((option, i) => {
        option.innerHTML = questions[indexOfQuestion].options[i];
    })
}

const loadQuestion = () => {
    question.innerHTML = questions[indexOfQuestion].question;
}

const checkAnswer = () => {
    options.forEach(option => {
        option.addEventListener('click', () => {
            error.classList.remove('active')
            if (option.dataset.id == questions[indexOfQuestion].answer) {
                option.classList.add('correct');
                score++;
            }else {
                option.classList.add('wrong');
            }
            if(indexOfPage == questions.length){
                nextBtn.innerHTML = "Узнать результаты";
            }
            disabledOptions();
        })
    })
}

checkAnswer();

const disabledOptions = () => {
    options.forEach(option => {
        option.classList.add('disabled')
        if (option.dataset.id == questions[indexOfQuestion].answer) {
            option.classList.add('correct');
        }
    })
}

const resetOptions = () => {
    options.forEach(option => {
        option.classList.remove('disabled', 'correct', 'wrong');
    })
}

const reloadQuiz = () => {
    loadNumbersOfQuestions();
    loadQuestion();
    loadOptions();
}
const quizLoad = () => {
    loadNumbersOfQuestions();
    loadQuestion();
    loadOptions();
    indexOfPage++;
}

let completedQuestions = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let isDuplicate = false;
    completedQuestions.forEach(el => {
        if (el == randomNumber) {
            isDuplicate = true;
        }
    })

    if (isDuplicate) {
        randomQuestion();
    } else {
        indexOfQuestion = randomNumber;
        completedQuestions.push(indexOfQuestion);
        quizLoad();
    }

}

const quizReset = () => {
    resetOptions();
    error.classList.remove('active')
    nextBtn.innerHTML = "Перейти дальше";
    completedQuestions = [];
    score = 0;
    indexOfPage = 0;
    reloadQuiz();
}

const quizValidate = () => {
    if (!options[0].classList.contains('disabled')) {
        error.classList.add('active')
    } else if (indexOfPage == questions.length) {
        quizOver();
    } else if (indexOfPage == questions.length - 1) {
        error.classList.remove('active')
        randomQuestion()
        resetOptions();

    } else {
        error.classList.remove('active')
        randomQuestion()
        resetOptions();
    }
}


const quizOver = () => {
    quizResult.classList.add('active');
    quizResultScore.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
    quizReset();
}


nextBtn.addEventListener('click', () => {
    quizValidate();
})