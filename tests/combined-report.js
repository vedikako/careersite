// // Load student info
// document.getElementById("studentName").textContent = localStorage.getItem("student_name") || "N/A";
// document.getElementById("studentClass").textContent = localStorage.getItem("student_class") || "N/A";
// document.getElementById("reportDate").textContent = new Date().toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
// });

// // ============ HELPER FUNCTIONS ============

// function getRatingClass(rating) {
//     const ratingLower = rating.toLowerCase().replace(/\s+/g, '-');
//     return `rating-${ratingLower}`;
// }

// function createRatingItem(label, rating) {
//     return `
//         <div class="rating-item">
//             <span class="rating-label">${label}</span>
//             <span class="rating-value ${getRatingClass(rating)}">${rating}</span>
//         </div>
//     `;
// }

// // ============ STUDY HABITS ============
// const studyData = JSON.parse(localStorage.getItem("studyHabitsScore"));

// if (studyData) {
//     let studyHTML = `
//         <div class="rating-card">
//             <h3>Your Study Habits Assessment</h3>
//             <p style="margin-bottom: 15px; color: #666;">You have been assessed in the following areas:</p>
//             ${createRatingItem("Overall Performance", studyData.overallRating)}
//             ${studyData.categories ? `
//                 ${createRatingItem("Learning Techniques", studyData.categories.learning)}
//                 ${createRatingItem("Memory", studyData.categories.memory)}
//                 ${createRatingItem("Examination Techniques", studyData.categories.examination)}
//                 ${createRatingItem("Concentration", studyData.categories.concentration)}
//             ` : ''}
//         </div>
        
//         <div class="suggestions-box">
//             <h4>Suggestions for Improvement</h4>
//             ${getStudyHabitsSuggestions(studyData)}
//         </div>
//     `;
    
//     document.getElementById("studyHabitsContent").innerHTML = studyHTML;
// }

// // ============ LEARNING STYLE ============
// const learningData = JSON.parse(localStorage.getItem("learningStyleScore"));

// if (learningData) {
//     let learningHTML = `
//         <div class="rating-card">
//             <h3>Your Primary Learning Style: ${learningData.description}</h3>
//             <p style="color: #666; margin-top: 10px;">
//                 You learn best through ${learningData.primary.toLowerCase()} methods. 
//                 ${learningData.styles.length > 1 ? 
//                     `You also show strong preferences for ${learningData.styles.filter(s => s !== learningData.primary).join(' and ').toLowerCase()} learning.` 
//                     : ''}
//             </p>
//         </div>
        
//         <div class="suggestions-box">
//             <h4>Learning Strategies for You</h4>
//             ${getLearningStyleSuggestions(learningData)}
//         </div>
//     `;
    
//     document.getElementById("learningStyleContent").innerHTML = learningHTML;
// }

// // ============ APTITUDE ============
// const aptitudeRatings = JSON.parse(localStorage.getItem("aptitude_ratings"));

// if (aptitudeRatings) {
//     let aptitudeHTML = `
//         <div class="rating-card">
//             <h3>Your Aptitude Assessment</h3>
//             <p style="margin-bottom: 15px; color: #666;">Your performance in different reasoning abilities:</p>
//             ${createRatingItem("Overall Aptitude", aptitudeRatings.overall)}
//             ${createRatingItem("Numerical Reasoning", aptitudeRatings.numerical)}
//             ${createRatingItem("Logical Reasoning", aptitudeRatings.logical)}
//             ${createRatingItem("Pattern Recognition", aptitudeRatings.pattern)}
//             ${createRatingItem("Verbal Reasoning", aptitudeRatings.verbal)}
//         </div>
        
//         <div class="suggestions-box">
//             <h4>Tips for Enhancement</h4>
//             ${getAptitudeSuggestions(aptitudeRatings)}
//         </div>
//     `;
    
//     document.getElementById("aptitudeContent").innerHTML = aptitudeHTML;
// }

// // ============ OVERALL RECOMMENDATIONS ============
// document.getElementById("overallRecommendations").innerHTML = generateOverallRecommendations(studyData, learningData, aptitudeRatings);

// // ============ SUGGESTION FUNCTIONS ============

// function getStudyHabitsSuggestions(data) {
//     let suggestions = "<ul>";
    
//     if (data.overallRating === "Needs Improvement" || data.overallRating === "Average") {
//         suggestions += `
//             <li><strong>Time Management:</strong> Create a daily/weekly planner to organize your study activities. Prepare and follow a 'To Do List' to plan important study activities in advance.</li>
//             <li><strong>Reading Techniques:</strong> Read early in the day when your mind is clear and sharp. Your grasping power is at its best during this time.</li>
//             <li><strong>Active Learning:</strong> Discuss what you have learned in the classroom with your friends. This gives you better clarity and helps retain information for a longer period.</li>
//         `;
//     }
    
//     if (data.categories) {
//         if (data.categories.concentration === "Needs Improvement" || data.categories.concentration === "Average") {
//             suggestions += `
//                 <li><strong>Improve Concentration:</strong> Practice meditation, yoga, or simple breathing exercises to improve focus. Avoid studying when attention is persistently wandering.</li>
//                 <li><strong>Minimize Distractions:</strong> Focus on one activity at a time. Avoid studying while watching television or using your phone.</li>
//             `;
//         }
        
//         if (data.categories.memory === "Needs Improvement" || data.categories.memory === "Average") {
//             suggestions += `
//                 <li><strong>Memory Techniques:</strong> Use mnemonics such as acronyms, acrostics, and narrative methods to improve memorization.</li>
//                 <li><strong>Visual Imagery:</strong> Visualize procedures and techniques in your mind's eye to help retain them in memory over long periods.</li>
//                 <li><strong>Regular Revision:</strong> Review notes daily for 10-15 minutes to improve retention and understanding.</li>
//             `;
//         }
        
//         if (data.categories.examination === "Needs Improvement" || data.categories.examination === "Average") {
//             suggestions += `
//                 <li><strong>Exam Preparation:</strong> Devote more attention to weak areas. Stay healthy, take enough rest, and avoid over-studying.</li>
//                 <li><strong>During Examination:</strong> Glance over the test format first. Read instructions completely and plan your time accordingly. Answer easier questions first.</li>
//             `;
//         }
//     }
    
//     suggestions += `
//         <li><strong>Healthy Habits:</strong> Have nutritious food and drink plenty of water. Include physical activity in your daily schedule and ensure sufficient rest.</li>
//     `;
    
//     suggestions += "</ul>";
//     return suggestions;
// }

// function getLearningStyleSuggestions(data) {
//     let suggestions = "<ul>";
    
//     data.styles.forEach(style => {
//         if (style === "Visual") {
//             suggestions += `
//                 <li><strong>Visual Learning Techniques:</strong> Use images, pictures, colors, and other visual media to help you learn. Try to find diagrams, sketches, photographs, and flow charts of course material.</li>
//                 <li><strong>Mind Maps and Graphics:</strong> Use mind maps with colors and pictures in place of text wherever possible. Illustrate your notes with images and graphs.</li>
//                 <li><strong>Visual Technology:</strong> Take advantage of visual elements of the computer when studying or locating information.</li>
//             `;
//         }
        
//         if (style === "Auditory") {
//             suggestions += `
//                 <li><strong>Auditory Learning Techniques:</strong> Study with a friend so you can talk about the information and hear it. Participate actively in class discussions and debates.</li>
//                 <li><strong>Reading Aloud:</strong> Read text aloud whenever possible. You need to hear the words as you read them to understand them well.</li>
//                 <li><strong>Recording and Repetition:</strong> Use a tape recorder and replay the information. Recite information over and over to better memorize material.</li>
//             `;
//         }
        
//         if (style === "Kinesthetic") {
//             suggestions += `
//                 <li><strong>Hands-On Learning:</strong> Try to memorize by walking around while reciting to yourself. Use hands-on activities such as experiments, models, and practical work.</li>
//                 <li><strong>Active Study Breaks:</strong> Take frequent breaks during study sessions (15-25 minutes of study, 3-5 minutes of break). Use the break time for physical movement.</li>
//                 <li><strong>Interactive Materials:</strong> When learning new information, make task cards, flashcards, or card games. Create things with your hands to help process information.</li>
//                 <li><strong>Physical Engagement:</strong> Use breathing and relaxation techniques while you learn and perform. Focus on staying calm, centered, and aware.</li>
//             `;
//         }
//     });
    
//     suggestions += "</ul>";
//     return suggestions;
// }

// function getAptitudeSuggestions(ratings) {
//     let suggestions = "<ul>";
    
//     if (ratings.numerical === "Needs Improvement" || ratings.numerical === "Average") {
//         suggestions += `
//             <li><strong>Numerical Skills Development:</strong> Practice mental arithmetic daily - addition, subtraction, multiplication, and division with accuracy. Try to recite tables in random order.</li>
//             <li><strong>Mathematical Foundations:</strong> Improve your understanding of the basic principles of mathematics. Allot more time for practice of numerical problems.</li>
//         `;
//     }
    
//     if (ratings.logical === "Needs Improvement" || ratings.logical === "Average") {
//         suggestions += `
//             <li><strong>Logical Thinking:</strong> Practice step-by-step thinking. Solve brain teasers and play mathematical computation games regularly.</li>
//             <li><strong>Problem Analysis:</strong> Work on developing your analytical and reasoning skills through puzzles and logic problems.</li>
//         `;
//     }
    
//     if (ratings.pattern === "Needs Improvement" || ratings.pattern === "Average") {
//         suggestions += `
//             <li><strong>Pattern Recognition:</strong> Practice identifying patterns in number sequences, visual designs, and data series. Dedicate time daily to sequence-based problems.</li>
//         `;
//     }
    
//     if (ratings.verbal === "Needs Improvement" || ratings.verbal === "Average") {
//         suggestions += `
//             <li><strong>Vocabulary Building:</strong> Learn new words every day and use them in sentences. Keep notes and make up stories to practice language skills.</li>
//             <li><strong>Reading and Writing:</strong> Play vocabulary games, solve puzzles and crosswords. Practice answering questions starting with who, what, where, why, when, and how.</li>
//             <li><strong>Word Games:</strong> Play games about synonyms (words with the same meaning) and antonyms (words that mean the opposite).</li>
//         `;
//     }
    
//     if (ratings.overall === "Good" || ratings.overall === "Excellent") {
//         suggestions += `
//             <li><strong>Maintain Excellence:</strong> Continue practicing regularly to maintain and further enhance your strong performance. Challenge yourself with advanced problems.</li>
//         `;
//     }
    
//     suggestions += "</ul>";
//     return suggestions;
// }

// function generateOverallRecommendations(studyData, learningData, aptitudeRatings) {
//     let recs = "<ul style='line-height: 1.8;'>";
    
//     // Key recommendations based on overall performance
//     if (studyData && (studyData.overallRating === "Average" || studyData.overallRating === "Needs Improvement")) {
//         recs += "<li>Develop a consistent study routine with specific time slots for different subjects and stick to it daily.</li>";
//     }
    
//     if (aptitudeRatings && (aptitudeRatings.overall === "Average" || aptitudeRatings.overall === "Needs Improvement")) {
//         recs += "<li>Dedicate 20-30 minutes daily to aptitude practice, focusing on problem-solving and analytical thinking.</li>";
//     }
    
//     if (learningData) {
//         recs += `<li>Utilize ${learningData.primary.toLowerCase()} learning methods as they align best with your natural learning style.</li>`;
//     }
    
//     // Universal recommendations
//     recs += `
//         <li>Balance your academic commitments with physical activities, hobbies, and adequate rest for overall development.</li>
//         <li>Maintain a positive attitude towards learning. View challenges as opportunities for growth rather than obstacles.</li>
//         <li>Seek guidance from teachers, parents, or school counselors whenever you face difficulties in understanding concepts.</li>
//         <li>Manage screen time effectively. Limit social media and entertainment during designated study hours.</li>
//         <li>Set specific, measurable, achievable goals for each study session and track your progress regularly.</li>
//         <li>Participate in extracurricular activities to develop social skills, teamwork, and leadership abilities alongside academics.</li>
//     `;
    
//     recs += "</ul>";
    
//     recs += `
//         <p style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; color: #1565c0; line-height: 1.6;">
//             <strong>Important Note:</strong> This assessment provides insights into your current academic foundation and learning preferences. 
//             Use these findings to develop effective study strategies and work habits. Remember that consistent effort, 
//             proper guidance, and a positive mindset are key factors in achieving academic excellence. Your potential for 
//             growth is significant at this stage, and these foundational years will shape your future academic journey.
//         </p>
//     `;
    
//     return recs;
// }
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
        
        <div class="suggestions-box">
            <h4>Suggestions for Improvement</h4>
            ${getStudyHabitsSuggestions(studyData)}
        </div>
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
                    `You also show strong preferences for ${learningData.styles.filter(s => s !== learningData.primary).join(' and ').toLowerCase()} learning .` 
                    : ''}
            </p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <canvas id="learningChart" width="400" height="250"></canvas>
        </div>
        
        <div class="suggestions-box">
            <h4>Learning Strategies for You</h4>
            ${getLearningStyleSuggestions(learningData)}
        </div>
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
        
        <div class="suggestions-box">
            <h4>Tips for Enhancement</h4>
            ${getAptitudeSuggestions(aptitudeRatings)}
        </div>
    `;
    
    document.getElementById("aptitudeContent").innerHTML = aptitudeHTML;
    createAptitudeChart(aptitudeRatings);
}

// ============ CHART CREATION FUNCTIONS ============

function createStudyHabitsChart(data) {
    const ctx = document.getElementById("studyChart");
    if (!ctx) return;
    
    const labels = ["Learning Techniques", "Memory ", "Examination Techniques", "Concentration"];
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

// ============ OVERALL RECOMMENDATIONS ============
document.getElementById("overallRecommendations").innerHTML = generateOverallRecommendations(studyData, learningData, aptitudeRatings);

// ============ SUGGESTION FUNCTIONS ============

function getStudyHabitsSuggestions(data) {
    let suggestions = "<ul>";
    
    if (data.overallRating === "Needs Improvement" || data.overallRating === "Average") {
        suggestions += `
            <li><strong>Time Management:</strong> Create a daily/weekly planner to organize your study activities. Prepare and follow a 'To Do List' to plan important study activities in advance.</li>
            <li><strong>Reading Techniques:</strong> Read early in the day when your mind is clear and sharp. Your grasping power is at its best during this time.</li>
            <li><strong>Active Learning:</strong> Discuss what you have learned in the classroom with your friends. This gives you better clarity and helps retain information for a longer period.</li>
        `;
    }
    
    if (data.categories) {
        if (data.categories.concentration === "Needs Improvement" || data.categories.concentration === "Average") {
            suggestions += `
                <li><strong>Improve Concentration:</strong> Practice meditation, yoga, or simple breathing exercises to improve focus. Avoid studying when attention is persistently wandering.</li>
                <li><strong>Minimize Distractions:</strong> Focus on one activity at a time. Avoid studying while watching television or using your phone.</li>
            `;
        }
        
        if (data.categories.memory === "Needs Improvement" || data.categories.memory === "Average") {
            suggestions += `
                <li><strong>Memory Techniques:</strong> Use mnemonics such as acronyms, acrostics, and narrative methods to improve memorization.</li>
                <li><strong>Visual Imagery:</strong> Visualize procedures and techniques in your mind's eye to help retain them in memory over long periods.</li>
                <li><strong>Regular Revision:</strong> Review notes daily for 10-15 minutes to improve retention and understanding.</li>
            `;
        }
        
        if (data.categories.examination === "Needs Improvement" || data.categories.examination === "Average") {
            suggestions += `
                <li><strong>Exam Preparation:</strong> Devote more attention to weak areas. Stay healthy, take enough rest, and avoid over-studying.</li>
                <li><strong>During Examination:</strong> Glance over the test format first. Read instructions completely and plan your time accordingly. Answer easier questions first.</li>
            `;
        }
    }
    
    suggestions += `
        <li><strong>Healthy Habits:</strong> Have nutritious food and drink plenty of water. Include physical activity in your daily schedule and ensure sufficient rest.</li>
    `;
    
    suggestions += "</ul>";
    return suggestions;
}

function getLearningStyleSuggestions(data) {
    let suggestions = "<ul>";
    
    data.styles.forEach(style => {
        if (style === "Visual") {
            suggestions += `
                <li><strong>Visual Learning Techniques:</strong> Use images, pictures, colors, and other visual media to help you learn. Try to find diagrams, sketches, photographs, and flow charts of course material.</li>
                <li><strong>Mind Maps and Graphics:</strong> Use mind maps with colors and pictures in place of text wherever possible. Illustrate your notes with images and graphs.</li>
                <li><strong>Visual Technology:</strong> Take advantage of visual elements of the computer when studying or locating information.</li>
            `;
        }
        
        if (style === "Auditory") {
            suggestions += `
                <li><strong>Auditory Learning Techniques:</strong> Study with a friend so you can talk about the information and hear it. Participate actively in class discussions and debates.</li>
                <li><strong>Reading Aloud:</strong> Read text aloud whenever possible. You need to hear the words as you read them to understand them well.</li>
                <li><strong>Recording and Repetition:</strong> Use a tape recorder and replay the information. Recite information over and over to better memorize material.</li>
            `;
        }
        
        if (style === "Kinesthetic") {
            suggestions += `
                <li><strong>Hands-On Learning:</strong> Try to memorize by walking around while reciting to yourself. Use hands-on activities such as experiments, models, and practical work.</li>
                <li><strong>Active Study Breaks:</strong> Take frequent breaks during study sessions (15-25 minutes of study, 3-5 minutes of break). Use the break time for physical movement.</li>
                <li><strong>Interactive Materials:</strong> When learning new information, make task cards, flashcards, or card games. Create things with your hands to help process information.</li>
                <li><strong>Physical Engagement:</strong> Use breathing and relaxation techniques while you learn and perform. Focus on staying calm, centered, and aware.</li>
            `;
        }
    });
    
    suggestions += "</ul>";
    return suggestions;
}

function getAptitudeSuggestions(ratings) {
    let suggestions = "<ul>";
    
    if (ratings.numerical === "Needs Improvement" || ratings.numerical === "Average") {
        suggestions += `
            <li><strong>Numerical Skills Development:</strong> Practice mental arithmetic daily - addition, subtraction, multiplication, and division with accuracy. Try to recite tables in random order.</li>
            <li><strong>Mathematical Foundations:</strong> Improve your understanding of the basic principles of mathematics. Allot more time for practice of numerical problems.</li>
        `;
    }
    
    if (ratings.logical === "Needs Improvement" || ratings.logical === "Average") {
        suggestions += `
            <li><strong>Logical Thinking:</strong> Practice step-by-step thinking. Solve brain teasers and play mathematical computation games regularly.</li>
            <li><strong>Problem Analysis:</strong> Work on developing your analytical and reasoning skills through puzzles and logic problems.</li>
        `;
    }
    
    if (ratings.pattern === "Needs Improvement" || ratings.pattern === "Average") {
        suggestions += `
            <li><strong>Pattern Recognition:</strong> Practice identifying patterns in number sequences, visual designs, and data series. Dedicate time daily to sequence-based problems.</li>
        `;
    }
    
    if (ratings.verbal === "Needs Improvement" || ratings.verbal === "Average") {
        suggestions += `
            <li><strong>Vocabulary Building:</strong> Learn new words every day and use them in sentences. Keep notes and make up stories to practice language skills.</li>
            <li><strong>Reading and Writing:</strong> Play vocabulary games, solve puzzles and crosswords. Practice answering questions starting with who, what, where, why, when, and how.</li>
            <li><strong>Word Games:</strong> Play games about synonyms (words with the same meaning) and antonyms (words that mean the opposite).</li>
        `;
    }
    
    if (ratings.overall === "Good" || ratings.overall === "Excellent") {
        suggestions += `
            <li><strong>Maintain Excellence:</strong> Continue practicing regularly to maintain and further enhance your strong performance. Challenge yourself with advanced problems.</li>
        `;
    }
    
    suggestions += "</ul>";
    return suggestions;
}

function generateOverallRecommendations(studyData, learningData, aptitudeRatings) {
    let recs = "<ul style='line-height: 1.8;'>";
    
    // Key recommendations based on overall performance
    if (studyData && (studyData.overallRating === "Average" || studyData.overallRating === "Needs Improvement")) {
        recs += "<li>Develop a consistent study routine with specific time slots for different subjects and stick to it daily.</li>";
    }
    
    if (aptitudeRatings && (aptitudeRatings.overall === "Average" || aptitudeRatings.overall === "Needs Improvement")) {
        recs += "<li>Dedicate 20-30 minutes daily to aptitude practice, focusing on problem-solving and analytical thinking.</li>";
    }
    
    if (learningData) {
        recs += `<li>Utilize ${learningData.primary.toLowerCase()} learning methods as they align best with your natural learning style.</li>`;
    }
    
    // Universal recommendations
    recs += `
        <li>Balance your academic commitments with physical activities, hobbies, and adequate rest for overall development.</li>
        <li>Maintain a positive attitude towards learning. View challenges as opportunities for growth rather than obstacles.</li>
        <li>Seek guidance from teachers, parents, or school counselors whenever you face difficulties in understanding concepts.</li>
        <li>Manage screen time effectively. Limit social media and entertainment during designated study hours.</li>
        <li>Set specific, measurable, achievable goals for each study session and track your progress regularly.</li>
        <li>Participate in extracurricular activities to develop social skills, teamwork, and leadership abilities alongside academics.</li>
    `;
    
    recs += "</ul>";
    
    recs += `
        <p style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; color: #1565c0; line-height: 1.6;">
            <strong>Important Note:</strong> This assessment provides insights into your current academic foundation and learning preferences. 
            Use these findings to develop effective study strategies and work habits. Remember that consistent effort, 
            proper guidance, and a positive mindset are key factors in achieving academic excellence. Your potential for 
            growth is significant at this stage, and these foundational years will shape your future academic journey.
        </p>
    `;
    
    return recs;
}
