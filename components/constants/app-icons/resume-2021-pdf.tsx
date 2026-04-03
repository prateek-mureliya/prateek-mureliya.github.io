import { TProcessButton } from '@/types/process-button';
import { AdobeImg, Resume2021PDF, ResumePreview2021Img } from '@/lib/media';
import PDFWindow from '../../Programs/PDFWindow';

export const RESUME2021_PDF: TProcessButton = {
  type: 'window',
  id: 'resume2021',
  title: Resume2021PDF.name,
  icon: ResumePreview2021Img.src,
  viewer: AdobeImg.src,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: Resume2021PDF.file,
  window: PDFWindow,
};
