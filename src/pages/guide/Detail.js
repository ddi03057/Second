/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useState, } from "react";
import { useLocation, useNavigate } from "react-router";
import OslHeader from "../../modules/components/OslHeader";
import OslBtn from "../../modules/components/OslBtn";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
import request from "../../modules/utils/Axios";
import { useLayoutEffect } from "react";
import { callLocalApi } from "../../modules/common/tokenBase";


const detailData = collectData("detail");

/**
 * 화면명 : 상품안내(첫페이지)
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function Detail(props) {
  let navigate = useNavigate();
  
  function cbOslBtn(){
    navigate(PathConstants.GUIDE_READY);
  }
  const data = detailData;



  return (
    <>
    {(!!props.headerNm)&&<OslHeader headerNm={props.headerNm}/>}
        <div className ="container">
          <div className ="content">
            <div className ="content-body">
              <div className ="content-top">
                <p className ="top-tit">
                  <b>온라인 플랫폼 입점<br />소상공인 보증부대출</b>
                </p>
                <p className ="top-desc">
                  <span className ="fc-p">IBK기업은행</span>과 <span className ="fc-p">신용보증기금</span>의 업무협약을 통해 출시한 개인사업자 <span className ="fc-p">비대면 전용 상품</span>
                </p>
              </div>
              <div className ="section pad-b40">
                <div className ="loan-amount">
                  <div className ="txt-won">
                    <i className ="ico-won"></i> 금액
                    <p className ="num"><strong>{data.loanMn}</strong> 원</p>
                  </div>
                  <div className ="txt-rate">
                    <i className ="ico-rate"></i>금리 : {data.lendrate} %
                  </div>
                </div>
              </div>
              <div className ="section pad-0">
                <div className ="box-cont">
                  <div className ="b-title">상품 요약</div>
                  <div className ="b-txt">
                    <dl>
                      <dt>가입대상</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>네이버 스토어 입점 개인사업자(개업일로부터 6개월 이상)<br />※ 단독 개인사업자</li>
                        </ul>
                      </dd>

                      <dt>자금 용도</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>사업장 운영자금</li>
                        </ul>
                      </dd>

                      <dt>대출 과목</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>최대 8년 이내(3년 거치 5년 균등분할)</li>
                        </ul>
                      </dd>

                      <dt>서비스 이용시간 (은행 영업일만 가능)</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>09:30 ~ 17:00<br /><span className ="sTxt1">※ 고객센터 : 02-729-7633</span></li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>

                <div className ="box-cont">
                  <div className ="b-title">대출 정보</div>
                  <div className ="b-txt">
                    <dl>
                      <dt>대출한도</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>최대 1억원 (90% 신용보증기금 보증서)</li>
                        </ul>
                      </dd>

                      <dt>대출금리</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>KORIBOR(3,6,12개월물 中 선택) + 가산금리 - 우대금리</li>
                          <li>연체이자 및 지연배상금(은행여신약관 기준)</li>
                        </ul>
                      </dd>

                      <dt>상환방식</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>원금균등분할상환<br />원금을 매달 같은 금액으로 나누어 갚고, 대출 잔액에 해당하는 이자를 매달 납부하는 방법</li>
                        </ul>
                      </dd>

                      <dt>부대비용</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>중도상환해약금 면제 / - 수입인지세 5천만원 초과</li>
                        </ul>
                      </dd>

                      <dt>금융지원 제외대상</dt>
                      <dd>
                        <ul className ="list-type01">
                          <li>휴∙폐업 중인 기업</li>
                          <li>연체대출금 보유 또는 국세∙지방세 체납기업</li>
                          <li>보증 제한업종을 영위하는 기업(도박, 유흥, 오락, 점술 등)</li>
                          <li>기타 신용상태가 불량하다고 판단되는 기업</li>
                          <li>개업일 1년 이하 기업(심사일 기준 경과 여부)</li>
                          <li>금년도 부가세 신고금액이 0원인 기업(간이과세자/면세사업자는 전년도)</li>
                          <li>대표자 개인신용평점 745점 미만 기업(NICE사 기준)</li>
                          <li>신용보증기금 및 기술보증기금 동시 이용중인 기업</li>
                          <li>중앙회 개인보증 이용기업</li>
                          <li>신용관리대상정보 등재 중인 기업</li>
                          <li>보증기관의 보증사고 관련자(사고 및 대위변제)</li>
                          <li>대표자 자가소유 부동산이 권리침해 (가압류 및 가처분 등) 등재</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>

                <div className ="box-cont">
                  <div className ="b-title">유의사항</div>
                  <div className ="b-txt pad-b0">
                    <ul className ="list-type01">
                      <li>신보 비대면 보증은 주민등록번호당 최대 1억원이내 지원이 가능합니다.</li>
                      <li>고객님의 신용도와 당행 및 신용보증재단의 심사 기준에 따라 대출 여부 및 한도가 결정됩니다.</li>
                      <li>금융지관 신용 정보관리 대상 고객 및 당행 대출 부적격자는 대출이 제한될 수 있습니다.</li>
                      <li>자세한 내용은 IBK고객센터 (1588-2588) 또는 기업은행 가까운 영업점으로 문의하여 주시기 바랍니다.</li>
                      <li>상품금액 및 종류에 따라 부대비용이 발생할 수 있습니다.</li>
                    </ul>
                    <div className ="txt-greyBox mar-t30">
                      <p>준법감시인 심의필 : 제2021-3154호(2021.08.26) 유효기간(2022.08.26)</p>
                      <ul className ="list-type02 pad-t10">
                        <li>상환능력에 비해 대출금이 과도할 경우, 귀하의 개인신용평점이 하락할 수 있습니다.</li>
                        <li>개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.</li>
                        <li>일정기간 대출 원리금을 연체할 경우, 모든 원리금을 변제할 의무가 발생할 수 있습니다.</li>
                        <li>대출취급이 부적정한 경우(연체금 보유, 신용 점수 등 낮음) 대출이 제한될 수 있습니다.</li>
                        <li>담보 물건, 담보종류 등에 따라 대출조건이 차등 적용되며, 담보물이 부적합할 경우 대출이 제한될 수 있습니다.</li>
                      </ul>
                      <ul className ="list-type03 pad-t10">
                        <li>계약을 체결하기 전에 상품(서비스)설명서 및 약관을 반드시 확인하시기 바랍니다.</li>
                        <li>일반금융소비자는 ⎡금융소비자 보호에 관한 법률⎦ 제19조 제1항에 따라 IBK기업은행으로부터 충분히 설명을 받을 권리가 있으며, 그 설명을 이해한 후 거래하시기 바랍니다.</li>
                        <li>자세한 문의는 거래 영업점 또는 고객센터(1566-2566)로 문의주시기 바랍니다.</li>
                        <li>IBK기업은행은 금품,향응을 받지 않습니다. 윤리경영 위반 사실이나 개선이 필요한 경우 신고해주시기 바랍니다.<br />(☎︎ 02-729-7490, e-mail: ibkethics@ibk.co.kr)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OslBtn
              obj={{
                type: "button",
                disabled: false,
                text: ["진행"],
                link: "",
                callbackId: cbOslBtn
              }} />
          </div>
        </div>

    </>
  )
}

export default Detail;