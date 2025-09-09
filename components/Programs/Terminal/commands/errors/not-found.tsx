import { TCmdError } from "@/types/terminal";

export default function NotFound({ cmd }: TCmdError) {
  return (
    <span>
      <span className='text-orange-500'>{cmd}</span>: command not found
      <br /> Tip: Maybe it exists in an alternate universe.
    </span>
  );
}
