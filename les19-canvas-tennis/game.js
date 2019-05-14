class Game {
		constructor (config) {
				const defaultConfig = {
						ballRadius: 10,
						paddleHeight: 70,
						paddleWidth: 10,
						mainFillColor: '#0095DD',
						mainStrokeColor: '#333',
						count: 10,
						accelerate: 0.02,
				};

				this.config = config || defaultConfig;
				this.canvas = document.getElementById('myCanvas');
				this.ctx = this.canvas.getContext('2d');

				this.x = this.canvas.width / 2;
				this.y = this.canvas.height / 2;
				this.dx = 3;
				this.dy = 3;
				this.randomDirectionStart();

				this.paddle1Y = (this.canvas.height - this.config.paddleHeight) / 2;
				this.paddle2Y = (this.canvas.height - this.config.paddleHeight) / 2;
				this.rightPressed = false;
				this.leftPressed = false;
				this.score1 = 0;
				this.score2 = 0;
				this.isPause = false;
				this.bricks = [];

				this.init();

				this.draw();
		}

		init () {

				document.addEventListener('keydown', this.keyDownHandler.bind(this));
				document.addEventListener('keyup', this.keyUpHandler.bind(this));
		}


		keyDownHandler (e) {

				if (e.keyCode === 38) {
						this.upPressed = true;
				} else if (e.keyCode === 40) {
						this.downPressed = true;
				} else if (e.keyCode === 16) {
						this.shiftPressed = true;
				} else if (e.keyCode === 17) {
						this.ctrlPressed = true;
				} else if (e.keyCode === 80 || e.keyCode === 32) {
						this.isPause = !this.isPause;
						(this.isPause === false) ? this.draw() : null;
				}
				e.preventDefault();
		}

		keyUpHandler (e) {

				if (e.keyCode === 38) {
						this.upPressed = false;
				} else if (e.keyCode === 40) {
						this.downPressed = false;
				} else if (e.keyCode === 16) {
						this.shiftPressed = false;
				} else if (e.keyCode === 17) {
						this.ctrlPressed = false;
				}
				e.preventDefault();
		}

		drawBall () {
				this.ctx.beginPath();
				this.ctx.arc(this.x, this.y, this.config.ballRadius, 0, Math.PI * 2);
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.fill();
				this.ctx.stroke();
				this.ctx.closePath();
		}

		drawPaddle1 () {
				this.ctx.beginPath();
				this.ctx.rect(
						0, this.paddle1Y,
						this.config.paddleWidth, this.config.paddleHeight
				);
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.fill();
				this.ctx.stroke();
				this.ctx.closePath();
		}

		drawPaddle2 () {
				this.ctx.beginPath();
				this.ctx.rect(
						this.canvas.width - this.config.paddleWidth, this.paddle2Y,
						this.config.paddleWidth, this.config.paddleHeight
				);
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.fill();
				this.ctx.stroke();
				this.ctx.closePath();
		}

		drawScore () {
				this.ctx.font = '16px Arial';
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.fillText(`Score: ${this.score1}`, 8, 15);
				this.ctx.fillText(`Score: ${this.score2}`, 608, 15);
		}

		drawLives () {
				this.ctx.font = '18px';
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.stroke();
				this.ctx.fillText(`Lives: ${this.config.lives}`, 350, 15);
		}

		randomDirectionStart() {
				let directX = Math.floor(Math.random() * (1 - (-1)) + (-1));
				if (directX < 0) {
						this.dx = -3;
				}else {
						this.dx = 3;
				}

				let directY = Math.floor(Math.random() * (1 - (-1)) + (-1));
				let angleDirectY = Math.floor(Math.random() * (4 - (1)) + (1));

				if (directY < 0) {
						angleDirectY = -angleDirectY;
				}

				this.dy = angleDirectY;
		}

		draw () {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.drawPaddle1();
				this.drawPaddle2();
				this.drawScore();
				this.drawLives();
				this.drawBall();


				if (this.y + this.dy - this.config.ballRadius < 0 || this.y + this.dy + this.config.ballRadius > this.canvas.height) {
						this.dy = -this.dy;
				}



				if (this.shiftPressed === true && this.paddle1Y > 0) {
						this.paddle1Y -= 5;
				}
				if (this.ctrlPressed === true && this.paddle1Y < this.canvas.height - this.config.paddleHeight) {
						this.paddle1Y += 5;
				}


				if (this.upPressed === true && this.paddle2Y > 0) {
						this.paddle2Y -= 5;
				}
				if (this.downPressed === true && this.paddle2Y < this.canvas.height - this.config.paddleHeight) {
						this.paddle2Y += 5;
				}


				if (this.x + this.dx - this.config.ballRadius < this.config.paddleWidth
						&& this.y > this.paddle1Y && this.y < this.paddle1Y + this.config.paddleHeight){

						this.dx = -this.dx;

						if ((this.shiftPressed === true && this.paddle1Y > 0)
						|| (this.ctrlPressed === true && this.paddle1Y < this.canvas.height - this.config.paddleHeight)) {
								this.dy = -this.dy;
						}
				}

				if (this.x + this.dx + this.config.ballRadius > this.canvas.width - this.config.paddleWidth
						&& this.y > this.paddle2Y && this.y < this.paddle2Y + this.config.paddleHeight){

						this.dx = -this.dx;

						if ((this.upPressed === true && this.paddle2Y > 0)
								|| (this.downPressed === true && this.paddle2Y < this.canvas.height - this.config.paddleHeight)) {
								this.dy = -this.dy;
						}
				}


				if (this.x + this.dx - this.config.ballRadius < 0){
						this.score2 += 1;
						this.x = this.canvas.width / 2 - this.config.ballRadius;
						this.y = this.canvas.height / 2 - this.config.ballRadius;
						// this.dx = 4;
						// this.dy = 4;
						this.randomDirectionStart();
						this.paddle1Y = (this.canvas.height - this.config.paddleHeight) / 2;
				}
				if (this.x + this.dx + this.config.ballRadius > this.canvas.width) {
						this.score1 += 1;
						this.x = this.canvas.width / 2 - this.config.ballRadius;
						this.y = this.canvas.height / 2 - this.config.ballRadius;
						// this.dx = 4;
						// this.dy = 4;
						this.randomDirectionStart();
						this.paddle2Y = (this.canvas.height - this.config.paddleHeight) / 2;
				}


				if (this.score1 === this.config.count) {
						this.score1 = 0;
						alert('WIN PLAYER 1');
						document.location.reload();
				}
				if (this.score2 === this.config.count) {
						this.score2 = 0;
						alert('WIN PLAYER 2');
						document.location.reload();
				}



				this.dx = this.dx + this.dx * this.config.accelerate;
				this.dy = this.dy + this.dy * this.config.accelerate;

				this.x += this.dx;
				this.y += this.dy;

				if (this.isPause === false) {
						requestAnimationFrame(this.draw.bind(this));
				}
		}
}

const customConfig = {
		ballRadius: 10,
		paddleHeight: 170,
		paddleWidth: 10,
		mainFillColor: '#0095DD',
		mainStrokeColor: '#333',
		count: 10,
		accelerate: 0.001,
};

const game = new Game(customConfig);

