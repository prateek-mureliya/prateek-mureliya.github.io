import { TProcessButton } from '@/types/process-button';
import { AdobeImg, ResumePDF, ResumePreviewImg } from '@/lib/media';
import PDFWindow from '../../Programs/PDFWindow';

export const RESUME_PDF: TProcessButton = {
  type: 'window',
  id: 'resume',
  title: ResumePDF.name,
  icon: ResumePreviewImg.src,
  iconX: 1,
  iconY: 1,
  viewer: AdobeImg.src,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: ResumePDF.file,
  window: PDFWindow,
};
