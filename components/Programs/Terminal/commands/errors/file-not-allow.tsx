import { TCmdError } from "@/types/terminal";

type FileNotAllowProps = TCmdError & {
  files: string[];
};

export default function FileNotAllow({ cmd, files }: FileNotAllowProps) {
  return (
    <>
      {files.map((filePath) => (
        <div key={filePath}>
          <span className='text-orange-500'>{cmd}</span>:
          <span className='text-green-700 ml-2'>&#39;{filePath}&#39;</span>: Not
          a directory
          <br />
          Try <span className='text-green-700'>&#39;{cmd} --help&#39;</span> for
          more information.
        </div>
      ))}
    </>
  );
}
