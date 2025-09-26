import { TProcessButton } from "@/types/process-button";
import AdobeIcon from "@/public/images/icon/adobe.png";
import ResumePreview2016 from "@/public/images/resume-preview_2016.png";
import PDFWindow from "../../Programs/PDFWindow";

export const RESUME2016_PDF: TProcessButton = {
  type: "window",
  id: "resume2016",
  title: "Prateek_Kumar_Fresher_2016.pdf",
  icon: ResumePreview2016,
  viewer: AdobeIcon,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: "media/Prateek_Kumar_Fresher_2016.pdf",
  window: PDFWindow,
};
