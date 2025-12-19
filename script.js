// CONFIGURATION
const TEST_MODE = false; 
const targetDate = new Date(2025, 11, 22, 0, 0, 0); 

// --- MUSIC PLAYER SETUP ---
var player;

// Make sure this function is global so YouTube API can find it
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '1',     // Must be at least 1px
        width: '1',      // Must be at least 1px
        videoId: 'PZ7RQssLWmU', 
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'autoplay': 0,    // Don't autoplay, wait for click
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
};

function onPlayerReady(event) {
    console.log("Music player ready!");
}

function onPlayerError(event) {
    console.error("Error playing video:", event.data);
}
// --------------------------

let countdownInterval;

function startTimer() {
    let destination = TEST_MODE ? new Date(new Date().getTime() + 5000) : targetDate;

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = destination - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timerEl = document.getElementById("timer");
        if(timerEl) timerEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            enterParty();
        }
    }, 1000);
}

function enterParty() {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("main-content").style.display = "flex";
}

function nextSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active-slide'));

    const current = document.getElementById('slide' + slideNumber);
    if(current) current.classList.add('active-slide');
}

function celebrate() {
    // 1. Play the Music
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        player.setVolume(100);
    } else {
        console.log("Player not ready yet");
    }

    // 2. Massive Confetti Explosion
    for(let i=0; i<150; i++) {
        let e = document.createElement("div");
        e.classList.add("confetti");
        e.style.left = Math.random() * 100 + "vw";
        e.style.top = -10 + "px";
        e.style.backgroundColor = ['#ff9a9e', '#fecfef', '#a18cd1', '#fbc2eb', '#8fd3f4'][Math.floor(Math.random()*5)];
        e.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 5000);
    }
    
    // 3. Change button text
    const btn = document.querySelector('.special-btn');
    btn.innerHTML = "Enjoy the Song! 🎶";
    btn.style.background = "#fff";
    btn.style.color = "#333";
    btn.style.animation = "none"; 
    btn.disabled = true;
}

startTimer();