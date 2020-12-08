class RaceLawn extends Phaser.Scene {

  constructor()
  {
      super('RaceLawn');
  }
  init(data) {
    this.level = data.level;
    this.gameOver = false;
  }

  collideZone(player, zone) {
    if (zone.name === "end") {
      this.level += 1;
      this.scene.start('KormanQuad', {level: this.level});

    }
  }

  nearNpc(player, npc)
  {
    const pain = npc.getData("mask") ? NPC_INFECTION_MASK_INCR : NPC_INFECTION_INCR;
    this.incrPlayerInfectionLevel(pain * this.level * NPC_INFECTION_MULT);
  }

  create(data)  {
    this.add.image(400, 300, "background3").setDisplaySize(800, 600);

    const barriers = this.physics.add.staticGroup();
    barriers.create(613, 29).setSize(135, 77);
    barriers.create(560, 211).setSize(50, 100);
    barriers.create(598, 218).setSize(39, 67);
    barriers.create(612, 338).setSize(40, 40);
    barriers.create(573, 424).setSize(40, 40);
    barriers.create(707, 446).setSize(40, 40);
    barriers.create(652, 510).setSize(40, 40);
    barriers.create(532, 70).setSize(40, 40);
    barriers.create(301, 21).setSize(40, 40);
    barriers.create(87, 85).setSize(40, 40);
    barriers.create(305, 81).setSize(97, 67);
    barriers.create(333, 162).setSize(68, 105);
    barriers.create(305, 81).setSize(97, 67);
    barriers.create(374, 290).setSize(136, 213);
    barriers.create(450, 337).setSize(32, 99);
    barriers.create(301, 249).setSize(39, 106);
    barriers.create(423, 463).setSize(77, 135);
    barriers.create(383, 510).setSize(48, 55);
    barriers.create(141, 429).setSize(69, 196);
    barriers.create(91, 500).setSize(58, 42);
    barriers.create(184, 82).setSize(40, 148);
    barriers.create(141, 429).setSize(69, 196);
    barriers.create(103, 222).setSize(135, 94);
    barriers.create(591, 120).setSize(17, 100);
    barriers.create(666, 121).setSize(20, 30);
    barriers.create(434, 138).setSize(13, 59);
    barriers.create(99, 420).setSize(18, 79);
    barriers.setVisible(false);

    const zones = this.physics.add.staticGroup();
    // end zone
    zones.create(140, 100, "endpoint")
      .setSize(1, 1)
      .setDisplaySize(25, 25)
      .setName("end");

    this.player = this.physics.add.sprite(630, 100, 'player')
      .setScale(0.25)
      .setAngle(180)
      .setCircle(75)
      .setName("player")
      .setData("infection_level", 0);

    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, barriers);
    this.physics.add.collider(this.player, zones, (player, zone) => this.collideZone(player, zone));

    const npcs = this.physics.add.group();
    const npc1 = npcs.create(726, 150, 'npc1')
      .setScale(0.25)
      .setAngle(170)
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", false);
    this.tweens.add({
      targets: npc1,
      props: {
        y: { from: npc1.y, to: npc1.y+150 },
        x: { from: npc1.x, to: npc1.x+20 },
        fake: { from: 0, to: 0 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc2 = npcs.create(265, 435, 'npc2')
      .setScale(0.25)
      .setAngle(160)
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", true);
    this.tweens.add({
      targets: npc2,
      props: {
        y: { from: npc2.y, to: npc2.y+100 },
        x: { from: npc2.x, to: npc2.x+20 },
        fake: { from: 0, to: 0 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc3 = npcs.create(50, 455, 'npc3')
      .setScale(0.25)
      .setAngle(0)          
      .setOffset(-75, -75)    
      .setCircle(150)
      .setData("mask", true);
    this.tweens.add({
      targets: npc3,
      props: {
        y: { from: npc3.y, to: npc3.y-130 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc4 = npcs.create(775, 514, 'npc1')
      .setScale(0.25)
      .setAngle(-10)          
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", false);
    this.tweens.add({
      targets: npc4,
      props: {
        y: { from: npc4.y, to: npc4.y-150 },
        x: { from: npc4.x, to: npc4.x-20 },
        fake: { from: 0, to: 0 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc5 = npcs.create(545, 289, 'npc2')
      .setScale(0.25)
      .setAngle(270)          
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", true);  
    this.tweens.add({
      targets: npc5,
      props: {
        x: { from: npc5.x, to: npc5.x-50 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc6 = npcs.create(35, 150, 'npc3')
      .setScale(0.25)
      .setAngle(90)          
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", true);
    this.tweens.add({
      targets: npc6,
      props: {
        x: { from: npc6.x, to: npc6.x+80 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    });
    const npc7 = npcs.create(240, 45, 'npc2')
      .setScale(0.25)
      .setAngle(180)          
      .setOffset(-75, -75)
      .setCircle(150)
      .setData("mask", true); 
    this.tweens.add({
      targets: npc7,
      props: {
        y: { from: npc7.y, to: npc7.y+150 },
      },
      flipY: true,
      flipX: true,
      ease: 'Linear',      
      duration: INITIAL_MOVE_TIME - this.level * MOVE_TIME_DECR,
      repeat: -1,       
      yoyo: true,
      onStart: onTweenStart,
    }); 
    this.physics.add.overlap(this.player, npcs, (player, npc) => this.nearNpc(player, npc));

    this.handsan = this.physics.add.sprite(370, 420, 'handsan').setScale(0.25);
    this.handsan2 = this.physics.add.sprite(400, 140, 'handsan').setScale(0.25);
    this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);
    this.physics.add.overlap(this.player, this.handsan2, this.collectHandSanitizer, null, this);
      
    this.add.image(400, 550, "inf_bar").setScale(2);
    const infectionTextStyle = {fontSize: "18px", color: "black"};
    this.add.text(277, 570, "Infection Potential:", infectionTextStyle);
    this.infectionText = this.add.text(500, 570, "0%", infectionTextStyle);
    this.graphics = this.add.graphics();

    this.add.text(700, 20, "Day: " + this.level , { fontSize: "24px", color: "red", backgroundColor: "white"});
    this.add.text(150, 30, "OBJECTIVE: Get to Ross Commons", { fontSize: "26px", color: "lightpink", backgroundColor:"red" })

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