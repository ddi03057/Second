import { useEffect } from "react";
import { ModalContents } from "../../pages/common/ModalContents";
import PdfViewer from "../../pages/common/PdfViewer";
import GrtInfoInput from "../../pages/judge/prejudge/GrtInfoInput";

function FullModal(props) {
  const showYn = props.showYn;
  const headerNm = props.headerNm;
  const content = props.content;
  const type = props.type
  useEffect(()=> {
    document.body.style.overflow="hidden";
  }, []);
  return (
    <div id="layer00" className="pop-wrap pop-full" style={{display: showYn?"block":"none"}}>
      <div className="pop-inner">
        <div className="pop-header" style={{display: !!headerNm?"block":"none"}}>
          <h3>{headerNm}</h3>
          <button type="button" className="btn btn-close">
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="pop-content">

          {
          (type==="pdf")&&
            <PdfViewer 
              pdfData={content[0]}
            />
          }
          {
            (type==="component")&&
              <ModalContents componentNm={content}/>
          }
        </div>
        <div className="pop-btn-area">
          <button type="button" className="btn btn-lg default-bg">
            <span className="txt">모두 동의하고 다음</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullModal;