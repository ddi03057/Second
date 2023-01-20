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
import OslBtn from "../../modules/components/OslBtn";
import OslHeader from "../../modules/components/OslHeader";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
import FullModal from "../../modules/components/FullModal";

const untactAgrmData = collectData("UntactAgrm");

function UntactAgrm(props) {

  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  let [arrPdfData, setArrPdfData] = useState([]);

  const [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [idxData, setIdxData] = useState(0);

  function cbOslBtn() {

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
                <TitleList data={untactAgrmData}
                  checkItems={checkItems}
                  setCheckItems={setCheckItems}
                  handleSingleCheck={handleSingleCheck}
                  userResult={userResult}
                  setUserResult={setUserResult} />
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
                  handleSingleCheck={handleSingleCheck}
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
        />
      }
    </>
  )
}

function TitleList(props) {

  const titleData = props.data;


  return (
    <>
      {titleData.map(function (data, idx) {
        if (data.type === "text") {
          return (
            <p className="box-chk"
              key={`box-chk-${data.id}`}>
              <input type="checkbox"
                key={`agree-terms-${data.id}`}
                name="agree_terms_1"
                id={idx}
                className="check-input blind"
                checked={props.checkItems.includes(data.id) ? true : false}
                onChange={(e) => {
                  props.handleSingleCheck(e.target.checked, data.id);
                  let copy = [...props.userResult];
                  copy[idx] = e.currentTarget.checked
                  props.setUserResult(copy);
                  console.log(props.userResult)
                }}


              />
              <label htmlFor={idx} className="check-label">{data.title}</label>
              <a href="javascript:popup.open('popAgreeTerm1', '');" data-id="" className="btn-pop-arrow" title="(필수) 기업대출 상품설명서"><span className="blind">(필수) 기업대출 상품설명서</span></a>
            </p>
          )
        }
      })}

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