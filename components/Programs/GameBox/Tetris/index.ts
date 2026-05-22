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

type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type TShape = Cell[][];

type TPiece = {
  x: number;
  y: number;
  shape: TShape;
};

const COLS = 12;
const ROWS = 12;
const BLOCK_SIZE = 18;
const LINES_PER_LEVEL = 10;
const BASE_DROP_SPEED = 500;
const MIN_DROP_SPEED = 100;

const COLORS = [null, '#2ed8ff', '#69ff1f', '#3157ff', '#ffd43b', '#f0a000', '#b84dff', '#f00000'];

const SHAPES: TShape[] = [
  [],
  [[1, 1, 1, 1]],
  [
    [2, 0, 0],
    [2, 2, 2],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
  ],
];

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function randomPiece(): TPiece {
  const type = Math.floor(Math.random() * 7) + 1;

  return {
    shape: SHAPES[type],
    x: Math.floor((COLS - SHAPES[type][0].length) / 2),
    y: 0,
  };
}

function rotate(shape: TShape) {
  return shape[0].map((_, index) => shape.map((row) => row[index]).reverse());
}

function collide(board: TShape, piece: TPiece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] === 0) continue;

      const newY = y + piece.y;
      const newX = x + piece.x;

      if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX] !== 0)) {
        return true;
      }
    }
  }

  return false;
}

function merge(board: TShape, piece: TPiece) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.y][x + piece.x] = value;
      }
    });
  });
}

function clearLines(board: TShape) {
  let cleared = 0;

  outer: for (let y = board.length - 1; y >= 0; y--) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }

    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    cleared++;
    y++;
  }

  return cleared;
}

function drawMatrix(ctx: CanvasRenderingContext2D, matrix: TShape, offset: { x: number; y: number }, boradY: number) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawBlock(
          ctx,
          (x + offset.x) * BLOCK_SIZE,
          (y + offset.y) * BLOCK_SIZE + boradY,
          BLOCK_SIZE,
          COLORS[value] || ''
        );
      }
    });
  });
}

const drawNextPiece = (ctx: CanvasRenderingContext2D, piece: TPiece) => {
  const gy = 20;
  let gx = 172;

  if (piece.shape.length === 1) {
    gx = 160;
  } else if (piece.shape.length > 1 && piece.shape[0].length === 2 && piece.shape[1].length === 2) {
    gx = 184;
  }

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawBlock(ctx, x * 12 + gx, y * 12 + gy, 12, COLORS[value] || '');
      }
    });
  });
};

type State = {
  board: TShape;
  piece: TPiece;
  nextPiece: TPiece;
  score: number;
  level: number;
  lines: number;
  playing: boolean;
};

type Action =
  | { type: 'START' }
  | { type: 'RESTART' }
  | { type: 'MOVE'; dir: number }
  | { type: 'ROTATE' }
  | { type: 'DROP' };

const initialState: State = {
  board: createBoard(),
  piece: randomPiece(),
  nextPiece: randomPiece(),
  score: 0,
  level: 1,
  lines: 0,
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
      return initialState;

    case 'MOVE': {
      const updated = {
        ...state.piece,
        x: state.piece.x + action.dir,
      };

      if (collide(state.board, updated)) return state;

      return {
        ...state,
        piece: updated,
      };
    }

    case 'ROTATE': {
      const rotated = rotate(state.piece.shape);

      const updated = {
        ...state.piece,
        shape: rotated,
      };

      if (collide(state.board, updated)) return state;

      return {
        ...state,
        piece: updated,
      };
    }

    case 'DROP': {
      const updated = {
        ...state.piece,
        y: state.piece.y + 1,
      };

      if (!collide(state.board, updated)) {
        return {
          ...state,
          piece: updated,
        };
      }

      const newBoard = state.board.map((row) => [...row]);

      merge(newBoard, state.piece);

      const lines = clearLines(newBoard);

      const nextPiece = randomPiece();

      const isGameOver = collide(newBoard, state.nextPiece);

      const totalLines = state.lines + lines;
      const level = Math.floor(totalLines / LINES_PER_LEVEL) + 1;

      return {
        ...state,
        board: newBoard,
        piece: state.nextPiece,
        nextPiece,
        score: state.score + lines * 100 * level,
        lines: totalLines,
        level,
        playing: !isGameOver,
      };
    }

    default:
      return state;
  }
}

export function useTetris(): GameRef {
  const [hiScore, setHiScore] = useLocalStorage('hiScoreTetris', 0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { board, piece, nextPiece, score, level, playing } = state;
  const context = useRef<CanvasRenderingContext2D>(null);
  const gameRef = useRef<GameRef>({ number: 1 });
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
      drawHeaderText(ctx, CANVAS_WIDTH, hiScore, score, 'NEXT');
      drawBackgroundGrid(ctx, COLS, ROWS, HEADER_HEIGHT, BLOCK_SIZE);
      drawNextPiece(ctx, nextPiece);
      drawMatrix(ctx, board, { x: 0, y: 0 }, HEADER_HEIGHT);
      drawMatrix(
        ctx,
        piece.shape,
        {
          x: piece.x,
          y: piece.y,
        },
        HEADER_HEIGHT
      );
    }

    if (playing) draw();
    else gameOver(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [board, piece, nextPiece, playing, hiScore, score]);

  useEffect(() => {
    if (!playing) return;

    let animationFrameId: number;

    function update(time = 0) {
      const delta = time - lastTimeRef.current;
      const speed = Math.max(BASE_DROP_SPEED - (level - 1) * 40, MIN_DROP_SPEED);

      if (delta > speed) {
        dispatch({ type: 'DROP' });

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

    gradient.addColorStop(0, '#ff00ff');
    gradient.addColorStop(0.5, '#00d4ff');
    gradient.addColorStop(1, '#ff0000');

    ctx.font = 'bold 34px Arial';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';

    ctx.fillText('TETRIS', CANVAS_WIDTH / 2, 90);

    drawBackgroundGrid(ctx, COLS, 5, 110, BLOCK_SIZE);

    const demoBoard: TShape = [
      [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 3, 7, 0, 0, 5, 5, 6],
      [4, 4, 2, 0, 0, 3, 0, 0, 5, 5, 6, 6],
      [4, 4, 2, 2, 2, 3, 0, 1, 1, 1, 1, 6],
    ];

    drawMatrix(
      ctx,
      demoBoard,
      {
        x: 0,
        y: 0,
      },
      110
    );

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
        action: () => dispatch({ type: 'ROTATE' }),
        up: () => dispatch({ type: 'ROTATE' }),
        down: () => dispatch({ type: 'DROP' }),
        left: () => dispatch({ type: 'MOVE', dir: -1 }),
        right: () => dispatch({ type: 'MOVE', dir: 1 }),
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
