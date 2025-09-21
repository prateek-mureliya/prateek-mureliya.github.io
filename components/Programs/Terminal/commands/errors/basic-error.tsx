import { BasicProps } from "@/types/basic-props";
import { TCmdError } from "@/types/terminal";

type BasicErrorProps = BasicProps & TCmdError;

export default function BasicError({ cmd, children }: BasicErrorProps) {
  return (
    <div>
      <span className='text-orange-500'>{cmd}</span>: {children}
    </div>
  );
}
