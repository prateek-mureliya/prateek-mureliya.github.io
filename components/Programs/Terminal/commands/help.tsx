import { isNotEmptyArray } from "@/lib/utils";
import { THelp } from "@/types/terminal";

type HelpProps = THelp;

export default function Help({
  cmd,
  description,
  options,
  itemType,
  aliases,
}: HelpProps) {
  const items = {
    NOTHING: "",
    MULT_FILE_DIR: "[Files/Directories]...",
    SINGLE_DIR: "[Directory]",
  }[itemType];

  return (
    <>
      <div>
        <span className='bg-muted text-foreground font-bold border px-1 shadow-2xl rounded-xs'>
          {cmd}
        </span>{" "}
        {description}
      </div>
      <div className='mt-2'>
        <span className='text-red-500'>Usage:</span> {cmd}{" "}
        {isNotEmptyArray(Object.keys(options)) && (
          <span>
            [<span className='text-blue-500'>OPTIONS</span>]
          </span>
        )}
        {items}
      </div>
      {isNotEmptyArray(Object.keys(options)) && (
        <div className='mt-2'>
          <div className='text-red-500'>OPTIONS:</div>
          <table>
            <tbody>
              {Object.entries(options).map(([key, description]) => (
                <tr key={key}>
                  <td className='whitespace-nowrap pr-4 align-top'>{key}</td>
                  <td className='text-muted-foreground'>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {aliases && isNotEmptyArray(Object.keys(aliases)) && (
        <div className='mt-2'>
          <div className='text-red-500'>Aliases:</div>
          <table>
            <tbody>
              {Object.entries(aliases).map(([key, description]) => (
                <tr key={key}>
                  <td className='whitespace-nowrap pr-4 align-top'>{key}</td>
                  <td className='text-muted-foreground'>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
