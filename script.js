const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Markup Language"],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Cascading System Styles"],
        correct: 0
    },
    {
        question: "What is the purpose of JavaScript?",
        options: ["To style web pages", "To structure web pages", "To add interactivity to web pages", "To create databases"],
        correct: 2
    },
    {
        question: " Tag used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        correct: 0
    },
    {
        question: "Property for changing background color in CSS?",
        options: ["bgcolor", "background-color", "color", "background"],
        correct: 1
    },
    {
        question: "HTML attribute is used to define inline styles?",
        options: ["style", "class", "id", "inline"],
        correct: 0
    },
    {
        question: "Which HTML element for inserting a line break?",
        options: ["<break>", "<br>", "<lb>", "<line>"],
        correct: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correct: 0
    },
    {
        question: "'alt' attribute in an image tag used to?",
        options: ["Specifies the image source", "Provides alternative text for the image", "Sets the image width", "Defines the image height"],
        correct: 1
    },
    {
        question: "Which is a valid JavaScript variable name?",
        options: ["1stVariable", "_variable", "$variable", "variable-name"],
        correct: 1
    },
];

let currentQuestion = 0;
let userAnswers = [];
let quizCompleted = false;

function initializeQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    quizCompleted = false;
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    loadQuestion();
    updateProgress();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);

        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }

        optionsContainer.appendChild(optionDiv);
    });

    updateNavigationButtons();
}

function selectOption(optionIndex) {
    if (quizCompleted) return;

    userAnswers[currentQuestion] = optionIndex;

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateProgress();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function calculateScore() {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === null) {
            unansweredQuestions++;
        } else if (answer === questions[index].correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
    });

    // Scoring: +1 for correct, -1 for incorrect, 0 for unanswered
    const totalScore = correctAnswers - incorrectAnswers;

    return {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        unanswered: unansweredQuestions,
        totalScore: totalScore
    };
}

function submitQuiz() {
    quizCompleted = true;
    const results = calculateScore();

    // Show results
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Display score
    document.getElementById('final-score').textContent = `${results.totalScore} / ${questions.length}`;

    // Display breakdown
    const breakdown = document.getElementById('score-breakdown');
    breakdown.innerHTML = `
                <div class="breakdown-item">
                    <span class="correct">✓ Correct Answers:</span>
                    <span class="correct">${results.correct} (+${results.correct})</span>
                </div>
                <div class="breakdown-item">
                    <span class="incorrect">✗ Incorrect Answers:</span>
                    <span class="incorrect">${results.incorrect} (-${results.incorrect})</span>
                </div>
                <div class="breakdown-item">
                    <span class="unanswered">○ Unanswered:</span>
                    <span class="unanswered">${results.unanswered} (0)</span>
                </div>
                <div class="breakdown-item">
                    <span>Total Score:</span>
                    <span><strong>${results.totalScore}</strong></span>
                </div>
            `;
}

function restartQuiz() {
    initializeQuiz();
}

// Initialize the quiz when the page loads
window.onload = function () {
    initializeQuiz();
};