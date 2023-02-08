esgLogin
1. COM001/login.do  //로그인화면(MB1202-1M)
2. COM001/selectLoginConfirmInfo.do //로그인 전 회원여부확인
3. COM001/passwordInput.do //비밀번호 입력화면(MB1202-4M)
4. COM001/selectLogin.do  //로그인실행
  성공시 sessionData받아옴: selectLogin > restapicall(/api/mb/v1/ibkbox/ + userid)
5. MB1202-4M에서 sso호출하고 성공시 콜백에서 location.href="/"


osl로그인 설계요청
(**표시는 결정이 필요항목)
BOX로그인: 메인박스의 로그인페이지로 이동해서 진행 후 osl도메인(loan2.ibkbox.net)으로 옴

최초로그인
-사전준비안내화면 다음버튼 클릭시 BOX로그인 진행 후 즉시 정보조회약관동의화면 라우팅
**통합한도조회에서 진입시에 로그인 유지 어떻게 할지(박스사업팀 문의?)

로그인만료
  **timeout 몇초로 할지
  **timeout되기 몇초전에 로그인만료된다는 안내페이지?팝업 호출할지(해당퍼블필요), timeout(로그인 만료)되면 즉시 로그인페이지로 이동할지

중간로그인(로그인 만료시)
  **BOX로그인 진행 후 메인화면(탭3개)으로 라우팅할지 어떤화면으로 라우팅해줄지
  사전심사전 > 상품안내
  사전심사 이후 > 

로그인이슈
 BOX로그인진행후 token값 못가져오는문제 >> IBKS에서 고민중  