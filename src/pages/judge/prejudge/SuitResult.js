/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import OslHeader from "../../../modules/components/OslHeader";

/**
 * 화면명 : 적합성 적정성 결과
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function SuitResult(props) {
  const headerNm = props.headerNm
  return (
    <>
      <OslHeader />
      <div className="container">
        <div className="content">

          <div className="content-body prescreening">
            <div className="content-top">
              <div className="result-y">
                <p className="top-tit">
                  홍길동 님의<br />
                  <span className="fw-b">적합성・적정성 판단결과</span><br />
                  <span className="fw-b fc-p">적합</span>으로 확인됩니다
                </p>
              </div>
            </div>
          </div>

          <div className="content-footer">
            <button type="button" className="btn btn-lg default-bg">
              <span className="txt">다음</span>
            </button>
          </div>

        </div>
      </div>
    </>
  )
  
}

export default SuitResult;