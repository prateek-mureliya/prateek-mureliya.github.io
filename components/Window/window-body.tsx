type WindowBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export default function WindowBody({ className, children }: WindowBodyProps) {
  return <div className={className}>{children}</div>;
}
