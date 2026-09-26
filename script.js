/* =================================
   ELEMENT
================================= */

const opening =
    document.getElementById("opening");

const envelope =
    document.getElementById("envelope");

const openBtn =
    document.getElementById("openBtn");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const typingText =
    document.getElementById("typingText");

const cursor =
    document.getElementById("cursor");

const signature =
    document.getElementById("signature");

const hearts =
    document.getElementById("hearts");



/* =================================
   STATUS
================================= */

let opened = false;

let musicPlaying = false;

let typingStarted = false;

let typingIndex = 0;



/* =================================
   SURAT
================================= */

const letterText = `Happy 22nd Birthday, Elis! 💗

Hari ini adalah hari spesial untuk seseorang
yang sangat berharga.

Di umurmu yang ke-22 ini, aku berharap semoga
semua hal baik selalu datang ke dalam hidupmu.

Semoga kamu selalu diberikan kesehatan,
kebahagiaan, dan kekuatan untuk melewati
setiap perjalanan yang ada di depan.

Semoga semua impian yang sedang kamu kejar
pelan-pelan bisa menjadi kenyataan.

Dan kalau suatu hari semuanya terasa berat,
semoga kamu selalu ingat bahwa kamu sudah
berhasil melewati banyak hal sampai sejauh ini.

Jadi jangan terlalu keras kepada dirimu sendiri.

Nikmati setiap prosesnya.
Nikmati setiap cerita.
Nikmati setiap momen kecil yang ada.

Aku berharap umur 22 ini menjadi awal dari
banyak hal baik dalam hidupmu.

More happiness.
More beautiful memories.
More reasons to smile.

And most importantly...

I hope you always stay as wonderful
as the person you are today.

Happy Birthday, Elis. 🌷

Semoga tahun ini menjadi salah satu
bab paling indah dalam hidupmu.`;



/* =================================
   OPEN CARD
================================= */

function openCard() {

    if (opened) {

        return;

    }


    opened = true;


    /*
       Buka amplop
    */

    envelope.classList.add(
        "opened"
    );


    /*
       Coba putar musik.

       Karena fungsi ini dipanggil
       dari tap user, HP biasanya
       mengizinkan audio.
    */

    playMusic();


    /*
       Setelah animasi amplop selesai,
       hilangkan opening.
    */

    setTimeout(
        function () {

            opening.classList.add(
                "hide"
            );

        },
        2200
    );


    /*
       Mulai ketikan.
    */

    setTimeout(
        function () {

            startTyping();

        },
        3000
    );

}



/* =================================
   TOMBOL BUKA
================================= */

openBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        openCard();

    }
);



/* =================================
   AMPLOP
================================= */

envelope.addEventListener(
    "click",
    function () {

        openCard();

    }
);



/* =================================
   MUSIC
================================= */

function playMusic() {

    music.volume = 0.7;


    const promise =
        music.play();


    if (promise !== undefined) {

        promise
            .then(
                function () {

                    musicPlaying =
                        true;

                    musicBtn.textContent =
                        "🔊";

                }
            )
            .catch(
                function () {

                    /*
                       Beberapa HP/browser
                       tetap memblokir audio.

                       User bisa menekan
                       tombol musik.
                    */

                    musicPlaying =
                        false;

                    musicBtn.textContent =
                        "🎵";

                }
            );

    }

}



/* =================================
   MUSIC BUTTON
================================= */

musicBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();


        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicBtn.textContent =
                "🎵";

        }

        else {

            music.play()
                .then(
                    function () {

                        musicPlaying =
                            true;

                        musicBtn.textContent =
                            "🔊";

                    }
                )
                .catch(
                    function () {

                        musicBtn.textContent =
                            "🎵";

                    }
                );

        }

    }
);



/* =================================
   TYPING
================================= */

function startTyping() {

    if (typingStarted) {

        return;

    }


    typingStarted = true;

    typingIndex = 0;

    typingText.textContent = "";

    cursor.style.display =
        "inline";


    typeCharacter();

}



function typeCharacter() {

    if (
        typingIndex <
        letterText.length
    ) {

        typingText.textContent +=
            letterText.charAt(
                typingIndex
            );


        typingIndex++;


        /*
           Kecepatan ketikan.

           HP tetap ringan.
        */

        setTimeout(
            typeCharacter,
            30
        );

    }

    else {

        cursor.style.display =
            "none";


        setTimeout(
            function () {

                signature.classList.add(
                    "show"
                );

            },
            500
        );

    }

}



/* =================================
   FLOATING HEARTS
================================= */

function createHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "heart";


    const heartList = [
        "♡",
        "♥",
        "💕",
        "💗"
    ];


    heart.textContent =
        heartList[
            Math.floor(
                Math.random() *
                heartList.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            12 +
            Math.random() * 18
        ) + "px";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 5
        ) + "s";


    hearts.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        10000
    );

}



/*
   Jangan terlalu banyak hati
   supaya HP tetap ringan.
*/

setInterval(
    createHeart,
    900
);