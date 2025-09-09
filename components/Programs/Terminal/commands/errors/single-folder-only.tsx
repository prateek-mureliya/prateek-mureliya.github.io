import { TCmdError } from "@/types/terminal";

type SingleFolderOnlyProps = TCmdError;

export default function SingleFolderOnly({ cmd }: SingleFolderOnlyProps) {
  return (
    <div>
      <span className='text-orange-500'>{cmd}</span>: provide only one directory
      <br />
      Try <span className='text-green-700'>&#39;{cmd} --help&#39;</span> for
      more information.
    </div>
  );
}
