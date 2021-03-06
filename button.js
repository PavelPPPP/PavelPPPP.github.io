export class Button {
    constructor(top, left) {
        this.setPosition(top, left);
    }

    setPosition(top, left) {
        this.top = top;
        this.left = left;
    }

    viewBtn(elem) {
        throw new Error("not view with Parent class");
    }
}

export class TestButton extends Button {
    viewBtn(elem) {
        elem.style.display = "block";
        
        elem.style.top = this.top;
        elem.style.left = this.left;
    }
}