import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { pdfjs } from 'react-pdf';
import Routing from './Routing';
import PathConstants from './modules/constants/PathConstants.js';
import OslHeader from './modules/components/OslHeader';
import { atom } from 'jotai';
import Loading from './modules/components/Loading';

function App() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const header = atom("헤더");
  return (
    <>
    
    
    

      <div className="wrapper">
        <Routing />
      </div>
    
    </>
  );
}

export default App;
