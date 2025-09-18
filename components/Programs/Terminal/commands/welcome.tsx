import { AUTHOR_NAME, AUTHOR_ROLES } from "@/lib/constants";
import { PixelatedCanvas } from "../../../UI/pixelated-canvas";
import { TCommandBase, THelp } from "@/types/terminal";

export const help: THelp = {
  cmd: "welcome",
  description: "is a banner for display welcome message.",
  options: {},
  itemType: "NOTHING",
};

export default function Welcome({}: TCommandBase) {
  return (
    <>
      <div className='inline-block px-4 py-2 border border-foreground rounded-xl relative before:absolute before:rounded-full before:w-4 before:h-4 before:-bottom-8 before:left-8 before:border after:absolute after:rounded-full after:w-2 after:h-2 after:-bottom-12 after:left-14 after:border'>
        <div>
          Hi, I&#39;m {AUTHOR_NAME} — a {AUTHOR_ROLES[0]}.
        </div>
      </div>
      <PixelatedCanvas
        src='/images/profile-welcome-terminal.png'
        width={200}
        height={200}
        cellSize={2}
        dotScale={0.9}
        shape='circle'
        backgroundColor=''
        grayscale
        dropoutStrength={0.4}
        interactive
        distortionStrength={3}
        distortionRadius={80}
        distortionMode='swirl'
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintStrength={0.2}
        className='ml-6'
      />
      <div className='mt-4'>
        Tip: Start with <span className='text-green-700'>&#39;help&#39;</span>{" "}
        if you&#39;re not sure where to go.
      </div>
    </>
  );
}
