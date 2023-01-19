/**
 * FullModal로 띄워야하는 화면 아래 function으로 생성하여 switch문에 추가
 */

function GrtInfoInputModal() {

    return (
        <>
            <div className="content-top">
            <p className="top-tit"><strong>윤리 경영 실천</strong> 및 <strong>보증브로커</strong> <br /> <strong>피해예방</strong>을 위한 협조 확약</p>
            </div>

            <section className="section commitment">
                <div className="box-list-wrap">
                    <div className="box-list-header">
                        <h4 className="tit fc-gray">1. 윤리 경영 실천</h4>
                        <button type="button" className="box-list-open">
                            <span className="blind">접기</span>
                        </button>
                        <button type="button" className="box-list-hide blind">
                            <span className="blind">접기</span>
                        </button>
                    </div>
                    <div className="box-list-cont active">
                        <p className="txt fc-lightGray">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        </p>
                    </div>
                </div>
                <div className="box-list-wrap">
                    <div className="box-list-header">
                        <h4 className="tit fc-gray">2. 보증브로커 피해예방</h4>
                        <button type="button" className="box-list-open">
                            <span className="blind">접기</span>
                        </button>
                        <button type="button" className="box-list-hide blind">
                            <span className="blind">접기</span>
                        </button>
                    </div>
                    <div className="box-list-cont active">
                        <p className="txt fc-lightGray">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        </p>
                    </div>
                </div>
                <div className="box-list-wrap">
                    <div className="box-list-header">
                        <h4 className="tit fc-gray">3. 입력 내용 최종 확인</h4>
                        <button type="button" className="box-list-open">
                            <span className="blind">접기</span>
                        </button>
                        <button type="button" className="box-list-hide blind">
                            <span className="blind">접기</span>
                        </button>
                    </div>
                    <div className="box-list-cont active">
                        <p className="txt fc-lightGray">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

function SelfCheckModal() {

    return (
        <>
            <div className="content-top" style={{textAlign:"center"}}>
            <p className="top-tit"><strong>보증 금지</strong> 및 <strong>제한</strong> <strong>유의</strong><br/>업종리스트</p>
            </div>

            <section className="section commitment">
                <div className="box-list-wrap">
                    <br/>
                    <div className="box-list-cont active">
                        <p className="txt fc-lightGray">
                            예술품 및 골동품 소매업<br/>
                            여관업<br/>
                            일반 유흥주점업<br/>
                            무도 유흥주점업<br/>
                            생맥주 전문점<br/>
                            기타 주점업<br/>
                            비디오물 감상실 운영업<br/>
                            중앙은행<br/>
                            국내은행<br/>
                            외국은행<br/>
                            신용조합<br/>
                            상호저축은행 및 기타 저축기관<br/>
                            신탁업 및 집합투자업<br/>
                            기타 금융 투자업<br/>
                            금융리스업<br/>
                            개발금융기관<br/>
                            신용카드 및 할부금융업<br/>
                            그 외 기타 여신금융업<br/>
                            기금 운영업<br/>
                            지주회사<br/>
                            그 외 기타 분류 안된 금융업<br/>
                            생명 보험업<br/>
                            손해 보험업<br/>
                            보증 보험업<br/>
                            건강 보험업<br/>
                            산업재해 및 기타 사회보장 보험업<br/>
                            재 보험업<br/>
                            개인 공제업<br/>
                            사업 공제업<br/>
                            연금업<br/>
                            금융시장 관리업<br/>
                            증권 중개업<br/>
                            선물 중개업<br/>
                            증권 발행, 관리, 보관 및 거래 지원 서비스업<br/>
                            투자 자문업 및 투자 일임업<br/>
                            그 외 기타 금융 지원 서비스업<br/>
                            보험 대리 및 중개업<br/>
                            기타 보험 및 연금관련 서비스업<br/>
                            주거용 건물 임대업<br/>
                            기타 부동산 임대업<br/>
                            주거용 건물 개발 및 공급업<br/>
                            비주거용 건물 개발 및 공급업<br/>
                            기타 부동산 개발 및 공급업<br/>
                            부동산 중개 및 대리업<br/>
                            탐정 및 조사 서비스업<br/>
                            입법기관<br/>
                            중앙 최고 집행기관<br/>
                            지방행정 집행기관<br/>
                            재정 및 경제정책 행정<br/>
                            기타 일반 공공 행정<br/>
                            정부기관 일반 보조 행정<br/>
                            교육 행정<br/>
                            문화 및 관광 행정<br/>
                            환경 행정<br/>
                            보건 및 복지 행정<br/>
                            기타 사회서비스 관리 행정<br/>
                            노동 행정<br/>
                            농림수산 행정<br/>
                            건설 및 운송 행정<br/>
                            우편 및 통신행정<br/>
                            기타 산업진흥 행정<br/>
                            외무 행정<br/>
                            국방 행정<br/>
                            법원<br/>
                            검찰<br/>
                            교도기관<br/>
                            경찰<br/>
                            소방서<br/>
                            기타 사법 및 공공질서 행정<br/>
                            사회보장 행정<br/>
                            유아 교육기관<br/>
                            초등학교<br/>
                            중학교<br/>
                            일반 고등학교<br/>
                            상업 및 정보산업 특성화 고등학교<br/>
                            공업 특성화 고등학교<br/>
                            기타 특성화 고등학교<br/>
                            전문대학<br/>
                            대학교<br/>
                            대학원<br/>
                            특수학교<br/>
                            외국인 학교<br/>
                            대안학교<br/>
                            경주장 및 동물 경기장 운영업<br/>
                            골프장 운영업<br/>
                            기타 사행시설 관리 및 운영업<br/>
                            무도장 운영업<br/>
                            산업 단체<br/>
                            전문가 단체<br/>
                            노동조합<br/>
                            불교 단체<br/>
                            기독교 단체<br/>
                            천주교 단체<br/>
                            민족종교 단체<br/>
                            기타 종교 단체<br/>
                            정치 단체<br/>
                            환경운동 단체<br/>
                            기타 시민운동 단체<br/>
                            그 외 기타 협회 및 단체<br/>
                            마사지업<br/>
                            점술 및 유사 서비스업<br/>
                            가구 내 고용활동<br/>
                            자가 소비를 위한 가사 생산 활동<br/>
                            자가 소비를 위한 가사 서비스 활동<br/>
                            주한 외국공관<br/>
                            기타 국제 및 외국기관<br/>
                            담배도매업<br/>
                            담배소매업<br/>
                            주거용 부동산 관리업<br/>
                            비주거용 부동산 관리업<br/>

                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}


export const ModalContents = (props) => {
    switch (props.componentNm) {
        case "GrtInfoInputModal": return <GrtInfoInputModal />
        case "SelfCheckModal": return <SelfCheckModal />
        default: return null;
    }

}