/**
 * Die object
 */
class Die {
    constructor(i, t) {
        this.snr = i;           // serialno, index
        this.type = t;          // type, 2: coin, 6: die, ...
        this.locked = false;
        this.value = 0;
        this.roll();
    }

    draw(where) {
        let d = document.createElement("div");
        d.setAttribute("class", "die");
        d.setAttribute("id", "die" + this.snr);
        if (this.locked) {
            d.style.backgroundColor = "yellow";
        }
        let t = document.createTextNode(this.value);
        d.appendChild(t);
        d.addEventListener('click', lockFlipFlop);
        $(where).appendChild(d);
    }

    roll() {
        this.value = Math.floor(Math.random() * this.type) + 1;
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    isLocked() {
        return this.locked;
    }
}