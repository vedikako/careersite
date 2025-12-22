// Get grade from URL
const params = new URLSearchParams(window.location.search);
const grade = params.get("grade");

document.getElementById("gradeInfo").innerText =
    grade ? `Selected Grade: ${grade}` : "";

// ============ STUDENT DETAILS MANAGEMENT ============
const studentName = localStorage.getItem("student_name");
const studentClass = localStorage.getItem("student_class");

const formDiv = document.getElementById("studentDetailsForm");
const buttonsDiv = document.getElementById("testButtons");

if (!studentName || !studentClass) {
    // Show form if details not saved
    formDiv.style.display = "block";
    buttonsDiv.style.display = "none";
} else {
    // Show test buttons if details already saved
    formDiv.style.display = "none";
    buttonsDiv.style.display = "block";
    
    // Update welcome message
    const displayNameElement = document.getElementById("displayName");
    if (displayNameElement) {
        displayNameElement.textContent = studentName;
    }
    
    // NOW check test completion status
    checkTestCompletion();
}

function saveStudentDetails() {
    const name = document.getElementById("studentNameInput").value.trim();
    const studentClass = document.getElementById("studentClassInput").value.trim();
    
    if (name === "" || studentClass === "") {
        alert("Please fill in all fields");
        return;
    }
    
    localStorage.setItem("student_name", name);
    localStorage.setItem("student_class", studentClass);
    
    formDiv.style.display = "none";
    buttonsDiv.style.display = "block";
    
    const displayNameElement = document.getElementById("displayName");
    if (displayNameElement) {
        displayNameElement.textContent = name;
    }
    
    // Check test completion after showing buttons
    checkTestCompletion();
}

// ============ CHECK TEST COMPLETION STATUS ============
function checkTestCompletion() {
    const studyDone = localStorage.getItem("studyCompleted") === "true";
    const learningDone = localStorage.getItem("learningCompleted") === "true";
    const aptitudeDone = localStorage.getItem("aptitudeCompleted") === "true";

    // Show tick marks for completed tests
    const studyTick = document.getElementById("studyTick");
    const studyBtn = document.getElementById("studyBtn");
    const learningTick = document.getElementById("learningTick");
    const learningBtn = document.getElementById("learningBtn");
    const aptitudeTick = document.getElementById("aptitudeTick");
    const aptitudeBtn = document.getElementById("aptitudeBtn");
    
    if (studyDone && studyTick && studyBtn) {
        studyTick.style.display = "inline";
        studyBtn.disabled = true;
    }

    if (learningDone && learningTick && learningBtn) {
        learningTick.style.display = "inline";
        learningBtn.disabled = true;
    }

    if (aptitudeDone && aptitudeTick && aptitudeBtn) {
        aptitudeTick.style.display = "inline";
        aptitudeBtn.disabled = true;
    }

    // ============ DOWNLOAD REPORT BUTTON LOGIC ============
    const downloadBtn = document.getElementById("downloadReport");
    const message = document.getElementById("downloadMsg");

    if (downloadBtn && message) {
        if (studyDone && learningDone && aptitudeDone) {
            downloadBtn.disabled = false;
            message.textContent = "✅ All tests completed. You can download your report.";
            message.style.color = "#2ecc71";
            
            downloadBtn.onclick = function() {
                window.location.href = "combined-report.html";
            };
        } else {
            downloadBtn.disabled = true;
            let pending = [];
            if (!studyDone) pending.push("Study Habits");
            if (!learningDone) pending.push("Learning Style");
            if (!aptitudeDone) pending.push("Aptitude");
            
            message.textContent = `⚠️ Please complete: ${pending.join(", ")}`;
            message.style.color = "#e74c3c";
        }
    }
}