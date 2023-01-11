import { useAtom } from "jotai";


function OslHeader(props) {
  const headerNm = '';
  return (
    //position 임시적용
    <header className="header-wrap" style={{position: "relative"}}> 
      <div className="header">
        <div className="h-title">
          <span>{headerNm}</span>
        </div>
        <button type="button" className="btn btn-close">
          <span className="blind">닫기</span>
        </button>
      </div>
    </header>
  );
}

export default OslHeader;