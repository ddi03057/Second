//ajax통신 공통정의
/*
IBKS에서 제공한 callOpenApi 분석
callOpenApi(uri, data, successCB, errorCB)
api uri
post방식 data param
success콜백
error콜백
1. authorization(func)
  isSessionExpire() >>> getSessionData() === null, getSessionData().expire < getCurTimestamp() true  : false
  true면 refreshAccessToken()호출 >> isSessionRefreshExpire()체크 >> getSessionData()가 null || getSessionData().refreshExpire < getCurTimestamp() true : false 
    true면 callback(null)(xhr.abort)
    아니면 isSessionRefreshExpire()체크 true이면 callback(null)(xhr.abort) false면 appKey,grantType,refresh토큰값받아와서 api(app/cm/v1/cmm300/tokenRefresh)호출 >>성공시 받아온데이터로 updateSession
  아니면 callbak(getSession())(getSessionData()갖고 accessToken 체크및 헤더추가해서 api(uri) 호출)
정리...
isSeesionExpire체크, 만료시 isSEssionRefreshExpire체크 만료시 요청취소
  isSeesionExpire체크 만료아닐시 
    oAuth값 담아서 해당 api호출,
  isSeesionExpire체크 만료, isSEssionRefreshExpire체크 만료아닐시 
    tokenRefresh api호출하고 받아온값으로 /COM001/getRefreshToken.do호출하고 storage.setItem("si"), 받아온 값으로 oAuth값 담아서 해당 api호출
*/
import axios from 'axios'
import { authorization, getSessionData } from '../common/tokenBase';

let isError = false;

const instance = axios.create({
 // baseURL: "/api1/",
  timeout: 300000,
  transformRequest: [
    function (data) {
      return data;
    },
  ],
  transformResponse: [
    function (data) {
      return JSON.parse(data);
    },
  ],
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, DELETE, PUT, POST, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

instance.interceptors.request.use(
  function (config) {
    
    authorization(getSessionData());

    config.headers = Object.assign(
      config.headers,
      { "appKey": ""//true?process.env.REACT_APP_LRB_APP_KEY:process.env.REACT_APP_MNB_APP_KEY 
      }
    );
    config.data = JSON.stringify(config.data);

    return Promise.resolve(config);
  },
  function (error) {
    return Promise.reject(error);
  }
);


// Axios.interceptors.request.use(
//   config => {
//     //요청을 보내기 전에 수행할 로직
//     return config;
//   },
//   error => {
//       return Promise.reject(error)
//   }
// )

// Axios.interceptors.response.use(
//   response => {
//     //응답에 대한로직
//     const res = response.data;
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

instance.interceptors.response.use(
  
  function (response) {
    //response 가공
    return Promise.resolve(response);
  },
  function (error) {
    //오류 처리
    return Promise.reject(error);
  }
);



const request = async function (opt) {
  const options = {
    // baseURL: config.public.API_URL,
    baseURL: "/api1/",
    method: "GET",
    ifHandleError: true,
    ...opt,
  };

  try {
    const response = (await instance(options));
    // if (!response.success && options.ifHandleError) {
    //   //[todo]처리
    // }

    return response;
  } catch (error) {
    console.log("resErr", error);
    return error;
  }
};

export default request;