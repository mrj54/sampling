const prophetNames = [
    "Adam", "Idris", "Nuh", "Hud", "Shaleh", "Ibrahim", "Luth", 
    "Ismail", "Ishaq", "Yaqub", "Yusuf", "Ayyub", "Syu'aib", 
    "Musa", "Harun", "Dzulkifli", "Daud", "Sulaiman", "Ilyas", 
    "Ilyasa", "Yunus", "Zakaria", "Yahya", "Isa", "Muhammad"
];

const descriptions = {
    "Adam": "Adam adalah manusia pertama dan nabi pertama dalam Islam.",
    "Idris": "Idris dikenal sebagai nabi yang pandai membaca dan menulis.",
    "Nuh": "Nuh dikenal sebagai nabi yang membangun bahtera besar.",
    "Hud": "Hud adalah nabi yang diutus kepada kaum 'Ad.",
    "Shaleh": "Shaleh diutus kepada kaum Tsamud dengan mukjizat unta.",
    "Ibrahim": "Ibrahim adalah bapak para nabi dan tokoh penting monoteisme.",
    "Luth": "Luth diutus untuk memperbaiki akhlak kaum Sodom.",
    "Ismail": "Ismail adalah putra Ibrahim dan nenek moyang bangsa Arab.",
    "Ishaq": "Ishaq adalah putra kedua Ibrahim yang diutus ke Bani Israil.",
    "Yaqub": "Yaqub dikenal sebagai ayah dari nabi Yusuf.",
    "Yusuf": "Yusuf memiliki mukjizat berupa ketampanan dan kemampuan menafsirkan mimpi.",
    "Ayyub": "Ayyub dikenal karena kesabaran luar biasa saat menghadapi cobaan.",
    "Syu'aib": "Syu'aib diutus kepada kaum Madyan untuk memperbaiki ekonomi mereka.",
    "Musa": "Musa memimpin Bani Israil keluar dari Mesir dengan mukjizat tongkat.",
    "Harun": "Harun adalah saudara Musa dan membantu dakwahnya.",
    "Dzulkifli": "Dzulkifli adalah nabi yang dikenal sebagai hakim yang adil.",
    "Daud": "Daud memiliki mukjizat melembutkan besi dan suara merdu.",
    "Sulaiman": "Sulaiman menguasai ilmu berbicara dengan hewan dan jin.",
    "Ilyas": "Ilyas diutus untuk mengingatkan kaum yang menyembah berhala Baal.",
    "Ilyasa": "Ilyasa adalah penerus dakwah nabi Ilyas.",
    "Yunus": "Yunus terkenal karena kisahnya dalam perut ikan paus.",
    "Zakaria": "Zakaria adalah nabi yang terus berdoa hingga dikaruniai anak di usia tua.",
    "Yahya": "Yahya adalah putra Zakaria dan dikenal sebagai nabi yang penuh kasih.",
    "Isa": "Isa adalah nabi yang membawa Injil dan melakukan banyak mukjizat.",
    "Muhammad": "Muhammad adalah nabi terakhir dan pembawa risalah Islam."
};

const prophetsGrid = document.getElementById('prophetsGrid');
const bubbleChat = document.getElementById('bubbleChat');
const bubbleContent = document.getElementById('bubbleContent');

// Fungsi membuat tombol
function createProphetButton(name) {
    const button = document.createElement('button');
    button.classList.add('prophet-btn');
    button.textContent = name;
    button.addEventListener('click', () => {
        showProphetDetails(name);
    });
    return button;
}

// Fungsi menampilkan detail nabi
function showProphetDetails(name) {
    bubbleContent.textContent = descriptions[name] || "Detail tentang nabi ini belum tersedia.";
    bubbleChat.classList.add('show');

    setTimeout(() => {
        bubbleChat.classList.remove('show');
    }, 3000);
}

// Render awal
function renderProphets(names) {
    prophetsGrid.innerHTML = '';
    names.forEach(name => {
        const button = createProphetButton(name);
        prophetsGrid.appendChild(button);
    });
}

renderProphets(prophetNames);

function navigateHome() {
    window.location.href = 'beranda.html';
}

function navigateProfile() {
    window.location.href = 'profil.html';
}
