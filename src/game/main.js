// Our game scene
class ExampleScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init(data) {
        var text = "Phaser Version " + Phaser.VERSION + " works!";
        var t = this.add.text(0, 0, text);
    }

    preload() {

    }

    create(data)  {

    }

    update(time, delta) {

    }
}

var scene = new ExampleScene("example");

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene : scene
};


// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
var game = new Phaser.Game(config);