import { TProcessButton } from '@/types/process-button';
import { AdobeImg, Resume2016PDF, ResumePreview2016Img } from '@/lib/media';
import PDFWindow from '../../Programs/PDFWindow';

export const RESUME2016_PDF: TProcessButton = {
  type: 'window',
  id: 'resume2016',
  title: Resume2016PDF.name,
  icon: ResumePreview2016Img.src,
  viewer: AdobeImg.src,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: Resume2016PDF.file,
  window: PDFWindow,
};
