var nplayerList = [];
var currentPlay = 0;

$("#nplayer>.switcher").on("mouseenter", () => {
    $("#nplayer").addClass("show");
});

$("#nplayer").on("mouseleave", () => {
    $("#nplayer").removeClass("show");
});

var nFlashIcon = () => {
    var au = $("#naudio")[0];
    if (au.paused) {
        $("#nplayer>.ncontrolplay").removeClass("startplay");
    } else {
        $("#nplayer>.ncontrolplay").addClass("startplay");
    }
}

var playMusic = (e) => {
    var au = $("#naudio")[0];
    au.src = e.src;
    $("#nplayer>.ntitle").html(e.title);
    $("#nplayer>.nsubtitle").html(e.subtitle);
    au.play();
    nFlashIcon();
}

$("#nplayer>.ncontrolplay").on("click", () => {
    var au = $("#naudio")[0];
    if (au.paused) {
        au.play();
    } else {
        au.pause();
    }
    nFlashIcon();
});

$("#nplayer>.ncontrolnext").on("click", () => {
    currentPlay ++;
    if (currentPlay >= nplayerList.length) currentPlay = 0;
    if (currentPlay < nplayerList.length) {
        playMusic(nplayerList[currentPlay]);
    }
});