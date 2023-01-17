/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */

import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../../modules/components/OslBtn.js";
import OslHeader from "../../../modules/components/OslHeader.js";
import PathConstants from "../../../modules/constants/PathConstants.js";
import collectData from "../../../modules/constants/collectData.js";
import FullModal from "../../../modules/components/FullModal.js";
import RadioInlineComponent from "../../common/RadioInlineComponent";
import TitleComponent from "../../common/TitleComponent";
import SelectComponent from "../../common/SelectComponent";
import TextComponent from "../../common/TextComponent";


const grtInfoData = collectData("GrtInfoInput");

function GrtInfoInput(props) {
  //**항목별 데이터 분리 */
  let arrTitleData = [];
  grtInfoData.find((data) => {
    arrTitleData.push(data.title);
  });
  let arrRadioData = [];
  grtInfoData.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });
  let arrTextData = [];
  grtInfoData.find((data) => {
    if (data.type === "text") {
      arrTextData.push(data);
    }
  });
  let arrSeleectData = [];
  grtInfoData.find((data) => {
    if (data.type === "select") {
      arrSeleectData.push(data);
    }
  });
  let arrSearchData = [];
  grtInfoData.find((data) => {
    if (data.type === "search") {
      arrSearchData.push(data);
    }
  });


  let [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99,99]); //결과값 저장 state
  let navigate = useNavigate(); //다음화면을 위한 navigate
  useEffect(() => {
    console.log(userResult);
  }, [userResult])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function cbOslBtn() {

    const msg = validCheckEmpty(userResult);
    if (!!msg) {
      alert(msg);
      //스크롤이동
    } else {

      //데이터 전송
      alert("고객님의 소중한 응답에 감사합니다.");
      //다음페이지 이동
      navigate(
        PathConstants.PREJUDGE_SUITRESULT,
        {
          state: {
            result: true,
            value: userResult
          }
        });
    }
  }
  const [visible, setVisible] = useState(false);
  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top pad-b30">
              <p className="top-tit"><strong>조사 자료 자가체크를</strong> 위해<br />
                <strong>확인해야할 내용</strong>이 있습니다.</p>
            </div>

            <div className="section line-tf4">
              <ol className="sele-list type02 pad-b10">
                {grtInfoData.map((data, idx) => {
                  return (
                    <li key={`li_${idx}`} className="item">
                      <TitleComponent
                        showYn={true}
                        title={grtInfoData[idx].title}
                        styleTxt="txt"
                      />
                      {(data.type === "radio" &&
                        <>
                          <RadioInlineComponent
                            showYn={true}
                            radioData={arrRadioData[data.radioId]}
                            styleSeleList={`sele-list type01 radius answer-wrap`}
                            checked={userResult[idx]}
                            onChangeFn={(radioIdx) => {
                              let copy = [...userResult]
                              copy[idx] = radioIdx;
                              setUserResult(copy);
                            }}
                          />

                        </>
                      )}
                      {(data.type === "search" &&
                        <Search arrSearchData={arrSearchData} userResult={userResult} setVisible={setVisible}
                        />
                      )}
                      {
                          (data.type === "text")  && 
                            <TextComponent
                              showYn={true}
                              styleSeleList="sele-list type01 radius answer-wrap"
                              styleInput="w100p ta-r"
                              textData={arrTextData[data.textId]}
                              onChangeFn={(value)=>{
                                if(value > 100000000){
                                  alert("대출 희망금액은 최대 1억원까지 입력가능합니다.")
                                }
                                let copy = [...userResult];
                                copy[data.id] = value;
                                setUserResult(copy)
                                
                              }}
                            />
                        }
                      {
                          (data.type === "select") &&
                            <SelectComponent
                              showYn={true}
                              selectData={arrSeleectData[data.selectId]}
                              styleSeleList="sele-list type01 radius answer-wrap"
                              onChangeFn={(value)=> {
                                let copy = [...userResult];
                                copy[data.id] = value;
                                setUserResult(copy);
                              }}
                            />
                        }
                    </li>
                  )
                })}



              </ol>
              <div className="terms-wrap mar-t30">
                <div className="txt-wrap bg-gray">
                  <p className="info-con-txt mar-t0">* 대출 희망금액은 최대 1억원까지 입력 가능하며, 보증기관 심사과정에서 금액이 변동 될 수 있습니다.</p>
                  <p className="info-con-txt mar-t0">* 최소 신청 희망금액은 1천만원이며, 1백만원 단위로 입력 가능합니다.</p>
                  <p className="info-con-txt mar-t0">* 한도조회 이후 보증 신청 시 사업자등록증 상 주소로 사업장 현장실사 예정입니다.</p>
                </div>

                <div className="ui-cont-wrap flex">
                  <div className="ui-decide">
                    <input type="checkbox" id="checkbox01"
                    />
                    <label htmlFor="checkbox01" className="input-label">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</label>
                  </div>
                  <div className="ui-pop">
                    <a data-id="" className="btn-pop-arrow" title="윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등" onClick={() => handleShow()}><span className="blind">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OslBtn obj={{
            type: "button",
            disabled: false,
            text: ["확인"],
            link: "",
            callbackId: cbOslBtn
          }} />


        </div>
        <FullModal
          showYn={show}
          handleClose={handleClose}
          headerNm=""
          content="GrtInfoInputModal"
          type="component"
        />
      </div>
    </>
  )

}

function Search(props) {
  const data = props.arrSearchData;

  if (props.userResult[2] === 1) {
    return (
      <div className="sele-list answer-wrap">
        <div className="item">
          <div className="inp-block">
            <input type="text" className="inp type01 disabled w175 address"
              name="text01"
              id="text01_01"
              placeholder=""
              value=""
            />
            <button type="button" className="btn btn-md address-btn bg-skyblue"
            >
              <span className="fc-white fs-18">
                {data[0].title}
              </span>
            </button>
          </div>
          <input type="text" className="inp type01" name="text01" id="text01_02" placeholder="" />
          <input type="text" className="inp type01" name="text01" id="text01_03" placeholder="" />
        </div>
      </div>
    )
  }
}


/**
* 빈값 밸리데이션 체크
* 빈값일시 항목별 title, 조사, 동사로 메세지값 완성
* @param {사용자 체크값} userResult 
* @param {선택한 신용기관} userCrdBru 
* @param {입력한 신용점수} userCrdScr 
* @returns 
*/
function validCheckEmpty(userResult) {

  let msg = "";
  let verb = "하시기 바랍니다.";
  for (let i = 0; i < userResult.length; i++) {
    if (!userResult[i] || userResult[i] === 99) {
      let josa = "";
      if (checkBatchimEnding(grtInfoData[grtInfoData.findIndex((data) => data.id === i)].title)) {
        josa = "을 ";
      } else {
        josa = "를 ";
      }
      if (i == 1 || i == 11) {
        verb = "입력" + verb;
      } else {
        verb = "선택" + verb;
      }
      if (userResult[9] < 10000000) {
        return msg = ("대출 희망금액은 최소 1천만부터 입력 가능합니다.")
      } else if (userResult[9] < 1000000) {
        return msg = ("1백만원 단위로 입력 가능합니다.")
      }
      msg = grtInfoData[grtInfoData.findIndex((data) => data.id === i)].title + josa + verb;

      return msg;
    }
  }
  return null;
}

/**
 * 단어별 맞춤 조사 선택을 위한 함수
 * @param {*} word 
 * @returns 
 */
function checkBatchimEnding(word) {
  if (typeof word !== 'string') return null;

  var lastLetter = word[word.length - 1];
  var uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
}


export default GrtInfoInput;