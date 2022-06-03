var colores = ["green", "red", "yellow", "blue"];
var patron = [];
var audio;
var level = 0;
var i = 0;

function rng() {
    rand = Math.round(Math.random() * 3);
    patron.push(colores[rand]);
    return colores[rand];
}

function pressed(color) {
    $("." + color).addClass("pressed");
    audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    setTimeout(() => {
        $("." + color).removeClass("pressed");
    }, 300);
}

$(document).on("keypress", function(evt) {
    if (evt.key.toLowerCase() == "a") {
        initGame();
        $(document).off("keypress");
        $(".btn").on("click", function() {
            if ($(this).hasClass(patron[i])) {
                pressed(patron[i]);
                i++;
            } else {
                $("body").addClass("game-over");
                audio = new Audio("sounds/wrong.mp3");
                audio.play();
                $("h1").text("Game over. Press any key to Restart");
                $(".btn").off("click");
                $(document).on("keypress", function() {
                    window.location.reload();
                });
            }

            if (i == patron.length && i > 0) {
                initGame();
            }
        });
    }
});

function initGame() {
    i = 0;
    level++;
    $("h1").text("Level " + level);
    setTimeout(() => {
        pressed(rng());
    }, 500);
}