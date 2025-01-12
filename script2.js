// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelector('.nav-items');

menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const materiCards = document.querySelectorAll('.materi-card');

function searchMateri() {
    const searchTerm = searchInput.value.toLowerCase();
    
    materiCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', searchMateri);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchMateri();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navItems.contains(e.target) && !menuToggle.contains(e.target)) {
        navItems.classList.remove('active');
    }
});