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


import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../../modules/components/OslBtn.js";
import OslHeader from "../../../modules/components/OslHeader.js";
import PathConstants from "../../../modules/constants/PathConstants.js";
import collectData from "../../../modules/constants/collectData.js";

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

    let [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99]); //결과값 저장 state
    let navigate = useNavigate(); //다음화면을 위한 navigate
    useEffect(()=> {
        console.log(userResult);
    }, [userResult])
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
                            <ol className="sele-list type03 pad-b10">
                                {grtInfoData.map(function (data1, idx1) {
                                    return (
                                        <li key={`li_${idx1}`} className="item">
                                            <TitleComponent titleData={arrTitleData[idx1]} />
                                            {(data1.type === "radio") &&
                                                <RadioComponent
                                                    radioData={arrRadioData[data1.radioId]}
                                                    idx={idx1} userResult={userResult} setUserResult={setUserResult}
                                                />
                                            }
                                            {(data1.type === "text") && <TextComponent textData={arrTextData} idx={idx1} userResult={userResult} setUserResult={setUserResult} />}
                                            {(data1.type === "select" && <SelectComponent selectData={arrSeleectData} idx={idx1} userResult={userResult} setUserResult={setUserResult} />)}
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

                                <div className="ui-cont-wrap">
                                    <div className="ui-decide">
                                        <input type="checkbox" id="checkbox01" />
                                        <label htmlFor ="checkbox01" className="input-label">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</label>
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

            </div>
        </>
    )
}
function TitleComponent(props) {
    const titleData = props.titleData;
    return (
        <div className="question-wrap txt-wrap">
            <p className="txt fc-6">
                {titleData}
            </p>
        </div>
    )
}
function RadioComponent(props) {
    const objRadioData = props.radioData;
    return (
        <>
            <div className="sele-list type01 radius answer-wrap">
                {objRadioData.radiolist.map((data, idx) => {
                    return (
                        <div key={`sRadio${objRadioData.id}_${data.id}`} className="item">
                            <input type="radio"
                                name={`sRadio${objRadioData.id}`}
                                id={`sRadio${objRadioData.id}_${data.id}`}
                                value={data}
                                onChange={(e) => {
                                    let copy = [...props.userResult]
                                    copy[props.idx] = data.id;
                                    props.setUserResult(copy);

                                }} />
                            <label htmlFor={`sRadio${objRadioData.id}_${data.id}`} className="item-cont">
                                {data.value}
                            </label>
                        </div>

                    )
                })}
            </div>
        </>
    )
}

function TextComponent(props) {

    const objTextData = props.textData;

    return (
        <div className="form-group">
            <div className="sele-list type01 radius answer-wrap">
                <div className="item">
                    <input
                        type="text"
                        name="text01"
                        id="text01_01"
                        placeholder="5000000"
                        className="w100p ta-r"
                        size="9"
                        onChange={(e) => {
                            if(e.currentTarget.value > 100000000){
                                alert("대출 희망금액은 최대 1억원까지 입력가능합니다.")
                            }
                            let copy = [...props.userResult];
                            copy[props.idx] = e.currentTarget.value;
                            props.setUserResult(copy);
                            console.log(props.userResult)

                        }}
                    />
                </div>
                <span className="value-text">원</span>
            </div>
        </div>
    )
}

function SelectComponent(props) {
    const objSelectData = props.selectData;
    return (
        <div className="sele-list type01 radius answer-wrap">
            <div className="item">
                <label className="ui-select">
                    <select name="sSel" id="sSel1"
                        onChange={(e) => {
                            let copy = [...props.userResult];
                            copy[props.idx] = e.currentTarget.value;
                            props.setUserResult(copy);
                        }}>
                        <option value="">선택하세요</option>
                        <option value="5">5년</option>
                        <option value="8">8년</option>
                    </select>
                    <span></span>
                </label>
            </div>
        </div>
    )

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
            if(userResult[8] < 10000000){
               return msg = ("대출 희망금액은 최소 1천만부터 입력 가능합니다.")
            }else if(userResult[8] < 1000000){
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