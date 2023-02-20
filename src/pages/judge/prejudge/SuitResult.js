/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";
import collectData from "../../../modules/constants/collectData";
import PathConstants from '../../../modules/constants/PathConstants.js';
import callOpenApi from "../../../modules/common/tokenBase";
import API from "../../../modules/constants/API";
//suitTestData[5].radioList.find((data)=> data.id===parseInt(userResult[5])-1).value
const suitTestData = collectData("SuitTest");
/**
 * 컴포넌트명 : 적합성 적정성 결과
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function SuitResult(props) {

  const [rsltDcd, setRsltDcd] = useState("");
  useLayoutEffect(()=> {
    callOpenApi(
      API.PREJUDGE.SUITRESULT_CMPBPOPYEXCNVRFCINQ,
      {},
      (res)=> {
        if(res.data.RSLT_DATA.lgncJdgmRsltDcd === "01") {
          setRsltDcd("Y");
        }else {
          setRsltDcd("N");
        }
      }
    )
  }, []);

  const [suitData, setSuitData] = useState({});
  useEffect(()=> {
    if(rsltDcd === "N") {
      callOpenApi(
        "적합성적정성 입력한데이터 받아오는 API",
        {},
        (res)=> {
          setSuitData(res.data.RSLT_DATA.data);
        }
      )
    }
  }, [rsltDcd]);

  const navigate = useNavigate();
  let crdBru = "";
  let crdScr = "";
  let userResult = [];
  /**
   * state = {result: [적합성적정성 결과값 배열], crdBru: "신용기관"}
   
  const { state } = useLocation();
  try {
    crdBru = state.crdBru;
    crdScr = state.crdScr;
    userResult = state.result;
  }catch {
    //에러페이지
  }
  */
  // const DIFF_RESULT = [0,99,0,0,0,0,0,0,0,99,0,99]; //적합성적정성 답안지

  // let userRadioResult = [...userResult];
  // let diffRadioResult = [...DIFF_RESULT];
  // let incorrectIdxList = [];
  // //radio선택항목만 남김
  // userRadioResult.splice(1,1);
  // userRadioResult.splice(8,1);
  // userRadioResult.splice(9,1);
  // diffRadioResult.splice(1,1);
  // diffRadioResult.splice(8,1);
  // diffRadioResult.splice(9,1);
  
  // diffRadioResult.map((data, idx)=> {
  //   if(data != userRadioResult[idx]) {
  //     incorrectIdxList.push(userRadioResult[idx]);
  //   }
  // });

  function cbOslBtn() {
    //진행상태 이동
    navigate(PathConstants.MAIN,
      {
        state: {
          tabIdx: 2 //진행상태
        }
      }
    );
  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      {rsltDcd === "Y"?
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
      :
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top line-be4">
              <p className="top-tit">홍길동님의 <br /> <strong>적합성&middot;적정성 판단결과</strong> <br /> <strong className="fc-r">부적합</strong>으로 확인됩니다.</p>
            </div>

            <section className="section line-tf4">
              <div className="info-wrap">
                <div className="info-box">
                  <span className="tit fc-gray">연령</span>
                  <span className="txt fc-dark ta-r">{userResult[1]}세</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">보유자산</span>
                  <span className="txt fc-dark ta-r">{suitTestData[3].radioList.find((data)=> data.dbVal===userResult[3]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">현재소득</span>
                  <span className="txt fc-dark ta-r">{suitTestData[4].radioList.find((data)=> data.dbVal===userResult[4]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">미래예상소득</span>
                  <span className="txt fc-dark ta-r">{suitTestData[5].radioList.find((data)=> data.dbVal===userResult[5]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">부채</span>
                  <span className="txt fc-dark ta-r">{suitTestData[6].radioList.find((data)=> data.dbVal===userResult[6]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">고정지출</span>
                  <span className="txt fc-dark ta-r">{suitTestData[7].radioList.find((data)=> data.dbVal===userResult[7]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">연채여부</span>
                  <span className="txt fc-dark ta-r">{suitTestData[8].radioList.find((data)=> data.dbVal===userResult[8]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">신용점수</span>
                  <span className="txt fc-dark ta-r">
                    {userResult[9] === 1?<>잘모름</>:`${crdScr}점`}
                  </span>
                </div>
                {
                  userResult[9] === 0&&
                    <div className="info-box">
                      <span className="tit fc-gray">평가기관</span>
                      <span className="txt fc-dark ta-r">{crdBru}</span>
                    </div>
                }
                <div className="info-box">
                  <span className="tit fc-gray">변제방법</span>
                  <span className="txt fc-dark ta-r">{suitTestData[12].radioList.find((data)=> data.dbVal===userResult[10]).value}</span>
                </div>
                <div className="info-box">
                  <span className="tit fc-gray">이메일주소</span>
                  <span className="txt fc-dark ta-r">{userResult[11]}</span>
                </div>
              </div>
            </section>

            <section className="section line-tf4 pad-b0">
              <div className="list-wrap type01">
                <h2 className="list-tit fc-gray">안내사항</h2>
                <ul className="bullet-type01">
                  <li className="item">
                    <span className="fc-gray">부적합 판정을 받으신 고객은, 당일자에는 대면 및 비대면 대출 신청을 할 수 없습니다.</span>
                  </li>
                  <li className="item">
                    <span className="fc-gray">확인서 재작성은 다음날부터 가능합니다.</span>
                  </li>
                  <li className="item">
                    <span className="fc-gray">자세한 문의사항은 거래하실 영업점 또는 고객센터(<a href="tel:1566-2566" className="fc-gray">1566-2566</a>)으로 문의주시기 바랍니다.</span>
                  </li>
                </ul>
              </div>
            </section>

          </div>

          <OslBtn
            obj={{
              type: "button",
              disabled: false,
              text: ["나가기"],
              link: "",
              callbackId: cbOslBtn
            }} />
        </div>
      </div>
      }
    </>
  );

}

export default SuitResult;