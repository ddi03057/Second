//경로정의
const PathConstants = {
  //진행상태조회
  //안내
    //상품안내
    //대출신청 전 사전준비안내
  //사전심사
    //심사준비: 고객동의(pdf)
    //(공통API)공동인증서
    //심사준비: 적합성 적정성 확인
    //심사준비: 적합성 적정성 결과
    //심사준비: 자가진단
    //사전심사자료작성(보증신청정보입력) (공통API)스크래핑?
    //스크래핑 서류제출상태
    //(진행상태)사전심사 상태/결과
  //보증심사
    //(진행상태)보증심사 상태/결과
    //보증승인내역 확인
    //(공통API)계좌개설
  //대출실행
    //대출신청서작성 및 실행요청
    //여신거래약정서 작성
    //비대면 약정
    //(공통API)공동인증서
    //대출 실행 결과
  //사후관리
    //(진행상태)대출현황 조회
    //대출상환
    //대출계약 철회 후 상환
    //대출계약 미철회 상환(일반상환)
  
  //depth 1
  MAIN: '/main',
  LOGIN: '/login', //로그인
  LOGOUT: '/logout', //로그아웃
  PROGRESS: '/progress', //진행상태
    //dummy
  GUIDE: '/guide',  //안내
  PREJUDGE: '/prejudge',  //사전심사
  GRTJUDGE: '/grtjudge', //보증심사
  LONAPPLY: '/lonapply', //대출신청
  LONEXECUTE: '/lonexecute', //대출실행
  POSTMANAGEMENT: '/postmanagement', //사후관리

  //depth2
  GUIDE_DETAIL: '/guide/detail',  //상품안내
  GUIDE_READY: '/guide/ready',  //대출신청 전 사전준비안내

  PREJUDGE_CUSTAGREE: '/prejudge/custagree',  //고객동의
  PREJUDGE_SUITTEST: '/prejudge/suittest',  //적합성적정성검사
  PREJUDGE_SUITRESULT: '/prejudge/suitresult',  //적합성적정성결과
  PREJUDGE_SELFCHECK: '/prejudge/selfcheck',  //자가진단
  PREJUDGE_GRTINFOINPUT: '/prejudge/grtinfoinput',  //사전심사자료작성
  PREJUDGE_DOCSTATUS: '/prejudge/docstatus',  //서류제출상태
  
  GRTJUDGE_APPRINFO: '/grtjudge/apprinfo',  //보증승인내역 확인
  GRTJUDGE_ACCOPEN: '/grtjudge/accopen',  //개좌개설

  LONEXECUTE_APPLYINFOINPUT: '/lonexecute/applyinfoinput',  //대출신청서작성 및 실행요청
  LONEXECUTE_AGRMINPUT: '/lonexecute/agrminput',  //여신거래약정서 작성
  LONEXECUTE_UNTACTAGRM: '/lonexecute/untactagrm',  //비대면 약정
  LONEXECUTE_SUCCRESULT: '/lonexecute/result',  //대출실행결과

  POSTMANAGEMENT_REPAY: '/postmanagement/repay',  //대출상환
  POSTMANAGEMENT_REVOKREPAY: '/postmanagement/revokrepay', //계약철회 후 상환


  PROGRESS_NM: '진행현황', //진행상태
  GUIDE_DETAIL_NM: '상품안내',  //상품안내
  GUIDE_READY_NM: '대출신청 전 사전준비안내',  //대출신청 전 사전준비안내

  PREJUDGE_CUSTAGREE_NM: '고객동의',  //고객동의
  PREJUDGE_SUITTEST_NM: '적합성적정성검사',  //적합성적정성검사
  PREJUDGE_SUITRESULT_NM: '적합성적정성결과',  //적합성적정성결과
  PREJUDGE_SELFCHECK_NM: '자가진단',  //자가진단
  PREJUDGE_GRTINFOINPUT_NM: '사전심사자료작성',  //사전심사자료작성
  PREJUDGE_DOCSTATUS_NM: '서류제출상태',  //서류제출상태
  
  GRTJUDGE_APPRINFO_NM: '보증승인내역 확인',  //보증승인내역 확인
  GRTJUDGE_ACCOPEN_NM: '계좌개설',  //개좌개설

  LONEXECUTE_APPLYINFOINPUT_NM: '대출신청서작성 및 실행요청',  //대출신청서작성 및 실행요청
  LONEXECUTE_AGRMINPUT_NM: '여신거래약정서 작성',  //여신거래약정서 작성
  LONEXECUTE_UNTACTAGRM_NM: '비대면 약정',  //비대면 약정
  LONEXECUTE_SUCCRESULT_NM: '대출실행결과',  //대출실행결과

  POSTMANAGEMENT_REPAY_NM: '대출상환',  //대출상환
  POSTMANAGEMENT_REVOKREPAY_NM: '계약철회 후 상환' //계약철회 후 상환

}

export default PathConstants;