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

const stampTaxData = collectData('StampTax')
/**
 * 화면명 : 인지세 화면
 * 설명 : 
 * @param {*} props
 * props항목별 설명
 */
function StampTax(props) {

  let arrRadioData = [];
  stampTaxData.find((data) => {
    if (data.type === "radio") {
      arrRadioData.push(data);
    }
  });


  let [userResult, setUserResult] = useState([99,99,99,99,99,99]);

  useEffect(() => {
    console.log(userResult)
    if(userResult.find((data,idx)=> data === 99) === 99) {
      setVisible2(false);
      setVisible1(false);
    }
    else if(userResult.find((data,idx)=> data===0) === undefined) {
      //all 해당하지않음
      setVisible2(true);
      setVisible1(false);
    }else {
      setVisible2(false);
      setVisible1(true);
    }
    // if (userResult[0] === 1 && userResult[1] === 1 && userResult[2] === 1 && userResult[3] === 1 && userResult[4] === 1 && userResult[5] === 1) {
    //   setVisible(!visible)
    // } else if (userResult[5] === 0 || userResult[0] === 0 || userResult[1] === 0 || userResult[2] === 0 || userResult[3] === 0 || userResult[4] === 0){
    //   setVisible1(!visible)
    // }

    
  },[userResult]);

  useEffect(()=>{
    if(checkItems.length > 1){
      setDisabled(false)
    }
  })
  const [visible2, setVisible2] = useState(false);
  const [visible1, setVisible1] = useState(false);

  let [disabled, setDisabled] = useState(true);

  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  function cbOslBtn(){

  }
  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body certified">
            <div className="content-top pad-b40 line-be4">
              <div className="txt-wrap">
                <p className="txt l-txt">
                  <b>인지세 면제대상 여부 확인</b>을<br />
                  위해 정보를 선택해 주세요.
                </p>
              </div>
            </div>
            <div className="section pad-t20 line-tf4">
              <div className="form-group-wrap">
                <div className="form-group">
                  <div className="txt-wrap">
                    <label htmlFor="inp01" className="txt fc-gray">창업일</label>
                  </div>
                  <div className="inp-wrap">
                    <input type="text" id="inp01" value="2020.10.10" className="inp type01" disabled />
                  </div>
                  <p className="box-chk fc-gray">
                    <input type="checkbox" id="inp01_chk" className="check-input blind" defaultChecked />
                    <label htmlFor="inp01_chk" className="check-label">사업개시일로부터 2년 이내에 해당</label>
                  </p>
                </div>
                <div className="form-group">
                  <div className="txt-wrap">
                    <label htmlFor="inp02" className="txt fc-gray">업종</label>
                  </div>
                  <div className="inp-wrap">
                    <input type="text" id="inp02" value="도소매업" className="inp type01" disabled />
                  </div>
                  <p className="box-chk fc-gray">
                    <input type="checkbox" id="inp02_chk" className="check-input blind" defaultChecked />
                    <label htmlFor="inp02_chk" className="check-label">
                      일반 유흥주점업, 무도 유흥주점업,
                      기타 사행시설 관리 및 운영업에
                      해당하지 않음
                    </label>
                  </p>
                </div>
              </div>

              <div className="sele-list-wrap">
                <h2 className="fc-gray">창업 형태</h2>

                <ol className="sele-list type02">
                  {stampTaxData.map((data, idx) => {

                    return (
                        <li className="item" key={`li${data.id}`}>
                          <div className="question-wrap txt-wrap">
                            <p className="txt">
                              {data.title}
                            </p>
                          </div>
                          {(data.type === "radio") &&
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
                    )
                  })}
                </ol>
              </div>
              {visible1 && <Check1 data= {stampTaxData}
                            userResult={userResult}
                            setUserResult={setUserResult} 
                            checkItems={checkItems}
                            handleSingleCheck={handleSingleCheck}/>}
              {visible2 && <Check2  data={stampTaxData}
                            userResult={userResult}
                            setUserResult={setUserResult} 
                            checkItems={checkItems}
                            handleSingleCheck={handleSingleCheck}/>}
            </div>
            <div className="ui-cont-wrap line-tf4">
              <div className="ui-decide">
                <input type="checkbox" id="checkbox02"
                checked= {checkItems.includes(stampTaxData[6].checkId)? true : false}
                onChange={(e)=>{
                  handleSingleCheck(e.target.checked, stampTaxData[6].checkId)
                 
                }}/>
                <label htmlFor="checkbox02" className="input-label">
                  본인은 위 확인서의 중요한 내용에 대하여 설명을 듣고 이해하였으며, 이로 인하여 발생되는 손해에 대해서는 아무런 이의를 제기하지 않겠습니다.
                </label>
              </div>
            </div>
          </div>
          <OslBtn
              obj={{
                type: "button",
                disabled: disabled,
                text: ["다음"],
                link: "",
                callbackId: cbOslBtn
              }} />
        </div>
      </div>
    </>
  )
}
function Check1(props) {
  return (
    <>
      <div className="terms-wrap">
        <h2 className="txt fc-gray">확인 사항</h2>

        <div className="ui-cont-wrap">
          <div className="ui-decide">
            <input type="checkbox" id="checkbox01"
            checked= {props.checkItems.includes(stampTaxData[7].checkId)? true : false}
            onChange={(e)=>{
              props.handleSingleCheck(e.target.checked, stampTaxData[7].checkId)
            }}/>
            <label htmlFor="checkbox01" className="input-label">
              본인은 「조세특례제한법」 제116조제1항제19호에 따른 <em>인지세 면제 대상이 아님을 확인합니다.</em>
            </label>
          </div>
          
        </div>
      </div>


    </>
  )
}

function Check2(props) {
  return (
    <>
    <div className="terms-wrap">
        <h2 className="txt fc-gray">확인 사항</h2>

        <div className="ui-cont-wrap">
          <div className="ui-decide">
            <input type="checkbox" id="checkbox01"
            checked= {props.checkItems.includes(stampTaxData[8].checkId)? true : false}
            onChange={(e)=>{
              props.handleSingleCheck(e.target.checked, stampTaxData[8].checkId)
              
            }}/>
            <label htmlFor="checkbox01" className="input-label">
              본인은 「조세특례제한법」 제116조제1항제19호에 따른 <em>인지세 면제를 신청합니다.</em>
            </label>
          </div>
          <div className="txt-wrap mar-t10">
            <p className="txt s-txt fc-r">※ 향후 인지세 면제 대상이 아닌 것으로 판명되는 경우,「국세기본법」제47조의4제9항에 의거, 납부하지 아니한 세액의 300%에 상당하는 금액이 가산세로 부과될 수 있습니다.</p>
          </div>
        </div>
      </div>
      
    </>
  )
}
export default StampTax;