
   
        // Background Animation
        function createBubbles() {
            const bgAnimation = document.getElementById('bgAnimation');
            const bubbleCount = window.innerWidth < 640 ? 10 : 20;

            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bg-bubble');

                const size = Math.random() * 50 + 20;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.animationDuration = `${Math.random() * 20 + 10}s`;
                bubble.style.animationDelay = `${Math.random() * 10}s`;

                bgAnimation.appendChild(bubble);
            }
        }

        createBubbles();
        window.addEventListener('resize', () => {
            const bgAnimation = document.getElementById('bgAnimation');
            bgAnimation.innerHTML = '';
            createBubbles();
        });

        // Previous JavaScript remains the same
    

   
        const prophetStories = {
            nuh: "Nabi Nuh membangun kapal besar untuk menyelamatkan keluarganya dan makhluk hidup dari banjir besar!",
            ibrahim: "Nabi Ibrahim selalu mencari kebenaran dan memiliki keberanian luar biasa!",
            musa: "Nabi Musa memiliki tongkat ajaib yang bisa berubah menjadi ular!",
            isa: "Nabi Isa bisa menyembuhkan orang sakit dengan izin Allah!",
            muhammad: "Nabi Muhammad adalah teladan terbaik, penuh kasih dan kebijaksanaan!"
        };

        document.querySelectorAll('.prophet-island').forEach(island => {
            island.addEventListener('click', () => {
                const prophetName = island.getAttribute('data-prophet');
                const treasureModal = document.getElementById('treasureModal');
                const prophetDetails = document.getElementById('prophetDetails');

                prophetDetails.innerHTML = `
                    <p class="text-lg">${prophetStories[prophetName]}</p>
                `;

                treasureModal.classList.remove('hidden');
                treasureModal.classList.add('flex');

                island.classList.add('animate-bounce');
                setTimeout(() => island.classList.remove('animate-bounce'), 1000);
            });
        });

        document.getElementById('closeTreasure').addEventListener('click', () => {
            const treasureModal = document.getElementById('treasureModal');
            treasureModal.classList.remove('flex');
            treasureModal.classList.add('hidden');
        });

        // Navigation Logic
        const mainContent = document.getElementById('mainContent');
        const profileContent = document.getElementById('profileContent');
        const homeNav = document.getElementById('homeNav');
        const profileNav = document.getElementById('profileNav');

        homeNav.addEventListener('click', () => {
            mainContent.classList.remove('hidden');
            profileContent.classList.add('hidden');
        });

        profileNav.addEventListener('click', () => {
            mainContent.classList.add('hidden');
            profileContent.classList.remove('hidden');
        });