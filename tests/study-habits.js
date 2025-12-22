// Timer and submission logic for Study Habits Test

let timeLeft = 600; // 10 minutes
const timerDisplay = document.getElementById("time");
const form = document.getElementById("studyForm");

function calculateStudyScore() {
    let goodHabits = 0;
    let totalQuestions = 20;
    
    // Questions where "yes" is good: 3, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20
    const positiveQuestions = [3, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20];
    
    // Category-wise breakdown
    let categories = {
        learning: 0,      // Q3, Q5, Q14, Q18 (4 questions)
        memory: 0,        // Q4, Q16 (2 questions)
        examination: 0,   // Q1, Q10, Q15 (3 questions)
        concentration: 0  // Q2, Q6, Q11, Q12, Q13 (5 questions)
    };
    
    // Category mapping
    const categoryMap = {
        1: 'examination',
        2: 'concentration',
        3: 'learning',
        4: 'memory',
        5: 'learning',
        6: 'concentration',
        10: 'examination',
        11: 'concentration',
        12: 'concentration',
        13: 'concentration',
        14: 'learning',
        15: 'examination',
        16: 'memory',
        18: 'learning'
    };
    
    for (let i = 1; i <= totalQuestions; i++) {
        let answer = document.querySelector(`input[name="q${i}"]:checked`)?.value;
        let isCorrect = false;
        
        if (positiveQuestions.includes(i)) {
            isCorrect = (answer === "yes");
        } else {
            // Questions where "no" is good: 1, 2, 4, 6, 7, 17, 19
            isCorrect = (answer === "no");
        }
        
        if (isCorrect) {
            goodHabits++;
            // Add to category if mapped
            if (categoryMap[i]) {
                categories[categoryMap[i]]++;
            }
        }
    }
    
    let percentage = (goodHabits / totalQuestions) * 100;
    
    // Convert to ratings
    function getRating(score, max) {
        let percent = (score / max) * 100;
        if (percent >= 75) return "Excellent";
        if (percent >= 60) return "Very Good";
        if (percent >= 40) return "Good";
        if (percent >= 25) return "Average";
        return "Needs Improvement";
    }
    
    return {
        score: goodHabits,
        total: totalQuestions,
        percentage: percentage.toFixed(1),
        overallRating: getRating(goodHabits, totalQuestions),
        categories: {
            learning: getRating(categories.learning, 4),
            memory: getRating(categories.memory, 2),
            examination: getRating(categories.examination, 3),
            concentration: getRating(categories.concentration, 5)
        }
    };
}

function submitTest() {
    // Calculate and save score
    const result = calculateStudyScore();
    localStorage.setItem("studyHabitsScore", JSON.stringify(result));
    localStorage.setItem("studyCompleted", "true");
    
    window.location.href = "select-test.html";
}

// Form submission handler
form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitTest();
});

// Timer countdown
const timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time is up! Your test will be submitted automatically.");
        submitTest();
    }

    timeLeft--;
}, 1000);