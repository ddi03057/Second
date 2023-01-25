//API 목록 정의
const base = '/api'
const API = {
  GUIDE: {
    GUIDE_INDEX: `${base}/osl000/ingYn`
    
  },
  PREJUDGE: {
    PREJUDGE_CUSTAGREE: `${base}/osl100/spag`,
    PREJUDGE_SUITTEST: `${base}/osl101/sbntPopyVrfc`,
    PREJUDGE_DATACOLLECT: `${base}/osl102/dtghDataInpt`,
    PREJUDGE_CERTIFICATE: `${base}/osl103/scpg`,
    PREJUDGE_GRTINFOINPUT: `${base}/osl104/grnyExntDatWrtn`,
  },
  GRTJUDGE: {
   
  },
  LONEXECUTE: {
    LONEXECUTE_APPLYINFOINPUT: `${base}/osl302/loapIpif`

  },
  POSTMANAGEMENT: {

  }
}
export default API;