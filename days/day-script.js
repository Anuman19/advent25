function typeMessage() {
    const audio = document.getElementById('background-music');
        if (audio) {
            audio.muted = true; // Set muted property to false
            audio.pause();        // Ensure it starts playing right away
        }
    const music = document.getElementById('music');
        if (music) {
            music.muted = false; // Set muted property to false
            music.play();        // Ensure it starts playing right away
        }
    const messageElement = document.getElementById('message');
    const fullText = messageElement.textContent.trim();
    messageElement.textContent = ''; // Clear text initially

    let i = 0;
    function typing() {
        if (i < fullText.length) {
            messageElement.textContent += fullText.charAt(i);
            i++;
            setTimeout(typing, 30); // Adjust speed (e.g., 50ms)
        }
    }
    typing();
}

// Start the effect once the page loads
window.onload = typeMessage;