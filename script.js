document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            type: "multiple",
            question: "Kumpulan uap air di langit dinamakan...",
            options: ["Pelangi", "Udara", "Awan", "Angin"],
            answer: "Awan",
            score: 5
        },
        {
            type: "multiple",
            question: "Ketika langit terlihat terang berwarna biru maka cuaca dalam keadaan...",
            options: ["Gelap", "Hujan", "Cerah", "Mendung"],
            answer: "Cerah",
            score: 5
        },
        {
            type: "multiple",
            question: "Salah satu faktor utama yang mengakibatkan cuaca terasa gerah yaitu...",
            options: ["Api", "Sinar matahari", "Asap knalpot", "Kompor gas"],
            answer: "Sinar matahari",
            score: 5
        },
        {
            type: "multiple",
            question: "Saat di langit ada kumpulan awan yang banyak dan tebal maka kemungkinan akan terjadi...",
            options: ["Hujan", "Panas", "Angin", "Pelangi"],
            answer: "Hujan",
            score: 5
        },
        {
            type: "multiple",
            question: "Mengapa ketika turun hujan terkadang diiringi oleh guntur atau petir...",
            options: ["Karena awan mengandung petir", "Karena awan mengandung muatan listrik", "Karena awan mengandung angin", "Karena awan yang bertabrakan"],
            answer: "Karena awan mengandung muatan listrik",
            score: 5
        },
        {
            type: "multiple",
            question: "Angin maritim yaitu angin yang bergerak...",
            options: ["Dari maritim ke darat", "Dari maritim ke laut", "Dari darat ke laut", "Dari darat ke darat"],
            answer: "Dari maritim ke darat",
            score: 5
        },
        {
            type: "multiple",
            question: "Nama forum yang bertugas memperkirakan keadaan cuaca yaitu...",
            options: ["Badan Pusat Statistik (BPS)", "Badan Meteorologi Klimatologi dan Geofisika (BMKG)", "Badan Pengamat Cuaca (BPC)", "Badan Informasi Cuaca (BIC)"],
            answer: "Badan Meteorologi Klimatologi dan Geofisika (BMKG)",
            score: 5
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timeLimit = 30;
    let playerName = "";  

   function startQuiz() {
        playerName = document.getElementById("name").value;

        if (!playerName) {
            alert("Please enter your name to start the quiz.");
            return;
        }

        showSection("quiz");
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(sectionId).style.display = "block";
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        document.getElementById("question-text").innerText = question.question;
        let optionsHtml = "";
        question.options.forEach(option => {
            optionsHtml += `<label><input type="radio" name="answer" value="${option}"> ${option}</label><br>`;
        });
        document.getElementById("answer-options").innerHTML = optionsHtml;

        document.getElementById("current-question").innerText = currentQuestionIndex + 1;
        document.getElementById("total-questions").innerText = questions.length;

        startTimer();
    }

    function startTimer() {
        let timeLeft = timeLimit;
        document.getElementById("time-left").innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("time-left").innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function checkAnswer() {
        const question = questions[currentQuestionIndex];
        const userAnswer = document.querySelector('input[name="answer"]:checked');
        if (userAnswer && userAnswer.value === question.answer) {
            score += question.score;
        }
    }

    function nextQuestion() {
        clearInterval(timer);
        checkAnswer();

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        document.getElementById("player-name").innerText = playerName; 
        document.getElementById("player-score").innerText = score;
        showSection("result");
    }

    function resetQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        showSection("home");
    }

    window.startQuiz = startQuiz;
    window.nextQuestion = nextQuestion;
    window.resetQuiz = resetQuiz;

    showSection("home");
});
