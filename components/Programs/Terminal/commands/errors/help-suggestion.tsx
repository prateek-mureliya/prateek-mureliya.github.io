import { BasicOnClick } from "@/types/basic-props";
import SuggestionAction from "./suggestion-action";

type SuggestionActionProps = BasicOnClick & {
  command: string;
};

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
