import { TProcessButton } from "@/types/process-button";
import AdobeIcon from "@/public/images/icon/adobe.png";
import ResumePreview from "@/public/images/resume-preview.png";
import PDFWindow from "../../Programs/PDFWindow";

export const RESUME_PDF: TProcessButton = {
  type: "window",
  id: "resume",
  title: "Resume",
  icon: ResumePreview,
  viewer: AdobeIcon,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: "media/Prateek_Kumar_SeniorSoftwareEngineer_Resume.pdf",
  window: PDFWindow,
};
