

import PathConstants from './modules/constants/PathConstants.js';

import { Route, Routes } from "react-router";
import Detail from './pages/guide/Detail.js';
import Ready from './pages/guide/Ready.js';
import { lazy, Suspense } from 'react';
import OslHeader from './modules/components/OslHeader.js';
//import Progress from './pages/common/Progress.js';
import CustAgree from './pages/judge/prejudge/CustAgree.js';
import Loading from './modules/components/Loading.js';
import SelfCheck from './pages/judge/prejudge/SelfCheck.js';
import GrtInfoInput from './pages/judge/prejudge/GrtInfoInput.js';
import UntactAgrm from './pages/lonexecute/UntactAgrm.js';
import DocStatus from './pages/judge/prejudge/DocStatus.js';
import AgrmInput from './pages/lonexecute/AgrmInput.js';
import SuitResult from  './pages/judge/prejudge/SuitResult.js'
import Result from './pages/lonexecute/Result.js';
import ApprInfo from './pages/judge/grtjudge/ApprInfo.js';
import LonContentCheck from './pages/lonexecute/LonContentCheck.js';
import ArsCertificate from './pages/lonexecute/ArsCertificate.js';



const Progress = lazy(() => import('./pages/common/Progress.js'));
const SuitTest = lazy(() => import('./pages/judge/prejudge/SuitTest.js'));
const ApplyInfoInput = lazy(() => import('./pages/lonexecute/ApplyInfoInput.js'));

//라우터 목록 정의
function Routing() {
  // const EsgRouting = (path) => {
  //   return location.href = `//${window.location.host}/esgLogin.html${path.location.search}&apiurl=${process.env.REACT_APP_API_URL}`;
  // }
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PathConstants.PROGRESS} element={<Progress headerNm={PathConstants.PROGRESS_NM} />} />
        <Route path={PathConstants.GUIDE_DETAIL} element={<Detail headerNm={PathConstants.GUIDE_DETAIL_NM}/>} />
        <Route path={PathConstants.GUIDE_READY} element={<Ready headerNm={PathConstants.GUIDE_READY_NM}/>} />
        <Route path={PathConstants.PREJUDGE_CUSTAGREE} element={<CustAgree headerNm={PathConstants.PREJUDGE_CUSTAGREE_NM} />} />
        <Route path={PathConstants.PREJUDGE_SUITTEST} element={<SuitTest headerNm={PathConstants.PREJUDGE_SUITTEST_NM} />} />
        <Route path={PathConstants.PREJUDGE_SUITRESULT} element={<SuitResult headerNm={PathConstants.PREJUDGE_SUITRESULT_NM}/>} />
        <Route path={PathConstants.PREJUDGE_SELFCHECK} element={<SelfCheck headerNm={PathConstants.PREJUDGE_SELFCHECK_NM}/>} />
        <Route path={PathConstants.PREJUDGE_GRTINFOINPUT} element={<GrtInfoInput headerNm={PathConstants.PREJUDGE_GRTINFOINPUT_NM}/>} />
        <Route path={PathConstants.PREJUDGE_DOCSTATUS} element={<DocStatus headerNm={PathConstants.PREJUDGE_DOCSTATUS_NM}/>} />
        <Route path={PathConstants.GRTJUDGE_APPRINFO} element={<ApprInfo headerNm={PathConstants.GRTJUDGE_APPRINFO_NM}/>} />
        <Route path={PathConstants.LONEXECUTE_APPLYINFOINPUT} element={<ApplyInfoInput headerNm={PathConstants.LONEXECUTE_APPLYINFOINPUT_NM} />} />
        <Route path={PathConstants.LONEXECUTE_LONCONTENTCHECK} element={<LonContentCheck headerNm={PathConstants.LONEXECUTE_LONCONTENTCHECK_NM}/> }/>
        <Route path={PathConstants.LONEXECUTE_ARSCERTIFICATE} element={<ArsCertificate headerNm={PathConstants.LONEXECUTE_ARSCERTIFICATE_NM}/> }/>
        <Route path={PathConstants.LONEXECUTE_AGRMINPUT} element={<AgrmInput headerNm={PathConstants.LONEXECUTE_AGRMINPUT_NM}/> }/>
        <Route path={PathConstants.LONEXECUTE_SUCCRESULT} element={<Result headerNm={PathConstants.LONEXECUTE_SUCCRESULT_NM}/> }/>
        <Route path={PathConstants.LONEXECUTE_UNTACTAGRM} element={<UntactAgrm headerNm={PathConstants.LONEXECUTE_UNTACTAGRM_NM}/> }/>
        {/* <EsgRouting path={`/common/login`} /> */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Suspense>
  );

}

export default Routing;
