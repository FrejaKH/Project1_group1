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