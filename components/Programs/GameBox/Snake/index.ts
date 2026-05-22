import { useEffect, useReducer, useRef } from 'react';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  drawBackground,
  drawBackgroundGrid,
  drawBlock,
  drawHeaderText,
  gameOver,
  HEADER_HEIGHT,
} from '../utils';

import { GameRef } from '@/types/game';
import { useLocalStorage } from '@/hook/useLocalStorage';

type Cell = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type State = {
  snake: Cell[];
  food: Cell;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  level: number;
  playing: boolean;
};

type Action =
  | { type: 'START' }
  | { type: 'RESTART' }
  | { type: 'MOVE' }
  | { type: 'CHANGE_DIRECTION'; direction: Direction };

const COLS = 12;
const ROWS = 12;
const BLOCK_SIZE = 18;

const BASE_SPEED = 220;
const MIN_SPEED = 70;

const SNAKE_COLOR = '#69ff1f';
const FOOD_COLOR = '#ff3b3b';

function randomFood(snake: Cell[]): Cell {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };

    const collide = snake.some((segment) => segment.x === food.x && segment.y === food.y);

    if (!collide) return food;
  }
}

const initialSnake: Cell[] = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

const initialState: State = {
  snake: initialSnake,
  food: randomFood(initialSnake),
  direction: 'RIGHT',
  nextDirection: 'RIGHT',
  score: 0,
  level: 1,
  playing: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        playing: true,
      };

    case 'RESTART':
      return {
        ...initialState,
        food: randomFood(initialSnake),
      };

    case 'CHANGE_DIRECTION': {
      const current = state.direction;
      const next = action.direction;

      const invalid =
        (current === 'UP' && next === 'DOWN') ||
        (current === 'DOWN' && next === 'UP') ||
        (current === 'LEFT' && next === 'RIGHT') ||
        (current === 'RIGHT' && next === 'LEFT');

      if (invalid) return state;

      return {
        ...state,
        nextDirection: next,
      };
    }

    case 'MOVE': {
      if (!state.playing) return state;

      const direction = state.nextDirection;

      const head = { ...state.snake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        return {
          ...state,
          playing: false,
        };
      }

      // self collision
      const hitSelf = state.snake.some((segment) => segment.x === head.x && segment.y === head.y);

      if (hitSelf) {
        return {
          ...state,
          playing: false,
        };
      }

      const newSnake = [head, ...state.snake];

      let food = state.food;
      let score = state.score;
      let level = state.level;

      const ateFood = head.x === food.x && head.y === food.y;

      if (ateFood) {
        score += 10;
        level = Math.floor(score / 50) + 1;
        food = randomFood(newSnake);
      } else {
        newSnake.pop();
      }

      return {
        ...state,
        snake: newSnake,
        food,
        score,
        level,
        direction,
      };
    }

    default:
      return state;
  }
}

function drawSnake(ctx: CanvasRenderingContext2D, snake: Cell[]) {
  snake.forEach((segment, index) => {
    drawBlock(
      ctx,
      segment.x * BLOCK_SIZE,
      segment.y * BLOCK_SIZE + HEADER_HEIGHT,
      BLOCK_SIZE,
      index === 0 ? '#c6ff00' : SNAKE_COLOR
    );
  });
}

function drawFood(ctx: CanvasRenderingContext2D, food: Cell) {
  drawBlock(ctx, food.x * BLOCK_SIZE, food.y * BLOCK_SIZE + HEADER_HEIGHT, BLOCK_SIZE, FOOD_COLOR);
}

export function useSnake(): GameRef {
  const [hiScore, setHiScore] = useLocalStorage('hiScoreSnake', 0);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { snake, food, score, level, playing } = state;

  const context = useRef<CanvasRenderingContext2D>(null);

  const gameRef = useRef<GameRef>({
    number: 2,
  });

  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (score > hiScore) {
      setHiScore(score);
    }
  }, [score, hiScore, setHiScore]);

  useEffect(() => {
    if (!context.current) return;

    const ctx = context.current;

    function draw() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawHeaderText(ctx, CANVAS_WIDTH, hiScore, score, 'Food');

      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${score / 10}`, CANVAS_WIDTH - 25, 36);
      drawBlock(ctx, 194, 24, 14, '#ff3b3b');

      drawBackgroundGrid(ctx, COLS, ROWS, HEADER_HEIGHT, BLOCK_SIZE);
      drawFood(ctx, food);
      drawSnake(ctx, snake);
    }

    if (playing) {
      draw();
    } else {
      gameOver(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [snake, food, score, hiScore, playing]);

  useEffect(() => {
    if (!playing) return;

    let animationFrameId: number;

    function update(time = 0) {
      const delta = time - lastTimeRef.current;

      const speed = Math.max(BASE_SPEED - (level - 1) * 15, MIN_SPEED);

      if (delta > speed) {
        dispatch({ type: 'MOVE' });

        lastTimeRef.current = time;
      }

      animationFrameId = window.requestAnimationFrame(update);
    }

    animationFrameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [playing, level]);

  const game = gameRef.current;

  game.drawHome = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawHeaderText(ctx, CANVAS_WIDTH, hiScore, 0);

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);

    gradient.addColorStop(0, '#00ff87');
    gradient.addColorStop(0.5, '#60efff');
    gradient.addColorStop(1, '#00ff87');

    ctx.font = 'bold 34px Arial';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';

    ctx.fillText('SNAKE', CANVAS_WIDTH / 2, 90);

    drawBackgroundGrid(ctx, 12, 5, 110, BLOCK_SIZE);

    const previewSnake = [
      { x: 7, y: 1 },
      { x: 6, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ];

    previewSnake.forEach((segment, index) => {
      drawBlock(
        ctx,
        segment.x * BLOCK_SIZE,
        segment.y * BLOCK_SIZE + 110,
        BLOCK_SIZE,
        index === 0 ? '#d9ff00' : '#69ff1f'
      );
    });

    drawBlock(ctx, 9 * BLOCK_SIZE, 1 * BLOCK_SIZE + 110, BLOCK_SIZE, '#ff3b3b');

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#8fa7d8';

    ctx.fillText('<  Select  >', CANVAS_WIDTH / 2, 240);
  };

  game.drawPlayArea = (ctx: CanvasRenderingContext2D) => {
    context.current = ctx;

    dispatch({ type: 'START' });
  };

  useEffect(() => {
    if (playing) {
      game.controls = {
        reset: () => dispatch({ type: 'RESTART' }),

        action: () => {},

        up: () =>
          dispatch({
            type: 'CHANGE_DIRECTION',
            direction: 'UP',
          }),

        down: () =>
          dispatch({
            type: 'CHANGE_DIRECTION',
            direction: 'DOWN',
          }),

        left: () =>
          dispatch({
            type: 'CHANGE_DIRECTION',
            direction: 'LEFT',
          }),

        right: () =>
          dispatch({
            type: 'CHANGE_DIRECTION',
            direction: 'RIGHT',
          }),
      };
    } else {
      game.controls = {
        reset: () => dispatch({ type: 'RESTART' }),

        action: () => {
          dispatch({ type: 'RESTART' });
          dispatch({ type: 'START' });
        },

        up: () => {},
        down: () => {},
        left: () => {},
        right: () => {},
      };
    }
  }, [game, playing]);

  return game;
}
