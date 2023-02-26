class Buildings {
    constructor(x, y, width, height, fact) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fact = fact;
        this.given_hint = false;
    }

    // clicked
    update() {
        if (!this.given_hint) {
            coins++;
            this.given_hint = true;
        }
        this.display();
    }

    display() {
        return this.fact;
    }
}
