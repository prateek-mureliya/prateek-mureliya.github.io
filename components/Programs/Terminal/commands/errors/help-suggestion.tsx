import SuggestionAction from "./suggestion-action";
import { TSuggestionAction } from "@/types/terminal";

type SuggestionActionProps = TSuggestionAction;

export default function HelpSuggestion({
  command,
  onClick,
}: SuggestionActionProps) {
  return (
    <div className='mt-2'>
      Try
      <SuggestionAction command={`${command} --help`} onClick={onClick} />
      for more information.
    </div>
  );
}
