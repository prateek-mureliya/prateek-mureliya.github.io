import { TProcessButton } from "@/types/process-button";
import AdobeIcon from "@/public/images/icon/adobe.png";
import ResumePreview2021 from "@/public/images/resume-preview_2021.png";
import PDFWindow from "../../Programs/PDFWindow";

export const RESUME2021_PDF: TProcessButton = {
  type: "window",
  id: "resume2021",
  title: "Prateek_Kumar_SoftwareEngineer_2021.pdf",
  icon: ResumePreview2021,
  viewer: AdobeIcon,
  x: 205,
  y: 155,
  width: 680,
  height: 450,
  link: "media/Prateek_Kumar_SoftwareEngineer_2021.pdf",
  window: PDFWindow,
};
