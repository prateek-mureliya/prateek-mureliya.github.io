export const CANVAS_WIDTH = 216;
export const CANVAS_HEIGHT = 262;
export const HEADER_HEIGHT = 46;

export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#091225');
  bg.addColorStop(1, '#03060f');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
};

export const drawBackgroundGrid = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  rows: number,
  gy: number,
  cellSize: number
) => {
  ctx.strokeStyle = 'rgba(255,255,255,.05)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, gy);
    ctx.lineTo(i * cellSize, gy + rows * cellSize);
    ctx.stroke();
  }

  for (let j = 0; j <= rows; j++) {
    ctx.beginPath();
    ctx.moveTo(0, gy + j * cellSize);
    ctx.lineTo(cols * cellSize, gy + j * cellSize);
    ctx.stroke();
  }
};

export const drawHeaderText = (
  ctx: CanvasRenderingContext2D,
  width: number,
  hiScore: number,
  score: number,
  other: string = ''
) => {
  ctx.strokeStyle = '#8fa7d8';
  ctx.beginPath();
  ctx.moveTo(75, 8);
  ctx.lineTo(75, 38);

  ctx.moveTo(140, 8);
  ctx.lineTo(140, 38);

  ctx.moveTo(0, 46);
  ctx.lineTo(width, 46);
  ctx.stroke();

  ctx.font = 'bold 10px Arial';
  ctx.fillStyle = '#8fa7d8';
  ctx.textAlign = 'center';

  ctx.fillText('HI-SCORE', 35, 16);
  ctx.fillText('SCORE', 107, 16);
  if (other.length > 0) ctx.fillText(other, 193, 16);

  ctx.font = 'bold 14px Arial';

  ctx.fillStyle = '#ffd447';
  ctx.fillText(hiScore.toString().padStart(5, '0'), 35, 36);

  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.toString().padStart(5, '0'), 108, 36);
};

export const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  const grad = ctx.createLinearGradient(x, y, x + size, y + size);
  grad.addColorStop(0, '#ffffff55');
  grad.addColorStop(0.15, color);

  ctx.fillStyle = grad;
  ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

  ctx.strokeStyle = 'rgba(255,255,255,.15)';
  ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);
};

export const gameOver = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Backdrop blur-style overlay
  ctx.fillStyle = 'rgba(8, 10, 20, 0.72)';
  ctx.fillRect(0, 0, width, height);

  // Card
  const cardWidth = 200;
  const cardHeight = 110;
  const cardX = width / 2 - cardWidth / 2;
  const cardY = height / 2 - cardHeight / 2;

  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;

  // Glassmorphism card
  ctx.fillStyle = 'rgba(22, 24, 38, 0.92)';
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 20);
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Title
  ctx.font = 'bold 32px Inter, Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', width / 2, cardY + 50);

  // Subtitle
  ctx.font = '15px Inter, Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('Play Again', width / 2, cardY + 80);
};
