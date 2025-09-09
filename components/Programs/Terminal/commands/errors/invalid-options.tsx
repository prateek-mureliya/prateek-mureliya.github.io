import { TCmdError } from "@/types/terminal";

type InvalidOptionsProps = TCmdError & {
  invalidOptions: string[];
};

export default function InvalidOptions({
  cmd,
  invalidOptions,
}: InvalidOptionsProps) {
  return (
    <span>
      <span className='text-orange-500'>{cmd}</span>: unrecognized option &#39;
      {invalidOptions.join("', '")}&#39;
      <br />
      Try <span className='text-green-700'>&#39;{cmd} --help&#39;</span> for
      more information.
    </span>
  );
}
