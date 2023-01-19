import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../modules/components/OslBtn";
import OslHeader from "../../modules/components/OslHeader";
import collectData from "../../modules/constants/collectData";
import RadioInlineComponent from "../common/RadioInlineComponent";
import SelectComponent from "../common/SelectComponent";
import TextComponent from "../common/TextComponent";
import TitleComponent from "../common/TitleComponent";
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


  let [showTitleYn, setShowTitleYn] = useState(true);
  let [showDirInputYn, setShowDirInupYn] = useState(false);
  let [styleInput, setStyleInput] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    //todo : 대출신청정보
    //todo : 금리종류
    //todo : 기업은행 수신계좌리스트(마통 제외)

  }, []);
  //todo : 서버에서 가져온값으로 초기화
  let [userResult, setUserResult] = useState(["고객 적용 금리", { id: 0, value: "사업장운영자금" }, { id: 0, value: "1일" }, 99]);

  useEffect(() => {
    console.log(userResult);
  }, [userResult]);
  function cbOslBtn() {
    //todo : 다음페이지
    // navigate(
    //   PathConstants.GUIDE_READY
    //   );
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
                  <span className="check-label ta-r fc-6">온라인 플랫폼 입점<br />
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
              <ol className="sele-list type02 pad-b10">
                {
                  applyInfoInput.map((data, idx) => {
                    if (idx === 1) console.log(userResult[idx]);
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
                            textData={arrTextData[data.textId]}
                            inputType={data.placeholder.indexOf("숫자")>-1?"number":"text"}
                            min={1}
                            max={31}
                            onChangeFn={(value) => {
                              let copy = [...userResult];
                              let copy2 = { ...userResult[2] }
                              copy2.value = value;
                              copy[data.id] = (idx != 3) ? value : copy2;
                              setUserResult(copy);
                            }}
                          />
                        }
                        {
                          (data.type === "select") &&
                          <SelectComponent
                            showYn={true}
                            selectData={arrSeleectData[data.selectId]}
                            styleSeleList="sele-list type01 radius answer-wrap mar-t10"
                            onChangeFn={(value) => {
                              let copy = [...userResult];
                              copy[data.id] = value;
                              setUserResult(copy);
                            }}
                          />
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
    </>
  );
}

export default ApplyInfoInput;