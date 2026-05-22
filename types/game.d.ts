export type GameRef = {
  number: number;
  drawHome?: (ctx: CanvasRenderingContext2D) => void;
  drawPlayArea?: (ctx: CanvasRenderingContext2D) => void;
  controls?: {
    reset: () => void;
    action: () => void;
    up: () => void;
    down: () => void;
    left: () => void;
    right: () => void;
  };
};
