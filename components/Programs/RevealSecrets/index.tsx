'use client';

import { useState } from 'react';
import DesktopIcon, { DesktopIconProps } from '../../Desktop/desktop-icon';
import { Dialog, DialogTrigger } from '../../UI/dialog/dialog';
import HackedSecrets from './hacked-secrets';
import { useHackedContext } from '@/contexts/hacked';
import SecretIcon from '@/public/images/icon/secret.png';
import { ConfirmBox } from '@/components/UI/dialog/confirm';

export default function RevealSecrets(props: DesktopIconProps) {
  const { setIsHacked } = useHackedContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    closeDialog(); // close dialog
    setIsSuccess(true); // show success message to hacker
    setIsHacked(true); // mark is hacked true
  };

  const closeDialog = () => {
    setOpen(false); // close dialog
  };

  return (
    <>
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <DesktopIcon {...props} onDoubleClick={() => setOpen(true)} />
        </DialogTrigger>
        <ConfirmBox
          title="TOP SECRET"
          description="Shhh... Secret Stuff Goes Here 👇 👇 👇"
          icon={SecretIcon}
          iconAlt="Secret Icon"
          onSubmit={onSubmit}
        />
      </Dialog>
      {isSuccess && <HackedSecrets defaultOpen onOpenChange={() => setIsSuccess(false)} />}
    </>
  );
}
