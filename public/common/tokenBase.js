/**
 * 주의사항 : 반드시 env.js 가 import 되어야 한다.
 */
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




/**
 * 여기서 사용하는 storage를 정의한다.
 */
//var _STORAGE = localStorage;	
var _STORAGE = sessionStorage;



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
		for( key in newData ){
			data[key] = newData[key];
		}
		_STORAGE.setItem(_STORAGE_KEY,JSON.stringify(data));
	}
	else{
		_STORAGE.setItem(_STORAGE_KEY,JSON.stringify(newData));
	}
}

function updateSession( newData, callback ){	
	var data = getSessionData();
	if( data ){
		for( key in newData ){
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
	
	//console.log( "data="+JSON.stringify(data,null,2) );
	
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
}

function getStorageData(){
	var sessionData = _STORAGE.getItem(_STORAGE_KEY);
	if( sessionData === undefined ){
		return null;
	}
	return JSON.parse(sessionData);	
}

function getSessionData(){
	var token = _STORAGE.getItem(_SESSION_KEY);
	//console.log("token="+JSON.stringify(token,null,2));
	if( token == null || token === undefined ){
		return null;
	}
	return parseJwt(token);	
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

function getCurTimestamp(){
	return Math.floor(new Date().getTime()/1000);
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

function isSessionExpire(){	
	if( getSessionData() == null ){
		return true;
	}
	
	console.log("isSessionExpire: session time="+getSessionValue(_EXPIRE_KEY)+" cur time="+getCurTimestamp());
	
	if( getSessionValue(_EXPIRE_KEY) < getCurTimestamp() ){
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

function isSessionRefreshExpire(){	
	if( getSessionData() == null ){
		return true;
	}	
	if( getSessionValue(_REFRESH_TOKEN_EXPIRE_KEY) < getCurTimestamp() ){
		return true;
	}
	return false;
}

function clearStorage(){
	_STORAGE.clear();
}

function authorization( callback ){
	
	if( isSessionExpire() ){
		//console.log("SessionExpire=true");
		refreshAccessToken( callback );				
	}
	else{
		//console.log("SessionExpire=false");
		callback( getSessionData() );	
	}
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

function refreshAccessToken( callback ){
	
	if( isSessionRefreshExpire() ) {
		//console.log("SessionRefreshExpire==>true");
		callback(null);
	}
	else{
		//console.log("SessionRefreshExpire==>false");
		
		//var refreshToken = getRefreshToken();
		var refreshToken = getSessionRefreshToken();
		
		if( refreshToken == null ){
			callback(null);
		}
		else
		{
			//console.log("refreshToken==>"+refreshToken);
			
			var sendData = {
					"appKey": _APP_KEY,
					"refreshToken": refreshToken,
					"grantType": _REFRESH_TOKEN_GRANT_TYPE
			};
			
			$.ajax({
				type: _POST_METHOD,
				url: _OPEN_API_URL + _ACCESS_TOKEN_REFRESH_URI,
				beforeSend: function (xhr){
					xhr.setRequestHeader( "Content-Type", "application/json"  );
					xhr.setRequestHeader( "appKey", _APP_KEY );
				},
				data: JSON.stringify(sendData),
				success: function(data){
					//saveStorage(data);
					//updateStorage(data);
					//console.log( "refresh token success="+JSON.stringify(data,null,2) );
					updateSession(data, callback);
					//callback(data);
				},
				error: function (jqXHR, textStatus, exception, errorThrown){
					//AjaxErrorHandler(jqXHR, textStatus, exception, errorThrown);
					callback(null);
				}
			});
		}
	}
}


function callOpenApi( uri, data, successCB, errorCB ){
	
	//console.log( "callOpenApi: uri="+uri );
	//console.log( "callOpenApi: data="+JSON.stringify(data,null,2) );
	
	authorization( function( oAuth ) {
		
		
		
		var successCallBack = successCB || AjaxSuccessHandler;
		var errorCallBack = errorCB || AjaxErrorHandler;
		var appKey = _APP_KEY;
		var sendData = data || {};
		
		//console.log("sendData="+ JSON.stringify(sendData,null,2));
		//console.log("callOpenApi: oAuth=",JSON.stringify(oAuth,null,2));
		
		$.ajax({
			type: _POST_METHOD,
			url: _OPEN_API_URL + uri,
			beforeSend: function (xhr){
				xhr.setRequestHeader( "Content-Type", "application/json"  );
				xhr.setRequestHeader( "appKey", appKey );
				
				if( oAuth == null || oAuth.accessToken == null ){
					//alert("로그인 이후 이용하시기 바랍니다.");
					xhr.abort();
				}
				else{
					xhr.setRequestHeader( "Authorization", oAuth.tokenType+" "+oAuth.accessToken );				
				}			
				
			},
			data: JSON.stringify(sendData),
			success: function (data){
				successCallBack(data);
			},
			error: function (jqXHR, textStatus, exception, errorThrown){
				errorCallBack(jqXHR, textStatus, exception, errorThrown);
			}
		});
	});
}

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

function checkLogin( callback ){
	if( isSessionExpire() ){
		callback(!isSessionRefreshExpire());
	}
	else{
		callback(true);	
	}
}

function isValidSession(){
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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

