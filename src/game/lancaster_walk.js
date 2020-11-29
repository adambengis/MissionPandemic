class LancasterWalk extends Phaser.Scene {

  constructor()
  {
      super('LancasterWalk');
  }
  init(data) {
      this.gameOver = false;
  }


  create(data)  {
      this.add.image(400, 300, "background2").setDisplaySize(800, 600);

  

      this.player = this.physics.add.sprite(161, 171, 'player')
        .setScale(0.25)
        .setAngle(180)
        .setCircle(75)
        .setName("player")
        .setData("infection_level", 0);

      this.player.setCollideWorldBounds(true);

      this.handsan = this.physics.add.sprite(470, 520, 'handsan').setScale(0.25);
      this.physics.add.overlap(this.player, this.handsan, this.collectHandSanitizer, null, this);

      this.add.image(400, 550, "inf_bar").setScale(2);
      const infectionTextStyle = {fontSize: "18px", color: "black"};
      this.add.text(277, 570, "Infection Potential:", infectionTextStyle);
      this.infectionText = this.add.text(500, 570, "0%", infectionTextStyle);
      this.graphics = this.add.graphics();

      this.cursors = this.input.keyboard.createCursorKeys();
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

  }

}