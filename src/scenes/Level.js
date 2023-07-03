//Level.js
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");
		this.music = null; // Add this line

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		// Load the audio
		this.music = this.sound.add("music", { loop: true });
		this.music.play();
		// Load the background image
		const background = this.add.image(640, 360, "background2");
		background.setScale(0.5); // Scale the background image by 50% to fit the screen
		background.setDisplaySize(1280, 720); // Set the display size of the background image to match the scaled size


		// text_1
		const text_1 = this.add.text(640, 80, "", {});
		text_1.setOrigin(0.5, 0);
		text_1.text = "🧋🌌BOBA BLAST GALAXY🚀🌠";
		text_1.setStyle({
			fontFamily: "Comic Sans MS",
			fontSize: "80px",
			fill: "#ff96f5",
			stroke: "#ffffff",
			strokeThickness: 4,
			shadow: {
				offsetX: 2,
				offsetY: 2,
				color: "#ffc0e3",
				blur: 8,
				stroke: true,
				fill: true,
			},
		});

		// Set up the color rotation
		const colors = ["#ffffff", "#add8e6", "#800080"]; // Colors: white, light blue, purple
		let currentIndex = 0;

		this.time.addEvent({
			delay: 1000, // Delay between color changes
			callback: () => {
				currentIndex = (currentIndex + 1) % colors.length;
				const color = colors[currentIndex];
				text_1.setFill(color);
			},
			loop: true,
		});
		// playButton
		const playButton = this.add.image(640, 520, "playbutton");
		playButton.setInteractive();
		playButton.setScale(0.5); // Start scale

		playButton.isTweening = false; // Add a property to check if the button is in a tween

		playButton.on("pointerup", () => {
			if (!playButton.isTweening) { // Only react to the click if the button is not in a tween
				console.log("Play button clicked");

				// Set the isTweening property to true at the start of the tween
				playButton.isTweening = true;

				// Scales down the button to simulate a press
				this.tweens.add({
					targets: playButton,
					scaleX: 0.45,
					scaleY: 0.45,
					yoyo: true, // Yoyo effect makes the scale go back to its original value after reaching 0.45
					duration: 200,
					onComplete: () => { // Use arrow function here to keep 'this' context
						playButton.isTweening = false;
						this.music.stop(); // stop the music
						this.scene.start("GameScene"); // Start the main game scene
					}
				});
			}
		});





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
