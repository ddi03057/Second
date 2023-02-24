/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */
import { useState, } from "react";
import { useLocation, useNavigate } from "react-router";
import OslHeader from "../../modules/components/OslHeader";
import OslBtn from "../../modules/components/OslBtn";
import PathConstants from "../../modules/constants/PathConstants";
import collectData from "../../modules/constants/collectData";
import { getClientOs, loginDomain } from "./../../modules/common/boxlogin.js";
import { oslLogin, oslLogout} from "./../../modules/common/oslLogin.js";
import { authorization, getSessionData } from "../../modules/common/tokenBase";
import Redirect from "../common/Redirect.js";
import API from "../../modules/constants/API";
import { Context1 } from "./../../App.js";
import { useContext } from "react";
import { useEffect } from "react";

/**
 * 화면명
 * 설명
 * @param {*} props
 * props항목별 설명
 */
function Ready(props) {


  let navigate = useNavigate();
  const {apiPath, setApiPath} = useContext(Context1);
  console.log(apiPath);
  useEffect(()=> {
    console.log(apiPath);
    if(apiPath != "/") navigate("/preJudge/datacollect");
  },[apiPath]);
  


  function cbOslBtn() {
    //setApiPath(API.PREJUDGE.DATACOLLECT_GETCITY);
    console.log(authorization(null));
    navigate(authorization(null)?"/":PathConstants. PREJUDGE_CUSTAGREE);
  }


  return (
    <>
      <OslHeader headerNm={props.headerNm} backYn={true} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top pad-b40">
              <p className="top-tit">
                대출을 위해 미리 준비가<br />
                필요한 것을 안내해드립니다.
              </p>
            </div>
            <div className="section pad-0">
              <div className="box-cont">
                <div className="b-title">본인 확인</div>
                <div className="b-txt"><b>본인 명의 휴대전화</b></div>
              </div>
              <div className="box-cont">
                <div className="b-title">자료 수집</div>
                <div className="b-txt">
                  <p className="fs18 lh30">
                    <b>자료 수집을 위해</b>기관사이트에 접속하여 <b>PC에 저장된 공동인증서</b>를 등록해주세요
                  </p>
                  <ul className="list-type01 mar-t20">
                    <li>
                      <span className="fs18">정부24</span>
                      <ul className="step-list">
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 1.</span>
                          <span className="step-txt fc-gray">PC에서 정부24 (www.gov.kr) 접속</span>
                        </li>
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 2.</span>
                          <span className="step-txt fc-gray">회원가입 및 로그인</span>
                        </li>
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 3.</span>
                          <span className="step-txt fc-gray">MY GOV &gt; 회원정보 &gt; 인증 등록/관리</span>
                        </li>
                      </ul>
                    </li>
                    <li className="mar-t40">
                      <span className="fs18">홈택스</span>
                      <ul className="step-list">
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 1.</span>
                          <span className="step-txt fc-gray">PC에서 홈택스 (www.hometax.go.kr) 접속</span>
                        </li>
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 2.</span>
                          <span className="step-txt fc-gray">로그인 화면 &gt; 인증서등록 &gt; 비밀번호 입력</span>
                        </li>
                      </ul>
                    </li>
                    <li className="mar-t40">
                      <span className="fs18">건강보험공단</span>
                      <ul className="step-list">
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 1.</span>
                          <span className="step-txt fc-gray">PC에서 건강보험공단 (www.nhis.or.kr) 접속</span>
                        </li>
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 2.</span>
                          <span className="step-txt fc-gray">로그인 화면 &gt; 공동/금융인증서등록 &gt; 비밀번호 입력</span>
                        </li>
                      </ul>
                    </li>
                    <li className="mar-t40">
                      <span className="fs18">위택스</span>
                      <ul className="step-list">
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 1.</span>
                          <span className="step-txt fc-gray">PC에서 위택스 (www.wetax.go.kr) 접속</span>
                        </li>
                        <li className="step-item">
                          <span className="step-tit fw-b fc-dark">Step 2.</span>
                          <span className="step-txt fc-gray">로그인 화면 &gt; 공동/금융인증서 &gt; 비밀번호 입력</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
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



    </>
  )
}

export default Ready;