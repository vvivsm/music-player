const songs = [
    {
        title: "Beaches",
        artist: "beabadoobee",
        cover: "../images/beach.jpg",
        file: "../songs/beaches.mp3",
    },
    {
        title: "Love Yourself",
        artist: "Justin Bieber",
        cover: "../images/bubbles.jpg",
        file: "../songs/loveYourself.mp3",
    },
    {
        title: "Sienna",
        artist: "The Marias",
        cover: "../images/fishes.jpg",
        file: "../songs/sienna.mp3",
    }
]

const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const audioEl = document.getElementById('audio');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
let current = 0;

loadSong(current);

function loadSong(index) {
    const song = songs[index]
    titleEl.textContent = song.title
    artistEl.textContent = song.artist
    coverEl.src = song.cover
    audioEl.src = song.file
}

playBtn.addEventListener("click", () => {
    if (audioEl.paused) {
        audioEl.play()
    } else {
        audioEl.pause()
    }
    updatePlayIcon()
})

function updatePlayIcon() {
    if (audioEl.paused) {
        playIcon.src = "../images/playbtn.png"
    } else {
        playIcon.src = "../images/pausebtn.png"
    }
}

document.getElementById("back").addEventListener("click", () => {
    current = (current - 1 + songs.length) % songs.length
    loadSong(current)
    audioEl.play()
    updatePlayIcon()
})

document.getElementById("forward").addEventListener("click", () => {
    current = (current + 1) % songs.length
    loadSong(current)
    audioEl.play()
    updatePlayIcon()
})

audioEl.addEventListener("timeupdate", () => {
    if (audioEl.duration) {
        const percent = (audioEl.currentTime / audioEl.duration) * 100
        progressBar.style.width = percent + "%"
    }
})

audioEl.addEventListener("play", updatePlayIcon)
audioEl.addEventListener("pause", updatePlayIcon)

audioEl.addEventListener("ended", () => {
    current = (current + 1) % songs.length
    loadSong(current)
    audioEl.play()
    updatePlayIcon()
})