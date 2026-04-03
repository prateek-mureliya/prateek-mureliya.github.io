import { TProcessButton } from '@/types/process-button';
import { AboutMeImg } from '@/lib/media';
import AboutMe from '../../Programs/AboutMe';

export const ABOUT_ME: TProcessButton = {
  type: 'window',
  id: 'aboutme',
  title: AboutMeImg.alt,
  icon: AboutMeImg.src,
  x: 258,
  y: 62,
  width: 1020,
  height: 550,
  window: AboutMe,
};
