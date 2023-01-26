import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";
import FullModal from "../../../modules/components/FullModal";
import PathConstants from "../../../modules/constants/PathConstants";
import collectData from "../../../modules/constants/collectData.js";
const custAgreeData = collectData("CustAgree");

/**
 * 컴포넌트명 : 약관동의
 * 설명 : 사전심사 - 정보조회 약관동의
 * @param {*} props
 * props항목별 설명
 */
function CustAgree(props) {

  //하단 동의하기버튼명
  const ALL_BTN_NM = "모두 동의하고 다음";
  const ONE_BTN_NM = "동의하고 다음";

  /**
   * 체크항목 state
   * 초기값    99
   * 체크해제  0
   * 체크      1
   */
  const [checkItems, setCheckItems] = useState([99,99,99,99,99,99,99,99,99]);

  const [agreeBtnNm, setAgreeBtnNm] = useState(ALL_BTN_NM); //동의버튼명 state
  const [disabledYn, setDisabledYn] = useState(false); //동의버튼활성화여부 state

  //모달 show/hide function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //모달 show여부 state
  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  let [arrPdfData, setArrPdfData] = useState([]);

  //체크상태로 밸리데이션체크 겸 버튼상태변경 및 다음화면이동 
  useEffect(()=> {
    console.log("useEffect[checkItems]",checkItems);
    if(checkItems.filter((data)=> data === 1).length === 9 && agreeBtnNm === ALL_BTN_NM) { //모두동의하고 다음 클릭 > 팝업 확인 > 모두체크상태
      //다음화면이동
      navigate(PathConstants.PREJUDGE_SUITTEST);
    }else if(checkItems.find((data)=> data === 1) && (!!checkItems.find((data)=> data === 99) || checkItems.findIndex((data)=> data === 0) >-1 )) { //한개이상 체크 및 한개이상 체크해제상태
      setAgreeBtnNm(ONE_BTN_NM);
      setDisabledYn(true);
    }else if(checkItems.filter((data)=> data === 0 || data === 99).length === 9) { // 모두 해제상태 및 초기상태
      setAgreeBtnNm(ALL_BTN_NM);
      setDisabledYn(false);
    }else { //모두체크 상태
      setAgreeBtnNm(ONE_BTN_NM);
      setDisabledYn(false);
    }
  }, [checkItems]);

  //동의하기버튼 콜백
  function cbOslBtn() {
    if(agreeBtnNm === ALL_BTN_NM) { //모두동의하고다음
      setArrPdfData(custAgreeData);
      handleShow(true);
    }else { //동의하고다음
      //다음화면이동
      navigate(PathConstants.PREJUDGE_SUITTEST);
    }
  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
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
                        checked={checkItems[idx]===99?false:checkItems[idx]===0?false:true}
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
                          setArrPdfData([custAgreeData[data.id]]);
                          handleShow(true);
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
                  <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind" 
                    onChange={(e)=>{
                      
                      let copy = [...checkItems];
                      copy[7] = copy[7]===0||copy[7]===99?1:0;
                      setCheckItems(copy);
                      
                    }}
                  />
                  <label htmlFor="agree_terms_10" className="check-label">IBK기업은행에 상담 중인 대출이 없습니다.</label>
                </p>
                <p key="key-001" className="box-chk">
                  <input type="checkbox" name="agree_terms_11" id="agree_terms_11" className="check-input blind" 
                    onChange={(e)=>{
                      
                      let copy = [...checkItems];
                      copy[8] = copy[8]===0||copy[8]===99?1:0;
                      setCheckItems(copy);
                      
                    }}
                  />
                  <label htmlFor="agree_terms_11" className="check-label">기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다.</label>
                </p>
              </div>
            </div>
            <OslBtn
              obj={{
                type: "button",
                disabled: disabledYn,
                text: [agreeBtnNm],
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
              setCheckItems([1,1,1,1,1,1,1,1,1]);
            }
            
          }}
          
        />
      }
    </>
  );
}

export default CustAgree;