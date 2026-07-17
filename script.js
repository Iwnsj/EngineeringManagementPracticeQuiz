let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initQuiz(questions) {
    // Clone and shuffle the questions
    currentQuestions = [...questions];
    shuffleArray(currentQuestions);
    
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    
    loadQuestion();
}

function loadQuestion() {
    const qLabel = document.getElementById('question-text');
    const input = document.getElementById('answer-input');
    const progress = document.getElementById('progress-text');
    const feedback = document.getElementById('feedback');
    const submitBtn = document.getElementById('btn-submit');
    const nextBtn = document.getElementById('btn-next');

    // Reset UI
    input.value = '';
    input.disabled = false;
    feedback.className = 'feedback';
    feedback.textContent = '';
    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    
    // Update progress
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Set question
    qLabel.textContent = currentQuestions[currentQuestionIndex].q;
    
    // Focus input
    input.focus();
}

function checkAnswer() {
    const input = document.getElementById('answer-input');
    const feedback = document.getElementById('feedback');
    const submitBtn = document.getElementById('btn-submit');
    const nextBtn = document.getElementById('btn-next');
    
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentQuestionIndex].a.trim().toLowerCase();
    
    if (userAnswer === '') {
        feedback.textContent = 'Please enter an answer.';
        feedback.className = 'feedback incorrect';
        return;
    }
    
    input.disabled = true;
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    nextBtn.focus();
    
    if (userAnswer === correctAnswer) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Incorrect. The correct answer is: ${currentQuestions[currentQuestionIndex].a}`;
        feedback.className = 'feedback incorrect';
    }
    
    document.getElementById('score-text').textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';
    
    document.getElementById('final-score').textContent = `${score} / ${currentQuestions.length}`;
    
    let percentage = (score / currentQuestions.length) * 100;
    let message = '';
    
    if (percentage >= 90) message = 'Excellent Work!';
    else if (percentage >= 75) message = 'Great Job!';
    else if (percentage >= 50) message = 'Good Effort!';
    else message = 'Keep Studying!';
    
    document.getElementById('result-message').textContent = message;
}

// Add event listener for enter key
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('answer-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const submitBtn = document.getElementById('btn-submit');
                const nextBtn = document.getElementById('btn-next');
                
                if (submitBtn.style.display !== 'none') {
                    checkAnswer();
                } else if (nextBtn.style.display !== 'none') {
                    nextQuestion();
                }
            }
        });
    }
});
