import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";

type SingleFileOnlyProps = TCmdError;

export default function SingleFileOnly({ cmd, onClick }: SingleFileOnlyProps) {
  return (
    <BasicError cmd={cmd}>
      provide only one file
      <HelpSuggestion command={cmd} onClick={onClick} />
    </BasicError>
  );
}
