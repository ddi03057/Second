function FinanceCusLaw() {
  return(
    <>
    {/* 헤더 */}
    <div class="container">
        <div class="content">
            <div class="content-body">
                <div class="content-top pad-b30">
                    <div class="txt-wrap">
                        <h2 class="txt l-txt">
                            계약체결 전 <b>중요사항 안내여부</b> 확인
                        </h2>
                    </div>
                </div>

                <div class="section pad-t0">
                    <ol class="sele-list type02">
                        <li class="item">
                            <div class="question-wrap txt-wrap">
                                <p class="txt">
                                    1. 기업대출금을 주택구입자금 등 기업활동과 무관한 용도로 사용하는 것은 제한되며 이를 위반하는 경우 <em class="fc-01">대출금을 즉시 상환</em>하여야 할 뿐만 아니라 향후 <em class="fc-01">신규대출이 제한</em>될 수 있습니다.<br />
                                    확인하셨습니까?
                                </p>
                            </div>

                            <div class="sele-list type01 radius answer-wrap">
                                <div class="item">
                                    <input type="radio" name="radio01" id="radio01_01" />
                                    <label for="radio01_01" class="item-cont">아니요</label>
                                </div>
                                <div class="item">
                                    <input type="radio" name="radio01" id="radio01_02" />
                                    <label for="radio01_02" class="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <div class="question-wrap txt-wrap">
                                <p class="txt">
                                    2. 대출계약이 성립한 날로부터 <em class="u-line">3년 이내의 기간</em> 동안에는 약정하신 대출금을 조기상환하는 경우 <em class="fc-01">중도상환해약금이 발생</em>할 수 있습니다.<br />
                                    은행 직원으로부터 관련 설명을 받으셨나요? 앞 화면의 중도상환해약금 부분을 확인하셨습니까?
                                </p>
                            </div>
                            
                            <div class="sele-list type01 radius answer-wrap">
                                <div class="item">
                                    <input type="radio" name="radio02" id="radio02_01" />
                                    <label for="radio02_01" class="item-cont">아니요</label>
                                </div>
                                <div class="item">
                                    <input type="radio" name="radio02" id="radio02_02" />
                                    <label for="radio02_02" class="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li class="item">
                            <div class="question-wrap txt-wrap">
                                <p class="txt">
                                    3. 대출의 변제기가 도래하거나 기한의 이익이 상실되었음에도 채무가 상환되지 않는 경우 은행은 담보물을 처분하여 대출금을 상환하는데 이를 사용할 수 있으며, 이 경우 고객님은 담보물에 대한 소유권을 상실할 수 있습니다. <em class="red-16c u-line">이러한 위험에도 불구하고 본 상품에 가입하시겠습니까?</em>
                                </p>
                            </div>

                            <div class="sele-list type01 radius answer-wrap">
                                <div class="item">
                                    <input type="radio" name="radio03" id="radio03_01" />
                                    <label for="radio03_01" class="item-cont">아니요</label>
                                </div>
                                <div class="item">
                                    <input type="radio" name="radio03" id="radio03_02" />
                                    <label for="radio03_02" class="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                    </ol>

                    <div class="terms-wrap">
                        <ul class="ui-cont-wrap">
                            <li class="ui-decide">
                                <input type="checkbox" id="checkbox01" />
                                <label for="checkbox01" class="input-label">금리인하요구권이란 금융소비자가 본인의 신용상태가 개선 되었다고 판단되는 경우(재무상태 개선, 신용등급 또는 개인 신용평점 상승 등) 은행에 자신이 적용받는 금리인하를 요구할 수 있는 권리(은행법 제30조의2)를 말합니다.</label>
                            </li>

                            <li class="ui-decide">
                                <input type="checkbox" id="checkbox02" />
                                <label for="checkbox02" class="input-label">본인은 IBK기업은행과 대출거래를 함에 있어 은행직원과 상담하여 위에서 설명한 내용을 포함하여 대출거래의 주요내용 및 고객부담비용에 대하여 충분히 설명을 듣고 이해하였음을 확인합니다.</label>
                            </li>

                            <li class="ui-decide">
                                <input type="checkbox" id="checkbox03" />
                                <label for="checkbox03" class="input-label">본인은 은행 직원으로부터 금융소비자의 권리와 의무에 대하여 충분히 설명을 듣고 이해하였음을 확인합니다.</label>
                            </li>

                            <li class="ui-decide">
                                <input type="checkbox" id="checkbox04" />
                                <label for="checkbox04" class="input-label">본인은 대출계약 신청에 따라 은행직원으로부터 여신거래약정서(기업용) 본, 은행여신거래기본약관(기업용), 동 상품설명서를 교부 받았음을 확인합니다.</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* 푸터 ARS인증하기 */}
        </div>
    </div>
    </>
  )
}
export default FinanceCusLaw