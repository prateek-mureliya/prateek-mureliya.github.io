import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";

type FileRequiredProps = TCmdError;

export default function FileRequired({ cmd, onClick }: FileRequiredProps) {
  return (
    <>
      <BasicError cmd={cmd}>Please provide file</BasicError>
      <HelpSuggestion command={cmd} onClick={onClick} />
    </>
  );
}
