import dynamic from "next/dynamic";
import WindowBody, { WindowBodyProps } from "../../Window/window-body";

const DynamicPDFViewer = dynamic(() => import("../../UI/pdf-viewer"), {
  ssr: false,
});

export default function PDFWindow({ isMaximized, link = "" }: WindowBodyProps) {
  return (
    <WindowBody isMaximized={isMaximized} className='relative px-1'>
      <DynamicPDFViewer pdfURL={link} />
    </WindowBody>
  );
}
