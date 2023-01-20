//ajax통신 공통정의
import axios from 'axios'
import Qs from "qs";

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
  },
})

instance.interceptors.request.use(
  function (config) {
    config.headers = Object.assign(
      {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        'appKey': 'l7xxQr5uo10vlnRn1rlPNUmCRsDbOPSxJZOL'
      },
      config.headers
    );

    if (config.method === "post") {
      const contentType = config.headers["Content-type"];

      if (contentType) {
        if (contentType.includes("multipart")) {
          //
        } else if (contentType.includes("json")) {
          config.data = JSON.stringify(config.data);
        } else {
          config.data = Qs.stringify(config.data);
        }
      }
    }

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
  // @ts-ignore
  function (response) {
    const { code } = response.data || {};
    if ([109, 108].includes(code)) {
      if (!isError) {
        //ElMessage.warning("timeout");
        isError = true;
        setTimeout(() => {
          //ElMessage.destroy();
          isError = false;
        }, 2000);
      }

      return Promise.resolve({});
    } else {
      return Promise.resolve(response);
    }
  },
  function (error) {
    if (error.response) {
      if (500 === error.response.status) {
        //ElMessage.warning("Network Error");
      }
    } else if (
      error.code === "ECONNABORTED" &&
      ~error.message.indexOf("timeout") === -1
    ) {
      return Promise.reject(new Error("timeout"));
    } else {
      return Promise.reject(new Error(error.message));
    }
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