import { TIconType } from './icon-type';

export type TreeColor = {
  textColor?: string;
  borderColor?: string;
};

export type TBaseTreeData = {
  icon: TIconType;
  title: string;
  details: React.ReactNode;
};

export type TBadgeData = {
  icon: TIconType;
  title: string;
};
