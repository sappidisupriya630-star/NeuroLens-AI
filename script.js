let category = "";
let currentQuestion = 0;
let answers = [];

const questions = {
    career: [
        "Do you enjoy solving logical problems?",
        "Do you like working with computers?",
        "Do you prefer creativity over analysis?",
        "Do you like helping people?",
        "Do you enjoy learning new technologies?"
    ],
    movie: [
        "Do you like action scenes?",
        "Do you enjoy emotional stories?",
        "Do you like sci-fi concepts?",
        "Do you prefer comedy?",
        "Do you like thrill?"
    ],
    food: [
        "Do you like spicy food?",
        "Do you enjoy fast food?",
        "Do you like trying new cuisines?",
        "Do you prefer healthy food?",
        "Do you like sweets?"
    ]
};

function start(cat) {
    category = cat;
    currentQuestion = 0;
    answers = [];

    document.getElementById("categoryBox").classList.add("hidden");
    document.getElementById("questionBox").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    document.getElementById("questionText").innerText =
        questions[category][currentQuestion];

    document.getElementById("progress").innerText =
        `Question ${currentQuestion + 1} of ${questions[category].length}`;
}

function answer(ans) {
    answers.push(ans);
    currentQuestion++;

    if (currentQuestion < questions[category].length) {
        showQuestion();
    } else {
        showResult();
    }
}

/* Typing Effect */
function typeEffect(element, text, speed = 35) {
    element.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

/* Loading Animation */
function loadingAnimation() {
    const el = document.getElementById("loading");
    let dots = 0;

    return setInterval(() => {
        dots = (dots + 1) % 4;
        el.innerText = "Analyzing neural patterns" + ".".repeat(dots);
    }, 400);
}

function showResult() {
    document.getElementById("questionBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    const interval = loadingAnimation();

    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("loading").innerText = "";

        let resultText = "";
        let confidence = Math.floor(Math.random() * 20) + 80;

        if (category === "career") {
            resultText = (answers[0] === "yes" && answers[1] === "yes")
                ? "You are thinking about becoming a Software Developer 💻"
                : "You are thinking about a creative or people-oriented career 🎨";
        }

        if (category === "movie") {
            resultText = (answers[0] === "yes" && answers[2] === "yes")
                ? "You are thinking about a Sci-Fi Action Movie 🚀"
                : "You are thinking about an emotional or comedy movie 🎭";
        }

        if (category === "food") {
            resultText = (answers[0] === "yes")
                ? "You are thinking about spicy Indian food 🌶️"
                : "You are thinking about something light and healthy 🥗";
        }

        typeEffect(document.getElementById("result"), resultText);

        document.getElementById("confidence").innerText =
            "Confidence Level: " + confidence + "%";

    }, 2500);
}
