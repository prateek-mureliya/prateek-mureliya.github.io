import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type WALLPAPER_NAME = 'Mac Monterey';

const wallpapers: { [key in WALLPAPER_NAME]: string } = {
  'Mac Monterey':
    "bg-[url('/images/optimized/wallpaper/macos-monterey-wwdc-21-light.webp')] dark:bg-[url('/images/optimized/wallpaper/macos-monterey-wwdc-21-dark.webp')]",
};

export default function ImageWallpaper({
  wallpaperName,
  className,
  centerVignette = false,
  outerVignette = false,
  ...props
}: {
  wallpaperName: WALLPAPER_NAME;
  centerVignette?: boolean;
  outerVignette?: boolean;
} & ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('bg-cover bg-center', wallpapers[wallpaperName], className)} {...props}>
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(255,255,255,1)_100%)] dark:bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_0%,_rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  );
}
