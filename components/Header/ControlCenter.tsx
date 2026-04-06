import { Dispatch, SetStateAction, useState } from 'react';
import { Slider } from '../UI/slider';
import { BasicProps, ImageFile } from '@/types/basic-props';
import { cn } from '@/lib/utils';
import { TIconType } from '@/types/icon-type';
import {
  MdBluetooth,
  MdBluetoothDisabled,
  MdWifi,
  MdWifiOff,
  MdWifiTethering,
  MdWifiTetheringOff,
} from 'react-icons/md';
import { Cog, Lock, Maximize, Minimize, Moon, Power, Sun } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../UI/button';
import { Separator } from '../UI/separator';
import { Dialog, DialogTrigger } from '../UI/dialog/dialog';
import ShutdownDialog from './ShutdownDialog';

function ControlCenterBox({ className, children }: BasicProps) {
  return <div className={cn('bg-card/30 rounded-md p-3 border border-card/50', className)}>{children}</div>;
}
function TitleLabel({ className, children }: BasicProps) {
  return <div className={cn('capitalize text-xs select-none', className)}>{children}</div>;
}
function SubTitleLabel({ className, children }: BasicProps) {
  return <div className={cn('capitalize text-xs select-none text-muted-foreground', className)}>{children}</div>;
}

function ControlCenterHorizontalBox({
  icon: Icon,
  title,
  subTitle,
  isActive = false,
  onClick,
}: {
  icon: TIconType;
  title: string;
  subTitle?: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center gap-2" onClick={onClick}>
      <Icon
        className={cn(
          'size-9 p-2 bg-muted dark:bg-primary-foreground rounded-full',
          isActive ? 'bg-blue-500 dark:bg-blue-500 text-white' : ''
        )}
      />
      <div>
        <TitleLabel>{title}</TitleLabel>
        {subTitle && <SubTitleLabel>{subTitle}</SubTitleLabel>}
      </div>
    </div>
  );
}

type ControlCenterProps = {
  theme: string | undefined;
  selectedUser: ImageFile;
  wifi: boolean;
  brightness: number;
  fullscreen: boolean;
  setTheme: Dispatch<SetStateAction<string>>;
  setIsLogin: (isLogin: boolean) => void;
  toggleWifi: () => void;
  updateBrightness: (brightness: number) => void;
  toggleFullscreen: () => void;
};

export default function ControlCenter({
  theme,
  selectedUser,
  wifi,
  brightness,
  fullscreen,
  setTheme,
  setIsLogin,
  toggleWifi,
  updateBrightness,
  toggleFullscreen,
}: ControlCenterProps) {
  const [bluetooth, setBluetooth] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const toggleTheme = (theme: string) => {
    let nextTheme = 'light';
    if (theme == 'light') {
      nextTheme = 'dark';
    } else if (theme == 'dark') {
      nextTheme = 'system';
    }
    return nextTheme;
  };

  return (
    <>
      <div className="flex gap-2">
        <ControlCenterBox className="p-2 flex items-center grow-1">
          <Image
            src={selectedUser.src}
            alt={selectedUser.alt}
            placeholder="blur"
            className="rounded-full size-6 bg-gray-200 mr-2 border border-card/50"
          />
          <TitleLabel>{selectedUser.alt}</TitleLabel>
        </ControlCenterBox>
        <ControlCenterBox className="p-1 flex gap-2">
          <Button
            variant={'outline'}
            size={'icon'}
            className="bg-transparent dark:bg-transparent size-8 border-none"
            onClick={() => setIsLogin(false)}
          >
            <Lock className="size-4" />
          </Button>

          <Separator orientation="vertical" className="bg-gray-200" />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                size={'icon'}
                className="bg-transparent dark:bg-transparent size-8 border-none"
              >
                <Power className="size-4" />
              </Button>
            </DialogTrigger>
            <ShutdownDialog />
          </Dialog>
        </ControlCenterBox>
      </div>
      <div className="flex flex-row gap-2">
        <ControlCenterBox className={'flex flex-col gap-1.5 w-73.5 grow-1'}>
          <ControlCenterHorizontalBox
            icon={wifi ? MdWifi : MdWifiOff}
            title="Wifi"
            subTitle={wifi ? 'Home' : 'Off'}
            isActive={wifi}
            onClick={toggleWifi}
          />
          <ControlCenterHorizontalBox
            icon={bluetooth ? MdBluetooth : MdBluetoothDisabled}
            title="Bluetooth"
            subTitle={bluetooth ? 'On' : 'Off'}
            isActive={bluetooth}
            onClick={() => setBluetooth((prev) => !prev)}
          />
          <ControlCenterHorizontalBox
            icon={airdrop ? MdWifiTethering : MdWifiTetheringOff}
            title="Airdrop"
            subTitle={airdrop ? 'Everyone' : 'Off'}
            isActive={airdrop}
            onClick={() => setAirdrop((prev) => !prev)}
          />
        </ControlCenterBox>
        <div className="flex flex-col gap-2 w-73.5 grow-1">
          <ControlCenterBox className="p-4">
            <ControlCenterHorizontalBox
              icon={theme == 'system' ? Cog : theme == 'light' ? Sun : Moon}
              title="Theme"
              subTitle={theme ? theme : 'System'}
              onClick={() => setTheme(toggleTheme)}
            />
          </ControlCenterBox>
          <ControlCenterBox className="p-4">
            <ControlCenterHorizontalBox
              icon={fullscreen ? Minimize : Maximize}
              title="Fullscreen"
              subTitle={fullscreen ? 'exit' : 'enter'}
              onClick={() => toggleFullscreen()}
            />
          </ControlCenterBox>
        </div>
      </div>
      <ControlCenterBox>
        <div className="flex justify-between text-sm mb-3">
          <TitleLabel>Display</TitleLabel>
          <TitleLabel>{brightness}%</TitleLabel>
        </div>
        <Slider value={[brightness]} max={100} step={1} onValueChange={(nums) => updateBrightness(nums[0])} />
      </ControlCenterBox>
    </>
  );
}
