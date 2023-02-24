/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useNavigate } from "react-router";
import { useState, useEffect } from "react"
import OslHeader from "../../modules/components/OslHeader"
import OslBtn from "../../modules/components/OslBtn"
import collectData from "../../modules/constants/collectData"
import RadioInlineComponent from "../common/RadioInlineComponent";
import PathConstants from "../../modules/constants/PathConstants";
import API from "../../modules/constants/API";
import AlertModal from "../../modules/components/AlertModal";
import { callLocalApi } from "../../modules/common/tokenBase";

const financeCusLawData = collectData('FinanceCusLaw')
/**
 * 화면명 : 금융 소비자법 대응
 * 설명 : 
 * @param {*} props
 * props항목별 설명
 */
function FinanceCusLaw(props) {

  let arrRadioData = [];
  financeCusLawData.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });
  let arrTextData = [];
  financeCusLawData.find((data) => {
    if (data.type === "text") {
      arrTextData.push(data);
    }
  });
  let [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99]);

  let [disabled, setDisabled] = useState(true);
  
  useEffect(() => {
    console.log(userResult);
    if(!userResult.includes(99)){
      setDisabled(false)
    }
  }, [userResult]);

  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  let navigate = useNavigate();

  const [alertShow, setAlertShow] = useState(false);
  const ALERT_MSG = "해당항목을 선택 및 체크하시기 바랍니다.";
  function cbOslBtn() {
    let param = {

    };
    
    if(userResult.findIndex((data)=> data===99 || data===false) < 0 ) {
      // callLocalApi(
      //   API.LONEXECUTE.FINANCECUSLAW_FNLCLAWCNFR,
      //   param,
      //   (res)=> {
      //     //담화면
      //     navigate(PathConstants.LONEXECUTE_ARSCERTIFICATE);    
      //   }
      // )
      navigate(PathConstants.LONEXECUTE_ARSCERTIFICATE);
    }else {
      
      setAlertShow(true);
      
      console.log(financeCusLawData[userResult.findIndex((data)=> data===99 || data===false)].id);

    }
  }
  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top pad-b30">
              <div className="txt-wrap">
                <h2 className="txt l-txt">
                  계약체결 전 <b>중요사항 안내여부</b> 확인
                </h2>
              </div>
            </div>

            <div className="section pad-t0">
              <ol className="sele-list type02">
                {financeCusLawData.map((data, idx) => {
                  return (
                    <>
                      <li className="item" key={`item-${data.idx}`}>
                        <div className="question-wrap txt-wrap">
                          {(data.id === 0) &&
                            <p className="txt">
                              1. 기업대출금을 주택구입자금 등 기업활동과 무관한 용도로 사용하는 것은 제한되며 이를 위반하는 경우 <em className="fc-01">대출금을 즉시 상환</em>하여야 할 뿐만 아니라 향후 <em className="fc-01">신규대출이 제한</em>될 수 있습니다.<br />
                              확인하셨습니까?
                            </p>
                          }
                          {(data.id === 1) &&
                            <p className="txt">
                              2. 대출계약이 성립한 날로부터 <em className="u-line">3년 이내의 기간</em> 동안에는 약정하신 대출금을 조기상환하는 경우 <em className="fc-01">중도상환해약금이 발생</em>할 수 있습니다.<br />
                              은행 직원으로부터 관련 설명을 받으셨나요? 앞 화면의 중도상환해약금 부분을 확인하셨습니까?
                            </p>
                          }
                          {(data.id === 2) &&
                            <p className="txt">
                              3. 대출의 변제기가 도래하거나 기한의 이익이 상실되었음에도 채무가 상환되지 않는 경우 은행은 담보물을 처분하여 대출금을 상환하는데 이를 사용할 수 있으며, 이 경우 고객님은 담보물에 대한 소유권을 상실할 수 있습니다. <em className="red-16c u-line">이러한 위험에도 불구하고 본 상품에 가입하시겠습니까?</em>
                            </p>
                          }
                        </div>
                        {
                          (data.type === "radio") &&
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
                        }
                      </li>
                      {(data.type === "text") &&
                        <div className="terms-wrap">
                          <ul className="ui-cont-wrap">
                            <CheckBox data={data}
                            idx={idx}
                            userResult={userResult}
                            setUserResult={setUserResult} 
                            checkItems={checkItems}
                            handleSingleCheck={handleSingleCheck}                           
                            />
                          </ul>
                        </div>
                      }

                    </>)
                })}
              </ol>

            </div>
          </div>
          <OslBtn
            obj={{
              type: "button",
              disabled: false,
              text: ["ARS 인증하기"],
              link: "",
              callbackId: cbOslBtn
            }} />
          {alertShow&&
            <AlertModal 
              show={alertShow}
              msg={ALERT_MSG}
              btnNm={["확인"]}
              onClickFn={()=> {
                setAlertShow(false);
              }}
            />
          }
        </div>
      </div>
    </>
  )
}
function CheckBox(props) {
  const data = props.data
  return (
    <li className ="ui-decide" key={`ui-decide${data.id}`}>
      <input type="checkbox" id={data.id}
      checked = {props.checkItems.includes(data.id)? true : false}
      onChange={(e) => {
        props.handleSingleCheck(e.target.checked, data.id)
        let copy = [...props.userResult];
        copy[props.idx] = e.currentTarget.checked;
        props.setUserResult(copy);
      }}
     />
      <label htmlFor={data.id} className="input-label">{data.title}</label>
    </li>
  )
}
export default FinanceCusLaw