// script.js

// script.js

// Daftar soal
let questions = [
    { type: "multiple", question: "Apa yang dimaksud dengan perubahan iklim?", options: ["Perubahan cuaca harian yang terjadi dalam satu minggu", "Perubahan pola cuaca yang terjadi dalam jangka waktu yang lama", "Perubahan musim yang terjadi setiap tahun"], answer: "Perubahan pola cuaca yang terjadi dalam jangka waktu yang lama", score: 5 },
    { type: "multiple", question: "Gas rumah kaca yang paling berkontribusi terhadap pemanasan global adalah:", options: ["Nitrogen", "Oksigen", "Karbon dioksida"], answer: "Karbon dioksida", score: 5 },
    { type: "multiple", question: "Aktivitas manusia yang paling berpengaruh pada peningkatan gas rumah kaca adalah:", options: ["Penggunaan energi terbarukan", "Penggunaan kendaraan bermotor", "Penanaman pohon"], answer: "Penggunaan kendaraan bermotor", score: 5 },
    { type: "multiple", question: "Apa dampak utama dari pemanasan global terhadap lautan?", options: ["Meningkatnya kadar oksigen dalam air laut", "Naiknya permukaan air laut", "Meningkatnya populasi ikan di laut"], answer: "Naiknya permukaan air laut", score: 5 },
    { type: "multiple", question: "Apa yang dimaksud dengan efek rumah kaca?", options: ["Proses di mana radiasi matahari terpantul kembali oleh permukaan bumi", "Proses penyerapan panas oleh gas-gas atmosfer yang membuat bumi tetap hangat", "Proses di mana sinar matahari menghilang di atmosfer"], answer: "Proses penyerapan panas oleh gas-gas atmosfer yang membuat bumi tetap hangat", score: 5 },
    { type: "multiple", question: "Penebangan hutan dapat memperburuk perubahan iklim karena:", options: ["Mengurangi jumlah air di atmosfer", "Mengurangi jumlah pohon yang menyerap karbon dioksida", "Meningkatkan kelembapan udara"], answer: "Mengurangi jumlah pohon yang menyerap karbon dioksida", score: 5 },
    { type: "multiple", question: "Salah satu upaya mengurangi dampak perubahan iklim adalah:", options: ["Menggunakan plastik sekali pakai", "Meningkatkan penggunaan energi fosil", "Menggunakan energi terbarukan"], answer: "Menggunakan energi terbarukan", score: 5 },
    { type: "multiple", question: "Hujan asam sering kali diakibatkan oleh polusi dari:", options: ["Karbon dioksida dan uap air", "Nitrogen dioksida dan sulfur dioksida", "Metana dan karbon monoksida"], answer: "Nitrogen dioksida dan sulfur dioksida", score: 5 },
    { type: "multiple", question: "Kebakaran hutan sering terjadi di wilayah dengan iklim:", options: ["Tropis dan basah", "Panas dan kering", "Dingin dan lembap"], answer: "Panas dan kering", score: 5 },
    { type: "multiple", question: "Lembaga internasional yang bertugas mengkaji ilmu tentang perubahan iklim adalah:", options: ["WHO", "IPCC", "UNESCO"], answer: "IPCC", score: 5 }
];

let currentQuestionIndex = 0;
let score = 0;
let playerData = {};
let timer;

// Fungsi untuk menampilkan halaman tertentu
function showPage(pageId) {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("data-page").style.display = "none";
    document.getElementById("quiz-page").style.display = "none";
    document.getElementById("result-page").style.display = "none";
    document.getElementById(pageId).style.display = "block";
}

// Fungsi untuk memulai quiz dan menyimpan data pemain
function startQuiz() {
    playerData.name = document.getElementById("name").value;
    playerData.nim = document.getElementById("nim").value;
    showPage("quiz-page");
    loadQuestion();
}

// Fungsi untuk menampilkan soal saat ini
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.question;

    // Menampilkan opsi jawaban atau input text
    let optionsHtml = "";
    if (question.type === "multiple") {
        question.options.forEach(option => {
            optionsHtml += `<input type="radio" name="answer" value="${option}"> ${option}<br>`;
        });
    } else {
        optionsHtml = `<input type="text" id="answer" placeholder="Your answer">`;
    }
    document.getElementById("answer-options").innerHTML = optionsHtml;

    document.getElementById("completed-count").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions").innerText = questions.length;
    startTimer();
}

// Fungsi untuk mengecek jawaban dan menambah skor
function checkAnswer() {
    const question = questions[currentQuestionIndex];
    let userAnswer;
    if (question.type === "multiple") {
        userAnswer = document.querySelector('input[name="answer"]:checked');
        if (userAnswer && userAnswer.value === question.answer) {
            score += question.score;
        }
    } else {
        userAnswer = document.getElementById("answer").value;
        if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
            score += question.score;
        }
    }
}

// Fungsi untuk navigasi ke soal berikutnya atau menampilkan hasil
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

// Fungsi untuk menampilkan hasil
function showResult() {
    document.getElementById("player-name").innerText = playerData.name;
    document.getElementById("player-nim").innerText = playerData.nim;
    document.getElementById("total-score").innerText = score;
    showPage("result-page");
}

// Fungsi untuk memulai timer 30 detik per soal
function startTimer() {
    let timeLeft = 30;
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

// Fungsi untuk reset quiz
function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showPage("home-page");
}