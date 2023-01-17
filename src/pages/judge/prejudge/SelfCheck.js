/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { element } from "prop-types";
import OslHeader from "../../../modules/components/OslHeader";
import OslBtn from "../../../modules/components/OslBtn";
import collectData from "../../../modules/constants/collectData.js";
import RadioInlineComponent from "../../common/RadioInlineComponent";
import TitleComponent from "../../common/TitleComponent";
/**
 * 화면명 : 자가진단 체크리스트
 * 설명
 * @param {*} props
 * props항목별 설명
 */
const selfCheckData = collectData("SelfCheck");

function SelfCheck(props) {
  /**
    * 항목별 데이터 분리
    */
  let arrTitleData = [];
  selfCheckData.find((data) => {
    arrTitleData.push(data.title);
  });
  let arrRadioData = [];
  selfCheckData.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });


  let navigate = useNavigate();

  // popup
  function openPop(e) {
    document.getElementById(e).style.display = "block";
    document.body.style.overflow = "hidden";
  }
  function closePop(e) {
    document.getElementById(e).style.display = "none";
    document.body.style.overflow = "";
  }

  let [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99]); //결과값 저장 state

 
  // Issue 컴포넌트

  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
  };

  function cbOslBtn() {
    const msg = validCheck(userResult);
    
    if (msg === false) {
      alert("123") // 선택값 검증에 오류가 있을때
    }
    else if (msg === "") {
      alert("ok") // 정상진행일때
    }
    if(bChecked === false){
      console.log("12312321") // 동의 체크박스 체크가 안되어있을때
    }

  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body certified">
            <div className="content-top pad-b30 line-be4">
              <div className="txt-wrap">
                <h2 className="txt b-txt">
                  자가진단 <b>체크리스트</b>
                </h2>
                <p className="txt s-txt">
                  보증심사 진행 가능 여부를 사전에 확인해 주시기 바랍니다.
                </p>
              </div>
            </div>


            <div className="section pad-t30 line-tf4">
              <ol className="sele-list type02">
                {selfCheckData.map((data, idx) => {
                  console.log(arrRadioData[data.radioId])
                  return (
                    <li key={`li_${idx}`} className="item">
                      <TitleComponent
                        showYn={true}
                        title={selfCheckData[idx].title}
                        styleTxt="txt"
                      />
                      {(data.id === 2) &&
                        <div className="link-btn-wrap">
                          <button type="button" className="link-btn type01">
                            <span className="ico-blue-arrow right">업종 펼쳐보기</span>
                          </button>
                        </div>
                      }
                      {(data.id === 3) &&
                        <ol className="order-list">
                          <li data-num="①" className="item">신청일 현재 금융기관 연체 중</li>
                          <li data-num="②" className="item">신청일 현재 국세,지방세, 4대보험 체납 중</li>
                          <li data-num="③" className="item">최근 3개월 이내 10일 이상 계속된 연체대출금 보유</li>
                          <li data-num="④" className="item">최근 1년 이내 당좌부도, 신용관리정보<br />(신용보증기금/기술보증기금/신용보증재단) 부실정보 보유</li>
                          <li data-num="⑤" className="item">최근 1년 이내 사업장 또는 거주주택에 대한 권리침해(경매,압류,가압류,가처분)</li>
                        </ol>
                      }
                      {
                        (data.type === "radio") &&
                        <RadioInlineComponent
                          showYn={true}
                          radioData={arrRadioData[data.radioId]}
                          styleSeleList={`sele-list type01 radius answer-wrap`}
                          onChangeFn={(radioIdx) => {
                            let copy = [...userResult]
                            copy[idx] = radioIdx;
                            setUserResult(copy);
                            console.log(userResult);
                          }}
                        />
                      }
                    </li>
                  )
                })}
              </ol>

              <div className="terms-wrap">
                <div className="txt-wrap bg-gray">
                  <p className="txt s-txt">
                    고객님께서 입력하신 내용은 심사 시 사실여부를 다시 한번 확인하게 됩니다.
                    신청대상이 아님에도 불구하고 실제와 다르게 입력하였을 경우 보증서 발급이 거절될 수 있습니다.
                  </p>
                </div>

                <div className="ui-cont-wrap">
                  <div className="ui-decide">
                    <input type="checkbox" id="checkbox01" checked={bChecked}
                      onChange={(e) => checkHandler(e)} />
                    <label htmlFor="checkbox01" className="input-label">위 내용에 동의하십니까?</label>
                  </div>
                </div>
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



function validCheck(userResult) {

  let msg = [];
  const diffUserResult = ["0", "1", "1", "0", "1", "1", "1", "0", "1"];
  for (let idx = 0; idx < userResult.length; idx++) {
    if (diffUserResult[idx] != userResult[idx]) {
      
      return false;
    } else if (!userResult.length === 8) {
      return (
        <>
          {/* 선택되지 않은 항목이 있는경우의 Alert */}
        </>
      )
    }
  }
  return "";
}

export default SelfCheck;