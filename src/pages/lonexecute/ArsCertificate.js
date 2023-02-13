/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명 : ARS 인증 화면
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function ArsCertificate(props) {

  console.log(props.preData);

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top mar-t40">
              <p className="top-tit ta-c">인증번호</p>
              <span className="auth-num fc-default"><strong>00</strong></span>
            </div>

            <section className="section auth-wrap line-tf4">
              <p className="auth-txt">고객님께 ARS 인증을 위해 전화를 걸고 있습니다. 거래를 승인하시려면 ARS전화에서 인증번호를 입력해주세요.</p>
              <div className="btn-wrap ta-c">
                <button type="button" className="btn-line02 mar-t50">
                  <span className="txt">인증번호 재요청</span>
                </button>
              </div>
            </section>

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

export default ArsCertificate;