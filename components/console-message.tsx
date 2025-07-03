"use client";

import { useEffect } from "react";

export default function ConsoleMessage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        `
👾✨🚀 WELCOME FELLOW DEVELOPER! 🚀✨👾

You've just entered the matrix of creativity 🤯🎨
Sit back, relax, and check out the pixels and passion 👨‍💻

🛠️ Portfolio Loaded...
💾 Booting up dev mode...
🔍 Scanning skills...
🧬 Rendering creativity...

👁️‍🗨️ Browse freely.
🧠 Fork wisely. (with credit 😉).
🤝 Collaborate boldly.

Happy hacking! 💻🔥

%c🔮 Type 'revealSecrets()' to unlock hidden easter eggs...
      `,
        "color: #3498db; font-style: italic;"
      );

      window.revealSecrets = () =>
        console.log(
          "%c🔒 Secrets under development...\n%cStay tuned... magic is being crafted.",
          "color: #8e44ad; font-size: 18px; font-weight: bold;",
          "color: #555; font-style: italic; font-size: 14px;"
        );
    }
  }, []);

  return <></>;
}
