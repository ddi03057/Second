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
              <div className="box-list-cont">
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
              <div className="box-list-cont">
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
              <div className="box-list-cont">
                  <p className="txt fc-lightGray">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                  </p>
              </div>
          </div>
      </section>
    </>
  );
}

export const ModalContents = (props)=> {
  switch(props.componentNm) {
    case "GrtInfoInputModal" : return <GrtInfoInputModal />
    default : return null;
  }
  
}