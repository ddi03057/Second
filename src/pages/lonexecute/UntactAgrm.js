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

const data = [
  {
    id: 0,
    title: "(필수) 기업대출 상품설명서",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 1,
    title: "(필수) 여신거래약정서(기업용)",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 2,
    title: "(필수) 신용보증약정서",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 3,
    title: "(필수) 신용보증약정 설명서",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 4,
    title: "(필수) 은행여신거래 기본약관(기업용)",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 5,
    title: "(필수) 금리인하요구원 안내 확인서",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 6,
    title: "(필수) 대출신청서",
    type: "text",
    pdfvalue: ""

  },
  {
    id: 7,
    title : "",//큰글자
    content: "",//작은 글자
    type: "check"
  }
  
];

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

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
      setAnswer([true, true, true, true, true, true, true])
      console.log(answer)

    }
    else {
      setCheckItems([]);
      setAnswer([false, false, false, false, false, false, false]);
      console.log(answer)
    }
  }
  const [answer, setAnswer] = useState([99, 99, 99, 99, 99, 99, 99, 99]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const [idxData, setIdxData] = useState(0);


  
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
                <TitleList data={data} />
              </div>
            </div>
            <div className="mid-tit">
              <p className="point-tit">신청 전 유의사항을 꼭 확인해주세요</p>
            </div>
            <div className="section line-tf4">
              <div className="agree-form">
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind" />
                  <label htmlFor="agree_terms_10" className="check-label no-pop">재단의 보증은 ⌈지역신용보증재단법⌋에 의한 특수한 보증으로, ⌈민법⌋상의 보증과는 다소 차이가 있습니다.</label>
                </p>
                <div className="box-chk-add">
                  <ul className="dash-list">
                    <li>- 채권자의 보증채무이행청구시기, 재단의 보증채무이행의 범위, 채권자의 통지의무 등에서 차이가 있습니다.</li>
                  </ul>
                </div>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_11" id="agree_terms_11" className="check-input blind" />
                  <label htmlFor="agree_terms_11" className="check-label no-pop">재단이 보증을 하는 경우에는 보증료를 납부하셔야 합니다.</label>
                </p>
                <div className="box-chk-add">
                  <ul className="dash-list">
                    <li>- 보증을 하는 날에 보증기한까지의 보증료를 미리 납부하셔야 합니다.</li>
                    <li>- 보증료율은 보증금액, 보증기간 등에 따라 최고 연율 2.0%이내에서 결정되며, 정상상환하여 일부 보증료 환급이 있는 경우에 한하여 사전통지 없이 본인계좌로 환급됩니다.</li>
                  </ul>
                </div>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_12" id="agree_terms_12" className="check-input blind" />
                  <label htmlFor="agree_terms_12" className="check-label no-pop">본인에 대하여 이 약정서 제5조에서 정한 사전구상 사유가 발생한 경우 재단은 별도의 사전통지나 독촉절차 없이도 법적조치를 할 수 있습니다.</label>
                </p>
                <div className="box-chk-add">
                  <ul className="dash-list">
                    <li>- 법적조치와 관련하여 재단이 대신 지급한 제비용은 본인이 부담하셔야 합니다.</li>
                  </ul>
                </div>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_13" id="agree_terms_13" className="check-input blind" />
                  <label htmlFor="agree_terms_13" className="check-label no-pop">재단이 채권자에 대하여 보증채무를 이행한 경우, 본인은 보증채무이행 금액과 손해금을 상환하셔야 합니다.</label>
                </p>
                <div className="box-chk-add">
                  <ul className="dash-list">
                    <li>- 손해금율은 법령상의 최고 연율20%의 범위내에서 금융회사의 연체대출금리를 참작하여 재단의 이사회에서 정합니다.</li>
                    <li>- 재단이 보증채무이행으로 취득한 권리의 보전, 이전, 행사 등과 관련하여 비용을 지출한 경우, 본인은 이를 상환하셔야 합니다.</li>
                  </ul>
                </div>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_14" id="agree_terms_14" className="check-input blind" />
                  <label htmlFor="agree_terms_14" className="check-label no-pop">본인은 이 약정서의 중요한 내용 및 보증기업의 채무관련 신용정보 등을 충분히 읽고 확인하였으며, 약정서 사본은 재단 또는 금융회사 모바일앱을 통해 확인하는 것에 동의하는 경우에는 약정서에 서명하여 주시기 바랍니다.<br />
                    * 채무관련 신용정보란 신용정보집중기관으로부터 제공받은 채무자의 대출정보, 채무보증정보, 연체정보, 대위변제・대지급정보 및 부도정보를 말한다.</label>
                </p>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_15" id="agree_terms_15" className="check-input blind" />
                  <label htmlFor="agree_terms_15" className="check-label no-pop">대출실행 후 취소/변경이 불가합니다.</label>
                </p>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_16" id="agree_terms_16" className="check-input blind" />
                  <label htmlFor="agree_terms_16" className="check-label no-pop">이자할부금 등 지급을 지체한 경우, 기본약관 제7조에 불구하고 은행의 통지가 없는 경우에도 여신금액에 대하여 곧 기한 전 채무변제의무가 발생하며 지연배상금률을 적용함에 있어 본인에게 통지 여신만기 도래시 만기도래사실(기간연장 가능여부 포함)에 대한 통지<br />
                    여신실행(기간연장 포함)시 실행사실에 대한 통지</label>
                </p>
                <p className="box-chk">
                  <input type="checkbox" name="agree_terms_17" id="agree_terms_17" className="check-input blind" />
                  <label htmlFor="agree_terms_17" className="check-label no-pop">신용보증 약정서 제3조(보증료 등의 납부)에 의거 납부하여야 할 보증료 등을 대출금이자 자동이체 출금계좌에서 인출하여 수납 처리 하는 것에 동의하며 보증료 등 납부와 관련한 제반사항에 대하여는 신용보증기관에서 정한 방법 및 은행의 자동이체 약관을 따르기로 합니다.</label>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TitleList(props) {
  
  const titleData = props.data;
    

  return (
    <>
      {titleData.map(function (data, idx) {
        if(data.type === "text"){
        return (
          <p className="box-chk">
            <input type="checkbox" name="agree_terms_1" id="agree_terms_1" className="check-input blind" />
            <label htmlFor="agree_terms_1" className="check-label">{data.title}</label>
            <a href="javascript:popup.open('popAgreeTerm1', '');" data-id="" className="btn-pop-arrow" title="(필수) 기업대출 상품설명서"><span className="blind">(필수) 기업대출 상품설명서</span></a>
          </p>
        )}
      })}

    </>
  )

}

function ContentList(props) {

  return(
    <>
    <p className="box-chk">
                  <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind" />
                  <label htmlFor="agree_terms_10" className="check-label no-pop">재단의 보증은 ⌈지역신용보증재단법⌋에 의한 특수한 보증으로, ⌈민법⌋상의 보증과는 다소 차이가 있습니다.</label>
                </p>
                <div className="box-chk-add">
                  <ul className="dash-list">
                    <li>- 채권자의 보증채무이행청구시기, 재단의 보증채무이행의 범위, 채권자의 통지의무 등에서 차이가 있습니다.</li>
                  </ul>
                </div>
    </>
  )
}

export default UntactAgrm;