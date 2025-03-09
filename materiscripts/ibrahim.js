// Data cerita
const storyPages = {
    1: {
        title: "menghancurkan berhala",
        mainImage: "../asset/ibrahim patung.jpg",
        text: "Allah memerintahkan Nabi Nuh untuk membangun sebuah kapal yang sangat besar. Meskipun banyak yang mengejek, Nabi Nuh tetap sabar dan taat pada perintah Allah.",
        funFact: "Nabi Nuh membangun kapal dengan tangannya sendiri dan membutuhkan waktu yang sangat lama!",
        funFactImage: "../asset/nuh solo-2.jpg"
    },
    2: {
        title: "Hujan Lebat",
        mainImage: "../nuh.jpg/hujan.jpg/",
        text: "Kemudian turunlah hujan yang sangat lebat selama berhari-hari. Air mulai naik dan banjir melanda di mana-mana. Nabi Nuh mengajak orang-orang beriman untuk naik ke dalam kapal.",
        funFact: "Nabi Nuh juga membawa berbagai jenis hewan berpasangan ke dalam kapal!",
        funFactImage: "../asset/nabi nuh2.jpg"
    },
    3: {
        title: "Berlayar di Air Bah",
        mainImage: "../nuh.jpg/layar.jpg",
        text: "Kapal Nabi Nuh berlayar di atas air bah yang sangat tinggi. Semua yang berada di dalam kapal selamat berkat pertolongan Allah SWT.",
        funFact: "Air bah menutupi seluruh permukaan bumi, bahkan sampai ke puncak gunung tertinggi!",
        funFactImage: "../nuh.jpg/layar.jpg"
    },
    4: {
        title: "Air Surut",
        mainImage: "../nuh.jpg/gunung.jpg",
        text: "Setelah beberapa lama, hujan pun berhenti dan air mulai surut. Kapal Nabi Nuh akhirnya berhenti di atas Gunung Judi.",
        funFact: "Nabi Nuh mengirim burung merpati untuk mencari tahu apakah air sudah surut!",
        funFactImage: "../asset/nuh tamat-.jpg"
    },
    5: {
        title: "Kehidupan Baru",
        mainImage: "../nuh.jpg/hidup.jpg",
        text: "Setelah air surut sepenuhnya, Nabi Nuh dan pengikutnya turun dari kapal untuk memulai kehidupan baru di bumi yang telah dibersihkan.",
        funFact: "Semua manusia yang ada di bumi saat ini adalah keturunan dari orang-orang yang selamat dalam kapal Nabi Nuh!",
        funFactImage: "../asset/nuh gunung-.jpg"
    }
};

// Variabel global
let currentPage = 1;
const totalPages = Object.keys(storyPages).length;
let sintesisSuara = null;
let pengucapan = null;
let sedangDiputar = false;

// Fungsi untuk mempersiapkan suara
function persiapkanSuara() {
    if ('speechSynthesis' in window) {
        sintesisSuara = window.speechSynthesis;
        pengucapan = new SpeechSynthesisUtterance();

        // Konfigurasi suara
        pengucapan.lang = 'id-ID';
        pengucapan.rate = 0.9;
        pengucapan.pitch = 1;

        // Cari suara Indonesia
        const cariSuaraIndonesia = () => {
            const daftarSuara = sintesisSuara.getVoices();
            const suaraIndonesia = daftarSuara.find(suara => 
                suara.lang.includes('id-ID') || suara.lang.includes('id')
            );

            if (suaraIndonesia) {
                pengucapan.voice = suaraIndonesia;
            }
        };

        if (sintesisSuara.onvoiceschanged !== undefined) {
            sintesisSuara.onvoiceschanged = cariSuaraIndonesia;
        }
        
        setTimeout(cariSuaraIndonesia, 100);
    } else {
        console.error('Browser tidak mendukung Web Speech API');
        alert('Maaf, browser Anda tidak mendukung fitur audio.');
    }
}

// Fungsi untuk memutar audio
function playAudio() {
    if (!sintesisSuara) {
        persiapkanSuara();
    }

    if (sedangDiputar) {
        hentikanAudio();
        return;
    }

    const halamanData = storyPages[currentPage];
    const teksUntukDibaca = `${halamanData.title}. ${halamanData.text} Tahukah kamu? ${halamanData.funFact}`;

    // Update tombol audio
    const tombolAudio = document.querySelector('button[onclick="playAudio()"]');
    tombolAudio.innerHTML = `
        <div class="flex items-center justify-center gap-2 lg:gap-3">
            <span class="text-xl md:text-2xl lg:text-3xl">⏹️</span>
            Hentikan Audio
        </div>
    `;

    pengucapan.text = teksUntukDibaca;

    pengucapan.onstart = () => {
        sedangDiputar = true;
    };

    pengucapan.onend = () => {
        sedangDiputar = false;
        resetTombolAudio(tombolAudio);
    };

    pengucapan.onerror = (event) => {
        console.error('Error dalam pemutaran audio:', event);
        sedangDiputar = false;
        resetTombolAudio(tombolAudio);
        alert('Maaf, terjadi kesalahan saat memutar audio.');
    };

    sintesisSuara.cancel();
    sintesisSuara.speak(pengucapan);
}

// Fungsi untuk menghentikan audio
function hentikanAudio() {
    if (sintesisSuara && sedangDiputar) {
        sintesisSuara.cancel();
        sedangDiputar = false;

        const tombolAudio = document.querySelector('button[onclick="playAudio()"]');
        resetTombolAudio(tombolAudio);
    }
}

// Fungsi untuk mereset tombol audio
function resetTombolAudio(tombol) {
    tombol.innerHTML = `
        <div class="flex items-center justify-center gap-2 lg:gap-3">
            <span class="text-xl md:text-2xl lg:text-3xl">🔊</span>
            Dengarkan Cerita
        </div>
    `;
}

// Fungsi update konten cerita
function updateStoryContent() {
    const storyContent = document.getElementById('story-content');
    const pageData = storyPages[currentPage];
    
    const content = `
        <div class="bg-blue-50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8">
            <div class="story-illustration mb-4 md:mb-6 lg:mb-8 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg h-64 md:h-80 lg:h-96">
                <img src="${pageData.mainImage}" alt="${pageData.title}" class="w-full h-full object-cover"/>
            </div>

            <p class="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 lg:mb-6">
                ${pageData.text}
            </p>

            <div class="bg-yellow-100 rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-4 lg:p-6 border-2 border-yellow-200">
                <h4 class="font-bold text-yellow-800 text-base md:text-lg lg:text-xl mb-2 lg:mb-3">✨ Tahukah Kamu? ✨</h4>
                <div class="flex items-start gap-4 lg:gap-6">
                    <div class="story-illustration flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-lg lg:rounded-xl overflow-hidden shadow-md">
                        <img src="${pageData.funFactImage}" alt="Fun Fact Illustration" class="w-full h-full object-cover"/>
                    </div>
                    <p class="text-yellow-800 text-sm md:text-base lg:text-lg">
                        ${pageData.funFact}
                    </p>
                </div>
            </div>
        </div>
    `;
    
    storyContent.innerHTML = content;
    updateProgressBar();
}

// Fungsi update progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = `${progress}%`;
}

// Fungsi navigasi halaman
function previousPage() {
    if (currentPage > 1) {
        hentikanAudio();
        currentPage--;
        updateStoryContent();
        
        gsap.from("#story-content", {
            x: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        hentikanAudio();
        currentPage++;
        updateStoryContent();
        
        gsap.from("#story-content", {
            x: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }
}

// Fungsi kuis dan mini game
function showQuiz() {
    const quizQuestions = [
        {
            question: "Apa yang diperintahkan Allah kepada Nabi Nuh?",
            options: [
                "Membangun rumah",
                "Membangun kapal",
                "Membangun masjid",
                "Membangun jembatan"
            ],
            correct: 1
        }
    ];
    
    alert('Kuis akan segera dimulai!');
}

function startMemoryGame() {
    alert('Permainan Memori akan segera hadir!');
}

function startPuzzle() {
    alert('Puzzle akan segera hadir!');
}

// Event listeners saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi animasi awan
    gsap.to(".cloud", {
        x: "random(-20, 20)",
        y: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: "random(0, 2)"
    });
    
    // Inisialisasi konten dan audio
    updateStoryContent();
    persiapkanSuara();
    
    // Animasi hover untuk kartu cerita
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

// Kontrol keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        nextPage();
    } else if (event.key === 'ArrowLeft') {
        previousPage();
    }
});