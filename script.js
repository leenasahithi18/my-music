// =====================================
// TUNEWAVE JAVASCRIPT
// =====================================


// =====================================
// SONG LIST
// =====================================

let songs = [

    {
        name: "Believer",
        artist: "Imagine Dragons",
        file: "believer.mp3",
        image: "song1.jpg"
    },

    {
        name: "Perfect",
        artist: "Ed Sheeran",
        file: "perfect.mp3",
        image: "song2.jpg"
    },

    {
        name: "Faded",
        artist: "Alan Walker",
        file: "faded.mp3",
        image: "song3.jpg"
    },

    {
        name: "Closer",
        artist: "The Chainsmokers",
        file: "closer.mp3",
        image: "song4.jpg"
    },

    {
        name: "Something Just Like This",
        artist: "The Chainsmokers",
        file: "something.mp3",
        image: "song5.jpg"
    }

];


// =====================================
// CURRENT SONG
// =====================================

let currentSong = 0;


// =====================================
// AUDIO PLAYER
// =====================================

// Use the audio player from player.html

let audio = document.getElementById("audioPlayer");


// If audio player doesn't exist on another page,
// create a hidden audio object for safety

if (!audio) {

    audio = new Audio();

}


// =====================================
// LOAD SONG
// =====================================

function loadSong(index) {

    currentSong = index;

    audio.src = songs[currentSong].file;

    audio.load();


    // Song title

    let title =
        document.getElementById("songTitle");

    if (title) {

        title.innerText =
            songs[currentSong].name;

    }


    // Artist

    let artist =
        document.getElementById("artistName");

    if (artist) {

        artist.innerText =
            songs[currentSong].artist;

    }


    // Image

    let image =
        document.getElementById("playerImage");

    if (image) {

        image.src =
            songs[currentSong].image;

    }


    // Reset progress

    let progressBar =
        document.getElementById("progressBar");

    if (progressBar) {

        progressBar.value = 0;

    }


    // Reset time

    let timeDisplay =
        document.getElementById("timeDisplay");

    if (timeDisplay) {

        timeDisplay.innerText =
            "0:00 / 0:00";

    }

}


// =====================================
// PLAY SONG
// =====================================

function playSong(index) {

    loadSong(index);

    audio.play().then(function () {

        updatePlayButton();

    }).catch(function (error) {

        console.log("Click Play to start the song.");

    });

}


// =====================================
// PLAY / PAUSE
// =====================================

function togglePlay() {

    if (!audio.src) {

        loadSong(currentSong);

    }


    if (audio.paused) {

        audio.play().then(function () {

            updatePlayButton();

        }).catch(function () {

            console.log("Click Play to start the song.");

        });

    }

    else {

        audio.pause();

        updatePlayButton();

    }

}


// =====================================
// UPDATE PLAY BUTTON
// =====================================

function updatePlayButton() {

    let button =
        document.getElementById("playButton");


    if (!button) {

        return;

    }


    if (audio.paused) {

        button.innerText = "▶️";

    }

    else {

        button.innerText = "⏸️";

    }

}


// =====================================
// NEXT SONG
// =====================================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }


    loadSong(currentSong);


    audio.play().then(function () {

        updatePlayButton();

    }).catch(function () {

        console.log("Click Play to start the song.");

    });

}


// =====================================
// PREVIOUS SONG
// =====================================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }


    loadSong(currentSong);


    audio.play().then(function () {

        updatePlayButton();

    }).catch(function () {

        console.log("Click Play to start the song.");

    });

}


// =====================================
// PROGRESS BAR
// =====================================

audio.addEventListener("timeupdate", function () {

    let progressBar =
        document.getElementById("progressBar");


    if (progressBar && audio.duration) {

        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

    }


    updateTime();

});


// =====================================
// UPDATE TIME
// =====================================

function updateTime() {

    let timeDisplay =
        document.getElementById("timeDisplay");


    if (!timeDisplay) {

        return;

    }


    let current =
        formatTime(audio.currentTime);


    let total =
        formatTime(audio.duration);


    timeDisplay.innerText =
        current + " / " + total;

}


// =====================================
// FORMAT TIME
// =====================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }


    let minutes =
        Math.floor(seconds / 60);


    let remainingSeconds =
        Math.floor(seconds % 60);


    if (remainingSeconds < 10) {

        remainingSeconds =
            "0" + remainingSeconds;

    }


    return minutes + ":" + remainingSeconds;

}


// =====================================
// CHANGE SONG POSITION
// =====================================

let progressBar =
    document.getElementById("progressBar");


if (progressBar) {

    progressBar.addEventListener(
        "input",
        function () {

            if (audio.duration) {

                audio.currentTime =
                    (progressBar.value / 100)
                    * audio.duration;

            }

        }
    );

}


// =====================================
// VOLUME
// =====================================

let volumeBar =
    document.getElementById("volumeBar");


if (volumeBar) {

    audio.volume =
        volumeBar.value;


    volumeBar.addEventListener(
        "input",
        function () {

            audio.volume =
                volumeBar.value;

        }
    );

}


// =====================================
// SONG ENDED
// =====================================

audio.addEventListener("ended", function () {

    nextSong();

});


// =====================================
// ADD TO PLAYLIST
// =====================================

function addToPlaylist(songName) {

    let playlist =
        JSON.parse(
            localStorage.getItem(
                "tuneWavePlaylist"
            )
        ) || [];


    if (!playlist.includes(songName)) {

        playlist.push(songName);


        localStorage.setItem(
            "tuneWavePlaylist",
            JSON.stringify(playlist)
        );


        alert(
            "🎵 " +
            songName +
            " added to your playlist!"
        );

    }

    else {

        alert(
            "ℹ️ " +
            songName +
            " is already in your playlist."
        );

    }

}


// =====================================
// DISPLAY PLAYLIST
// =====================================

function displayPlaylist() {

    let container =
        document.getElementById(
            "playlistContainer"
        );


    if (!container) {

        return;

    }


    let playlist =
        JSON.parse(
            localStorage.getItem(
                "tuneWavePlaylist"
            )
        ) || [];


    if (playlist.length === 0) {

        container.innerHTML =
            "<h3 style='text-align:center;'>Your playlist is empty 🎵</h3>";

        return;

    }


    container.innerHTML = "";


    playlist.forEach(function (songName, index) {

        let song =
            document.createElement("div");


        song.className =
            "song-card";


        song.innerHTML = `

            <h3>🎵 ${songName}</h3>

            <button onclick="playPlaylistSong(${index})">
                ▶️ Play
            </button>

            <button onclick="removeFromPlaylist(${index})">
                ❌ Remove
            </button>

        `;


        container.appendChild(song);

    });

}


// =====================================
// PLAY PLAYLIST SONG
// =====================================

function playPlaylistSong(index) {

    let playlist =
        JSON.parse(
            localStorage.getItem(
                "tuneWavePlaylist"
            )
        ) || [];


    let songName =
        playlist[index];


    let songIndex =
        songs.findIndex(function (song) {

            return song.name === songName;

        });


    if (songIndex !== -1) {

        window.location.href =
            "player.html?song=" +
            songIndex;

    }

}


// =====================================
// REMOVE FROM PLAYLIST
// =====================================

function removeFromPlaylist(index) {

    let playlist =
        JSON.parse(
            localStorage.getItem(
                "tuneWavePlaylist"
            )
        ) || [];


    playlist.splice(index, 1);


    localStorage.setItem(
        "tuneWavePlaylist",
        JSON.stringify(playlist)
    );


    displayPlaylist();

}


// =====================================
// SEARCH SONGS
// =====================================

function searchSongs() {

    let search =
        document.getElementById("search");


    if (!search ||
        search.value.trim() === "") {

        alert("Please enter a song name.");

        return;

    }


    alert(
        "🔍 Searching for: " +
        search.value
    );

}


// =====================================
// DEMO PAYMENT
// =====================================

function makePayment() {

    alert(
        "Demo payment successful! 🎉"
    );


    window.location.href =
        "success.html";

}


// =====================================
// GET SELECTED SONG FROM URL
// =====================================

let urlParams =
    new URLSearchParams(
        window.location.search
    );


let selectedSong =
    urlParams.get("song");


if (selectedSong !== null &&
    document.getElementById("songTitle")) {


    currentSong =
        parseInt(selectedSong);


    if (currentSong >= 0 &&
        currentSong < songs.length) {


        loadSong(currentSong);


        // Don't force autoplay.
        // User can click the Play button.

        updatePlayButton();

    }

}


// =====================================
// DISPLAY PLAYLIST WHEN PAGE OPENS
// =====================================

displayPlaylist();
// =====================================
// REGISTER USER
// =====================================

function registerUser() {

    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("❌ Passwords do not match!");

        return;

    }


    alert(
        "🎉 Registration successful!\nWelcome to TuneWave, " +
        name
    );


    window.location.href =
        "login.html";

}
// =====================================
// LOGIN USER
// =====================================

function loginUser() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;


    if (email === "" || password === "") {

        alert("⚠️ Please enter email and password.");

        return;

    }


    alert("🎉 Login successful!");


    window.location.href =
        "home.html";

}
