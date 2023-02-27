/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import { useEffect, useState, } from "react";
import { useNavigate } from "react-router";
import OslHeader from "../../modules/components/OslHeader";
import OslBtn from "../../modules/components/OslBtn";
import Loading from "../../modules/components/Loading";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
import callOpenApi, { callLocalApi } from "../../modules/common/tokenBase";
import { useLayoutEffect } from "react";
import API from "../../modules/constants/API";

/**
 * 화면명 : 보증 승인 내역
 * 설명 : 대출 실행 보증 승인 내역
 * @param {*} props
 * props항목별 설명
 * process
 * 
 */
function ApprInfo(props) {

  const [resStatus, setResStatus] = useState("");
  const [apprInfoData, setApprInfoData] = useState({});
  
  useLayoutEffect(()=> {
    callLocalApi(
      API.LONEXECUTE.APPRINFO_GRATDTLIQ, 
      {}, 
      (res)=> {

        setResStatus(res.data.STATUS);
        setApprInfoData(res.data.RSLT_DATA);
      }
    );

  }, []);

  useEffect(()=> {
    console.log("resStatus", resStatus);
  }, [resStatus]);

  useEffect(()=> {
    console.log("apprInfoData>>", apprInfoData);
  }, [apprInfoData]);
  let navigate = useNavigate();

  function cbOslBtn() {
    navigate(
      PathConstants.LONEXECUTE_UNTACTAGRM
      );

  }

  if(resStatus === "0000") {
    return (
      <>
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
                  <span className="txt fc-dark ta-r">{apprInfoData.entpNm}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">대표자명</span>
                  <span className="txt fc-dark ta-r">{apprInfoData.rpprNm}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증기업</span>
                  <span className="txt fc-dark ta-r">{apprInfoData.mngmBrm}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 발급금액</span>
                  <span className="txt fc-dark ta-r">{comma(apprInfoData.loanScdlAmt)}원</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 발급일</span>
                  <span className="txt fc-dark ta-r">{getYmd(apprInfoData.grnyIssuYmd)}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보증서 만기일</span>
                  <span className="txt fc-dark ta-r">{getYmd(apprInfoData.grnyExpiYmd)}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">담당 영업점</span>
                  <span className="txt fc-dark ta-r">{apprInfoData.brcd}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">예상보증료</span>
                  <span className="txt fc-dark ta-r">{apprInfoData.antcGrfrRt}%</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">대출실행기한</span>
                  <span className="txt fc-dark ta-r">{getYmd(apprInfoData.lodlYmd)}</span>
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
      </>
    )
  }else if(resStatus.indexOf("99") > -1){
    return (
      <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body approval-empty">
            <div className="content-top">
              <p className="top-tit">대출 실행 <b>가능한 보증서</b><br /><b>내역이 없습니다.</b></p>
            </div>
            <div className="section line-tf4">
              <p className="fs18 lh30">* 보증승인 관련한 자세한 사항은 IBK 고객센터 또는 가까운 영업점으로 문의해 주시기 바랍니다.</p>
            </div>
          </div>
          <div className="content-footer">
            <button type="button" className="btn btn-lg default-bg">
              <span className="txt">확인</span>
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }else {
    return (
      <Loading />
    )
  }


}

function comma(x) {
	var resultVal = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return resultVal;
}
function getYmd(x) {
  if(x.length !== 8) return x;
  else return x.substring(0, 4) + "." + x.substring(4,6) + "." + x.substring(6,8)
}

export default ApprInfo;