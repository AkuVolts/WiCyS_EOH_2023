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

    // check if mouse is inside the building
    isInside(x, y) {
        return (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height);
    }

    // highlight the building while mouse is inside
    highlight() {
        game_context.fillStyle = "rgba(255, 255, 255, 0.5)";
        game_context.fillRect(this.x, this.y, this.width, this.height);
    }
}
