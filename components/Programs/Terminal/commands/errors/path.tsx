import { BasicProps } from "@/types/basic-props";

export default function Path({ children }: BasicProps) {
  return <span className='text-purple-700'>&#39;{children}&#39;</span>;
}
