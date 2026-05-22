import { useEffect, useReducer, useRef } from 'react';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  drawBackground,
  drawBackgroundGrid,
  drawHeaderText,
  gameOver,
  HEADER_HEIGHT,
} from '../utils';

import { GameRef } from '@/types/game';
import { useLocalStorage } from '@/hook/useLocalStorage';

type Brick = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
};

type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
};

type Paddle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type PowerUpType = 'expand' | 'shrink' | 'slow' | 'fast' | 'life' | 'bomb';

type PowerUp = {
  x: number;
  y: number;
  dy: number;
  size: number;
  type: PowerUpType;
  active: boolean;
};

const BRICK_ROWS = 5;
const BRICK_COLS = 7;

const BRICK_WIDTH = 24;
const BRICK_HEIGHT = 10;
const BRICK_PADDING = 4;

const PADDLE_MIN_WIDTH = 25;
const PADDLE_MAX_WIDTH = 100;
const PADDLE_WIDTH = 50;
const PADDLE_HEIGHT = 8;
const PADDLE_SPEED = 18;

const BALL_SIZE = 8;

const BASE_BALL_SPEED = 2.5;

const POWERUP_SIZE = 10;
const POWERUP_SPEED = 1.5;
const POWERUP_CHANCE = 0.2;

const ROW_ADD_INTERVAL = 5000;

const COLORS = ['#ff5f57', '#ffbd2f', '#28c840', '#00d4ff', '#b84dff'];

const POWERUP_TYPES: PowerUpType[] = ['expand', 'shrink', 'slow', 'fast', 'life', 'bomb'];

function randomPowerUpType(): PowerUpType {
  return POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
}

function createPowerUp(x: number, y: number): PowerUp {
  return {
    x,
    y,
    dy: POWERUP_SPEED,
    size: POWERUP_SIZE,
    type: randomPowerUpType(),
    active: true,
  };
}

function createBrickRow(row: number): Brick[] {
  const bricks: Brick[] = [];

  for (let col = 0; col < BRICK_COLS; col++) {
    bricks.push({
      x: col * (BRICK_WIDTH + BRICK_PADDING) + 14,
      y: row * (BRICK_HEIGHT + BRICK_PADDING) + HEADER_HEIGHT + 20,
      width: BRICK_WIDTH,
      height: BRICK_HEIGHT,
      visible: true,
    });
  }

  return bricks;
}

function createBricks(): Brick[] {
  const bricks: Brick[] = [];

  for (let row = 0; row < BRICK_ROWS; row++) {
    bricks.push(...createBrickRow(row));
  }

  return bricks;
}

function increaseBallSpeed(ball: Ball, level: number): Ball {
  const speed = BASE_BALL_SPEED + level * 0.4;

  return {
    ...ball,
    dx: Math.sign(ball.dx) * speed,
    dy: Math.sign(ball.dy) * speed,
  };
}

function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);

  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.closePath();
}

function drawPaddle(ctx: CanvasRenderingContext2D, paddle: Paddle) {
  drawRect(ctx, paddle.x, paddle.y, paddle.width, paddle.height, '#00d4ff');
}

function drawBricks(ctx: CanvasRenderingContext2D, bricks: Brick[]) {
  bricks.forEach((brick, index) => {
    if (!brick.visible) return;

    drawRect(ctx, brick.x, brick.y, brick.width, brick.height, COLORS[index % COLORS.length]);
  });
}

function drawPowerUps(ctx: CanvasRenderingContext2D, powerUps: PowerUp[]) {
  powerUps.forEach((p) => {
    if (!p.active) return;
    let emoji = '';

    switch (p.type) {
      case 'expand':
        emoji = '↔️';
        break;

      case 'shrink':
        emoji = '🤏';
        break;

      case 'slow':
        emoji = '🐢';
        break;

      case 'fast':
        emoji = '🐇';
        break;

      case 'life':
        emoji = '❤️';
        break;

      case 'bomb':
        emoji = '💣';
        break;
    }

    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    ctx.fillText(emoji, p.x, p.y);
  });
}

type State = {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  powerUps: PowerUp[];
  score: number;
  playing: boolean;
  level: number;
  lives: number;
};

type Action =
  | { type: 'START' }
  | { type: 'RESTART' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'UPDATE' }
  | { type: 'ADD_ROW' }
  | { type: 'UPDATE_POWERUPS' };

function createInitialState(): State {
  return {
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 40,
      dx: BASE_BALL_SPEED,
      dy: -BASE_BALL_SPEED,
      size: BALL_SIZE,
    },

    paddle: {
      x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - 20,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    },

    bricks: createBricks(),

    powerUps: [],

    score: 0,

    level: 1,

    lives: 3,

    playing: false,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        playing: true,
      };

    case 'RESTART':
      return createInitialState();

    case 'MOVE_LEFT':
      return {
        ...state,
        paddle: {
          ...state.paddle,
          x: Math.max(0, state.paddle.x - PADDLE_SPEED),
        },
      };

    case 'MOVE_RIGHT':
      return {
        ...state,
        paddle: {
          ...state.paddle,
          x: Math.min(CANVAS_WIDTH - state.paddle.width, state.paddle.x + PADDLE_SPEED),
        },
      };

    case 'ADD_ROW': {
      const moved = state.bricks.map((brick) => ({
        ...brick,
        y: brick.y + BRICK_HEIGHT + BRICK_PADDING,
      }));

      const newRow = createBrickRow(0);

      const updatedBricks = [...newRow, ...moved];

      const lose = updatedBricks.some((brick) => brick.visible && brick.y + brick.height >= state.paddle.y);

      if (lose) {
        return {
          ...state,
          playing: false,
        };
      }

      return {
        ...state,
        bricks: updatedBricks,
      };
    }

    case 'UPDATE_POWERUPS': {
      const updated = state.powerUps
        .map((p) => ({
          ...p,
          y: p.y + p.dy,
        }))
        .filter((p) => p.y < CANVAS_HEIGHT && p.active);

      let newPaddle = state.paddle;
      let newLives = state.lives;

      const newBall = {
        ...state.ball,
      };

      updated.forEach((p) => {
        const hit =
          p.y + p.size >= state.paddle.y && p.x >= state.paddle.x && p.x <= state.paddle.x + state.paddle.width;

        if (!hit) return;

        p.active = false;

        switch (p.type) {
          case 'expand':
            newPaddle = {
              ...newPaddle,
              width: Math.min(newPaddle.width + 25, PADDLE_MAX_WIDTH),
            };
            break;

          case 'shrink':
            newPaddle = {
              ...newPaddle,
              width: Math.max(newPaddle.width - 25, PADDLE_MIN_WIDTH),
            };
            break;

          case 'slow':
            newBall.dx *= 0.7;
            newBall.dy *= 0.7;
            break;

          case 'fast':
            newBall.dx *= 1.428;
            newBall.dy *= 1.428;
            break;

          case 'life':
            newLives += 1;
            break;

          case 'bomb':
            state.bricks.forEach((b) => {
              if (b.visible && Math.random() > 0.3) {
                b.visible = false;
              }
            });
            break;
        }
      });

      return {
        ...state,
        ball: newBall,
        paddle: newPaddle,
        lives: newLives,
        powerUps: updated.filter((p) => p.active),
      };
    }

    case 'UPDATE': {
      const { ball, paddle, bricks } = state;

      const newBall = increaseBallSpeed(
        {
          ...ball,
          x: ball.x + ball.dx,
          y: ball.y + ball.dy,
        },
        state.level
      );

      let newScore = state.score;

      if (newBall.x - newBall.size <= 0 || newBall.x + newBall.size >= CANVAS_WIDTH) {
        newBall.dx *= -1;
      }

      if (newBall.y - newBall.size <= HEADER_HEIGHT) {
        newBall.dy *= -1;
      }

      const hitPaddle =
        newBall.dy > 0 &&
        newBall.y + newBall.size >= paddle.y &&
        newBall.y - newBall.size <= paddle.y + paddle.height &&
        newBall.x >= paddle.x &&
        newBall.x <= paddle.x + paddle.width;

      if (hitPaddle) {
        newBall.dy = -Math.abs(newBall.dy);

        const hitPos = (newBall.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

        newBall.dx = hitPos * 4;
      }

      let collided = false;

      const updatedBricks = bricks.map((brick) => {
        if (!brick.visible || collided) {
          return brick;
        }

        const hit =
          newBall.x + newBall.size >= brick.x &&
          newBall.x - newBall.size <= brick.x + brick.width &&
          newBall.y + newBall.size >= brick.y &&
          newBall.y - newBall.size <= brick.y + brick.height;

        if (hit) {
          collided = true;

          newBall.dy *= -1;

          newScore += 10;

          if (Math.random() < POWERUP_CHANCE) {
            state.powerUps.push(createPowerUp(brick.x + brick.width / 2, brick.y + brick.height / 2));
          }

          return {
            ...brick,
            visible: false,
          };
        }

        return brick;
      });

      if (newBall.y - newBall.size > CANVAS_HEIGHT) {
        if (state.lives <= 1) {
          return {
            ...state,
            playing: false,
          };
        }

        return {
          ...state,
          lives: state.lives - 1,
          ball: {
            ...createInitialState().ball,
          },
        };
      }

      const remaining = updatedBricks.filter((b) => b.visible).length;

      if (remaining === 0) {
        const nextLevel = state.level + 1;

        return {
          ...state,
          level: nextLevel,
          score: newScore,
          bricks: createBrickRow(0),
          powerUps: [],
        };
      }

      return {
        ...state,
        ball: newBall,
        bricks: updatedBricks,
        score: newScore,
      };
    }

    default:
      return state;
  }
}

export function useBrick(): GameRef {
  const [hiScore, setHiScore] = useLocalStorage('hiScoreBrick', 0);
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const gameRef = useRef<GameRef>({
    number: 3,
  });

  useEffect(() => {
    if (state.score > hiScore) {
      setHiScore(state.score);
    }
  }, [state.score, hiScore, setHiScore]);

  useEffect(() => {
    if (!context.current) return;

    const ctx = context.current;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawHeaderText(ctx, CANVAS_WIDTH, hiScore, state.score, 'LIVES');
    drawBackgroundGrid(ctx, 12, 12, HEADER_HEIGHT, 18);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(state.lives > 3 ? `${state.lives}❤️` : '❤️'.repeat(state.lives), CANVAS_WIDTH - 5, 34);

    drawBricks(ctx, state.bricks);

    drawPaddle(ctx, state.paddle);

    drawPowerUps(ctx, state.powerUps);

    drawBall(ctx, state.ball);

    if (!state.playing) {
      gameOver(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [state, hiScore]);

  useEffect(() => {
    if (!state.playing) return;

    let animationFrameId: number;
    let lastTime = 0;

    function update(time = 0) {
      const delta = time - lastTime;

      if (delta >= 16) {
        dispatch({ type: 'UPDATE' });

        dispatch({
          type: 'UPDATE_POWERUPS',
        });

        lastTime = time;
      }

      animationFrameId = requestAnimationFrame(update);
    }

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [state.playing]);

  useEffect(() => {
    if (!state.playing) return;

    const interval = setInterval(
      () => {
        dispatch({ type: 'ADD_ROW' });
      },
      Math.max(1500, ROW_ADD_INTERVAL - state.level * 300)
    );

    return () => clearInterval(interval);
  }, [state.playing, state.level]);

  const game = gameRef.current;

  game.drawHome = (ctx) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawHeaderText(ctx, CANVAS_WIDTH, hiScore, 0);

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
    gradient.addColorStop(0, '#ff4d00');
    gradient.addColorStop(0.5, '#ffcc00');
    gradient.addColorStop(1, '#ff0000');

    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';

    ctx.fillText('BRICK', CANVAS_WIDTH / 2, 90);
    drawBackgroundGrid(ctx, 12, 5, 110, 18);

    const bricks = createBricks().slice(0, 16);
    bricks.forEach((brick, index) => {
      if (!brick.visible) return;

      drawRect(ctx, brick.x, brick.y + 45, brick.width, brick.height, COLORS[index % COLORS.length]);
    });

    drawRect(ctx, 110, 192, 60, 8, '#00d4ff');

    ctx.beginPath();

    ctx.arc(80, 150, 6, 0, Math.PI * 2);

    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#8fa7d8';

    ctx.fillText('<  Select  >', CANVAS_WIDTH / 2, 240);
  };

  game.drawPlayArea = (ctx: CanvasRenderingContext2D) => {
    context.current = ctx;

    dispatch({ type: 'START' });
  };

  useEffect(() => {
    game.controls = {
      reset: () => dispatch({ type: 'RESTART' }),

      action: () => {
        if (!state.playing) {
          dispatch({
            type: 'RESTART',
          });

          dispatch({
            type: 'START',
          });
        }
      },

      up: () => {},

      down: () => {},

      left: () => {
        if (state.playing) {
          dispatch({
            type: 'MOVE_LEFT',
          });
        }
      },

      right: () => {
        if (state.playing) {
          dispatch({
            type: 'MOVE_RIGHT',
          });
        }
      },
    };
  }, [game, state.playing]);

  return game;
}
