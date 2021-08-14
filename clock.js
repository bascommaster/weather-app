export default class Clock {
    #clockElement;

    constructor(clockElement) {
        this.#clockElement = clockElement;
    }

    get getClockElement() {
        return this.#clockElement;
    }

    set setClockElement(element) {
        this.#clockElement = element;
    }

    checkTime = (arg) => {
        if (arg < 10) {
            arg = `0${arg}`;
        }
        return arg;
    };

    displayTime() {
        const time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        hours = this.checkTime(hours);
        minutes = this.checkTime(minutes);

        this.#clockElement.innerHTML = `${hours} : ${minutes}`;
    }
}

/*
// proceduralnie

const checkTime = (arg) => {
    if (arg < 10) {
        arg = `0${arg}`;
    }
    return arg;
};

function displayTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    hours = checkTime(hours);
    minutes = checkTime(minutes);

    clock.innerHTML = `${hours} : ${minutes}`;
}

setInterval(displayTime, 100);
 */
