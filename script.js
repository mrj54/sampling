// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    let isMenuOpen = false;
    
    menuBtn?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.right = '1rem';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '0.5rem';
            navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navLinks.style.display = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.menu-btn') && !e.target.closest('.nav-links')) {
            isMenuOpen = false;
            navLinks.style.display = '';
        }
    });

    // Navigation buttons functionality
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Search icon functionality
    const searchIcon = document.querySelector('.nav-icons svg:first-child');
    searchIcon?.addEventListener('click', () => {
        alert('Fitur pencarian akan segera hadir!');
    });

    // Notification icon functionality
    const notifIcon = document.querySelector('.nav-icons svg:nth-child(2)');
    notifIcon?.addEventListener('click', () => {
        alert('Tidak ada notifikasi baru');
    });

    // Profile image functionality
    const profileImg = document.querySelector('.profile-img');
    profileImg?.addEventListener('click', () => {
        alert('Menu profil akan segera hadir!');
    });

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
});