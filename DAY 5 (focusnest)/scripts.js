let currentAudio = null;

function playSound(type) {
  stopSound();
  currentAudio = new Audio(`assets/vibes/${type}.mp3`);
  currentAudio.loop = true;
  currentAudio.play();
}

function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function loadQuote() {
  fetch("assets/quotes.json")
    .then(res => res.json())
    .then(data => {
      const random = Math.floor(Math.random() * data.quotes.length);
      document.getElementById("quote").textContent = data.quotes[random];
    })
    .catch(err => console.log("Failed to load quotes", err));
}

loadQuote(); // load one on page load

// FOCUS TIMER
let totalTime = 25 * 60;
let timeLeft = totalTime;
let timerInterval;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  document.getElementById("progress-bar").style.width = `${progressPercent}%`;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval);
  }
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = totalTime;
  updateTimer();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
updateTimerDisplay();

// THEME TOGGLE
const toggle = document.getElementById('theme-toggle');
const modeLabel = document.getElementById('mode-label');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
  modeLabel.textContent = '🌙 Dark Mode';
} else {
  document.body.classList.add('light-mode');
  modeLabel.textContent = '🌞 Light Mode';
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.replace('light-mode', 'dark-mode');
    modeLabel.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.replace('dark-mode', 'light-mode');
    modeLabel.textContent = '🌞 Light Mode';
    localStorage.setItem('theme', 'light');
  }
});

// TO-DO LIST
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const btns = document.createElement("div");
    btns.className = "task-buttons";

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTask(index);

    btns.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(btns);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text: text, completed: false });
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

renderTasks();

// BACKGROUND SWITCHER
const backgrounds = [
  'assets/images/bg1.jpg',
  'assets/images/bg2.jpg',
  'assets/images/bg3.jpg'
];

let bgIndex = 0;

const savedBgIndex = localStorage.getItem('bgIndex');
if (savedBgIndex !== null) {
  bgIndex = Number(savedBgIndex);
  document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
}

function changeBackground() {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
  localStorage.setItem('bgIndex', bgIndex);
}

// DATE & TIME
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById("date").textContent = date;
  document.getElementById("time").textContent = time;
}

setInterval(updateDateTime, 1000);
updateDateTime();


// MOTIVATIONAL QUOTES
const quotes = [
  "Stay focused and never give up!",
  "Discipline is the bridge between goals and accomplishment.",
  "You don’t need motivation. You need discipline.",
  "Great things are done by a series of small things brought together.",
  "Focus on being productive, not busy.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You have the power to create, to grow, to push forward.",
  "The key to success is to start before you're ready.",
  "Every second you waste is a second you never get back.",
  "Do something today that your future self will thank you for.",
  "The secret of getting ahead is getting started.",
  "Your only limit is the discipline you build.",
  "Progress is progress, no matter how small.",
  "Consistency is more important than intensity.",
  "Don’t wait for the right mood. Just start.",
  "Small steps every day lead to big changes.",
  "Focus is the gateway to all thinking: perception, memory, learning, reasoning, and problem solving.",
  "Train your mind to focus on what matters most.",
  "You grow through what you go through.",
  "Dream big. Stay focused. Hustle smart."
];

let quoteIndex = 0;

function showQuote() {
  const quoteText = document.getElementById("quote-text");
  quoteText.classList.add("fade-quote");

  setTimeout(() => {
    quoteText.textContent = quotes[quoteIndex];
    quoteText.classList.remove("fade-quote");
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 600);
}

showQuote(); // Initial quote
// Optional auto update: setInterval(showQuote, 5000);
