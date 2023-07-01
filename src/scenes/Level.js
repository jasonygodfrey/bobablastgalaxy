
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
		const background = this.add.image(640, 360, "background2");
		background.setScale(0.5); // Scale the background image by 50% to fit the screen
		background.setDisplaySize(1280, 720); // Set the display size of the background image to match the scaled size


		// text_1
		const text_1 = this.add.text(640, 80, "", {});
		text_1.setOrigin(0.5, 0);
		text_1.text = "🧋🌌BOBA BLAST GALAXY🚀🌠";
		text_1.setStyle({
			fontFamily: "CuteFont",
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
const playButton = this.add.image(640, 520, "playbutton"); // Update the Y position to move the play button down
playButton.setInteractive();
playButton.setScale(0.5); // Reduce the size of the play button by 20%
playButton.on("pointerup", () => {
  // Handle play button click event
  console.log("Play button clicked");
});
		// Load the audio
		const music = this.sound.add("music", { loop: true });
		music.play();
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
