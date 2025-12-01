// Add this code block AT THE VERY TOP of your script.js

const SECRET_CODE = "100423"; 
let attemptCount = 0;
const gate = document.getElementById('password-gate');
const input = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-password');
const calendar = document.querySelector('.calendar-grid');
const errorMsg = document.getElementById('error-message');

submitBtn.addEventListener('click', checkPassword);
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-message');
    const gate = document.getElementById('password-gate'); // Assuming these are defined or available

    if (input.value.toLowerCase() === SECRET_CODE) {
        // ... (CORRECT PASSWORD LOGIC - Keep this as is) ...
        gate.style.display = 'none';
        calendar.style.display = 'grid'; 
        const audio = document.getElementById('background-music');
        if (audio) {
            audio.muted = false; 
            audio.play(); 
        }
        
    } else {
        // --- 🔑 INCORRECT PASSWORD LOGIC (UPDATED) 🔑 ---
        
        attemptCount++; // 👈 1. Increment the counter
        
        // Ensure the standard error message is visible
        errorMsg.classList.remove('hidden'); 
        
        // 2. Check if the limit has been reached
        if (attemptCount >= 3) {
            // Provide the hint!
            errorMsg.innerHTML = "That's not it! **HINT:** Think about our **favorite Christmas movie/song/memory** from last year.";
            
            // Optional: Prevent the error message from clearing itself next time
            // You might want to stop clearing the input field as well
            input.value = ''; 
        } else {
            // If it's the first or second attempt, just show the standard error
            errorMsg.innerHTML = "Incorrect code. Try again!"; // Reset the message if needed
            input.value = '';
        }
        
        // Optional: If you want to visually show attempts remaining:
        if (attemptCount < 3) {
            errorMsg.innerHTML += ` (Attempt ${attemptCount} of 3)`;
        }
    }
}

// 1. Get the current date
const now = new Date();

// *** TEST MODE ***
// If you want to test what it looks like on December 15th, 
// uncomment the line below (remove the //):
//const now = new Date("December 25, 2025");

const currentMonth = now.getMonth(); // 11 means December (0-indexed)
const currentDay = now.getDate(); // 1 through 31

// 2. Select all the doors in the HTML
const doors = document.querySelectorAll('.door');

// 3. Loop through each door to check if it should be locked
doors.forEach((door) => {
    const doorDay = parseInt(door.innerText);

    // LOGIC: Check if it is locked
    if (currentMonth < 11 || (currentMonth === 11 && currentDay < doorDay)) {
        
        // --- LOCKED LOGIC (Current) ---
        door.classList.add('locked');
        door.addEventListener('click', (e) => {
            e.preventDefault();
            door.style.animation = 'shake 0.3s ease-in-out';

            // Remove the animation after it finishes so it can be re-triggered
            setTimeout(() => {
                door.style.animation = '';
            }, 300);
            alert("You Rascal! No peeking until " + "December " + doorDay + "! 🎅");
        });
        
    } else {
        // --- 🌟 UNLOCKED ENHANCEMENT 🌟 ---
        // Change the text to encourage clicking!
        door.querySelector('.number').textContent = "🎁 Peek!"; 
        
        // You can use a specific message for Christmas Eve:
        if (doorDay === 24) {
            door.querySelector('.number').textContent = "🎅 CHRISTMAS EVE!";
        }
    }
});

