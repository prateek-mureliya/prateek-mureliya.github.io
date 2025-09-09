import { TCmdError } from "@/types/terminal";

export default function NoArgs({ cmd }: TCmdError) {
  return (
    <span>
      <span className='text-orange-500'>{cmd}</span>: command does not take any
      arguments.
      <br />
      Try <span className='text-green-700'>&#39;{cmd} --help&#39;</span> for
      more information.
    </span>
  );
}
