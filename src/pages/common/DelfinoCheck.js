import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import API from "../../modules/constants/API.js";
import callOpenApi from "../../modules/common/tokenBase.js";
import ReactDelfino from "../../react-delfino";

/**
 * 컴포넌트명 : 브라우저 인증
 * 설명 : 브라우저 인증서 호출 및 인증값 전송
 * @param {*} props
 * props항목별 설명
 */
function DelfinoCheck(props) {

  const [delfinoLoaded, setDelfinoLoaded] = useState(false);
  const resultAction = "/jsp/signResult";
  let Delfino, DelfinoConfig;

  let multiSignDelimiter = '';
  let browserName;

  function TEST_checkExpireWarning(certExpireDate) {
    var beforeDay = 180;
    if (certExpireDate == null) return;

    var year = certExpireDate.substring(0,4);
    var month = certExpireDate.substring(5,7);
    var day = certExpireDate.substring(8,10);

    var toDay = new Date();
    var expireDate = new Date(year, month-1, day, "23", "59", "59");
    var betweenDay = (expireDate.getTime()-toDay.getTime())/1000/60/60/24;

    //alert(year + ":" + month + ":"+ day + "\n" + parseInt(betweenDay, 10));
    if (betweenDay <= beforeDay) alert("인증서 만료일은 " +  certExpireDate + " 입니다. " + parseInt(betweenDay, 10) + "일 남았습니다.");
}

  function TEST_scrapingSign(isMulti) {
    if (document.delfinoForm.SIGN_Delimeter.value == "") isMulti = false;
    document.delfinoForm.PKCS_TYPE.value = "scrapingSign";
  
    var tbsData = "델피노 test 스크래핑용 서명원문1";
    if (isMulti) tbsData = [document.delfinoForm.nonce1.value, document.delfinoForm.nonce2.value];
  
    var signOptions = {};
    signOptions.cacheCert = false;
    signOptions.resetCertificate = true;
    signOptions.policyOidCertFilter = "";
  
    alert("스크래핑용서명원문\n[" + tbsData + "]");
    Delfino.scrapingSign(tbsData, signOptions, TEST_complete);
  }

  function TEST_complete(result){
    // __result = result;
    if(result.status==0) return;
    if(result.status==1){
        document.delfinoForm.PKCS7.value = result.signData;
        if (document.delfinoForm.PKCS_TYPE.value == "mdSign" && Array.isArray(result.signData)) document.delfinoForm.PKCS7.value = result.signData.join(document.delfinoForm.SIGN_Delimeter.value);
        document.delfinoForm.VID_RANDOM.value = result.vidRandom;

        document.delfinoForm.MACAddress.value = "_";
        document.delfinoForm.tokenSerialNumber.value = "_";
        document.delfinoForm.CONFIRM_PKCS7.value = "";

        //TODO: scrapingSign 결과값
        document.delfinoForm.signingCert.value = "";
        document.delfinoForm.signingTime.value = "";
        document.delfinoForm.withoutSignedPkcs7.value = "";
        document.delfinoForm.withoutSignedPkcs1.value = "";
        if(result.cert!=null) document.delfinoForm.signingCert.value = result.cert;
        if (document.delfinoForm.PKCS_TYPE.value == "scrapingSign") {
            if (Array.isArray(result.signData)) {
                var pkcs7 = "";
                var withoutSignedPkcs7 = "";
                var withoutSignedPkcs1 = "";
                var signingTime = "";
                for (var i=0; i<result.signData.length; i++) {
                    pkcs7 += result.signData[i].p7 + document.delfinoForm.SIGN_Delimeter.value;
                    withoutSignedPkcs7 += result.signData[i].p7WithoutSignedAttribute + document.delfinoForm.SIGN_Delimeter.value;
                    withoutSignedPkcs1 += result.signData[i].p1 + document.delfinoForm.SIGN_Delimeter.value;
                    signingTime += result.signData[i].signingTime + document.delfinoForm.SIGN_Delimeter.value;
                }
                document.delfinoForm.signData1.value = result.signData[0].p1;
                document.delfinoForm.signData2.value = result.signData[1].p1;
                document.delfinoForm.certTxt1.value = result.cert;
                document.delfinoForm.PKCS7.value = pkcs7;
                document.delfinoForm.withoutSignedPkcs7.value = withoutSignedPkcs7;
                document.delfinoForm.withoutSignedPkcs1.value = withoutSignedPkcs1;
                document.delfinoForm.signingTime.value = signingTime;
            } else {
                //document.delfinoForm.PKCS7.value = result.signData;
                document.delfinoForm.withoutSignedPkcs7.value = result.signData;
                if(result.pkcs1SignData!=null) document.delfinoForm.withoutSignedPkcs1.value = result.pkcs1SignData;
                if(result.signingTime!=null) document.delfinoForm.signingTime.value = result.signingTime;
            }
        }

        if(result.confirmSignData!=null) document.delfinoForm.CONFIRM_PKCS7.value = result.confirmSignData;
        if(result.MACAddress!=null) document.delfinoForm.MACAddress.value = result.MACAddress;
        if(result.tokenSerialNumber!=null) document.delfinoForm.tokenSerialNumber.value = result.tokenSerialNumber;
        if(result.certExpireDate!=null) TEST_checkExpireWarning(result.certExpireDate);

        //CertGate
        document.delfinoForm.EA_serviceType.value = "_";
        document.delfinoForm.EA_signSubjectDN.value = "_";
        if(result.serviceType!=null) document.delfinoForm.EA_serviceType.value = result.serviceType;
        if(result.signSubjectDN!=null) document.delfinoForm.EA_signSubjectDN.value = result.signSubjectDN;

        document.delfinoForm.submit();
    }
    else{
        //if (Delfino.isPasswordError(result.status)) alert("비밀번호 오류 횟수 초과됨"); //v1.1.6,0 over & DelfinoConfig.passwordError = true
        alert("error:" + result.message + "[" + result.status + "]");
    }
}

var yessignCaHost_real;
    var yessignCaPort_real;
    var crosscertCaPort_real;
    var crosscertCaHost_real;
    var signkoreaCaHost_real;
    var signkoreaCaPort_real;
    var kicaCaHost_real;
    var kicaCaPort_real;
    var yessignWebCmpUrl_real;
    var finCertSdkUrl_real;
    var finCertCorpSdkUrl_real;
    var encryptedFinCertParams_real;
    function TEST_setFinCert(domain) {
        if (domain == "kbstar.com") {
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = "hMnB4z4fVb2tXA4AVtfqrvvN0JMoOrKw7RCE0HPW1/wBgkV4L89ElQLuBQRH/bs+RNfa3CIHnVvuXkZ6tMzdGOIJgGgEhVwtQXdxOAnpLsDk1n24H+ur+BICeZ/h1Huw";
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams_test = "95aVFoTFEd4gosXHAuPmZFPayInQ4lIqp0F3dqnsCSvM2Wa6KebxuREZuOyYffHP3oL0By7VgJjXIs9iuCQNPrFnpXblvL6Q+999tNfyCWOwS2q2gn0fB1M+Y4fiC3Xd";
            encryptedFinCertParams_real = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams;
        } else if (domain == "kfcc.co.kr") {
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = "O9lAT0m7Uwa4h7ZE668E7O+RCx4IJitZUQUX0JUf+Kd0IbJwaylET2K9UqJqU5tmZVGfqCk/kpYtvKFt1wUJOgzvTXSrQFvhaMziQSazHnBjwh32C6m+ngL0atOHTfBw";
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams_test = "bKXlUzYmpmeLzW9h9VjDc2f4pMNK089k3Xg+9vTW00JJs1gQx//ad3OnBjda0SX6g+DBwDHmilnyW4qiE6r2og2mywbDf2iIryeM5XyMbDkAJ6UxH/whmz5W0nnwXkGF";
            encryptedFinCertParams_real = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams;
        }
        if (global._Delfino_SystemMode == "test" || global._Delfino_SystemMode == "dev" ) {
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl_test;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl_test;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams_test;
        } else {
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl = "https://4user.yeskey.or.kr/v1/fincert.js";
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl = "https://4user.yeskey.or.kr/v1/fincertCorp.js";
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = encryptedFinCertParams_real;
        }
    }
    if (document.location.hostname.indexOf("kbstar.com") >= 0) {
        if (window.confirm("kbstar.com 도메인용 encryptedFinCertParams으로 변경하시겠습니까?")) TEST_setFinCert("kbstar.com");
    } else if (document.location.hostname.indexOf("kfcc.co.kr") >= 0) {
        if (window.confirm("kfcc.co.kr 도메인용 encryptedFinCertParams으로 변경하시겠습니까?")) TEST_setFinCert("kfcc.co.kr");
    }

    function TEST_selectCA(caType, caName) {
        if (caType == "real") {
            DelfinoConfig.yessignCaHost    = yessignCaHost_real;
            DelfinoConfig.yessignCaPort    = yessignCaPort_real;
            DelfinoConfig.crosscertCaPort  = crosscertCaPort_real;
            DelfinoConfig.crosscertCaHost  = crosscertCaHost_real;
            DelfinoConfig.signkoreaCaHost  = signkoreaCaHost_real;
            DelfinoConfig.signkoreaCaPort  = signkoreaCaPort_real;
            DelfinoConfig.kicaCaHost       = kicaCaHost_real;
            DelfinoConfig.kicaCaPort       = kicaCaPort_real;
            DelfinoConfig.yessignWebCmpUrl = yessignWebCmpUrl_real;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl = finCertSdkUrl_real;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl = finCertCorpSdkUrl_real;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = encryptedFinCertParams_real;
        } else {
            DelfinoConfig.yessignCaHost    = DelfinoConfig.yessignCaHost_test;
            DelfinoConfig.yessignCaPort    = DelfinoConfig.yessignCaPort_test;
            DelfinoConfig.crosscertCaPort  = DelfinoConfig.crosscertCaPort_test;
            DelfinoConfig.crosscertCaHost  = DelfinoConfig.crosscertCaHost_test;
            DelfinoConfig.signkoreaCaHost  = DelfinoConfig.signkoreaCaHost_test;
            DelfinoConfig.signkoreaCaPort  = DelfinoConfig.signkoreaCaPort_test;
            DelfinoConfig.kicaCaHost       = DelfinoConfig.kicaCaHost_test;
            DelfinoConfig.kicaCaPort       = DelfinoConfig.kicaCaPort_test;
            DelfinoConfig.yessignWebCmpUrl = DelfinoConfig.yessignWebCmpUrl_test;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl_test;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl_test;
            DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams_test;
        }
        if (caName == "yessign") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.yessignCaHost + ":" + DelfinoConfig.yessignCaPort + "]");
        } else if (caName == "crosscert") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.crosscertCaHost + ":" + DelfinoConfig.crosscertCaPort + "]");
        } else if (caName == "signkorea") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.signkoreaCaHost + ":" + DelfinoConfig.signkoreaCaPort + "]");
        } else if (caName == "kica") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.kicaCaHost + ":" + DelfinoConfig.kicaCaPort + "]");
        } else if (caName == "yessignWebCmp") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.yessignWebCmpUrl + "]");
        } else if (caName == "fincert") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl + "]");
        } else if (caName == "fincertcorp") {
            alert("[" + caType + "," + caName + "][" + DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl + "]");
        }
    }
    function TEST_certComplete(code, msg){
        if(code!=1){
          if(code==0){
            alert("사용자가 취소하였습니다.");
            return;
          } else {
            //발급/갱신 에러
            alert("발급오류:" + code + ":" + msg);
          }
          return;
        }
        alert("인증서 발급에 성공하였습니다.");
    }
    function TEST_certComplete2(result){
        TEST_certComplete(result.status, result.message);
    }

    function TEST_requestCertificate(){
        var caType = document.certForm.caType.value;
        var caName = document.certForm.caName.value;
        var referenceValue = document.certForm.referenceValue.value;
        var secretValue = document.certForm.secretValue.value;
        TEST_selectCA(caType, caName);

        if (caName == "fincert" || caName == "fincertcorp") {
            if (!(Delfino.getModule() == "G4" || Delfino.getModule() == "G10")) {
                if (!window.confirm("금융인증서 발급기능은 G4/G10만 지원합니다. G10으로 변경하시겠습니까?")) return;
                Delfino.setModule("G10");
            }
        }

        if (caName == "kica") {
            Delfino.requestCertificate2(caName, referenceValue, secretValue, TEST_certComplete2, {enableKmCert:true}); //정보인증 발급
            //Delfino.requestCertificate2(caName, referenceValue, secretValue, TEST_certComplete, {recovery:true, enableKmCert:true}); //정보인증 재발급
        } else if (caName == "yessignWebCmp") {
            Delfino.requestCertificate2(caName, referenceValue, secretValue, TEST_certComplete2, {browserCertificate:true}); //브라우저인증서 발급
        } else if (caName == "fincert") {
            Delfino.requestCertificate2("fincert", referenceValue, secretValue, TEST_certComplete2, {simpleKeyReq:true, showComplete: true}); //개인금융인증서 발급
        } else if (caName == "fincertcorp") {
            var bizNoValue = document.certForm.bizNoValue.value;
            Delfino.requestCertificate2("fincert", referenceValue, secretValue, TEST_certComplete2, {finCertMode: 'fincertcorp', simpleKeyReq: true, showComplete: true, bizNo: bizNoValue}); //기업금융인증서 발급
        } else {
            Delfino.requestCertificate(caName, referenceValue, secretValue, TEST_certComplete);
        }
    }

    function TEST_updateCertificate(){
        var caType = document.certForm.caType.value;
        var caName = document.certForm.caName.value;
        TEST_selectCA(caType, caName);

        if (caName == "fincert") {
            alert("금융(개인)인증서 갱신기능은 제공하지 않습니다.");
            return;
        }
        if (caName == "fincert" || caName == "fincertcorp") {
            if (!(Delfino.getModule() == "G4" || Delfino.getModule() == "G10")) {
                if (!window.confirm("금융인증서 갱신기능은 G4/G10만 지원합니다. G10으로 변경하시겠습니까?")) return;
                Delfino.setModule("G10");
            }
        }

        //Delfino.resetCertificate(); //인증서캐쉬 초기화
        //Delfino.setIssuerCertFilter(''); //인증서 필터링

        if (caName == "kica") {
            Delfino.updateCertificate2(caName, TEST_certComplete2, {resetCertificate:true, cacheCert:false, enableKmCert:true}); //정보인증 갱신
        } else if (caName == "yessignWebCmp") {
            Delfino.updateCertificate2(caName, TEST_certComplete2, {cacheCert:false, policyOidCertFilter:"1.2.410.200005.1.1.1-B|1.2.410.200005.1.1.5-B"}); //브라우저인증서 갱신
        } else if (caName == "fincertcorp") {
            var bizNoValue = document.certForm.bizNoValue.value;
            var certSeqNumValue = document.certForm.certSeqNumValue.value;
            Delfino.updateCertificate2('fincert', TEST_certComplete2, {finCertMode: 'fincertcorp', resetCertificate:true, cacheCert:false, certSeqNum: certSeqNumValue, bizNo: bizNoValue});
        } else {
            //Delfino.updateCertificate(caName, TEST_certComplete);
            Delfino.updateCertificate2(caName, TEST_certComplete2, {cacheCert:false, policyOidCertFilter:""}); //인증서캐쉬정보 사용하기
        }
    }

    function TEST_importCheck() {
        document.relayForm.cmd.value = "deviceAuth";
        document.relayForm.index.value = "168";
        document.relayForm.pubKey.value = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4A577nBWpsnjQ0hbURGA2Ol1O+w5mE+Bi+bBuoVLtxuUW1P5RG5skKvh6gFnG/1A2PBwNaNNBB5U8Dh8mBjpxQQovNx6qzSAGNz9Tbwu7+kfRZLR8MMol6So55otgMZ9+9viIaRSmTrkdAHaex/EJMIvcaWutpFKFpPb6y+78s9oEkESR61fqcH4xC54vnZDNIW0warcI1lJElS0HdmG26ta5JnCIq92/gyGyCCGYhn7B4fYHdDcFg+ahH5jXfAWFDQWe4W25nIK8Tg6qRFRg+zdqak4dAffwXr7Q/dSNpuy5+QoqnjB5j6GyoiMPDs4S9lwc0tDCNqPEBu2BpgNvQIDAQAB";
        document.relayForm.clientAuth.value = "m3k6rN9VL8HHVoLpEKQMiMXNcmRJ/XQyrmMG79UCtDxccsFSVWmMr4aDoRBGzO5N";
        document.relayForm.serverAuth.value = "Dlblmscimifdm4vesG50rg==";
        document.relayForm.sessionKey.value = "SzfO+wkYBd2PjA2kSxa5Bgo3ZS7wjkgvdkoa248//WiTPLujzCEqNSFHmGIqFoxecPKUUyN8p2huPg5GaNB22cNISGnxm5XWYdA4vkCDlU5Ye0X7krWxA3dSITCN8Fc5wIHMZ8/BtF/1Yru0GedxDj/i5hbCuW2PTSmtVci93j0N3NZqkCv+IOGiWetbPk6YdiW7RDv7pmwXNUvce/D4cRFlbya5F5w1FKppGhrTTSEN/6BHLQ1pTrdCaB38PxfE3+QYCw8nA6Rd4t14CiujErN9qNkN5gLHacRplTyIBiQHYGmbjJZi43W+A7fok3f+s8ifa7NIEdHZasDcw0cW5Q==";
        document.relayForm.signedData.value = "fgR4wXbTRLMiUf2o44WMtlW1V/RnAq4bfLWwwOf4hNf/Cj5uPJK4w6YJW4NoKFDZ9FxY6EV9cuuCNsW00S6Zd89ZUSATsnFstJukVBGaMHNr/eSjVVt6xtV9vN9ORP/7rXxDAUwwHQoZ0L55VWlUBL3GliDZUzHBX189TX0el+KOvmPoCF6HUTuGfZVEhqfSStEPlfKaeEIIKzdfb743ATLXCEhSMaB3ogPEq5PkUesJQTfzJC8vzpke9yW55pp2g4ihhWw1CljwLeJArdmUz/Z2Vm67h4s3txBmZPlMQbb5q12DCxmi7DwMB7dgNVeMl1vMDtc++YroHkNHHP/Ehw==";
        document.relayForm.method="post";
        document.relayForm.target="testResult";
        document.relayForm.action = DelfinoConfig.certRelay.providerUrl;
        document.relayForm.submit();
    }
    function TEST_relayCheck() {
        document.relayForm.cmd.value = "check";
        document.relayForm.index.value = "";
        document.relayForm.pubKey.value = "";
        document.relayForm.clientAuth.value = "";
        document.relayForm.serverAuth.value = "";
        document.relayForm.sessionKey.value = "";
        document.relayForm.signedData.value = "";
        document.relayForm.method="get";
        document.relayForm.target="testResult";
        document.relayForm.action = DelfinoConfig.certRelay.providerUrl;
        document.relayForm.submit();
    }

    function TEST_importCertificate(){
        Delfino.importCertificate(TEST_completeImport);
    }
    function TEST_exportCertificate(){
        Delfino.exportCertificate(TEST_completeExport);
        //Delfino.exportCertificate({disableExpireFilter:true}, TEST_completeExport); //만료된 인증서 보이기
    }
    function TEST_completeImport(result) {
        if(result.status==0) {
            alert("가져오기 취소"); //사용자취소
        } else if(result.status==1) {
            alert("가져오기 성공");
        } else {
            alert(result.message + "[" + result.status + "]");
        }
    }
    function TEST_completeExport(result) {
        if(result.status==0) {
            alert("내보내기 취소"); //사용자취소
        } else if(result.status==1) {
            alert("내보내기 성공");
        } else {
            alert(result.message + "[" + result.status + "]");
        }
    }
    function TEST_manageCertificate() {
        Delfino.manageCertificate();
    }
    // "[<b>"+global.DC_platformInfo.type+","+global.DC_platformInfo.name+","+global.DC_platformInfo.Mobile+"</b>][<b>"+global.DC_browserInfo.name+","+global.DC_browserInfo.version+"</b>]["+global.navigator.appName+"]"


    useEffect(()=> {
        // 마운트 되었을 때,
        console.log(ReactDelfino.Delfino, ReactDelfino.DelfinoConfig);
        if(!delfinoLoaded) {
            ReactDelfino.init().then(()=> {
                console.log(ReactDelfino.Delfino, ReactDelfino.DelfinoConfig);
                Delfino = ReactDelfino.Delfino;
                DelfinoConfig = ReactDelfino.DelfinoConfig;
                setDelfinoLoaded(true);

                yessignCaHost_real    = DelfinoConfig.yessignCaHost;
                yessignCaPort_real    = DelfinoConfig.yessignCaPort;
                crosscertCaPort_real  = DelfinoConfig.crosscertCaPort;
                crosscertCaHost_real  = DelfinoConfig.crosscertCaHost;
                signkoreaCaHost_real  = DelfinoConfig.signkoreaCaHost;
                signkoreaCaPort_real  = DelfinoConfig.signkoreaCaPort;
                kicaCaHost_real       = DelfinoConfig.kicaCaHost;
                kicaCaPort_real       = DelfinoConfig.kicaCaPort;
                yessignWebCmpUrl_real = DelfinoConfig.yessignWebCmpUrl;
                finCertSdkUrl_real    = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertSdkUrl;
                finCertCorpSdkUrl_real= DelfinoConfig.cg.VPCGClientConfig.finCertOptions.finCertCorpSdkUrl;
                encryptedFinCertParams_real = DelfinoConfig.cg.VPCGClientConfig.finCertOptions.encryptedFinCertParams;

                if (typeof(DelfinoConfig.cg) == "object") DelfinoConfig.cg.VPCGClientConfig.defaultProvider = "delfino";


                // 모듈캐쉬기능 사용시 샘플/START
                // Delfino.resetRecentModule();
                Delfino.setModule();
                //if (!DC_platformInfo.Mobile) { Delfino.resetRecentModule(); Delfino.setModule(); }
                console.log('init done end');
            });
        } else {
            Delfino = ReactDelfino.Delfino;
            DelfinoConfig = ReactDelfino.DelfinoConfig;
        }
        return ()=> {
            // unmount 된 후.
        };
    }, [delfinoLoaded]);

  /**
   * 서명값 인증을 위한 Step1 Data 호출 
   */
  const callApiFn = ()=> {
    callOpenApi(
      API.PREJUDGE.PRE_SCPG,
      (res)=> {
        if(res.data.RSLT_DATA.resultYn === "Y") {
          TEST_scrapingSign();
        }
        
      },
      ()=> {

      }
    );
  };

  useLayoutEffect(()=> {
    callOpenApi();
  }, [])
  
  

  

  return (
    <>
    </>
      
  );
}

export default DelfinoCheck;