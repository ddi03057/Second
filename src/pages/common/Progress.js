import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
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

  const [procing, setProcing] = useState(["", "", ""]);
  //let [stateCd, setStateCd] = useState("");
  //let [footMsg, setFootMsg] = useState([]);
  let [stateCd, setStateCd] = useState("");
  let rejectReason = "";
  
  let [arrFootMsg, setArrFootMsg] = useState([]);

  useLayoutEffect(()=> {
    
    //진행상태조회 axois
    setStateCd("보증심사진행중");
    //axios end
    
    //rejectReason
    console.log(stateCd);
    console.log(arrFootMsg);
  }, []);
  useLayoutEffect(()=> {
    if(stateCd === "사전심사거절") {
      setProcing(["ing", "", ""]);
      setArrFootMsg([...progressFootMsgData.find((data, idx)=> data.name === "PREJUDGE_REJECT_FOOT_MSG").msg]);
      rejectReason = "";
    }else if(stateCd === "사전심사접수완료") {
      setProcing(["ing", "", ""]);
      setArrFootMsg([...progressFootMsgData.find((data, idx)=> data.name === "PREJUDGE_APPLY_COMPLETE_FOOT_MSG").msg]);
    }else if(stateCd === "보증심사진행중") {
      setProcing(["", "ing", ""]);
      setArrFootMsg([...progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_ING_FOOT_MSG").msg]);
    }else if(stateCd === "보증심사거절") {
      setProcing(["", "ing", ""]);
      setArrFootMsg([...progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_REJECT_FOOT_MSG").msg]);
      rejectReason = "";
    }else if(stateCd === "보증심사완료") {
      setProcing(["", "complete", ""]);
      setArrFootMsg([...progressFootMsgData.find((data, idx)=> data.name === "GRTJUDGE_COMPLETE_FOOT_MSG").msg]);
    }else {
      setProcing(["", "", "complete"]);
    }
  }, [stateCd]);

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
                  <li className={procing[0]}>사전심사</li>
                  <li className={procing[1]}>보증신청</li>
                  <li className={procing[2]}>대출실행</li>
                </ol>
                <p className="txt-result">
                  {stateCd==="사전심사거절"&&<><b>사전심사 조건</b>을<br /><b>충족하지 않았습니다.</b></>}
                  {stateCd==="사전심사접수완료"&&<><b>사전심사 접수</b>가<br /><b>완료</b>되었습니다.</>}
                  {stateCd==="보증심사진행중"&&<><b>보증 심사</b>가 <b>진행중</b>입니다.</>}
                  {stateCd==="보증심사거절"&&<><b>보증 심사 조건</b>을<br /><b>충족하지 않았습니다.</b></>}
                  {stateCd==="보증심사완료"&&<><b>보증 심사</b>가<br /><b>완료</b>되었습니다.</>}
                  {stateCd==="대출실행완료"&&<><b>대출 실행</b>이<br /><b>완료</b>되었습니다.</>}
                </p>
                {
                  (stateCd==="보증심사진행중" || stateCd==="보증심사거절" || stateCd==="대출실행완료")&&
                    <StateInfo stateInfoList={null} styleWrap={stateCd==="대출실행완료"?"info-wrap pad-b0 tit-nowrap":"info-wrap pad-t0 pad-b20"}/>
                }
                {
                  stateCd === "사전심사거절"&&
                    <RejReason rejectReason={rejectReason} />
                }
                {
                  arrFootMsg.length > 0&&
                    <FooterMsg arrFootMsg={arrFootMsg} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
    

  )
}

function StateInfo(props) {
  let styleWrap = "";
  return (
    <>
    <div className={props.styleWrap}>
      {/* {
        props.stateInfoList.map((data, idx)=> {
          data.nm?예상보증료
          return (
            <div className="info-box">
              <span className="tit fc-gray">{data.nm}</span>
              <span className={`txt fc-dark ta-r`}>{data.value}</span>
            </div>
          )
        })
      } */}
      <div className="info-box">
          <span className="tit fc-gray">신청일자</span>
          <span className="txt fc-dark ta-r">2021.06.22</span>
      </div>
      <div className="info-box">
          <span className="tit fc-gray">대출금액</span>
          <span className="txt fc-dark ta-r">30,450,000원</span>
      </div>
      <div className="info-box">
          <span className="tit fc-gray">대출이자</span>
          <span className="txt fc-dark ta-r">0.00%<br /><span className="fs14 fc-lightGray ta-r">(기준금리 0.00% + 가산금리 0.00%)</span></span>
      </div> 
      <div className="info-box">
          <span className="tit fc-gray">대출 실행일</span>
          <span className="txt fc-dark ta-r">2021.07.02</span>
      </div>
      <div className="info-box">
          <span className="tit fc-gray">거치기간 만료일</span>
          <span className="txt fc-dark ta-r">2022.07.02</span>
      </div>
      <div className="info-box">
          <span className="tit fc-gray">대출 만료일</span>
          <span className="txt fc-dark ta-r">2026.07.02</span>
      </div>
      <div className="info-box">
          <span className="tit fc-gray">이자지급시기</span>
          <span className="txt fc-dark ta-r">매월 10일</span>
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
        <span className="txt fc-dark ta-r">{props.reason}</span>
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
            <li>{data}</li>
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