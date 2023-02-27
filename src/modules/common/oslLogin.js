import { getClientOs, deleteCookie, loginDomain } from "./boxlogin.js";
export default "";
// SPA로그인 시작
export const oslLogin = ()=> {
  
  if(getClientOs() == "PC"){
    // alert("pc는 지원하지 않습니다.");
    //document.querySelector("#ifrmPage").setAttribute("src", loginDomain()+"/COM001/login.do?callType=spa");
    let element = 
    `<div class="pcLoginWrap on" id="pcLoginWrap">
      <div class="bg"></div>
      <div class="pclayerPopCont">
        <iframe src="`+loginDomain()+"/COM001/login.do?callType=spa"+`" width="100%" height="100%" scrolling="auto" frameBorder="0" id="ifrmPage">이 브라우저는 iframe을
          지원하지 않습니다.
        </iframe>
      </div>
    </div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", element);
  }else{
     window.location.href = loginDomain()+"/COM001/login.do?callType=spa";
  }
}

export const oslLogout = ()=> {
  // 쿠키정리
  deleteCookie("idSave");
  deleteCookie("auth");
  deleteCookie("cookieExpires");
  sessionStorage.clear();

  // window.location.href = loginDomain() + "/magicsso/SPLogout.jsp?nextPage=" + window.location.origin+"/";
  window.location.href = "/expire";

}
	
// 	if(getCookie("auth") != undefined){
// 		if(isValidSession()){
// 			var data = parseJwt(sessionStorage.getItem("SI"));
// 			$("#headerAlertWrap").show();
// 			$("#liLoginBtn").hide();
// 			$("#liLogoutBtn").show();
			
// 			$("#gnbLoginBtn > span").text(data.lgnMnbrNm);
// 		}else{
// 			$("#headerAlertWrap").hide();
 
// 			sessionStorage.setItem("callType", "spa");
			
// 			var host = location.host;
// 			var boxName = host.substring(0, host.indexOf("."));
// 			if(boxName.indexOf("local") > -1){
// 				boxName = boxName.replace("local", "");
// 			}else if(boxName.indexOf("dev") > -1){
// 				boxName = boxName.replace("dev", "");
// 			}else{
// 				;
// 			}
			
// 			try{
// 				$("#ifrmPage").attr("src", loginDomain()+"/COM001/loginMain.do?boxName="+boxName);
// 			}catch(e){
// 				location.href = "/ui/spa/index.html";
// 			}
// 		}
// 	}else{
// 		$("#headerAlertWrap").hide();
// 		sessionStorage.clear();
// 		clearInterval(_alrtTimer);
// 	}


// function boxDomain(type, port){
// 	var boxUrl = "";
// 	if(location.href.indexOf("//local") > -1){
// 		boxUrl = "http://local"+type+".ibkbox.net:"+port;
// 	}else if(location.href.indexOf("//dev") > -1){
// 		boxUrl = "https://dev"+type+".ibkbox.net";
// 	}else{
// 		boxUrl = "https://"+type+".ibkbox.net";
// 	}
// 	return boxUrl;
// }
