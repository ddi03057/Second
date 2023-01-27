import OslBtn from "../../modules/components/OslBtn";
/**
 * 컴포넌트명: 나의대출
 * 설명: 대출계좌 조회(전문) > 대출계좌 있으면 대출정보 화면 보여주고, 대출계좌가 없으면 대출계좌 없다는 문구화면 보여줌
 * @param {*} props 
 * @returns 
 */
function MyLon(props) {

  // const { state } = useLocation();

  // const userResult = state.result;

  // if (userResult === true) {

    function cbOslBtn() {

    }
    return (

      <div className="container">
        <div className="content">
          <div className="content-body pad-t16">
            <div className="content-top pad-t0">
              <div className="txt-wrap">
                <p className="txt">
                  온라인 플랫폼 입점<br />
                  소상공인 보증부대출
                </p>
                <span className="txt xs-txt fc-lightGray">
                  123-123456-00-000
                </span>
                <div className="mar-t16 ta-r">
                  <em className="txt xl-txt bold">30,450,000</em>
                  <span className="txt l-txt">원</span>
                </div>
              </div>
            </div>

            <div className="section pad-0">
              <div className="box-cont">
                <div className="b-title">대출 상태</div>
                <div className="b-txt info-wrap tit-nowrap">
                  <div className="info-box">
                    <span className="tit fc-gray">신청일자</span>
                    <span className="txt fc-dark ta-r">2021.06.22</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대출금액</span>
                    <span className="txt fc-dark ta-r">30,450,000원</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대출이자</span>
                    <span className="txt fc-dark ta-r">0.00%<br />
                      <span className="fs14 fc-lightGray ta-r">(기준금리 0.00% + 가산금리 0.00%)</span>
                    </span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대출 실행일</span>
                    <span className="txt fc-dark ta-r">2021.07.02</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">거치기간 만료일</span>
                    <span className="txt fc-dark ta-r">2022.07.02</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대출 만료일</span>
                    <span className="txt fc-dark ta-r">2026.07.02</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">이자 지급 시기</span>
                    <span className="txt fc-dark ta-r">매월 10일</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OslBtn
            obj={{
              type: "button",
              disabled: false,
              text: ["대출 상환"],
              link: "",
              callbackId: cbOslBtn
            }}
          />
        </div>
      </div>
    )
    //대출이 없을시
  // } else {
  //   return (
  //     <div class="container">
  //       <div class="content">
  //         <div class="content-body pad-t0">
  //           <div class="txt-wrap no-data-wrap">
  //             <p class="txt l-txt ta-c">
  //               현재 보유 중인 대출이<br />
  //               없습니다.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}

export default MyLon;