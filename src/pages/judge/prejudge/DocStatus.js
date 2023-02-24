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
import callOpenApi, { callLocalApi } from "../../../modules/common/tokenBase";
import API from "../../../modules/constants/API";
import { useInterval } from "../../../modules/common/hook/useInterval";
import { useRef } from "react";

/**
 * 화면명 : 서류제출
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function DocStatus(props) {

  //모두 완료 여부 N: 모두완료 Y: 하나이상 미완료
  const [flrYn, setFlrYn] = useState("");
  //스크래핑 항목별 수집상태
  const [docStatus, setDocStatus] = useState([false,false,false,false,false,false,false,false,false,false,false]);
  //다음버튼 활성여부
  const [disabledYn, setDisabledYn] = useState(true);
  //서류 상태 
  const [scpgList, setScpgList] = useState([]);

  
  const delay = useRef(1000);
  //10초마다 모두완료가 아닐시 수집상태 여부API 호출
  useInterval(()=> {
    console.log("interval>>", flrYn);
    if(flrYn !== "Y") {
      //서류수집 상태 조회
      callLocalApi(
        API.PREJUDGE.DOCSTATUS_SCPGPGRSHSTINQ,
        {},
        (res)=> {
          console.log(res.data.RSLT_DATA.scpgFnsgYn);
          let arrScpg = res.data.RSLT_DATA.scpgList;
          setFlrYn(res.data.RSLT_DATA.scpgFnsgYn);
          //if(arrScpg.findIndex((data, idx)=> data.scpgScsYn === "N") === -1) setFlrYn("Y");
          setScpgList(arrScpg);
          delay.current = 10000;
        }
      )
    }
  }, delay.current);

  useEffect(()=> {
    console.log("flrYn useEffect", flrYn);
    if(flrYn === "N") {
      setDisabledYn(true);
      //완료여부 초기화
      return ()=> setFlrYn("");
    }else if(flrYn === "Y") {
      //모두 완료, 버튼 활성화
      setDisabledYn(false);
    }

  }, [flrYn]);

  useEffect(()=> {
    
      console.log(scpgList);
    
  }, [scpgList]);


  let navigate = useNavigate();

  function cbOslBtn() {
    navigate(PathConstants.PREJUDGE_CUSTINFOINPUT);
  }

  useEffect(() => {
    
  }, []);

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      {scpgList.length === 12?
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
                    <p className="box-right">{scpgList[1].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">
                      부가가치세 과세표준증명
                      <span className="sm-txt">(면세사업자 수입금액증명)</span>
                    </p>
                    <p className="box-right">{(scpgList[2].scpgScsYn === "N" &&  scpgList[3].scpgScsYn === "N") ?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  {/*
                    <p className="box-right"><span className="resend sm-txt">재전송 요청</span></p>*/}
                  </div>
                  {/*
                  <div className="error-box mar-t15">
                    <p className="error-box-txt">오류메시지 노출 다시 한번 더 확인해 주세요. 다시 시도해주세요.</p>
                  </div>*/}
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">부가세신고서</p>
                    <p className="box-right">{scpgList[4].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">매입매출처별세금계산서 합계표</p>
                    <p className="box-right">{scpgList[5].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">표준재무제표증명</p>
                    <p className="box-right">{scpgList[6].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">납세증명서(국세)</p>
                    <p className="box-right">{scpgList[7].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">납세증명서(지방세)</p>
                    <p className="box-right">{scpgList[8].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">4대사회보험료완납증명서</p>
                    <p className="box-right">{scpgList[9].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">주민등록등본</p>
                    <p className="box-right">{scpgList[10].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                  {/*
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
                </div>*/}
                </li>
                <li>
                  <div className="box-chk flex">
                    <p className="box-left">주민등록초본</p>
                    <p className="box-right">{scpgList[11].scpgScsYn === "N"?<span className="sending sm-txt">전송중</span>:<span className="sm-txt">전송완료</span>}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <OslBtn
            obj={{
              type: "button",
              disabled: disabledYn,
              text: ["다음"],
              link: "",
              callbackId: cbOslBtn
            }} />
        </div>
      </div>
      :<div className="loading"></div>
      }
    </>
  )
}

export default DocStatus;