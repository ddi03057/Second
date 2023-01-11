/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import { useState } from "react";
import OslHeader from "../../../modules/components/OslHeader";

const data = [
    {
        id: 1,
        title: "(필수) 개인(신용)정보 수집 이용 및 제공관련 고객권리 안내문",
        contents: "-고유식별정보 수집.이용.제공.조회.동의\n -개인(신용)정보 수집.이용.제공.조회 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2017110617593821483973066352935.pdf"

    },
    {
        id: 2,
        title: "(필수) 개인(신용)정보 수집 이용 동의, 고유식별번호 수집 이용 동의",
        contents: "-고유식별정보 수집.이용.제공 동의\n -개인(신용)정보 수집.이용.제공 동의",
        type: "text",

        agree: "동의",
        pdfvalue: "/fup/customer/form/2019031909261764480323824044447.pdf"
    },
    {
        id: 3,
        title: "(필수) 개인(신용)정보 수집이용 제공 동의(여신금융거래)",
        contents: "-공공기관 전산정보 열람.이용 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2020262473283826319128117808560.pdf"


    },
    {
        id: 4,
        title: "(필수) 개인(신용)정보 수집이용 제공 동의(비여신금융거래)",
        contents: "-고유식별정보 및 개인(신용)정보수집.이용.제공.조회.동의\n -신용등급 하락가능성 및 고객권리확인 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2022053115131329259593606625324.pdf"

    },
    {
        id: 5,
        title: "(필수) 개인정보 및 기업정보의 수집·이용·제공 활용 동의서(신용보증기금)",
        contents: "-신용정보 수집.이용.제공.조회동의\n -중소기업 지원사업 통합관리시스템 정보수집.조회.활용 동의\n -금융거래정보이용에관한 사항동의\n -수출 및 인증정보이용에 관한 사항 동의\n -세무회계자료의 전자적 제출에 관한 사항 동의\n -행정정보활용에 관한 사항 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2022053115164629259806850189960.pdf"

    },
    {
        id: 6,
        title: "(필수) 중소기업지원사업 통합관리 시스템 정보 활용을 위한 동의서(신용보증기금)",
        contents: "-고유식별정보 수집.이용.제공 동의\n -개인(신용)정보 및 행정정보 제3자 제공 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2022021612253920263835375609685.pdf"

    },
    {
        id: 7,
        title: "(필수) 여신금융협회 이용약관 동의",
        contents: "-개인 정보 수집.이용 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2022060710060229845969269035242.pdf"

    },
    {
        id: 8,
        title: "(필수) 여심금융협회 개인정보 수집 및 이용",
        contents: "-개인 정보 수집.이용 동의",
        type: "text",
        agree: "동의",
        pdfvalue: "/fup/customer/form/2022060710060229845969269035242.pdf"

    },

];


/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function CustAgree(props) {

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

    const headerNm = props.headerNm;

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
                                {data.map(function (data, idx) {
                                    return (
                                        <>
                                            <p key={`key-${data.id}`} className="box-chk">
                                                <input
                                                    type="checkbox"
                                                    key={`agree-terms-${data.id}`}
                                                    name="agree_terms"
                                                    checked={checkItems.includes(data.id) ? true : false}
                                                    id={idx}
                                                    className="check-input blind"
                                                    onChange={(e) => {
                                                        handleSingleCheck(e.target.checked, data.id)
                                                        let copy = [...answer];
                                                        copy[idx] = e.currentTarget.checked;
                                                        setAnswer(copy);
                                                        console.log(answer)
                                                    }} />
                                                <label htmlFor={idx} className="check-label">{data.title}</label>
                                                <a data-id=""
                                                    className="btn-pop-arrow"
                                                    onClick={() => {
                                                        handleShow(true);
                                                    }}
                                                />

                                            </p>
                                        </>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="section line-tf4">
                            <p className="mar-t10 mar-b30 point-tit">신청 전 유의사항을 꼭 확인해주세요</p>
                            <div className="agree-form">
                                <p className="box-chk">
                                    <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind" />
                                    <label htmlFor="agree_terms_10" className="check-label">IBK기업은행에 상담 중인 대출이 없습니다.</label>
                                </p>
                                <p className="box-chk">
                                    <input type="checkbox" name="agree_terms_11" id="agree_terms_11" className="check-input blind" />
                                    <label htmlFor="agree_terms_11" className="check-label">기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다.</label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function validCheck(answer) {

    let msg = [];
    const diffAnswer = [true, true, true, true, true, true, true, true];
    for (let idx = 0; idx < answer.length; idx++) {
        if (diffAnswer[idx] != answer[idx]) {
            msg[0] = idx;
            msg[1] = data[idx].msg;
            return msg;
            console.log(msg)
        }
    }
    return "";
}


export default CustAgree;