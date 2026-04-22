'use client';
import { Slot } from '@radix-ui/react-slot';
import ImageWallpaper from './ImageWallpaper';

export default function Wallpaper() {
  return (
    <Slot className="absolute inset-0 z-0 overflow-hidden bg-background">
      <ImageWallpaper wallpaperName="Mac Monterey" />
    </Slot>
  );
}
