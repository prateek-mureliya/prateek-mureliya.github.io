import { TFolderContent } from "@/types/folder-view";
import { TProcessButton } from "@/types/process-button";
import FolderContent from "../../UI/folder-view/folder-content";
import FolderIcon from "../../UI/folder-view/folder-icon";
import { SNAPPED_MEME } from "../../constants/app-icons/snapped-meme";
import { RESUME2021_PDF } from "../../constants/app-icons/resume-2021-pdf";
import { OLD_PORTFOLIO } from "../../constants/app-icons/old-portfolio";
import { RESUME2016_PDF } from "../../constants/app-icons/resume-2016-pdf";

type SnappedProps = TFolderContent;

const FILES: TProcessButton[] = [
  SNAPPED_MEME,
  RESUME2021_PDF,
  OLD_PORTFOLIO,
  RESUME2016_PDF,
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
