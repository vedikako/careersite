// Question data: weight + category + correct answer
const questions = {
    q1: { correct: "30", weight: 1, category: "numerical" },
    q2: { correct: "180", weight: 2, category: "numerical" },
    q3: { correct: "40", weight: 2, category: "numerical" },
    q4: { correct: "25", weight: 1, category: "numerical" },
    q5: { correct: "37", weight: 3, category: "logical" },
    q6: { correct: "40", weight: 2, category: "numerical" },
    q7: { correct: "2", weight: 1, category: "logical" },
    q8: { correct: "79", weight: 3, category: "pattern" },
    q9: { correct: "Simple", weight: 2, category: "verbal" },
    q10:{ correct: "36", weight: 2, category: "numerical" }
};

function calculateScore() {
    let totalScore = 0;
    let categoryScores = { numerical: 0, logical: 0, pattern: 0, verbal: 0 };
        // 🔴 VALIDATION: check all questions answered
    for (let q in questions) {
        let userAnswer = document.querySelector(`input[name=${q}]:checked`);
        if (!userAnswer) {
            alert("Please answer all questions before submitting the test.");
            return; // stop submission
        }
    }

    for (let q in questions) {
        let userAnswer = document.querySelector(`input[name=${q}]:checked`);
        if (userAnswer && userAnswer.value === questions[q].correct) {
            totalScore += questions[q].weight;
            categoryScores[questions[q].category] += questions[q].weight;
        }
    }



    console.log("Saving total score:", totalScore); // debug

    // Save to localStorage
    localStorage.setItem("aptitude_total_score", totalScore);
    localStorage.setItem("aptitude_categories", JSON.stringify(categoryScores));

    // Show result inside page
    let resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>Your Weighted Score: ${totalScore}</h3>
        <p><b>Numerical:</b> ${categoryScores.numerical}</p>
        <p><b>Logical:</b> ${categoryScores.logical}</p>
        <p><b>Pattern:</b> ${categoryScores.pattern}</p>
        <p><b>Verbal:</b> ${categoryScores.verbal}</p>
        <button onclick="window.location.href='../results.html'">
            View Full Report
        </button>
    `;
}

