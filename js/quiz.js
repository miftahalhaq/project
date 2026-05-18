// 1. Interactive Quiz Dataset (English Version)
const quizData = [
    {
        question: "Which type of compass is specifically designed to be attached to the thumb for rapid navigation while running?",
        options: ["Baseplate Compass", "Thumb Compass", "Prismatic Compass", "Digital GPS Compass"],
        correctIndex: 1
    },
    {
        question: "On an international standard IOF orienteering map, what does the color WHITE represent?",
        options: ["Open runnable forest", "Open fields or meadows", "Impending water hazards", "Out-of-bounds private property"],
        correctIndex: 0
    },
    {
        question: "What is the primary function of an SI-Card (SportIdent) electronic chip during a competition?",
        options: ["To measure elevation changes", "To track heart rate data", "To record time stamps at control markers instantly", "To locate lost competitors via satellite"],
        correctIndex: 2
    },
    {
        question: "What geometric shape and color configuration represents a physical control marker flag in the terrain?",
        options: ["Square flag with blue and yellow accents", "Triangular prism flag with orange and white colors", "Circular target with neon green styling", "Rectangular banner with red cross marks"],
        correctIndex: 1
    }
];

// 2. Core State Parameters
let currentQuestionIndex = 0;
let totalUserScore = 0;
const pointsPerQuestion = 25; // Reaches 100 max point calculation with 4 questions

// 3. Target DOM Container Binding
const quizBox = document.getElementById("quiz-box");

/**
 * Renders the active question card dynamically into the UI
 */
function renderQuestion() {
    if (!quizBox) return;

    // Check if the user has completed all questions
    if (currentQuestionIndex >= quizData.length) {
        renderQuizResult();
        return;
    }

    const activeData = quizData[currentQuestionIndex];
    
    // Inject structural question framework dynamically
    quizBox.innerHTML = `
        <div class="quiz-card animate-fade">
            <h3>Question ${currentQuestionIndex + 1} of ${quizData.length}</h3>
            <p class="question-text">${activeData.question}</p>
            <div class="options-container">
                ${activeData.options.map((optionText, idx) => `
                    <button class="btn-option" onclick="evaluateSelection(${idx})">${optionText}</button>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Handles answer execution mechanics, visual coloring alerts, and delays transitions
 * @param {number} chosenIdx - The array placement position index clicked by user
 */
window.evaluateSelection = function(chosenIdx) {
    const correctIdx = quizData[currentQuestionIndex].correctIndex;
    const optionButtons = document.querySelectorAll(".btn-option");

    // Disable all options immediately to prevent spam click inputs
    optionButtons.forEach(button => button.disabled = true);

    // Apply strict condition check for answer validation matching rubrics color theory
    if (chosenIdx === correctIdx) {
        optionButtons[chosenIdx].style.backgroundColor = "var(--primary-color)"; // Forest Green
        optionButtons[chosenIdx].style.borderColor = "var(--primary-color)";
        optionButtons[chosenIdx].style.color = "white";
        totalUserScore += pointsPerQuestion;
    } else {
        optionButtons[chosenIdx].style.backgroundColor = "#D9534F"; // Ruby Red feedback
        optionButtons[chosenIdx].style.borderColor = "#D9534F";
        optionButtons[chosenIdx].style.color = "white";
        
        // Expose correct layout choice directly for educational purposes
        optionButtons[correctIdx].style.backgroundColor = "var(--primary-color)";
        optionButtons[correctIdx].style.borderColor = "var(--primary-color)";
        optionButtons[correctIdx].style.color = "white";
    }

    // Delay step action transition for 1.5 seconds so users can process feedback
    setTimeout(() => {
        currentQuestionIndex++;
        renderQuestion();
    }, 1500);
};

/**
 * Generates dynamic assessment scores and handles conditional passing message rules
 */
function renderQuizResult() {
    const maxScore = quizData.length * pointsPerQuestion;
    const passThresholdScore = maxScore * 0.75; // 75% Passing condition rule
    
    let outcomeMessage = totalUserScore >= passThresholdScore 
        ? "Excellent job! You passed the theoretical equipment assessment. 🎉" 
        : "Score threshold not met. Review the equipment library and try again! 📚";

    quizBox.innerHTML = `
        <div class="quiz-result animate-fade">
            <h2>Evaluation Complete!</h2>
            <p class="score-display">Your Performance Score: <strong>${totalUserScore}</strong> / ${maxScore}</p>
            <p style="margin-bottom: 2rem;">${outcomeMessage}</p>
            <button class="btn btn-primary" onclick="resetQuizSequence()">Restart Assessment</button>
        </div>
    `;
}

/**
 * Resets processing data models back to zero points sequence safely
 */
window.resetQuizSequence = function() {
    currentQuestionIndex = 0;
    totalUserScore = 0;
    renderQuestion();
};

// Auto-boot sequence launch on layout discovery initialization
renderQuestion();