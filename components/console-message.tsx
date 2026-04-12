'use client';

import { SECRET } from '@/lib/constants';
import { useEffect } from 'react';
import { handleFireworks } from './UI/confetti';

export default function ConsoleMessage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(
        `
👾✨🚀 WELCOME FELLOW DEVELOPER! 🚀✨👾

You've just entered the matrix of creativity 🤯🎨
Sit back, relax, and check out the pixels and passion 👨‍💻

👁️‍🗨️ Browse freely.
🧠 Fork wisely. (with credit 😉).
🤝 Collaborate boldly.

Happy hacking! 💻🔥

%c🔮 Type 'revealSecrets()' to unlock developer mode...
      `,
        'color: #3498db; font-style: italic;'
      );

      window.revealSecrets = () => {
        handleFireworks();
        console.log('%c🎉 Secret Unlocked! 🎉', 'color: green; font-size: 20px; font-weight: bold;');
        console.log('🔑 The secret password is: %c' + SECRET, 'color: red; font-weight: bold;');
      };
    }
  }, []);

  return <></>;
}
