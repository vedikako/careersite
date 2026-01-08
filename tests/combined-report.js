// // Load student info
// const studentName = localStorage.getItem("student_name") || "N/A";
// const studentClass = localStorage.getItem("student_class") || "N/A";
// const reportDate = new Date().toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
// });

// // Update all student info fields
// document.getElementById("studentName").textContent = studentName;
// document.getElementById("studentClass").textContent = studentClass;
// document.getElementById("reportDate").textContent = reportDate;
// document.getElementById("coverName").textContent = studentName;
// document.getElementById("coverClass").textContent = studentClass;
// document.getElementById("coverDate").textContent = reportDate;

// // ============ HELPER FUNCTIONS ============

// function getRatingClass(rating) {
//     const ratingLower = rating.toLowerCase().replace(/\s+/g, '-');
//     return `rating-${ratingLower}`;
// }

// function createRatingItem(label, rating) {
//     return `
//         <div class="rating-item">
//             <div class="label">${label}</div>
//             <span class="value ${getRatingClass(rating)}">${rating}</span>
//         </div>
//     `;
// }

// function ratingToNumber(rating) {
//     const map = {
//         "Excellent": 5,
//         "Very Good": 4,
//         "Good": 3,
//         "Average": 2,
//         "Needs Improvement": 1
//     };
//     return map[rating] || 0;
// }

// function getRatingColor(rating) {
//     const colors = {
//         "Excellent": "#28a745",
//         "Very Good": "#17a2b8",
//         "Good": "#007bff",
//         "Average": "#ffc107",
//         "Needs Improvement": "#dc3545"
//     };
//     return colors[rating] || "#6c757d";
// }

// // ============ INTEREST VS APTITUDE ANALYSIS ============
// const interests = JSON.parse(localStorage.getItem("student_interests"));
// const aptitudeLevels = JSON.parse(localStorage.getItem("aptitude_levels"));

// if (interests && aptitudeLevels) {
//     let comparisonHTML = `
//         <div class="subsection-title">Career Stream Recommendation Analysis</div>
//         <p style="margin-bottom: 20px; line-height: 1.7;">
//             This analysis compares your self-reported interest levels with your demonstrated aptitude across four major academic streams. 
//             The best career path typically aligns where both interest and aptitude are strong.
//         </p>
        
//         <div class="chart-container">
//             <canvas id="interestAptitudeChart"></canvas>
//         </div>
        
//         ${getCareerRecommendations(interests, aptitudeLevels)}
//     `;
    
//     document.getElementById("interestAptitudeContent").innerHTML = comparisonHTML;
//     setTimeout(() => createInterestAptitudeChart(interests, aptitudeLevels), 100);
// }

// // ============ STUDY HABITS ============
// const studyData = JSON.parse(localStorage.getItem("studyHabitsScore"));

// if (studyData) {
//     let studyHTML = `
//         <div class="subsection-title">Performance Overview</div>
//         <div class="rating-grid">
//             ${studyData.categories ? `
//                 ${createRatingItem("Learning Techniques", studyData.categories.learning)}
//                 ${createRatingItem("Memory Retention", studyData.categories.memory)}
//                 ${createRatingItem("Examination Techniques", studyData.categories.examination)}
//                 ${createRatingItem("Concentration Ability", studyData.categories.concentration)}
//             ` : ''}
//         </div>
        
//         <div class="chart-container">
//             <canvas id="studyChart"></canvas>
//         </div>
        
//         ${getStudyHabitsAnalysis(studyData)}
//     `;
    
//     document.getElementById("studyHabitsContent").innerHTML = studyHTML;
    
//     if (studyData.categories) {
//         setTimeout(() => createStudyHabitsChart(studyData), 100);
//     }
// }

// // ============ LEARNING STYLE ============
// const learningData = JSON.parse(localStorage.getItem("learningStyleScore"));

// if (learningData) {
//     let learningHTML = `
//         <div class="subsection-title">Your Learning Profile</div>
//         <div class="analysis-box">
//             <p style="font-size: 14px; line-height: 1.7;">
//                 <strong>Primary Learning Style:</strong> ${learningData.description}<br><br>
//                 You learn best through <strong>${learningData.primary.toLowerCase()}</strong> methods. 
//                 ${learningData.styles.length > 1 ? 
//                     `You also show strong preferences for ${learningData.styles.filter(s => s !== learningData.primary).join(' and ').toLowerCase()} learning.` 
//                     : ''}
//             </p>
//         </div>
        
//         <div class="chart-container">
//             <canvas id="learningChart"></canvas>
//         </div>
        
//         ${getLearningStyleAnalysis(learningData)}
//     `;
    
//     document.getElementById("learningStyleContent").innerHTML = learningHTML;
//     setTimeout(() => createLearningStyleChart(learningData), 100);
// }

// // ============ CHART CREATION FUNCTIONS ============

// function createInterestAptitudeChart(interests, aptitude) {
//     const ctx = document.getElementById("interestAptitudeChart");
//     if (!ctx) return;
    
//     const labels = ['Commerce', 'Humanities', 'Science (Maths)', 'Science (Bio)'];
    
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Aptitude Level',
//                     data: [aptitude.commerce, aptitude.humanities, aptitude.maths, aptitude.bio],
//                     backgroundColor: '#674595ff',
//                     borderColor: '#674595ff',
//                     borderWidth: 1
//                 },
//                 {
//                     label: 'Interest Level',
//                     data: [interests.commerce, interests.humanities, interests.maths, interests.bio],
//                     backgroundColor: '#479eb6ff',
//                     borderColor: '#479eb6ff',
//                     borderWidth: 1
//                 }
//             ]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             plugins: {
//                 legend: { 
//                     display: true,
//                     position: 'top'
//                 },
//                 title: {
//                     display: true,
//                     text: 'Interest vs Aptitude Comparison Across Streams',
//                     font: { size: 14, weight: 'bold' }
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 3,
//                     ticks: {
//                         stepSize: 1,
//                         font: { size: 11 },
//                         callback: function(value) {
//                             const labels = { 3: "High", 2: "Medium", 1: "Low", 0: "" };
//                             return labels[value] || "";
//                         }
//                     },
//                     grid: { color: 'rgba(0, 0, 0, 0.1)' }
//                 },
//                 x: {
//                     ticks: { font: { size: 11 } },
//                     grid: { display: false }
//                 }
//             }
//         }
//     });
// }

// function createStudyHabitsChart(data) {
//     const ctx = document.getElementById("studyChart");
//     if (!ctx) return;
    
//     const labels = [["Learning", "Techniques"], ["Memory"], ["Examination", "Techniques"], ["Concentration"]];
//     const ratings = [
//         data.categories.learning,
//         data.categories.memory,
//         data.categories.examination,
//         data.categories.concentration
//     ];
    
//     const numericValues = ratings.map(ratingToNumber);
//     const colors = ratings.map(getRatingColor);
    
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Performance Level',
//                 data: numericValues,
//                 backgroundColor: colors,
//                 borderColor: colors,
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             plugins: {
//                 legend: { display: false },
//                 title: {
//                     display: true,
//                     text: 'Study Habits Performance Breakdown',
//                     font: { size: 13, weight: 'bold' }
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             return ratings[context.dataIndex];
//                         }
//                     }
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 5,
//                     ticks: {
//                         stepSize: 1,
//                         font: { size: 11 },
//                         callback: function(value) {
//                             const labels = {
//                                 5: "Excellent",
//                                 4: "Very Good",
//                                 3: "Good",
//                                 2: "Average",
//                                 1: "Needs Improvement",
//                                 0: ""
//                             };
//                             return labels[value] || "";
//                         }
//                     },
//                     grid: { color: 'rgba(0, 0, 0, 0.1)' }
//                 },
//                 x: {
//                     ticks: { font: { size: 11 } },
//                     grid: { display: false }
//                 }
//             }
//         }
//     });
// }

// function createLearningStyleChart(data) {
//     const ctx = document.getElementById("learningChart");
//     if (!ctx) return;
    
//     const visualPercent = ((data.visual / 7) * 100).toFixed(0);
//     const auditoryPercent = ((data.auditory / 7) * 100).toFixed(0);
//     const kinestheticPercent = ((data.kinesthetic / 6) * 100).toFixed(0);
    
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: ['Visual', 'Auditory', 'Kinesthetic'],
//             datasets: [{
//                 label: 'Preference Level (%)',
//                 data: [visualPercent, auditoryPercent, kinestheticPercent],
//                 backgroundColor: ['#1e3c72', '#2a5298', '#4a90e2'],
//                 borderColor: ['#152a52', '#1e3c72', '#2a5298'],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: true,
//             plugins: {
//                 legend: { display: false },
//                 title: {
//                     display: true,
//                     text: 'Learning Style Distribution',
//                     font: { size: 13, weight: 'bold' }
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             return context.parsed.y + '%';
//                         }
//                     }
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 100,
//                     ticks: {
//                         font: { size: 11 },
//                         callback: function(value) {
//                             return value + '%';
//                         }
//                     },
//                     grid: { color: 'rgba(0, 0, 0, 0.1)' }
//                 },
//                 x: {
//                     ticks: { font: { size: 11 } },
//                     grid: { display: false }
//                 }
//             }
//         }
//     });
// }

// // ============ ANALYSIS FUNCTIONS ============

// function getCareerRecommendations(interests, aptitude) {
//     let recommendations = [];
//     let warnings = [];
    
//     const streamNames = {
//         maths: "Science Stream (Mathematics)",
//         bio: "Science Stream (Biology/Medical)",
//         humanities: "Humanities Stream",
//         commerce: "Commerce Stream"
//     };
    
//     // Analyze each stream
//     for (let stream in interests) {
//         const interestLevel = interests[stream];
//         const aptitudeLevel = aptitude[stream];
        
//         // Best fit: High interest + High aptitude
//         if (interestLevel === 3 && aptitudeLevel === 3) {
//             recommendations.push({
//                 stream: streamNames[stream],
//                 type: "Excellent Match",
//                 message: "Your high interest and strong aptitude make this an ideal career path for you."
//             });
//         }
//         // Good fit: Interest and aptitude both medium or high
//         else if (interestLevel >= 2 && aptitudeLevel >= 2) {
//             recommendations.push({
//                 stream: streamNames[stream],
//                 type: "Good Match",
//                 message: "You show both interest and capability in this area, making it a viable option."
//             });
//         }
//         // Warning: High interest but low aptitude
//         else if (interestLevel === 3 && aptitudeLevel === 1) {
//             warnings.push({
//                 stream: streamNames[stream],
//                 type: "Interest-Aptitude Gap",
//                 message: "While you're interested in this field, consider additional preparation to strengthen your foundational skills."
//             });
//         }
//         // Hidden potential: Low interest but high aptitude
//         else if (interestLevel === 1 && aptitudeLevel === 3) {
//             recommendations.push({
//                 stream: streamNames[stream],
//                 type: "Hidden Potential",
//                 message: "You have natural aptitude here. With more exposure, you might develop stronger interest in this field."
//             });
//         }
//     }
    
//     let html = '';
    
//     if (recommendations.length > 0) {
//         html += '<div class="analysis-box"><h4>✅ Recommended Career Streams</h4><ul>';
//         recommendations.forEach(rec => {
//             html += `<li><strong>${rec.stream} (${rec.type}):</strong> ${rec.message}</li>`;
//         });
//         html += '</ul></div>';
//     }
    
//     if (warnings.length > 0) {
//         html += '<div class="analysis-box" style="border-left-color: #ff9800;"><h4>⚠️ Areas Requiring Attention</h4><ul>';
//         warnings.forEach(warn => {
//             html += `<li><strong>${warn.stream} (${warn.type}):</strong> ${warn.message}</li>`;
//         });
//         html += '</ul></div>';
//     }
    
//     return html;
// }

// function getStudyHabitsAnalysis(data) {
//     let strengths = [];
//     let improvements = [];
    
//     const categories = {
//         'Learning Techniques': data.categories.learning,
//         'Memory': data.categories.memory,
//         'Examination Techniques': data.categories.examination,
//         'Concentration': data.categories.concentration
//     };
    
//     for (let [area, rating] of Object.entries(categories)) {
//         if (rating === "Excellent" || rating === "Very Good") {
//             strengths.push(area);
//         } else if (rating === "Average" || rating === "Needs Improvement") {
//             improvements.push({area, rating});
//         }
//     }
    
//     let html = '';
    
//     if (strengths.length > 0) {
//         html += `<div class="analysis-box"><h4>Strengths Identified</h4><ul>`;
//         strengths.forEach(area => {
//             if (area === "Learning Techniques") {
//                 html += `<li><strong>${area}:</strong> Demonstrates excellent methods for absorbing and processing information.</li>`;
//             } else if (area === "Memory") {
//                 html += `<li><strong>${area}:</strong> Shows strong memory retention capabilities.</li>`;
//             } else if (area === "Examination Techniques") {
//                 html += `<li><strong>${area}:</strong> Performs effectively under examination conditions.</li>`;
//             } else if (area === "Concentration") {
//                 html += `<li><strong>${area}:</strong> Exhibits strong ability to maintain focus during study sessions.</li>`;
//             }
//         });
//         html += `</ul></div>`;
//     }
    
//     if (improvements.length > 0) {
//         html += `<div class="analysis-box" style="border-left-color: #ff9800;"><h4>Areas Requiring Development</h4><ul>`;
//         improvements.forEach(item => {
//             if (item.area === "Learning Techniques") {
//                 html += `<li><strong>${item.area} (${item.rating}):</strong> Recommended to establish structured study schedules and experiment with various learning methods.</li>`;
//             } else if (item.area === "Memory") {
//                 html += `<li><strong>${item.area} (${item.rating}):</strong> Suggested to implement memory enhancement techniques such as mnemonics and regular review sessions.</li>`;
//             } else if (item.area === "Examination Techniques") {
//                 html += `<li><strong>${item.area} (${item.rating}):</strong> Advised to practice with timed mock examinations and develop systematic approach to answering questions.</li>`;
//             } else if (item.area === "Concentration") {
//                 html += `<li><strong>${item.area} (${item.rating}):</strong> Recommended to create distraction-free study environment and practice focus-building exercises.</li>`;
//             }
//         });
//         html += `</ul></div>`;
//     }
    
//     return html;
// }

// function getLearningStyleAnalysis(data) {
//     let html = '<div class="analysis-box"><h4>Learning Style Strengths</h4><ul>';
    
//     data.styles.forEach(style => {
//         if (style === "Visual") {
//             html += `<li><strong>Visual Learning:</strong> Excels at learning through diagrams, charts, and visual representations.</li>`;
//         } else if (style === "Auditory") {
//             html += `<li><strong>Auditory Learning:</strong> Demonstrates strong learning effectiveness through listening and verbal discussion.</li>`;
//         } else if (style === "Kinesthetic") {
//             html += `<li><strong>Kinesthetic Learning:</strong> Shows preference for hands-on experience and physical engagement in learning.</li>`;
//         }
//     });
    
//     html += `</ul></div><div class="analysis-box" style="border-left-color: #ff9800;"><h4>Recommended Study Strategies</h4><ul>`;
    
//     data.styles.forEach(style => {
//         if (style === "Visual") {
//             html += `<li><strong>For Visual Learning:</strong> Utilize mind maps, flowcharts, and color-coded notes. Incorporate educational videos for complex topics.</li>`;
//         }
//         if (style === "Auditory") {
//             html += `<li><strong>For Auditory Learning:</strong> Engage in group discussions, record and review verbal explanations, and read important notes aloud.</li>`;
//         }
//         if (style === "Kinesthetic") {
//             html += `<li><strong>For Kinesthetic Learning:</strong> Incorporate hands-on activities, physical models, and practical applications of concepts.</li>`;
//         }
//     });
    
//     html += `</ul></div>`;
//     return html;
// }

// // ============ OVERALL RECOMMENDATIONS ============
// document.getElementById("overallRecommendations").innerHTML = generateOverallRecommendations(studyData, learningData, interests, aptitudeLevels);

// function generateOverallRecommendations(studyData, learningData, interests, aptitude) {
//     let recs = "<ul style='line-height: 1.7;'>";
    
//     // Career-specific recommendations based on interest-aptitude match
//     if (interests && aptitude) {
//         for (let stream in interests) {
//             if (interests[stream] === 3 && aptitude[stream] === 3) {
//                 const streamNames = {
//                     maths: "Mathematics and Engineering",
//                     bio: "Biology and Medical Sciences",
//                     humanities: "Humanities and Social Sciences",
//                     commerce: "Commerce and Business"
//                 };
//                 recs += `<li>Your strong performance in ${streamNames[stream]} suggests this could be your primary career direction. Explore related career options and seek mentorship in this field.</li>`;
//             }
//         }
//     }
    
//     if (studyData && (studyData.overallRating === "Average" || studyData.overallRating === "Needs Improvement")) {
//         recs += "<li>Develop a structured daily study routine. Consistency in study habits is more important than long study hours.</li>";
//     }
    
//     if (learningData) {
//         recs += `<li>Your ${learningData.primary.toLowerCase()} learning style is your natural strength. Adapt study methods accordingly to maximize learning efficiency.</li>`;
//     }
    
//     recs += `
//         <li>Maintain a balanced lifestyle with 8 hours of sleep, regular physical activity, and nutritious meals to improve learning capacity.</li>
//         <li>Practice active recall by explaining concepts in your own words after studying, rather than passive reading.</li>
//         <li>Use spaced repetition: Review new information after 1 day, then 3 days, then 7 days for better long-term retention.</li>
//         <li>Seek guidance from teachers and career counselors to explore specific career paths that align with your strengths.</li>
//         <li>Participate in extracurricular activities related to your areas of strength to develop practical skills and confirm your interests.</li>
//     `;
    
//     recs += "</ul>";
    
//     return recs;
// }

// Load student info
const studentName = localStorage.getItem("student_name") || "N/A";
const studentClass = localStorage.getItem("student_class") || "N/A";
const reportDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// Update all student info fields
document.getElementById("studentName").textContent = studentName;
document.getElementById("studentClass").textContent = studentClass;
document.getElementById("reportDate").textContent = reportDate;
document.getElementById("coverName").textContent = studentName;
document.getElementById("coverClass").textContent = studentClass;
document.getElementById("coverDate").textContent = reportDate;

// ============ HELPER FUNCTIONS ============

function getRatingClass(rating) {
    const ratingLower = rating.toLowerCase().replace(/\s+/g, '-');
    return `rating-${ratingLower}`;
}

function createRatingItem(label, rating) {
    return `
        <div class="rating-item">
            <div class="label">${label}</div>
            <span class="value ${getRatingClass(rating)}">${rating}</span>
        </div>
    `;
}

function ratingToNumber(rating) {
    const map = {
        "Excellent": 5,
        "Very Good": 4,
        "Good": 3,
        "Average": 2,
        "Needs Improvement": 1
    };
    return map[rating] || 0;
}

function getRatingColor(rating) {
    const colors = {
        "Excellent": "#28a745",
        "Very Good": "#17a2b8",
        "Good": "#007bff",
        "Average": "#ffc107",
        "Needs Improvement": "#dc3545"
    };
    return colors[rating] || "#6c757d";
}

// ============ INTEREST VS APTITUDE ANALYSIS ============
const interests = JSON.parse(localStorage.getItem("student_interests"));
const aptitudeLevels = JSON.parse(localStorage.getItem("aptitude_levels"));
const categoryRatings = JSON.parse(localStorage.getItem("aptitude_category_ratings"));

if (interests && aptitudeLevels) {
    let comparisonHTML = `
        <div class="subsection-title">Career Stream Recommendation Analysis</div>
        <p style="margin-bottom: 20px; line-height: 1.7;">
            This analysis compares your self-reported interest levels with your demonstrated aptitude across four major academic streams. 
            The best career path typically aligns where both interest and aptitude are strong.
        </p>
        
        <div class="chart-container">
            <canvas id="interestAptitudeChart"></canvas>
        </div>
        
        ${getCareerRecommendations(interests, aptitudeLevels)}
        
        <div class="subsection-title" style="margin-top: 30px;">Aptitude Skills Analysis</div>
        <p style="margin-bottom: 15px; line-height: 1.7;">
            This shows your performance in core aptitude categories: Numerical reasoning, Logical thinking, Pattern recognition, and Verbal skills.
        </p>
        
        <div class="rating-grid">
            ${categoryRatings ? `
                ${createRatingItem("Numerical Reasoning", categoryRatings.numerical)}
                ${createRatingItem("Logical Thinking", categoryRatings.logical)}
                ${createRatingItem("Pattern Recognition", categoryRatings.pattern)}
                ${createRatingItem("Verbal Skills", categoryRatings.verbal)}
            ` : '<p>Aptitude category data not available</p>'}
        </div>
        
        <div class="chart-container">
            <canvas id="aptitudeCategoryChart"></canvas>
        </div>
    `;
    
    document.getElementById("interestAptitudeContent").innerHTML = comparisonHTML;
    setTimeout(() => {
        createInterestAptitudeChart(interests, aptitudeLevels);
        if (categoryRatings) {
            createAptitudeCategoryChart(categoryRatings);
        }
    }, 100);
}

// ============ STUDY HABITS ============
const studyData = JSON.parse(localStorage.getItem("studyHabitsScore"));

if (studyData) {
    let studyHTML = `
        <div class="subsection-title">Performance Overview</div>
        <div class="rating-grid">
            ${studyData.categories ? `
                ${createRatingItem("Learning Techniques", studyData.categories.learning)}
                ${createRatingItem("Memory Retention", studyData.categories.memory)}
                ${createRatingItem("Examination Techniques", studyData.categories.examination)}
                ${createRatingItem("Concentration Ability", studyData.categories.concentration)}
            ` : ''}
        </div>
        
        <div class="chart-container">
            <canvas id="studyChart"></canvas>
        </div>
        
        ${getStudyHabitsAnalysis(studyData)}
    `;
    
    document.getElementById("studyHabitsContent").innerHTML = studyHTML;
    
    if (studyData.categories) {
        setTimeout(() => createStudyHabitsChart(studyData), 100);
    }
}

// ============ LEARNING STYLE ============
const learningData = JSON.parse(localStorage.getItem("learningStyleScore"));

if (learningData) {
    let learningHTML = `
        <div class="subsection-title">Your Learning Profile</div>
        <div class="analysis-box">
            <p style="font-size: 14px; line-height: 1.7;">
                <strong>Primary Learning Style:</strong> ${learningData.description}<br><br>
                You learn best through <strong>${learningData.primary.toLowerCase()}</strong> methods. 
                ${learningData.styles.length > 1 ? 
                    `You also show strong preferences for ${learningData.styles.filter(s => s !== learningData.primary).join(' and ').toLowerCase()} learning.` 
                    : ''}
            </p>
        </div>
        
        <div class="chart-container">
            <canvas id="learningChart"></canvas>
        </div>
        
        ${getLearningStyleAnalysis(learningData)}
    `;
    
    document.getElementById("learningStyleContent").innerHTML = learningHTML;
    setTimeout(() => createLearningStyleChart(learningData), 100);
}

// ============ CHART CREATION FUNCTIONS ============

function createInterestAptitudeChart(interests, aptitude) {
    const ctx = document.getElementById("interestAptitudeChart");
    if (!ctx) return;
    
    const labels = ['Commerce', 'Humanities', 'Science (Maths)', 'Science (Bio)'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Aptitude Level',
                    data: [aptitude.commerce, aptitude.humanities, aptitude.maths, aptitude.bio],
                    backgroundColor: '#674595ff',
                    borderColor: '#674595ff',
                    borderWidth: 1
                },
                {
                    label: 'Interest Level',
                    data: [interests.commerce, interests.humanities, interests.maths, interests.bio],
                    backgroundColor: '#479eb6ff',
                    borderColor: '#479eb6ff',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { 
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Interest vs Aptitude Comparison Across Streams',
                    font: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 3,
                    ticks: {
                        stepSize: 1,
                        font: { size: 11 },
                        callback: function(value) {
                            const labels = { 3: "High", 2: "Medium", 1: "Low", 0: "" };
                            return labels[value] || "";
                        }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function createAptitudeCategoryChart(ratings) {
    const ctx = document.getElementById("aptitudeCategoryChart");
    if (!ctx) return;
    
    const categories = ['Numerical', 'Logical', 'Pattern', 'Verbal'];
    const ratingValues = [
        ratings.numerical,
        ratings.logical,
        ratings.pattern,
        ratings.verbal
    ];
    
    const numericValues = ratingValues.map(ratingToNumber);
    const colors = ratingValues.map(getRatingColor);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Aptitude Performance',
                data: numericValues,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Aptitude Skills Breakdown',
                    font: { size: 13, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ratingValues[context.dataIndex];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: { size: 11 },
                        callback: function(value) {
                            const labels = {
                                5: "Excellent",
                                4: "Very Good",
                                3: "Good",
                                2: "Average",
                                1: "Needs Improvement",
                                0: ""
                            };
                            return labels[value] || "";
                        }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function createStudyHabitsChart(data) {
    const ctx = document.getElementById("studyChart");
    if (!ctx) return;
    
    const labels = [["Learning", "Techniques"], ["Memory"], ["Examination", "Techniques"], ["Concentration"]];
    const ratings = [
        data.categories.learning,
        data.categories.memory,
        data.categories.examination,
        data.categories.concentration
    ];
    
    const numericValues = ratings.map(ratingToNumber);
    const colors = ratings.map(getRatingColor);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance Level',
                data: numericValues,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Study Habits Performance Breakdown',
                    font: { size: 13, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ratings[context.dataIndex];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: { size: 11 },
                        callback: function(value) {
                            const labels = {
                                5: "Excellent",
                                4: "Very Good",
                                3: "Good",
                                2: "Average",
                                1: "Needs Improvement",
                                0: ""
                            };
                            return labels[value] || "";
                        }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function createLearningStyleChart(data) {
    const ctx = document.getElementById("learningChart");
    if (!ctx) return;
    
    const visualPercent = ((data.visual / 7) * 100).toFixed(0);
    const auditoryPercent = ((data.auditory / 7) * 100).toFixed(0);
    const kinestheticPercent = ((data.kinesthetic / 6) * 100).toFixed(0);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Visual', 'Auditory', 'Kinesthetic'],
            datasets: [{
                label: 'Preference Level (%)',
                data: [visualPercent, auditoryPercent, kinestheticPercent],
                backgroundColor: ['#1e3c72', '#2a5298', '#4a90e2'],
                borderColor: ['#152a52', '#1e3c72', '#2a5298'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Learning Style Distribution',
                    font: { size: 13, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

// ============ ANALYSIS FUNCTIONS ============

function getCareerRecommendations(interests, aptitude) {
    let recommendations = [];
    let warnings = [];
    
    const streamNames = {
        maths: "Science Stream (Mathematics)",
        bio: "Science Stream (Biology/Medical)",
        humanities: "Humanities Stream",
        commerce: "Commerce Stream"
    };
    
    for (let stream in interests) {
        const interestLevel = interests[stream];
        const aptitudeLevel = aptitude[stream];
        
        if (interestLevel === 3 && aptitudeLevel === 3) {
            recommendations.push({
                stream: streamNames[stream],
                type: "Excellent Match",
                message: "Your high interest and strong aptitude make this an ideal career path for you."
            });
        }
        else if (interestLevel >= 2 && aptitudeLevel >= 2) {
            recommendations.push({
                stream: streamNames[stream],
                type: "Good Match",
                message: "You show both interest and capability in this area, making it a viable option."
            });
        }
        else if (interestLevel === 3 && aptitudeLevel === 1) {
            warnings.push({
                stream: streamNames[stream],
                type: "Interest-Aptitude Gap",
                message: "While you're interested in this field, consider additional preparation to strengthen your foundational skills."
            });
        }
        else if (interestLevel === 1 && aptitudeLevel === 3) {
            recommendations.push({
                stream: streamNames[stream],
                type: "Hidden Potential",
                message: "You have natural aptitude here. With more exposure, you might develop stronger interest in this field."
            });
        }
    }
    
    let html = '';
    
    if (recommendations.length > 0) {
        html += '<div class="analysis-box"><h4>✅ Recommended Career Streams</h4><ul>';
        recommendations.forEach(rec => {
            html += `<li><strong>${rec.stream} (${rec.type}):</strong> ${rec.message}</li>`;
        });
        html += '</ul></div>';
    }
    
    if (warnings.length > 0) {
        html += '<div class="analysis-box" style="border-left-color: #ff9800;"><h4>⚠️ Areas Requiring Attention</h4><ul>';
        warnings.forEach(warn => {
            html += `<li><strong>${warn.stream} (${warn.type}):</strong> ${warn.message}</li>`;
        });
        html += '</ul></div>';
    }
    
    return html;
}

function getStudyHabitsAnalysis(data) {
    let strengths = [];
    let improvements = [];
    
    const categories = {
        'Learning Techniques': data.categories.learning,
        'Memory': data.categories.memory,
        'Examination Techniques': data.categories.examination,
        'Concentration': data.categories.concentration
    };
    
    for (let [area, rating] of Object.entries(categories)) {
        if (rating === "Excellent" || rating === "Very Good") {
            strengths.push(area);
        } else if (rating === "Average" || rating === "Needs Improvement") {
            improvements.push({area, rating});
        }
    }
    
    let html = '';
    
    if (strengths.length > 0) {
        html += `<div class="analysis-box"><h4>Strengths Identified</h4><ul>`;
        strengths.forEach(area => {
            if (area === "Learning Techniques") {
                html += `<li><strong>${area}:</strong> Demonstrates excellent methods for absorbing and processing information.</li>`;
            } else if (area === "Memory") {
                html += `<li><strong>${area}:</strong> Shows strong memory retention capabilities.</li>`;
            } else if (area === "Examination Techniques") {
                html += `<li><strong>${area}:</strong> Performs effectively under examination conditions.</li>`;
            } else if (area === "Concentration") {
                html += `<li><strong>${area}:</strong> Exhibits strong ability to maintain focus during study sessions.</li>`;
            }
        });
        html += `</ul></div>`;
    }
    
    if (improvements.length > 0) {
        html += `<div class="analysis-box" style="border-left-color: #ff9800;"><h4>Areas Requiring Development</h4><ul>`;
        improvements.forEach(item => {
            if (item.area === "Learning Techniques") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Recommended to establish structured study schedules and experiment with various learning methods.</li>`;
            } else if (item.area === "Memory") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Suggested to implement memory enhancement techniques such as mnemonics and regular review sessions.</li>`;
            } else if (item.area === "Examination Techniques") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Advised to practice with timed mock examinations and develop systematic approach to answering questions.</li>`;
            } else if (item.area === "Concentration") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Recommended to create distraction-free study environment and practice focus-building exercises.</li>`;
            }
        });
        html += `</ul></div>`;
    }
    
    return html;
}

function getLearningStyleAnalysis(data) {
    let html = '<div class="analysis-box"><h4>Learning Style Strengths</h4><ul>';
    
    data.styles.forEach(style => {
        if (style === "Visual") {
            html += `<li><strong>Visual Learning:</strong> Excels at learning through diagrams, charts, and visual representations.</li>`;
        } else if (style === "Auditory") {
            html += `<li><strong>Auditory Learning:</strong> Demonstrates strong learning effectiveness through listening and verbal discussion.</li>`;
        } else if (style === "Kinesthetic") {
            html += `<li><strong>Kinesthetic Learning:</strong> Shows preference for hands-on experience and physical engagement in learning.</li>`;
        }
    });
    
    html += `</ul></div><div class="analysis-box" style="border-left-color: #ff9800;"><h4>Recommended Study Strategies</h4><ul>`;
    
    data.styles.forEach(style => {
        if (style === "Visual") {
            html += `<li><strong>For Visual Learning:</strong> Utilize mind maps, flowcharts, and color-coded notes. Incorporate educational videos for complex topics.</li>`;
        }
        if (style === "Auditory") {
            html += `<li><strong>For Auditory Learning:</strong> Engage in group discussions, record and review verbal explanations, and read important notes aloud.</li>`;
        }
        if (style === "Kinesthetic") {
            html += `<li><strong>For Kinesthetic Learning:</strong> Incorporate hands-on activities, physical models, and practical applications of concepts.</li>`;
        }
    });
    
    html += `</ul></div>`;
    return html;
}

// ============ OVERALL RECOMMENDATIONS ============
document.getElementById("overallRecommendations").innerHTML = generateOverallRecommendations(studyData, learningData, interests, aptitudeLevels);

function generateOverallRecommendations(studyData, learningData, interests, aptitude) {
    let recs = "<ul style='line-height: 1.7;'>";
    
    if (interests && aptitude) {
        for (let stream in interests) {
            if (interests[stream] === 3 && aptitude[stream] === 3) {
                const streamNames = {
                    maths: "Mathematics and Engineering",
                    bio: "Biology and Medical Sciences",
                    humanities: "Humanities and Social Sciences",
                    commerce: "Commerce and Business"
                };
                recs += `<li>Your strong performance in ${streamNames[stream]} suggests this could be your primary career direction. Explore related career options and seek mentorship in this field.</li>`;
            }
        }
    }
    
    if (studyData && (studyData.overallRating === "Average" || studyData.overallRating === "Needs Improvement")) {
        recs += "<li>Develop a structured daily study routine. Consistency in study habits is more important than long study hours.</li>";
    }
    
    if (learningData) {
        recs += `<li>Your ${learningData.primary.toLowerCase()} learning style is your natural strength. Adapt study methods accordingly to maximize learning efficiency.</li>`;
    }
    
    recs += `
        <li>Maintain a balanced lifestyle with 8 hours of sleep, regular physical activity, and nutritious meals to improve learning capacity.</li>
        <li>Practice active recall by explaining concepts in your own words after studying, rather than passive reading.</li>
        <li>Use spaced repetition: Review new information after 1 day, then 3 days, then 7 days for better long-term retention.</li>
        <li>Seek guidance from teachers and career counselors to explore specific career paths that align with your strengths.</li>
        <li>Participate in extracurricular activities related to your areas of strength to develop practical skills and confirm your interests.</li>
    `;
    
    recs += "</ul>";
    
    return recs;
}