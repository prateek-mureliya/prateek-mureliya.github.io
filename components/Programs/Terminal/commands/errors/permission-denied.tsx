import { TCmdError } from "@/types/terminal";
import BasicError from "./basic-error";
import Path from "./path";

type PermissionDeniedProps = TCmdError & {
  path: string;
  pathType: "directory" | "file";
};

export default function PermissionDenied({
  cmd,
  path,
  pathType,
}: PermissionDeniedProps) {
  return (
    <BasicError cmd={cmd}>
      cannot open
      {" " + pathType + " "}
      <Path>{path}</Path>: Permission denied
    </BasicError>
  );
}
