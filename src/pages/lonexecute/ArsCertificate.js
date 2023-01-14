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
  return(
    <>
        <div class="container">
            <div class="content">
                <div class="content-body">
                    <div class="content-top mar-t40">
                        <p class="top-tit ta-c">인증번호</p>
                        <span class="auth-num fc-default"><strong>00</strong></span>
                    </div>
    
                    <section class="section auth-wrap line-tf4">
                        <p class="auth-txt">고객님께 ARS 인증을 위해 전화를 걸고 있습니다. 거래를 승인하시려면 ARS전화에서 인증번호를 입력해주세요.</p>
                        <div class="btn-wrap ta-c">
                            <button type="button" class="btn-line02 mar-t50">
                                <span class="txt">인증번호 재요청</span>
                            </button>
                        </div>                        
                    </section>
                
                </div>
    
                <div class="content-footer">
                    <button type="button" class="btn btn-lg default-bg">
                        <span class="txt">다음</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ArsCertificate;