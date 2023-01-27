/** 
 * import 순서
 * react hook, custom hook, 
 * external component(module), 
 * internal component(module), 
 * data, 
 * css
 */

import { useState } from "react";
import OslHeader from "../../../modules/components/OslHeader";
import OslBtn from "../../../modules/components/OslBtn";
import API from "../../../modules/constants/API.js";
import request from "../../../modules/utils/Axios";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import PathConstants from "../../../modules/constants/PathConstants";
import { useEffect } from "react";


/**
 * 컴포넌트명 : 자료 수집
 * 설명 : 사업자번호, 행정구역 수집
 * @param {*} props
 * props항목별 설명
 */


function DataCollect(props) {

  const [disabledYn, setDisabledYn] = useState(true);
  const [showDistricts, setShowDistricts] = useState(false);
  const handleCloseDistricts = () => setShowDistricts(false); document.body.style.overflow = "";
  const handleShowDistricts = () => setShowDistricts(true); document.body.style.overflow = "hidden";
  const [showSido, setShowSido] = useState(false);
  const handleCloseSido = () => setShowSido(false); document.body.style.overflow = "";
  const handleShowSido = () => setShowSido(true); document.body.style.overflow = "hidden";
  const [showSigungu, setShowSigungu] = useState(false);
  const handleCloseSigungu = () => setShowSigungu(false); document.body.style.overflow = "";
  const handleShowSigungu = () => setShowSigungu(true); document.body.style.overflow = "hidden";


  let [fade, setFade] = useState('');
  useEffect(() => {
    if (showDistricts) {
      setDisabledYn(true);
      setTimeout(() => { setFade('end'); }, 500);
    } else {
      setDisabledYn(false);
    }
    return () => {
      setFade("");
    }
  }, [showDistricts]);

  let navigate = useNavigate();

  const DataCollect = async () => {
    const res = await request({
      method: "post",
      url: API.PREJUDGE_DATACOLLECT,
      data: {}
    })
      .then((response) => {

        return response;
      })

      .catch((error) => {
        console.log("error : ", error);
      });
  }

  useLayoutEffect(() => {
    DataCollect()
  }, [])



  function cbOslBtn() {


  }

  return (
    <>
      <OslHeader headerNm={props.headerNm} />
      <div className="container">
        <div className="content">
          <div className="content-body">
            <div className="content-top">
              <p className="top-tit"><strong>자료 수집을</strong> 위해<br />
                <strong>입력해야할 내용</strong>이 있습니다.
              </p>
            </div>
            <div className="section">
              <ul className="sele-list type02">
                <li className="item">
                  <div className="question-wrap txt-wrap">
                    <p className="txt fc-6">
                      사업자 번호
                    </p>
                  </div>
                  <div className="form-group">
                    <div className="sele-list type01 radius answer-wrap">
                      <div className="item">
                        <input type="number" name="text01" id="text01_01" placeholder="사업자 번호" />
                      </div>
                      <div className="btn-wrap">
                        <button type="reset" className="btn btn-sm btn-reset"><span className="blind">재작성</span></button>
                      </div>
                    </div>
                    <span className="sm-txt info">주민등록상 행정구역을 선택해주세요.</span>
                  </div>
                </li>
                <li className="item">
                  <div className="question-wrap txt-wrap">
                    <p className="txt fc-6">
                      시,도
                    </p>
                  </div>

                  <div className="sele-list type01 radius answer-wrap mar-t10">
                    <div className="item">
                      <label className="ui-select">
                        <select name="sSel" id="sSel1" disabled={disabledYn}
                          onClick={() => {
                            handleShowDistricts();
                          }}
                        >
                        </select>
                        <span className="radio"></span>
                      </label>
                    </div>
                  </div>
                </li>
                <li className="item">
                  <div className="question-wrap txt-wrap">
                    <p className="txt fc-6">
                      시,군,구
                    </p>
                  </div>

                  <div className="sele-list type01 radius answer-wrap mar-t10">
                    <div className="item">
                      <label className="ui-select">
                        <select name="sSel" id="sSel1" disabled={disabledYn}
                          onClick={() => {
                            handleShowDistricts();
                          }}
                        >
                          <option value="">선택불가</option>
                          <option value="">선택1</option>
                          <option value="">선택2</option>
                        </select>
                        <span className="radio"></span>
                      </label>
                    </div>
                  </div>
                </li>
              </ul>
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
      {showDistricts && <ViewDistricts show={showDistricts} handleClose={handleCloseDistricts} fade={fade}></ViewDistricts>}
      {showSido && <ViewSido show={showSido} handleClose={handleCloseSido}></ViewSido>}
      {showSigungu && <ViewSigungu show={showSigungu} handleClose={handleCloseSigungu}></ViewSigungu>}
    </>
  )
}

function ViewDistricts(props) {
  const showYn = props.show;

  return (

    <div id="bottom01" className="bottom-sheet" style={{ display: showYn ? "block" : "none" }}>
      <div className="bottom-inner">
        <div className="bottom-header">
          <p className="title fc-01">시,도 선택</p>
          <button type="button" className="btn btn-close"
            onClick={() => {
              props.handleClose();
            }}
          >
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="bottom-content">
          <div className="select-box">
            <ul className="select-btn-list col2">
              <li>
                <button><span>서울특별시</span></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

function ViewSido(props) {
  const showYn = props.show;
  return (
    <div id="bottom01" className="bottom-sheet" style={{ display: showYn ? "block" : "none" }}>
      <div className="bottom-inner">
        <div className="bottom-header">
          <p className="title fc-01">시,도 선택</p>
          <button type="button" className="btn btn-close"
            onClick={() => {
              props.handleClose();
            }}
          >
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="bottom-content">
          <div className="select-box">
            <ul className="select-btn-list col2">
              <li>
                <button><span>서울특별시</span></button>
              </li>
              <li>
                <button><span>부산광역시</span></button>
              </li>
              <li>
                <button><span>대구광역시</span></button>
              </li>
              <li>
                <button><span>인천광역시</span></button>
              </li>
              <li>
                <button><span>광주광역시</span></button>
              </li>
              <li>
                <button><span>대전광역시</span></button>
              </li>
              <li>
                <button><span>울산광역시</span></button>
              </li>
              <li>
                <button><span>경기도</span></button>
              </li>
              <li>
                <button><span>강원도</span></button>
              </li>
              <li>
                <button><span>충청북도</span></button>
              </li>
              <li>
                <button><span>충청남도</span></button>
              </li>
              <li>
                <button><span>전라북도</span></button>
              </li>
              <li>
                <button><span>전라남도</span></button>
              </li>
              <li>
                <button><span>경상북도</span></button>
              </li>
              <li>
                <button><span>경상남도</span></button>
              </li>
              <li>
                <button><span>제주특별자치도</span></button>
              </li>
              <li>
                <button><span>세종특별자치시</span></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ViewSigungu(props) {
  const showYn = props.show;
  return (
    <div id="bottom01" className="bottom-sheet" style={{ display: showYn ? "block" : "none" }}>
      <div className="bottom-inner">
        <div className="bottom-header">
          <p className="title fc-01">시,군,구 선택</p>
          <button type="button" className="btn btn-close"
            onClick={() => {
              props.handleClose();
            }}
          >
            <span className="blind">닫기</span>
          </button>
        </div>
        <div className="bottom-content">
          <div className="select-box">
            <ul className="select-btn-list col2">
              <li><button><span>강남구</span></button></li>
              <li><button><span>강동구</span></button></li>
              <li><button><span>강북구</span></button></li>
              <li><button><span>강서구</span></button></li>
              <li><button><span>관악구</span></button></li>
              <li><button><span>광진구</span></button></li>
              <li><button><span>구로구</span></button></li>
              <li><button><span>금천구</span></button></li>
              <li><button><span>노원구</span></button></li>
              <li><button><span>도봉구</span></button></li>
              <li><button><span>동대문구</span></button></li>
              <li><button><span>동작구</span></button></li>
              <li><button><span>마포구</span></button></li>
              <li><button><span>서대문구</span></button></li>
              <li><button><span>서초구</span></button></li>
              <li><button><span>성동구</span></button></li>
              <li><button><span>성북구</span></button></li>
              <li><button><span>송파구</span></button></li>
              <li><button><span>동작구</span></button></li>
              <li><button><span>마포구</span></button></li>
              <li><button><span>서대문구</span></button></li>
              <li><button><span>서초구</span></button></li>
              <li><button><span>성동구</span></button></li>
              <li><button><span>성북구</span></button></li>
              <li><button><span>송파구</span></button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataCollect;