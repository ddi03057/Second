esgLogin
1. COM001/login.do  //로그인화면(MB1202-1M)
2. COM001/selectLoginConfirmInfo.do //로그인 전 회원여부확인
3. COM001/passwordInput.do //비밀번호 입력화면(MB1202-4M)
4. COM001/selectLogin.do  //로그인실행
  성공시 sessionData받아옴: selectLogin > restapicall(/api/mb/v1/ibkbox/ + userid)
5. MB1202-4M에서 sso호출하고 성공시 콜백에서 location.href="/"