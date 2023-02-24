/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명 : 보증심사자료 작성
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
import AlertModal from "../../../modules/components/AlertModal";
import { useDaumPostcodePopup } from "react-daum-postcode";
import API from "../../../modules/constants/API.js";
import request from "../../../modules/utils/Axios";
import { Context1 } from "./../../../App.js";
import { useContext } from "react";
import callOpenApi, { callLocalApi } from "../../../modules/common/tokenBase";

const grtInfoData = collectData("GrtInfoInput");

function GrtInfoInput(props) {
  const [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99, '5']); //결과값 저장 state
  const [disabledYn, setDisabledYn] = useState(true);
  const [agreeYn, setAgreeYn] = useState(false);
  const [successYn, setSuccessYn] = useState(false);
  const navigate = useNavigate(); //다음화면을 위한 navigate
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [comshow, setComShow] = useState(false);
  const comHandleShow = () => setComShow(true);
  const comHandleClose = () => setComShow(false);
  const [showPost, setShowPost] = useState(false);
  const postHandleShow = () => setShowPost(true);
  const postHandleClose = () => setShowPost(false);
  const [postCd, setPostCd] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  let [msgCont, setMsgCont] = useState("");
  const [visible, setVisible] = useState(false);

  //**항목별 데이터 분리 */
  const arrTitleData = [];
  grtInfoData.find((data) => {
    arrTitleData.push(data.title);
  });
  const arrRadioData = [];
  grtInfoData.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });
  const arrTextData = [];
  grtInfoData.find((data) => {
    if (data.type === "text") {
      arrTextData.push(data);
    }
  });
  
  const arrSeleectData = [];
  grtInfoData.find((data) => {
    if (data.type === "select") {
      arrSeleectData.push(data);
    }
  });
  const arrSearchData = [];
  grtInfoData.find((data) => {
    if (data.type === "search") {
      arrSearchData.push(data);
    }
  });

  useEffect(() => {
    //빈값체크하고 버튼 활성화/비활성화
    console.log(userResult);
    let validCheckIdx = userResult.findIndex((data, idx) => data === 99);
    if (validCheckIdx === -1 && agreeYn) {
      setDisabledYn(false);
    }else if(validCheckIdx === 3 && agreeYn) {
      if(userResult[2] === 0) {
        setDisabledYn(false);
      }else {
        setDisabledYn(true);
      }
    }else {
      console.log("밸리실패");
      setDisabledYn(true);
    }
  }, [userResult, agreeYn]);

  useEffect(() => {
  }, [agreeYn]);

  useEffect(() => {
    if(successYn) {
      saveGrtInfoInput();
    }
  }, [successYn]);

  // popup
  function openPop() {
    setShow(true);
    document.body.style.overflow = "hidden";
  }
  function closePop() {
    setShow(false);
    document.body.style.overflow = "";
  }

  let test = useContext(Context1);

  const saveGrtInfoInput = () => {
    const params = {
      bsunOwrRlcd: userResult[0], //사업장소유자관계코드
      bsunRgifDcd: userResult[1], //사업장권리침해구분코드
      bsunZpcd: postCd, //사업장 우편번호
      bsunRdnd: addr1, //사업장 도로명 주소
      bsunRdnmDtad: addr2, //사업장 도로명 상세 주소
      iruTrthRsplAdrYn: userResult[2], //주민등록상실제거주지주소여부
      iruAdpaSelfOwnCd: userResult[3], //주민등록상주소지소유코드
      rshsOwrRlcd:  userResult[4], //거주주택소유자관계코드
      bsunOwnYn: userResult[5], //사업장 소유주 본인(배우자) -  사업장 -> 주택으로 변경
      rshsRgifDcd: userResult[6], //거주주택권리침해구분코드
      frstLoapAmt: userResult[7], //고객 대출신청금액
      loanTrmCnt: userResult[8], //대출단위코드
      loteUncd: "Y", //대출기간 단위 분류코드
      rshsRdnd: addr1, //거주주택도로명주소
      rshsRdnmDtad: addr1, //거주주택도로명 상세주소
      rshsZpcd: postCd, //거주주택우편번호
    }

    console.log("params > ", params);

    //보증심사자료 저장
    //[TODO]전자서명해시값 받은후 -> 전자서명 필요(인증서) -> 보증신청 연동 필요
    callLocalApi(
      API.PREJUDGE.GRTINFOINPUT_GRNYEXTDATWRTN,
      {params},
      (res)=> {
        console.log(res);
          //진행상태 이동
          navigate(PathConstants.MAIN,  {
            state: {
              tabIdx: 2 //진행상태
            }
        })
      },
      (err)=> {
        //alert(err);
      }
    )
  }
  
  function cbOslBtn() {
    let lonAmt = userResult[8];
    let lonAmtTmp = Math.floor(lonAmt % 1000000)
    lonAmt = Math.floor(lonAmt / 1000000) * 1000000;
    console.log(msgCont, lonAmt);
    if (lonAmt < 10000000) {
      setMsgCont("대출 희망 금액은 최소 1천만부터 입력가능합니다.");
      handleShow();
    } else if (lonAmtTmp != 0) {
      setMsgCont("1백만원 단위로 입력 가능합니다.");
      handleShow();
    } else if (lonAmt > 100000000) {
      setMsgCont("대출 희망금액은 최대 1억원까지 입력가능합니다.");
      handleShow();
    }
    else {
      setSuccessYn(true);
    }

    //GrtInfoInput();
  }


  useEffect(()=> {
    let copy = [...userResult];
    console.log(postCd);
    console.log(addr1)
    console.log(addr2)
    if(!!postCd && !!addr1 && !!addr2.trim()) {
      copy[3] = "Y";
    }else {
      copy[3] = 99;
    }
    setUserResult(copy);
  }, [postCd, addr1, addr2])

  // const saveGrtInfoInput = async () => {

  //   const res = await request({
  //     method: "post",
  //     url: API.PREJUDGE.PREJUDGE_GRTINFOINPUT,
  //     data: {
  //       bsunOwrRlcd: userResult[0], // 주사업장소유자
  //       bsunRgifDcd: userResult[1], // 주사업장관리침해
  //       rshsOwrRlcd: userResult[5], //거주주택소유자
  //       rshsRgifDcd: userResult[7], //거주주택권리침해
  //       // lastLoapAmt: "5000000", //대출희망금액
  //       // loanTrmCnt: "5", //대출기간
  //       rshsRdnd: addr1, //거주주택도로명주소
  //       rshsRdnmDtad: addr2, //거주주택상세주소
  //       rshsZpcd: postCd, // 거주주택우편번호

  //       bsunZpcd: "",
  //       bsunRdnd: "",
  //       bsunRdnmDtad: "",

  //     }
  //   })
  //     .then((response) => {
  //       console.log(response)
  //       return response;
  //     })

  //     .catch((error) => {
  //       console.log("error : ", error);
  //     });
  // }


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
                        showYn={(idx === 3 && userResult[2] === 1) ? true : (idx !== 3) ? true : false}
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
                              copy[data.id] = radioIdx;
                              setUserResult(copy);
                            }}
                          />

                        </>
                      )}
                      {(data.type === "search" &&
                        <Search arrSearchData={arrSearchData} userResult={userResult} setVisible={setVisible} postHandleShow={postHandleShow}
                        setAddr1={setAddr1} setAddr2={setAddr2} setPostCd={setPostCd} addr1={addr1} addr2={addr2} postCd={postCd}
                        />
                      )}
                      {
                        (data.type === "text") &&
                        <TextComponent
                          showYn={true}
                          styleSeleList="sele-list type01 radius answer-wrap"
                          styleInput="w100p ta-r"
                          textData={arrTextData[data.textId]}
                          inputType={data.placeholder.indexOf("숫자") > -1 ? "number" : "text"}
                          onChangeFn={(value) => {
                            let copy = [...userResult];
                            copy[data.id] = value === 0 ? 99 : value;
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
                          onChangeFn={(value) => {
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
                    <input type="checkbox" id="checkbox01" value={agreeYn} onChange={() => { setAgreeYn(!agreeYn) }}
                    />
                    <label htmlFor="checkbox01" className="input-label">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</label>
                  </div>
                  <div className="ui-pop">
                    <a data-id="" className="btn-pop-arrow" title="윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등" onClick={() => comHandleShow()}><span className="blind">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OslBtn obj={{
            type: "button",
            disabled: disabledYn,
            text: ["확인"],
            link: "",
            callbackId: cbOslBtn
          }} />


        </div>
        {comshow &&
          <FullModal
            showYn={comshow}
            handleClose={comHandleClose}
            headerNm=""
            footerNm="닫기"
            content="GrtInfoInputModal"
            type="component"
            onClickFn={() => {
            }}
          />
        }
        {showPost &&
          <FullModal
            showYn={showPost}
            handleClose={postHandleClose}
            headerNm=""
            footerNm="닫기"
            content=""
            type="post"
          />
        }
      </div>
      {show &&
        <AlertModal
          show={show}
          msg={msgCont}
          btnNm={["확인"]}
          onClickFn={() => {
            setMsgCont("");
            handleClose();
          }}
        />
      }
    </>
  )

}

function Search(props) {
  
  const data = props.arrSearchData;
  

  const showPost = useDaumPostcodePopup();

  const postHandleComplete = (data) => {
    console.log("콜백데이터", data);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.setPostCd(data.sigunguCode);
    props.setAddr1(fullAddress);
  };

  const postHandleClick = () => {
    showPost({ onComplete: postHandleComplete });
  };


  if (props.userResult[2] === 1) {
    return (
      <div className="sele-list answer-wrap">
        <div className="item">
          <div className="inp-block">
            <input type="text" className="inp type01 disabled w175 address"
              name="text01"
              id="text01_01"
              placeholder=""
              value={props.postCd}
              readOnly
            />
            <button type="button" className="btn btn-md address-btn bg-skyblue"
              onClick={postHandleClick}
            >
              <span className="fc-white fs-18">
                {data[0].title}
              </span>
            </button>
          </div>
          <input type="text" className="inp type01" name="text01" id="text01_02" placeholder="" value={props.addr1} readOnly />
          <input type="text" className="inp type01" name="text01" id="text01_03" placeholder="" value={props.addr2}
          onChange={(e)=>{
            props.setAddr2(e.currentTarget.value)
            
          }}/>
        </div>
      </div>
    )
  } else {
    return null;
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
function validCheckEmpty(userResult, props) {
  let msgType = "";
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
        return msgType = ("1000")
      }

      msg = grtInfoData[grtInfoData.findIndex((data) => data.id === i)].title + josa + verb;

      return msg;
      return msgType;
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