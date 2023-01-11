import './App.css';
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
    <Link onClick={() => {

}} to="/">홈</Link> ▷	▶
<Link onClick={() => {

}} to="/cstinfoadd">고객정보등록</Link> ▷	▶
<Link onClick={() => {

}} to={PathConstants.GUIDE_DETAIL}>상품안내</Link> ▷	▶

<Link onClick={() => {

}} to={PathConstants.GUIDE_READY}>사전안내</Link> ▷	▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_SUITTEST}>심사준비 1단계</Link> ▷	▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_SELFCHECK}>심사준비 2단계</Link> ▷	▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_CUSTAGREE}>심사준비 3단계</Link> ▷	▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_SUITRESULT}>적합성.적정성판단결과</Link> ▷ ▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_GRTINFOINPUT}>조사자료 자가체크</Link> ▷ ▶
<Link onClick={() => {

}} to="/csinfoagree">고객정보 위임 동의</Link> ▷ ▶
<Link onClick={() => {

}} to="/csinfoagree2">고객정보 위임 동의2</Link> ▷ ▶
<Link onClick={() => {

}} to="/doccollectlist">서류수집내역</Link> ▷ ▶
<Link onClick={() => {

}} to={PathConstants.PREJUDGE_DOCSTATUS}>사전심사 서류 수집현황</Link> ▷ ▶
<Link onClick={() => {

}} to="/procheck">대출 진행상태 조회</Link> ▷ ▶
<Link onClick={() => {

}} to="/PreJudgeInfoAdd">사전심사 정보입력</Link> ▷ ▶
<Link onClick={() => {

}} to="/prejudgeresult">사전심사 신청완료</Link> ▷ ▶
<Link onClick={() => {

}} to="/loancheck1">신청중인 대출 진행/조회/취소</Link> ▷ ▶
<Link onClick={() => {

}} to="/loancheck2">신청중인 대출 진행/조회/취소 (보증심사중)</Link> ▷ ▶
<Link onClick={() => {

}} to="/loancheck3">신청중인 대출 진행/조회/취소 (심사완료)</Link> ▷ ▶
<Link onClick={() => {

}} to="/loanfail1">신청중인 대출 진행/조회/취소 (보증거절1)</Link> ▷ ▶
<Link onClick={() => {

}} to="/loanfail2">신청중인 대출 진행/조회/취소 (검증거절2)</Link> ▷ ▶
<Link onClick={() => {

}} to="/loancancle">보증신청 취소</Link> ▷ ▶
<Link onClick={() => {

}} to="/startloan1">대출 실행1</Link> ▷ ▶
<Link onClick={() => {

}} to="/startloan2">대출 실행2</Link> ▷ ▶
<Link onClick={() => {

}} to="/loancontract">여신거래약정서</Link> ▷ ▶
<Link onClick={() => {

}} to="/loanclause">대출약관</Link> ▷ ▶
<Link onClick={() => {

}} to="/loanend">대출실행완료</Link> ▷ ▶

<Link onClick={() => {

}} to="/"></Link>
    
    

      <div className="wrapper">
        <Loading />
        <Routing />
      </div>
    
    </>
  );
}

export default App;
