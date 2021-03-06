
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let pointPlayer1 = document.getElementById("pointPlayer1");
let pointPlayer2 = document.getElementById("pointPlayer2");

let diceDivs = [];
let dice = [];
const NOOFDICE = 5;
let score = [0,0,0];
let player = 1;


function init () {
    for (let i = 0; i < NOOFDICE; i++) {
        // Variable deklareres ud fra id'erne på de 5 terninger fra html
        let dicei = document.getElementById("dice"+(i+1));
        // Hver html-terning bliver skubbet ind i det tomme array (diceDivs);
        diceDivs.push(dicei);
        // dicei.addEventListener('click', lockDice); // Kode til klik-versionen
        // Nyt array bliver lavet (med 5 stykker), som fortæller at typen er en terning (pga. 6-tallet);
        let d = new Die(i, 6);
        dice.push(d);
    }
}

function start () {
    rollDices();
    getPoints();
    winning();
}

function rollDices () {
    // for loop som looper igennem alle terninger  
    for (let die of dice) {
        // If statement som siger, at hvis en terning ikke har status "locked", så skal den køre metoden "roll()" (Som generere et nyt tal mellem 1 og 6)
        if (!die.locked) {
            die.roll();
            diceDivs[die.snr].style.backgroundColor = "white";
        }
    }
    // For loop som sætter værdien af det ene array ind i det andet array, som kan ses i browseren
    for (let i = 0; i < NOOFDICE; i++) {
        diceDivs[i].innerHTML = dice[i].value;
    }
}

// Kode til at låse terningerne ved klik
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
    // Variabel som skal bruges senere til at return ud af loop    
    let var1 = false;
    // For loop som looper igennem alle terninger    
    for (let die of dice) {
        // If statement som siger, at hvis en terning ikke er 'locked', så skal den køre næste kode
        if (!die.locked) {
            // If statement som siger, at hvis værdien af terningen er lig 2 eller 5, så skal terningen låses (med metoden lock()) og gøres rød
            if (die.value === 2 || die.value === 5) {
                die.lock();
                diceDivs[die.snr].style.backgroundColor = "red";
                var1 = true;
            }
        }
    }
    // If statement som siger, at hvis var1 = true, så skal den return/slutte
    if (var1) {
        // Hvis alle er røde/'locked', så remove eventlistener aktiv spiller, add eventlistener til inaktiv spiller, skift spillernummer
        // If statement som siger, at hvis alle terningerne i arrayet er 'locked' - nyere metode som især kan bruges til større arrays
        if (dice.every(isLocked)) {
        // if (dice[0].locked && dice[1].locked && dice[2].locked && dice[3].locked && dice[4].locked) { - denne metode virker også, men er ikke god til større arrays
            
            for (let die of dice) { 
                die.unlock();
            }
            // If statement som siger, at hvis player = 1, så skal den skifte til player 2 og henholdvis fjerne/tilføje eventlistener
            if (player === 1) {
                player = 2;
                btn1.removeEventListener('click', start);
                btn2.addEventListener('click', start);
            
            } else {
                player = 1;
                btn1.addEventListener('click', start);
                btn2.removeEventListener('click', start);
            }
        }
        return;
    }
    // Funktion til at teste om alle terningerne i arrayet er 'locked'
    function isLocked (die) {
        return die.locked;
    }
    // for loop som looper igennem alle terninger    
    for (let die of dice) {
        // if statement som siger at hvis terningen ikke er 'locked', så skal værdien af terningen lægges til score
        if (!die.locked) {
            score[player] += die.value;
        }
    }
    pointPlayer1.innerHTML = score[1];
    pointPlayer2.innerHTML = score[2];
}

function winning () {
    // If statement som siger, at hvis player 1's score er større end eller lig med 100, så skal den give en besked
    if (score[1] >= 100) {
        alert("Congratulations Player 1 - You are the winner")
    }
    // If statement som siger, at hvis player 2's score er større end eller lig med 100, så skal den give en besked
    if (score[2] >= 100) {
        alert("Congratulations Player 2 - You are the winner")
    }
}


btn1.addEventListener('click', start);
window.addEventListener('load', init);

