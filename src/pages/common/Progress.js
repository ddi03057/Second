import axios from 'axios';
import { useLayoutEffect } from 'react';
import Stepper from 'react-stepper-enhanced/lib/Stepper';
import OslBtn from '../../modules/components/OslBtn';
//import { Card } from 'react-bootstrap';

import OslHeader from '../../modules/components/OslHeader';
import collectData from '../../modules/constants/collectData';
import request from '../../modules/utils/Axios';

const progressFootMsgData = collectData("progressFootMsg");
/**
 * asis
 * 화면당 3 step 사전심사, 보증신청, 대출실행
 * 사전심사 active,complete 보증신청 active,complete 대출실행 active,complete 총 6가지 경우
 * 사전심사 active
 *  activeStep=0
 * 사전심사 complete
 *  activeStep=1
 *  completeColor, completeBorderColor, completeBorderStyle 을 default로
 * 보증신청 active
 *  activeStep=1
 * 보증신청 complete
 *  activeStep=2
 *  completeColor, completeBorderColor, completeBorderStyle 을 default로
 * 대출실행 active
 *  activeStep=2
 * 대출실행 complete
 *  activeStep=3
 * tobe
 * 화면랜더링시, back에서 진행상태조회 전문 oslNofcLoanPgstInq 리턴값 받아와야함 ( 코드값에 무슨단계에 어떤상태인지 별로 정의되어있는듯)
 * 사전심사 
 *  -거절 
 *  -접수 
 *  (-완료)
 * 보증심사 
 *  (-신청)
 *  -거절
 *  -진행중
 *  -완료
 * 대출실행 
 *  -완료
 * @param {*} props 
 * step 0,1,2 사전심사, 보증신청, 대출실행
 * status 0,1,2 거절, 진행중, 완료
 * 
 * @returns 
 */
function Progress(props) {

  const PREJUDGE_APPLY_COMPLETE_FOOT_MSG = [];
  let prejudgeRejectFootMsg = [];
  const GRTJUDGE_ING_FOOT_MSG = [];
  const GRTJUDGE_REJECT_FOOT_MSG = [];
  const GRTJUDGE_COMPLETE_FOOT_MSG = [];

  const ajaxTest3 = async () => {
    const res = await request({
      method: "post",
      url: "/OSL001/connectTest",
      data: {}
    }) 
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error : ", error);
    });
    console.log("===res=== ", res);
  }

  //let [stateCd, setStateCd] = useState("");
  //let [footMsg, setFootMsg] = useState([]);
  let stateCd = "";
  let arrFootMsg = [];
  useLayoutEffect(()=> {
    
    //진행상태조회
    //stateCd = "";

    if(stateCd === "사전심사거절") {
      arrFootMsg = progressFootMsgData.find((data, idx)=> data.name === "PREJUDGE_REJECT_FOOT_MSG").msg;
    }else if(stateCd === "사전심사접수완료") {
      arrFootMsg = progressFootMsgData.find((data, idx)=> data.name === "PREJUDGE_APPLY_COMPLETE_FOOT_MSG").msg;
    }else if(stateCd === "보증심사진행중") {
      arrFootMsg = progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_ING_FOOT_MSG").msg;
    }else if(stateCd === "보증심사거절") {
      arrFootMsg = progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_REJECT_FOOT_MSG").msg;
    }else if(stateCd === "보증심사완료") {
      arrFootMsg = progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_COMPLETE_FOOT_MSG").msg;
    }
  }, []);
  function cbOslBtn() {
    ajaxTest3();
  }
  return (
    <>
      {(!!props.headerNm)&&<OslHeader headerNm={props.headerNm}/>}
      <div className="container">
        <div className="content">
          <div className="content-body pad-b0">
            {/* <div className="c-tit01">1.사전심사 신청과 수신</div> */}
            <div className="section pad-t30">
              <div className="process-wrap">
                <ol className="process-h">
                  <li className="ing">사전심사</li>
                  <li>보증신청</li>
                  <li>대출실행</li>
                </ol>
                <p className="txt-result">
                  <b>사전심사 조건</b>을<br /><b>충족하지 않았습니다.</b>
                </p>
                <div className="info-wrap reject">
                  <div className="info-box">
                    <span className="tit fc-gray">거절사유</span>
                    <span className="txt fc-dark ta-r">이렇게 실패를 하여 실패 하게 되었습니다.</span>
                  </div>
                </div>
                <ul className="txt-msg list-type05">
                  <li>세부 내용은 담당 신용보증기금 고객센터(<a href="tel:15886565">1588-6565</a>)에 문의 바랍니다.</li>
                </ul>
              </div>

              <div className="process-wrap">
                <ol className="process-h">
                  <li className="ing">사전심사</li>
                  <li>보증신청</li>
                  <li>대출실행</li>
                </ol>
                <p className="txt-result">
                  <b>사전심사 접수</b>가<br /><b>완료</b>되었습니다.
                </p>
                <ul className="txt-msg list-type05">
                  <li>사전심사 결과 조회는 당일, 진행 가능 여부는 수일 내 결정하여 통지 드릴 예정이며 네이버 톡톡과 휴대폰 문자메시지로 알려드립니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
    

  )
}

function RejReason(props) {
  
  return (
    <div className="info-wrap reject">
      <div className="info-box">
        <span className="tit fc-gray">거절사유</span>
        <span className="txt fc-dark ta-r">이렇게 실패를 하여 실패 하게 되었습니다.{props.reason}</span>
      </div>
    </div>
  )
}

function FooterMsg(props) {
  return (
    <ul className="txt-msg list-type05">
      {
        props.arrFootMsg.map((data,idx)=> {
          return (
            <li>{data[idx]}</li>
          )
        })
        
      }
    </ul>
  )
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

export default Progress;