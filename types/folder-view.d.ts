import { TIconType } from './icon-type';

export type TSidebarMenuItem = {
  title: string;
  icon: TIconType;
  content: (props: TFolderContent) => React.JSX.Element;
};

export type TSidebarMenu = {
  menuOptions: TSidebarMenuItem[];
};

export type TFolderContent = {
  value: string;
  height: number;
  isGrid?: boolean;
  isMaximized?: boolean;
  focus?: boolean;
  orangeDrop?: boolean;
  blueDrop?: boolean;
};
