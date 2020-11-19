class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("level_bg", "../assets/level_t.png");
        this.load.image("player", "../assets/Player2.svg");
        this.load.image("npc", "../assets/npc_top.png");
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
        this.add.image(400, 300, "level_bg").setDisplaySize(800, 600);

        const borders = this.physics.add.staticGroup();
        // bottom left green
        borders.create(125, 352, null).setVisible(false).setSize(150, 150).setName("start");
        // top right yellow
        borders.create(632, 80, null).setVisible(false).setSize(185, 145).setName("end");

        this.player = this.physics.add.sprite(225, 350, 'player').setName("player");
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, borders, (objA, objB) => this.collideCb(objA, objB));

    }

    update(time, delta) {
        if(!this.gameOver) {
            const cursors = this.input.keyboard.createCursorKeys();

            if (cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.angle = -90;
            }
            else if (cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.angle = 90;
            }
            else {
                this.player.setVelocityX(0);
            }
            if (cursors.up.isDown) {
                this.player.setVelocityY(-160);
                this.player.angle = 0;
            }
            else if (cursors.down.isDown) {
                this.player.setVelocityY(160);
                this.player.angle = 180;
            }
            else {
                this.player.setVelocityY(0);
            }
        }
    }
}