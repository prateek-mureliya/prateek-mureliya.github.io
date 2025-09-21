import { BasicOnClick } from "@/types/basic-props";

type SuggestionActionProps = BasicOnClick & {
  command: string;
};

export default function SuggestionAction({
  command,
  onClick,
}: SuggestionActionProps) {
  return (
    <span>
      &nbsp;
      <span
        className='text-green-700 hover:underline cursor-pointer select-none'
        onClick={() => onClick && onClick(command)}
      >
        &#39;{command}&#39;
      </span>
      &nbsp;
    </span>
  );
}
