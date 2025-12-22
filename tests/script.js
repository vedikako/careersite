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
    let categoryMax = { numerical: 8, logical: 4, pattern: 3, verbal: 2 };
    
    // VALIDATION: check all questions answered
    for (let q in questions) {
        let userAnswer = document.querySelector(`input[name=${q}]:checked`);
        if (!userAnswer) {
            alert("Please answer all questions before submitting the test.");
            return; // stop submission
        }
    }

    // Calculate scores
    for (let q in questions) {
        let userAnswer = document.querySelector(`input[name=${q}]:checked`);
        if (userAnswer && userAnswer.value === questions[q].correct) {
            totalScore += questions[q].weight;
            categoryScores[questions[q].category] += questions[q].weight;
        }
    }

    // Convert scores to ratings
    function getCategoryRating(score, max) {
        let percent = (score / max) * 100;
        if (percent >= 75) return "Excellent";
        if (percent >= 50) return "Good";
        if (percent >= 25) return "Average";
        return "Needs Improvement";
    }

    function getOverallRating(total) {
        if (total >= 15) return "Excellent";
        if (total >= 10) return "Good";
        if (total >= 5) return "Average";
        return "Needs Improvement";
    }

    let ratings = {
        numerical: getCategoryRating(categoryScores.numerical, categoryMax.numerical),
        logical: getCategoryRating(categoryScores.logical, categoryMax.logical),
        pattern: getCategoryRating(categoryScores.pattern, categoryMax.pattern),
        verbal: getCategoryRating(categoryScores.verbal, categoryMax.verbal),
        overall: getOverallRating(totalScore)
    };

    console.log("Saving total score:", totalScore); // debug

    // Save to localStorage
    localStorage.setItem("aptitude_total_score", totalScore);
    localStorage.setItem("aptitude_categories", JSON.stringify(categoryScores));
    localStorage.setItem("aptitude_ratings", JSON.stringify(ratings));
    localStorage.setItem("aptitudeCompleted", "true");

    // Show result inside page
    let resultBox = document.getElementById("resultBox");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>Test Completed Successfully!</h3>
        <p style="color: #4A70A9; font-weight: 600;">Overall Performance: ${ratings.overall}</p>
        <p style="margin-top: 15px;">Your detailed report is ready. Click below to return to test selection.</p>
        <button onclick="window.location.href='select-test.html'" style="margin-top: 15px;">
            Back to Test Selection
        </button>
    `;
}