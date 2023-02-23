import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../modules/components/OslBtn";
import OslHeader from "../../modules/components/OslHeader";
import collectData from "../../modules/constants/collectData";
import RadioInlineComponent from "../common/RadioInlineComponent";
import SelectComponent from "../common/SelectComponent";
import TextComponent from "../common/TextComponent";
import TitleComponent from "../common/TitleComponent";
import API from "../../modules/constants/API.js";
import request from "../../modules/utils/Axios";
import callOpenApi, { callLocalApi } from "../../modules/common/tokenBase";
import { async } from "q";
import { getCommaAmt, getDotYmd } from "../../modules/utils/util";
import PathConstants from "../../modules/constants/PathConstants";


const applyInfoInput = collectData("ApplyInfoInput");
/**
 * 화면명 : 대출신청서작성 및 실행요청
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function ApplyInfoInput(props) {
  /**
   * 항목별 데이터 분리
   */
  let arrTitleData = [];
  applyInfoInput.find((data) => {
    arrTitleData.push(data.title);
  });
  let arrRadioData = [];
  applyInfoInput.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });
  let arrTextData = [];
  applyInfoInput.find((data) => {
    if (data.type === "text") {
      arrTextData.push(data);
    }
  });
  let arrSeleectData = [];
  applyInfoInput.find((data) => {
    if (data.type === "select") {
      arrSeleectData.push(data);
    }
  });
  let [applyInfoInputData, setApplyInfoInputData] = useState({});
  let [showTitleYn, setShowTitleYn] = useState(true);
  let [showDirInputYn, setShowDirInupYn] = useState(false);
  let [styleInput, setStyleInput] = useState("");
  //todo : 서버에서 가져온값으로 초기화
  const [userResult, setUserResult] = useState(["고객 적용 금리", { id: 0, value: "사업장운영자금" }, { id: 0, value: "1일" }, 99]);

  let navigate = useNavigate();

  //로딩 show/hide
  const [showLoading, setShowLoading] = useState(false);
  useLayoutEffect(()=> {
    setShowLoading(true);
    callLocalApi(
      API.LONEXECUTE.APPLYINFOINPUT_GRNYINFODTL,
      {},
      (res)=> {
        let resData = res.data.RSLT_DATA;
        if(JSON.stringify(resData) !== "{}") {
          setApplyInfoInputData(res.data.RSLT_DATA);
          let copy = [...userResult];
          copy[0] = resData.apinKcd;
          if(resData.cusDepAcntList.length ===1) copy[3] = resData.cusDepAcntList[0].account;
          setUserResult(copy);
          setShowLoading(false);
        }else {
          console.log("response no data");
        }
        
      }
    );
  }, []);

  
  useEffect(() => {
    //todo : 대출신청정보
    //todo : 금리종류 0122
    //todo : 기업은행 수신계좌리스트(마통 제외)
  
  }, [applyInfoInputData]);


  useEffect(() => {
    console.log(userResult);
    // callLocalApi(
    //   "",
    //   {},
    //   (res) => {
    //     applyInfoInputData = res.data;
    //     // 대출신청일
    //     // 대출만기일
    //     // 대출신청금액
    //     // 보증승인금액
    //     // 적용보증요율
    //     // 납부보증율
    //     // 상환방법(?)
    //     // 기업명
    //     // 특약사항(?)
    //     // 인지세
    //     // 만기일
    //     // 고객적용금리
    //     // 계좌번호목록
    //   },
    //   () => {
    //   }
    // );
  }, [userResult]);
  function cbOslBtn() {
    let param = {
      apinKcd: userResult[0],
      fnusCd: userResult[1].value,
      itpmScdlDd: userResult[2].value,
      attrIcntEnn: userResult[3]
    }
    callLocalApi(
      API.LONEXECUTE.APPLYINFOINPUT_LOAPIPIF,
      param,
      (res)=> {
        let resData = res.data.RSLT_DATA.resultYn;
        if(resData === "Y") navigate(PathConstants.LONEXECUTE_STAMPTAX);
      }
    )
    //APPLYINFOINPUT_LOAPIPIF

    //todo : 다음페이지
    // navigate(
    //   PathConstants.GUIDE_READY
    //   );
    //ApplyInfoInput();
    // 대출신청일
    // 대출만기일
    // 대출신청금액
    // 보증승인금액
    // 적용보증요율
    // 납부보증율
    // 상환방법(?)
    // 기업명
    // 특약사항(?)
    // 인지세
    // 만기일
    // 고객적용금리
    // 자금용도
    // 이자납입일코드
    // 대출계좌번호

  }
/*
account: "1234-45678-234"
antcGrfrRt: "3.1"
argrExpiYmd: "20260223"
argrGrfrAmt: "100000"
baseYmd: "20230223"
cusDepAcntList: null
entpNm: "디씨온"
gnapAmt: "100000000"
grnyExpiYmd: "20260223"
guasAthzAmt: "90000000"
inJi: "대상"
sangHwan: "만기일시상환"
*/        
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
                  <span className="check-label ta-r fc-6">온라인 플랫폼 입점<br />
                    소상공인 보증부대출</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">대출 신청일</span>
                  <span className="check-label ta-r fc-6">{getDotYmd(applyInfoInputData.baseYmd)}</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">대출 만기일</span>
                  <span className="check-label ta-r fc-default">{getDotYmd(applyInfoInputData.argrExpiYmd)}</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">대출 신청금액</span>
                  <span className="check-label ta-r fc-6">{getCommaAmt(applyInfoInputData.gnapAmt)}원</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">보증 승인금액</span>
                  <span className="check-label ta-r fc-6">{getCommaAmt(applyInfoInputData.argrGrfrAmt)}원</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">적용 보증료율</span>
                  <span className="check-label ta-r fc-6">{applyInfoInputData.antcGrfrRt}%</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">납부 보증료</span>
                  <span className="check-label ta-r fc-6">{getCommaAmt(applyInfoInputData.argrGrfrAmt)}원</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">상환방법</span>
                  <span className="check-label ta-r fc-6">{applyInfoInputData.sangHwan}</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">기업명</span>
                  <span className="check-label ta-r fc-6">{applyInfoInputData.entpNm}</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">특약 사항</span>
                  <span className="check-label ta-r fc-6">특약</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">인지세</span>
                  <span className="check-label ta-r fc-6">{applyInfoInputData.inJi}</span>
                </p>
                <p className="box-chk flex">
                  <span className="check-label fc-3">만기일</span>
                  <span className="check-label ta-r fc-6">{getDotYmd(applyInfoInputData.grnyExpiYmd)}</span>
                </p>
              </div>
            </div>
            <div className="section line-tf4">
              <ol className="sele-list type02 pad-b10">
                {
                  applyInfoInput.map((data, idx) => {
                    return (
                      <li key={`li_${idx}`} className="item">
                        <TitleComponent
                          showYn={(data.textId === 1) ? false : showTitleYn}
                          title={applyInfoInput[idx].title}
                          styleTxt="txt"
                        />
                        {
                          (data.type === "radio") &&
                          <RadioInlineComponent
                            showYn={true}
                            radioData={arrRadioData[data.radioId]}
                            styleSeleList={`sele-list type01 radius answer-wrap mar-t10 row${data.radioList.length} noflex1`}
                            checked={(userResult[idx] != 99) && userResult[idx].id}
                            onChangeFn={(radioIdx) => {
                              console.log(radioIdx);
                              console.log(data.radioList[radioIdx].value);
                              let copy = [...userResult];
                              copy[idx] = { id: radioIdx, value: data.radioList[radioIdx].value }
                              setUserResult(copy);
                              if (radioIdx === 3) {
                                setShowDirInupYn(true);
                              } else {
                                setShowDirInupYn(false);
                              }
                            }}
                          />
                        }
                        {
                          (data.type === "text") &&
                          <TextComponent
                            showYn={(data.textId === 0) ? true : showDirInputYn}
                            styleSeleList="sele-list type01 radius answer-wrap mar-t10"
                            styleInput={(data.textId === 0) ? "ta-c" : ""}
                            textData={{value :applyInfoInputData.apinKcd}}
                            inputType={data.placeholder.indexOf("숫자") > -1 ? "number" : "text"}
                            onChangeFn={(value) => {
                              // let copy = [...userResult];
                              // let copy2 = { ...userResult[2] }
                              // copy2.value = value;
                              // copy[data.id] = (idx != 3) ? value : copy2;
                              // setUserResult(copy);
                            }}
                          />
                        }
                        {
                          (data.type === "select") &&
                          <div className="sele-list type01 radius answer-wrap mar-t10">
                            <div className="item">
                              <label className="ui-select">
                                <select 
                                  name="sSel" 
                                  id="sSel1" 
                                  defaultValue={"선택하세요"}
                                  onChange={(e) => {
                                    let copy = [...userResult];
                                    copy[data.id] = e.target.value;
                                    setUserResult(copy);
                                    //e.target.value;
                                  }}>
                                {
                                  !!applyInfoInputData.cusDepAcntList&&
                                  applyInfoInputData.cusDepAcntList.map((data, idx)=>{
                                    return (
                                      <option key={idx} value={data.account}>{data.account}</option>
                                    )
                                  })
                                }    
                                </select>
                                <span></span>
                              </label>
                            </div>
                          </div>
                        }
                      </li>
                    )
                  })

                }
              </ol>
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
      {showLoading&&
        <div className="loading"></div>
      }
    </>
  );
}

export default ApplyInfoInput;