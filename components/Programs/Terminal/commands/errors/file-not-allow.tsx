import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";
import Path from "./path";

type FileNotAllowProps = TCmdError & {
  files: string[];
};

export default function FileNotAllow({
  cmd,
  files,
  onClick,
}: FileNotAllowProps) {
  return (
    <>
      {files.map((filePath) => (
        <BasicError key={filePath} cmd={cmd}>
          <Path>{filePath}</Path>: Not a directory
        </BasicError>
      ))}
      <HelpSuggestion command={cmd} onClick={onClick} />
    </>
  );
}
