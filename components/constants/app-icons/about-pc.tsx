import { TProcessButton } from '@/types/process-button';
import { AboutPCImg } from '@/lib/media';
import AboutPC from '../../Programs/AboutPC';

export const ABOUT_PC: TProcessButton = {
  type: 'window',
  id: 'aboutpc',
  title: AboutPCImg.alt,
  icon: AboutPCImg.src,
  x: 296,
  y: 77,
  width: 1020,
  height: 550,
  window: AboutPC,
};
