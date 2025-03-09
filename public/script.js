function loadQuestions() {
    fetch("/fetch-questions?quizName=Management")  // Use correct endpoint
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                showUnderConstruction();
                return;
            }
            questions = data;
            document.getElementById("total-questions").innerText = questions.length;
            updateStats();
            displayQuestion();
        })
        .catch(error => {
            document.getElementById("question").innerText = "Error loading questions";
        });
}
