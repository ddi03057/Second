/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslHeader from "../../../modules/components/OslHeader";
import OslBtn from "../../../modules/components/OslBtn";
import PathConstants from "../../../modules/constants/PathConstants";
import callOpenApi from "../../../modules/common/tokenBase";
import API from "../../../modules/constants/API";

/**
 * 화면명 : 서류제출
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function DocStatus(props) {

  const [flrYn, setFlrYn] = useState("Y");
  const [docStatus, setDocStatus] = useState([]);

  useEffect(() => {
    setTimeout(()=> {
      // callOpenApi(
      //   API.PREJUDGE.DOCSTATUS_NOFCGTLNDOCSMYNINQ,
      //   {},
      //   (res)=> {
      //     if(flrYn === "Y") {
      //       setFlrYn(res.data.RSLT_DATA.flrYn);
      //       setDocStatus([]);
      //     }
      //   }
      // )
    }, 10000);
  }, [flrYn]);


  let navigate = useNavigate();

  function cbOslBtn() {
    navigate(/*새로운화면 */);
  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body diagnosis">
            <div className="content-top pad-b30">
              <p className="top-tit"><strong>아직 전송되지 않은 서류</strong>가 있습니다.
                서류 수집 내역을 확인해주세요.</p>
              <p className="top-txt fc-6">
                전체 서류가 전송완료인 경우에만 다음화면 진행이 가능합니다.
              </p>
              <div className="mar-t40">
                <button type="button" className="btn btn-sm btn-default">
                  <span className="txt">모두 재전송</span>
                </button>
              </div>
            </div>
            <div className="scrap-wrap">
              <ul className="scrapping">
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">사업자등록증명</p>
                    {/* <p className="box-right"><span className="sm-txt">전송완료</span></p> */}
                    <p className="box-right"><span className="sm-txt">{docStatus===0?<img src="/assets/img/ico/loading.jpg" style={{width: "100px", height: "100px"}} />:`${docStatus}`}</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">소득금액증명</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">
                      부가가치세 과세표준증명
                      <span className="sm-txt">(면세사업자 수입금액증명)</span>
                    </p>
                    <p className="box-right"><span className="resend sm-txt">재전송 요청</span></p>
                  </div>
                  <div className="error-box mar-t15">
                    <p className="error-box-txt">오류메시지 노출 다시 한번 더 확인해 주세요. 다시 시도해주세요.</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">표준재무제표증명</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">납세증명서(국세)</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">납세증명서(지방세)</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">4대사회보험료완납증명서</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">부가세신고서</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">매입매출처별세금계산서 합계표</p>
                    <p className="box-right"><span className="sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">매출정보</p>
                    <p className="box-right"><span className="nosend sm-txt">미전송</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">주민등록초본</p>
                    <p className="box-right"><span className="resend sm-txt">전송완료</span></p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">주민등록등본</p>
                    <p className="box-right"><span className="resend sm-txt">전송완료</span></p>
                  </div>
                  <div className="error-box mar-t15">
                    <p className="error-box-txt">주소지 선택이 잘못되었습니다.</p>
                  </div>
                  <span className="sm-txt info">주민등록상 행정구역을 선택해주세요.</span>

                  <div className="txt-wrap">
                    <p className="txt fc-6">
                      시, 도
                    </p>
                  </div>
                  <div className="sele-list type01 radius mar-t10">
                    <div className="item">
                      <label className="ui-select">
                        <select name="sSel" id="sSel1" disabled="">
                          <option value="">선택불가</option>
                          <option value="">경기도</option>
                          <option value="">서울특별시</option>
                          <option value="">강원도</option>
                        </select>
                        <span></span>
                      </label>
                    </div>
                  </div>

                  <div className="txt-wrap mar-t20">
                    <p className="txt fc-6">
                      시,군,구
                    </p>
                  </div>
                  <div className="sele-list type01 radius mar-t10">
                    <div className="item">
                      <label className="ui-select">
                        <select name="sSel" id="sSel1" disabled="">
                          <option value="">선택불가</option>
                          <option value="">광명시</option>
                          <option value="">구로구</option>
                          <option value="">동작구</option>
                        </select>
                        <span></span>
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
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

export default DocStatus;