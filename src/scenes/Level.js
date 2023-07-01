
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		// Load the background image
		this.add.image(640, 360, "background");
	  
		// dino
		const dino = this.add.image(640, 288, "dino");
	  
		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(dino);
	  
		// pushActionScript
		new PushActionScript(onPointerDownScript);
	  
		// text_1
		const text_1 = this.add.text(640, 478, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "🧋🌌game-boba-blast-galaxy🚀🌠";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });
	  
		// playButton
		const playButton = this.add.image(640, 360, "playbutton");
		playButton.setInteractive();
		playButton.on("pointerup", () => {
		  // Handle play button click event
		  console.log("Play button clicked");
		});
	  
		this.events.emit("scene-awake");
	  }
	  

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
