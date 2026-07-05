export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ target, rel, ...props }: LinkProps) {
  return <a {...props} target={target || '_blank'} rel={rel || 'noopener noreferrer'} />;
}
