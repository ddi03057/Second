
import Routing from './Routing';
import React, { useState, useEffect } from 'react';
import { getSessionData, isToken } from './modules/common/tokenBase';
import { useInterval } from './modules/common/hook/useInterval';
import { useLocation } from 'react-router';
import ScrollToTop from './pages/common/ScrollToTop';

export let TokenContext = React.createContext(); //보관함
function App() {
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // let [objParam, setObjParam] = useState({bizNum: "12345", lonNum: "6789"});
  // let [apiPath, setApiPath] = useState("/");
  const [tokenYn, setTokenYn] = useState(()=> isToken());
  //const [redirectType, setRedirectType] = useState("init");
  // const {pathname} = useLocation();
  // //페이지 이동시 스크롤 최상단 고정
  // useEffect(()=> {
  //   console.log("현재경로>>", pathname);
  //   window.scrollTo(0,0);
  //   console.log("스크롤위치", window.pageYOffset);
  // }, [pathname]);
  //
  useEffect(()=> {
    console.log("토큰여부>>", tokenYn);
    if(tokenYn === "Y" || tokenYn === "N") {
      //setRedirectType("refresh");
    }
  }, [tokenYn]);

  console.log("###################개발빌드적용확인###################");
  console.log("REACT_APP_PROXY_PATH=", process.env.REACT_APP_PROXY_PATH);
  console.log("REACT_APP_MNB_API_URL=", process.env.REACT_APP_MNB_API_URL);
  console.log("REACT_APP_LRB_API_URL=", process.env.REACT_APP_LRB_API_URL);
  console.log("REACT_APP_IBK_OAP_URL=", process.env.REACT_APP_IBK_OAP_URL);
  console.log("sessionInfo=", getSessionData());

  return (
    <>
      <ScrollToTop />
      <TokenContext.Provider value={{tokenYn}}>
        <div className="wrapper">
          <Routing />
        </div>
      </TokenContext.Provider>
    </>
  );
}

export default App;
