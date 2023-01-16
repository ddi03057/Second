function FullModal() {
  return (
    <div id="layer00" className="pop-wrap pop-full" style="display: block;">
      <div className="pop-inner">
        <div className="pop-header">
          <h3>약관 동의</h3>
          <button type="button" className="btn btn-close" onclick="closePop('layer00');">
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="pop-content">
          <div className="content-terms">
            <div className="swiper terms-swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <ul className="terms-list">
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                  </ul>
                </div>
                <div className="swiper-slide">
                  <ul className="terms-list">
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                  </ul>
                </div>
                <div className="swiper-slide">
                  <ul className="terms-list">
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                    <li><img src="./../../assets/img/terms/term_test01.JPG" alt=""/></li>
                  </ul>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div className="pop-btn-area">
          <button type="button" className="btn btn-lg default-bg" onclick="closePop('layer00');">
            <span className="txt">모두 동의하고 다음</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullModal;