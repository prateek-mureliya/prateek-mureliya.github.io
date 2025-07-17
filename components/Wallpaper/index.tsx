import { Slot } from "@radix-ui/react-slot";
import { Ripple } from "./Ripple";

export default function Wallpaper() {
  return (
    <Slot role='wallpaper' className='absolute inset-0 z-0 overflow-hidden'>
      <Ripple />
    </Slot>
  );
}
