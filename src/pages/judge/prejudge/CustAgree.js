/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */


import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";
import PathConstants from "../../../modules/constants/PathConstants";
import collectData from "../../../modules/constants/collectData.js";
import request from "../../../modules/utils/Axios";
import FullModal from "../../../modules/components/FullModal";
import API from "../../../modules/constants/API.js";


const custAgreeData = collectData("CustAgree");
/**
 * 화면명 : 약관동의
 * 설명 : 사전심사 - 정보조회 약관동의
 * @param {*} props
 * props항목별 설명
 */
function CustAgree(props) {

  const [checkItems, setCheckItems] = useState([99, 99, 99, 99, 99, 99, 99]);

  const [userResult, setUserResult] = useState([99, 99, 99, 99, 99, 99, 99, 99]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [idxData, setIdxData] = useState(0);

  const headerNm = props.headerNm;

  let navigate = useNavigate();

  let [arrPdfData, setArrPdfData] = useState([]);

  const [isChecked, setIsChecked] = useState([false, false, false, false, false, false, false]);

  // useEffect(()=> {
  //   console.log("useEffect[checkItems]",checkItems);

  //   checkItems.map((data, idx)=> {
  //     let copy = [...isChecked];
  //     if(data === 1) {

  //       copy[idx] = true;

  //     }else {

  //       copy[idx] = false;

  //     }
  //     setIsChecked(copy);
  //   })
  // }, [checkItems]);
  // useEffect(()=> {
  //   console.log("useEffect[isChecked]", isChecked);

  // }, [isChecked])
  function cbOslBtn() {
    setArrPdfData(custAgreeData);
    handleShow(true);
    if (checkItems.includes(99)) {
      console.log(false)
    } else {
      navigate(
        PathConstants.PREJUDGE_SUITTEST,
        
      );
    }

  }

  const [response, setResponse] = useState();

  const custAgree = async () => {
    const res = await request({
      method: "post",
      url: API.PREJUDGE_CUSTAGREE,
      data: {}
    })
      .then((response) => {
        console.log(response);
        //setResponse(response);
        return response;
      })

      .catch((error) => {
        console.log("error : ", error);
      });
  }


  return (
    <>
      <OslHeader headerNm={headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top">
              <p className="top-tit"><strong>온라인 플랫폼 입점 소상공인<br />
                보증부대출</strong>을 위해 다음 항목에<br />
                동의해 주세요
              </p>
              <p className="top-txt">
                대출 한도 조회용으로 고객님의 정보를 수집합니다. <span className="fc-r">신용도에는 영향이 없으니 안심하세요.</span>
              </p>
            </div>

            <div className="section line-tf4">
              <div className="agree-form">
                {custAgreeData.map(function (data, idx) {
                  return (
                    <p key={`p-${idx}`} className="box-chk">
                      <input
                        type="checkbox"
                        key={`agree-terms-${data.id}`}
                        name="agree_terms"
                        checked={checkItems[idx] === 99 ? false : checkItems[idx] === 0 ? false : true
                          // (checkItems[idx] === 99)? :(checkItems[idx]===1)?setIsChecked(true):setIsChecked(false)
                        }
                        id={idx}
                        className="check-input blind"
                        onChange={(e) => {
                          if (checkItems[idx] != 99) {
                            let copy = [...checkItems];
                            copy[idx] = copy[idx] === 0 ? 1 : 0;
                            setCheckItems(copy);
                          }
                        }}
                      />
                      <label htmlFor={idx} className="check-label">{data.title}</label>
                      <a data-id=""
                        className="btn-pop-arrow"
                        onClick={() => {
                          setArrPdfData([custAgreeData[data.id]]);
                          handleShow(true);
                          //모달창에서 확인 버튼 누를시 전체 동의 로직 만들어야함
                        }}
                      />

                    </p>
                  )
                })}
              </div>
            </div>

            <div className="section line-tf4">
              <p className="mar-t10 mar-b30 point-tit">신청 전 유의사항을 꼭 확인해주세요</p>
              <div className="agree-form">
                <p key="key-000" className="box-chk">
                  <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind" />
                  <label htmlFor="agree_terms_10" className="check-label">IBK기업은행에 상담 중인 대출이 없습니다.</label>
                </p>
                <p key="key-001" className="box-chk">
                  <input type="checkbox" name="agree_terms_11" id="agree_terms_11" className="check-input blind" />
                  <label htmlFor="agree_terms_11" className="check-label">기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다.</label>
                </p>
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
      {show &&
        <FullModal
          showYn={show}
          handleClose={handleClose}
          headerNm="약관 동의"
          content={arrPdfData}
          type="pdf"
          disabledYn={true}
          footerNm="확인"
          onClickFn={(contId) => {
            console.log(contId, typeof contId)
            if (typeof contId === "number") {
              let copy = [...checkItems];
              copy[contId] = 1;
              setCheckItems(copy);
            } else {
              setCheckItems([1, 1, 1, 1, 1, 1, 1]);
            }

          }}

        />
      }
    </>
  );
}


function validCheck(userResult) {

  let msg = [];
  const diffAnswer = [true, true, true, true, true, true, true, true];
  for (let idx = 0; idx < userResult.length; idx++) {
    if (diffAnswer[idx] != userResult[idx]) {
      msg[0] = idx;
      msg[1] = custAgreeData[idx].msg;
      return msg;
      console.log(msg)
    }
  }
  return "";
}


export default CustAgree;