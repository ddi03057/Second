import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";

function CustInfoInput(props) {

  function cbOslBtn() {

  }
  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container" >
        <div className="content">
          <div className="content-body">
            <div className="content-top">

              <p className="top-tit">고객님의 정보와 관리영업점을 <br />확인해주세요.</p>
              
            </div>
            <section className="section line-tf4">
                <div className="info-wrap">
                  <div className="info-box">
                    <span className="tit fc-gray">사업자번호</span>
                    <span className="txt fc-dark ta-r">123-45-67890</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">사업장명</span>
                    <span className="txt fc-dark ta-r">기은상사</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대표자명</span>
                    <span className="txt fc-dark ta-r">홍길동</span>
                  </div>
                </div>
              </section>
              <div className="section line-tf4">
                <ol className="sele-list type02 pad-b10">
                  <li className="item">
                    <div className="question-wrap txt-wrap">
                      <p className="txt">
                        업종 선택
                      </p>
                    </div>

                    <div className="sele-list type01 radius answer-wrap mar-t10">
                      <div className="item">
                        <label className="ui-select">
                          <select name="sSel" id="sSel1">
                            <option>선택하세요</option>
                          </select>
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item">
                    <div className="question-wrap txt-wrap">
                      <p className="txt">
                        관리영업점 선택
                      </p>
                    </div>

                    <div className="sele-list type01 radius answer-wrap mar-t10">
                      <div className="item">
                        <label className="ui-select">
                          <select name="sSel" id="sSel1">
                            <option value="">선택하세요</option>
                          </select>
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item">
                    <div className="question-wrap txt-wrap">
                      <p className="txt">
                        대표자 영문명
                      </p>
                    </div>
                    <div className="sele-list type01 radius answer-wrap mar-t10">
                      <div className="item">
                        <input type="text" className="ta" name="text01" id="text01_01" placeholder="대표자 영문명 입력" />
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
          </div>
          <OslBtn
            obj={{
              type: "button",
              disabled: false,
              text: ["다음"],
              link: "",
              callbackId: cbOslBtn
            }} />
        </div>
      </div>
    </>
  );
}

export default CustInfoInput;