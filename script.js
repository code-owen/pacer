window.addEventListener('load', function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 500;

  let currentBackground = new Image();
  currentBackground.src = 'img/City4.png';

  let character = new Image();
  character.src = 'img/Homeless_2_Spritelist.png';
  currentBackground.onload = function () {

    /* function initialDraw() {
      ctx.drawImage(currentBackground, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawArrows();
      //drawCharacter();

      character();
    }; 
    initialDraw();*/
    drawScene();
    
  };

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentBackground, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw(ctx);
  }


  const x = 0;
  const y = 0;



  const bg1 = document.querySelector('.bg1 img');
  const bg2 = document.querySelector('.bg2 img');
  const bg3 = document.querySelector('.bg3 img');

  [bg1, bg2, bg3].forEach(bg => {
    bg.addEventListener('click', function () {
      const temp = currentBackground.src;
      currentBackground.src = bg.src;
      bg.src = temp;
      redrawCanvas();
    });
  });

  function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentBackground, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawArrows();
    //drawCharacter();
  }

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', (e) => {
        if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 128;
      this.height = 128;
      this.scale = 1.5;
      this.scaledWidth = this.width * this.scale;
      this.scaledHeight = this.height * this.scale;
      this.x = (gameWidth - this.width) / 2;
      this.y = gameHeight - this.height - 100;
      this.image2 = currentBackground;
      this.image = document.getElementById('playerImage');
      this.frameX = 0;
      this.maxFrame = 7;
      this.frameY = 2;
      this.fps = 15;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 0;
      this.score = 0;
      this.leftBoundary = 40;
      this.rightBoundary = 200;
      this.canScoreLeft = true;
      this.canScoreRight = true;
      this.initEventListeners();
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height + 2,
        this.width,
        this.height,
        this.x,
        this.y,
        this.scaledWidth,
        this.scaledHeight
      );
    }

    update(input, deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

      this.x += this.speed;
      if (input.keys.indexOf('ArrowRight') > -1) {
        this.speed = 3;
        this.frameY = 0;
        this.maxFrame = 7;
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.speed = -3;
        this.frameY = 1;
        this.maxFrame = 7;
      } else {
        this.speed = 0;
        this.maxFrame = 6;
      }

      if (this.x < -this.leftBoundary) {
        this.x = -this.leftBoundary;
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }

      if (this.x <= 30 && this.canScoreLeft) {
        this.score++;
        this.canScoreLeft = false;
        this.canScoreRight = true;
      } else if (this.x >= this.gameWidth - this.width - 80 && this.canScoreRight) {
        this.score++;
        this.canScoreLeft = true;
        this.canScoreRight = false;
      }
    }

    initEventListeners() {
      window.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight') {
          this.frameY = 2;
        } else if (event.key === 'ArrowLeft') {
          this.frameY = 3;
        }
      });
    }
  }

  function drawArrows() {
    const arrowWidth = 60;
    const arrowHeight = 60;
    const arrowPadding = 10;
    const arrowMarginTop = 10;
    const arrowSpacing = 5;

    const leftArrow = new Image();
    leftArrow.src = 'img/flatDark23.png';
    leftArrow.onload = function () {
      ctx.drawImage(leftArrow, canvas.width - arrowPadding - (arrowWidth * 2) - arrowSpacing, arrowMarginTop, arrowWidth, arrowHeight);
    };

    const rightArrow = new Image();
    rightArrow.src = 'img/flatDark24.png';
    rightArrow.onload = function () {
      ctx.drawImage(rightArrow, canvas.width - arrowPadding - arrowWidth, arrowMarginTop, arrowWidth, arrowHeight);
    };
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawBackground(currentBackground);
    drawScene();
    player.draw(ctx);
    drawArrows();
    player.update(input, deltaTime);
    displayStatusText(ctx, player.score);
    requestAnimationFrame(animate);
  }

  function displayStatusText(context, score) {
    context.fillStyle = 'white';
    context.font = '40px Helvetica';
    context.fillText('Lengths Paced: ' + score, 20, 50);
  }

  animate(0);
});
