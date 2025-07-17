import { Button } from "../../UI/button";
import { HyperText } from "../../UI/hyper-text";
import { handleSideCannons } from "../../UI/confetti";
import { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../UI/dialog";

export default function HackedSecrets({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  useEffect(() => {
    handleSideCannons();
  }, []);

  return (
    <Dialog {...props}>
      <DialogContent hideHeader className='justify-items-center'>
        <DialogHeader>
          <DialogTitle>
            <HyperText className='text-3xl'>Portfolio Hacked!</HyperText>
          </DialogTitle>
          <DialogDescription className='hidden' />
        </DialogHeader>

        <div className='flex'>
          <div className='flex flex-col items-center'>
            <HyperText className='text-xl w-30 text-center'>Hacker</HyperText>
            <HyperText className='text-xl'>1</HyperText>
          </div>
          <div className='flex flex-col items-center'>
            <HyperText className='text-xl w-30 text-center'>Me</HyperText>
            <HyperText className='text-xl'>0</HyperText>
          </div>
        </div>
        <div>
          <HyperText className='text-md' as={"span"}>
            Time for set spicy secret
          </HyperText>
          <span className='text-md'> 🌶️😅🔐</span>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
