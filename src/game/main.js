// All files in the src/game directory are concatenated on save
// imports and requires are unnessary, assume all variables are 
// globally available
const scene = new KormanQuad("Korman Quad");

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene : scene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { z: 300 },
            debug: false
        }
    }
};


// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
new Phaser.Game(config);