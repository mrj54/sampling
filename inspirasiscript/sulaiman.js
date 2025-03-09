 const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            if (isDark) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.removeItem('theme');
            }
        });

        // Story Chapter Buttons
        const chapterButtons = document.querySelectorAll('.chapter-btn');
        let activeTimeout;

        chapterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Hide all bubbles first
                document.querySelectorAll('.bubble-chat').forEach(bubble => {
                    bubble.classList.remove('show');
                });

                // Clear any existing timeout
                if (activeTimeout) {
                    clearTimeout(activeTimeout);
                }

                // Show the corresponding bubble
                const story = button.getAttribute('data-story');
                const chapter = button.getAttribute('data-chapter');
                const bubbleId = `${story}-${chapter}-bubble`;
                const bubble = document.getElementById(bubbleId);

                if (bubble) {
                    bubble.classList.add('show');

                    // Hide the bubble after 3 seconds
                    activeTimeout = setTimeout(() => {
                        bubble.classList.remove('show');
                    }, 3000);
                }
            });
        });