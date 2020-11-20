class KormanQuad extends Phaser.Scene {
    preload() {
        this.load.image("background", "../assets/backgrounds/korman_quad.jpg");
        this.load.image("player", "../assets/characters/red_man_top.svg");
        this.load.image("npc1", "../assets/characters/yellow_woman_top.svg");
        this.load.image("npc2", "../assets/characters/blue_man_top.svg");
        this.load.image("npc3", "../assets/characters/red_woman_top.svg");
        this.load.image("inf_bar", "../assets/icons/infection_bar.svg");
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
        const borders = this.physics.add.staticGroup();
        // start zone
        borders.create(162, 170, null).setVisible(false).setSize(10, 10).setName("start");
        // end zone
        borders.create(290, 420, null).setVisible(false).setSize(10, 10).setName("end");

        this.player = this.physics.add.sprite(161, 171, 'player')
          .setScale(0.25)
          .setAngle(180)
          .setCircle(75)
          .setName("player")
          .setData("infection_level", 0);
        this.player.setCollideWorldBounds(true);

        this.add.image(400, 550, "inf_bar").setScale(2);
        this.graphics = this.add.graphics();

        this.physics.add.collider(this.player, borders, (objA, objB) => this.collideCb(objA, objB));

        const npcs = this.physics.add.staticGroup();
        npcs.create(302, 144, 'npc1').setScale(0.25).setAngle(180).setCircle(70);
        npcs.create(295, 342, 'npc2').setScale(0.25).setAngle(90).setCircle(70);
        npcs.create(345, 376, 'npc3').setScale(0.25).setAngle(0).setCircle(70);
        this.physics.add.overlap(this.player, npcs, () => this.touchNPC());

        this.handsan = this.physics.add.sprite(470, 520, 'handsan').setScale(0.25);
        this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);

        const infectionTextStyle = {fontSize: "18px", color: "black"};
        this.add.text(260, 570, "Infection Potential:", infectionTextStyle);
        this.infectionText = this.add.text(482, 570, "0%", infectionTextStyle);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    incrPlayerInfectionLevel(incr) {
      if(incr == 0 || this.gameOver) return;

      const inf_level = this.player.getData("infection_level");
      let new_inf_level = inf_level + incr;
      this.graphics.fillStyle(0xffff00, 1);

      if(incr > 0) {
        if(new_inf_level > 100) new_inf_level = 100;

        for(let i = inf_level; i < new_inf_level; i++) {
          this.graphics.fillCircle(400+115*(i/55-1), 549, 14);
        }
      } else {
        if(new_inf_level < 0) new_inf_level = 0;

        this.graphics.clear();
        for(let i = 0; i < new_inf_level; i++) {
          this.graphics.fillCircle(400+115*(i/55-1), 549, 14);
        }
      }
      this.player.setData("infection_level", new_inf_level); 
    }

    updateGameplay(time, delta) {
      // player movement
      if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.setAngle(-90);
      }
      else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.setAngle(90);
      }
      else {
          this.player.setVelocityX(0);
      }
      if (this.cursors.up.isDown) {
          this.player.setVelocityY(-160);
          this.player.setAngle(0);
      }
      else if (this.cursors.down.isDown) {
          this.player.setVelocityY(160);
          this.player.setAngle(180);
      }
      else {
          this.player.setVelocityY(0);
      }
      // endgame check
      if(this.player.getData("infection_level") >= 100)
      {
        this.gameOver = true;
        this.loseText = this.add.text(400, 300, "You Lost!", { fontSize: "24px", color: "red" });
        this.player.setVelocityX(0).setVelocityY(0);
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

      this.infectionText.setText(`${this.player.getData("infection_level")}%`);
    }

    touchNPC(player, npc)
    {
        this.incrPlayerInfectionLevel(1);
    }

    collectHandSanitizer (player, handsan)
    {
        this.handsan.destroy();
        this.incrPlayerInfectionLevel(-100);
    }
}