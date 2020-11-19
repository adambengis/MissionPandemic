class KormanQuad extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image("background", "../assets/backgrounds/korman_quad.jpg");
        this.load.image("player", "../assets/characters/red_man_top.svg");
        this.load.image("npc1", "../assets/characters/yellow_woman_top.svg");
        this.load.image("npc2", "../assets/characters/blue_man_top.svg");
        this.load.image("npc3", "../assets/characters/red_woman_top.svg");
    }

    init(data) {
        this.gameOver = false;
    }

    collideCb(objA, objB) {
        if((objA.name === "player" && objB.name === "end")
            || (objB.name === "player" && objA.name === "end")) {
            this.add.text(400, 300, "Success!", { color: "green" });
            this.gameOver = true;
            this.player.setVelocityX(0).setVelocityY(0);
        }
    }

    create(data)  {
        this.add.image(400, 300, "background").setDisplaySize(800, 600);

        const borders = this.physics.add.staticGroup();
        // bottom left green
        borders.create(125, 352, null).setVisible(false).setSize(150, 150).setName("start");
        // top right yellow
        borders.create(632, 80, null).setVisible(false).setSize(185, 145).setName("end");

        this.player = this.physics.add.sprite(161, 171, 'player').setScale(0.25).setAngle(180).setName("player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, borders, (objA, objB) => this.collideCb(objA, objB));


        this.physics.add.sprite(302, 144, 'npc1').setScale(0.25).setAngle(180);
        this.physics.add.sprite(295, 342, 'npc2').setScale(0.25).setAngle(90);
        this.physics.add.sprite(345, 376, 'npc3').setScale(0.25).setAngle(0);
    }

    updateGameplay(time, delta) {
      const cursors = this.input.keyboard.createCursorKeys();

      if (cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.setAngle(-90);
      }
      else if (cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.setAngle(90);
      }
      else {
          this.player.setVelocityX(0);
      }
      if (cursors.up.isDown) {
          this.player.setVelocityY(-160);
          this.player.setAngle(0);
      }
      else if (cursors.down.isDown) {
          this.player.setVelocityY(160);
          this.player.setAngle(180);
      }
      else {
          this.player.setVelocityY(0);
      }
    }

    updateOutOfGame(time, delta) {

    }

    update(time, delta) {
        if(!this.gameOver) {
            this.updateGameplay(time, delta);
        }
        else {
          this.updateOutOfGame(time, delta);
        }
    }
}