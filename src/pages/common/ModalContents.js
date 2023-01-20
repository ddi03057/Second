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
            <div className="container">
                <div className="content">
                    <div className="content-body">
                        <div className="content-top pad-b0">
                            <div className="inp-block">
                                <div className="inp-wrap">
                                    <input type="text" className="inp type01 min-w-auto" placeholder="업종명" />
                                </div>
                                <button type="button" className="btn btn-md btn-default left-inp">
                                    <span className="txt">검색</span>
                                </button>
                            </div>
                        </div>
                        <div className="section pad-0">
                            <div className="tbl-wrapper">
                                <table className="tbl-wrap">
                                    <caption>
                                        보증취업 제한 업종코드, 업종명 표
                                    </caption>
                                    <colgroup>
                                        <col style={{ width: "100px" }} />
                                        <col style={{ width: "auto" }} />
                                    </colgroup>
                                    <thead className="border">
                                        <tr>
                                            <th scope="col">업종 코드</th>
                                            <th scope="col">업종명</th>
                                        </tr>
                                    </thead>

                                    <tbody className="first-blue">
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="txt-data">G47841</span>
                                            </td>
                                            <td>
                                                <span className="txt-data">예술품 및 골동품 소매업</span>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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