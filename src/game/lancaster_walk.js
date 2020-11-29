

class LancasterWalk extends Phaser.Scene {

  constructor()
  {
      super('LancasterWalk');
  }
  init(data) {

    this.gameOver = false;
  }

  collideZone(player, zone) {
      if(zone.name === "end") {
          this.add.text(400, 300, "You Win!", { fontSize: "24px", color: "green" });
          this.gameOver = true;
          this.player.setVelocityX(0).setVelocityY(0);

      }
  }

  nearNpc(player, npc)
  {
    this.incrPlayerInfectionLevel(npc.getData("mask") ? 0.5 : 1.5);
  }

  create(data)  {
      this.add.image(400, 300, "background2").setDisplaySize(800, 600);

      const barriers = this.physics.add.staticGroup();
      //barriers.create(161, 100).setSize(240, 100);
      //barriers.create(435, 160).setSize(160, 250);
      //barriers.create(130, 340).setSize(250, 230);
      //barriers.create(350, 488).setSize(100, 100).setCircle(50);
      //barriers.create(590, 490).setSize(190, 250);
      //barriers.setVisible(true);

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

      const npcs = this.physics.add.staticGroup();
      npcs.create(620, 160, 'npc1').setScale(0.25).setAngle(180).setCircle(70)
        .setData("mask", false);
      npcs.create(320, 305, 'npc2').setScale(0.25).setAngle(90).setCircle(60)
        .setData("mask", true);
      npcs.create(345, 265, 'npc3').setScale(0.25).setAngle(0).setCircle(60)
        .setData("mask", true);
      this.physics.add.overlap(this.player, npcs, (player, npc) => this.nearNpc(player, npc));

      this.handsan = this.physics.add.sprite(20, 123, 'handsan').setScale(0.25);
      this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);

      
      this.add.image(400, 550, "inf_bar").setScale(2);
      const infectionTextStyle = {fontSize: "18px", color: "black"};
      this.add.text(277, 570, "Infection Potential:", infectionTextStyle);
      this.infectionText = this.add.text(500, 570, "0%", infectionTextStyle);
      this.graphics = this.add.graphics();

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

  collectHandSanitizer (player, handsan)
  {
      this.handsan.destroy();
      this.incrPlayerInfectionLevel(-100);
  }

}