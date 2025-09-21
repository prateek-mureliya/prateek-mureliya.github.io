import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";

type SingleFolderOnlyProps = TCmdError;

export default function SingleFolderOnly({
  cmd,
  onClick,
}: SingleFolderOnlyProps) {
  return (
    <BasicError cmd={cmd}>
      provide only one directory
      <HelpSuggestion command={cmd} onClick={onClick} />
    </BasicError>
  );
}
