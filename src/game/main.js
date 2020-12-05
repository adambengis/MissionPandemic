// All files in the src/game directory are concatenated on save
// imports and requires are unnessary, assume all variables are 
// globally available
const korman = new KormanQuad("KormanQuad");
const lancaster = new LancasterWalk("LancasterWalk");
const race = new RaceLawn("RaceLawn");

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene : [ korman, lancaster ],
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