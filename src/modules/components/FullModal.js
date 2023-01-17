import { useEffect, useState } from "react";
import { ModalContents } from "../../pages/common/ModalContents";
import PdfViewer from "../../pages/common/PdfViewer";

/**
 * 
 * @param {*} props 
 *  showYn={show}
 *  handleClose={handleClose}
 *  headerNm="약관 동의"
 *  content={arrPdfData}
 *  type="pdf"
 *  disabledYn={true}
 *  footerNm="확인"
 * @returns 
 */
function FullModal(props) {
  const showYn = props.showYn;
  const headerNm = props.headerNm;
  const content = props.content;
  const type = props.type
  const footerNm = props.footerNm;
  useEffect(()=> {
    console.log("쇼", showYn);
    if(showYn) {
      
      document.body.style.overflow="hidden";
      console.log("height", document.querySelector(".pop-content").scrollHeight);
    }
  }, [showYn]);
  const [disabledYn, setDisabledYn] = useState(props.disabledYn);
  return (
    <div id="layer00" className="pop-wrap pop-full" style={{display: showYn?"block":"none"}}>
      <div className="pop-inner">
        <div className="pop-header" style={{display: !!headerNm?"block":"none"}}>
          <h3>{headerNm}</h3>
          <button 
            type="button" className="btn btn-close" 
            onClick={()=> {
              document.body.style.overflow = "";
              document.getElementById("layer00").style.display = "none";
              props.handleClose();
            }}>
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="pop-content" style={{overflow: "auto"}}
          onScroll={(e)=>{
            console.log(e.target.scrollTop);
            if(document.querySelector(".pop-content").scrollHeight - Math.floor(document.querySelector(".pop-content").scrollTop) === document.querySelector(".pop-content").clientHeight) {
              setDisabledYn(false);
            }
          }}>

          {
            (type==="pdf")&&
              content.map((data, idx)=> {
                return (
                  <PdfViewer 
                    pdfData={data}
                  />
                )
              })   
          }
          {
            (type==="component")&&
              <ModalContents componentNm={content}/>
          }
        </div>
        <FooterBtn disabledYn={disabledYn} footerNm={footerNm} handleClose={props.handleClose} />
        
      </div>
    </div>
  );
}

function FooterBtn({disabledYn, footerNm, handleClose}) {
  
  return (
    <div className="pop-btn-area">
      <button id="footerBtn" type="button" className="btn btn-lg default-bg" disabled={disabledYn?true:false}
        onClick={()=>{
          document.body.style.overflow = "";
          document.getElementById("layer00").style.display = "none";
          handleClose();
        }}
      >
        <span className="txt">{footerNm}</span>
      </button>
    </div>
  );

}

export default FullModal;