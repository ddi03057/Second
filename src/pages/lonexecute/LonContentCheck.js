/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명 : 대출 내용 최종 확인
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function LonContentCheck(props) {
  return(
    <>
    <div class="container">
        <div class="content">
            <div class="content-body">
                <div class="content-top pad-b30 line-be4">
                    <p class="top-tit">
                        기은상사 홈길동님<br />
                        <b>대출 실행 전 최종확인</b>입니다.
                    </p>
                    <p class="top-desc fs18">꼼꼼히 확인해주세요.</p>
                </div>
                <div class="section line-tf4">
                    <div class="loan-amount">
                        <div class="txt-won">
                            <i class="ico-won"></i> 대출금액
                            <p class="num"><strong>10,000</strong> 만원</p>
                        </div>
                        <div class="txt-rate">
                            <i class="ico-rate"></i>변동금리 : 2.688%
                        </div>
                        <div class="pad-t10 fs14 ta-r fc-lightGray">(기준금리 0.00% + 가산금리0.00%)</div>
                    </div>
                </div>
                <div class="section line-tf4 pad-t30 pad-b30">
                    <h4 class="pad-b20 fc-default">신청일자</h4>
                    <div class="process-v">
                        <ol>
                            <li>
                                <strong class="date">2021.07.01 대출 실행</strong>
                                <p class="pay">
                                    매월 1일 <em class="red-16c">23,256</em>원 납부<br />
                                    <span>(이자, 금리에 따라 금액 변동 가능)</span>
                                </p>
                            </li>
                            <li>
                                <strong class="date">2022.07.01 거치기간 만료</strong>
                                <p class="pay">
                                    매월 1일 <em class="red-16c">876,500</em>원 납부<br />
                                    <span>(원금 + 이자, 금리에 따라 금액 변동 가능)</span>
                                    <span>납부 계좌 : 123-123456-0000</span>
                                </p>
                            </li>
                            <li>
                                <strong class="date">2026.07.01 대출 만료</strong>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="section pad-t30 pad-b30 line-tf4">
                    <ul class="list-type01">
                        <li class="info-wrap pad-t0 pad-b0">
                            <div class="info-box">
                                <span class="info-label fc-6">신청 일자</span>
                                <span class="info-label fc-3 ta-r">2021년 6월 22일</span>
                            </div>
                        </li>
                        <li class="info-wrap pad-t0 pad-b0">
                            <div class="info-box">
                                <span class="info-label fc-6">자금용도</span>
                                <span class="info-label fc-3 ta-r">운전자금</span>
                            </div>
                        </li>
                        <li class="info-wrap pad-t0 pad-b0">
                            <div class="info-box">
                                <span class="info-label fc-6">상환방법</span>
                                <span class="info-label fc-3 ta-r">원금균등분할상환</span>
                            </div>
                        </li>
                        <li class="info-wrap pad-t0 pad-b0">
                            <div class="info-box">
                                <span class="info-label fc-6">총 원리금 및 수수료 부담 예상액</span>
                                <span class="info-label fc-3 ta-r"><strong>1,530,123원</strong></span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="section line-tf4">
                    <div class="descr-wrap">
                        <div class="descr-cont">
                            <h4 class="descr-tit fc-default">지연배상금률</h4>
                            <p class="descr-txt">여신이자율에 연체가산금의 연3%를 더하여 적용합니다. 단 최고 지연배상금률을 연 11%로 합니다.</p>
                            <ul class="bullet-type01 descr-add">
                                <li class="item fc-lightGray">
                                    <sapn>여신만료일 이내에 변동될 수 있습니다.</sapn>
                                </li>
                            </ul>
                        </div>
                        <div class="descr-cont">
                            <h4 class="descr-tit fc-default">중도상환해약금</h4>
                            <p class="descr-txt">중도상환금액(분할상관금의 할부금 상환기일 전 상환 포함) x 요율(고정금리 <span class="fc-default">0.9%</span>/변동금리  <span class="fc-default">0.8%</span>) x (대출잔여일수÷대출기간)</p>
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
                    </div>
                </div>
                <div class="section line-tf4 pad-b0">
                    <div class="box-chk">
                        <input type="checkbox" name="last-confirm" id="last-confirm" class="check-input02 blind"/>
                        <label for="last-confirm" class="check-label fc-gray">본인은 해당 내용을 설명받고 이해하였습니다.</label>                        
                    </div>
                </div>
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

export default LonContentCheck;