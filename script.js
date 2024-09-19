let isgameover = false;
let player_turn = 'X';
let info = document.querySelector('.info');
let turn = new Audio("asserts/ting.mp3")
let gameover = new Audio("asserts/gameover.mp3")
let gameMusic = new Audio("asserts/music.mp3")
let click = true;
function changeTurn() {
    return player_turn === 'X' ? "0" : "X";
}


// --------------Checking the winner----------------

function checkWin() {
    let boxtexts = document.querySelectorAll('.boxtext');
    let wins = [
        [0, 1, 2, 2.5, 5, 0],
        [3, 4, 5, 2.5, 15, 0],
        [6, 7, 8, 2.5, 25, 0],
        [0, 3, 6, -7.5, 15, 90],
        [1, 4, 7, 2.5, 15, 90],
        [2, 5, 8, 12.5, 15, 90],
        [0, 4, 8, 2.5, 15, 45],
        [2, 4, 6, 2.5, 15, 135],
    ]

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText == boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText != "")) {
            gameover.play();
            info.innerText = `${boxtexts[e[0]].innerText} Won !`;
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName("img")[0].style.width = "10rem";
            let width = window.innerWidth;
            if (width <= 500) {
                document.querySelector(".line").style.width = "26vw";
                document.querySelector(".line").style.transform = `translate(${e[3] + 8}vw ,${e[4] + 7}vw) rotate(${e[5]}deg)`;
            }
            else {
                document.querySelector(".line").style.transform = `translate(${e[3]}vw ,${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.width = "26vw";
            }
        }

    })

}


//------------Setting The Text------------------

let counter=0;
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(e => {
    let block = e.querySelector('.boxtext');
    e.addEventListener("click", () => onclick(block));  
})

function onclick(box) {
    counter++;
    if (box.innerText === "" && isgameover != true) {
        turn.play();
        box.innerText = player_turn;
        player_turn = changeTurn()
        info.innerText = `Turn for ${player_turn}`;
        checkWin();
        if(click == false && box.innerText==='X')
        {
            box.style.color="red";
        }
        else if(click==false && box.innerText==='0')
        {
            box.style.color="#78B7D0";
        }
    }
    if(counter===boxes.length && isgameover==false)
    {
        info.innerText="Game Over !";
    }
}



// ---------Reset-------------


let btn = document.getElementById("reset");
btn.addEventListener("click", () => reset());
function reset() {
    counter=0;
    player_turn = 'X';
    isgameover = false;
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(e => {
        e.innerText = "";
    })
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName("img")[0].style.width = "0rem";
    document.querySelector('.info').innerText = `Turn for ${player_turn}`;
}


// -----------Changing Background Color---------------


let light = document.querySelector('.nav-icons');
let light_on = light.querySelectorAll('.nav-sub');

let nav__light_on = light_on[0].querySelector('.fa-solid');

nav__light_on.addEventListener("click", () => {
    changeBg();
})

function changeBg(){
    console.log(click);
    if (click == true) {
        let bg1 = document.querySelector('.main-tab');
        let text=document.querySelector('.sub-heading');
        let game_heading=document.querySelector('.game-heading');
        let game_info=document.querySelector('.info');
        game_info.style.color="#fff";
        game_heading.style.color="#78b7d0";
        text.style.color="#78b7d0";
        bg1.style.backgroundColor = "#16325b";
        nav__light_on.style.color="white";
        click=false;
    }
    else
    {
        let game_info=document.querySelector('.info');
        let text=document.querySelector('.sub-heading');
        let game_heading=document.querySelector('.game-heading');
        let bg1 = document.querySelector('.main-tab');
        game_info.style.color="black";
        text.style.color="#16325b";
        bg1.style.backgroundColor = "#fff";
        game_heading.style.color="black";
        nav__light_on.style.color="black";
        click=true;
    }
}


//-------------Music Control-------------------


let music_on = light_on[1].querySelector('.fa-volume-high');
let music_off = light_on[1].querySelector('.fa-volume-off');

let ismusic=false;

music_on.style.scale="0";
music_off.style.scale="2";

music_on.addEventListener("click",()=>{
    ismusic=true;
    music();
})

music_off.addEventListener("click",()=>{
    ismusic=false;
    music();
})

function music()
{
    console.log(ismusic);
    if (ismusic) {
        gameMusic.pause();
        music_on.style.scale="0";
        music_off.style.scale="2";
    }
    else
    {
        gameMusic.play();
        music_on.style.scale="2";
        music_off.style.scale="0";
    }
}