
import Routing from './Routing';
import React, { useState } from 'react';

export let Context1 = React.createContext(); //보관함
function App() {
  //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  let [objParam, setObjParam] = useState({bizNum: "12345", lonNum: "6789"});
  return (
    <>
    
    
    
      <Context1.Provider value={{objParam}}>
      <div className="wrapper">
        <Routing />
      </div>
      </Context1.Provider>
    
    </>
  );
}

export default App;
