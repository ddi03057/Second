import axios from 'axios';
import { useLayoutEffect } from 'react';
import Stepper from 'react-stepper-enhanced/lib/Stepper';
//import { Card } from 'react-bootstrap';

import OslHeader from '../../modules/components/OslHeader';

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

  const stepNum = 1;//props.step;
  const status = 0;//props.status;
  

  const stepTitle = [
    {title: '사전심사'}, 
    {title: '보증신청'}, 
    {title: '대출실행'}, 
  ];
  const stepStyle = {
    defaultBarColor: "#000000",
    defaultColor: "#FFFFFF",
    defaultBorderColor: "#E0E0E0",
    defaultBorderStyle: "solid",
    activeColor: "#FFFFFF",
    activeBorderColor: "#5096FF",
    activeBorderStyle: "solid",
    completeColor: "#5096FF",
    completeBorderColor: "#5096FF",
    completeBorderStyle: "solid",
  }
  const btnTxt = ()=> {
    if(stepNum === 0) { 
      return "보증 신청";
    }else if(stepNum === 1) {
      if(status === 1) {
        return "보증 신청 취소";
      }else if(status === 2) {
        return "보증 확인 및 대출 실행";
      }else {
        return null;
      }
    }else {
      return null;
    }
  }
  const getJosa = (word) => checkBatchimEnding(word)?"이":"가";

  // const ajaxTest1 = () => axios.get("/api3/fup/customer/form/2017110617593821483973066352935.pdf").then((response)=>{
  //   console.log(response);
  // })
  // .catch(()=>{
  //   console.log("fail");
  // })
  // const ajaxTest2 = () => axios.get('/api1/search?q=title:"Drosophila"%20and%20body:"RNA"&fl=id&start=1&rows=100').then((response)=>{
  //   console.log(response.data.response.docs);
  // })
  // .catch(()=>{
  //   console.log("fail");
  // })
  const axiosHeaders = {
    'Content-type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'appKey': 'l7xxQr5uo10vlnRn1rlPNUmCRsDbOPSxJZOL'
  };
  console.log(JSON.parse(axiosHeaders));
  const ajaxTest3 = () => axios.post("/api1/BoxUi/OSL001/connectTest",{},{headers: {'Content-type': 'application/json; charset=utf-8',
  'Accept': 'application/json',
  'appKey': 'l7xxQr5uo10vlnRn1rlPNUmCRsDbOPSxJZOL'}}).then((response)=>{
    console.log(response);
  })
  
  const stateCd = "";
  useLayoutEffect(()=> {
    ajaxTest3();
    //상태코드 세팅
    //stateCd = "";
  }, []);

  return (
    <>
      {(!!props.headerNm)&&<OslHeader headerNm={props.headerNm}/>}
      <div className="container">
        <div className="content">
          <div className="content-body pad-b0">
            <div className="c-tit01">1.사전심사 신청과 수신</div>
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

              {/* <div className="process-wrap">
                <ol className="process-h">
                  <li className="complete">사전심사</li>
                  <li>보증신청</li>
                  <li>대출실행</li>
                </ol>
                <p className="txt-result">
                  <b>사전심사 승인</b>이<br /><b>완료</b>되었습니다.
                </p>
                <button type="button" className="btn btn-lg default-bg">
                  <span className="txt">보증 신청</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>      
      {/* <Card>
        <Card.Header style={{backgroundColor: "#FFFFFF", borderBottom: "0"}}>
          <Stepper 
            circleFontSize      ={ 0 }
            lineMarginOffset    ={ 0 }
            titleFontSize       ={ 20 }
            size                ={ 28 }
            steps               ={ stepTitle } 
            activeStep          ={ (status==2)?stepNum+1:stepNum } 
            defaultBarColor     ={ stepStyle.defaultBarColor }
            defaultColor        ={ stepStyle.defaultColor }
            defaultBorderColor  ={ stepStyle.defaultBorderColor }
            defaultBorderStyle  ={ stepStyle.defaultBorderStyle }
            activeColor         ={ (status==2)?stepStyle.defaultColor:stepStyle.activeColor }
            activeBorderColor   ={ (status==2)?stepStyle.defaultBorderColor:stepStyle.activeBorderColor }
            activeBorderStyle   ={ (status==2)?stepStyle.defaultBorderStyle:stepStyle.activeBorderStyle }
            completeColor       ={ stepStyle.completeColor }
            completeBorderColor ={ stepStyle.completeBorderColor }
            completeBorderStyle ={ stepStyle.completeBorderStyle } 
          />
        </Card.Header>
        <Card.Body>
          <Card.Title style={{fontSize: "30px"}}>
            {(status===0)&& <>{stepTitle[stepNum].title} 조건을 충족하지 않았습니다.</>}
            {(status===1)&& <>{stepTitle[stepNum].title + getJosa(stepTitle[stepNum].title)} 진행중입니다.</>}
            {(status===2)&& <>{stepTitle[stepNum].title + getJosa(stepTitle[stepNum].title)} 완료되었습니다.</>}
          </Card.Title>
          <Card.Text style={{textAlign: "left"}}>
            {(status===0)&& <>거절사유</>}
          </Card.Text>
          {(status===2 && stepNum!=2)&&
           <>버튼</> 
          }
        </Card.Body>
        <Card.Footer style={{backgroundColor: "#FFFFFF", borderTop: "0"}}>
          {(status===0)&& <>*심사 거절 사유 등 기타 궁금하신 사항은 해당 지역 담당 지역보증재단에 문의하시기 바랍니다.</>}
          {(status===2 && stepNum===0)&& <>*오늘 보증신청을 접수하지 않으면 자동으로 취소됩니다. 보증 신청을 진행해주세요.</>}
          {(status===2 && stepNum===1)&& <>*보증승인일로부터 30일 이내에 대출실행을 완료해주시기 바랍니다. 경과 시 보증승인은 자동 취소됩니다.</>}
          {}
        </Card.Footer>
      </Card> */}
    </>
    

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