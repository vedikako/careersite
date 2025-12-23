// Load student info
document.getElementById("studentName").textContent = localStorage.getItem("student_name") || "N/A";
document.getElementById("studentClass").textContent = localStorage.getItem("student_class") || "N/A";
document.getElementById("reportDate").textContent = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// ============ HELPER FUNCTIONS ============

function getRatingClass(rating) {
    const ratingLower = rating.toLowerCase().replace(/\s+/g, '-');
    return `rating-${ratingLower}`;
}

function createRatingItem(label, rating) {
    return `
        <div class="rating-item">
            <span class="rating-label">${label}</span>
            <span class="rating-value ${getRatingClass(rating)}">${rating}</span>
        </div>
    `;
}

// Convert rating to numeric value for chart display
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

// Get color based on rating
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

// ============ STUDY HABITS ============
const studyData = JSON.parse(localStorage.getItem("studyHabitsScore"));

if (studyData) {
    let studyHTML = `
        <div class="rating-card">
            <h3>Your Study Habits Assessment</h3>
            <p style="margin-bottom: 15px; color: #666;">You have been assessed in the following areas:</p>
            ${createRatingItem("Overall Performance", studyData.overallRating)}
            ${studyData.categories ? `
                ${createRatingItem("Learning Techniques", studyData.categories.learning)}
                ${createRatingItem("Memory", studyData.categories.memory)}
                ${createRatingItem("Examination Techniques", studyData.categories.examination)}
                ${createRatingItem("Concentration", studyData.categories.concentration)}
            ` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <canvas id="studyChart" width="400" height="250"></canvas>
        </div>
        
        ${getStudyHabitsAnalysis(studyData)}
    `;
    
    document.getElementById("studyHabitsContent").innerHTML = studyHTML;
    
    // Create chart after HTML is inserted
    if (studyData.categories) {
        createStudyHabitsChart(studyData);
    }
}

// ============ LEARNING STYLE ============
const learningData = JSON.parse(localStorage.getItem("learningStyleScore"));

if (learningData) {
    let learningHTML = `
        <div class="rating-card">
            <h3>Your Primary Learning Style: ${learningData.description}</h3>
            <p style="color: #666; margin-top: 10px;">
                You learn best through ${learningData.primary.toLowerCase()} methods. 
                ${learningData.styles.length > 1 ? 
                    `You also show strong preferences for ${learningData.styles.filter(s => s !== learningData.primary).join(' and ').toLowerCase()} learning.` 
                    : ''}
            </p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <canvas id="learningChart" width="400" height="250"></canvas>
        </div>
        
        ${getLearningStyleAnalysis(learningData)}
    `;
    
    document.getElementById("learningStyleContent").innerHTML = learningHTML;
    createLearningStyleChart(learningData);
}

// ============ APTITUDE ============
const aptitudeRatings = JSON.parse(localStorage.getItem("aptitude_ratings"));

if (aptitudeRatings) {
    let aptitudeHTML = `
        <div class="rating-card">
            <h3>Your Aptitude Assessment</h3>
            <p style="margin-bottom: 15px; color: #666;">Your performance in different reasoning abilities:</p>
            ${createRatingItem("Overall Aptitude", aptitudeRatings.overall)}
            ${createRatingItem("Numerical Reasoning", aptitudeRatings.numerical)}
            ${createRatingItem("Logical Reasoning", aptitudeRatings.logical)}
            ${createRatingItem("Pattern Recognition", aptitudeRatings.pattern)}
            ${createRatingItem("Verbal Reasoning", aptitudeRatings.verbal)}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <canvas id="aptitudeChart" width="400" height="250"></canvas>
        </div>
        
        ${getAptitudeAnalysis(aptitudeRatings)}
    `;
    
    document.getElementById("aptitudeContent").innerHTML = aptitudeHTML;
    createAptitudeChart(aptitudeRatings);
}

// ============ CHART CREATION FUNCTIONS ============

function createStudyHabitsChart(data) {
    const ctx = document.getElementById("studyChart");
    if (!ctx) return;
    
    const labels = ["Learning", "Memory", "Examination", "Concentration"];
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
                borderColor: colors.map(c => c),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Study Habits Breakdown',
                    font: { size: 16, weight: 'bold' }
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
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createLearningStyleChart(data) {
    const ctx = document.getElementById("learningChart");
    if (!ctx) return;
    
    // Calculate percentage for each style
    const total = data.visual + data.auditory + data.kinesthetic;
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
                backgroundColor: ['#4A70A9', '#8FABD4', '#2ecc71'],
                borderColor: ['#3a5d8c', '#7a9bc4', '#27ae60'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Learning Style Profile',
                    font: { size: 16, weight: 'bold' }
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
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createAptitudeChart(ratings) {
    const ctx = document.getElementById("aptitudeChart");
    if (!ctx) return;
    
    const labels = ["Numerical", "Logical", "Pattern", "Verbal"];
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
            labels: labels,
            datasets: [{
                label: 'Performance Level',
                data: numericValues,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Aptitude Assessment Breakdown',
                    font: { size: 16, weight: 'bold' }
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
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ============ ANALYSIS FUNCTIONS (Based on Graph Results) ============

function getStudyHabitsAnalysis(data) {
    let strengths = [];
    let improvements = [];
    
    // Analyze each category
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
    
    // Strengths section
    if (strengths.length > 0) {
        html += `
            <div class="strengths-box">
                <h4>Your Strengths</h4>
                <ul>
        `;
        
        strengths.forEach(area => {
            if (area === "Learning Techniques") {
                html += `<li><strong>${area}:</strong> You have excellent methods for absorbing and processing information. Continue using these effective techniques and share them with peers.</li>`;
            } else if (area === "Memory") {
                html += `<li><strong>${area}:</strong> Your memory retention is strong. This is a valuable asset - leverage it by connecting new information to what you already know.</li>`;
            } else if (area === "Examination Techniques") {
                html += `<li><strong>${area}:</strong> You perform well under exam pressure. Maintain your calm approach and time management skills during assessments.</li>`;
            } else if (area === "Concentration") {
                html += `<li><strong>${area}:</strong> Your ability to focus is commendable. Use this strength during difficult topics that require deep thinking.</li>`;
            }
        });
        
        html += `</ul></div>`;
    }
    
    // Improvements section
    if (improvements.length > 0) {
        html += `
            <div class="suggestions-box">
                <h4>Areas for Improvement</h4>
                <ul>
        `;
        
        improvements.forEach(item => {
            if (item.area === "Learning Techniques") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Experiment with different study methods - try the Pomodoro technique (25 minutes study, 5 minutes break). Create a structured daily study schedule and follow it consistently.</li>`;
            } else if (item.area === "Memory") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Use memory techniques like mnemonics, acronyms (e.g., VIBGYOR for rainbow colors), and visual imagery. Review notes within 24 hours of learning - this dramatically improves retention.</li>`;
            } else if (item.area === "Examination Techniques") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Practice with previous year papers under timed conditions. Before exams, glance through the paper first, then tackle easier questions to build confidence. Avoid cramming the night before.</li>`;
            } else if (item.area === "Concentration") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Create a distraction-free study zone. Keep your phone in another room during study time. Practice 10-minute meditation daily to improve focus. Take short breaks every 25-30 minutes.</li>`;
            }
        });
        
        html += `</ul></div>`;
    }
    
    return html;
}

function getLearningStyleAnalysis(data) {
    let html = '';
    
    // Strengths based on dominant style
    html += `<div class="strengths-box"><h4>Your Learning Strengths</h4><ul>`;
    
    data.styles.forEach(style => {
        if (style === "Visual") {
            html += `<li><strong>Visual Learning:</strong> You excel at learning through diagrams, charts, and visual representations. Your ability to "see" concepts gives you an advantage in subjects like geometry, biology diagrams, and data interpretation.</li>`;
        } else if (style === "Auditory") {
            html += `<li><strong>Auditory Learning:</strong> You learn effectively through listening and discussion. Your strength in verbal processing helps you in languages, presentations, and understanding lectures.</li>`;
        } else if (style === "Kinesthetic") {
            html += `<li><strong>Kinesthetic Learning:</strong> You learn best through hands-on experience and physical activity. This gives you an advantage in practicals, experiments, and project-based learning.</li>`;
        }
    });
    
    html += `</ul></div>`;
    
    // Suggestions to maximize learning style
    html += `<div class="suggestions-box"><h4>How to Maximize Your Learning</h4><ul>`;
    
    data.styles.forEach(style => {
        if (style === "Visual") {
            html += `
                <li><strong>For Visual Learners:</strong> Always create mind maps, flowcharts, or diagrams when studying. Use color-coding extensively - different colors for different topics, formulas, or concepts. Watch educational videos on YouTube for complex topics.</li>
            `;
        }
        
        if (style === "Auditory") {
            html += `
                <li><strong>For Auditory Learners:</strong> Record yourself explaining concepts and listen back. Form study groups where you can discuss and debate topics. Read important notes aloud. Use audio lessons and podcasts for learning.</li>
            `;
        }
        
        if (style === "Kinesthetic") {
            html += `
                <li><strong>For Kinesthetic Learners:</strong> Build models, conduct experiments, or use flashcards you can physically handle. Walk around while memorizing. Take frequent movement breaks. Use real-world applications to understand abstract concepts.</li>
            `;
        }
    });
    
    html += `</ul></div>`;
    
    return html;
}

function getAptitudeAnalysis(ratings) {
    let strengths = [];
    let improvements = [];
    
    const areas = {
        'Numerical Reasoning': ratings.numerical,
        'Logical Reasoning': ratings.logical,
        'Pattern Recognition': ratings.pattern,
        'Verbal Reasoning': ratings.verbal
    };
    
    for (let [area, rating] of Object.entries(areas)) {
        if (rating === "Excellent" || rating === "Very Good" || rating === "Good") {
            strengths.push({area, rating});
        } else {
            improvements.push({area, rating});
        }
    }
    
    let html = '';
    
    // Strengths section
    if (strengths.length > 0) {
        html += `<div class="strengths-box"><h4>Your Aptitude Strengths</h4><ul>`;
        
        strengths.forEach(item => {
            if (item.area === "Numerical Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> You have strong mathematical and numerical skills. This strength opens doors to careers in engineering, finance, data science, and scientific research. Continue challenging yourself with complex problems.</li>`;
            } else if (item.area === "Logical Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Your logical thinking ability is a valuable asset. You can break down complex problems systematically. This skill is crucial for programming, law, strategy, and analytical fields.</li>`;
            } else if (item.area === "Pattern Recognition") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> You excel at identifying patterns and sequences. This skill is valuable in fields like data analysis, research, and problem-solving roles. Keep practicing to sharpen this further.</li>`;
            } else if (item.area === "Verbal Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Your language and comprehension skills are strong. This advantage helps in communication, writing, teaching, law, and liberal arts. Your ability to express ideas clearly is a professional asset.</li>`;
            }
        });
        
        html += `</ul></div>`;
    }
    
    // Improvements section
    if (improvements.length > 0) {
        html += `<div class="suggestions-box"><h4>Areas for Development</h4><ul>`;
        
        improvements.forEach(item => {
            if (item.area === "Numerical Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Practice basic arithmetic daily - mental math for 10 minutes. Solve 5-10 numerical problems from your textbook every day. Learn multiplication tables thoroughly and practice percentage calculations. Use apps like Khan Academy for additional practice.</li>`;
            } else if (item.area === "Logical Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Solve puzzles like Sudoku, chess problems, or brain teasers daily. Practice "if-then" reasoning questions. Break complex problems into smaller steps. Ask "why" questions to develop analytical thinking.</li>`;
            } else if (item.area === "Pattern Recognition") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Practice number sequences and series problems regularly. Look for patterns in everyday life - music, art, nature. Solve pattern-based questions from competitive exam books. Start with simple patterns and gradually increase difficulty.</li>`;
            } else if (item.area === "Verbal Reasoning") {
                html += `<li><strong>${item.area} (${item.rating}):</strong> Read one article or story daily and summarize it. Learn 5 new words each day with meanings and usage. Practice synonyms and antonyms. Solve vocabulary-based puzzles. Write short paragraphs to improve expression.</li>`;
            }
        });
        
        html += `</ul></div>`;
    }
    
    return html;
}

// ============ OVERALL RECOMMENDATIONS ============
document.getElementById("overallRecommendations").innerHTML = generateOverallRecommendations(studyData, learningData, aptitudeRatings);

function generateOverallRecommendations(studyData, learningData, aptitudeRatings) {
    let recs = "<ul style='line-height: 1.8;'>";
    
    // Customized recommendations based on results
    if (studyData && (studyData.overallRating === "Average" || studyData.overallRating === "Needs Improvement")) {
        recs += "<li>Focus on developing a structured daily routine. Consistency in study habits is more important than long study hours. Aim for regular, focused sessions rather than last-minute cramming.</li>";
    }
    
    if (aptitudeRatings && (aptitudeRatings.overall === "Average" || aptitudeRatings.overall === "Needs Improvement")) {
        recs += "<li>Dedicate 20-30 minutes daily specifically to aptitude practice. Work on your weaker areas systematically - small daily improvements lead to significant long-term gains.</li>";
    }
    
    if (learningData) {
        recs += `<li>Your ${learningData.primary.toLowerCase()} learning style is your natural strength. Use this to your advantage by adapting your study methods accordingly. Don't force yourself to study in ways that don't suit you.</li>`;
    }
    
    // Universal evidence-based recommendations
    recs += `
        <li>Maintain a balanced lifestyle: 8 hours of sleep, regular physical activity, and nutritious meals significantly improve learning capacity and memory retention.</li>
        <li>Practice active recall instead of passive reading. After studying a topic, close your book and try to explain it in your own words or write down what you remember.</li>
        <li>Use the spaced repetition technique: Review new information after 1 day, then after 3 days, then after 7 days. This dramatically improves long-term retention.</li>
        <li>Don't hesitate to ask questions in class or seek help from teachers. Understanding concepts clearly now prevents confusion later.</li>
        <li>Limit screen time during study hours. Keep your phone in another room and use website blockers if needed. Even brief distractions can break your concentration significantly.</li>
        <li>Participate in extracurricular activities that interest you. These develop important soft skills like teamwork, leadership, and communication while providing necessary mental breaks from academics.</li>
    `;
    
    recs += "</ul>";
    
    recs += `
        <p style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; color: #1565c0; line-height: 1.6;">
            <strong>Important Note:</strong> This assessment provides a snapshot of your current abilities and learning preferences. 
            Remember that abilities can be developed with consistent effort and proper guidance. Your performance today does not limit your potential tomorrow. 
            Focus on steady improvement, maintain a positive attitude, and seek support when needed. These foundational years are crucial for building 
            habits and skills that will serve you throughout your academic and professional journey.
        </p>
    `;
    
    return recs;
}