

import PathConstants from './modules/constants/PathConstants.js';

import { Route, Routes } from "react-router";
import { lazy, Suspense } from 'react';
import Loading from './modules/components/Loading.js';
import Detail from './pages/guide/Detail.js';
import Ready from './pages/guide/Ready.js';

import CustAgree from './pages/judge/prejudge/CustAgree.js';
import SelfCheck from './pages/judge/prejudge/SelfCheck.js';
import GrtInfoInput from './pages/judge/prejudge/GrtInfoInput.js';
import UntactAgrm from './pages/lonexecute/UntactAgrm.js';
import DocStatus from './pages/judge/prejudge/DocStatus.js';
import AgrmInput from './pages/lonexecute/AgrmInput.js';
import SuitResult from './pages/judge/prejudge/SuitResult.js'
import Result from './pages/lonexecute/Result.js';
import ApprInfo from './pages/lonexecute/ApprInfo.js';
import LonContentCheck from './pages/lonexecute/LonContentCheck.js';
import ArsCertificate from './pages/lonexecute/ArsCertificate.js';
import StampTax from './pages/lonexecute/StampTax.js';
import FinanceCusLaw from './pages/lonexecute/FinanceCusLaw.js';
import Main from './pages/Main.js';
import ServiceError from './pages/common/ServiceError.js';
import SystemError from './pages/common/SystemError.js';
import Certificate from './pages/common/Certificate.js';
import API from './modules/constants/API.js';
import callOpenApi from './modules/common/tokenBase.js';
import axios from 'axios';
import request from './modules/utils/Axios.js';
import { useEffect } from 'react';
import { useState } from 'react';

import DefinoCheck from './pages/common/DelfinoCheck.js';
import CheckView from './pages/common/delfino-check.js';



const Progress = lazy(() => import('./pages/common/Progress.js'));
const SuitTest = lazy(() => import('./pages/judge/prejudge/SuitTest.js'));
const ApplyInfoInput = lazy(() => import('./pages/lonexecute/ApplyInfoInput.js'));
const Redirect = lazy(()=> import('./pages/common/Redirect.js'));
const DataCollect = lazy(()=> import('./pages/judge/prejudge/DataCollect.js'));
const CustInfoInput = lazy(()=> import('./pages/judge/prejudge/CustInfoInput.js'));

//????????? ?????? ??????
function Routing() {
  // const EsgRouting = (path) => {
  //   return location.href = `//${window.location.host}/esgLogin.html${path.location.search}&apiurl=${process.env.REACT_APP_API_URL}`;
  // }
  
  const [apiDataStatus, setApiDataStatus] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);;
  const [error, setError] = useState(null);

  // useEffect(()=> {
  //   const preAxios = async (apiPath) => {
  //     setLoading(true);
  //     const res = await request({
  //       method: "post",
  //       url: apiPath,
  //       data: {}
  //     })
  //       .then((response) => {
  //         console.log("route", response);
          
  //         setApiDataStatus(response.STATUS);
  //         setApiData(response.data);
  //         return response;
  //       })
    
  //       .catch((error) => {
  //         console.log("error : ", error);
  //         setError(error);
  //       });
  //     setLoading(false);
  //   }
  //   if(apiPath != "/") preAxios(apiPath);
  // },[apiPath])



  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/:type" element={<Redirect />} />
        <Route path={PathConstants.MAIN} element={<Main />} />
        <Route path={PathConstants.CERTIFICATE_SCRP} element={<DefinoCheck headerNm={PathConstants.CERTIFICATE_NM} certType="scrp" />} />
        <Route path={PathConstants.CERTIFICATE_CERT} element={<DefinoCheck headerNm={PathConstants.CERTIFICATE_NM} certType="cert" />} />
        <Route path={PathConstants.CERTIFICATE_SIGN} element={<DefinoCheck headerNm={PathConstants.CERTIFICATE_NM} certType="sign" />} />
        <Route path={PathConstants.PROGRESS} element={<Progress headerNm={PathConstants.PROGRESS_NM} />} />
        <Route path={PathConstants.GUIDE_DETAIL} element={<Detail headerNm={PathConstants.GUIDE_DETAIL_NM} />} />
        <Route path={PathConstants.GUIDE_READY} element={<Ready headerNm={PathConstants.GUIDE_READY_NM} />} />
        <Route path={PathConstants.PREJUDGE_CUSTAGREE} element={<CustAgree headerNm={PathConstants.PREJUDGE_CUSTAGREE_NM} />} />
        <Route path={PathConstants.PREJUDGE_SUITTEST} element={<SuitTest headerNm={PathConstants.PREJUDGE_SUITTEST_NM} />} />
        <Route path={PathConstants.PREJUDGE_SUITRESULT} element={<SuitResult headerNm={PathConstants.PREJUDGE_SUITRESULT_NM} />} />
        <Route path={PathConstants.PREJUDGE_SELFCHECK} element={<SelfCheck headerNm={PathConstants.PREJUDGE_SELFCHECK_NM} />} />
        <Route path={PathConstants.PREJUDGE_GRTINFOINPUT} element={<GrtInfoInput headerNm={PathConstants.PREJUDGE_GRTINFOINPUT_NM} />} />
        <Route path={PathConstants.PREJUDGE_DOCSTATUS} element={<DocStatus headerNm={PathConstants.PREJUDGE_DOCSTATUS_NM} />} />
        <Route path={PathConstants.PREJUDGE_CUSTINFOINPUT} element={<CustInfoInput headerNm={PathConstants.PREJUDGE_CUSTINFOINPUT_NM} />} />
        <Route path="/checkView" element={<CheckView />} />
        <Route path={PathConstants.PREJUDGE_DATACOLLECT} 
          element={<DataCollect headerNm={PathConstants.PREJUDGE_DATACOLLECT_NM} />} 
        />
        {/* <Route path={PathConstants.PREJUDGE_DATACOLLECT} 
          element={
            loading ? (
              <Loading />
            ) : error ? (
              <div>Error:{error.message}</div>
            ) : apiData === null? (
              <div>server Error</div>
            ) : (
              <DataCollect preData={apiData}></DataCollect>
            )
          }
        /> */}
        <Route path={PathConstants.LONEXECUTE_APPRINFO} element={<ApprInfo headerNm={PathConstants.LONEXECUTE_APPRINFO_NM} />} />
        <Route path={PathConstants.LONEXECUTE_APPLYINFOINPUT} element={<ApplyInfoInput headerNm={PathConstants.LONEXECUTE_APPLYINFOINPUT_NM} />} />
        <Route path={PathConstants.LONEXECUTE_LONCONTENTCHECK} element={<LonContentCheck headerNm={PathConstants.LONEXECUTE_LONCONTENTCHECK_NM} />} />
        <Route path={PathConstants.LONEXECUTE_ARSCERTIFICATE} 
          element={<ArsCertificate headerNm={PathConstants.LONEXECUTE_ARSCERTIFICATE_NM} /*preData={preAxios(API.LONEXECUTE.LONEXECUTE_ARSCERTIFICATE)}*/ />} 
        />
        <Route path={PathConstants.LONEXECUTE_AGRMINPUT} element={<AgrmInput headerNm={PathConstants.LONEXECUTE_AGRMINPUT_NM} />} />
        <Route path={PathConstants.LONEXECUTE_SUCCRESULT} element={<Result headerNm={PathConstants.LONEXECUTE_SUCCRESULT_NM} />} />
        <Route path={PathConstants.LONEXECUTE_UNTACTAGRM} element={<UntactAgrm headerNm={PathConstants.LONEXECUTE_UNTACTAGRM_NM} />} />
        <Route path={PathConstants.LONEXECUTE_STAMPTAX} element={<StampTax headerNm={PathConstants.LONEXECUTE_STAMPTAX_NM} />} />
        <Route path={PathConstants.LONEXECUTE_FINANCECUSLAW} element={<FinanceCusLaw headerNm={PathConstants.LONEXECUTE_FINANCECUSLAW_NM} />} />
        <Route path={PathConstants.SERVICE_ERROR} element={<ServiceError />} />
        <Route path={PathConstants.SYSTEM_ERROR} element={<SystemError />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Suspense>
  );

}

export default Routing;
