import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";

type NoArgsProps = TCmdError;

export default function NoArgs({ cmd, onClick }: NoArgsProps) {
  return (
    <BasicError cmd={cmd}>
      command does not take any arguments.
      <HelpSuggestion command={cmd} onClick={onClick} />
    </BasicError>
  );
}
