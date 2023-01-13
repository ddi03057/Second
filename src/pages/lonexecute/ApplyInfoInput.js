/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import OslBtn from "../../modules/components/OslBtn";
import OslHeader from "../../modules/components/OslHeader";
import collectData from "../../modules/constants/collectData.js";

/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function ApplyInfoInput(props) {
  
  function cbOslBtn() {

  }
  return (
    <>
    <OslHeader headerNm={props.headerNm} />
    <div className="container">
        <div className="content">
            <div className="content-body">
                <div className="content-top pad-b30 line-be4">
                    <p className="top-tit"><strong>대출 신청서를 작성</strong>해주세요.</p>
                </div>
                <div className="section line-tf4">
                    <div className="agree-form pad-t10 type2">
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">대출 상품명</span>
                            <span className="check-label ta-r fc-6">온라인 플랫폼 입점<br/>
                                소상공인 보증부대출</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">대출 신청일</span>
                            <span className="check-label ta-r fc-6">2021년 6월 22일</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">대출 만기일</span>
                            <span className="check-label ta-r fc-default">2026년 6월 21일</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">대출 신청금액</span>
                            <span className="check-label ta-r fc-6">100,000,000원</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">보증 승인금액</span>
                            <span className="check-label ta-r fc-6">90,000,000원</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">적용 보증료율</span>
                            <span className="check-label ta-r fc-6">00.00%</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">납부 보증료</span>
                            <span className="check-label ta-r fc-6">100,000원</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">상환방법</span>
                            <span className="check-label ta-r fc-6">만기일시상환</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">기업명</span>
                            <span className="check-label ta-r fc-6">기은상사</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">특약 사항</span>
                            <span className="check-label ta-r fc-6">특약</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">인지세</span>
                            <span className="check-label ta-r fc-6">대상외</span>
                        </p>
                        <p className="box-chk flex">                        
                            <span className="check-label fc-3">만기일</span>
                            <span className="check-label ta-r fc-6">2023년 01월 01일</span>
                        </p>
                    </div>
                </div>
                <div className="section line-tf4">
                    <ol className="sele-list type03 pad-b10">
                        <li className="item">
                            <div className="question-wrap txt-wrap">
                                <p className="txt">
                                    금리종류
                                </p>
                            </div>
                            <div className="sele-list type01 radius answer-wrap mar-t10">
                                <div className="item">
                                    <input type="text" className="ta-c" name="text01" id="text01_01" readOnly value="고객 적용 금리"/>
                                </div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="question-wrap txt-wrap">
                                <p className="txt">
                                    자금용도
                                </p>
                            </div>
                            <div className="sele-list type01 radius answer-wrap mar-t10 row3 noflex1">
                                <div className="item">
                                    <input type="radio" name="radio02" id="radio02_01"/>
                                    <label htmlFor="radio02_01" className="item-cont">사업장운영자금</label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="radio02" id="radio02_02"/>
                                    <label htmlFor="radio02_02" className="item-cont">원부자재구입</label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="radio02" id="radio02_03"/>
                                    <label htmlFor="radio02_03" className="item-cont">기타</label>
                                </div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="question-wrap txt-wrap">
                                <p className="txt">
                                    할부금 및 이자납입일 - 매월
                                </p>
                            </div>

                            <div className="sele-list type01 radius answer-wrap mar-t10 row4 noflex1">
                                <div className="item">
                                    <input type="radio" name="radio03" id="radio03_01"/>
                                    <label htmlFor="radio03_01" className="item-cont">1일</label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="radio03" id="radio03_02"/>
                                    <label htmlFor="radio03_02" className="item-cont">10일</label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="radio03" id="radio03_03"/>
                                    <label htmlFor="radio03_03" className="item-cont">20일</label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="radio03" id="radio03_04"/>
                                    <label htmlFor="radio03_04" className="item-cont">직접입력</label>
                                </div>
                            </div>
                            {/* <div className="sele-list type01 radius answer-wrap mar-t10">
                                <div className="item">
                                    <input type="text" name="text01" id="text01_01" placeholder="텍스트를 입력해주세요">
                                </div>
                                <div className="btn-wrap">
                                    <button type="reset" className="btn btn-sm btn-reset"><span className="blind">재작성</span></button>
                                </div>
                            </div> */}
                        </li>
                        <li className="item">
                            <div className="question-wrap txt-wrap">
                                <p className="txt">
                                    대출금 입금 및 자동이체 계좌번호
                                </p>
                            </div>

                            <div className="sele-list type01 radius answer-wrap mar-t10">
                                <div className="item">
                                    <label className="ui-select">
                                        <select name="sSel" id="sSel1">
                                            <option value="">기업 123-45675-00-45951</option>
                                            <option value="">농협 123-45675-00-45951</option>
                                            <option value="">국민 123-45675-00-45951</option>
                                            <option value="">신한 123-45675-00-45951</option>
                                        </select>
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

            <OslBtn 
              obj={{
                type: "button",
                disabled: false,
                text: ["다음"],
                link: "",
                callbackId: cbOslBtn}}/>
        </div>
    </div>
    </>
  );
}

export default ApplyInfoInput;