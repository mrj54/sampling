const stories = [
    {
        title: "NABI AYYUB A.S",
        image: "../main.image/ayyub sakit.jpg",
        gradient: "from-blue-50 to-blue-100",
        hoverGradient: "hover:from-blue-100 hover:to-blue-200",
        emoji: "📗",
        desc: "Kisah Kesabaran",
        link: "../inspirasihtml/yakub.html"  // Perbaikan di sini
    },

    {
        title: "NABI HARUN A.S",
        image: "../main.image/harun dakwah.jpg",
        gradient: "from-emerald-50 to-emerald-100",
        hoverGradient: "hover:from-emerald-100 hover:to-emerald-200",
        emoji: "📘",
        desc: "Kisah Persaudaraan",
        link: "../inspirasihtml/harun.html"
    },
    {
        title: "NABI MUSA A.S ",
        image: "../main.image/air batu.jpg",
        gradient: "from-amber-50 to-amber-100",
        hoverGradient: "hover:from-amber-100 hover:to-amber-200",
        emoji: "📙",
        desc: "Kisah Keberanian",
        link: "../inspirasihtml/musa.html"
    },
    {
        title: "NABI SULAIMAN A.S",
        image: "../main.image/burung 2.jpg",
        gradient: "from-violet-50 to-violet-100",
        hoverGradient: "hover:from-violet-100 hover:to-violet-200",
        emoji: "📕",
        desc: "Kebijaksanaan",
        link: "../inspirasihtml/sulaiman.html"
    }
];

function createStoryCard(story, index) {
    const delay = index * 100;
    return `
        <div class="opacity-0 transform translate-y-8" 
             style="animation: fadeInUp 0.8s ease forwards ${delay}ms">
            <a href=${story.link} class="card-hover w-full bg-gradient-to-br ${story.gradient} ${story.hoverGradient} 
                         rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 shadow-lg">
                <div class="relative group">
                    <div class="absolute inset-0 bg-white rounded-lg md:rounded-xl transform rotate-6 opacity-0 
                              group-hover:opacity-100 transition-all duration-300"></div>
                    <img src="${story.image}" alt="${story.title}" 
                         class="mobile-card-image w-16 h-16 md:w-28 md:h-28 rounded-lg md:rounded-xl object-cover relative z-10">
                </div>
                <div class="text-center space-y-1 md:space-y-2">
                    <h2 class="mobile-card-title text-xs md:text-lg font-bold text-blue-900 line-clamp-1">${story.title}</h2>
                    <p class="mobile-card-desc text-xs md:text-sm text-blue-700">
                        <span class="text-sm md:text-lg mr-1">${story.emoji}</span>
                        <span class="line-clamp-1">${story.desc}</span>
                    </p>
                </div>
            </a>
        </div>
    `;
}

// Add fade in up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('storyContainer');
    const storyCards = stories.map(createStoryCard).join('');
    container.innerHTML = storyCards;
});
