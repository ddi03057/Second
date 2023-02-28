# 실행
>##### npm install : package.json 설치
>##### npm run build-dev : 개발버전 빌드
------------
# 폴더 설명
>##### modules
 >>-constants/PathConstants : 화면 url path 정의

 >>-constants/API : api 목록

 >>-constants/collectData : 화면 문구및 코드

 >>-common : 메인박스 로그인 관련 소스

 >>-common/hook : 커스텀 훅

>##### pages 
 >>-common/components : 공통 컴포넌트

 >>-각 화면 컴포넌트

>##### assets : 이미지, css 등

------------

# 주요 npm
>##### react-router-dom : router 사용
>##### http-proxy-middleware : cors와 같이 사용
>##### react-daum-postcode : 다음 주소찾기
>##### axios : api통신 처리

------------
# .env 설명
>##### REACT_APP_PROXY_PATH : api cors값 구분자 
  >>api1:메인박스 backend (로그인시 사용), 

  >>api2:osl대출박스 backend (로컬 테스트시 사용), 

  >>api3:openApi (osl대출박스 호출시 사용)
>##### REACT_APP_IBK_OAP_URL : https://devapi.ibkplatform.net:8443(오픈API)

------------
# setupProxy 설명
>##### api cors 설정
>##### 브라우저인증서 delfino 관련세팅

