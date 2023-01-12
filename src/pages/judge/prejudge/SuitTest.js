/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import { useState } from "react";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";

const suitTestData = [
  {
      id : 0,
      title : "전문금융 소비자 여부",
      standardVal : "",
      type : "radio",
      radioId : 0,
      radioList : [
          {
              id : 0,
              name : "일반금융소비자" 
          },
          {
              id : 1,
              name : "전문금융소비자" 
          },
      ],
      fixedId : 0,
      msg : "전문금융소비자가 맞으십니까?\n전문금융소비자는 청약철회권을 행사할 수 없습니다.\n * 전문금융소비자: 국가, 금융회사, 주권상장법인 등"

  },
  {
      id : 1,
      title : "연령",
      standardVal : "",
      type : "text",
      textId : 0,
      placeholder : "숫자만 입력"

  },
  {
      id : 2,
      title : "대출 용도",
      standardVal : "",
      type : "radio",
      radioId : 1,
      radioList : [
          {
              id : 0,
              name : "운전 자금" 
          },
          {
              id : 1,
              name : "사설 자금" 
          },
      ],
      fixedId : 0,
      msg : "사설자금이 맞으십니까?\n사설자금은 비대면 대출 대상이 아닙니다.\n  *사설자금: 부동산의 매입, 신축, 증축 등"

  },
  {
      id : 3,
      title : "보유 자산",
      standardVal : "현재기준",
      type : "radio",
      radioId : 2,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 4,
      title : "현재 소득",
      standardVal : "최근 1년 기준",
      type : "radio",
      radioId : 3,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 5,
      title : "미래 예상 소득",
      standardVal : "",
      type : "radio",
      radioId : 4,
      radioList : [
          {
              id : 0,
              name : "현재보다 감소" 
          },
          {
              id : 1,
              name : "현재수준 유지" 
          },
          {
              id : 2,
              name : "현재보다 증가" 
          }
      ],

  },
  {
      id : 6,
      title : "부채",
      standardVal : "",
      type : "radio",
      radioId : 5,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 7,
      title : "고정 지출",
      standardVal : "",
      type : "radio",
      radioId : 6,
      radioList : [
          {
              id : 0,
              name : "현재 소득의 10% 미만" 
          },
          {
              id : 1,
              name : "현재 소득의 10% 이상 50% 미만" 
          },
          {
              id : 2,
              name : "현재 소득의 50% 이상" 
          }
      ],

  },
  {
      id : 8,
      title : "연체 정보",
      standardVal : "",
      type : "radio",
      radioId : 7,
      radioList : [
          {
              id : 0,
              name : "현재 연체 중이며 연체 정리가 어려움" 
          },
          {
              id : 1,
              name : "현재 연체 중이나 정리 예정" 
          },
          {
              id : 2,
              name : "현재 연체 정보 없음" 
          }
      ],

  },
  {
      id : 9,
      title : "신용점수",
      standardVal : "",
      type : "radio",
      radioId : 8,
      radioList : [
        {
          id : 0,
          name : "알고 있음" 
        },
        {
          id : 1,
          name : "잘 모름"
        }
      ]
      

  },
  {
    id : 9,
    title : "점수 (1~1000점)",
    standardVal : "",
    type : "text",
    textId : 1,
    placeholder : "숫자만 입력"
  },
  {
    id : 9,
    title : "평가기관",
    standardVal : "",
    type : "select",
    selectId : 0,
    selectList : [
      {
        id : 1,
        name : "NICE",
        title : "나이스"
      },
      {
        id : 2,
        name : "KCB",
        title : "올크레딧"
      }
    ]
  },
  {
      id : 10,
      title : "변제방법",
      standardVal : "",
      type : "radio",
      radioId : 9,
      radioList : [
          {
              id : 0,
              name : "사업 소득" 
          },
          {
              id : 1,
              name : "임대 소득" 
          },
          {
              id : 2,
              name : "금융 소득" 
          },
          {
              id : 3,
              name : "기타 소득" 
          }
      ],

  },
  {
      id : 11,
      title : "교부 받을 이메일 주소",
      standardVal : "",
      type : "text",
      textId : 2,
      placeholder : ""
      

  }
];
/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function SuitTest(props) {

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

  const suitTestDataLen = suitTestData.length;  //데이터길이
  let [userResult, setUserResult] = useState([99,99,99,99,99,99,99,99,99,99,99,99]); //결과값 저장 state

  function cbOslBtn() {
    alert()
  }
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
            <ol className="sele-list type03">
              {
                suitTestData.map((data, idx)=> {
                  console.log(data);
                  return (
                    <li key={`li_${idx}`} className="item">
                      <TitleComponent titleData={arrTitleData[idx]} />
                      { 
                        (data.type === "radio") && 
                          <RadioComponent 
                            radioData={arrRadioData[data.radioId]} 
                            styleFormGroup={(data.radioId!=8)?"form-group":"form-group inline row2"} 
                            fixedId={(data.radioId===0 || data.radioId===1)&&arrRadioData[data.radioId].fixedId}
                          /> 
                      }
                      { (data.type === "text")  && <TextComponent textData={arrTextData[data.textId]} /> }
                      { (data.type === "select")&& <SelectComponent selectData={arrSeleectData[data.selectId]} />}
                    </li>
                  )
                })
              }
            </ol>
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
                  <input type="checkbox" id="checkbox01"/>
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
    </>
  );

}

function TitleComponent(props) {
  const titleData = props.titleData;

  return (
    <div className="question-wrap txt-wrap">
      <p className="txt fc-6">
        {titleData}
      </p>
    </div>
  );
}

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
                <input type="radio" name={`sRadio${objRadioData.id}`} id={`sRadio${objRadioData.id}_${data.id}`} value="" checked={(!fixedId && fixedId===data.id)?true:null}/>
                  <span className="radio"></span>{data.name}
              </label>
            </div>
          )
        })
      }
    </>
  );
}

function TextComponent(props) {
  const objTextData = props.textData;

  return (
    <div className="form-group">
      <div className="sele-list type01 radius answer-wrap">
        <div className="item">
          <input type="text" name="text01" id="text01_01" placeholder={objTextData.placeholder}/>
        </div>
        <div className="btn-wrap">
          <button type="reset" className="btn btn-sm btn-reset"><span className="blind">재작성</span></button>
        </div>
      </div>
    </div>
  );
}

function SelectComponent(props) {
  const objSelectData = props.selectData;

  return (
    <div className="sele-list type01 radius answer-wrap mar-t10">
      <div className="item">
        <label className="ui-select">
          <select name="sSel" id="sSel1" disabled="">
            <option value="">선택</option>
            {
              objSelectData.selectList.map((data, idx)=>{
                return (
                  <option key={idx} value={data.id}>{data.name}</option>
                )
              })
            }
          </select>
          <span className="radio"></span>
        </label>
      </div>
    </div>
  );
}

export default SuitTest;