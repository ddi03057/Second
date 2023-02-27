/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../modules/components/OslBtn.js";
import OslHeader from "../../modules/components/OslHeader.js";
import callOpenApi, { callLocalApi } from "../../modules/common/tokenBase";
import API from "../../modules/constants/API.js";
import PathConstants from "../../modules/constants/PathConstants.js";
import { useLayoutEffect } from "react";
import { getCommaAmt, getDotYmd } from "../../modules/utils/util.js";
import AlertModal from "../../modules/components/AlertModal.js";

/**
 * 화면명 : 대출 내용 최종 확인
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function LonContentCheck(props) {

  const [lonContentCheckData, setLonContentCheckData] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [checkedYn, setCheckYn] = useState(false);

  function openPop() {
    setAlertShow(true);
    document.body.style.overflow = "hidden";
  }
  function closePop() {
    setAlertShow(false);
    document.body.style.overflow = "";
  }
  const handleShow = ()=> openPop();
  const handleClose = ()=> closePop();
  const [alertShow, setAlertShow] = useState(false);
  const ALERT_MSG = "해당항목을 선택 및 체크하시기 바랍니다.";
  useLayoutEffect(() => {
    setShowLoading(true);
    callLocalApi(
      API.LONEXECUTE.LONCONTENTCHECK_LONCONCNFA, 
      {},
      (res)=> {
        setLonContentCheckData(res.data.RSLT_DATA);
        setShowLoading(false);
      },
      
    )
    // 대출금액
    // 변동금리
    // 기준금리
    // 가산금리
    // 대출실행년월일
    // 최초이자납부금액
    // 거치기간만료년월일
    // 대출만기년월일
    // 최종이자납부금액
    // 계좌번호
    // 대출신청일자
    // 자금용도
    // 상환방법
    // 총원리금및수수료부담예상액

  }, []);
  useEffect(()=> {
    
  }, [lonContentCheckData]);
  let navigate = useNavigate();
  function cbOslBtn() {
    if(checkedYn){
      navigate(PathConstants.LONEXECUTE_FINANCECUSLAW);
    }else {
      handleShow();
    }
    
  }
  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top pad-b30 line-be4">
              <p className="top-tit">
                기은상사 홈길동님<br />
                <b>대출 실행 전 최종확인</b>입니다.
              </p>
              <p className="top-desc fs18">꼼꼼히 확인해주세요.</p>
            </div>
            <div className="section line-tf4">
              <div className="loan-amount">
                <div className="txt-won">
                  <i className="ico-won"></i> 대출금액
                  <p className="num"><strong>{getCommaAmt(lonContentCheckData.gnapAmt/10000)}</strong> 만원</p>
                </div>
                <div className="txt-rate">
                  <i className="ico-rate"></i>변동금리 : {lonContentCheckData.baseInr}%
                </div>
                <div className="pad-t10 fs14 ta-r fc-lightGray">(기준금리 {lonContentCheckData.aplyInr}% + {lonContentCheckData.rdexInr}%)</div>
              </div>
            </div>
            <div className="section line-tf4 pad-t30 pad-b30">
              <h4 className="pad-b20 fc-default">신청일자</h4>
              <div className="process-v">
                <ol>
                  <li>
                    <strong className="date">{getDotYmd(lonContentCheckData.baseYmd)} 대출 실행</strong>
                    <p className="pay">
                      매월 {lonContentCheckData.itpmScdlDd}일 <em className="red-16c">23,256</em>원 납부<br />
                      <span>(이자, 금리에 따라 금액 변동 가능)</span>
                    </p>
                  </li>
                  <li>
                    <strong className="date">{getDotYmd(lonContentCheckData.guchi)} 거치기간 만료</strong>
                    <p className="pay">
                      매월 {lonContentCheckData.itpmScdlDd}일 <em className="red-16c">643,256</em>원 납부<br />
                      <span>(원금 + 이자, 금리에 따라 금액 변동 가능)</span>
                      <span>납부 계좌 : {lonContentCheckData.cusDepAcntList}</span>
                    </p>
                  </li>
                  <li>
                    <strong className="date">{getDotYmd(lonContentCheckData.argrExpiYmd)} 대출 만료</strong>
                  </li>
                </ol>
              </div>
            </div>
            <div className="section pad-t30 pad-b30 line-tf4">
              <ul className="list-type01">
                <li className="info-wrap pad-t0 pad-b0">
                  <div className="info-box">
                    <span className="info-label fc-6">신청 일자</span>
                    <span className="info-label fc-3 ta-r">{getDotYmd(lonContentCheckData.sinChung)}</span>
                  </div>
                </li>
                <li className="info-wrap pad-t0 pad-b0">
                  <div className="info-box">
                    <span className="info-label fc-6">자금용도</span>
                    <span className="info-label fc-3 ta-r">{lonContentCheckData.fnusCd}</span>
                  </div>
                </li>
                <li className="info-wrap pad-t0 pad-b0">
                  <div className="info-box">
                    <span className="info-label fc-6">상환방법</span>
                    <span className="info-label fc-3 ta-r">{lonContentCheckData.sangHwan}</span>
                  </div>
                </li>
                <li className="info-wrap pad-t0 pad-b0">
                  <div className="info-box">
                    <span className="info-label fc-6">총 원리금 및 수수료 부담 예상액</span>
                    <span className="info-label fc-3 ta-r"><strong>1,530,000원</strong></span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section line-tf4">
              <div className="descr-wrap">
                <div className="descr-cont">
                  <h4 className="descr-tit fc-default">지연배상금률</h4>
                  <p className="descr-txt">여신이자율에 연체가산금의 연3%를 더하여 적용합니다. 단 최고 지연배상금률을 연 11%로 합니다.</p>
                  <ul className="bullet-type01 descr-add">
                    <li className="item fc-lightGray">
                      <span>여신만료일 이내에 변동될 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
                <div className="descr-cont">
                  <h4 className="descr-tit fc-default">중도상환해약금</h4>
                  <p className="descr-txt">중도상환금액(분할상관금의 할부금 상환기일 전 상환 포함) x 요율(고정금리 <span className="fc-default">{lonContentCheckData.baseInr}%</span>/변동금리  <span className="fc-default">0.8%</span>) x (대출잔여일수÷대출기간)</p>
                  <ul className="bullet-type01 descr-add">
                    <li className="item fc-lightGray">
                      <span>대출기간 중 금리종류가 변경되더라도 당초 대출취급시점(기간 연장을 한 경우에는 직전 기간연장시점)의 요율을 적용하기로 합니다.</span>
                    </li>
                    <li className="item fc-lightGray">
                      <span>변동금리 대출로서 대출기간이 금리변동주기 이내인 경우에는 고정금리 대출 요율을 적용하기로 합니다.</span>
                    </li>
                    <li className="item fc-lightGray">
                      <span>중도상환해약금 요율<br />[부동산 담보]<br />- 고정금리 : 1.4%, 변동금리: 1.2%<br />[부동산 담보 외]<br />- 고정금리: 0.9%, 변동금리 : 0.8%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="section line-tf4 pad-b0">
              <div className="box-chk">
                <input type="checkbox" name="last-confirm" id="last-confirm" className="check-input02 blind" checked={checkedYn} onChange={()=> {setCheckYn(!checkedYn)}} />
                <label htmlFor="last-confirm" className="check-label fc-gray">본인은 해당 내용을 설명받고 이해하였습니다.</label>
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
          {alertShow&&
            <AlertModal
              show={alertShow}
              msg={ALERT_MSG}
              btnNm={["확인"]}
              onClickFn={()=> {
                handleClose();
              }}
            />
          }
        </div>
      </div>
      {showLoading&&
        <div className="loading"></div>
      }
    </>
  )
}

export default LonContentCheck;