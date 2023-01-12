/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function SelfCheck(props) {
  return(
    <>
    <div className ="container">
        <div className ="content">
            <div className ="content-body certified">
                <div className ="content-top pad-b30 line-be4">
                    <div className ="txt-wrap">
                        <h2 className ="txt b-txt">
                            자가진단 <b>체크리스트</b>
                        </h2>
                        <p className ="txt s-txt">
                            보증심사 진행 가능 여부를 사전에 확인해 주시기 바랍니다.
                        </p>
                    </div>
                </div>

                <div className ="section pad-t30 line-tf4">
                    <ol className ="sele-list type03">
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    1. 영리목적으로 사업을 영위하는 개인기업에 해당하십니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio01" id="radio01_01"/>
                                    <label htmlFor ="radio01_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio01" id="radio01_02"/>
                                    <label htmlFor ="radio01_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    2. 보증금지/제한 기업 또는 보증제한/취급유의/지역신용보증재단 우선취급업종 영위기업에 해당되십니까?
                                </p>
                            </div>

                            <div className ="link-btn-wrap">
                                <button type="button" className ="link-btn type01">
                                    <span className ="ico-blue-arrow right">업종 펼쳐보기</span>
                                </button>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio02" id="radio02_01"/>
                                    <label htmlFor ="radio02_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio02" id="radio02_02"/>
                                    <label htmlFor ="radio02_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    3. 심사항목 저촉사항이 있습니까?
                                </p>
                                <ol className ="order-list">
                                    <li data-num="①" className ="item">신청일 현재 금융기관 연체 중</li>
                                    <li data-num="②" className ="item">신청일 현재 국세,지방세, 4대보험 체납 중</li>
                                    <li data-num="③" className ="item">최근 3개월 이내 10일 이상 계속된 연체대출금 보유</li>
                                    <li data-num="④" className ="item">최근 1년 이내 당좌부도, 신용관리정보<br/>(신용보증기금/기술보증기금/신용보증재단) 부실정보 보유</li>
                                    <li data-num="⑤" className ="item">최근 1년 이내 사업장 또는 거주주택에 대한 권리침해(경매,압류,가압류,가처분)</li>
                                </ol>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio03" id="radio03_01"/>
                                    <label htmlFor ="radio03_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio03" id="radio03_02"/>
                                    <label htmlFor ="radio03_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    4. 신청기업의 실제경영자가 사업자등록증상 대표자입니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio04" id="radio04_01"/>
                                    <label htmlFor ="radio04_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio04" id="radio04_02"/>
                                    <label htmlFor ="radio04_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    5. 사업자등록상 공동대표자가 있습니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio05" id="radio05_01"/>
                                    <label htmlFor ="radio05_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio05" id="radio05_02"/>
                                    <label htmlFor ="radio05_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    6. 신청일 현재 신청기업 이외에 다른 기업을 운영 중에 있으며, 해당 기업이 신용보증기금, 기술보증기금, 지역신용보증재단에 보증잔액이 있습니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio06" id="radio06_01"/>
                                    <label htmlFor ="radio06_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio06" id="radio06_02"/>
                                    <label htmlFor ="radio06_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    7. 신청일 현재 신용보증기금 또는 기술보증기금 보증잔액이 있습니까?

                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio07" id="radio07_01"/>
                                    <label htmlFor ="radio07_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio07" id="radio07_02"/>
                                    <label htmlFor ="radio07_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    8. 사업자등록증상 개업일로부터 1년이 지났습니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio08" id="radio08_01"/>
                                    <label htmlFor ="radio08_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio08" id="radio08_02"/>
                                    <label htmlFor ="radio08_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                        <li className ="item">
                            <div className ="question-wrap txt-wrap">
                                <p className ="txt">
                                    9. 최근 1년 이내 대표자(실제경영자)가 변동 된 사실이 있습니까?
                                </p>
                            </div>

                            <div className ="sele-list type01 radius answer-wrap">
                                <div className ="item">
                                    <input type="radio" name="radio09" id="radio09_01"/>
                                    <label htmlFor ="radio09_01" className ="item-cont">아니요</label>
                                </div>
                                <div className ="item">
                                    <input type="radio" name="radio09" id="radio09_02"/>
                                    <label htmlFor ="radio09_02" className ="item-cont">예</label>
                                </div>
                            </div>
                        </li>
                    </ol>

                    <div className ="terms-wrap">
                        <div className ="txt-wrap bg-gray">
                            <p className ="txt s-txt">
                                고객님께서 입력하신 내용은 심사 시 사실여부를 다시 한번 확인하게 됩니다.
                                신청대상이 아님에도 불구하고 실제와 다르게 입력하였을 경우 보증서 발급이 거절될 수 있습니다.
                            </p>
                        </div>
    
                        <div className ="ui-cont-wrap">
                            <div className ="ui-decide">
                                <input type="checkbox" id="checkbox01"/>
                                <label htmlFor ="checkbox01" className ="input-label">위 내용에 동의하십니까?</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </>
  )

}

export default SelfCheck;