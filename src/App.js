
import Routing from './Routing';
import React, { useState } from 'react';
import { getSessionData } from './modules/common/tokenBase';

export let Context1 = React.createContext(); //보관함
function App() {
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  let [objParam, setObjParam] = useState({bizNum: "12345", lonNum: "6789"});
  let [apiPath, setApiPath] = useState("/");
  console.log(getSessionData());
  console.log("개발빌드적용확인",process.env.REACT_APP_MNB_API_URL)
  //console.log(getSessionData().accessToken);
  console.log("test");
  return (
    <>
      <Context1.Provider value={{apiPath, setApiPath}}>
      <div className="wrapper">
        <Routing />
      </div>
      </Context1.Provider>
    
    </>
  );
}

export default App;
