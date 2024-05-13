
var mute;
var musicVolume;
var soundVolume;
var songPlaying;

function setupAudio() {
    mute = false;
    musicVolume = 0;
    soundVolume = 0;
    songPlaying = false;

    Howler.volume(musicVolume / 10);
}


var combatSong1Intro = new Howl ({
    src: ["Audio/Music/Normal_Vector-Intro.mp3"]
});

combatSong1Intro.on("end", function() {
    combatSong1Body.play();
});

var combatSong1Body = new Howl ({
    src: ["Audio/Music/Normal_Vector-Body.mp3"],
    loop: true
});

combatSong1Body.on("fade", function() {
    combatSong1Body.stop();
    songPlaying = false;
});



var workshopSongIntro = new Howl({
    src: ["Audio/Music/WorkshopIntro.mp3"]
});

workshopSongIntro.on("end", function () {
    workshopSongBody.play();
});

var workshopSongBody = new Howl({
    src: ["Audio/Music/WorkshopBody.mp3"],
    loop: true
});

workshopSongBody.on("fade", function() {
    workshopSongBody.stop();
    songPlaying = false;
});

