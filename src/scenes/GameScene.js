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
    }

    update() {
        // Scroll the background slower
        this.background.tilePositionY -= 0.2;
    }

    /* END-USER-CODE */
}
