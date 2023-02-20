import axios from "axios";
import request from "../utils/Axios";
import { getCookie } from "./boxlogin";
import oslLogin from "./oslLogin";

/**
 * 주의사항 : 반드시 env.js 가 import 되어야 한다.
 */
var _APP_KEY          = "l7xxK128ZveJ93TckkQ3lfiy4BBL8XGHeJJP";
var _STORAGE_KEY = "session";
var _SESSION_KEY = "SI";

var _EXPIRE_KEY = "expire";

var _REFRESH_EXPIRE_KEY = "refresh_expire";
var _REFRESH_TOKEN_EXPIRE_KEY = "refreshExpire";

var _ACCESS_TOKEN_KEY = "accessToken";

var _REFRESH_TOKEN_KEY = "refreshToken";

var _TOKEN_TYPE_KEY = "tokenType";

var _PROFILE_IMG_KEY  = "profileImage";
var _PROFILE_NM_KEY   = "bplcNm";
var _PROFILE_TYPE_KEY = "indvEnprDcd";
var _PROFILE_ATHR_CD  = "lgnMmbrAthrCd";
var _PROFILE_BSNN_NO  = "mmcrBsnnNo";

var _POST_METHOD = "POST";
var _GET_METHOD = "GET";

var _REFRESH_TOKEN_GRANT_TYPE = "refresh_token";

var _REFRESH_TOKEN_EXPIRESIN = 3600;


/**
 * 여기서 사용하는 storage를 정의한다.
 */
//var _STORAGE = localStorage;	
var _STORAGE = sessionStorage;

/*
1. authorization(callback)
2. isSessionExpire()
3. refreshAccessToken(callback)
4. isSessionRefreshExpire()

*/

//callOpenApi
export default async ( uri, data, successCB, errorCB )=> {
	
	//console.log( "callOpenApi: uri="+uri );
	//console.log( "callOpenApi: data="+JSON.stringify(data,null,2) );
	
	authorization( async function( oAuth ) {
		
		console.log("authorization");

		var successCallBack = successCB || AjaxSuccessHandler;
		var errorCallBack = errorCB || AjaxErrorHandler;
		var appKey = _APP_KEY;
		var sendData = data || {};

		// if( oAuth == null || oAuth.accessToken == null ) {
		// 	oslLogin();
		// 	return ;
		// }
		
		let configData = {
			headers: {
				"Content-Type": "application/json",
				"appKey": "l7xxQr5uo10vlnRn1rlPNUmCRsDbOPSxJZOL",
				"Authorization": oAuth.tokenType+" "+oAuth.accessToken,
				"lgnMnbrId": "VPK82Psm2d"
			}
		}

		// await axios.post(
		// 	"/api2/" + uri,
		// 	JSON.stringify(sendData),
		// 	configData
		// ).then((res)=> {
		// 	console.log("tkbase_response", res);
		// 	successCallBack(res);
		// }).catch((jqXHR, textStatus, exception, errorThrown)=> {
		// 	errorCallBack(jqXHR, textStatus, exception, errorThrown);
		// });
		
    const res = await request({
      method: "post",
      url: uri,
      data: JSON.stringify(sendData),
			headers: configData.headers
    })
      .then((response) => {
				console.log("requestAxios", response);
				successCallBack(response);
        return response;
      })

      .catch((error) => {
				errorCallBack(error);
        console.log("error : ", error);
      });
		
		console.log(2222222);
		// $.ajax({
		// 	type: _POST_METHOD,
		// 	url: _OPEN_API_URL + uri,
		// 	beforeSend: function (xhr){
		// 		xhr.setRequestHeader( "Content-Type", "application/json"  );
		// 		xhr.setRequestHeader( "appKey", appKey );
				
		// 		if( oAuth == null || oAuth.accessToken == null ){
		// 			//alert("로그인 이후 이용하시기 바랍니다.");
		// 			xhr.abort();
		// 		}
		// 		else{
		// 			xhr.setRequestHeader( "Authorization", oAuth.tokenType+" "+oAuth.accessToken );				
		// 		}			
				
		// 	},
		// 	data: JSON.stringify(sendData),
		// 	success: function (data){
		// 		successCallBack(data);
		// 	},
		// 	error: function (jqXHR, textStatus, exception, errorThrown){
		// 		errorCallBack(jqXHR, textStatus, exception, errorThrown);
		// 	}
		// });
	});
}

export const authorization = ( callback )=> {
	
	if( isSessionExpire() ){
		console.log("SessionExpire=true");
		if(refreshAccessToken( callback )) return true;	
	}
	else{
		console.log("SessionExpire=false");
		if(callback === null) return true;
		callback( getSessionData() );	
	}
}

function refreshAccessToken( callback ){
	
	if( isSessionRefreshExpire() ) {
		console.log("SessionRefreshExpire==>true");
		if(callback === null) return false;
		// callback(null);
		window.location.href = "/expire";
	}
	else{
		console.log("SessionRefreshExpire==>false", callback);
		if(callback === null) return true;
		//var refreshToken = getRefreshToken();
		var refreshToken = getSessionRefreshToken();
		
		if( refreshToken == null ){
			// callback(null);
			window.location.href = "/exipre";
		}
		else
		{
			//console.log("refreshToken==>"+refreshToken);
			
			var sendData = {
					"appKey": _APP_KEY,
					"refreshToken": refreshToken,
					"grantType": _REFRESH_TOKEN_GRANT_TYPE
			};

			let configData = {
				headers: {
					"Content-Type": "application/json",
					"appKey": _APP_KEY
				}
			}

			axios.post(
				"/api3/app/cm/v1/cmm300/tokenRefresh",
				JSON.stringify(sendData),
				configData
			).then((res)=> {
				console.log("refreshToken", res);
				updateSession(res, callback);
			}).catch((jqXHR, textStatus, exception, errorThrown)=> {
				console.log("refeshError", exception);
				//callback(null);
			});
			
			// $.ajax({
			// 	type: _POST_METHOD,
			// 	url: _OPEN_API_URL + _ACCESS_TOKEN_REFRESH_URI,
			// 	beforeSend: function (xhr){
			// 		xhr.setRequestHeader( "Content-Type", "application/json"  );
			// 		xhr.setRequestHeader( "appKey", _APP_KEY );
			// 	},
			// 	data: JSON.stringify(sendData),
			// 	success: function(data){
			// 		//saveStorage(data);
			// 		//updateStorage(data);
			// 		//console.log( "refresh token success="+JSON.stringify(data,null,2) );
			// 		updateSession(data, callback);
			// 		//callback(data);
			// 	},
			// 	error: function (jqXHR, textStatus, exception, errorThrown){
			// 		//AjaxErrorHandler(jqXHR, textStatus, exception, errorThrown);
			// 		callback(null);
			// 	}
			// });
		}
	}
}

function updateSession( newData, callback ){	
	var data = getSessionData();
	if( data ){
		for(let key in newData ){
			/**
			 * Token 갱신시에 2개의 필드는 널이 리턴되므로 업데이트 하지 않음
			 */
			if( key !== "grantType" && key !== "refreshTokenExpiresIn" ){
				data[key] = newData[key];
			}
		}
	}
	else{
		data = newData;
	}
	
	let configData = {
		headers: {
			"Content-Type": "application/json"			
		}
	}
	axios.post(
		"/api1/COM001/getRefreshToken.do", 
		JSON.stringify(data), 
		configData
	).then((token) => {
		console.log("getRefreshToken", token.data.si);
		saveSession(token.data.si);
		callback(data);
	}).catch((jqXHR, textStatus, exception, errorThrown)=> {
		AjaxErrorHandler(jqXHR, textStatus, exception, errorThrown);
	});
/*
	$.ajax({
		type: _POST_METHOD,
		url: "/COM001/getRefreshToken.do",
		beforeSend: function (xhr){
			xhr.setRequestHeader( "Content-Type", "application/json"  );
		},
		data: JSON.stringify(data),
		success: function(token){
			//console.log( "token="+JSON.stringify(token,null,2) );
			saveSession(token.si);
			//console.log( "data2="+JSON.stringify(data,null,2) );
			callback(data);
		},
		error: function (jqXHR, textStatus, exception, errorThrown){
			AjaxErrorHandler(jqXHR, textStatus, exception, errorThrown);
		}
	});
*/
}

export const getSessionData = ()=> {
	var token = _STORAGE.getItem(_SESSION_KEY);
	console.log("token="+JSON.stringify(token,null,2));
	if( token == null || token === undefined || token === "undefined"){
		return null;
	}
	return parseJwt(token);	
}

export const isSessionExpire = ()=> {	
	if( getSessionData() == null ){
		return true;
	}
	
	console.log("isSessionExpire: session time="+getSessionValue(_EXPIRE_KEY)+" cur time="+getCurTimestamp());
	
	if( getSessionValue(_EXPIRE_KEY) < getCurTimestamp() ){
		return true;
	}
	return false;
}

export const isSessionRefreshExpire = ()=> {	
	if( getSessionData() == null ){
		return true;
	}	
	if( getSessionValue(_REFRESH_TOKEN_EXPIRE_KEY) < getCurTimestamp() ){
		return true;
	}
	return false;
}

function getCurTimestamp(){
	return Math.floor(new Date().getTime()/1000);
}

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
}


function getStorageObj(data){
	var cur = getCurTimestamp();
	data[_EXPIRE_KEY] = cur+data.expiresIn-1;
	data[_REFRESH_EXPIRE_KEY]= cur+_REFRESH_TOKEN_EXPIRESIN-1;
	return data;
}

function initSession(token){	
	var data = parseJwt(token);
	//console.log("token="+JSON.stringify(data,null,2));
	return getStorageObj(data);
}

function saveStorage( input ){	
	var data = getStorageObj(input);
	_STORAGE.setItem(_STORAGE_KEY,JSON.stringify(data));
}

function saveSession(token){
	//initSession(token);
	_STORAGE.setItem(_SESSION_KEY,token);
}

function updateStorage( input ){	
	var data = getStorageData();
	var newData = getStorageObj(input);
	if( data ){
		for(let key in newData ){
			data[key] = newData[key];
		}
		_STORAGE.setItem(_STORAGE_KEY,JSON.stringify(data));
	}
	else{
		_STORAGE.setItem(_STORAGE_KEY,JSON.stringify(newData));
	}
}

function getStorageData(){
	var sessionData = _STORAGE.getItem(_STORAGE_KEY);
	if( sessionData === undefined ){
		return null;
	}
	return JSON.parse(sessionData);	
}

function getStorageValue( key ){	
	var rawData = _STORAGE.getItem(_STORAGE_KEY);
	if( rawData != null ){
		var data = getStorageData();	
		return data[key];
	}
	return null;
}

function getSessionValue( key ){	
	var token = _STORAGE.getItem(_SESSION_KEY);
	if( token != null ){
		var data = getSessionData();	
		return data[key];
	}
	return null;
}

function isExpire(){	
	if( getStorageData() == null ){
		return true;
	}	
	if( getStorageValue(_EXPIRE_KEY) < getCurTimestamp() ){
		return true;
	}
	return false;
}

function isRefreshExpire(){	
	if( getStorageData() == null ){
		return true;
	}	
	if( getStorageValue(_REFRESH_EXPIRE_KEY) < getCurTimestamp() ){
		return true;
	}
	return false;
}

function clearStorage(){
	_STORAGE.clear();
}


function getTokenType(){
	return getStorageValue( _TOKEN_TYPE_KEY );
}

function getRefreshToken(){
	return isRefreshExpire() ? null : getStorageValue( _REFRESH_TOKEN_KEY );
}

function getSessionRefreshToken(){
	return isSessionRefreshExpire() ? null : getSessionValue( _REFRESH_TOKEN_KEY );
}

/*
function getOpenApi( uri, data, successCB, errorCB ){
	
	var successCallBack = successCB || AjaxSuccessHandler;
	var errorCallBack = errorCB || AjaxErrorHandler;
	var appKey = _APP_KEY;
	var sendData = data || {};
	
	//console.log("sendData=["+ sendData +"]");
	//console.log("callOpenApi: oAuth=",JSON.stringify(oAuth,null,2));
	
	$.ajax({
		type: _GET_METHOD,
		url: _OPEN_API_URL + uri,
		beforeSend: function (xhr){
			xhr.setRequestHeader( "Content-Type", "application/json"  );
			xhr.setRequestHeader( "appKey", appKey );
		},
		data: sendData,
		success: function (data){
			successCallBack(data);
		},
		error: function (jqXHR, textStatus, exception, errorThrown){
			errorCallBack(jqXHR, textStatus, exception, errorThrown);
		}
	});
}

function getOpenServer( uri, data, successCB, errorCB ){
	
	var successCallBack = successCB || AjaxSuccessHandler;
	var errorCallBack = errorCB || AjaxErrorHandler;
	var sendData = data || {};
	
	$.ajax({
		type: _GET_METHOD,
		url: uri,
		data: sendData,
		success: function (data){
			successCallBack(data);
		},
		error: function (jqXHR, textStatus, exception, errorThrown){
			errorCallBack(jqXHR, textStatus, exception, errorThrown);
		}
	});
}

function callOpenApiNonAuth( uri, data, successCB, errorCB ){
	var successCallBack = successCB || AjaxSuccessHandler;
	var errorCallBack = errorCB || AjaxErrorHandler;
	
	$.ajax({
		type: _POST_METHOD,
		url: _OPEN_API_URL + uri,		
		beforeSend: function (xhr){
			xhr.setRequestHeader( "Content-Type", "application/json"  );
			xhr.setRequestHeader( "AppKey", _APP_KEY )
		},
		data: JSON.stringify(data),
		success: function (data){
			successCallBack(data);
		},
		error: function (jqXHR, textStatus, exception, errorThrown){
			errorCallBack(jqXHR, textStatus, exception, errorThrown);
		}
	});
}

function callOpenApiSecret( uri, data, secret, successCB, errorCB ){
	var successCallBack = successCB || AjaxSuccessHandler;
	var errorCallBack = errorCB || AjaxErrorHandler;
	
	$.ajax({
		type: _POST_METHOD,
		url: _OPEN_API_URL + uri,		
		beforeSend: function (xhr){
			xhr.setRequestHeader( "Content-Type", "application/json"  );
			xhr.setRequestHeader( "appKey", _APP_KEY )
			xhr.setRequestHeader( "appSecret", secret )
		},
		data: JSON.stringify(data),
		success: function (data){
			successCallBack(data);
		},
		error: function (jqXHR, textStatus, exception, errorThrown){
			errorCallBack(jqXHR, textStatus, exception, errorThrown);
		}
	});
}
*/

function AjaxSuccessHandler(data){
	// skip...
}

function AjaxErrorHandler(jqXHR, textStatus, exception, errorThrown) {
    var msg = '';
    
    if (jqXHR.status === 0) {
        //msg = 'Not connect.\n Verify Network.';
    	msg = '인터넷 연결이 불안정합니다. 네트워크 상태를 확인하시기 바랍니다.';    	
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText + '\n' + exception;
    }
    //cMsgbox("error", "Invalid async client request", '<h5>' + msg + errorThrown, "", "");
    alert(msg);
}

export function checkLogin( callback ){
	if( isSessionExpire() ){
		callback(!isSessionRefreshExpire());
	}
	else{
		callback(true);	
	}
}

export function isValidSession(){
	if( isSessionExpire() ){
		return !isSessionRefreshExpire();
	}
	else{
		return true;	
	}
}

function getProfileImg() {
	//var p = getStorageValue( _PROFILE_IMG_KEY );
	var p = getSessionValue( _PROFILE_IMG_KEY );
	//console.log("ProfileImg="+p);
	return (p == null || p == "null" || p == "undefined") ? "" : String(p);
}

function getProfileNm() {
	//var p = getStorageValue( _PROFILE_NM_KEY );
	var p = getSessionValue( _PROFILE_NM_KEY );
	return (p == null || p == "null" || p == "undefined") ? "" : String(p);
}

function getProfileType() {
	//var p = getStorageValue( _PROFILE_TYPE_KEY );
	var p = getSessionValue( _PROFILE_TYPE_KEY );
	return (p == null || p == "null" || p == "undefined") ? "" : String(p);
}

function getProfileAthrCd() {
	//var p = getStorageValue( _PROFILE_TYPE_KEY );
	var p = getSessionValue( _PROFILE_ATHR_CD );
	return (p == null || p == "null" || p == "undefined") ? "" : String(p);
}

function getProfileBsnnNo() {
	var p = getSessionValue( _PROFILE_BSNN_NO );
	return (p == null || p == "null" || p == "undefined") ? "" : String(p);
}

export const callLocalApi = async(uri,param,cbFn)=> {

	let configData = {
		headers: {
			"Content-Type": "application/json",
			"appKey": process.env.REACT_APP_LRB_APP_KEY,
			"Accept": "application/json"
		}
	}

	await axios.post(
		"/api2" + uri,
		JSON.stringify(param),
		configData
	).then((res)=> {
		console.log("callLocalApi success res data : ", res);
		cbFn(res);
	}).catch((jqXHR, textStatus, exception, errorThrown)=> {
		console.log("refeshError", exception);
		//callback(null);
	});
}