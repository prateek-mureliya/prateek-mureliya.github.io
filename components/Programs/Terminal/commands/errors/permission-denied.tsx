import { TCmdError } from "@/types/terminal";

type InvalidPathProps = TCmdError & {
  path: string;
  pathType: "directory" | "file";
};

export default function PermissionDenied({
  cmd,
  path,
  pathType,
}: InvalidPathProps) {
  return (
    <span>
      <span className='text-orange-500'>{cmd}</span>: cannot open
      {" " + pathType + " "}
      <span className='text-green-700'>&#39;{path}&#39;</span>: Permission
      denied
    </span>
  );
}
