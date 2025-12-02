// Add this code block AT THE VERY TOP of your script.js
const dailyData = [
    { id: 2, password: "burgdorf", hint: "That's not it! Where our love journey began... ❤️" },
    { id: 3, password: "milano", hint: "A trip by train🚂." },
    { id: 4, password: "sushi", hint: "Our favorite food 🍣." },
    { id: 5, password: "alicante", hint: "Our first trip together ✈️." },
    { id: 6, password: "anirudh", hint: "Our first concert together 🎵." },
    { id: 7, password: "hindelbank", hint: "Our secret getaway spot." },
    { id: 8, password: "arnensee", hint: "A mountain lake we love.. 🏞️." },
    { id: 9, password: "290523", hint: "Our special date ❤️." },
    { id: 10, password: "enidhayam", hint: "Our song 🎶." },
    { id: 11, password: "zagreb", hint: "A cold winter trip ❄️." },
    { id: 12, password: "paris", hint: "The city of love 💕." },
    { id: 13, password: "disneyland", hint: "Your dream come true place 🏰." },
    { id: 14, password: "kopenhagen", hint: "A trip to kopppan..." },
    { id: 15, password: "athens", hint: "Lasagne is better than moussaka 🍝." },
    { id: 16, password: "rolls", hint: "Your first promise to me..." },
    { id: 17, password: "audi", hint: "Our special car 🚗." },
    { id: 18, password: "graduado", hint: "Our first achievement together 🎓." },
    { id: 19, password: "prague", hint: "Gulash and a dancing house 🏰." },
    { id: 20, password: "colmar", hint: "A christmas market to remember 🎄." },
    { id: 21, password: "strassburg", hint: "Another christmas market 🎅." },
    { id: 22, password: "montreux", hint: "Another christmas market 🎁." },
    { id: 23, password: "mulhouse", hint: "The best buffet ever 🍽️." },
    { id: 24, password: "goldenheart", hint: "The reason I love you ❤️." },
];

// --- 1. GLOBAL CONFIGURATION & DATE ---
// Create the date object once to be used everywhere
//const today = new Date();
// *** TEST MODE: Uncomment below to test specific dates ***
const today = new Date("December 15, 2025"); 

const currentMonth = today.getMonth(); // 11 = December
const currentDay = today.getDate();

// --- 2. DOM ELEMENT CACHING ---
// Select elements once here, not inside functions (better performance)
const elements = {
    gate: document.getElementById('password-gate'),
    input: document.getElementById('password-input'),
    submitBtn: document.getElementById('submit-password'),
    calendar: document.querySelector('.calendar-grid'),
    errorMsg: document.getElementById('error-message'),
    bgMusic: document.getElementById('background-music'),
    doors: document.querySelectorAll('.door')
};

// --- 3. PASSWORD LOGIC INITIALIZATION ---
// Calculate today's password and hint immediately
const dailyEntry = dailyData.find(item => item.id === currentDay) || {
    password: "100423", // Default/Fallback password
    hint: "The special event is over! 🎉"
};

const SECRET_CODE = dailyEntry.password.toLowerCase();
const DAILY_HINT = dailyEntry.hint;
let attemptCount = 0;

// --- 4. EVENT LISTENERS ---
if (elements.submitBtn) {
    elements.submitBtn.addEventListener('click', checkPassword);
}

if (elements.input) {
    elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
}

// --- 5. FUNCTIONS ---

function checkPassword() {
    // .trim() removes accidental spaces at start/end
    const userGuess = elements.input.value.trim().toLowerCase();

    if (userGuess === SECRET_CODE) {
        // ✅ SUCCESS
        elements.gate.style.display = 'none';
        elements.calendar.style.display = 'grid';

        if (elements.bgMusic) {
            elements.bgMusic.muted = false;
            elements.bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        }
    } else {
        // ❌ FAILURE
        handleIncorrectPassword();
    }
}

function handleIncorrectPassword() {
    attemptCount++;
    elements.errorMsg.classList.remove('hidden');

    if (attemptCount >= 3) {
        // Show Hint
        elements.errorMsg.innerHTML = `That's not it!<br><strong>Hint:</strong> ${DAILY_HINT}`;
        elements.input.value = ''; // Clear input
    } else {
        // Show Standard Error
        elements.errorMsg.innerHTML = "Incorrect code. Try again!";
        elements.input.value = '';

        // Add attempt counter
        if (attemptCount < 3) {
            elements.errorMsg.innerHTML += ` <span style="font-size:0.8em opacity:0.8">(Attempt ${attemptCount}/3)</span>`;
        }
    }
}

// --- 6. DOOR LOGIC ---
elements.doors.forEach((door) => {
    // Try to get day from data attribute first (best practice), fallback to text
    const doorDay = parseInt(door.dataset.day || door.innerText);
    const numberDisplay = door.querySelector('.number');

    // CHECK: Is this door in the future?
    // It is locked if: Month is before Dec OR (Month is Dec AND Day is before today)
    const isLocked = currentMonth < 11 || (currentMonth === 11 && currentDay < doorDay);

    if (isLocked) {
        // 🔒 LOCKED
        door.classList.add('locked');
        door.addEventListener('click', (e) => {
            e.preventDefault();

            // Trigger Shake Animation
            door.style.animation = 'none'; // Reset animation
            door.offsetHeight; // Trigger reflow (magic CSS hack to restart animation)
            door.style.animation = 'shake 0.3s ease-in-out';

            alert(`You Rascal! No peeking until December ${doorDay}! 🎅`);
        });
    } else {
        // 🔓 UNLOCKED
        if (numberDisplay) {
            if (doorDay === 24) {
                numberDisplay.textContent = "🎅 X-MAS!";
            } else {
                numberDisplay.textContent = "🎁 Peek!";
            }
        }
    }
});