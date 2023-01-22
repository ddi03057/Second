/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
/**
 * 화면명 : 대출 약관 동의
 * 설명
 * @param {*} props
 * props항목별 설명
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../modules/components/OslBtn";
import OslHeader from "../../modules/components/OslHeader";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
import FullModal from "../../modules/components/FullModal";

const untactAgrmData = collectData("UntactAgrm");

function UntactAgrm(props) {

  const [checkItems, setCheckItems] = useState([99,99,99,99,99,99,99]);


  const [isChecked, setIsChecked] = useState([false,false,false,false,false,false,false]);


  let [arrPdfData, setArrPdfData] = useState([]);

  const [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [idxData, setIdxData] = useState(0);

  function cbOslBtn() {
    setArrPdfData(untactAgrmData);
    handleShow(true);
  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top">
              <p className="top-tit"><span className="fw-b">신규 대출신청</span>을 위해 다음<br />
                <span className="fw-b">항목에 동의</span>해 주세요
              </p>
            </div>
            <div className="section line-tf4">
              <div className="agree-form">
                {untactAgrmData.map(function(data,idx){
                  {if (data.type === "pdf"){
                  return(
                    <p key={`p-${idx}`} className="box-chk">
                      <input
                        type="checkbox"
                        key={`agree-terms-${data.id}`}
                        name="agree_terms"
                        checked={checkItems[idx]===99?false:checkItems[idx]===0?false:true
                          // (checkItems[idx] === 99)? :(checkItems[idx]===1)?setIsChecked(true):setIsChecked(false)
                        }
                        id={idx}
                        className="check-input blind"
                        onChange={(e)=>{
                          if(checkItems[idx] != 99){
                            let copy = [...checkItems];
                            copy[idx] = copy[idx]===0?1:0;
                            setCheckItems(copy);
                          }
                        }}
                      />
                      <label htmlFor={idx} className="check-label">{data.title}</label>
                      <a data-id=""
                        className="btn-pop-arrow"
                        onClick={() => {
                          setArrPdfData([untactAgrmData[data.id]]);
                          handleShow(true);
                          //모달창에서 확인 버튼 누를시 전체 동의 로직 만들어야함
                        }}
                      />

                    </p>
                
                  )}}
                })}
              </div>
            </div>
            <div className="mid-tit">
              <p className="point-tit">신청 전 유의사항을 꼭 확인해주세요</p>
            </div>
            <div className="section line-tf4">
              <div className="agree-form">
                <ContentList data={untactAgrmData}
                  checkItems={checkItems}
                  setCheckItems={setCheckItems}
                  userResult={userResult}
                  setUserResult={setUserResult} />
              </div>
            </div>
            <OslBtn
              obj={{
                type: "button",
                disabled: false,
                text: ["모두 동의하고 다음"],
                link: "",
                callbackId: cbOslBtn
              }} />
          </div>
        </div>
      </div>
      {show&&
        <FullModal
          showYn={show}
          handleClose={handleClose}
          headerNm="약관 동의"
          content={arrPdfData}
          type="pdf"
          disabledYn={true}
          footerNm="확인"
          onClickFn={(contId)=>{
            console.log(contId,typeof contId)
            if(typeof contId === "number") {
              let copy = [...checkItems];
              copy[contId] = 1;
              setCheckItems(copy);
            }else {
              setCheckItems([1,1,1,1,1,1,1]);
            }
            
          }}
        />
      }
    </>
  )
}



function ContentList(props) {

  const titleData = props.data;

  return (
    <>
      {titleData.map(function (data, idx) {
        if (data.type === "check") {
          return (
            <>
              <p className="box-chk"
                key={`box-chk1-${data.id}`}>
                <input type="checkbox" name="agree_terms_11" id={idx} className="check-input blind" />
                <label htmlFor={idx} className="check-label no-pop">{data.title}</label>
              </p>
              <div className="box-chk-add">
                <ul className="dash-list">
                  <li>{data.content}</li>
                </ul>
              </div>
            </>
          )
        } else if (data.type === "check1") {
          return (
            <>
              <p className="box-chk" key={`box-chk2-${data.id}`}>
                <input type="checkbox" name="agree_terms_11" id={idx} className="check-input blind" />
                <label htmlFor={idx} className="check-label no-pop">{data.title}</label>
              </p>
              <div className="box-chk-add">
                <ul className="dash-list">
                  <li>{data.contentList[0].content1}</li>
                  <li>{data.contentList[1].content2}</li>
                </ul>
              </div>
            </>
          )
        }
      })}
    </>
  )
}



export default UntactAgrm;