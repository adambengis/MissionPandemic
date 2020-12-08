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
    scene : [ korman , lancaster, race ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { z: 300 },
            debug: false
        }
    }
};

// time (ms) for npc to move through one loop
const INITIAL_MOVE_TIME = 2000;
// npc start of walk staggering max time
const MOVE_STAGGER = 100;
// npc loops speed up by this much time
const MOVE_TIME_DECR = 200;
// per-update infection level increase when near npc
const NPC_INFECTION_INCR = 0.5;
// infection level that masked npcs inflict
const NPC_INFECTION_MASK_INCR = 0.25;
// npc infection level multiplier per level
const NPC_INFECTION_MULT = 1.2;

const onTweenStart = (tween) => tween.setTimeScale(0.9+Phaser.Math.Between(0, 10) / 10);


// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
let game = new Phaser.Game(config);

