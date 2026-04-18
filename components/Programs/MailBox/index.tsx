import WindowBody, { WindowBodyProps } from '@/components/Window/window-body';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { NAME_FIELD, EMAIL_FIELD, MESSAGE_FIELD, CONTACT_FORM_URL } from '@/lib/constants';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/form/form';
import { Input } from '@/components/UI/form/input';
import { Textarea } from '@/components/UI/form/textarea';
import { Button } from '@/components/UI/button';
import { Loader, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'What should we call you?',
    })
    .min(3, {
      message: 'Boost your name: 3+ characters',
    }),
  email: z
    .string()
    .nonempty({
      message: 'Where can we reach you?',
    })
    .email('This email looks suspicious'),
  message: z
    .string()
    .nonempty({
      message: 'Drop your thoughts here',
    })
    .min(10, {
      message: 'Stretch it! 10 characters minimum',
    }),
});

export default function MailBox({ isMaximized }: WindowBodyProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append(NAME_FIELD, data.name);
      formData.append(EMAIL_FIELD, data.email);
      formData.append(MESSAGE_FIELD, data.message);

      await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      form.reset({ name: '', email: '', message: '' });

      toast.success('Your email has been sent successfully', {
        description: (
          <span>
            Thanks <span className="font-bold">{data.name}</span>, We&#39;ll respond as quickly as possible
          </span>
        ),
        cancel: {
          label: 'close',
          onClick: () => {},
        },
      });
    } catch (err) {
      console.error('Error submitting form', err);

      toast.error('Unable to send your email', {
        description: `Please ensure all required fields are filled correctly`,
        cancel: {
          label: 'close',
          onClick: () => {},
        },
      });
    }
  };

  return (
    <WindowBody isMaximized={isMaximized} className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="to"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute top-3 left-3 font-bold">To:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={'prateekkumar1393@gmail.com'}
                    disabled
                    className="rounded-none pl-9 border border-b-foreground/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative gap-0">
                <FormLabel className="absolute top-3 left-3 font-bold">Name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter you name"
                    {...field}
                    autoComplete="name"
                    disabled={form.formState.isSubmitting}
                    className="rounded-none pl-15 dark:bg-input/20 border dark:border-transparent border-b-foreground/50 dark:border-b-foreground/20 focus-visible:border-transparent focus-visible:border-b-border focus-visible:ring-0 aria-invalid:border-transparent dark:aria-invalid:border-transparent"
                  />
                </FormControl>
                <FormMessage className="pl-3 bg-input dark:bg-input/20 border-b border-b-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative gap-0">
                <FormLabel className="absolute top-3 left-3 font-bold">Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    autoComplete="email"
                    disabled={form.formState.isSubmitting}
                    className="rounded-none pl-14 dark:bg-input/20 border dark:border-transparent border-b-foreground/50 dark:border-b-foreground/20 focus-visible:border-transparent focus-visible:border-b-border focus-visible:ring-0 aria-invalid:border-transparent dark:aria-invalid:border-transparent"
                  />
                </FormControl>
                <FormMessage className="pl-3 bg-input dark:bg-input/20 border-b border-b-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="relative gap-0">
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className="rounded-none h-75 sm:h-55 dark:bg-input/20 dark:border-transparent focus-visible:border-transparent focus-visible:border-b-border focus-visible:ring-0 aria-invalid:border-transparent"
                  />
                </FormControl>
                <FormMessage className="pl-3 bg-input dark:bg-input/20 border-b border-b-destructive" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'secondary'}
            size={'xs'}
            disabled={form.formState.isSubmitting}
            className="absolute top-3 right-3 py-3"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center">
                <Loader className="mr-1 animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                <SendHorizonal className="mr-1" />
                Send
              </span>
            )}
          </Button>
        </form>
      </Form>
    </WindowBody>
  );
}
