import { TIconType } from './icon-type';

export type TColor = 'Yellow' | 'Purple' | 'Green';

export type TreeColor = {
  color: TColor;
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
