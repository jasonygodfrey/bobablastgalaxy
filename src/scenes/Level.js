
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
  text_1.text = "🧋🌌BOBA BLAST GALAXY🚀🌠";
  text_1.setStyle({
    fontFamily: "CuteFont",
    fontSize: "48px",
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
		const playButton = this.add.image(640, 360, "playbutton");
		playButton.setInteractive();
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
