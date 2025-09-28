import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "help",
  description:
    ": Displays a list of available commands with their descriptions",
  options: {},
  itemType: "NOTHING",
};

const AVAILABLE_COMMANDS = [
  {
    cmd: "welcome",
    desc: "Show the welcome message",
  },
  {
    cmd: "open",
    desc: "Use to open a file",
  },
  {
    cmd: "cat",
    desc: "Use to view content of a file",
  },
  {
    cmd: "cd",
    desc: "Navigate to a directory",
  },
  {
    cmd: "ls",
    desc: "List all the items in a directory",
  },
  {
    cmd: "pwd",
    desc: "Show your current working directory",
  },
  {
    cmd: "clear",
    desc: "Clear the terminal",
  },
  {
    cmd: "history",
    desc: "Used to display last 10 commands",
  },
  {
    cmd: "help",
    desc: "Show this help menu",
  },
];

const KEYBOARD_SHORTCUTS = [
  {
    cmd: "Ctrl + l",
    desc: "Clear the terminal",
  },
  {
    cmd: "Aroow Up",
    desc: "Move back in history",
  },
  {
    cmd: "Arrow Down",
    desc: "Move forward in history",
  },
];

export default function Help({}: TCommandBase) {
  return (
    <div className='overflow-x-auto'>
      <div className='mb-2'>Available commands:</div>
      {AVAILABLE_COMMANDS.map((c) => (
        <div key={c.cmd} className='flex'>
          <div className='min-w-18 text-red-500'>{c.cmd}</div>
          <div className='min-w-5'>→</div>
          <div className='whitespace-nowrap'>{c.desc}</div>
        </div>
      ))}

      <div className='mt-3 mb-2'>Keyboard Shortcuts:</div>
      {KEYBOARD_SHORTCUTS.map((c) => (
        <div key={c.cmd} className='flex'>
          <div className='min-w-21 text-red-500'>{c.cmd}</div>
          <div className='min-w-5'>→</div>
          <div className='whitespace-nowrap'>{c.desc}</div>
        </div>
      ))}
    </div>
  );
}
