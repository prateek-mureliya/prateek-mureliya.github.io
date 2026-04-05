import Link from 'next/link';
import { Button } from '../button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from './dialog';
import { StaticImageData } from 'next/image';
import { JSX } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form/form';
import { Input } from '../form/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SECRET } from '@/lib/constants';

type ConfirmBoxProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
  action?: JSX.Element;
  cancel?: JSX.Element;
  onSubmit?: () => void;
};

function ButtonAction({ children, type = 'button', ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button {...props} type={type}>
      {children}
    </Button>
  );
}

function CancelAction({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose asChild>
      <ButtonAction {...props}>{children}</ButtonAction>
    </DialogClose>
  );
}

function LinkButtonAction({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button> & React.ComponentProps<typeof Link>) {
  return (
    <ButtonAction {...props} className={className} asChild>
      <Link {...props}>{children}</Link>
    </ButtonAction>
  );
}

export const formSchema = z.object({
  secret: z
    .string()
    .nonempty({
      message: 'No secret? No fun.',
    })
    .refine(async (secret) => secret === SECRET, {
      message: 'Wrong secret! Try harder.',
    }),
});

function SecretForm({ onSubmit }: { onSubmit: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secret: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-self-center">Enter your password to allow this.</FormLabel>
              <FormControl>
                <Input placeholder="Secret" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-4">
          <CancelAction variant={'outline'}>Cancel</CancelAction>
          <ButtonAction variant={'default'} type="submit">
            Unlock
          </ButtonAction>
        </DialogFooter>
      </form>
    </Form>
  );
}

function ConfirmBox({ title, description, icon, iconAlt, action, cancel, onSubmit }: ConfirmBoxProps) {
  return (
    <DialogContent hideHeader onCloseAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogIcon src={icon} alt={iconAlt} />
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {(action || cancel) && (
        <DialogFooter>
          {cancel}
          {action}
        </DialogFooter>
      )}

      {onSubmit && <SecretForm onSubmit={onSubmit} />}
    </DialogContent>
  );
}

export { ConfirmBox, ButtonAction, CancelAction, LinkButtonAction };
