import { useAtom } from "jotai";


function OslHeader(props) {
  const headerNm = props.headerNm;
  return (
    <header className="header-wrap">
      
      <div className="header">
        <button type="button" className="btn btn-back">
            <span className="blind">뒤로가기</span>
        </button>
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