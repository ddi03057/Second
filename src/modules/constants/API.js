//API 목록 정의
const base = 'api'
const API = {
  GUIDE: {
    GUIDE_INDEX: `${base}/osl000/ingYn`
    
  },
  PREJUDGE: {
    PREJUDGE_CUSTAGREE: `${base}/osl100/spag`,
    PREJUDGE_SUITTEST: `${base}/osl101/sbntPopyVrfc`,
    PREJUDGE_DATACOLLECT: `${base}/osl102/dtghDataInpt`,
    DATACOLLECT_GETCITY: `${base}/osl001/getCityInq`,
    DATACOLLECT_GETCOUNTY: `${base}/osl001/getCountyInq`,
    PREJUDGE_CERTIFICATE: `${base}/osl103/scpg`,
    PREJUDGE_GRTINFOINPUT: `${base}/osl104/grnyExntDatWrtn`,
  },
  GRTJUDGE: {
   
  },
  LONEXECUTE: {
    
    APPRINFO_GRATDTLIQ: `${base}/osl300/gratDtliq`, //보증승인내역조회
    LONEXECUTE_APPLYINFOINPUT: `${base}/osl302/loapIpif`,
    LONEXECUTE_STAMPTAX: `${base}/osl/`,
    LONEXECUTE_ARSCERTIFICATE: `${base}/osl`

  },
  POSTMANAGEMENT: {

  }
}
export default API;