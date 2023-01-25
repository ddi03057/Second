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
import OslHeader from "../../../modules/components/OslHeader";
import OslBtn from "../../../modules/components/OslBtn";
import PathConstants from "../../../modules/constants/PathConstants";
import collectData from "../../../modules/constants/collectData";

/**
 * 화면명 : 보증 승인 내역
 * 설명 : 대출 실행 보증 승인 내역
 * @param {*} props
 * props항목별 설명
 */
function ApprInfo(props) {

  let navigate = useNavigate();

  function cbOslBtn() {
    // navigate(
    //   PathConstants.LONEXECUTE_UNTACTAGRM
    //   );
  }

  // const { state } = useLocation();

  // const userResult = state.result;

  // if (userResult === true) {

  return (
    <><div className="wrapper">
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top line-be4">
              <p className="top-tit"><strong>보증 승인 정보 확인 후 대출을 <br /> 실행해 주세요.</strong></p>
            </div>

            <section className="section line-tf4">
              <div className="info-wrap">
                <div className="info-box">
                  <span className="tit fc-gray">기업명</span>
                  <span className="txt fc-dark ta-r">기은상사</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">대표자명</span>
                  <span className="txt fc-dark ta-r">홍길동</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증기</span>
                  <span className="txt fc-dark ta-r">서울신용보증재</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 발급금액</span>
                  <span className="txt fc-dark ta-r">30,000,000원</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 발급</span>
                  <span className="txt fc-dark ta-r">2022. 06. 23</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 만기일</span>
                  <span className="txt fc-dark ta-r">2021. 07. 01</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">담당 영업점</span>
                  <span className="txt fc-dark ta-r">을지로지점</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">예상보증료</span>
                  <span className="txt fc-dark ta-r">0.0%</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">대출실행기</span>
                  <span className="txt fc-dark ta-r">9999.01.01</span>
                </div>
              </div>
            </section>

            <section className="section list-wrap line-tf4">
              <ul className="bullet-type02 mar-l10">
                <li className="item fc-gray">
                  <span>대출 실행 기한 이내에 대출 실행을 완료해 주시기 바랍니다. 경과 시 보증 인은 자동 취소됩니다.</span>
                </li>
                <li className="item fc-gray">
                  <span>보증 승인 후 신용관리대상정보 등재, 휴폐업, 연체, 보증사고 등 불량사유 발생 시 대출 실행이 불가할 수 있습니다.</span>
                </li>
                <li className="item fc-gray">
                  <span>보증료는 대출 실행 시점에 따라 변경될 수 있습니다.</span>
                </li>
              </ul>
              <p className="txt fw-b fc-dark ta-c">이 보증서로 대출을 실행하시겠습니까?</p>
            </section>
          </div>
          <OslBtn
            obj={{
              type: "button",
              disabled: false,
              text: ["대출 실행"],
              link: "",
              callbackId: cbOslBtn
            }} />
        </div>
      </div>
    </div>
      {/* 대출 실패
     } else  {  
         return (
             <>
           <div class="container">
                <div class="content">
            <div class="content-body approval-empty">
                <div class="content-top">
                    <p class="top-tit">대출 실행 <b>가능한 보증서</b><br /><b>내역이 없습니다.</b></p>
                </div>
                <div class="section line-tf4">
                    <p class="fs18 lh30">* 보증승인 관련한 자세한 사항은 IBK 고객센터 또는 가까운 영업점으로 문의해 주시기 바랍니다.</p>
                </div>
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
     } */}
    </>
  )
}

export default ApprInfo;