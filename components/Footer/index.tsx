"use client";

import { Dock } from "../UI/dock";
import HomeIcon from "@/public/images/icon/home.png";
import { Separator } from "../UI/separator";
import { HEADER_FOOTER_Z_INDEX } from "@/lib/constants";
import { useProcessContext } from "@/contexts/process-manager";
import FooterButton from "./FooterButton";

export default function Footer() {
  const { processes, handleHome, handleOpen } = useProcessContext();

  return (
    <footer
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      style={{ zIndex: HEADER_FOOTER_Z_INDEX }}
    >
      <Dock direction='middle'>
        <FooterButton
          key={"Home"}
          icon={HomeIcon}
          title={"Desktop"}
          onClick={handleHome}
          focus={false}
        />
        {processes.length !== 0 && (
          <Separator orientation='vertical' className='h-full' />
        )}
        {processes.map((p) => (
          <FooterButton
            key={p.id}
            icon={p.icon}
            title={p.title}
            onClick={() => handleOpen(p)}
            focus={p.focus}
          />
        ))}
      </Dock>
    </footer>
  );
}
