import { memo } from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = memo((props)=> {
  console.log(props.pdfData);
  return (
    <Document file={{ url: "/api3"+props.pdfData.pdfvalue, httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }}>
      <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
      <Page pageNumber={2} renderTextLayer={false} renderAnnotationLayer={false} />
    </Document>
  );
});

export default PdfViewer;