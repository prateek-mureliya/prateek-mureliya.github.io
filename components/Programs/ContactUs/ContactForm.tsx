import z from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TFolderContent } from "@/types/folder-view";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "../../UI/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../UI/form";
import { Input } from "../../UI/input";
import { Button } from "../../UI/button";
import { Textarea } from "../../UI/textarea";
import { toast } from "sonner";
import { Loader, SendHorizonal } from "lucide-react";
import {
  CONTACT_FORM_URL,
  NAME_FIELD,
  EMAIL_FIELD,
  MESSAGE_FIELD,
} from "@/lib/constants";

type ContactFormProps = TFolderContent;

const formSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: "What should we call you?",
    })
    .min(3, {
      message: "Boost your name: 3+ characters",
    }),
  email: z
    .string()
    .nonempty({
      message: "Where can we reach you?",
    })
    .email("This email looks suspicious"),
  message: z
    .string()
    .nonempty({
      message: "Drop your thoughts here",
    })
    .min(10, {
      message: "Stretch it! 10 characters minimum",
    }),
});

export default function ContactForm({ value, isMaximized }: ContactFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append(NAME_FIELD, data.name);
      formData.append(EMAIL_FIELD, data.email);
      formData.append(MESSAGE_FIELD, data.message);

      await fetch(CONTACT_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset({ name: "", email: "", message: "" });

      toast.success("Your email has been sent successfully", {
        description: (
          <span>
            Thanks <span className='font-bold'>{data.name}</span>, We&#39;ll
            respond as quickly as possible
          </span>
        ),
        cancel: {
          label: "close",
          onClick: () => {},
        },
      });
    } catch (err) {
      console.error("Error submitting form", err);

      toast.error("Unable to send your email", {
        description: `Please ensure all required fields are filled correctly`,
        cancel: {
          label: "close",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <TabsContent
      value={value}
      className={cn("p-4", isMaximized ? "pb-22" : "")}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='sm:max-w-160 sm:px-15 space-y-4 mx-auto'
        >
          <h1 className='font-bold text-lg'>Get in Touch</h1>
          <FormField
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Full Name'
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Email Address'
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about your product and goals'
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant={"secondary"}
            disabled={form.formState.isSubmitting}
            className='w-full'
          >
            {form.formState.isSubmitting ? (
              <span className='flex items-center'>
                <Loader className='mr-1 animate-spin' />
                Sending...
              </span>
            ) : (
              <span className='flex items-center'>
                <SendHorizonal className='mr-1' />
                Send
              </span>
            )}
          </Button>
        </form>
      </Form>
    </TabsContent>
  );
}
