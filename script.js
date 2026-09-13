const guides = {
    economy: {
        title: "Основи економіки в CS2",
        text: "Правильне керування грошима — запорука перемоги команди.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        points: [
            "Пістолетний раунд: Купуйте броню або defuse kit (набір сапера).",
            "Еко-раунд: Не витрачайте кошти у разі поразки в пістолетному раунді.",
            "Форс-бай: Ризикована купівля на залишки грошей.",
            "Повний бай: Гвинтівка + повна броня + гранати."
        ]
    },
    nades: {
        title: "Використання гранат (Utility)",
        text: "Граната в руках досвідченого гравця сильніша за кулю.",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
        points: [
            "Дими (Smoke): Перекривають огляд снайперам та іншим гравцям.",
            "Світлові (Flashbang): Осліплюють ворогів; відвертайтесь від них.",
            "Фугасні (HE): Завдають прямої шкоди скупченням.",
            "Молотов: Зупиняє агресивний напад супротивника."
        ]
    },
    aim: {
        title: "Стрільба та прицілювання (Aim)",
        text: "В CS2 вирішує точність першого пострілу та контроль віддачі.",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
        points: [
            "Завжди тримайте приціл на рівні голови.",
            "Зупиняйтесь перед кожним пострілом.",
            "Контролюйте віддачу перших куль.",
            "Практикуйтесь на десматчі щодня."
        ]
    }
};

const quizData = [
    {
        question: "Що найкраще купувати у стандартному пістолетному раунді?",
        options: ["Тільки дезерт игл", "Броню або набір сапера з гранатами", "Нічого не купувати"],
        correct: 1
    },
    {
        question: "Куди радять завжди тримати приціл у CS2?",
        options: ["У підлогу", "У небо", "На рівні голови ворога"],
        correct: 2
    },
    {
        question: "Що робить димова граната (Smoke)?",
        options: ["Завдає шкоди ворогам", "Перекриває огляд супротивникам", "Збільшує швидкість бігу"],
        correct: 1
    }
];

let currentQuiz = 0;
let viewedGuides = new Set();
let currentMode = 'login';

function showGuide(category, element = null) {
    const contentBox = document.getElementById("guide-content");
    const data = guides[category];

    let pointsHTML = "";
    data.points.forEach(point => {
        pointsHTML += `<li>${point}</li>`;
    });

    contentBox.innerHTML = `
        <div class="guide-grid">
            <img src="${data.image}" alt="${data.title}" class="guide-image">
            <div>
                <h2>${data.title}</h2>
                <p style="margin-bottom: 1rem;">${data.text}</p>
                <ul>${pointsHTML}</ul>
            </div>
        </div>
    `;

    const buttons = document.querySelectorAll(".menu-nav .nav-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    if (element) {
        element.classList.add("active");
    } else {
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.add("active");
            }
        });
    }

    viewedGuides.add(category);
    document.getElementById("progress-text").innerText = `Вивчено гайдів: ${viewedGuides.size} / 3`;
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
        body.classList.replace("dark-theme", "light-theme");
    } else {
        body.classList.replace("light-theme", "dark-theme");
    }
}

function checkBuyStatus() {
    const money = parseInt(document.getElementById("teamMoney").value);
    const resultBox = document.getElementById("calcResult");

    if (isNaN(money)) {
        resultBox.innerText = "Будь ласка, введіть числове значення!";
        resultBox.style.color = "#e53e3e";
        return;
    }

    if (money < 2000) {
        resultBox.innerText = "🔴 Еко-раунд! Купуйте лише пістолети або нічого.";
        resultBox.style.color = "#e53e3e";
    } else if (money >= 2000 && money < 3900) {
        resultBox.innerText = "🟡 Форс-бай / напів-бай. Можна взяти SMG та броню без шолома.";
        resultBox.style.color = "#d69e2e";
    } else {
        resultBox.innerText = "🟢 Повний бай (Full-buy)! Доступна штурмова гвинтівка та повна амуніція.";
        resultBox.style.color = "#38a169";
    }
}

function loadQuiz() {
    const qData = quizData[currentQuiz];
    document.getElementById("quiz-question").innerText = `Питання ${currentQuiz + 1}: ${qData.question}`;
    
    const optionsBox = document.getElementById("quiz-options");
    optionsBox.innerHTML = "";
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(index);
        optionsBox.appendChild(btn);
    });
    
    document.getElementById("quiz-result").innerText = "";
}

function selectAnswer(selectedIndex) {
    const qData = quizData[currentQuiz];
    const resultBox = document.getElementById("quiz-result");
    
    if (selectedIndex === qData.correct) {
        resultBox.innerText = "✅ Вірно! Чудова робота.";
        resultBox.style.color = "#38a169";
        setTimeout(() => {
            currentQuiz = (currentQuiz + 1) % quizData.length;
            loadQuiz();
        }, 1500);
    } else {
        resultBox.innerText = "❌ Неправильно. Спробуй ще раз!";
        resultBox.style.color = "#e53e3e";
    }
}

// Оновлення хедера (або кнопки входу, або аватарка профілю)
function updateHeaderAuth() {
    const controls = document.getElementById("header-controls");
    const loggedUser = localStorage.getItem('loggedUser');
    const userAvatar = localStorage.getItem('userAvatar') || 'https://api.dicebear.com/7.x/bottts/svg?seed=counter1';

    if (loggedUser) {
        controls.innerHTML = `
            <div class="user-profile-badge" onclick="openProfileModal()">
                <img src="${userAvatar}" class="header-avatar">
                <span style="font-weight: 600; font-size: 0.9rem;">${loggedUser}</span>
            </div>
            <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
        `;
    } else {
        controls.innerHTML = `
            <button class="nav-btn-header" onclick="openModal('login')">Увійти</button>
            <button class="nav-btn-header accent-btn" onclick="openModal('register')">Зареєструватись</button>
            <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
        `;
    }
}

function openModal(mode) {
    currentMode = mode;
    document.getElementById("auth-modal").style.display = "flex";
    document.getElementById("auth-username").value = "";
    document.getElementById("auth-password").value = "";
    document.getElementById("auth-msg").innerText = "";

    const titleEl = document.getElementById("modal-title");
    const btnEl = document.getElementById("modal-submit-btn");

    if (mode === 'login') {
        titleEl.innerText = "Вхід у систему";
        btnEl.innerText = "Увійти";
    } else {
        titleEl.innerText = "Реєстрація акаунта";
        btnEl.innerText = "Зареєструватись";
    }
}

function closeModal() {
    document.getElementById("auth-modal").style.display = "none";
}

function openProfileModal() {
    const loggedUser = localStorage.getItem('loggedUser');
    document.getElementById("profile-username-display").innerText = `Акаунт: ${loggedUser}`;
    document.getElementById("profile-modal").style.display = "flex";
}

function closeProfileModal() {
    document.getElementById("profile-modal").style.display = "none";
}

function selectAvatar(avatarUrl) {
    localStorage.setItem('userAvatar', avatarUrl);
    closeProfileModal();
    updateHeaderAuth();
}

function logoutUser() {
    localStorage.removeItem('loggedUser');
    closeProfileModal();
    updateHeaderAuth();
}

function handleAuth() {
    const username = document.getElementById("auth-username").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const msgBox = document.getElementById("auth-msg");

    if (!username || !password) {
        msgBox.innerText = "❌ Заповніть усі поля!";
        msgBox.style.color = "#e53e3e";
        return;
    }

    if (currentMode === 'register') {
        localStorage.setItem('savedUser', username);
        localStorage.setItem('savedPass', password);
        localStorage.setItem('userAvatar', 'https://api.dicebear.com/7.x/bottts/svg?seed=' + username);

        msgBox.innerText = `✅ Успішна реєстрація, ${username}! Тепер увійдіть.`;
        msgBox.style.color = "#38a169";
        
        setTimeout(() => {
            openModal('login');
            document.getElementById("auth-username").value = username;
        }, 1500);
    } else {
        const savedUser = localStorage.getItem('savedUser');
        const savedPass = localStorage.getItem('savedPass');

        if (!savedUser) {
            msgBox.innerText = "❌ Акаунт не знайдено! Спершу зареєструйтесь.";
            msgBox.style.color = "#e53e3e";
            return;
        }

        if (username === savedUser && password === savedPass) {
            localStorage.setItem('loggedUser', username);
            msgBox.innerText = `✅ Вітаємо, ${username}!`;
            msgBox.style.color = "#38a169";
            setTimeout(() => {
                closeModal();
                updateHeaderAuth();
            }, 1000);
        } else {
            msgBox.innerText = "❌ Неправильний логін або пароль!";
            msgBox.style.color = "#e53e3e";
        }
    }
}

window.onload = function() {
    showGuide('economy');
    loadQuiz();
    updateHeaderAuth();
};
