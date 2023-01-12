

import PathConstants from './modules/constants/PathConstants.js';

import { Route, Routes } from "react-router";
import Detail from './pages/guide/Detail.js';
import { lazy, Suspense } from 'react';
import OslHeader from './modules/components/OslHeader.js';
//import Progress from './pages/common/Progress.js';
import CustAgree from './pages/judge/prejudge/CustAgree.js';
import Loading from './modules/components/Loading.js';
import SelfCheck from './pages/judge/prejudge/SelfCheck.js';

const Progress = lazy(() => import('./pages/common/Progress.js'));

//라우터 목록 정의
function Routing() {
  // const EsgRouting = (path) => {
  //   return location.href = `//${window.location.host}/esgLogin.html${path.location.search}&apiurl=${process.env.REACT_APP_API_URL}`;
  // }
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PathConstants.PROGRESS} element={<Progress headerNm={PathConstants.PROGRESS_NM} />} />
        <Route path={PathConstants.GUIDE_DETAIL} element={<Detail />} />
        <Route path={PathConstants.GUIDE_READY} element={<></>} />
        <Route path={PathConstants.PREJUDGE_CUSTAGREE} element={<CustAgree headerNm={PathConstants.PREJUDGE_CUSTAGREE_NM} />} />
        <Route path={PathConstants.PREJUDGE_SUITTEST} element={<></>} />
        <Route path={PathConstants.PREJUDGE_SUITRESULT} element={<></>} />
        <Route path={PathConstants.PREJUDGE_SELFCHECK} element={<SelfCheck CustAgree headerNm={PathConstants.PREJUDGE_SELFCHECK}/>} />
        <Route path={PathConstants.PREJUDGE_GRTINFOINPUT} element={<></>} />
        <Route path={PathConstants.PREJUDGE_DOCSTATUS} element={<></>} />
        {/* <EsgRouting path={`/common/login`} /> */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Suspense>
  );

}

export default Routing;
