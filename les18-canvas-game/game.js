class Game {
		constructor (config) {
				const defaultConfig = {
						ballRadius: 10,
						paddleHeight: 10,
						paddleWidth: 75,
						mainFillColor: '#0095DD',
						mainStrokeColor: '#333',
						brickRowCount: 3,
						brickColumnCount: 5,
						brickWidth: 75,
						brickHeight: 20,
						brickPadding: 10,
						brickOffsetTop: 30,
						brickOffsetLeft: 30,
						accelerate: 0.02,
						lives: 3,
				};

				this.config = config || defaultConfig;
				this.canvas = document.getElementById('myCanvas');
				this.ctx = this.canvas.getContext('2d');

				this.x = this.canvas.width / 2;
				this.y = this.canvas.height - this.config.paddleHeight - this.config.ballRadius;
				this.dx = 1;
				this.dy = -1;
				this.paddleX = (this.canvas.width - this.config.paddleWidth) / 2;
				this.rightPressed = false;
				this.leftPressed = false;
				this.score = 0;
				this.isPause = false;
				this.bricks = [];

				this.init();

				this.draw();
		}

		init () {
				for (let c = 0; c < this.config.brickColumnCount; c++) {
						this.bricks[c] = [];
						for (let r = 0; r < this.config.brickRowCount; r++) {
								this.bricks[c][r] = { x: 0, y: 0, status: 2 };
						}
				}

				document.addEventListener('keydown', this.keyDownHandler.bind(this));
				document.addEventListener('keyup', this.keyUpHandler.bind(this));
				document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
		}

		keyDownHandler (e) {
				if (e.keyCode === 39) {
						this.rightPressed = true;
				} else if (e.keyCode === 37) {
						this.leftPressed = true;
				} else if (e.keyCode === 80 || e.keyCode === 32) {
						this.isPause = !this.isPause;
						(this.isPause === false) ? this.draw() : null;
				}
		}

		keyUpHandler (e) {
				if (e.keyCode === 39) {
						this.rightPressed = false;
				} else if (e.keyCode === 37) {
						this.leftPressed = false;
				}
		}

		mouseMoveHandler (e) {
				const mouseX = e.clientX - this.canvas.offsetLeft;
				if (mouseX > 0 && mouseX < this.canvas.width) {
						this.paddleX = mouseX - this.config.paddleWidth / 2;
				}
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

		drawPaddle () {
				this.ctx.beginPath();
				this.ctx.rect(
						this.paddleX, this.canvas.height - this.config.paddleHeight,
						this.config.paddleWidth, this.config.paddleHeight
				);
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.fill();
				this.ctx.stroke();
				this.ctx.closePath();
		}

		drawBricks () {
				for (let c = 0; c < this.config.brickColumnCount; c++) {
						for (let r = 0; r < this.config.brickRowCount; r++) {
								if (this.bricks[c][r].status === 1 || this.bricks[c][r].status === 2) {
										const brickX = (c * (this.config.brickWidth + this.config.brickPadding)) + this.config.brickOffsetLeft;
										const brickY = (r * (this.config.brickHeight + this.config.brickPadding)) + this.config.brickOffsetTop;
										this.bricks[c][r].x = brickX;
										this.bricks[c][r].y = brickY;
										this.ctx.beginPath();
										this.ctx.rect(brickX, brickY, this.config.brickWidth, this.config.brickHeight);
										this.ctx.fillStyle = this.bricks[c][r].status === 2 ? this.config.mainFillColor : 'red';
										this.ctx.strokeStyle = this.config.mainStrokeColor;
										this.ctx.fill();
										this.ctx.stroke();
										this.ctx.closePath();
								}
						}
				}
		}

		collisionDetection () {
				for (let c = 0; c < this.config.brickColumnCount; c++) {
						for (let r = 0; r < this.config.brickRowCount; r++) {
								const b = this.bricks[c][r];

								if (((b.status === 1 || b.status === 2) &&
										(this.x > b.x) &&
										(this.x < b.x + this.config.brickWidth) &&
										(this.y - this.config.ballRadius > b.y) &&
										(this.y - this.config.ballRadius < b.y + this.config.brickHeight)) ||
										((b.status === 1 || b.status === 2) &&
												(this.x + this.config.ballRadius > b.x) &&
												(this.x + this.config.ballRadius < b.x + this.config.brickWidth) &&
												(this.y > b.y) &&
												(this.y < b.y + this.config.brickHeight)) ||
										((b.status === 1 || b.status === 2) &&
												this.x - this.config.ballRadius > b.x &&
												this.x - this.config.ballRadius < b.x + this.config.brickWidth &&
												this.y > b.y &&
												this.y < b.y + this.config.brickHeight) ||
										((b.status === 1 || b.status === 2) &&
												this.x > b.x &&
												this.x < b.x + this.config.brickWidth &&
												this.y + this.config.ballRadius > b.y &&
												this.y + this.config.ballRadius < b.y + this.config.brickHeight)) {
										this.dy = -this.dy;

										b.status--;
										if (b.status === 0) {
												this.score++;
										}
										this.dx = this.dx + this.dx * this.config.accelerate;
										this.dy = this.dy + this.dy * this.config.accelerate;
										if (this.score === this.config.brickRowCount * this.config.brickColumnCount) {
												alert('You Win!!!');
												document.location.reload();
										}
								}
						}
				}
		}

		drawScore () {
				this.ctx.font = '16px Arial';
				this.ctx.fillStyle = this.config.mainFillColor;
				this.ctx.fillText(`Score: ${this.score}`, 8, 20);
		}

		drawLives () {
				this.ctx.font = '18px';
				this.ctx.strokeStyle = this.config.mainStrokeColor;
				this.ctx.stroke();
				this.ctx.fillText(`Lives: ${this.config.lives}`, this.canvas.width - 65, 20);
		}

		draw () {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.drawBricks();
				this.drawPaddle();
				this.collisionDetection();
				this.drawScore();
				this.drawLives();
				this.drawBall();

				if (this.rightPressed && this.paddleX < this.canvas.width - this.config.paddleWidth) {
						if (this.x > this.paddleX && this.x < this.paddleX + this.config.paddleWidth &&
								this.y + this.dy > this.canvas.height - this.config.ballRadius - this.config.paddleHeight) {
								this.dx = -this.dx;
								this.dy = -this.dy;
						}

						this.paddleX += 7;
				} else if (this.leftPressed && this.paddleX > 0) {
						if (this.x > this.paddleX && this.x < this.paddleX + this.config.paddleWidth &&
								this.y + this.dy > this.canvas.height - this.config.ballRadius - this.config.paddleHeight) {
								this.dx = -this.dx;
								this.dy = -this.dy;
						}
						this.paddleX -= 7;
				}

				if (this.x + this.dx < this.config.ballRadius || this.x + this.dx > this.canvas.width - this.config.ballRadius) {
						this.dx = -this.dx;
				}

				if (this.y + this.dy < this.config.ballRadius) {
						this.dy = -this.dy;
				} else if (this.y + this.dy > this.canvas.height - this.config.ballRadius - this.config.paddleHeight) {
						if (this.x > this.paddleX && this.x < this.paddleX + this.config.paddleWidth) {
								this.dy = -this.dy;
						} else {
								this.config.lives--;
								if (!this.config.lives) {
										alert('GAME OVER');
										document.location.reload();
								} else {
										this.x = this.canvas.width / 2;
										this.y = this.canvas.height - this.config.paddleHeight - this.config.ballRadius;
										this.dx = 1;
										this.dy = -1;
										this.paddleX = (this.canvas.width - this.config.paddleWidth) / 2;
								}
						}
				}

				this.x += this.dx;
				this.y += this.dy;

				if (this.isPause === false) {
						requestAnimationFrame(this.draw.bind(this));
				}
		}
}

const customConfig = {
		ballRadius: 10,
		paddleHeight: 10,
		paddleWidth: 100,
		mainFillColor: '#0095DD',
		mainStrokeColor: '#333',
		brickRowCount: 4,
		brickColumnCount: 8,
		brickWidth: 35,
		brickHeight: 20,
		brickPadding: 20,
		brickOffsetTop: 20,
		brickOffsetLeft: 20,
		accelerate: 0.04,
		lives: 5,
};

const game = new Game(customConfig);

