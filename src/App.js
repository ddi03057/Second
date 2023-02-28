
import Routing from './Routing';
import React, { useState, useEffect } from 'react';
import { getSessionData, isToken } from './modules/common/tokenBase';
import { useInterval } from './modules/common/hook/useInterval';

export let TokenContext = React.createContext(); //보관함
function App() {
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // let [objParam, setObjParam] = useState({bizNum: "12345", lonNum: "6789"});
  // let [apiPath, setApiPath] = useState("/");
  const [tokenYn, setTokenYn] = useState("");
  //const [redirectType, setRedirectType] = useState("init");
  
  useEffect(()=> {
    setTokenYn(isToken());
    if(tokenYn === "Y" || tokenYn === "N") {
      //setRedirectType("refresh");
    }
    console.log(tokenYn);
  }, [tokenYn]);
  console.log(getSessionData());
  console.log("###################개발빌드적용확인###################");
  console.log("REACT_APP_PROXY_PATH=", process.env.REACT_APP_PROXY_PATH);
  console.log("REACT_APP_MNB_API_URL=", process.env.REACT_APP_MNB_API_URL);
  console.log("REACT_APP_LRB_API_URL=", process.env.REACT_APP_LRB_API_URL);
  console.log("REACT_APP_IBK_OAP_URL=", process.env.REACT_APP_IBK_OAP_URL);
  console.log("sessionInfo=", getSessionData());

  return (
    <>
      <TokenContext.Provider value={{tokenYn}}>
      <div className="wrapper">
        <Routing />
      </div>
      </TokenContext.Provider>
    
    </>
  );
}

export default App;
