const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentBackground = new Image();
currentBackground.src = 'img/City4.png';

const x = 0;
const y = 0;
const width = 1200;
const height = 500;

let lengthsPaced = 0; // Variable to keep track of lengths paced

currentBackground.onload = function() {
  ctx.drawImage(currentBackground, x, y, width, height);
  drawLengthsPaced(); // Draw lengths paced initially
  drawArrows(); // Draw arrows initially
};

const bg1 = document.querySelector('.bg1 img');
const bg2 = document.querySelector('.bg2 img');
const bg3 = document.querySelector('.bg3 img');

bg1.addEventListener('click', function() {
  const temp = currentBackground.src;
  currentBackground.src = bg1.src;
  bg1.src = temp;
  redrawCanvas();
});

bg2.addEventListener('click', function() {
  const temp = currentBackground.src;
  currentBackground.src = bg2.src;
  bg2.src = temp;
  redrawCanvas();
});

bg3.addEventListener('click', function() {
  const temp = currentBackground.src;
  currentBackground.src = bg3.src;
  bg3.src = temp;
  redrawCanvas();
});

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentBackground, x, y, width, height);
  drawLengthsPaced(); // Draw lengths paced after changing the background
  drawArrows(); // Redraw arrows after changing the background
}

function drawLengthsPaced() {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Lengths Paced: ' + lengthsPaced, 10, 30);
}

function drawArrows() {
  const arrowWidth = 60;
  const arrowHeight = 60;
  const arrowPadding = 10;
  const arrowMarginTop = 10;

  const leftArrow = new Image();
  leftArrow.src = 'img/flatDark23.png';
  leftArrow.onload = function() {
    ctx.drawImage(leftArrow, canvas.width - arrowPadding - arrowWidth * 2, arrowMarginTop, arrowWidth, arrowHeight);
  };

  const rightArrow = new Image();
  rightArrow.src = 'img/flatDark24.png';
  rightArrow.onload = function() {
    ctx.drawImage(rightArrow, canvas.width - arrowPadding - arrowWidth, arrowMarginTop, arrowWidth, arrowHeight);
  };
}
