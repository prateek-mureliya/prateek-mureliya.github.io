"use client";

import HomeIcon from "@/public/images/icon/home.png";
import { HEADER_FOOTER_Z_INDEX } from "@/lib/constants";
import { useProcessContext } from "@/contexts/process-manager";
import { LimelightNav } from "../UI/lime-light-nav";

export default function Footer() {
  const { processes, handleHome, handleOpen } = useProcessContext();

  return (
    <footer
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      style={{ zIndex: HEADER_FOOTER_Z_INDEX }}
    >
      <LimelightNav
        home={{
          id: "Home",
          icon: HomeIcon,
          label: "Desktop",
          focus: false,
          onClick: handleHome,
        }}
        items={processes.map((p) => ({
          id: p.id,
          icon: p.icon,
          label: p.title,
          focus: p.focus,
          onClick: () => handleOpen(p),
        }))}
      />
    </footer>
  );
}
