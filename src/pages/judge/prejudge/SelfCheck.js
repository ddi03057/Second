/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useEffect, useRef, useState } from "react";
import { element } from "prop-types";
import OslHeader from "../../../modules/components/OslHeader";

/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
const data = [
  {
    id: 1,
    title: "영리목적으로 사업을 영위하는 개인기업에 해당하십니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 2,
    title: "보증금지/제한 기업 또는 보증제한/취급유의/지역신용보증재단 우선취급업종 영위기업에 해당되십니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 3,
    title: "심사항목 저촉사항이 있습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 4,
    title: "신청기업의 실제경영자가 사업자등록증상 대표자입니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 5,
    title: "사업자등록상 공동대표자가 있습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 6,
    title: "신청일 현재 신청기업 이외에 다른 기업을 운영 중에 있으며, 해당 기업이 신용보증기금, 기술보증기금, 지역신용보증재단에 보증잔액이 있습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 7,
    title: "신청일 현재 신용보증기금 또는 기술보증기금 보증잔액이 있습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 8,
    title: "사업자등록증상 개업일로부터 1년이 지났습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
  {
    id: 9,
    title: "최근 1년 이내 대표자(실제경영자)가 변동 된 사실이 있습니까?",
    type: "select",
    answer: [
      {
        name: "예",
        value: "y"
      },
      {
        name: "아니요",
        value: "n"
      },
    ],
  },
];


function SelfCheck(props) {

  let [answer, setAnswer] = useState([99, 99, 99, 99, 99, 99, 99, 99, 99]);

  let [disabledYn, setDisabledYn] = useState(true);

  const itemRef = useRef([]);

  const headerNm = props.headerNm;

  return (
    <>
      <OslHeader headerNm={headerNm} />
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
              <ol className="sele-list type03">
                {data.map(function (data, idx) {
                  return (
                    <>
                      <li className="item" key={idx}>
                        <div className="question-wrap txt-wrap" key={idx}>
                          <p className="txt" key={idx}>
                            {data.id}. {data.title}
                            {(data.id === 2 &&
                              <div className="link-btn-wrap">
                                <button type="button" className="link-btn type01">
                                  <span className="ico-blue-arrow right">업종 펼쳐보기</span>
                                </button>
                              </div>
                            )}
                            {(data.id === 3 &&
                              <ol className="order-list">
                                <li data-num="①" className="item">신청일 현재 금융기관 연체 중</li>
                                <li data-num="②" className="item">신청일 현재 국세,지방세, 4대보험 체납 중</li>
                                <li data-num="③" className="item">최근 3개월 이내 10일 이상 계속된 연체대출금 보유</li>
                                <li data-num="④" className="item">최근 1년 이내 당좌부도, 신용관리정보<br />(신용보증기금/기술보증기금/신용보증재단) 부실정보 보유</li>
                                <li data-num="⑤" className="item">최근 1년 이내 사업장 또는 거주주택에 대한 권리침해(경매,압류,가압류,가처분)</li>
                              </ol>
                            )}
                          </p>
                        </div>
                        <div className="sele-list type01 radius answer-wrap">
                          <ButtionList key={idx} data={data} idx={idx} answer={answer} setAnswer={setAnswer} itemRef={itemRef}>

                          </ButtionList>
                        </div>
                      </li>
                    </>
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
                    <input type="checkbox" id="checkbox01" />
                    <label htmlFor="checkbox01" className="input-label">위 내용에 동의하십니까?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

function ButtionList(props) {
 
  return (
    <>
      <div className ="item">
        <input type="radio" name="radio03"
        key={`${props.idx}`}
        id={`radio${props.idx}`}
        value={props.data.answer[1].value}
        onChange={(e)=>{
          let copy = [...props.answer];
          copy[props.idx] = e.currentTarget.value;
          props.setAnswer(copy);
          console.log(props.answer)
        }}
        />
          <label htmlFor ={`radio${props.idx}`} className ="item-cont">{props.data.answer[1].name}</label>
      </div>
      <div className ="item">
        <input type="radio" name="radio03"
        key={`${props.idx}1`}
        id={`radio${props.idx}1`}
        value={props.data.answer[0].value}
        onChange={(e)=>{
          let copy = [...props.answer];
          copy[props.idx] = e.currentTarget.value;
          props.setAnswer(copy);
          console.log(props.answer)
        }}/>
          <label htmlFor ={`radio${props.idx}1`} className ="item-cont">{props.data.answer[0].name}</label>
      </div>
    </>
  )
}

function validCheck(answer) {

  let msg = [];
  const diffAnswer = ["y", "n", "n", "y", "n", "n", "n", "y", "n"];
  for (let idx = 0; idx < answer.length; idx++) {
    if (diffAnswer[idx] != answer[idx]) {
      msg[0] = idx;
      msg[1] = data[idx].msg;
      return msg;
    }
  }
  return "";
}

export default SelfCheck;