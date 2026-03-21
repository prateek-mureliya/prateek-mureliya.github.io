'use client';
import { AUTHOR_NAME } from '@/lib/constants';
import { useTheme } from 'next-themes';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

export default function WelcomeMessage() {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className={`absolute inset-0 overflow-hidden flex flex-col justify-center items-center z-0`}>
      <RoughNotationGroup show>
        <p className="sm:max-w-250 text-center inline-block text-lg sm:text-3xl">
          Hey, I&#39;m{' '}
          <RoughNotation
            type="highlight"
            color={theme == 'light' ? '#52a9ff' : '#3a5ba0'}
            strokeWidth={1.5}
            padding={2}
          >
            {AUTHOR_NAME}
          </RoughNotation>
          ! Welcome to my
        </p>
        <p className="sm:max-w-250 text-center inline-block text-6xl sm:text-8xl mt-4">
          <RoughNotation
            type="underline"
            color={theme == 'light' ? '#f7c873' : '#ffe066'}
            strokeWidth={1.5}
            padding={2}
            iterations={3}
          >
            Portfolio
          </RoughNotation>
        </p>
      </RoughNotationGroup>
    </div>
  );
}
