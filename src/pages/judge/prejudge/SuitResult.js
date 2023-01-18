/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useLocation, useNavigate } from "react-router";
import OslHeader from "../../../modules/components/OslHeader";
import collectData from "../../../modules/constants/collectData";
//suitTestData[5].radioList.find((data)=> data.id===parseInt(userResult[5])-1).value
const suitTestData = collectData("SuitTest");
/**
 * 화면명 : 적합성 적정성 결과
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function SuitResult(props) {
  const headerNm = props.headerNm

  const navigate = useNavigate();
  /**
   * state = {result: boolean, value: [적합성적정성 결과값 배열]}
   */
  const { state } = useLocation();
  console.log(state);
  const crdBru = state.crdBru;
  const userResult = state.result;
  const DIFF_RESULT = ["01","","01","01","01","01","01","01","01","","01",""];

  let userRadioResult = [...userResult];
  let diffRadioResult = [...DIFF_RESULT];
  let discordIdxList = [];
  //radio선택항목만 남김
  userRadioResult.splice(1,1);
  userRadioResult.splice(8,1);
  userRadioResult.splice(9,1);
  diffRadioResult.splice(1,1);
  diffRadioResult.splice(8,1);
  diffRadioResult.splice(9,1);
  console.log(userResult, userRadioResult);
  diffRadioResult.map((data, idx)=> {
    if(data != userRadioResult[idx]) {
      discordIdxList.push(userRadioResult[idx]);
    }
  });
  let suitTestDataTmp = [];
  suitTestData.find((data) => {
    if(data.type === "radio") {
      suitTestDataTmp.push(data);
    }
  });
  console.log()
  suitTestDataTmp.map((data, idx)=> {
    console.log(data.radioId,data.radioList.find((data2)=> data2.id===parseInt(userResult[10])-1).value); //
  });

  if(discordIdxList.length === 0) { //적합
    return (
      <>
        <OslHeader headerNm={props.headerNm} />
        <div className="container">
          <div className="content">

            <div className="content-body prescreening">
              <div className="content-top">
                <div className="result-y">
                  <p className="top-tit">
                    홍길동 님의<br />
                    <span className="fw-b">적합성・적정성 판단결과</span><br />
                    <span className="fw-b fc-p">적합</span>으로 확인됩니다
                  </p>
                </div>
              </div>
            </div>

            <div className="content-footer">
              <button type="button" className="btn btn-lg default-bg">
                <span className="txt">다음</span>
              </button>
            </div>

          </div>
        </div>
      </>
    );
  }else { //부적합
    return (
      <>
        <OslHeader headerNm={props.headerNm} />
        <div calssName="container">
          <div calssName="content">
            <div calssName="content-body">
              <div calssName="content-top line-be4">
                <p calssName="top-tit">홍길동님의 <br /> <strong>적합성&middot;적정성 판단결과</strong> <br /> <strong calssName="fc-r">부적합</strong>으로 확인됩니다.</p>
              </div>

              <section calssName="section line-tf4">
                <div calssName="info-wrap">
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">연령</span>
                    <span calssName="txt fc-dark ta-r">{userResult[1]}세</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">보유자산</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[3].radioList.find((data)=> data.id===parseInt(userResult[3])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">현재소득</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[4].radioList.find((data)=> data.id===parseInt(userResult[4])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">미래예상소득</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[5].radioList.find((data)=> data.id===parseInt(userResult[5])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">부채</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[6].radioList.find((data)=> data.id===parseInt(userResult[6])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">고정지출</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[7].radioList.find((data)=> data.id===parseInt(userResult[7])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">연채여부</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[8].radioList.find((data)=> data.id===parseInt(userResult[8])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">신용점수</span>
                    <span calssName="txt fc-dark ta-r">
                      {userResult[9] === "02"?<>잘모름</>:`${userResult[9]}점`}
                    </span>
                  </div>
                  {
                    userResult[9] === "01"&&
                      <div calssName="info-box">
                        <span calssName="tit fc-gray">평가기관</span>
                        <span calssName="txt fc-dark ta-r">{crdBru}</span>
                      </div>
                  }
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">변제방법</span>
                    <span calssName="txt fc-dark ta-r">{suitTestData[12].radioList.find((data)=> data.id===parseInt(userResult[10])-1).value}</span>
                  </div>
                  <div calssName="info-box">
                    <span calssName="tit fc-gray">이메일주소</span>
                    <span calssName="txt fc-dark ta-r">{userResult[13]}</span>
                  </div>
                </div>
              </section>

              <section calssName="section line-tf4 pad-b0">
                <div calssName="list-wrap type01">
                  <h2 calssName="list-tit fc-gray">안내사항</h2>
                  <ul calssName="bullet-type01">
                    <li calssName="item">
                      <span calssName="fc-gray">부적합 판정을 받으신 고객은, 당일자에는 대면 및 비대면 대출 신청을 할 수 없습니다.</span>
                    </li>
                    <li calssName="item">
                      <span calssName="fc-gray">확인서 재작성은 다음날부터 가능합니다.</span>
                    </li>
                    <li calssName="item">
                      <span calssName="fc-gray">자세한 문의사항은 거래하실 영업점 또는 고객센터(<a href="tel:1566-2566" calssName="fc-gray">1566-2566</a>)으로 문의주시기 바랍니다.</span>
                    </li>
                  </ul>
                </div>
              </section>

            </div>

            <div calssName="content-footer">
              <button type="button" calssName="btn btn-lg default-bg">
                <span calssName="txt">나가기</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default SuitResult;