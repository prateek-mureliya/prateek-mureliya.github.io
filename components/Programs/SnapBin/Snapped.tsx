import { GITHUB_SITE_URL, OLD_SITE_URI } from "@/lib/constants";
import { TFolderContent } from "@/types/folder-view";
import { TProcessButton } from "@/types/process-button";
import AdobeIcon from "@/public/images/icon/adobe.png";
import ResumePreview2016 from "@/public/images/resume-preview_2016.png";
import ResumePreview2021 from "@/public/images/resume-preview_2021.png";
import Meme1 from "@/public/images/trash-meme-2.png";
import LinkIcon from "@/public/images/icon/social/link.png";
import OldProfilePreview from "@/public/images/old-profile.png";
import FolderContent from "../../UI/folder-view/folder-content";
import FolderIcon from "../../UI/folder-view/folder-icon";
import PDFWindow from "../PDFWindow";

type SnappedProps = TFolderContent;

const FILES: TProcessButton[] = [
  {
    type: "raw",
    id: "meme1",
    title: "I'm just here for decoration",
    icon: Meme1,
  },
  {
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
  },
  {
    type: "link",
    id: "old-profile",
    title: "Old Profile",
    icon: LinkIcon,
    viewer: OldProfilePreview,
    linkTitle: OLD_SITE_URI,
    link: `${GITHUB_SITE_URL}${OLD_SITE_URI}`,
  },
  {
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
  },
];

export default function Snapped(props: SnappedProps) {
  return (
    <FolderContent {...props}>
      {FILES.map((options) => (
        <FolderIcon key={options.id} {...options} />
      ))}
    </FolderContent>
  );
}
