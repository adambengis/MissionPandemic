class KormanQuad extends Phaser.Scene {

    constructor()
    {
      super('KormanQuad');
    }
    preload() {
        this.load.image("background", "../assets/backgrounds/korman_quad.jpg");
        this.load.image("background2", "../assets/backgrounds/lancaster_walk800x600.png");
        this.load.image("background3", "../assets/backgrounds/race_lawn800x600.png");
        this.load.image("player", "../assets/characters/red_man_mask_top.svg");
        this.load.image("npc1", "../assets/characters/blue_man_top.svg");
        this.load.image("npc2", "../assets/characters/red_woman_mask_top.svg");
        this.load.image("npc3", "../assets/characters/yellow_woman_mask_top.svg");
        this.load.image("inf_bar", "../assets/icons/infection_bar.svg");
        this.load.image("handsan", "../assets/icons/hand_sanitizer.svg")
        this.load.image("endpoint", "../assets/icons/endpoint.svg");
        this.load.image("losescreen", "../assets/end/losescreen.png");
    }

    init(data) {
      this.gameOver = false;
      this.level = data.level;
      if(this.level == undefined)
      {
        this.level = 1;
      }
      
    }

    collideZone(player, zone) {
      if(zone.name === "end") {
        this.scene.start('LancasterWalk', { level: this.level });
      }
    }

    nearNpc(player, npc)
    {
      const pain = npc.getData("mask") ? NPC_INFECTION_MASK_INCR : NPC_INFECTION_INCR;
      this.incrPlayerInfectionLevel(pain * this.level * NPC_INFECTION_MULT);
    }

    create(data)  {
        this.add.image(400, 300, "background").setDisplaySize(800, 600);
        
        const barriers = this.physics.add.staticGroup();
        barriers.create(161, 100).setSize(240, 100);
        barriers.create(435, 160).setSize(160, 250);
        barriers.create(130, 340).setSize(250, 230);
        barriers.create(350, 488).setSize(100, 100).setCircle(50);
        barriers.create(590, 490).setSize(190, 250);
        barriers.setVisible(false);

        const zones = this.physics.add.staticGroup();
        // end zone
        zones.create(285, 410, "endpoint")
          .setSize(1, 1)
          .setDisplaySize(25, 25)
          .setName("end");

        this.player = this.physics.add.sprite(161, 171, 'player')
          .setScale(0.25)
          .setAngle(180)
          .setCircle(75)
          .setName("player")
          .setData("infection_level", 0);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, barriers);
        this.physics.add.collider(this.player, zones, (player, zone) => this.collideZone(player, zone));


        const npcs = this.physics.add.group();
        const npc1 = npcs.create(302, 144, 'npc1')
          .setScale(0.25)
          .setAngle(180)
          .setOffset(-75, -75)
          .setCircle(150)
          .setData("mask", false);
        this.tweens.add({
          targets: npc1,
          props: {
            y: { from: npc1.y, to: npc1.y+100 },
          },
          flipY: true,
          flipX: true,
          ease: 'Linear',      
          duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
          repeat: -1,       
          yoyo: true
        });
        const npc2 = npcs.create(295, 402, 'npc2')
          .setScale(0.25)
          .setAngle(0)          
          .setOffset(-75, -75)
          .setCircle(150)
          .setData("mask", true);
        this.tweens.add({
          targets: npc2,
          props: {
            y: { from: npc2.y, to: npc2.y-100 },
          },
          flipY: true,
          flipX: true,
          ease: 'Linear',      
          duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
          repeat: -1,       
          yoyo: true
        });
        const npc3 = npcs.create(345, 376, 'npc3')
          .setScale(0.25)
          .setAngle(45)
          .setOffset(-75, -75)
          .setCircle(150)
          .setData("mask", true);
        this.tweens.add({
          targets: npc3,
          props: {
            x: { from: npc3.x, to: npc3.x+100 },
            y: { from: npc3.y, to: npc3.y-40 },
            // flipX, flipY called per attribute
            fake: {from: 0, to: 0}
          },
          flipX: true,
          flipY: true,
          ease: 'Linear',      
          duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
          repeat: -1,       
          yoyo: true
        });
        this.physics.add.overlap(this.player, npcs, (player, npc) => this.nearNpc(player, npc));

        this.handsan = this.physics.add.sprite(470, 520, 'handsan').setScale(0.25);
        this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);

        
        this.add.image(400, 550, "inf_bar").setScale(2);
        const infectionTextStyle = {fontSize: "18px", color: "black"};
        this.add.text(277, 570, "Infection Potential:", infectionTextStyle);
        this.infectionText = this.add.text(500, 570, "0%", infectionTextStyle);
        this.graphics = this.add.graphics();
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(700, 20, "Day: " + this.level , { fontSize: "24px", color: "red" });
    }

    incrPlayerInfectionLevel(incr) {
      if(incr == 0 || this.gameOver) return;

      const drawHealthCircle = health => (
        this.graphics.fillCircle(412+119*(health/55-1), 550, 14)
      );

      const inf_level = this.player.getData("infection_level");
      let new_inf_level = inf_level + incr;
      this.graphics.fillStyle(0xffff00, 1);

      if(incr > 0) {
        if(new_inf_level > 100) new_inf_level = 100;

        for(let i = inf_level; i < new_inf_level; i++) {
          drawHealthCircle(i);
        }
      } else {
        if(new_inf_level < 0) new_inf_level = 0;

        this.graphics.clear();
        for(let i = 0; i < new_inf_level; i++) {
          drawHealthCircle(i);
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
        this.loseText = this.add.image(400, 300, "losescreen").setDisplaySize(800, 600);
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

      this.infectionText.setText(`${Phaser.Math.RoundTo(this.player.getData("infection_level"))}%`);
    }

    collectHandSanitizer (player, handsan)
    {
        handsan.destroy();
        this.incrPlayerInfectionLevel(-100);
    }
}

