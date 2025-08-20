import dynamic from "next/dynamic";
import WindowBody, { WindowBodyProps } from "../../Window/window-body";

const DynamicPDFViewer = dynamic(() => import("../../UI/pdf-viewer"), {
  ssr: false,
});

export default function PDFWindow({ isMaximize, link = "" }: WindowBodyProps) {
  return (
    <WindowBody isMaximize={isMaximize}>
      <DynamicPDFViewer pdfURL={link} />
    </WindowBody>
  );
}
