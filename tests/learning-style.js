// Timer and submission logic for Learning Style Test

let timeLeft = 600; // 10 minutes
const timerDisplay = document.getElementById("time");
const form = document.getElementById("studyForm");

function calculateLearningStyle() {
    // Visual: Q2, Q5, Q8, Q10, Q13, Q16, Q19
    // Auditory: Q1, Q4, Q6, Q11, Q14, Q17, Q18
    // Kinesthetic: Q3, Q7, Q9, Q12, Q15, Q20
    
    let visual = 0, auditory = 0, kinesthetic = 0;
    
    const visualQ = [2, 5, 8, 10, 13, 16, 19];
    const auditoryQ = [1, 4, 6, 11, 14, 17, 18];
    const kinestheticQ = [3, 7, 9, 12, 15, 20];
    
    for (let i = 1; i <= 20; i++) {
        let answer = document.querySelector(`input[name="q${i}"]:checked`)?.value;
        
        if (answer === "yes") {
            if (visualQ.includes(i)) visual++;
            if (auditoryQ.includes(i)) auditory++;
            if (kinestheticQ.includes(i)) kinesthetic++;
        }
    }
    
    // Determine learning style profile
    let styles = [];
    let maxScore = Math.max(visual, auditory, kinesthetic);
    let threshold = maxScore - 2; // Include styles within 2 points of max
    
    if (visual >= threshold && visual >= 3) styles.push("Visual");
    if (auditory >= threshold && auditory >= 3) styles.push("Auditory");
    if (kinesthetic >= threshold && kinesthetic >= 3) styles.push("Kinesthetic");
    
    // If no dominant style, pick the highest
    if (styles.length === 0) {
        if (visual >= auditory && visual >= kinesthetic) styles.push("Visual");
        else if (auditory >= kinesthetic) styles.push("Auditory");
        else styles.push("Kinesthetic");
    }
    
    // Primary style is the one with highest score
    let primary = "Visual";
    if (auditory > visual && auditory >= kinesthetic) primary = "Auditory";
    else if (kinesthetic > visual && kinesthetic > auditory) primary = "Kinesthetic";
    
    return {
        visual: visual,
        auditory: auditory,
        kinesthetic: kinesthetic,
        primary: primary,
        styles: styles, // Array of all strong styles
        description: styles.join(", ")
    };
}

function submitTest() {
    // Calculate and save result
    const result = calculateLearningStyle();
    localStorage.setItem("learningStyleScore", JSON.stringify(result));
    localStorage.setItem("learningCompleted", "true");
    
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