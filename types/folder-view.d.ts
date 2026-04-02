import { TIconType } from './icon-type';

export type TSidebarMenuItem = {
  title: string;
  icon: TIconType;
  content: (props: TFolderContent) => React.JSX.Element;
};

export type TSidebarMenu = {
  activeTab: string;
  defaultOpen?: boolean;
  menuOptions: TSidebarMenuItem[];
};

export type TFolderContent = {
  value: string;
  isMaximized?: boolean;
};
