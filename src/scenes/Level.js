//Level.js

class Level extends Phaser.Scene {

	constructor() {
		super("Level");
		this.music = null;
	}

	editorCreate() {
		this.music = this.sound.add("music", { loop: true });
		this.music.play();

		const gameWidth = this.scale.width;
		const gameHeight = this.scale.height;

		const background = this.add.image(gameWidth / 2, gameHeight / 2, "background2");
		background.setDisplaySize(gameWidth, gameHeight);

		const text_1 = this.add.text(gameWidth / 2, 80, "", {});
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

		const colors = ["#ffffff", "#add8e6", "#800080"];
		let currentIndex = 0;

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				currentIndex = (currentIndex + 1) % colors.length;
				const color = colors[currentIndex];
				text_1.setFill(color);
			},
			loop: true,
		});

		const playButton = this.add.image(gameWidth / 2, gameHeight / 2, "playbutton");
		playButton.setInteractive();
		playButton.setScale(0.5);

		playButton.isTweening = false;

		playButton.on("pointerup", () => {
			if (!playButton.isTweening) {
				playButton.isTweening = true;

				this.tweens.add({
					targets: playButton,
					scaleX: 0.45,
					scaleY: 0.45,
					yoyo: true,
					duration: 200,
					onComplete: () => {
						playButton.isTweening = false;
						this.music.stop();
						this.scene.start("GameScene");
					}
				});
			}
		});
	}

	create() {
		this.editorCreate();
	}
}
