import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../sidebar";
import { TabsList, TabsTrigger } from "../tabs";
import { TSidebarMenuItem } from "@/types/folder-view";

type FolderSidebarProps = {
  height: number;
  menuOptions: TSidebarMenuItem[];
};

export default function FolderSidebar({
  height,
  menuOptions,
}: FolderSidebarProps) {
  return (
    <TabsList
      className='p-0 text-foreground'
      asChild
      style={{
        height: height,
      }}
    >
      <Sidebar collapsible='icon' className='sticky'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuOptions.map(({ title, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <TabsTrigger value={title} asChild>
                      <SidebarMenuButton
                        tooltip={title}
                        className='w-full justify-start'
                      >
                        <Icon />
                        <span>{title}</span>
                      </SidebarMenuButton>
                    </TabsTrigger>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>
    </TabsList>
  );
}
