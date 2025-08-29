// Escape HTML tags so they display as text
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Quiz questions
const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
  { question: "Which HTML element is used for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<heading>"], answer: "<h1>" },
  { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "Which property changes text color in CSS?", options: ["font-color", "color", "text-color", "fgcolor"], answer: "color" },
  { question: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<script>", "<code>", "<javascript>"], answer: "<script>" },
  { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//" },
  { question: "Which method is used to write into the console in JS?", options: ["console.write()", "console.output()", "console.log()", "console.display()"], answer: "console.log()" },
  { question: "Which company developed JavaScript?", options: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"], answer: "Netscape" },
  { question: "Which HTML attribute specifies an alternate text for an image?", options: ["title", "alt", "src", "longdesc"], answer: "alt" },
  { question: "Which tag is used to create a hyperlink in HTML?", options: ["<a>", "<link>", "<href>", "<hyper>"], answer: "<a>" },
  { question: "Which CSS property controls the size of text?", options: ["text-size", "font-style", "font-size", "text-style"], answer: "font-size" },
  { question: "Which HTML element is used to play video files?", options: ["<video>", "<media>", "<movie>", "<play>"], answer: "<video>" },
  { question: "How do you declare a JavaScript variable?", options: ["var myVar;", "variable myVar;", "v myVar;", "dim myVar;"], answer: "var myVar;" },
  { question: "Which HTML element is used to display a scalar measurement?", options: ["<gauge>", "<meter>", "<progress>", "<scale>"], answer: "<meter>" },
  { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "create.myFunction()", "def myFunction()", "function:myFunction()"], answer: "function myFunction()" },
  { question: "Which HTML tag is used for a numbered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ol>" },
  { question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "call function myFunction()", "myFunction()", "Call.myFunction()"], answer: "myFunction()" },
  { question: "Which CSS property is used to set the background color?", options: ["background-color", "bgcolor", "color", "background"], answer: "background-color" },
  { question: "Which tag is used for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<newline>"], answer: "<br>" },
  { question: "Which attribute specifies a unique identifier for an element?", options: ["class", "id", "name", "key"], answer: "id" }
];

let currentQuestion = 0;
let selectedAnswers = [];

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const questionCount = document.getElementById('questionCount');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const resultDiv = document.getElementById('result');

function loadQuestion(index) {
  const q = quizData[index];

  // Escape HTML in question text
  questionText.innerHTML = `${index + 1}. ${escapeHTML(q.question)}`;

  // Escape HTML in options
  optionsContainer.innerHTML = q.options.map((opt, i) => `
    <div class="form-check">
      <input class="form-check-input" type="radio" 
        name="question${index}" 
        id="opt${index}_${i}" 
        value="${escapeHTML(opt)}" 
        ${selectedAnswers[index] === opt ? 'checked' : ''}>
      <label class="form-check-label" for="opt${index}_${i}">${escapeHTML(opt)}</label>
    </div>
  `).join('');

  // Update counter
  questionCount.textContent = `Question ${index + 1} of ${quizData.length}`;

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === quizData.length - 1 ? 'Submit' : 'Next';
}

function saveAnswer() {
  const selected = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
  if (selected) {
    selectedAnswers[currentQuestion] = selected.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }
}

function showResult() {
  let score = quizData.filter((q, i) => q.answer === selectedAnswers[i]).length;
  questionText.textContent = '';
  optionsContainer.innerHTML = '';
  questionCount.textContent = '';
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  resultDiv.textContent = `You scored ${score} out of ${quizData.length}`;
  resultDiv.classList.remove('d-none');
}

nextBtn.addEventListener('click', () => {
  saveAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    showResult();
  }
});

prevBtn.addEventListener('click', () => {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

// Start quiz
loadQuestion(currentQuestion);
