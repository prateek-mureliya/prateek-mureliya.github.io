export type TColor = "Yellow" | "Purple" | "Green";

export type TreeColor = {
  color: color;
};

export type TBaseTreeData = {
  icon: TLucideIcon;
  title: string;
  details: React.ReactNode;
};

export type TBadgeData = {
  icon: TLucideIcon;
  title: string;
};
