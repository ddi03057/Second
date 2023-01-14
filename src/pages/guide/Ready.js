/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useState, } from "react";
import { useNavigate } from "react-router";
import OslHeader from "../../modules/components/OslHeader";
import OslBtn from "../../modules/components/OslBtn";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function Ready(props) {

  let navigate = useNavigate();

  function cbOslBtn(){
    navigate(
      PathConstants. PREJUDGE_CUSTAGREE
      );
  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className ="container">
        <div className ="content">
          <div className ="content-body">
            <div className ="content-top pad-b40">
              <p className ="top-tit">
                대출을 위해 미리 준비가<br />
                필요한 것을 안내해드립니다.
              </p>
            </div>
            <div className ="section pad-0">
              <div className ="box-cont">
                <div className ="b-title">본인 확인</div>
                <div className ="b-txt"><b>본인 명의 휴대전화</b></div>
              </div>

              <div className ="box-cont">
                <div className ="b-title">스크래핑</div>
                <div className ="b-txt">
                  <dl>
                    <dt>국세청/정부24에 등록된 개인공동인증서</dt>
                    <dd>
                      <ul className ="list-type01">
                        <li>
                          개인공동인증서 스마트폰 복사가이드 안내화면
                          <div className ="mar-t10">
                            <button type="button" className ="btn btn-sm btn-default">
                              <span className ="txt">안내화면</span>
                            </button>
                          </div>
                        </li>
                        <li className ="mar-t20">
                          국세청/정부24 미가입(미등록) 고객을 위한 해당 사이트
                          <div className ="mar-t10">
                            <button
                            type="button"
                            className ="btn btn-sm btn-default"
                            onClick={() => { window.location.href = 'https://www.nts.go.kr'; }}
                            >
                              <span className ="txt">국세청</span>
                            </button>
                            <button
                            type="button"
                            className ="btn btn-sm btn-default"
                            onClick={() => { window.location.href = 'https://www.gov.kr'; }}
                            >
                              <span className ="txt">정부24</span>
                            </button>
                          </div>
                        </li>
                        <li className ="mar-t20">
                          개인공동인증서 등록 완료 후 스마트폰 내 개인공동인증서 확인
                          <div className ="mar-t10">
                            <button type="button" className ="btn btn-sm btn-default">
                              <span className ="txt">개인공동인증서 조회(관리)</span>
                            </button>
                          </div>
                        </li>
                        <li className ="mar-t20">
                          전자서명을 위한 기업(사업자)공동인증서 확인
                          <div className ="mar-t10">
                            <button type="button" className ="btn btn-sm btn-default">
                              <span className ="txt">기업(사업자)공동인증서 조회(관리)</span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className ="box-cont">
                <div className ="b-title">대출 실행</div>
                <div className ="b-txt">
                  <dl>
                    <dt>OTP</dt>
                    <dd>
                      <ul className ="list-type01">
                        <li>
                          보유 OTP 등록 및 동작 상태 확인
                          <div className ="mar-t10">
                            <button type="button" className ="btn btn-sm btn-default">
                              <span className ="txt">OTP 테스트</span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className ="box-cont">
                <div className ="b-title">유의사항</div>
                <div className ="b-txt pad-b0">
                  <dl>
                    <dt>계좌</dt>
                    <dd>
                      <ul className ="list-type04">
                        <li>한도계좌를 풀어두지 않은 상태에서 진행 시 취소될 수 있음</li>
                        <li>1인 1계좌</li>
                        <li>최근 20일 이내에 사업자 계좌 개설 사실이 있을 경우 대출 실행이 불가합니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className ="section pad-b0">
              <div className ="box-chk">
                <input type="checkbox" name="guide-confirm" id="guide-confirm" className ="check-input02 blind" />
                <label for="guide-confirm" className ="check-label fc-gray">위 내용을 확인하였습니다.</label>
              </div>
            </div>
          </div>
          <OslBtn
              obj={{
                type: "button",
                disabled: false,
                text: ["다음"],
                link: "",
                callbackId: cbOslBtn
              }} />
        </div>
      </div>

    </>
  )
}

export default Ready;