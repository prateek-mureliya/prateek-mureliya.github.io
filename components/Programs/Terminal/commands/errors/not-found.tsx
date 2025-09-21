import { TCmdError } from "@/types/terminal";
import BasicError from "./basic-error";

type NotFoundProps = TCmdError;

export default function NotFound({ cmd }: NotFoundProps) {
  return (
    <BasicError cmd={cmd}>
      command not found
      <br />
      Tip: Maybe it exists in an alternate universe.
    </BasicError>
  );
}
