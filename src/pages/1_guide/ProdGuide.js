import ProdGuideCss from '../../css/ProdGuide.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

function ProdGuide() {

    return (
        <>
            <Table className='ProdGuidetable'>
                <thead>
                    <h2 className='ProdGuideh2'>상품 안내</h2>

                </thead>
                <tbody>
                    <tr>
                        <b>
                            <th>구분</th>
                        </b>
                        <th>상세내용</th>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                상품명
                            </td>
                        </b>
                        <td>
                            온라인 플랫폼 입점 소상공인 보증부대출(가칭)
                        </td>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                가입대상
                            </td>
                        </b>
                        <td>
                            ■ 네이버 스토어 입점 개인사업자(개업일일로부터 6개월 이상)<br />
                            ※ 단독 개인사업자
                        </td>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                대출한도
                            </td>
                        </b>
                        <td>
                            ■ 최대 1억원(90% 신용보증기금 보증서)<br />
                            ※ 대출한도는 보증심사결과에 따라 결정됩니다.
                        </td>
                    </tr>
                    <tr><b>
                        <td>
                            대출용도
                        </td>
                    </b>
                        <td>
                            사업장 운영자금
                        </td>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                대출한도
                            </td>
                        </b>
                        <td>
                            1억원
                        </td>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                대출금리
                            </td>
                        </b>
                        <td>
                            <b>
                                ■ KORJBOR(3,6,12개월물中선택) + 가산금리 - 우대금리<br />
                                ■ 연체이자 및 지연배상금(은행여신약관 기준)
                            </b>
                        </td>
                    </tr>
                    <tr>
                        <b>
                            <td>
                                부대비용
                            </td>
                        </b>
                        <td>
                            ■ 중도상환해약금 면제 / - 수입인지세 5천만원 초과<br />
                        </td>
                    </tr>
                    <tr>
                        <td><b>
                            유의사항 및 기타
                        </b>
                        </td>
                        <td>
                            (금융지원 제외 대상)<br />
                            - 휴.폐업 중인 기업<br />
                            - 법인 또는 공동대표가 등재된 개인기업<br />
                            - 연체대출금 보유 또는 국세.지방세 체납기업<br />
                            - 보증 금지/제한업종을 영위하는 기업(도박,유흥,오락,점술 등)<br />
                            - 기타 신용상태가 불량하다고 판단되는 기업<br />
                            - 최근 1년 이내 대표자(실제경영자)가 변동된 기업<br />
                            - 신용보증기금 또는 기술보증기금 잔액이 있는 기업<br />
                            - 신용관리대상정보 등재 중인 기업<br />
                            - 보증기관의 보증사고 관련자(사고 및 대위변제)<br />
                            - 기타 등등<br />
                            (준법감시심의필) / (금리인하요구권) / (청약철회) 등<br />
                            (기타사항)<br />
                            ※ 본 보증상품은 주민등록번호당 최대 1억원 이내 지원이 가능합니다. 고객님의 신용도와 당행 및 신용보증기금의 심사기준에 따라 대출여부가 결정됩니다. 금융기관 신용정보관리대상 고객 및 당행 대출 부적격자는 대출이 제한될 수 있습니다. 자세한 내용은 IBK고객센터 ☎(1588-2588) 또는 기업은행 가까운 영업점으로 문의하여 주시기 바랍니다. 상품금액 및 종류에 따라 부대비용이 발생할 수 있습니다. (중략) 본 공시는 상품에 대한 이해를 돕고 약관의 중요내용을 알려드리기 위한 참고자료이며, 실제상품의 계약은 여신거래약정서(생략)

                        </td>
                    </tr>




                </tbody>

            </Table>
            <Link onClick={() => {

            }} to="/preguide"><Button
                variant='primary'
                className='ProGuidebutton'
                size="lg"
                style={{ width: '100%' }}>
                    확인
                </Button></Link>
        </>
    );
}

export default ProdGuide;