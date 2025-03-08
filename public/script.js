let questions = [];
let currentQuestionIndex = 0;

async function fetchQuestions() {
    try {
        const response = await fetch("http://localhost:8080/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        questions = await response.json();
        loadQuestion();
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("question").innerText = "Error loading questions";
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("question-container").innerHTML = "<p>Quiz Completed!</p>";
        document.getElementById("submit").style.display = "none";
        return;
    }

    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question_text;
    optionsContainer.innerHTML = "";

    for (let i = 1; i <= 4; i++) {
        const button = document.createElement("button");
        button.innerText = currentQuestion[`option${i}`];
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(i, currentQuestion.correct_option);
        optionsContainer.appendChild(button);
    }
}

function checkAnswer(selectedOption, correctOption) {
    const resultElement = document.getElementById("result");
    if (selectedOption === correctOption) {
        resultElement.innerText = "Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "Wrong!";
        resultElement.style.color = "red";
    }
    setTimeout(() => {
        resultElement.innerText = "";
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

document.getElementById("submit").addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
});

fetchQuestions();
