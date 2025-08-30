export type TSidebarMenuItem = {
  title: string;
  icon: TLucideIcon;
  content: (props: TrashProps) => JSX.Element
};

export type TSidebarMenu = {
  activeTab: string;
  defaultOpen?:boolean;
  menuOptions: TSidebarMenuItem[];
};

export type TFolderContent = {
  value: string;
  isMaximized?: boolean
}