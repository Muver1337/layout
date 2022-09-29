class Drawable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.w = 0;
        this.offsets = {
            x: 0,
            y: 0,
        }
    }

    createElement() {
        this.element = this.stringToHTML('<div class="element ' + this.constructor.name.toLowerCase()+ '"' + '></div>');
        $(`.elements`).append(this.element);
    }

    stringToHTML (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, `text/html`);
        return doc.querySelector(`.element`);
    }

    update() {
    this.x += this.offsets.x;
    this.y += this.offsets.y;
    }

    draw() {
    this.element.style = `
    left: ${this.x}px;
    top: ${this.y}px;
    width: ${this.w}px;
    height: ${this.h}px;
    `;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game)
        this.h = 244;
        this.w = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.createElement();
    }
}


class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
    }

    start() {
        this.loop();
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    loop() {
        requestAnimationFrame(() => {
            this.updateElements();
            this.setParams();
            this.loop();
        })
    }

    updateElements() {
        this.elements.forEach(e => {
            e.update();
            e.draw();
        })
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((e, i) => {
            $(`#${e}`).innerHTML = values[i];
        })
    }
}