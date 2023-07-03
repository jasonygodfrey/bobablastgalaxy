//GameScene.js
class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
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

    // Write more your code here

    create() {
        this.editorCreate();
    
        // Create the player spaceship
        this.player = this.add.sprite(640, 600, 'ship1');
        this.player.setScale(0.5); // Adjust the scale to make it smaller
    
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
    }
    
    

    update() {
        // Scroll the background slower
        this.background.tilePositionY -= 0.2;
    }

    /* END-USER-CODE */
}
