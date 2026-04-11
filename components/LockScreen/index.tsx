'use client';

import Wallpaper from '../Wallpaper';
import { AnimatePresence, motion } from 'motion/react';
import { useApplicationContext, UserType } from '@/contexts/application-context';
import Image from 'next/image';
import { UserDeveloperImg, UserRecruiterImg, UserStalkerImg } from '@/lib/media';
import { cn } from '@/lib/utils';
import { BasicProps, ImageFile } from '@/types/basic-props';
import { ArrowRight, Eye, EyeOff, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../UI/dialog/confirm';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../UI/form/form';
import { Input } from '../UI/form/input';
import { Button } from '../UI/button';

function UserProfile({ src, alt, className }: ImageFile & BasicProps) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      className={cn(
        'bg-cyan-100 hover:bg-cyan-200 size-25 sm:size-30 rounded-full border border-cyan-500 p-3 shadow-xs shadow-cyan-300/500',
        className
      )}
    />
  );
}

function UserTitle({ className, children }: BasicProps) {
  return (
    <p className={cn('text-lg text-shadow-lg text-background dark:text-foreground font-extrabold', className)}>
      {children}
    </p>
  );
}

function UserSelection({ src: avatar, alt: name, onClick }: ImageFile & { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="flex flex-col gap-2 items-center cursor-pointer"
      onClick={onClick}
    >
      <UserProfile src={avatar} alt={name} />
      <UserTitle>{name}</UserTitle>
    </motion.div>
  );
}

function UserLogin({
  src: avatar,
  alt: name,
  onSubmit,
  isDeveloper,
}: ImageFile & { onSubmit: () => void; isDeveloper: boolean }) {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secret: '',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="flex flex-col gap-2 items-center cursor-pointer"
      onClick={!isDeveloper ? onSubmit : undefined}
    >
      <UserProfile src={avatar} alt={name} />
      <UserTitle>{name}</UserTitle>
      {isDeveloper && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Secret"
                      type={showPass ? 'text' : 'password'}
                      className="dark:bg-white dark:text-background dark:placeholder-gray-700 pr-17"
                      {...field}
                    />
                  </FormControl>
                  <div className=" absolute right-1 top-1">
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      type="button"
                      className="bg-transparent border-transparent dark:border-transparent dark:bg-transparent size-7 rounded-sm mr-1"
                      onClick={() => {
                        setShowPass((prev) => !prev);
                        form.setFocus(field.name);
                      }}
                    >
                      {showPass ? <EyeOff className="size-4 text-border" /> : <Eye className="size-4 text-border" />}
                    </Button>
                    <Button variant={'outline'} size={'icon'} type="submit" className="size-7 rounded-sm">
                      <ArrowRight className="size-4 text-border" />
                    </Button>
                  </div>
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </motion.div>
  );
}

export default function LockScreen() {
  const { isLogin, selectedUser, isDeveloper, setIsLogin, setSelectedUser, deleteSelectedUser } =
    useApplicationContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectUserHandler = (userType: UserType) => {
    setSelectedUser(userType);
    if (userType != UserType.Developer) {
      setIsLogin(true);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {!isLogin && (
        <motion.div
          initial={{ y: '-100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.5 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 20 }}
          className="absolute inset-0 z-79 overflow-hidden flex justify-center"
        >
          <Wallpaper />
          {mounted && (
            <div className="absolute size-full max-w-2xl flex flex-col p-4">
              <div
                className={cn('grow-1 flex items-center gap-4', selectedUser ? 'justify-center' : 'justify-between')}
              >
                <AnimatePresence>
                  {!selectedUser && (
                    <>
                      <UserSelection
                        key={UserRecruiterImg.alt}
                        alt={UserRecruiterImg.alt}
                        src={UserRecruiterImg.src}
                        onClick={() => selectUserHandler(UserType.Recruiter)}
                      />
                      <UserSelection
                        key={UserStalkerImg.alt}
                        alt={UserStalkerImg.alt}
                        src={UserStalkerImg.src}
                        onClick={() => selectUserHandler(UserType.Stalker)}
                      />
                      <UserSelection
                        key={UserDeveloperImg.alt}
                        alt={UserDeveloperImg.alt}
                        src={UserDeveloperImg.src}
                        onClick={() => selectUserHandler(UserType.Developer)}
                      />
                    </>
                  )}

                  {selectedUser && (
                    <UserLogin
                      alt={selectedUser.alt}
                      src={selectedUser.src}
                      onSubmit={() => setIsLogin(true)}
                      isDeveloper={isDeveloper}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-row justify-center h-[72px] py-2">
                <AnimatePresence>
                  {selectedUser && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
                      className="flex flex-col items-center gap-2 select-none"
                      onClick={() => deleteSelectedUser()}
                    >
                      <UserRound className="bg-white/40 text-white size-8 p-2 rounded-full" />
                      <UserTitle className="text-xs">Switch User</UserTitle>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
