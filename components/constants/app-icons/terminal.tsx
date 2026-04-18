import { TProcessButton } from '@/types/process-button';
import { TerminalImg } from '@/lib/media';
import Terminal from '../../Programs/Terminal';

export const TERMINAL: TProcessButton = {
  type: 'window',
  id: 'terminal',
  title: TerminalImg.alt,
  icon: TerminalImg.src,
  iconX: 1,
  iconY: 2,
  x: 490,
  y: 90,
  width: 795,
  height: 475,
  window: Terminal,
};
