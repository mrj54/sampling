     function toggleLeaderboard() {
     const leaderboardModal = document.getElementById("leaderboardModal");
            leaderboardModal.classList.toggle("hidden");
        }

        // Function to start the game with the entered username
        function startGameWithUsername() {
            const usernameInput = document.getElementById("usernameInput").value;
            if (usernameInput.trim()) {
                document.getElementById("usernameModal").classList.add("hidden");
                // Initialize game with username (e.g., save username, load game content)
            } else {
                alert("Masukkan nama untuk memulai!");
            }
        }

        // Function to update leaderboard content dynamically
        function updateLeaderboard() {
            const leaderboardList = document.getElementById("leaderboardList");
            // const leaderboardData = [
            //     { username: "Alice", level: 5, score: 150 },
            //     { username: "Bob", level: 4, score: 120 },
            //     { username: "Charlie", level: 3, score: 90 },
            //     { username: "Dave", level: 2, score: 70 },
            // ];
            const leaderboardData = JSON.parse(localStorage.getItem('quizHistory')) || [];

            leaderboardList.innerHTML = ''; // Clear previous leaderboard items

            let count = 0;
            let level = 5;
            let username = []
            leaderboardData.sort((a, b) => b.score - a.score)
            leaderboardData.forEach((entry, index) => {
                const hours = new Date().getHours()
                const minutes = new Date().getMinutes()
                const checkExpired = hours
                if ( !username.includes(localStorage.getItem('username')) && level > 0 ) {
                    const medalClass = count < 3 ? `medal-${count + 1}` : 'bg-gray-100';
    
                    const item = document.createElement('div');
                    item.className = `leaderboard-item flex items-center p-3 sm:p-4 rounded-xl ${medalClass}`;
                    item.innerHTML = `
                        <div class="flex-none w-6 sm:w-8 text-xl sm:text-2xl font-bold ${count < 3 ? 'text-white' : 'text-gray-600'}">
                            ${count + 1}
                        </div>
                        <div class="flex-grow">
                            <div class="font-bold text-sm sm:text-base ${count < 3 ? 'text-white' : 'text-gray-800'}">${entry.username}</div>
                            <div class="text-xs sm:text-sm ${count < 3 ? 'text-white' : 'text-gray-600'}">Level ${level}</div>
                        </div>
                        <div class="flex-none text-right">
                            <div class="font-bold text-sm sm:text-base ${count < 3 ? 'text-white' : 'text-gray-800'}">${entry.score}</div>
                            <div class="text-xs sm:text-sm ${count < 3 ? 'text-white' : 'text-gray-600'}">bintang</div>
                        </div>
                    `;
                    leaderboardList.appendChild(item);
    
                    // Animation
                    gsap.from(item, {
                        opacity: 0,
                        x: -20,
                        duration: 0.5,
                        delay: count * 0.1
                    });
                    count += 1
                    level -= 1
                }
            });
        }

        // Initialize leaderboard on page load
        document.addEventListener("DOMContentLoaded", () => {
            updateLeaderboard();
        });