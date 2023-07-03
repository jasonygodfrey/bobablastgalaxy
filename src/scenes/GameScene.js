//GameScene.js
class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

        /* START-USER-CTR-CODE */

        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    shootProjectile() {
        // Create the projectile
        let projectile = this.add.sprite(this.player.x, this.player.y - 50, 'boba1');
        projectile.setScale(0.2); // Adjust the scale of the projectile if necessary

        // Set the speed of the projectile
        let projectileSpeed = 190;

        // Calculate the distance the projectile needs to travel to move off screen
        let distance = this.player.y + 50;

        // Move the projectile up (in Galaga, projectiles move upwards)
        this.tweens.add({
            targets: projectile,
            y: `-=${distance}`, // move upwards off screen
            angle: 360, // rotate 360 degrees
            duration: 1000 * (distance / projectileSpeed), // time based on speed
            onComplete: () => {
                projectile.destroy(); // destroy the projectile when it goes off screen
            }
        });

        // Check for collision between the projectile and enemies
        const hitRange = 50; // Adjust the hit range as needed

        this.enemies.getChildren().forEach((enemy) => {
            // Calculate the distance between the projectile and the enemy
            const dx = projectile.x - enemy.x;
            const dy = projectile.y - enemy.y;
            const distanceSquared = dx * dx + dy * dy;

            // Check if the distance is within the hit range
            if (distanceSquared <= hitRange * hitRange) {
                enemy.destroy();
                projectile.destroy();
            }
        });
    }


    /** @returns {void} */
    editorCreate() {
        // Load the background image
        // Create the "pinkstars1" tileSprite
        this.background = this.add.tileSprite(640, 360, 1280, 720, "pinkstars1");

        // Zoom in the background
        this.background.tileScaleX = 2;
        this.background.tileScaleY = 2;

        // Load the audio
        const music = this.sound.add("queen", { loop: true });
        music.play();
        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */
    preload() {
        this.load.pack("assetPack", "assets/assetPack.json");

        // Load the sprite sheet with frame dimensions
        this.load.spritesheet('sparkle1', 'assets/sparkle1spritesheet.png', { frameWidth: 332, frameHeight: 600 });


    }
    // Write more your code here
    create() {
        this.editorCreate();

        // Create an animation from the sprite sheet
        this.anims.create({
            key: 'sparkleAnimation',
            frames: this.anims.generateFrameNumbers('sparkle1', { start: 0, end: 91 }),
            frameRate: 60,
            repeat: -1
        });



        // Create the player spaceship
        this.player = this.add.sprite(640, 600, 'ship1');
        this.player.setScale(0.5); // Adjust the scale to make it smaller

        // Add the sparkle animation as the 'exhaust' of the player ship
        this.playerExhaust = this.add.sprite(this.player.x, this.player.y + 90, 'sparkle1');
        this.playerExhaust.play('sparkleAnimation');
        this.playerExhaust.setScale(0.5, 0.2); // Adjust the scale to make the height smaller


        // Set the depth of the playerExhaust to be less than the player
        this.playerExhaust.setDepth(1);


        // Enable input for the player spaceship
        this.player.setInteractive();
        this.input.setDraggable(this.player);

        // Register the pointermove event to update the player spaceship's position
        this.input.on('pointermove', (pointer) => {
            this.player.x = pointer.x;
            this.player.y = pointer.y;
        });

        // Hide the mouse cursor when over the player spaceship
        this.input.on('pointerover', () => {
            document.body.style.cursor = 'none';
        });

        // Show the mouse cursor when not over the player spaceship
        this.input.on('pointerout', () => {
            document.body.style.cursor = 'default';
        });

        // Create the level indicator text
        this.levelText = this.add.text(
            this.sys.game.config.width - 20,
            20,
            'Level: 1',
            {
                fontFamily: 'Arial',
                fontSize: '44px',
                fill: '#ffffff',
                align: 'right'
            }
        );
        this.levelText.setOrigin(1, 0);

        // Create the health bar
        const healthBarWidth = 350;
        const healthBarHeight = 35;
        const healthBarX = 20;
        const healthBarY = 20;
        const healthBarFillColor = 0xff0000; // Red color
        this.healthBar = this.add.rectangle(healthBarX, healthBarY, healthBarWidth, healthBarHeight, healthBarFillColor);
        this.healthBar.setOrigin(0, 0);
        this.healthBar.setScale(1, 1); // Adjust the scale to modify the health level

        // Create the health text
        this.healthText = this.add.text(
            healthBarX + healthBarWidth / 2,
            healthBarY + healthBarHeight / 2,
            'BloodSugar: 10',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center'
            }
        );
        this.healthText.setOrigin(0.7, 0.5); // Center the text horizontally and vertically within the health bar


        // Create the enemy group
        this.enemies = this.add.group();

        // Add 10 enemy sprites to the group
        for (let i = 0; i < 10; i++) {
            const enemy = this.add.sprite(
                Phaser.Math.Between(0, this.sys.game.config.width),
                Phaser.Math.Between(-500, -100),
                'enemy1'
            );
            enemy.setScale(0.5); // Adjust the scale to make it smaller
            this.enemies.add(enemy);
            this.tweens.add({
                targets: enemy,
                y: Phaser.Math.Between(100, 300), // Y position to animate to
                duration: 2000, // Animation duration in milliseconds
                ease: 'Power1', // Easing function
                delay: i * 200, // Delay each enemy's animation to create a staggered effect
            });
        }


        // Start the shooting timer
        this.time.addEvent({
            delay: 3000, // 3000 milliseconds = 3 seconds
            callback: this.shootProjectile, // function to be called
            callbackScope: this, // context for the callback function
            loop: true // repeat indefinitely
        });
    }




    update() {
        // Update the position of the exhaust to follow the player ship
        this.playerExhaust.x = this.player.x;
        this.playerExhaust.y = this.player.y + 110;


        // Scroll the background slower
        this.background.tilePositionY -= 0.2;

        // Update the health bar

        const playerHealth = 80; // Replace this with the actual player health value
        const healthBarWidth = 200;
        const healthPercentage = playerHealth / 100; // Convert the health to a percentage value
        this.healthBar.setScale(healthPercentage, 1); // Adjust the health bar scale based on the health percentage
    }

    /* END-USER-CODE */
}
