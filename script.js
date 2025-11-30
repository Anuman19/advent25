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
const now = new Date("December 15, 2025");

const currentMonth = now.getMonth(); // 11 means December (0-indexed)
const currentDay = now.getDate(); // 1 through 31

// 2. Select all the doors in the HTML
const doors = document.querySelectorAll('.door');

// 3. Loop through each door to check if it should be locked
doors.forEach((door) => {
    // Get the day number from the text inside the door (e.g., "1", "2")
    const doorDay = parseInt(door.innerText);

    // LOGIC:
    // If it is NOT December yet (month < 11), lock everything.
    // OR, if it IS December but the day hasn't happened yet.
    if (currentMonth < 11 || (currentMonth === 11 && currentDay < doorDay)) {
        
        // Add the 'locked' class (defined in your CSS) to change the look
        door.classList.add('locked');

        // Add a click event to stop the link from working
        door.addEventListener('click', (e) => {
            e.preventDefault(); // This stops the link from opening
            alert("Naughty! No peeking until " + "December " + doorDay + "! 🎅");
        });
    }
});