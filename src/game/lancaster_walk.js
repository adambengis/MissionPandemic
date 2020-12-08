class LancasterWalk extends Phaser.Scene {

  constructor()
  {
      super('LancasterWalk');
  }
  init(data) {
    this.gameOver = false;
    this.level = data.level;
  }

  collideZone(player, zone) {
    if (zone.name === "end") {
      this.scene.start('RaceLawn', { level: this.level });

    }
  }

  nearNpc(player, npc)
  {
    const pain = npc.getData("mask") ? NPC_INFECTION_MASK_INCR : NPC_INFECTION_INCR;
    this.incrPlayerInfectionLevel(pain * this.level * NPC_INFECTION_MULT);
  }

  create(data)  {
      this.add.image(400, 300, "background2").setDisplaySize(800, 600);

      const barriers = this.physics.add.staticGroup();
      barriers.create(245, 498).setSize(260, 200);
      barriers.create(45, 450).setSize(62, 220);
      // FIXME: you can clip into the building by pushing on the tree
      barriers.create(358, 373).setSize(70, 70).setCircle(25);
      barriers.create(198, 290).setSize(70, 70).setCircle(25);
      barriers.create(78, 223).setSize(120, 120).setCircle(54);
      barriers.create(265, 58).setSize(400, 80);
      barriers.create(712, 310).setSize(66, 220);
      barriers.create(390, 210).setSize(70, 70).setCircle(30);
      barriers.create(445, 190).setSize(20, 20).setCircle(10);
      barriers.create(430, 210).setSize(20, 20).setCircle(10);
      barriers.create(415, 230).setSize(20, 20).setCircle(10);
      barriers.create(502, 230).setSize(50, 50).setCircle(40);
      barriers.create(532, 195).setSize(50, 50).setCircle(40);
      barriers.create(544, 450).setSize(100, 100).setCircle(45);
      barriers.create(676, 566).setSize(100, 100).setCircle(45);
      barriers.create(447, 420).setSize(30, 160);
      barriers.setVisible(false);

      const zones = this.physics.add.staticGroup();
      // end zone
      zones.create(650, 230, "endpoint")
        .setSize(1, 1)
        .setDisplaySize(25, 25)
        .setName("end");

      this.player = this.physics.add.sprite(240, 370, 'player')
        .setScale(0.25)
        .setAngle(0)
        .setCircle(75)
        .setName("player")
        .setData("infection_level", 0);

      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, barriers);
      this.physics.add.collider(this.player, zones, (player, zone) => this.collideZone(player, zone));

      const npcs = this.physics.add.group();
      const npc1 = npcs.create(620, 160, 'npc1')
        .setScale(0.25)
        .setAngle(170)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);

      const npc2 = npcs.create(270, 305, 'npc1')
        .setScale(0.25)
        .setAngle(90)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);

      const npc3 = npcs.create(370, 260, 'npc3')
        .setScale(0.25)
        .setAngle(-50)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", true);

      const npc4 = npcs.create(560, 150, 'npc2')
        .setScale(0.25)
        .setAngle(-90)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", true);

      const npc5 = npcs.create(475, 315, 'npc2')
        .setScale(0.25)
        .setAngle(135)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", true);
                              

      const clouds = this.physics.add.group();
      const cloud1 = clouds.create(620, 160, 'cloud')
        .setScale(0.25)
        .setAngle(170)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);
      const cloud2 = clouds.create(270, 305, 'cloud')
        .setScale(0.25)
        .setAngle(90)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);
      const cloud3 = clouds.create(370, 260, 'cloud')
        .setScale(0.25)
        .setAngle(-50)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);
      const cloud4 = clouds.create(560, 150, 'cloud')
        .setScale(0.25)
        .setAngle(-90)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);
      const cloud5 = clouds.create(475, 315, 'cloud')
        .setScale(0.25)
        .setAngle(135)
        .setOffset(-75, -75)
        .setCircle(150)
        .setData("mask", false);
      this.tweens.add({
        targets: [npc1, cloud1],
        props: {
          y: { from: npc1.y, to: npc1.y+80 },
          x: { from: npc1.x, to: npc1.x+30 },
          fake: {from: 0, to: 0}
        },
        flipY: true,
        flipX: true,
        ease: 'Linear',      
        duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
        repeat: -1,       
        yoyo: true
      });
      this.tweens.add({
        targets: [npc2, cloud2],
        props: {
          x: { from: npc2.x, to: npc2.x+100 },
        },
        flipY: true,
        flipX: true,
        ease: 'Linear',      
        duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
        repeat: -1,       
        yoyo: true
      });
      this.tweens.add({
        targets: [npc3, cloud3],
        props: {
          y: { from: npc3.y, to: npc3.y-40 },
          x: { from: npc3.x, to: npc3.x-100 },
          fake: { from: 0, to: 0 },
        },
        flipY: true,
        flipX: true,
        ease: 'Linear',      
        duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
        repeat: -1,       
        yoyo: true
      });
      this.tweens.add({
        targets: [npc4, cloud4],
        props: {
          x: { from: npc4.x, to: npc4.x-120 },
        },
        flipY: true,
        flipX: true,
        ease: 'Linear',      
        duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
        repeat: -1,       
        yoyo: true
      });
      this.tweens.add({
        targets: [npc5, cloud5],
        props: {
          y: { from: npc5.y, to: npc5.y+70 },
          x: { from: npc5.x, to: npc5.x+130 },
          fake: {from: 0, to: 0}
        },
        flipY: true,
        flipX: true,
        ease: 'Linear',      
        duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
        repeat: -1,       
        yoyo: true
      });


      this.physics.add.overlap(this.player, npcs, (player, npc) => this.nearNpc(player, npc));

      this.handsan = this.physics.add.sprite(35, 580, 'handsan').setScale(0.20);
      this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);

      
      this.add.image(400, 550, "inf_bar").setScale(2);
      const infectionTextStyle = {fontSize: "18px", color: "black"};
      this.add.text(277, 570, "Infection Potential:", infectionTextStyle);
      this.infectionText = this.add.text(500, 570, "0%", infectionTextStyle);
      this.graphics = this.add.graphics();

      this.add.text(700, 20, "Day: " + this.level , { fontSize: "24px", color: "red", backgroundColor: "white"});
      this.add.text(110, 30, "OBJECTIVE: Get to the Rush Building", { fontSize: "26px", color: "lightgreen", backgroundColor:"green" })

      this.cursors = this.input.keyboard.createCursorKeys();
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