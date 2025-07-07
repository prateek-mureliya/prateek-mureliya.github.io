import { RevealSecrets } from "../Programs";

export default function Desktop() {
  return (
    <ol className='absolute inset-0 z-1 h-desktop grid grid-flow-col grid-cols-desktop grid-rows-desktop gap-x-4 sm:gap-x-2 gap-y-5 px-4 sm:px-2 pt-4 sm:pt-2 mt-11'>
      <RevealSecrets />
    </ol>
  );
}
