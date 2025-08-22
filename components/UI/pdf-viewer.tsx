import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { isMobile } from "react-device-detect";
import { CircleX, FileX2 } from "lucide-react";
import { TextShimmerWave } from "./text-shimmer-wave";

// load pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PDFViewerProps = {
  pdfURL: string;
};

function onLoading() {
  return (
    <div className='absolute inset-0 flex flex-col justify-center items-center'>
      <TextShimmerWave className='text-muted-foreground text-xl' duration={1}>
        Loading PDF...
      </TextShimmerWave>
    </div>
  );
}

function onError() {
  return (
    <div className='absolute inset-0 flex flex-col justify-center items-center'>
      <CircleX className='text-muted-foreground size-18 mb-4' />
      <div className='text-muted-foreground text-xl'>
        Failed to load PDF file
      </div>
    </div>
  );
}

function onNoData() {
  return (
    <div className='absolute inset-0 flex flex-col justify-center items-center'>
      <FileX2 className='text-muted-foreground size-18 mb-4' />
      <div className='text-muted-foreground text-xl'>No PDF file specified</div>
    </div>
  );
}

export default function PDFViewer({ pdfURL }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }

    handleResize(); // set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className='w-full'>
      <Document
        file={pdfURL}
        onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
        loading={onLoading}
        error={onError}
        noData={onNoData}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={isMobile ? width : undefined}
            className='my-1 w-full max-w-fit mx-auto'
          />
        ))}
      </Document>
    </div>
  );
}
