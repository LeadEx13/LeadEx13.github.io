$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function(){
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if(top>offset && top<offset+height){
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : $($(this).attr('href')).offset().top,
        },500, 'linear')
    });
});

document.addEventListener('visibilitychange',
function(){
    document.title = "Portfolio | Vlad Kelar";
    $("#favicon").attr("href","./assests/images/favicon.ico");
});


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Backend development", "Software engineering", "Game development", "Mobile development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// pre loader start
function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut(){
    setInterval(loader,500);
}
window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function(e) {
    if(e.keyCode == 123) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
       return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    //reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3',{delay: 200}); 
srtop.reveal('.home .content p',{delay: 200}); 
srtop.reveal('.home .content .btn',{delay: 200}); 

srtop.reveal('.home .image',{delay: 400}); 
srtop.reveal('.home .linkedin',{interval: 600}); 
srtop.reveal('.home .github',{interval: 800}); 
srtop.reveal('.home .twitter',{interval: 1000});
srtop.reveal('.home .telegram',{interval: 600}); 
srtop.reveal('.home .instagram',{interval: 600}); 
srtop.reveal('.home .dev',{interval: 600}); 

/* SCROLL ABOUT */
srtop.reveal('.about .content h3',{delay: 300});
srtop.reveal('.about .content .tag',{delay: 400}); 
srtop.reveal('.about .content p',{delay: 300}); 
srtop.reveal('.about .content .box-container',{delay: 300}); 
srtop.reveal('.about .content .resumebtn',{delay: 300}); 

/* SCROLL SKILLS */
srtop.reveal('.skills .container',{interval: 200}); 
srtop.reveal('.skills .container .bar',{delay: 400}); 

/* SCROLL EDUCATION */
srtop.reveal('.education .box',{interval: 200}); 

/* SCROLL PROJECTS */
srtop.reveal('.work .box',{interval: 200}); 

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 400});
srtop.reveal('.experience .timeline .container',{interval: 400}); 

/* SCROLL CONTACT */
srtop.reveal('.contact .container',{delay: 400});
srtop.reveal('.contact .container .form-group',{delay: 400});


// Music Player Code
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('audio');
    const playlist = document.querySelector('.playlist ul');
    const tracks = playlist.getElementsByTagName('li');
    const togglePlaylistButton = document.getElementById('toggle-playlist');
    const playlistContainer = document.querySelector('.playlist');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const shuffleButton = document.getElementById('shuffle');
    const currentTrackElement = document.getElementById('current-track');

    let currentTrack = 0;
    let isShuffle = false;

    // Initialize the first track
    if (tracks.length > 0) {
        console.log('Initializing first track:', tracks[currentTrack].dataset.src);
        audio.src = tracks[currentTrack].dataset.src;
        tracks[currentTrack].classList.add('active');
        currentTrackElement.textContent = tracks[currentTrack].textContent;
    } else {
        console.error('No tracks found in the playlist.');
    }

    // Play the track when clicked and update the active class
    playlist.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'LI') {
            for (let i = 0; i < tracks.length; i++) {
                tracks[i].classList.remove('active');
            }
            e.target.classList.add('active');
            currentTrack = Array.from(tracks).indexOf(e.target);
            console.log('Track selected:', e.target.dataset.src);
            audio.src = e.target.dataset.src;
            currentTrackElement.textContent = e.target.textContent;
            audio.play().catch(error => {
                console.error('Audio playback error:', error);
                console.log('Attempting to load audio source directly...');
                audio.load();
                audio.play().catch(err => console.error('Audio playback retry error:', err));
            }); // Log errors
        }
    });

    // Auto-play the next track when the current one ends
    audio.addEventListener('ended', function () {
        nextTrack();
    });

    // Add event listener for audio errors
    audio.addEventListener('error', function (e) {
        console.error('Audio error:', e);
    });

    // Toggle playlist visibility
    togglePlaylistButton.addEventListener('click', function () {
        if (playlistContainer.style.display === 'none' || playlistContainer.style.display === '') {
            playlistContainer.style.display = 'block';
            togglePlaylistButton.textContent = 'Hide Playlist';
        } else {
            playlistContainer.style.display = 'none';
            togglePlaylistButton.textContent = 'Show Playlist';
        }
    });

    // Next track functionality
    function nextTrack() {
        if (isShuffle) {
            currentTrack = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrack = (currentTrack + 1) % tracks.length;
        }
        tracks[currentTrack].click();
    }

    // Previous track functionality
    function prevTrack() {
        if (isShuffle) {
            currentTrack = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        }
        tracks[currentTrack].click();
    }

    // Shuffle functionality
    shuffleButton.addEventListener('click', function () {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('active', isShuffle);
        console.log('Shuffle is now', isShuffle);
    });

    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    // Hide player controls when not hovered
    const playerContainer = document.querySelector('.music-player');
    let hideTimeout;
    function hidePlayer() {
        playerContainer.classList.add('small');
    }
    playerContainer.addEventListener('mouseenter', function () {
        clearTimeout(hideTimeout);
        playerContainer.classList.remove('small');
    });
    playerContainer.addEventListener('mouseleave', function () {
        hideTimeout = setTimeout(hidePlayer, 3000);
    });
    hideTimeout = setTimeout(hidePlayer, 3000);
});


