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
import { useState, useTransition } from "react";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";

const GrtInfoData = [
    {
        id: 0,
        title: "주 사업장 소유자",
        type: "radio",
        radioId: 0,
        radiolist: [
            {
                id: 0,
                value: "본인"
            },
            {
                id: 1,
                value: "배우자"
            },
            {
                id: 2,
                value: "타인"
            },
        ],
    },
    {
        id: 1,
        title: "주 사업장 관리 침해(최근 1년 이내)",
        type: "radio",
        radioId: 1,
        radiolist: [
            {
                id: 0,
                value: "있음"
            },
            {
                id: 1,
                value: "없음"
            },
        ],
    },
    {
        id: 2,
        title: "주민등록상 주소지와 실제 거주지 주소가 같습니까?",
        type: "find",

    },
    {
        id: 3,
        title: "주민등록상 주소지 소유자",
        type: "radio",
        radioId: 2,
        radiolist: [
            {
                id: 0,
                value: "본인"
            },
            {
                id: 1,
                value: "배우자"
            },
            {
                id: 2,
                value: "타인"
            },
        ],
    },
    {
        id: 4,
        title: "거주 주택 소유자",
        type: "radio",
        radioId: 3,
        radiolist: [
            {
                id: 0,
                value: "본인"
            },
            {
                id: 1,
                value: "배우자"
            },
            {
                id: 2,
                value: "타인"
            },
        ],
    },
    {
        id: 5,
        title: "본인 또는 배우자 명의로 소유하고 있는 주택(실거주 불문)이 있습니까?",
        type: "radio",
        radioId: 4,
        radiolist: [
            {
                id: 0,
                value: "예"
            },
            {
                id: 1,
                value: "아니요"
            },
        ],
    },
    {
        id: 6,
        title: "거주 주택 권리 침해(최근 1년 이내)",
        type: "radio",
        radioId: 5,
        radiolist: [
            {
                id: 0,
                value: "있음"
            },
            {
                id: 1,
                value: "없음"
            },
        ],
    },
    {
        id: 7,
        title: "대출 희망 금액",
        type: "text",
    },
    {
        id: 8,
        title: "대출 기간",
        type: "select",
        selectlist: [
            {
                id: 0,
                value: "5"
            },
            {
                id: 1,
                value: "8"
            },
        ],
    },
];

function GrtInfoInput(props) {

    //**항목별 데이터 분리 */
    let arrTitleData = [];
    GrtInfoData.find((data) => {
        arrTitleData.push(data.title);
    });
    let arrRadioData = [];
    GrtInfoData.find((data) => {
        if (data.type === "radio") {
            arrRadioData.push(data);
        }
    });
    let arrTextData = [];
    GrtInfoData.find((data) => {
        if (data.type === "text") {
            arrTextData.push(data);
        }
    });
    let arrSeleectData = [];
    GrtInfoData.find((data) => {
        if (data.type === "select") {
            arrSeleectData.push(data);
        }
    });

    const GrtInfoDataLen = GrtInfoData.length;  //데이터길이
    let [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99]); //결과값 저장 state

    function cbOslBtn () {
 
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
                                {GrtInfoData.map(function (data1, idx1) {
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
                                        <label for="checkbox01" className="input-label">윤리 경영 실천 및 보증브로커 피해예방을 위한 협조 확약 등</label>
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
                                    copy[props.idx] = data.value;
                                    props.setUserResult(copy);
                                    console.log(props.userResult);

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
                        onChange={(e) => {
                            let copy = [...props.userResult];
                            copy[props.idx] = e.currentTarget.value;
                            props.setUserResult(copy);
                            console.log(props.userResult);

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
                            console.log(props.userResult);
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
export default GrtInfoInput;