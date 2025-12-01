document.addEventListener('DOMContentLoaded', () => {
    // Select all the titles that need click functionality
    const titles = document.querySelectorAll('.reason-title');

    titles.forEach(title => {
        title.addEventListener('click', () => {
            // Select the description (<p>) which is the next sibling element
            const description = title.nextElementSibling;
            
            // Select the toggle icon (the <span> with +/-)
            const icon = title.querySelector('.toggle-icon');

            // --- Toggle Visibility using CSS Classes ---
            
            // Check if the description is currently visible (has the 'show' class)
            const isVisible = description.classList.contains('hiden');

            // Use the 'show' class to control the animated max-height and opacity
            if (isVisible) {
                description.classList.remove('hidden');
                icon.textContent = '+';
            } else {
                description.classList.add('hidden');
                icon.textContent = '-';
            }
        });
    });
});