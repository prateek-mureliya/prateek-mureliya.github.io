import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";
import Path from "./path";

type FolderNotAllowProps = TCmdError & {
  folders: string[];
};

export default function FolderNotAllow({
  cmd,
  folders,
  onClick,
}: FolderNotAllowProps) {
  return (
    <>
      {folders.map((folderPath) => (
        <BasicError key={folderPath} cmd={cmd}>
          <Path>{folderPath}</Path>: Not a file
        </BasicError>
      ))}
      <HelpSuggestion command={cmd} onClick={onClick} />
    </>
  );
}
