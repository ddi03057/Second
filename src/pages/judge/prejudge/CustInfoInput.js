import { useEffect, useState } from "react";
import OslBtn from "../../../modules/components/OslBtn";
import OslHeader from "../../../modules/components/OslHeader";
import { useNavigate } from 'react-router';
import PathConstants from './../../../modules/constants/PathConstants';
import { callLocalApi } from "../../../modules/common/tokenBase";
import API from './../../../modules/constants/API';
import { getBsnn } from './../../../modules/utils/util';

function CustInfoInput(props) {
  const navigate = useNavigate();
  //관리부점 리스트
  const [mngmLst, setMngmLst] = useState([]);
  //표준산업분류코드
  const [sicLst, setSicLst] = useState([]);
  //사업자정보
  const [bznInfo, setBznInfo] = useState({
    bzn: "", //사업자번호
    bznNm: "", //사업자명
    rpprNm: "" //대표자명
  });
  //등록 파라미터
  const [params, setParams] = useState({
    rpprEnNm: "", //대표자영문명
    sicCd: "", //표준산업분류코드
    sicNm: "", //표준산업분류코드 명칭
    mngmBrcd: "", //관리부점 코드
    mngmBrm: "", //관리부점명
  });

  
  function cbOslBtn() { 
    //고객정보 등록
    const mngmBrm = mngmLst.filter((x) => x.mngmBrcd === params.mngmBrcd)[0]?.mngmBrm;
    const sicNm = sicLst.filter((x) => x.sicCd === params.sicCd)[0]?.sicCd;

    params.mngmBrm = mngmBrm ?? "";
    params.sicNm = sicNm ?? "";

    console.log("고객정보 등록 PARAMS > ", JSON.stringify(params));

    callLocalApi(
      API.PREJUDGE.CUSTINFOINPUT_CSINQRG,
      params,
      (res)=> {
        if(res.data.RSLT_DATA.resultYn === "Y") {
          navigate(PathConstants.PREJUDGE_SUITRESULT);
        } else {
          //실패
        }
      },
      (err)=> {
        //alert(err);
      }
    )
  }

  const init =() => {
    callLocalApi(
      API.PREJUDGE.CUSTINFOINPUT_CSINBSININQ,
      {},
      (res)=> {
        console.log(res);
        setMngmLst(res.data.RSLT_DATA.mngmBr);
        setSicLst(res.data.RSLT_DATA.sic);
        setBznInfo({
          bzn: res.data.RSLT_DATA.bzn,
          bznNm: res.data.RSLT_DATA.bznNm,
          rpprNm: res.data.RSLT_DATA.rpprNm
        })
      },
      (err)=> {
        //alert(err);
      }
    )
  }

  const onChange = (nm, e) => {
    console.log("nm : ", nm, " value, ", e.target.value)
    
    setParams({
      ...params,
      [nm]: e.target.value
    });
  }
  
  useEffect(() => {
    init();
  }, []);

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
                    <span className="txt fc-dark ta-r">{getBsnn(bznInfo.bzn)}</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">사업장명</span>
                    <span className="txt fc-dark ta-r">{bznInfo.bznNm}</span>
                  </div>
                  <div className="info-box">
                    <span className="tit fc-gray">대표자명</span>
                    <span className="txt fc-dark ta-r">{bznInfo.rpprNm}</span>
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
                          <select name="sSel" id="sSel1" onChange={(e) => onChange("sicCd", e)} value={params.sicCd ?? ""}>
                            <option>선택하세요</option>
                            {
                              sicLst.map((item) => (
                                <option key={item} value={item.sicCd}>{item.sicNm}</option>
                              ))
                            }
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
                          <select name="sSe2" id="sSel2" onChange={(e) => onChange("mngmBrcd", e)} value={params.mngmBrcd ?? ""}>
                            <option key="0" value="">선택하세요</option>
                            {
                              mngmLst.map((item) => (
                                <option key={item} value={item.mngmBrcd}>{item.mngmBrm}</option>
                              ))
                            }
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
                        <input type="text" className="ta" name="text01" id="text01_01" placeholder="대표자 영문명 입력" value={params.rpprEnNm} onChange={(e) => onChange("rpprEnNm", e)}/>
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