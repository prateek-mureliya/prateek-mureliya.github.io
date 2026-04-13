import VsCode from '@/components/Programs/VSCode';
import { VsCodeImg } from '@/lib/media';
import { TProcessButton } from '@/types/process-button';

export const VS_CODE: TProcessButton = {
  type: 'window',
  id: 'vscode',
  title: VsCodeImg.alt,
  icon: VsCodeImg.src,
  x: 258,
  y: 62,
  width: 1020,
  height: 550,
  window: VsCode,
};
