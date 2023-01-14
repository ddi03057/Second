/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useState } from "react";
import OslHeader from "../../modules/components/OslHeader";
/**
 * 화면명 : 여신거래약정서
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function AgrmInput(props) {

  const headerNm = props.headerNm;
  return (
    <>
      <OslHeader headerNm={headerNm} />

      <div class="container">
        <div class="content">
          <div class="content-body">
            <div class="content-top">
              <p class="top-tit fw-b">약정서의 내용을 확인하고 <br />항목에 동의해주세요.</p>
            </div>
            <div class="section">
              <div class="agree-form">
                <div class="box-chk flex">
                  <span class="chk-left">신청일자</span>
                  <span class="chk-right">2022.12.12</span>
                </div>
                <div class="box-chk flex">
                  <span class="chk-left">기업명</span>
                  <span class="chk-right">기은상</span>
                </div>
                <div class="box-chk flex">
                  <span class="chk-left">대표자명</span>
                  <span class="chk-right">홍길</span>
                </div>
                <div class="box-chk flex">
                  <span class="chk-left">상품명</span>
                  <p class="chk-right ">온라인 플랫폼 입점<br />
                    소상공인 보증부대출</p>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_1" id="agree_terms_1_1" class="check-input blind" />
                  <label for="agree_terms_1_1" class="check-label chk-left">계정과목명</label>
                  <span class="chk-right">중소기업자금대출</span>
                </div>
                <div class="box-chk flex">
                  <span class="chk-left">여신계좌</span>
                  <span class="chk-right">여신계좌번호</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_2" id="agree_terms_1_2" class="check-input blind" />
                  <label for="agree_terms_1_2" class="check-label chk-left">여신(한도)금액</label>
                  <span class="chk-right">여신금액</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_3" id="agree_terms_1_3" class="check-input blind" />
                  <label for="agree_terms_1_3" class="check-label chk-left">거래구분</label>
                  <span class="chk-right">개별거래</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_4" id="agree_terms_1_4" class="check-input blind" />
                  <label for="agree_terms_1_4" class="check-label chk-left">여신실행일</label>
                  <span class="chk-right">여신실행일</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_5" id="agree_terms_1_5" class="check-input blind" />
                  <label for="agree_terms_1_5" class="check-label chk-left">거치만료일</label>
                  <span class="chk-right">거치만료일</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_6" id="agree_terms_1_6" class="check-input blind" />
                  <label for="agree_terms_1_6" class="check-label chk-left">여신만료일</label>
                  <span class="chk-right">여신만료일</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_7" id="agree_terms_1_7" class="check-input blind" />
                  <label for="agree_terms_1_7" class="check-label chk-left">여신이자율</label>
                  <span class="chk-right">여신이자율</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_8" id="agree_terms_1_8" class="check-input blind" />
                  <label for="agree_terms_1_8" class="check-label chk-left">지연배상금율</label>
                  <span class="chk-right">지연배상금율</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_9" id="agree_terms_1_9" class="check-input blind" />
                  <label for="agree_terms_1_9" class="check-label chk-left">중도상황해약금</label>
                  <span class="chk-right">중도상황해약금</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_10" id="agree_terms_1_10" class="check-input blind" />
                  <label for="agree_terms_1_10" class="check-label chk-left">여신실행방법</label>
                  <span class="chk-right">여신실행방법</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_11" id="agree_terms_1_11" class="check-input blind" />
                  <label for="agree_terms_1_11" class="check-label chk-left">상환방법</label>
                  <span class="chk-right">만기일시상환</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_12" id="agree_terms_1_12" class="check-input blind" />
                  <label for="agree_terms_1_12" class="check-label chk-left">이자지급시기</label>
                  <span class="chk-right">이자지급시기</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_13" id="agree_terms_1_13" class="check-input blind" />
                  <label for="agree_terms_1_13" class="check-label chk-left">자동이체신청</label>
                  <span class="chk-right">신청</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_14" id="agree_terms_1_14" class="check-input blind" />
                  <label for="agree_terms_1_14" class="check-label chk-left" style="width: 199px;">대출금 입금 및 자동이체<br />
                    (보증료등) 계좌번호</label>
                  <span class="chk-right">계좌번호</span>
                </div>
                <div class="box-chk flex">
                  <input type="checkbox" name="agree_terms_1_15" id="agree_terms_1_15" class="check-input blind" />
                  <label for="agree_terms_1_15" class="check-label chk-left">특약사</label>
                  <span class="chk-right">특약</span>
                </div>
              </div>
            </div>
          </div>
          <div class="content-footer">
            <button type="button" class="btn btn-lg default-bg">
              <span class="txt">모두 동의하고 다음</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AgrmInput;