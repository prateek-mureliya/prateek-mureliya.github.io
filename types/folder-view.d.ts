import { TIconType } from './icon-type';

export type TSidebarMenuItem = {
  title: string;
  icon: TIconType;
  content: (props: TFolderContent) => React.JSX.Element;
};

export type TSidebarMenu = {
  activeTab: string;
  menuOptions: TSidebarMenuItem[];
};

export type TFolderContent = {
  value: string;
  height: number;
  isGrid?: boolean;
  isMaximized?: boolean;
};
