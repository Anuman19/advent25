// Add this code block AT THE VERY TOP of your script.js

const SECRET_CODE = "100423"; 
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
    if (input.value.toLowerCase() === SECRET_CODE) {
        // Correct password: Hide gate, show calendar
        gate.style.display = 'none';
        calendar.style.display = 'grid'; // Use 'grid' to match CSS display setting
        // Proceed with the rest of the calendar logic (which is already below this function)
        const audio = document.getElementById('background-music');
        if (audio) {
            audio.muted = false; // Set muted property to false
            audio.play();        // Ensure it starts playing right away
        }
    } else {
        // Incorrect password: Show error
        errorMsg.classList.remove('hidden');
        input.value = ''; // Clear the input field
    }
}

// 1. Get the current date
//const now = new Date();

// *** TEST MODE ***
// If you want to test what it looks like on December 15th, 
// uncomment the line below (remove the //):
const now = new Date("December 25, 2025");

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

