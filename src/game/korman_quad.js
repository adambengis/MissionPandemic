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
        this.load.image("handsan", "../assets/icons/hand_sanitizer.svg")
    }

    init(data) {
        this.gameOver = false;
    }

    collideCb(objA, objB) {
        if((objA.name === "player" && objB.name === "end")
            || (objB.name === "player" && objA.name === "end")) {
            this.add.text(400, 300, "You Win!", { fontSize: "24px", color: "green" });
            this.gameOver = true;
            this.player.setVelocityX(0).setVelocityY(0);
        }
    }

    create(data)  {
        this.add.image(400, 300, "background").setDisplaySize(800, 600);
        
        this.loseText = this.add.text(400, 300, "You Lost!", { fontSize: "24px", color: "red" });
        this.loseText.setVisible(false);

        const borders = this.physics.add.staticGroup();
        // start zone
        borders.create(162, 170, null).setVisible(false).setSize(10, 10).setName("start");
        // end zone
        borders.create(290, 420, null).setVisible(false).setSize(10, 10).setName("end");

        this.player = this.physics.add.sprite(161, 171, 'player').setScale(0.25).setAngle(180).setName("player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, borders, (objA, objB) => this.collideCb(objA, objB));


        this.npc1 = this.physics.add.sprite(302, 144, 'npc1').setScale(0.25).setAngle(180);
        this.npc2 = this.physics.add.sprite(295, 342, 'npc2').setScale(0.25).setAngle(90);
        this.npc3 = this.physics.add.sprite(345, 376, 'npc3').setScale(0.25).setAngle(0);
        this.physics.add.overlap(this.player, this.npc1, this.touchNPC, null, this);
        this.physics.add.overlap(this.player, this.npc2, this.touchNPC, null, this);
        this.physics.add.overlap(this.player, this.npc3, this.touchNPC, null, this);

        this.handsan = this.physics.add.sprite(470, 520, 'handsan').setScale(0.25);
        this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);
        
        this.infectionLevel = 0;
        this.infectionText = this.add.text(580, 550, "Infection: 0", {fontSize: "24px", color: "red"});
        
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
      
      if(this.infectionLevel >= 100)
      {
          this.gameOver = true;
          this.loseText.setVisible(true);
          
      }
      
      this.infectionText.text = "Infection: " + this.infectionLevel;
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

    touchNPC(player, npc)
    {
        this.infectionLevel += 2;
    }
    collectHandSanitizer (player, handsan)
    {
        this.handsan.destroy();
        this.infectionLevel = 0;

    }
}