"use client";

import { useState } from "react";
import DesktopIcon, { DesktopIconProps } from "../../Desktop/desktop-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../UI/dialog";
import { Button } from "../../UI/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../UI/form";
import { Input } from "../../UI/input";
import HackedSecrets from "./hacked-secrets";
import { SECRET } from "@/lib/constants";
import { useHackedContext } from "@/contexts/hacked";

const formSchema = z.object({
  secret: z
    .string()
    .nonempty({
      message: "No secret? No fun.",
    })
    .refine(async (secret) => secret === SECRET, {
      message: "Wrong secret! Try harder.",
    }),
});

export default function RevealSecrets(props: DesktopIconProps) {
  const { setIsHacked } = useHackedContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secret: "",
    },
  });

  const onSubmit = () => {
    closeDialog(); // close dialog
    setIsSuccess(true); // show success message to hacker
    setIsHacked(true); // mark is hacked true
  };

  const closeDialog = () => {
    setOpen(false); // close dialog
    form.reset({ secret: "" }); // reset form input and errors
  };

  return (
    <>
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <DesktopIcon {...props} onDoubleClick={() => setOpen(true)} />
        </DialogTrigger>
        <DialogContent hideHeader>
          <DialogHeader>
            <DialogTitle>TOP SECRET</DialogTitle>
            <DialogDescription>
              Shhh... Secret Stuff Goes Here 👇 👇 👇
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='secret'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='eg. *****'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className='mt-4'>
                <Button variant={"default"} type='submit'>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {isSuccess && (
        <HackedSecrets defaultOpen onOpenChange={() => setIsSuccess(false)} />
      )}
    </>
  );
}
