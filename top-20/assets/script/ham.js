var hamButton = document.querySelector('#ham-icon');
var navLinks = document.querySelector('#nav-links');

function toggleNav() {
    if (window.innerWidth >= 868) {
        // Check if the screen size is normal (e.g., width >= 768px)
        navLinks.style.display = 'block'; // Display the navigation links
    } else {
        // For smaller screens, toggle the navigation links
        if (navLinks.style.display === 'block') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'block';
        }
    }
}

// Initial call to set the initial state based on screen size
toggleNav();

hamButton.addEventListener('click', toggleNav);

// Listen for window resize events
window.addEventListener('resize', toggleNav);