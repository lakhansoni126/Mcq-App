let currentQuestionIndex = 0;
let userAnswers = [];
const questions = [];
const quizDiv = document.getElementById("quiz");
const feedbackDiv = document.getElementById("feedback");
const resultDiv = document.getElementById("result");

async function loadQuestions() {
  const response = await fetch("http://localhost:3000/api/mcq/quiz");
  const data = await response.json();
  questions.push(...data);
  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  const question = questions[index];
  quizDiv.innerHTML = `
        <h3>${index + 1}. ${question.question}</h3>
        
          ${question.options
            .map(
              (option, i) => `
                <button onclick="selectOption(${i})">${option}</button> `
            )
            .join("")}
        
      `;
  feedbackDiv.innerHTML = "";
}

function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  checkAnswer();
}

function checkAnswer() {
  const question = questions[currentQuestionIndex];
  const isCorrect = userAnswers[currentQuestionIndex] === question.answer;

  if (isCorrect) {
    quizDiv.style.animation = "correctAnswer 0.5s";
  } else {
    quizDiv.style.animation = "wrongAnswer 0.5s";
  }

  setTimeout(() => {
    quizDiv.style.animation = "";
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    }

    if (currentQuestionIndex === questions.length) {
      submitBtn.style.display = "block";
    }
  }, 500);
}

async function submitAnswers() {
  const response = await fetch("http://localhost:3000/api/mcq/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers: userAnswers }),
  });
  const result = await response.json();
  resultDiv.innerHTML = `Your score: ${result.score}`;
  console.log(result.results);
  nextBtn.style.display = "none";
}

loadQuestions();
