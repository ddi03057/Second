import { memo, useState } from "react";
import { Document, Page } from "react-pdf";
import Loading from "../../modules/components/Loading";





const PdfViewer = memo((props)=> {
  const [numPages, setNumPages] = useState(null); // 총 페이지수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
  const [pageScale, setPageScale] = useState(1); // 페이지 스케일
  let arrPage = [];
  function onDocumentLoadSuccess({numPages}) {
    //console.log(`numPages ${numPages}`);
    setNumPages(numPages);
    for(let i=0; i<numPages; i++){
      //console.log("for");
      arrPage.push(i+1);
    }

  }
  //console.log("PDFVIEWER",props.pdfData);
  //console.log("ARR",arrPage);
  return (
    <Document file={{ url: "/api3"+props.pdfData.pdfvalue, httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }} onLoadSuccess={onDocumentLoadSuccess}>
      {/* {
        arrPage.map((data, idx)=> {
          <Page pageNumber={pageNumber} width={1280/3-20} height={720/2} renderTextLayer={false} renderAnnotationLayer={false} />
        })
      } */}
      <Page pageNumber={1} width={1280/3-20} height={720/2} renderTextLayer={false} renderAnnotationLayer={false} loading={<Loading />}/>
    </Document>
  );
});

export default PdfViewer;