import { TCmdError } from "@/types/terminal";
import HelpSuggestion from "./help-suggestion";
import BasicError from "./basic-error";

type InvalidOptionsProps = TCmdError & {
  invalidOptions: string[];
};

export default function InvalidOptions({
  cmd,
  invalidOptions,
  onClick,
}: InvalidOptionsProps) {
  return (
    <BasicError cmd={cmd}>
      unrecognized option &#39;
      {invalidOptions.join("', '")}&#39;
      <HelpSuggestion command={cmd} onClick={onClick} />
    </BasicError>
  );
}
