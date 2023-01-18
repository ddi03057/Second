import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SelectComponent from "../../common/SelectComponent";
import TextComponent from "../../common/TextComponent";
import TitleComponent from "../../common/TitleComponent";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";
import PathConstants from "../../../modules/constants/PathConstants";
import collectData from "../../../modules/constants/collectData";
import AlertModal from "../../../modules/components/AlertModal";


const suitTestData = collectData("SuitTest");
/**
 * 화면명 : 적합성 적정성 검사
 * 설명   : 
 * @param {*} props
 * props항목별 설명
 */
function SuitTest(props) {
  // useEffect(()=> {
  //   suitTestData = data("SuitTest");
  // }, []);
  /**
   * 항목별 데이터 분리
   */
  let arrTitleData = [];
  suitTestData.find((data) => {
    arrTitleData.push(data.title);
  });
  let arrRadioData = [];
  suitTestData.find((data) => {
    if(data.type === "radio") {
      arrRadioData.push(data);
    }
  });
  let arrTextData = [];
  suitTestData.find((data) => {
    if(data.type === "text") {
      arrTextData.push(data);
    }
  });
  let arrSeleectData = [];
  suitTestData.find((data) => {
    if(data.type === "select") {
      arrSeleectData.push(data);
    }
  });

  let [showTitleYn, setShowTitleYn] = useState(true);
  const [showCrdElYn, setShowCrdElYn] = useState(true); //신용관련 element show/hide
  let [userResult, setUserResult] = useState(["01",99,"01",99,99,99,99,99,99,99,99,99]); //결과값 저장 state
  let [userCrdBru, setUserCrdBru] = useState("01"); //신용기관 선택값
  let [userCrdScr, setUserCrdScr] = useState(""); //신용점수 입력값
  let [agreeYn, setAgreeYn] = useState(false); //하단 동의 체크 여부
  let navigate = useNavigate(); //다음화면을 위한 navigate

   // popup
   function openPop() {
    setShow(true);
    document.body.style.overflow = "hidden";
  }
  function closePop() {
    setShow(false);
    document.body.style.overflow = "";
  }
  const [show, setShow] = useState(false);
  const handleShow = ()=> openPop();
  const handleClose = ()=> closePop();
  let [msgCont, setMsgCont] = useState("");
  const [successYn, setSuccessYn] = useState(false);

  useEffect(()=> {
    
    console.log(userResult);
    if(userResult[9] === "02") {
      setShowCrdElYn(false);
    }else {
      setShowCrdElYn(true);
    }
  }, [userResult]);

  useEffect(()=> {

    console.log(userCrdBru);
  }, [userCrdBru]);
  useEffect(()=> {

    console.log(userCrdScr);
  }, [userCrdScr]);

  function cbOslBtn() {
    
    const msg = validCheckEmpty(agreeYn, userResult, userCrdBru, userCrdScr);
    
    if(!!msg) {
      setMsgCont(msg);
      handleShow();
      //스크롤이동
    }else {
      
      //데이터 전송
      setSuccessYn(true);
      setMsgCont("신청대출 실행 후 관련 계약서류를 입력하신 고객님의 이메일주소(" + userResult[11] + ")로 제공합니다.\n이메일주소가 맞는지 한번 더 확인바랍니다.");
      handleShow();
      //alert("신청대출 실행 후 관련 계약서류를 입력하신 고객님의 이메일주소(" + userResult[11] + ")로 제공합니다.\n이메일주소가 맞는지 한번 더 확인바랍니다.");
      
    }
    
    
  }
  //console.log(showTitleYn, arrTitleData);
  return (
    <>
    
    <OslHeader headerNm={props.headerNm}/>
    <div className="container">
      <div className="content">
        <div className="content-body">
          <div className="content-top">
            <p className="top-tit"><strong>사업자 정보를 확인</strong>하는 중 입니다.
            </p>
            <p className="top-txt">
              기다리는 시간 동안 사장님께서 작성하셔야 하는 확인서가 있어요!
            </p>
          </div>
          <div className="section line-tf4 bg-greyf4">
            <div className="bg-white">
              <p className="info-tit">적합성ㆍ적정성고객정보 확인서</p>
              <p className="info-con-txt">
                본 확인서는 [금융소비자 보호에 관한 법률]에 의거하여 고객님의 연령, 대출목적(용도) 등을 파악하고, 고객님이 신청하신 상품이 고객님의 상황에 적합・적정한지 여부를 확인하기 위한 기초 자료로 활용됩니다.
              </p>
              <p className="info-con-txt">
                아래 체크리스트에 고객님의 상황에 부합하거나 가장 가까운 항목을 정확히 선택하여 주시기 바랍니다.
              </p>
              <p className="info-con-txt">
                - 보유자산, 부채 항목은 작성일 기준, 현재 소득은 최근 1년 기준으로 작성하세요.
              </p>
            </div>
          </div>
          <div className="section line-tf4">
            <ul className="sele-list type02">
              {
                suitTestData.map((data, idx)=> {
                  
                  return (
                    <li key={`li_${idx}`} className="item">
                      <TitleComponent
                        showYn={(data.id===9 && data.type!="radio")?showCrdElYn:true}
                        title={arrTitleData[idx]}
                        styleTxt="txt"
                      />
                      { 
                        (data.type === "radio") && 
                        <RadioComponent 
                          radioData={arrRadioData[data.radioId]} 
                          styleFormGroup={(data.radioId != 8)?"form-group":"form-group inline row2"} 
                          fixedId={(data.radioId===0 || data.radioId===1)&&arrRadioData[data.radioId].fixedId}
                          userResult={userResult}
                          setUserResult={setUserResult}
                          dataId={data.id}
                        /> 
                      }
                      { 
                        (data.type === "text")  && 
                          <TextComponent
                            showYn={(data.textId===1)?showCrdElYn:true}
                            styleSeleList="sele-list type01 radius answer-wrap"
                            styleInput=""
                            textData={arrTextData[data.textId]}
                            onChangeFn={(value)=>{
                              let copy = [...userResult];
                              copy[data.id] = value;
                              setUserResult(copy);
                            }}
                          />                          
                      }
                      { 
                        (data.type === "select")&& 
                          // <SelectComponent 
                          //   selectData={arrSeleectData[data.selectId]}
                          //   styleSeleList="sele-list type01 radius answer-wrap mar-t10"
                          //   setUserCrdBru={setUserCrdBru}
                          //   showCrdElYn={data.id===9?showCrdElYn:true}
                          // />
                          <SelectComponent
                            showYn={showCrdElYn}
                            selectData={arrSeleectData[data.selectId]}
                            styleSeleList="sele-list type01 radius answer-wrap mar-t10"
                            onChangeFn={(value)=> {
                              setUserCrdBru(value);
                            }}
                          />                          
                      }
                    </li>
                  )
                })
              }
            </ul>
            <div className="terms-wrap mar-t20">
              <div className="txt-wrap bg-gray">
                <p className="txt s-txt">
                  본인은 은행에 제공한 적합성・적정성 관련 정보와 관련하여 다음과 같은 사항을 확인합니다.
                </p>
                <ul className="info-con-wrap mar-t10">
                  <li className="info-con-txt">1. 적합성・적정성 관련 정보는 본인의 연령, 대출목적(용도) 등의 정보를 정확히 알려드린 것입니다.</li>
                  <li className="info-con-txt">2. 적합성・적정성 판단결과 “적합”의 의미는 고객님과  여신 상담이 가능한 것을 말하며, 여신신청에 대한 승인을 의미하는 것은 아닙니다.</li>
                  <li className="info-con-txt">3. 본인이 제공한 정보가 정확하지 않거나, 정보에 변경사항이 발생한 경우에는 적합성・적정성 판단이 달라질 수 있음을 설명 받았습니다.</li>
                  <li className="info-con-txt">4. 상기 목적을 위해 본인의 개인(신용)정보를 수집, 이용 또는 제공하는 것에 동의합니다.</li>
                </ul>
              </div>

              <div className="ui-cont-wrap">
                <div className="ui-decide">
                  <input type="checkbox" id="checkbox01" onChange={()=> {
                    setAgreeYn(!agreeYn);
                  }}/>
                    <label htmlFor="checkbox01" className="input-label">본인은 위 안내사항을 충분히 이해하고 동의합니다.</label>
                </div>
                <p className="info-con-txt mar-t10">* 본 확인서는 [금융소비자 보호에 관한 법률] 제17조 및 제18조에 따라 작성되었습니다.</p>
              </div>
            </div>
          </div>
        </div>
        <OslBtn
          obj={{
            type: "button",
            disabled: false,
            text: ["제출"],
            link: "",
            callbackId: cbOslBtn
          }} ></OslBtn>
      </div>
    </div>
    {
      show&&
      <AlertModal
        show={show}
        msg={msgCont}
        btnNm={["확인"]}
        onClickFn={()=> {
          handleClose();
          if(successYn) {
            //다음화면 이동
            navigate(
              PathConstants.PREJUDGE_SUITRESULT,
              {
                state: {
                  result: userResult,
                  crdBru: userCrdBru
              }
            });
          }
        }}
      />

    
    }
    </>
  );

}

/**
 * 타이틀영역 컴포넌트
 * @param {} props 
 * @returns 

function TitleComponent(props) {
  const titleData = props.titleData;
  if(props.showCrdElYn) {
    return (
      <div className="question-wrap txt-wrap">
        <p className="txt fc-6">
          {titleData}
        </p>
      </div>
    );
  }else {
    return null;
  }
  
}
 */

/**
 * 라디오박스 컴포넌트(적정성 적합성용)
 * @param {} props 
 * @returns 
 */
function RadioComponent(props) {
  const objRadioData = props.radioData;
  const styleFormGroup = props.styleFormGroup;
  const fixedId = props.fixedId;
  
  return (
    <>
      {
        objRadioData.radioList.map((data, idx)=>{
          return (
            <div key={`sRadio${objRadioData.id}_${data.id}`} className={styleFormGroup}>
              <label className="form-radio">
                <input 
                  type="radio" 
                  name={`sRadio${objRadioData.id}`} 
                  id={`sRadio${objRadioData.id}_${data.id}`} 
                  value="" 
                  checked={(!fixedId && fixedId===data.id)?true:null}
                  onChange={(e)=>{
                    let copy = [...props.userResult];
                    copy[props.dataId] = "0" + (data.id+1);
                    props.setUserResult(copy);
                  }}
                />
                  <span className="radio"></span>{data.value}
              </label>
            </div>
          )
        })
      }
    </>
  );
}

/**
 * 텍스트박스 컴포넌트
 * @param {*} props 
 * @returns 

function TextComponent(props) {
  const objTextData = props.textData;
  if(props.showCrdElYn) {
    return (
      <div className="form-group">
        <div className="sele-list type01 radius answer-wrap">
          <div className="item">
            <input 
              type="text"
              name={`sRadio${objTextData.id}`}  
              id={`text${objTextData.id}`}
              placeholder={objTextData.placeholder}
              onChange={(e)=> {
                if(props.dataId != 9) {
                  let copy = [...props.userResult];
                  copy[props.dataId] = e.target.value===""?99:e.target.value;
                  props.setUserResult(copy);
                }else {
                  props.setUserCrdScr(e.target.value);
                }
              }}
            />
          </div>
          <div className="btn-wrap">
            <button type="reset" className="btn btn-sm btn-reset"><span className="blind">재작성</span></button>
          </div>
        </div>
      </div>
    );
  }else {
    return null;
  }
}
 */
/**
 * 셀렉트박스 컴포넌트
 * @param {} props 
 * @returns 

function SelectComponent(props) {
  const objSelectData = props.selectData;
  if(props.showCrdElYn) {
    return (
      <div className="sele-list type01 radius answer-wrap mar-t10">
        <div className="item">
          <label className="ui-select">
            <select name="sSel" id="sSel1" disabled="" onChange={(e)=> {
              props.setUserCrdBru(e.target.value);
            }}>
              {
                objSelectData.selectList.map((data, idx)=>{
                  return (
                    <option key={idx} value={data.value}>{data.name}</option>
                  )
                })
              }
            </select>
            <span className="radio"></span>
          </label>
        </div>
      </div>
    );
  }else {
    return null;
  }
}
 */
/**
 * 빈값 밸리데이션 체크
 * 빈값일시 항목별 title, 조사, 동사로 메세지값 완성
 * @param {사용자 체크값} userResult 
 * @param {선택한 신용기관} userCrdBru 
 * @param {입력한 신용점수} userCrdScr 
 * @returns 
 */
function validCheckEmpty(agreeYn, userResult, userCrdBru, userCrdScr) {

  let msg = "";
  let verb = "하시기 바랍니다.";

  if(!agreeYn) return "동의여부를 확인 바랍니다.";
  for(let i=0; i<userResult.length; i++) {
    if(!userResult[i] || userResult[i] === 99) {
      let josa = "";
      if (checkBatchimEnding(suitTestData[suitTestData.findIndex((data) => data.id === i)].title)) {
        josa = "을 ";
      } else {
        josa = "를 ";
      }
      if (i == 1 || i == 11) {
        verb = "입력" + verb;
      } else {
        verb = "선택" + verb;
      }
      msg = suitTestData[suitTestData.findIndex((data) => data.id === i)].title + josa + verb;

      return msg;
    }else if(i === 9) {
      if(userResult[i] === '01') {
        if(!userCrdBru) {
          return "신용기관을 선택하시기 바랍니다.";
        }else if(!userCrdScr) {
          return "신용점수를 입력하시기 바랍니다.";
        }
      }
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

export default SuitTest;