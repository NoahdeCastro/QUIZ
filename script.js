const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Arrays in Java Script Can be Used to Store...?',
    answers: [
      { text: 'Strings', correct: true },
      { text: 'Variables', correct: false },
      { text: 'Numbers', correct: false},
      { text: 'Alerts', correct: false}

    ]
  },
  {
    question: 'If an Element is in a div class, what would you use to address it in css?',
    answers: [
      { text: '.', correct: false },
      { text: '$', correct: false },
      { text: '< >', correct: false },
      { text: '#', correct: true }
    ]
  },
  {
    question: 'Events triggered in an inner node bubble up to the parent nodes and trigger all of their event listeners are called..?',
    answers: [
      { text: 'Event delegation', correct: false },
      { text: 'Event Bubbling', correct: true },
      { text: 'Event Listeners', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What does this syntax state: &&',
    answers: [
      { text: 'Combining Statements', correct: false },
      { text: 'Calling an Object', correct: false },
      { text: 'Saying and Twice', correct: false },
      { text: 'Multiple Conditions', correct: true}
    ]
  },
  { 
    question: 'Who is the best developer?',
    answers: [
      { text: 'Bill Gates', correct: false },
      { text: 'Batman', correct: false },
      { text: 'Omar Patel', correct: true },
      { text: 'Noah deCastro', correct: false}
    ]
},
]