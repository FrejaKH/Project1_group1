
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let pointPlayer1 = document.getElementById("pointPlayer1");
let pointPlayer2 = document.getElementById("pointPlayer2");

let diceDivs = [];
let dice = [];
const NOOFDICE = 5;
let score = [0,0,0];
let spiller = 1;


function init () {
    for (let i = 0; i < NOOFDICE; i++) {
        // Variable deklareres ud fra Id'erne på de 5 terninger fra html
        let dicei = document.getElementById("dice"+(i+1));
        // Hver html-terning bliver skubbet ind i det tomme array (diceDivs);
        diceDivs.push(dicei);
        // dicei.addEventListener('click', lockDice);
        // Nyt array bliver lavet (med 5 stykker), som fortæller at typen er en terning (pga. 6-tallet);
        let d = new Die(i, 6);
        dice.push(d);
    }
}
function start () {
    rollDices();
    getPoints();
}

function rollDices () {
    
    for (let die of dice) {
        // If statement som siger, at hvis en terning ikke har status "locked", så skal den køre metoden "roll()" (Som generere et nyt tal mellem 1 og 6)
        if (!die.locked) {
            die.roll();
        }
    }
    // For loop som sætter værdien af det ene array ind i det andet array, som kan ses i browseren
    for (let i = 0; i < NOOFDICE; i++) {

        diceDivs[i].innerHTML = dice[i].value;
    }
}
/*      
function lockDice (e) {
    let i = e.target.id.slice(-1);
        let n = e.target.innerHTML;
        // If statement som siger, at hvis n er lig med 2 eller 5, så skal terningen blive rød, når man klikker på den
        if (n == 2 || n == 5) {
            e.target.style.backgroundColor = "red";
            dice[i-1].lock();      
        }         
}
*/

 function getPoints () {
        // Tjek for 2 og 5, hvis forekommer så return
    let var1 = false;    
    for (let die of dice) {
        if (!die.locked) {
            if (die.value === 2 || die.value === 5) {
                die.lock();
                diceDivs[die.snr].style.backgroundColor = "red";
                var1 = true;
            }
        }
    }
    if (var1) {
        // Hvis alle er røde, så remove eventlistener aktiv spiller, add eventlistener til inaktiv spiller, skift spillernummer
        return;
    }    
    for (let die of dice) {
        if (!die.locked) {
            score[spiller] += die.value;
        }
    }

    pointPlayer1.innerHTML = score[1];
    pointPlayer2.innerHTML = score[2];
    
}

btn1.addEventListener('click', start);
window.addEventListener('load', init);