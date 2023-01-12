/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import OslHeader from "../../../modules/components/OslHeader";
const custAgreeData = [
  {
    id:1,
    title : "[필수] 개인(신용정보 조회 동의서)",
    contents: "-고유식별정보 수집.이용.제공.조회.동의\n -개인(신용)정보 수집.이용.제공.조회 동의",
    type : "text",
    agree: "동의",
    pdfvalue: "/fup/customer/form/2017110617593821483973066352935.pdf"
  
  },
  {
  id : 2,
  title : "[필수] 개인(신용)정보 수집.이용.제공 동의서(여신 금융거래)",
  contents: "-고유식별정보 수집.이용.제공 동의\n -개인(신용)정보 수집.이용.제공 동의",
  type : "text",
  
  agree: "동의",
  pdfvalue: "/fup/customer/form/2019031909261764480323824044447.pdf"
  },
  {
  id : 3,
  title : "공공기관 전산정보 이용동의서",
  contents: "-공공기관 전산정보 열람.이용 동의",
  type : "text",
  agree: "동의",
  pdfvalue: "/fup/customer/form/2020262473283826319128117808560.pdf"
  
  
  },
  {
  id : 4,
  title : "필수 개인(신용)정보 수집.이용.제공.조회 동의서[신용보증용]",
  contents: "-고유식별정보 및 개인(신용)정보수집.이용.제공.조회.동의\n -신용등급 하락가능성 및 고객권리확인 동의",
  type : "text",
  agree: "동의",
  pdfvalue: "/fup/customer/form/2022053115131329259593606625324.pdf"
  
  },
  {
  id : 5,
  title : "기업(신용)정보 수집.이용.제공.조회 동의서[신용보증용]",
  contents: "-신용정보 수집.이용.제공.조회동의\n -중소기업 지원사업 통합관리시스템 정보수집.조회.활용 동의\n -금융거래정보이용에관한 사항동의\n -수출 및 인증정보이용에 관한 사항 동의\n -세무회계자료의 전자적 제출에 관한 사항 동의\n -행정정보활용에 관한 사항 동의",
  type : "text",
  agree: "동의",  
  pdfvalue: "/fup/customer/form/2022053115164629259806850189960.pdf"
  
  },
  {
  id : 6,
  title : "공공 마이데이터 관련 개인(신용)정보 조회 동의서",
  contents: "-고유식별정보 수집.이용.제공 동의\n -개인(신용)정보 및 행정정보 제3자 제공 동의",
  type : "text",
  agree: "동의",
  pdfvalue: "/fup/customer/form/2022021612253920263835375609685.pdf"
  
  },
  {
  id : 7,
  title : "[선택] 개인(신용)정보 수집.이용 동의서 (빅데이터 기반 신용평가모형 분석용)",
  contents: "-개인 정보 수집.이용 동의",
  type : "text",
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
  const headerNm = props.headerNm;
  return (
    <>
    <OslHeader headerNm={headerNm}/>
      <div className="container">
        
        <div className="content">
        
            <div className="content-body">
        
                <div className="content-top">
                    <p className="top-tit"><strong>온라인 플랫폼 입점 소상공인<br/>
                        보증부대출</strong>을 위해 다음 항목에<br/>
                        동의해 주세요
                    </p>
                    <p className="top-txt">
                        대출 한도 조회용으로 고객님의 정보를 수집합니다. <span className="fc-r">신용도에는 영향이 없으니 안심하세요.</span>
                    </p>
                </div>
        
                <div className="section line-tf4">
                {
                  custAgreeData.map((data, idx)=>{
                    return (
                    <p key={`agree_terms_${idx}`} className="box-chk">
                        <input type="checkbox" name="agree_terms" id={`agree_terms_${data.id}`} className="check-input blind"/>
                        <label htmlFor={`agree_terms_${data.id}`} className="check-label">{data.title}</label>
                        <a href="" data-id="" className="btn-pop-arrow" title={data.title}><span className="blind">{data.title}</span></a>
                    </p>
                    );
                  })
                }
                </div>
             
                <div className="section line-tf4">
                    <p className="mar-t10 mar-b30 point-tit">신청 전 유의사항을 꼭 확인해주세요</p>
                    <div className="agree-form">
                        <p className="box-chk">
                            <input type="checkbox" name="agree_terms_10" id="agree_terms_10" className="check-input blind"/>
                            <label htmlFor="agree_terms_10" className="check-label">IBK기업은행에 상담 중인 대출이 없습니다.</label>
                            <a href="" data-id="" className="btn-pop-arrow" title="IBK기업은행에 상담 중인 대출이 없습니다."><span className="blind">IBK기업은행에 상담 중인 대출이 없습니다.</span></a>
                        </p>
                        <p className="box-chk">
                            <input type="checkbox" name="agree_terms_11" id="agree_terms_11" className="check-input blind"/>
                            <label htmlFor="agree_terms_11" className="check-label">기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다.</label>
                            <a href="" data-id="" className="btn-pop-arrow" title="기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다."><span className="blind">기타은행에서 정한 신용등급 등 취급제한 사유에 따라 대출 취급이 거절될 수 있음을 충분히 이해하였습니다.</span></a>
                        </p>
                    </div>
                </div>
           
            </div>
           
            <div className="content-footer">
                <button type="button" className="btn btn-lg default-bg">
                    <span className="txt">모두 동의하고 다음</span>
                </button>
            </div>
           
        </div>
        
    </div>
           
            
    </>
  );
}

export default CustAgree;