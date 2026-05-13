import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BasicProps, ImageFile } from '@/types/basic-props';

function LineComment({ className, children }: BasicProps) {
  return <div className={cn('mt-2 text-gray-600 dark:text-gray-400', className)}>{`// ${children}`}</div>;
}

function Container({ children }: BasicProps) {
  return (
    <div className="relative z-0 flex flex-col-reverse sm:flex-row sm:max-w-228 mx-auto font-mono text-xs sm:text-sm">
      {children}
    </div>
  );
}

function LeftSide({ children }: BasicProps) {
  return <div className="grow-1">{children}</div>;
}

function RightSideImage({ src, alt }: ImageFile) {
  return <Image src={src} alt={alt} placeholder="blur" className="hidden sm:block sticky top-4 size-100 mx-auto" />;
}

export { Container, LeftSide, RightSideImage, LineComment };
