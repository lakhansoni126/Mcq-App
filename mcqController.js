import questions from "./questions.json" assert { type: "json" };

const getQuestion = async (req, res) => {
  res.json(questions);
};

const submit = async (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const results = questions.map((question, index) => {
    return {
      question: question.question,
      selectedOption: userAnswers[index],
      correctOption: question.options[question.answer],
      isCorrect: userAnswers[index] === question.answer,
    };
  });
  results.forEach((result) => {
    if (result.isCorrect) {
      score++;
    }
  });
  res.json({ score, results });
};
export { getQuestion, submit };
