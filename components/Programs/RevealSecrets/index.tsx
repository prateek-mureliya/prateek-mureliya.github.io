"use client";

import { useState } from "react";
import SystemIcon from "../../Programs/system-icon";
import Secret from "@/public/images/icon/secret.png";
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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../UI/form";
import { Input } from "../../UI/input";
import HackedSecrets from "./hacked-secrets";

const icon = {
  logo: Secret,
  title: "Secret",
};

const formSchema = z.object({
  secret: z
    .string()
    .nonempty({
      message: "No secret? No fun.",
    })
    .refine(async (secret) => secret === process.env.SECRET, {
      message: "Wrong secret! Try harder.",
    }),
});

export default function RevealSecrets() {
  const [ishacked, setIshacked] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secret: "",
    },
  });

  const onSubmit = () => {
    handleDialog(false); // close dialog
    setIshacked(true); // show success message to hacker
  };

  const handleDialog = (state: boolean) => {
    setOpen(state); // close dialog
    form.reset({ secret: "" }); // reset form input and errors
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialog}>
        <DialogTrigger asChild>
          <SystemIcon
            key={icon.title}
            logo={icon.logo}
            title={icon.title}
            onDoubleClick={() => handleDialog(true)}
          />
        </DialogTrigger>
        <DialogContent hideHeader>
          <DialogHeader>
            <DialogTitle>TOP SECRET</DialogTitle>
            <DialogDescription>
              Shhh... Top Secret Stuff Goes Here 👇 👇 👇
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
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant={"default"} type='submit'>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {ishacked && (
        <HackedSecrets defaultOpen onOpenChange={() => setIshacked(false)} />
      )}
    </>
  );
}
