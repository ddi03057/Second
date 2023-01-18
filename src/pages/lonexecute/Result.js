/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명 : 대출실행결과
 * 설명 : 결과 값에 따라 성공 실패
 * @param {*} props
 * props항목별 설명
 */
function Result(props) {
  return(
    <>
    <div class="container">
        <div class="content">
            <div class="content-body">
                <div class="content-top line-be4">
                    <p class="top-tit">대출 금액 <span class="fw-b"><em class="fc-default">30,000,000</em>원</span>이 <br /> <strong>입금</strong>되었습니다.</p>
                    <figure class="payment">
                        <img src="../assets/img/ico/ico_payment.png" alt="payment"/>
                    </figure>
                </div>

                <section class="section line-tf4">
                    <div class="info-wrap">
                        <div class="info-box">
                            <span class="tit fc-gray">신청일자</span>
                            <span class="txt fc-dark ta-r">2021.06.22</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">대출금액</span>
                            <span class="txt fc-dark ta-r">30,450,000원</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">대출이자</span>
                            <p class="txt fc-dark ta-r">0.00%<span class="dp-b fs14 fc-lightGray ta-r">(기준금리 0.00% <br />+ 가산금리 0.00%)</span></p>
                        </div> 
                        <div class="info-box">
                            <span class="tit fc-gray">대출 실행일</span>
                            <span class="txt fc-dark ta-r">2021.07.02</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">거치기간 만료일</span>
                            <span class="txt fc-dark ta-r">2022.07.02</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">대출 만료일</span>
                            <span class="txt fc-dark ta-r">2026.07.02</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">이자지급시기</span>
                            <span class="txt fc-dark ta-r">매월 10일</span>
                        </div>
                        <div class="info-box ai-c">
                            <span class="tit fc-gray">대출금 입금 및 계좌번호</span>
                            <span class="txt fc-dark ta-r">123-456452-00045</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">기업명</span>
                            <span class="txt fc-dark ta-r">기은상사</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">대표자명</span>
                            <span class="txt fc-dark ta-r">홍길동</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">자금용도</span>
                            <span class="txt fc-dark ta-r">운전자금</span>
                        </div>
                        <div class="info-box">
                            <span class="tit fc-gray">상환방법</span>
                            <span class="txt fc-dark ta-r">원금균등분할상환</span>
                        </div>
                        <div class="info-box ai-c">
                            <span class="tit fc-gray ">총 원리금 및 수수료 부담 예상액</span>
                            <span class="txt fc-dark ta-r">0,000,000원</span>
                        </div>
                    </div>
                </section>
                
                <section class="section descr-wrap line-tf4">
                    <div class="descr-cont">
                        <h2 class="descr-tit fc-default">지연배상금률</h2>
                        <p class="descr-txt">여신이자율에 연체가산금의 연3%를 더하여 적용합니다. 단 최고 지연배상금률을 연 11%로 합니다.</p>
                        <ul class="bullet-type01 descr-add">
                            <li class="item fc-lightGray">
                                <sapn>여신만료일 이내에 변동될 수 있습니다.</sapn>
                            </li>
                        </ul>
                    </div>

                    <div class="descr-cont">
                        <h2 class="descr-tit fc-default">중도상환해약금</h2>
                        <p class="descr-txt">중도상환금액(분할상관금의 할부금 상환기일 전 상환 포함) x 요율(고정금리 <em class="fc-default">0.9%</em>/변동금리  <em class="fc-default">0.8%</em>) x (대출잔여일수÷대출기간)</p>
                        <ul class="bullet-type01 descr-add">
                            <li class="item fc-lightGray">
                                <span>대출기간 중 금리종류가 변경되더라도 당초 대출취급시점(기간 연장을 한 경우에는 직전 기간연장시점)의 요율을 적용하기로 합니다.</span>
                            </li>
                            <li class="item fc-lightGray">
                                <span>변동금리 대출로서 대출기간이 금리변동주기 이내인 경우에는 고정금리 대출 요율을 적용하기로 합니다.</span>
                            </li>
                            <li class="item fc-lightGray">
                                <span>중도상환해약금 요율<br />[부동산 담보]<br />- 고정금리 : 1.4%, 변동금리: 1.2%<br />[부동산 담보 외]<br />- 고정금리: 0.9%, 변동금리 : 0.8%</span>
                            </li>
                        </ul>
                    </div>
                </section>
            
            </div>

            <div class="content-footer">
                <button type="button" class="btn btn-lg default-bg">
                    <span class="txt">확인</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Result;