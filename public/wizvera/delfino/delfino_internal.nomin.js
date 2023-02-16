(function() {
    function initModule(kryptos) {
        (function(jQuery) {
            var DC_pkcs7DigestAlg = "SHA256";
            var DC_platformInfo = DC_getPlatformInfo();
            window.DC_platformInfo = DC_platformInfo;
            var DC_browserInfo = DC_getBrowserInfo();
            window.DC_browserInfo = DC_browserInfo;
            if (typeof DelfinoConfig == "undefined") setTimeout(function() {
                window.DC_alert("include delfino_config.js'");
            }, 1);
            window.DC_version = DelfinoConfig.version;
            var DC_mimeType = DelfinoConfig.mimeType;
            window.DC_mimeType = DC_mimeType;
            var DC_installPage = DelfinoConfig.installPage;
            var DC_installPkg = DelfinoConfig.installPkg;
            window.DC_installPkg = DC_installPkg;
            var DC_installMessage = DelfinoConfig.installMessage;
            var DC_mobileUrlHandlerType = DelfinoConfig.mobileUrlHandlerType;
            var DC_closeHtml = DelfinoConfig.mobileCloseHtml;
            var DC_mobileUrlHandlerServerUrl = DelfinoConfig.mobileUrlHandlerServerUrl;
            var DC_transferInfo = DelfinoConfig.transferInfo;
            var DC_processingImageUrl = DelfinoConfig.processingImageUrl;
            var DC_mobileProviderName = DelfinoConfig.mobileProviderName;
            if (DC_mobileProviderName == "kbstar") DelfinoConfig.mobileUrlHandlerType = false;
            var DCryptoIOS = {
                init: function(installCheck) {
                    var uAgent = /Delfino/i;
                    if (DC_mobileProviderName == "kbstar") uAgent = /Delfino-/i;
                    if (navigator.userAgent.match(uAgent)) {
                        return true;
                    } else {
                        if (typeof installCheck != "undefined" && installCheck == false) return false;
                        if (typeof DC_installMessage.Mobile != "undefined" && DC_installMessage.Mobile != "") {
                            window.DC_confirm(DC_installMessage.Mobile, function() {
                                if (document.getElementById("delfino_check") != null) {
                                    jQuery("#delfino_check").remove();
                                }
                                var link = "wizvera-delfino://open?url=" + encodeURIComponent(window.location.href);
                                if (DC_mobileProviderName == "kbstar") link = "kbbank://call?cmd=move_to&id=mobileWeb&data=" + encodeURIComponent('{"url":"' + window.location.href + '"}');
                                jQuery("body").append('<iframe src="' + link + '" id="delfino_check" style="display:none" ></iframe>');
                                setTimeout(function() {
                                    if (document.getElementById("delfino_check").contentWindow.document == null) {
                                        DCryptoIOS.goInstallPage();
                                    } else {
                                        DCryptoIOS.goInstallPage();
                                    }
                                }, 2e3);
                            });
                        }
                        return false;
                    }
                },
                goInstallPage: function() {
                    var installPage = DC_installPage.iOS;
                    var thisPage = window.location.href;
                    if (thisPage.indexOf(installPage) < 0) {
                        var encodedThisPage = encodeURIComponent(thisPage);
                        if (installPage.indexOf("?") < 0) {
                            parameter = "?url=" + encodedThisPage;
                        } else {
                            parameter = "&url=" + encodedThisPage;
                        }
                        window.location.href = installPage + parameter;
                    }
                    return false;
                },
                getObjectTag: function() {
                    return "";
                },
                getObject: function() {
                    return this;
                },
                generatePKCS7SignedData: function(data, successCallback, errorCallback) {
                    var args = [ data, DC_pkcs7DigestAlg, successCallback, errorCallback ];
                    CallManager.call(new CallObject("generatePKCS7SignedData", args));
                },
                generateMultiPKCS7SignedData: function(datas, delimeter, successCallback, errorCallback) {
                    var args = [ datas, delimeter, DC_pkcs7DigestAlg, successCallback, errorCallback ];
                    CallManager.call(new CallObject("generateMultiPKCS7SignedData", args));
                },
                resetCertificate: function() {
                    CallManager.call(new CallObject("resetCertificate", arguments));
                },
                setConfig: function(config) {
                    CallManager.call(new CallObject("setConfig", arguments));
                },
                manageCertificate: function() {
                    CallManager.call(new CallObject("manageCertificate", arguments));
                },
                setProperty: function(key, value) {
                    CallManager.call(new CallObject("setProperty", arguments));
                },
                requestCertificate: function(ca, host, port, referenceValue, secretValue, complete) {
                    CallManager.call(new CallObject("requestCertificate", arguments));
                },
                updateCertificate: function(ca, host, port, complete) {
                    CallManager.call(new CallObject("updateCertificate", arguments));
                },
                importCertificate: function(handle, param) {
                    CallManager.call(new CallObject("importCertificate", arguments));
                },
                exportCertificate: function(handle, param) {
                    CallManager.call(new CallObject("exportCertificate", arguments));
                },
                importCertificateFromPC: function(handle, param) {
                    CallManager.call(new CallObject("importCertificateFromPC", arguments));
                },
                exportCertificateToPC: function(handle, param) {
                    CallManager.call(new CallObject("exportCertificateToPC", arguments));
                },
                setLang: function(lang, rs) {},
                getProperty: function(key) {
                    return "";
                },
                sign: function(handle, data, param) {
                    CallManager.call(new CallObject("sign", arguments));
                },
                importCertificateFromPKCS12: function(p12) {
                    CallManager.call(new CallObject("importCertificateFromPKCS12", arguments));
                }
            };
            var DCryptoPlugin = {
                init: function(installCheck) {
                    return this.getObject(installCheck) != null;
                },
                getObjectTag: function(removeParamTag) {
                    var objstr = "";
                    if (DC_browserInfo.MSIE) {
                        var version = DC_version.WinIE;
                        var clsid = DC_mimeType.WinIE;
                        var caburl = DC_installPkg.Cab32;
                        if (DC_platformInfo.x64) caburl = DC_installPkg.Cab64;
                        caburl = "";
                        var delfinoDivId = "delfinoDiv";
                        if (removeParamTag != null && removeParamTag == true) {
                            delfinoDivId = "delfinoDiv2";
                        }
                        objstr = "<div id='" + delfinoDivId + "'><object id='DelfinoCrypto' classid='" + clsid + "' WIDTH='1' HEIGHT='1' style='position:absolute;left:1px;top:1px;' ";
                        objstr += "codebase=" + caburl + "#version=" + version + " ";
                        objstr += ">";
                        if (removeParamTag == null || removeParamTag != true) {
                            objstr += "<param name='url' value='" + document.URL + "'></param>";
                        }
                        objstr += "</object></div>";
                    } else {
                        var mimeType = DC_mimeType.Linux;
                        if (DC_platformInfo.Mac) {
                            mimeType = DC_mimeType.Mac;
                        } else if (DC_platformInfo.Linux) {
                            mimeType = DC_mimeType.Linux;
                        }
                        if (DC_platformInfo.Windows) {
                            objstr = "<div><object id='DelfinoCrypto' TYPE='" + mimeType + "' WIDTH='0' HEIGHT='0' url='" + document.URL + "'> </object></div>";
                        } else {
                            objstr = "<div><object style='visibility:hidden;' id='DelfinoCrypto' TYPE='" + mimeType + "' WIDTH='1' HEIGHT='1' url='" + document.URL + "'> </object></div>";
                        }
                    }
                    return objstr;
                },
                isInstallPlugin: function(isVersionCheck) {
                    var version = DC_version.WinMoz;
                    var mimeType = DC_mimeType.WinMoz;
                    if (DC_platformInfo.Mac) {
                        version = DC_version.Mac;
                        mimeType = DC_mimeType.Mac;
                    } else if (DC_platformInfo.Linux) {
                        version = DC_version.Linux;
                        mimeType = DC_mimeType.Linux;
                    }
                    var plugin = DC_getPlguinInfo(mimeType);
                    if (!plugin) return false;
                    if (isVersionCheck) {
                        if (DC_compareVersion(DC_getPlguinVersion(plugin), version) < 0) return false;
                    }
                    return true;
                },
                isInstallActiveX: function() {
                    if (typeof document.DelfinoCrypto == "undefined" || document.DelfinoCrypto == "undefined" || document.DelfinoCrypto == null || document.DelfinoCrypto.object == null) return false;
                    return true;
                },
                goInstallPage: function(module) {
                    if (module == null) module = "G2";
                    if (typeof DC_installMessage.PC != "undefined" && DC_installMessage.PC != "") {
                        window.DC_confirm(DC_installMessage.PC, function() {
                            var installPage = DC_installPage.WinMoz;
                            if (DC_browserInfo.MSIE) {
                                installPage = DC_installPage.WinIE;
                            } else if (DC_platformInfo.Mac) {
                                installPage = DC_installPage.Mac;
                            } else if (DC_platformInfo.Linux) {
                                installPage = DC_installPage.Linux;
                            }
                            var thisPage = window.location.href;
                            if (thisPage.indexOf(installPage) < 0) {
                                var encodedThisPage = encodeURIComponent(thisPage);
                                if (installPage.indexOf("?") < 0) {
                                    parameter = "?url=" + encodedThisPage + "&module=" + module;
                                } else {
                                    parameter = "&url=" + encodedThisPage + "&module=" + module;
                                }
                                window.location.href = installPage + parameter;
                            }
                        });
                    }
                    return false;
                },
                getObject: function(installCheck) {
                    if (!DC_browserInfo.MSIE) {
                        var isVersionCheck = true;
                        if (!this.isInstallPlugin(isVersionCheck)) {
                            if (typeof installCheck != "undefined" && installCheck == false) return null;
                            this.goInstallPage();
                            return null;
                        }
                    }
                    if (document.getElementById("DelfinoCrypto") == null) {
                        jQuery("body").append(this.getObjectTag());
                    }
                    if (DC_browserInfo.MSIE) {
                        if (!this.isInstallActiveX()) {
                            if (document.getElementById("delfinoDiv2") == null) {
                                jQuery("#delfinoDiv").remove();
                                jQuery("body").append(this.getObjectTag(true));
                            }
                            if (!this.isInstallActiveX()) {
                                if (typeof installCheck != "undefined" && installCheck == false) return null;
                                this.goInstallPage();
                                return null;
                            }
                        }
                    }
                    return document.DelfinoCrypto;
                },
                generatePKCS7SignedData: function(data, successCallback, errorCallback) {
                    if (window.DC_disableBrowserTimeout()) return;
                    var obj = this.getObject();
                    setTimeout(function() {
                        var ret = obj.generatePKCS7SignedData(data, DC_pkcs7DigestAlg, successCallback, errorCallback);
                        if (ret == "") {} else if (ret == "cancel") {
                            var script = errorCallback + "(0, 'cancel')";
                            eval(script);
                        } else {
                            var pkcs7 = "";
                            var vidRandom = "";
                            var keyValues = ret.split("&");
                            for (var i = 0; i < keyValues.length; i++) {
                                var keyValue = keyValues[i].split("=");
                                if (keyValue[0] == "PKCS7") pkcs7 = decodeURIComponent(keyValue[1]);
                                if (keyValue[0] == "VID_RANDOM") vidRandom = decodeURIComponent(keyValue[1]);
                            }
                            var script = successCallback + "('" + pkcs7 + "', '" + vidRandom + "')";
                            eval(script);
                        }
                    }, 1);
                },
                generateMultiPKCS7SignedData: function(datas, delimeter, successCallback, errorCallback) {
                    if (window.DC_disableBrowserTimeout()) return;
                    var obj = this.getObject();
                    setTimeout(function() {
                        var ret = obj.generateMultiPKCS7SignedData(datas, delimeter, DC_pkcs7DigestAlg, successCallback, errorCallback);
                        if (ret == "") {} else if (ret == "cancel") {
                            var script = errorCallback + "(0, 'cancel')";
                            eval(script);
                        } else {
                            var pkcs7 = "";
                            var vidRandom = "";
                            var keyValues = ret.split("&");
                            for (var i = 0; i < keyValues.length; i++) {
                                var keyValue = keyValues[i].split("=");
                                if (keyValue[0] == "PKCS7") pkcs7 = decodeURIComponent(keyValue[1]);
                                if (keyValue[0] == "VID_RANDOM") vidRandom = decodeURIComponent(keyValue[1]);
                            }
                            var script = successCallback + "('" + pkcs7 + "', '" + vidRandom + "')";
                            eval(script);
                        }
                    }, 1);
                },
                resetCertificate: function() {
                    if (this.getObject() == null) return;
                    this.getObject().resetCertificate();
                },
                setConfig: function(config) {
                    if (this.getObject() == null) return;
                    this.getObject().setConfig(config);
                },
                manageCertificate: function() {
                    var obj = this.getObject();
                    setTimeout(function() {
                        obj.manageCertificate();
                    }, 1);
                },
                setProperty: function(key, value) {
                    if (this.getObject() == null) return;
                    this.getObject().setProperty(key, value);
                },
                requestCertificate: function(ca, host, port, referenceValue, secretValue, complete) {
                    var obj = this.getObject();
                    if (obj == null) return;
                    setTimeout(function() {
                        try {
                            obj.requestCertificate(ca, host, port, referenceValue, secretValue, complete);
                        } catch (e) {
                            window.DC_alert("requestCertificate:" + e);
                        }
                    }, 1);
                },
                updateCertificate: function(ca, host, port, complete) {
                    var obj = this.getObject();
                    if (obj == null) return;
                    setTimeout(function() {
                        try {
                            obj.updateCertificate(ca, host, port, complete);
                        } catch (e) {
                            window.DC_alert("updateCertificate:" + e);
                        }
                    }, 1);
                },
                requestCertificate2: function(handle, ca, host, port, referenceValue, secretValue, options) {
                    if (window.DC_disableBrowserTimeout()) return;
                    var obj = this.getObject();
                    if (obj == null) return;
                    setTimeout(function() {
                        var result = obj.requestCertificate2(handle, ca, host, port, referenceValue, secretValue, options);
                        if (result != "") {
                            Delfino_complete(handle, result);
                        }
                    }, 1);
                },
                updateCertificate2: function(handle, ca, host, port, options) {
                    if (window.DC_disableBrowserTimeout()) return;
                    var obj = this.getObject();
                    if (obj == null) return;
                    setTimeout(function() {
                        var result = obj.updateCertificate2(handle, ca, host, port, options);
                        if (result != "") {
                            Delfino_complete(handle, result);
                        }
                    }, 1);
                },
                importCertificateFromPC: function(handle, param) {
                    window.DC_alert("'importCertificateFromPC' not supported");
                },
                exportCertificateToPC: function(handle, param) {
                    window.DC_alert("'exportCertificateToPC' not supported");
                },
                exportCertificate: function(handle, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.exportCertificate(handle, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                importCertificate: function(handle, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.importCertificate(handle, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                setLang: function(lang, rs) {
                    if (this.getObject() == null) return;
                    this.getObject().setLang(lang, rs);
                },
                getProperty: function(key) {
                    if (this.getObject() == null) return "";
                    return this.getObject().getProperty(key);
                },
                sign: function(handle, data, options) {
                    if (window.DC_disableBrowserTimeout()) return;
                    var obj = this.getObject();
                    setTimeout(function() {
                        options = jQuery.parseJSON(options);
                        options.returnType = "json";
                        var ret = obj.sign(handle, data, DelfinoJSON.stringify(options));
                        if (ret == "") {} else if (ret == "cancel") {
                            var param = {
                                status: 0
                            };
                            param = DelfinoJSON.stringify(param);
                            Delfino_complete(handle, param);
                        } else if (ret.substring(0, 1) == "{") {
                            Delfino_complete(handle, ret);
                        } else {
                            var param = {
                                status: 1
                            };
                            var keyValues = ret.split("&");
                            for (var i = 0; i < keyValues.length; i++) {
                                var keyValue = keyValues[i].split("=");
                                if (keyValue.length == 2) {
                                    keyValue[0] = keyValue[0].replace(/\+/g, " ");
                                    keyValue[1] = keyValue[1].replace(/\+/g, " ");
                                    if (keyValue[0] == "PKCS7") {
                                        param["signData"] = decodeURIComponent(keyValue[1]);
                                    } else if (keyValue[0] == "VID_RANDOM") {
                                        param["vidRandom"] = decodeURIComponent(keyValue[1]);
                                    } else {
                                        param[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
                                    }
                                }
                            }
                            param = DelfinoJSON.stringify(param);
                            Delfino_complete(handle, param);
                        }
                    }, 1);
                },
                deleteCertificate: function(handle, subjectOrSerialNumber, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.deleteCertificate(handle, subjectOrSerialNumber, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                getVersion: function() {
                    var obj = this.getObject();
                    if (obj == null) return null;
                    return obj.getVersion();
                },
                signFileUrl: function(handle, downloadurl, uploadurl, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.signFileUrl(handle, downloadurl, uploadurl, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                signFileUrlDown: function(handle, downloadurl, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.signFileUrlDown(handle, downloadurl, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                signFileUrlSign: function(handle, filepath, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.signFileUrlSign(handle, filepath, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                signFileUrlUp: function(handle, filepath, uploadurl, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.signFileUrlUp(handle, filepath, uploadurl, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                signFile: function(handle, path, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.signFile(handle, path, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                },
                verifySignFile: function(handle, path, signature, cert, options) {
                    var obj = this.getObject();
                    if (obj == null) return "";
                    var result = obj.verifySignFile(handle, path, signature, cert, options);
                    if (result != "") {
                        Delfino_complete(handle, result);
                    }
                }
            };
            window.DCryptoPlugin = DCryptoPlugin;
            var DCryptoAndroid = {
                init: function(installCheck) {
                    if (navigator.userAgent.match(/Delfino/i)) {
                        return true;
                    } else {
                        if (typeof installCheck != "undefined" && installCheck == false) return false;
                        if (typeof DC_installMessage.Mobile != "undefined" && DC_installMessage.Mobile != "") {
                            window.DC_confirm(DC_installMessage.Mobile, function() {
                                if (document.getElementById("delfino_check") != null) {
                                    jQuery("#delfino_check").remove();
                                }
                                var link = "wizvera-delfino://" + encodeURIComponent(window.location.href);
                                if (DC_mobileProviderName == "kbstar") link = "kbbank://call?cmd=move_to&id=mobileWeb&data=" + encodeURIComponent('{"url":"' + window.location.href + '"}');
                                jQuery("body").append('<iframe src="' + link + '" id="delfino_check" style="display:none" ></iframe>');
                                setTimeout(function() {
                                    if (document.getElementById("delfino_check").contentWindow.document == null) {
                                        DCryptoAndroid.goInstallPage();
                                    }
                                }, 2e3);
                            });
                        }
                        return false;
                    }
                },
                goInstallPage: function() {
                    var installPage = DC_installPage.Android;
                    var thisPage = window.location.href;
                    if (thisPage.indexOf(installPage) < 0) {
                        var encodedThisPage = encodeURIComponent(thisPage);
                        if (installPage.indexOf("?") < 0) {
                            parameter = "?url=" + encodedThisPage;
                        } else {
                            parameter = "&url=" + encodedThisPage;
                        }
                        window.location.href = installPage + parameter;
                    }
                    return false;
                },
                getObjectTag: function() {
                    return "";
                },
                getObject: function() {
                    return window.DelfinoCrypto;
                },
                generatePKCS7SignedData: function(data, successCallback, errorCallback) {
                    window.DelfinoCrypto.generatePKCS7SignedData(data, DC_pkcs7DigestAlg, successCallback, errorCallback);
                },
                generateMultiPKCS7SignedData: function(datas, delimeter, successCallback, errorCallback) {
                    window.DelfinoCrypto.generateMultiPKCS7SignedData(datas, delimeter, DC_pkcs7DigestAlg, successCallback, errorCallback);
                },
                resetCertificate: function() {
                    window.DelfinoCrypto.resetCertificate();
                },
                setConfig: function(config) {
                    window.DelfinoCrypto.setConfig(config);
                },
                manageCertificate: function() {
                    window.DelfinoCrypto.manageCertificate();
                },
                setProperty: function(keyType, key) {
                    window.DelfinoCrypto.setProperty(keyType, key);
                },
                requestCertificate: function(ca, host, port, referenceValue, secretValue, complete) {
                    window.DelfinoCrypto.requestCertificate(ca, host, port, referenceValue, secretValue, complete);
                },
                updateCertificate: function(ca, host, port, complete) {
                    window.DelfinoCrypto.updateCertificate(ca, host, port, complete);
                },
                importCertificateFromPC: function(handle, param) {
                    window.DelfinoCrypto.importCertificateFromPC(handle, param);
                },
                exportCertificateToPC: function(handle, param) {
                    window.DelfinoCrypto.exportCertificateToPC(handle, param);
                },
                setLang: function(lang, rs) {},
                getProperty: function(key) {
                    try {
                        return window.DelfinoCrypto.getProperty(handle, param);
                    } catch (e) {
                        return "";
                    }
                },
                sign: function(handle, data, options) {
                    return window.DelfinoCrypto.sign(handle, data, options);
                }
            };
            var DCryptoMobileUrlHandler = {
                requestResultDataDelayTime: 2e3,
                delfinoScheme: "wizvera-delfino://",
                config: {},
                delayTime: 1e3,
                retryCount: 60,
                init: function(installCheck) {
                    return true;
                },
                goInstallPage: function() {
                    if (DC_platformInfo.iOS) {
                        window.location.href = DC_installPage.iOS;
                    } else if (DC_platformInfo.Android) {
                        window.location.href = DC_installPage.Android;
                    } else {
                        window.DC_alert("지원하지 않는 기기입니다.");
                    }
                    return false;
                },
                getObjectTag: function() {
                    return "";
                },
                getObject: function() {
                    return this;
                },
                resetCertificate: function() {},
                setConfig: function(config) {
                    this.config = {};
                    var keyValues = config.split("&");
                    for (var i = 0; i < keyValues.length; i++) {
                        var keyValue = keyValues[i].split("=");
                        if (keyValue.length == 2) {
                            this.config[keyValue[0]] = decodeURIComponent(keyValue[1]);
                        }
                    }
                },
                manageCertificate: function(handle, options) {
                    options = jQuery.parseJSON(options);
                    options = options || {};
                    options.transferInfo = DelfinoJSON.stringify(DC_transferInfo);
                    var tbeData = {
                        handle: handle,
                        options: DelfinoJSON.stringify(options),
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    window.DC_disableBrowser("인증서관리중");
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://manageCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                setProperty: function(key, value) {
                    if (value == null) return;
                    if (key == "logoImage") return;
                    this.config[key] = value;
                },
                requestCertificate: function(ca, host, port, referenceValue, secretValue, complete, options) {
                    window.DC_disableBrowser("인증서발급중");
                    var handle = Delfino.addComplete(function(result) {
                        window[complete](result.status, result.message);
                    });
                    var tbeData = {
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        referenceValue: referenceValue,
                        secretValue: secretValue,
                        options: options,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://requestCertificate?";
                    url += jQuery.param({
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                updateCertificate: function(ca, host, port, complete) {
                    window.DC_disableBrowser("인증서갱신중");
                    var handle = Delfino.addComplete(function(result) {
                        window[complete](result.status, result.message);
                    });
                    var tbeData = {
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        options: "",
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://updateCertificate?";
                    url += jQuery.param({
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                requestCertificate2: function(handle, ca, host, port, referenceValue, secretValue, options) {
                    window.DC_disableBrowser("인증서발급중");
                    var tbeData = {
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        referenceValue: referenceValue,
                        secretValue: secretValue,
                        options: options,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://requestCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                updateCertificate2: function(handle, ca, host, port, options) {
                    window.DC_disableBrowser("인증서갱신중");
                    var tbeData = {
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        options: "",
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://updateCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                deleteCertificate: function(handle, subjectDN, options) {
                    window.DC_disableBrowser("인증서갱신중");
                    var tbeData = {
                        handle: handle,
                        subjectDN: subjectDN,
                        options: options,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://deleteCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                importCertificate: function(handle, param) {
                    if (!DC_platformInfo.iOS) return;
                    window.DC_disableBrowser("인증서가져오기중");
                    var tbeData = {
                        handle: handle,
                        params: param,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://importCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                exportCertificate: function(handle, param) {
                    if (!DC_platformInfo.iOS) return;
                    window.DC_disableBrowser("인증서내보내기중");
                    var tbeData = {
                        handle: handle,
                        params: param,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://exportCertificate?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                importCertificateFromPC: function(handle, param) {
                    window.DC_disableBrowser("인증서가져오기중");
                    var tbeData = {
                        handle: handle,
                        params: param,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://importCertificateFromPC?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    window.DC_enableBrowser();
                    this._requestResultData();
                },
                exportCertificateToPC: function(handle, param) {
                    window.DC_disableBrowser("인증서내보내기중");
                    var tbeData = {
                        handle: handle,
                        params: param,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    var url = "wizvera-delfino://exportCertificateToPC?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    this._requestResultData();
                },
                setLang: function(lang, rs) {},
                getProperty: function(key) {
                    return "";
                },
                _fixSignOption: function(options) {
                    options = jQuery.parseJSON(options);
                    if (options.multiSign) {
                        options.format = "";
                    }
                    options = DelfinoJSON.stringify(options);
                    return options;
                },
                sign: function(handle, data, options) {
                    window.DC_disableBrowser("서명요청중");
                    try {
                        if (!this._sign(handle, data, options)) {
                            window.DC_enableBrowser();
                            return;
                        }
                        this._requestResultData();
                    } catch (e) {
                        window.DC_alert("sign error:" + e, function() {
                            window.DC_enableBrowser();
                        });
                    }
                },
                _makeReturnUrl: function() {
                    if (navigator.userAgent.match(/CriOS/i)) {
                        if (window.location.protocol == "http:") {
                            return "googlechrome:" + window.location.href.substring(5);
                        } else if (window.location.protocol == "https:") {
                            return "googlechromes:" + window.location.href.substring(6);
                        }
                    }
                    if (DC_platformInfo.iOS && window.self !== window.top) {
                        return DC_closeHtml;
                    } else {
                        return window.location.href;
                    }
                },
                _sign: function(handle, data, options) {
                    this.setProperty("transferInfo", DelfinoJSON.stringify(DC_transferInfo));
                    var tbeData = {
                        handle: handle,
                        data: data,
                        options: options,
                        serverUrl: DC_mobileUrlHandlerServerUrl
                    };
                    var secureData = this._encryptRequest(jQuery.param(tbeData));
                    if (!secureData) {
                        window.DC_alert("encryptRequest fail");
                        return false;
                    }
                    var url = "wizvera-delfino://sign?";
                    url += jQuery.param({
                        config: jQuery.param(this.config),
                        secureData: secureData,
                        returnUrl: this._makeReturnUrl()
                    });
                    this._call(url);
                    return true;
                },
                _call: function(url) {
                    if (DC_platformInfo.Android) {
                        var customScheme = "";
                        var packageName = "com.wizvera.dolphin";
                        var urls = url.split("://", 2);
                        customScheme = "intent://" + urls[1] + "#Intent;scheme=" + urls[0] + ";package=" + packageName + ";end";
                        top.window.location = customScheme;
                    } else {
                        top.window.location = url;
                    }
                    if (!DC_platformInfo.Android) {
                        var time = new Date().getTime();
                        setTimeout(function() {
                            var now = new Date().getTime();
                            if (now - time < 2500) {
                                DCryptoMobileUrlHandler.goInstallPage();
                            }
                        }, 2e3);
                    }
                },
                _encryptRequest: function(tbeData) {
                    var data = {
                        action: "encrypt",
                        tbeData: tbeData
                    };
                    var encData = DC_post(DC_mobileUrlHandlerServerUrl, jQuery.param(data));
                    return encData;
                },
                _requestResultDataAndroidChrome: function(requestRetryCount, successCallback, errorCallback) {
                    var count = requestRetryCount;
                    var successCallback = successCallback;
                    var errorCallback = errorCallback;
                    count--;
                    var data = DC_get(DC_mobileUrlHandlerServerUrl);
                    data = jQuery.parseJSON(data);
                    var resultData = data["resultData"];
                    if (resultData == null) {
                        if (count > 0) {
                            try {
                                setTimeout(function() {
                                    DCryptoMobileUrlHandler._requestResultDataAndroidChrome(count, successCallback, errorCallback);
                                }, this.delayTime);
                            } catch (e) {
                            }
                        } else if (count == 0) {
                            DC_get(DC_mobileUrlHandlerServerUrl + "?finish");
                            window.DC_enableBrowser();
                            return;
                        }
                    } else {
                        if (successCallback) {
                            var param = data["resultData"];
                            if (param == null) {
                                window[errorCallback](-1, "error");
                                return;
                            }
                            param = jQuery.parseJSON(param);
                            if (param.status == 1) {
                                window[successCallback](param.signData, param.vidRandom);
                            } else {
                                window[errorCallback](param.status, param.message);
                            }
                        } else {
                            var handle = data["handle"];
                            var message = data["resultData"];
                            try {
                                window["Delfino_complete"](handle, message);
                            } catch (e) {
                                window.DC_alert("error:" + e, function() {
                                    window.DC_enableBrowser();
                                });
                                return;
                            }
                        }
                        window.DC_enableBrowser();
                    }
                },
                _requestResultData: function(successCallback, errorCallback) {
                    if (DC_platformInfo.Android && DC_browserInfo.Chrome) {
                        var requestRetryCount = this.retryCount;
                        this._requestResultDataAndroidChrome(requestRetryCount);
                    } else {
                        setTimeout(function() {
                            try {
                                var data = DC_get(DC_mobileUrlHandlerServerUrl);
                                data = jQuery.parseJSON(data);
                                if (successCallback) {
                                    var param = data["resultData"];
                                    if (param == null) {
                                        window[errorCallback](-1, "error");
                                        return;
                                    }
                                    param = jQuery.parseJSON(param);
                                    if (param.status == 1) {
                                        window[successCallback](param.signData, param.vidRandom);
                                    } else {
                                        window[errorCallback](param.status, param.message);
                                    }
                                } else {
                                    var handle = data["handle"];
                                    var message = data["resultData"];
                                    try {
                                        window["Delfino_complete"](handle, message);
                                    } catch (e) {
                                        window.DC_alert("error:" + e, function() {
                                            window.DC_enableBrowser();
                                        });
                                        return;
                                    }
                                }
                                window.DC_enableBrowser();
                            } catch (e) {
                                window.DC_alert("requestResultData error:" + e, function() {
                                    window.DC_enableBrowser();
                                });
                            }
                        }, this.requestResultDataDelayTime);
                    }
                }
            };
            function CallObject(fn, arg, oncomplete) {
                this.fn = fn;
                this.arg = arg;
                this.oncomplete = oncomplete;
            }
            CallObject.prototype.complete = function(arg) {
                if (this.oncomplete != null) {
                    this.oncomplete(arg);
                }
            };
            var CallManager = {
                callObjs: new Array(),
                internalCall: function(callObj) {
                    var callUri = "dolphin-sc://";
                    callUri += callObj.fn + "?";
                    for (var i = 0; i < callObj.arg.length; i++) {
                        if (i != 0) callUri += "&";
                        callUri += encodeURIComponent(callObj.arg[i]);
                    }
                    callUri += "/CallManager.complete";
                    if (jQuery("#Delfino_iframe").length == 0) {
                        jQuery("body").append('<iframe id="Delfino_iframe" style="display:none"></iframe>');
                    }
                    jQuery("#Delfino_iframe").attr("src", callUri);
                },
                call: function(callObj) {
                    this.callObjs[this.callObjs.length] = callObj;
                    if (this.callObjs.length == 1) {
                        this.internalCall(callObj);
                    }
                },
                complete: function(arg) {
                    callObj = this.callObjs.shift();
                    callObj.complete(arg);
                    if (this.callObjs.length > 0) {
                        this.internalCall(this.callObjs[0]);
                    }
                }
            };
            window.CallManager = CallManager;
            function _DC_getPlugins() {
                if (typeof checkIntegrity === "function") {
                    checkIntegrity();
                }
                if (DC_browserInfo.Safari && DC_compareVersion(DC_browserInfo.version, "10.0") >= 0) {
                    var plugins = [];
                    for (var i = 0; i < navigator.mimeTypes.length; i++) {
                        var mimeType = navigator.mimeTypes[i];
                        var plugin = mimeType.enabledPlugin;
                        plugins.push(plugin);
                    }
                    return plugins;
                } else {
                    return navigator.plugins;
                }
            }
            function DC_getPlguinInfo(mimeType) {
                var plugins = _DC_getPlugins();
                if (plugins == null || plugins.length == 0) return false;
                for (var i = 0; i < plugins.length; i++) {
                    try {
                        if (typeof plugins[i][0] == "undefined") continue;
                        var type = plugins[i][0].type;
                        if (type == mimeType) return plugins[i][0];
                    } catch (err) {}
                }
                return null;
            }
            function DC_compareVersion(version1, version2) {
                var v1 = version1.split(/\.|,/);
                var v2 = version2.split(/\.|,/);
                var len = Math.min(v1.length, v2.length);
                for (var i = 0; i < len; i++) {
                    var n1 = parseInt(v1[i], 10);
                    var n2 = parseInt(v2[i], 10);
                    if (n1 != n2) return n1 - n2;
                }
                if (v1.length == v2.length) return 0;
                for (var i = len; i < v1.length; i++) {
                    var n1 = parseInt(v1[i], 10);
                    if (n1 != 0) return 1;
                }
                for (var i = len; i < v2.length; i++) {
                    var n2 = parseInt(v2[i], 10);
                    if (n2 != 0) return -1;
                }
                return 0;
            }
            window.DC_compareVersion = DC_compareVersion;
            function DC_getPlguinVersion(plugin) {
                if (plugin == null) return "1.0.0.0";
                plugin = plugin.enabledPlugin;
                if (plugin == null) return "1.0.0.0";
                var desc = plugin.description;
                if (desc == "") return "1.0.0.0";
                var idx = desc.lastIndexOf(" ");
                var installVersion = desc.substring(idx + 1);
                return installVersion;
            }
            function DC_getBrowserInfo() {
                var browserInfo = {
                    MSIE: false,
                    Edge: false,
                    Navigator: false,
                    Firefox: false,
                    Chrome: false,
                    Safari: false,
                    Opera: false,
                    ChromePlus: false,
                    Naver: false,
                    Daumapps: false,
                    Kakao: false,
                    ETC: false,
                    name: "unknown",
                    version: "-1"
                };
                try {
                    var index = -1;
                    var tmp = "";
                    if (navigator.appName == "Microsoft Internet Explorer") {
                        browserInfo.MSIE = true;
                        browserInfo.name = "MSIE";
                        index = navigator.userAgent.indexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        index = tmp.indexOf(";");
                        if (index < 0) index = tmp.indexOf(")");
                        browserInfo.version = tmp.substring(0, index);
                        if (navigator.userAgent.match(/Trident/i) && browserInfo.version.indexOf("Windows") > 0) {
                            browserInfo.ETC = true;
                            index = navigator.userAgent.lastIndexOf("rv:") + "rv:".length;
                            tmp = navigator.userAgent.substring(index);
                            index = tmp.indexOf(")");
                            if (index < 0) index = tmp.indexOf(" ");
                            browserInfo.version = tmp.substring(0, index);
                        }
                    } else if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Edg/i)) {
                        browserInfo.Edge = true;
                        browserInfo.name = "Edge";
                        if (navigator.userAgent.match(/Edg/i)) {
                            browserInfo.name = "Edg";
                        }
                        index = navigator.userAgent.lastIndexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (navigator.userAgent.match(/Edg/i)) {
                            browserInfo.name = "Edge";
                        }
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Navigator/i)) {
                        browserInfo.Navigator = true;
                        browserInfo.name = "Navigator";
                        index = navigator.userAgent.lastIndexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/OPR/i)) {
                        browserInfo.Opera = true;
                        browserInfo.name = "Opera";
                        index = navigator.userAgent.lastIndexOf("OPR") + "OPR".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/OPiOS/i)) {
                        browserInfo.Opera = true;
                        browserInfo.name = "Opera-OPiOS";
                        index = navigator.userAgent.lastIndexOf("OPiOS") + "OPiOS".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Firefox/i)) {
                        browserInfo.Firefox = true;
                        browserInfo.name = "Firefox";
                        index = navigator.userAgent.lastIndexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/FxiOS/i)) {
                        browserInfo.Firefox = true;
                        browserInfo.name = "Firefox-FxiOS";
                        index = navigator.userAgent.lastIndexOf("FxiOS") + "FxiOS".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Naver/i)) {
                        browserInfo.Naver = true;
                        browserInfo.name = "NAVER";
                        index = navigator.userAgent.lastIndexOf("NAVER(") + "NAVER(".length;
                        tmp = navigator.userAgent.substring(index);
                        for (var i = 0; i < 3; i++) {
                            index = tmp.indexOf(";");
                            tmp = tmp.substring(index + 2);
                        }
                        index = tmp.indexOf(")");
                        browserInfo.version = tmp.substring(0, index).trim();
                    } else if (navigator.userAgent.match(/DaumApps/i)) {
                        browserInfo.Daumapps = true;
                        browserInfo.name = "DaumApps";
                        index = navigator.userAgent.lastIndexOf("DaumApps/") + "DaumApps/".length;
                        tmp = navigator.userAgent.substring(index);
                        index = tmp.indexOf(" ");
                        browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/KAKAOTALK/i)) {
                        browserInfo.Kakao = true;
                        browserInfo.name = "KAKAOTALK";
                        index = navigator.userAgent.lastIndexOf("KAKAOTALK ") + "KAKAOTALK ".length;
                        tmp = navigator.userAgent.substring(index);
                        index = tmp.indexOf(" ");
                        if (index < 0) browserInfo.version = tmp; else browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Chrome/i)) {
                        browserInfo.Chrome = true;
                        browserInfo.name = "Chrome";
                        if (navigator.userAgent.match(/ChromePlus/i)) {
                            browserInfo.ChromePlus = true;
                            browserInfo.name = "ChromePlus";
                        }
                        index = navigator.userAgent.lastIndexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/CriOS/i)) {
                        browserInfo.Chrome = true;
                        browserInfo.name = "Chrome-CriOS";
                        index = navigator.userAgent.lastIndexOf("CriOS") + "CriOS".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Safari/i)) {
                        browserInfo.Safari = true;
                        browserInfo.name = "Safari";
                        index = navigator.userAgent.lastIndexOf("Version") + "Version".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Opera/i)) {
                        browserInfo.Opera = true;
                        browserInfo.name = navigator.appName;
                        index = navigator.userAgent.lastIndexOf("Version") + "Version".length + 1;
                        tmp = navigator.userAgent.substring(index);
                        browserInfo.version = tmp;
                        index = tmp.indexOf(" ");
                        if (index > 0) browserInfo.version = tmp.substring(0, index);
                    } else if (navigator.userAgent.match(/Trident/i)) {
                        browserInfo.MSIE = true;
                        browserInfo.name = "MSIE";
                        index = navigator.userAgent.lastIndexOf("rv:") + "rv:".length;
                        if (index <= 2) index = navigator.userAgent.indexOf(browserInfo.name) + browserInfo.name.length + 1;
                        tmp = navigator.userAgent.substring(index);
                        index = tmp.indexOf(")");
                        if (index < 0 || index > 10) index = tmp.indexOf(";");
                        if (index < 0 || index > 10) index = tmp.indexOf(" ");
                        browserInfo.version = tmp.substring(0, index);
                    } else {
                        browserInfo.ETC = true;
                        browserInfo.name = navigator.appName;
                        browserInfo.version = "NOT_OK";
                    }
                } catch (err) {
                    window.DC_alert("DC_getBrowserInfo[" + err.description + "]");
                }
                return browserInfo;
            }
            function DC_getPlatformInfo() {
                var platformInfo = {
                    Windows: false,
                    Linux: false,
                    Ubuntu: false,
                    Fedora: false,
                    Mac: false,
                    iOS: false,
                    Android: false,
                    Mobile: false,
                    x64: false,
                    type: "unknown",
                    name: "unknown"
                };
                platformInfo.name = navigator.platform;
                if (navigator.appVersion.match("WOW64")) platformInfo.name = "WOW64";
                if (platformInfo.name.match(/Win32/i) || platformInfo.name.match(/WOW64/i)) {
                    platformInfo.Windows = true;
                    platformInfo.type = "Windows";
                    if (navigator.appVersion.match(/Win64/i)) {
                        platformInfo.name = "Win64";
                        platformInfo.x64 = true;
                        platformInfo.type = "Windows64";
                    }
                } else if (platformInfo.name.match("Win64")) {
                    platformInfo.Windows = true;
                    platformInfo.x64 = true;
                    platformInfo.type = "Windows64";
                } else if (platformInfo.name.match("Linux armv")) {
                    platformInfo.Mobile = true;
                    platformInfo.Android = true;
                    platformInfo.type = "Android";
                } else if (platformInfo.name.match(/Linux/i)) {
                    platformInfo.Linux = true;
                    platformInfo.type = "Linux";
                    if (platformInfo.name.match(/x86_64/i)) {
                        platformInfo.x64 = true;
                        platformInfo.type = "Linux64";
                    } else if (navigator.userAgent.match(/x86_64/i)) {
                        platformInfo.x64 = true;
                        platformInfo.type = "Linux64";
                    }
                    if (navigator.userAgent.match(/Fedora/i)) {
                        platformInfo.Fedora = true;
                        platformInfo.type = "Fedora";
                        if (platformInfo.x64) platformInfo.type = "Fedora64";
                    } else if (navigator.userAgent.match(/Ubuntu/i)) {
                        platformInfo.Ubuntu = true;
                        platformInfo.type = "Ubuntu";
                        if (platformInfo.x64) platformInfo.type = "Ubuntu64";
                    } else if (navigator.userAgent.match(/Android/i)) {
                        platformInfo.Linux = false;
                        platformInfo.Mobile = true;
                        platformInfo.Android = true;
                        platformInfo.type = "Android";
                    }
                } else if (platformInfo.name.match(/MacIntel/i)) {
                    platformInfo.Mac = true;
                    platformInfo.type = "Mac";
                } else if (platformInfo.name == "iPad" || platformInfo.name == "iPhone" || platformInfo.name == "iPod" || platformInfo.name == "iOS") {
                    platformInfo.Mobile = true;
                    platformInfo.iOS = true;
                    platformInfo.type = "iOS";
                }
                if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
                    platformInfo.Mobile = true;
                }
                if (navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Windows CE/i) || navigator.userAgent.match(/Symbian/i) || navigator.userAgent.match(/BlackBerry/i)) {
                    platformInfo.Mobile = true;
                }
                if (navigator.userAgent.match("Android") && navigator.userAgent.match("Opera Mini")) {
                    platformInfo.Mobile = true;
                    platformInfo.Android = true;
                    platformInfo.type = "Android";
                }
                return platformInfo;
            }
            function DC_disableBrowserTimeout() {
                if (jQuery("#dc_overlay") != null && jQuery("#dc_overlay").length > 0) return true;
                var document = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                var overlayHtml = '<div id="dc_overlay" style="z-index:100000;position:fixed; width:100%; height:100%; top:0px; left:0px; background-color: rgba(0,0,0,0.0);"></div>';
                jQuery("body", document).append(overlayHtml);
                setTimeout(window.DC_enableBrowser, 1e3);
                return false;
            }
            window.DC_disableBrowserTimeout = DC_disableBrowserTimeout;
            function DC_enableBrowser() {
                var document = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                jQuery("#dc_overlay", document).remove();
            }
            window.DC_enableBrowser = DC_enableBrowser;
            function customInfoDialog(message, okCallback, cancelCallback, options) {
                if (typeof cancelCallback === "object") {
                    options = cancelCallback;
                    cancelCallback = new Function();
                }
                var color = options.color || {};
                var title = options.title;
                if ($("#wizvera-alert-dialog").length == 0) $("head").append('<style id="wizvera-alert-dialog">#wizveraAlertBackground{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.15);vertical-align:middle;display:grid;align-items:center;align-content:center;justify-content:center;z-index:100010;}#wizveraAlertBackground .wizveraAlertDialog{display:block;width:80vw;max-width:540px;min-width:300px;background-color:#fff;box-sizing:border-box;display:grid;grid-template-rows:auto auto auto;grid-template-columns:top;grid-template-areas:"title""message""button";text-align:center;border-radius:12px;background-color:#fff;box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.5);padding:21px;grid-row-gap:33px;max-height:100vh;}.wizveraAlertDialog .wizveraAlertTitle{grid-area:title;color:#292929;font-size:17px;font-weight:bold;letter-spacing:-1.2px;line-height:23px;padding-top:10px;}.wizveraAlertDialog .wizveraAlertMessage{grid-area:message;color:#333333;font-size:16px;letter-spacing:-0.39px;line-height:21px;padding-bottom:11px;max-height:100vh;}.wizveraAlertDialog .wizveraAlertMessage b{color:#0062B3;}.wizveraAlertDialog .wizveraAlertMessage b.warning{color:#E95454;}.wizveraAlertDialog .wizveraAlertButtonArea{grid-area:button;display:grid;grid-template-rows:auto;grid-template-columns:auto;column-gap:4px}.wizveraAlertDialog .wizveraAlertButtonArea.confirm{grid-template-columns:auto auto;}.wizveraAlertDialog .wizveraAlertButtonArea a.wizveraAlertButton{box-sizing:border-box;line-height:46px;border-radius:6px;vertical-align:middle;font-size:15px;letter-spacing:0;text-align:center;cursor:pointer;}.wizveraAlertDialog .wizveraAlertButtonArea a.wizveraAlertOk{background-color:#0062B3;color:#fff;}.wizveraAlertDialog .wizveraAlertButtonArea a.wizveraAlertCancel{border:1px solid #E4E4E4;background-color:#FFFFFF;color:#555;}</style>');
                $("body").append('<div id="wizveraAlertBackground">' + '<div class="wizveraAlertDialog" role="dialog" aria-labelledby="wizveraAlertTitle" aria-describedby="wizveraAlertMessage" tabindex="-1">' + '<div id="wizveraAlertTitle" class="wizveraAlertTitle">' + title + "</div>" + '<div id="wizveraAlertMessage" class="wizveraAlertMessage">' + message + "</div>" + '<div class="wizveraAlertButtonArea' + (options.type !== "confirm" ? "" : " confirm") + '">' + '<a class="wizveraAlertButton wizveraAlertOk">' + (options.okButtonMessage || "확인") + "</a>" + (options.type == "confirm" ? '<a class="wizveraAlertButton wizveraAlertCancel">' + (options.cancelButtonMessage || "취소") + "</a>" : "") + "</div>" + "</div>" + "</div>");
                var notCall = true;
                var removeDialog = function() {
                    $("#wizveraAlertBackground").remove();
                    notCall = false;
                };
                setTimeout(function() {
                    $(".wizveraAlertDialog")[0].blur();
                    $(".wizveraAlertDialog")[0].focus();
                    $("#wizveraAlertBackground a.wizveraAlertOk")[0].addEventListener("click", function(evt) {
                        if (notCall) {
                            removeDialog();
                            okCallback();
                        }
                    });
                    if ($("#wizveraAlertBackground a.wizveraAlertCancel").length > 0) {
                        $("#wizveraAlertBackground a.wizveraAlertCancel")[0].addEventListener("click", function(evt) {
                            if (notCall) {
                                removeDialog();
                                cancelCallback();
                            }
                        });
                    }
                });
            }
            var isCors = false;
            function DC_alert(message, callback, options) {
                callback = callback || new Function();
                if (DelfinoConfig.useAlertDialog === false) {
                    alert(message);
                    callback();
                } else if (DelfinoConfig.useAlertDialog === true || isCors) {
                    window.DC_alertCors(message, callback, options);
                } else {
                    alert(message);
                    callback();
                }
            }
            window.DC_alert = DC_alert;
            function DC_confirm(message, okCallback, cancelCallback, options) {
                okCallback = okCallback || new Function();
                cancelCallback = cancelCallback || new Function();
                if (DelfinoConfig.useAlertDialog === false) {
                    if (confirm(message)) okCallback(); else cancelCallback();
                } else if (DelfinoConfig.useAlertDialog === true || isCors) {
                    window.DC_confirmCors(message, okCallback, cancelCallback, options);
                } else {
                    if (confirm(message)) okCallback(); else cancelCallback();
                }
            }
            window.DC_confirm = DC_confirm;
            try {
                top.history;
            } catch (e) {
                if (!DC_browserInfo.MSIE) isCors = true;
            }
            function DC_alertCors(message, callback, options) {
                options = options || {};
                options.type = "info";
                options.title = "알림";
                customInfoDialog(message, callback, options);
            }
            window.DC_alertCors = DC_alertCors;
            function DC_confirmCors(message, okCallback, cancelCallback, options) {
                options = options || {};
                options.type = "confirm";
                options.title = "";
                customInfoDialog(message, okCallback, cancelCallback, options);
            }
            window.DC_confirmCors = DC_confirmCors;
            function DC_isIframe() {
                var ret = false;
                try {
                    if (window.frameElement !== null && window.frameElement.nodeName.toLowerCase() === "iframe") {
                        ret = true;
                    }
                } catch (e) {}
                return ret;
            }
            window.DC_isIframe = DC_isIframe;
            var DelfinoJSON = window.DelfinoJSON || new Object();
            DelfinoJSON.myStringify = DelfinoJSON.myStringify || function(obj) {
                var t = typeof obj;
                if (t != "object" || obj === null) {
                    if (t == "string") {
                        obj = obj.replace(/\\/g, "\\\\");
                        obj = obj.replace(/"/g, '\\"');
                        obj = obj.replace(/\t/g, "\\t");
                        obj = obj.replace(/\r/g, "\\r");
                        obj = obj.replace(/\n/g, "\\n");
                        obj = '"' + obj + '"';
                    }
                    return String(obj);
                } else {
                    var n, v, json = [], arr = obj && obj.constructor == Array;
                    for (n in obj) {
                        v = obj[n];
                        t = typeof v;
                        if (t == "string") {
                            v = v.replace(/\\/g, "\\\\");
                            v = v.replace(/"/g, '\\"');
                            v = v.replace(/\t/g, "\\t");
                            v = v.replace(/\r/g, "\\r");
                            v = v.replace(/\n/g, "\\n");
                            v = '"' + v + '"';
                        } else if (t == "object" && v != null) v = DelfinoJSON.myStringify(v);
                        if (t != "function" && v !== undefined) json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                }
            };
            DelfinoJSON.stringify = function(data) {
                if (JSON.stringify([ "\\" ]) != '["\\\\"]' || JSON.stringify("가") != '"가"') {
                    return DelfinoJSON.myStringify(data);
                } else {
                    return JSON.stringify(data);
                }
            };
            window.DelfinoJSON = DelfinoJSON;
            var JSON = window.JSON || new Object();
            JSON.stringify = JSON.stringify || DelfinoJSON.myStringify;
            window.JSON = JSON;
            function DC_disableBrowser(message) {
                if (jQuery("#dc_overlay") != null && jQuery("#dc_overlay").length > 0) return;
                var document = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                var overlayHtml = '<div id="dc_overlay" style="z-index:100000;position:fixed; width:100%; height:100%; top:0px; left:0px; background-color: #000000; opacity: 0.3; filter: alpha(opacity=30);">';
                if (message && DC_processingImageUrl) {
                    overlayHtml += '<div style="z-index:100001;position:fixed;top:50%; height:100%;width:100%;">' + '<div style="margin: 0 auto; padding: 5px; width:150px; background-color:#fff; vertical-align:middle; font-weight:bold; text-align: center; color:#555;  border-radius:5px;">' + message + ' <img src="' + DC_processingImageUrl + '" style="vertical-align:middle"/>' + "</div>" + "</div>";
                } else if (DC_processingImageUrl) {
                    overlayHtml += '<div style="z-index:100001;position:fixed;top:50%; height:100%;width:100%;">' + '<div style="margin: 0 auto; padding: 5px; width:26px; height:26px;  background-color:#fff; vertical-align:middle; font-weight:bold; text-align: center; color:#555;  border-radius:5px;">' + ' <img src="' + DC_processingImageUrl + '" style="vertical-align:middle"/>' + "</div>" + "</div>";
                }
                overlayHtml += "</div>";
                jQuery("body", document).append(overlayHtml);
            }
            window.DC_disableBrowser = DC_disableBrowser;
            function DC_get(url, module, cache) {
                if (module == "G4" || module == "G5" || module == "EA" || module == "G10" || module == "CG") return;
                var response = "";
                jQuery.ajax({
                    url: url,
                    async: false,
                    dataType: "text",
                    cache: cache === true ? cache : false,
                    success: function(data) {
                        response = data;
                    }
                });
                response = response.replace(/^\s*/, "").replace(/\s*$/, "");
                return response;
            }
            window.DC_get = DC_get;
            function DC_post(url, data) {
                var response = "";
                jQuery.ajax({
                    async: false,
                    type: "POST",
                    url: url,
                    data: data,
                    cache: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "text",
                    success: function(data, textStatus, jqXHR) {
                        response = data;
                    },
                    error: function(data, textStatus, errorThrown) {
                        window.DC_alert("ajax error:" + data);
                    }
                });
                return response;
            }
            window.DC_post = DC_post;
            function isBase64Url(str) {
                var base64UrlTest = /^([A-Za-z0-9-_]{4})*([A-Za-z0-9-_]{4}|[A-Za-z0-9-_]{3}|[A-Za-z0-9-_]{2})$/;
                return base64UrlTest.test(str) ? true : false;
            }
            function isBase64(str) {
                var base64Test = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/;
                return base64Test.test(str) ? true : false;
            }
            function base64urlToBase64(base64) {
                base64 = base64.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
                var pad = base64.length % 4;
                if (pad == 2) {
                    base64 += "==";
                } else if (pad == 3) {
                    base64 += "=";
                }
                return base64;
            }
            function DC_base64ToHex(base64) {
                if (isBase64Url(base64)) {
                    base64 = base64urlToBase64(base64);
                }
                if (isBase64(base64)) {
                    var binary = wizvera.kryptos.util.decode64(base64);
                    return wizvera.kryptos.util.binary.hex.encode(binary);
                } else {
                    return base64;
                }
            }
            window.DC_base64ToHex = DC_base64ToHex;
            window.wiz = window.wiz || {};
            var wiz = window.wiz;
            wiz.util = {};
            wiz.util.timer = function(interval, fn) {
                this._int = interval;
                this._fn = fn;
                this._id = -1;
                this.start = function() {
                    if (this._id >= 0) return;
                    this._id = setInterval(this._fn, this._int);
                };
                this.stop = function() {
                    if (this._id > 0) {
                        clearInterval(this._id);
                        this._id = -1;
                    }
                };
            };
            wiz.util.cookie = wiz.util.cookie || function() {
                _cookie = {};
                _cookie.get = function(name) {
                    try {
                        var nameEQ = name + "=";
                        var ca = document.cookie.split(";");
                        for (var i = 0; i < ca.length; i++) {
                            var c = ca[i];
                            while (c.charAt(0) == " ") c = c.substring(1, c.length);
                            if (c.indexOf(nameEQ) == 0) {
                                return decodeURI(c.substring(nameEQ.length, c.length));
                            }
                        }
                    } catch (e) {}
                    return "";
                };
                _cookie.set = function(name, val) {
                    if (DelfinoConfig.multiDomain != "" && document.location.hostname.indexOf(DelfinoConfig.multiDomain) >= 0) {
                        document.cookie = name + "=" + encodeURI(val) + "; path=/; domain=" + DelfinoConfig.multiDomain;
                    } else {
                        document.cookie = name + "=" + encodeURI(val) + "; path=/;";
                    }
                };
                return _cookie;
            }();
            wiz.util.session = wiz.util.session || function() {
                _session = {};
                _session.get = function() {
                    var curSession = "";
                    try {
                        curSession = wiz.util.cookie.get("DELFINOSESSION");
                        if (curSession == "") {
                            var sha = wizvera.kryptos.sha1.create();
                            var curDate = wizvera.kryptos.random.getBytesSync(32);
                            sha.start();
                            sha.update(curDate, 32);
                            curSession = wizvera.kryptos.util.bytesToHex(sha.digest().data);
                            wiz.util.cookie.set("DELFINOSESSION", curSession);
                        }
                    } catch (e) {
                        curSession = "";
                    }
                    return curSession;
                };
                return _session;
            }();
            var DcryptoHandlerData = DcryptoHandlerData || function() {
                var _data = {};
                _data.version = "0.0.0.0";
                return _data;
            }();
            window.DcryptoHandlerData = DcryptoHandlerData;
            var DCryptoHandler = DCryptoHandler || function(jQuery) {
                var _dcrypto = {};
                var _resTimer;
                var _object = null;
                _resTimer = new wiz.util.timer(2e3, function() {
                    delfino.handler.getResult({}).onsuccess(function(res, ctx) {
                        if (res.res == 8) {
                            window.DC_alert("암호화 채널이 유효하지 않습니다.", function() {
                                window.DC_enableBrowser();
                            });
                            return;
                        }
                        if (res.res == 13) {
                            DCrypto.stopGetResultTimer();
                            window.DC_alert(res.message || "다중 사용자 환경은 지원하지 않습니다. 다른 사용자 로그아웃후 사용해주세요.", function() {
                                window.DC_enableBrowser();
                            });
                            return;
                        }
                        if (res.res == 0) {
                            var results = res.data;
                            if (res.encryptedData != undefined && res.encryptedData == true) {
                                results = delfino.handler.secure.dec(results);
                                results = jQuery.parseJSON(results);
                                if (results == "") return;
                            }
                            delfino.handler.execResult(results);
                            for (var index = 0; index < results.length; index++) {
                                var item = results[index];
                                if (item.func == "Delfino_eraseCookie" || item.func == "Delfino_createCookie") continue;
                            }
                        }
                    }).invoke();
                });
                var _par = DCryptoPlugin;
                _par.par_goInstallPage = _par.goInstallPage;
                jQuery.extend(true, _dcrypto, _par);
                _dcrypto.goInstallPage = function() {
                    var par = this;
                    setTimeout(function() {
                        if (par.getObject(false) == null) {
                            par.par_goInstallPage("G3");
                        }
                    }, 500);
                };
                _dcrypto.startGetResultTimer = function(noDisable) {
                    !noDisable && window.DC_disableBrowser("wait");
                    _resTimer.start();
                };
                _dcrypto.stopGetResultTimer = function() {
                    window.DC_enableBrowser();
                    _resTimer.stop();
                };
                _dcrypto.getObject = function(installCheck) {
                    if (installCheck == false) {
                        if (DcryptoHandlerData.version != "" && DcryptoHandlerData.version != "0.0.0.0") _object = {};
                        return _object;
                    }
                    if (_object == null) {
                        this.goInstallPage();
                    }
                    return _object;
                };
                _dcrypto.init = function(installCheck) {
                    return this.getObject(installCheck) != null;
                };
                _dcrypto.manageCertificate = function(handle, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    if (options.lang) {
                    }
                    var onSuccess = function() {
                        if (DelfinoConfig.closeOnWrongPassword) return _dcrypto.successCheck; else return function() {};
                    };
                    var param = {
                        options: options
                    };
                    if (DelfinoConfig.closeOnWrongPassword) param.handle = handle;
                    delfino.handler.manageCertificate(param).onsuccess(onSuccess).invoke();
                    if (DelfinoConfig.closeOnWrongPassword) this.startGetResultTimer(true);
                };
                _dcrypto.setConfig = function(config) {
                    delfino.handler.setConfig(config).invoke();
                };
                _dcrypto.setProperty = function(key, value) {
                    delfino.handler.setProperty(key, value).invoke();
                };
                _dcrypto.setPropertyJson = function(properties) {
                    delfino.handler.setPropertyJson(properties).invoke();
                };
                _dcrypto.setLang = function(lang, rs) {
                    _dcrypto.lang = {};
                    _dcrypto.lang.name = lang;
                    _dcrypto.lang.value = rs;
                };
                _dcrypto.resetCertificate = function() {
                    if (DelfinoConfig.useBrowserCookie != undefined && DelfinoConfig.useBrowserCookie == true) {
                        try {
                            wiz.util.cookie.set("DELFINO", "");
                        } catch (e) {}
                    }
                    delfino.handler.resetCertificate({}).invoke();
                };
                _dcrypto.getVersion = function() {
                    if (DcryptoHandlerData.version != "" && DcryptoHandlerData.version != "0.0.0.0") return DcryptoHandlerData.version;
                    delfino.handler.helper.isInstall({
                        error: function() {
                            DCrypto.par_goInstallPage();
                        }
                    });
                };
                _dcrypto.sign = function(handle, data, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    var isEASign = wiz.util.cookie.get("EAUSE");
                    if (!options.resetCertificate && isEASign) {
                        DCryptoEA.sign(handle, data, options);
                        return;
                    }
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    if (DelfinoConfig.useBrowserCookie != undefined && DelfinoConfig.useBrowserCookie == true) {
                        var delfinoCookie = wiz.util.cookie.get("DELFINO");
                        options.cookie = delfinoCookie;
                    }
                    delfino.handler.sign({
                        handle: handle,
                        data: data,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.endSign = function(handle, ssid) {
                    handle = handle.toString();
                    delfino.handler.endSign({
                        handle: handle,
                        ssid: ssid
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                }, _dcrypto.generatePKCS7SignedData = function(data, successCallback, errorCallback) {
                    delfino.handler.generatePKCS7SignedData(data, DC_pkcs7DigestAlg, successCallback, errorCallback).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.requestCertificate = function(ca, host, port, ref, secret, successCallback) {
                    delfino.handler.requestCertificate({
                        ca: ca,
                        host: host,
                        port: port,
                        ref: ref,
                        secret: secret,
                        complete: successCallback
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.requestCertificate2 = function(handle, ca, host, port, ref, secret, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.requestCertificate2({
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        ref: ref,
                        secret: secret,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.updateCertificate = function(ca, host, port, successCallback) {
                    delfino.handler.updateCertificate({
                        ca: ca,
                        host: host,
                        port: port,
                        complete: successCallback
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.updateCertificate2 = function(handle, ca, host, port, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.updateCertificate2({
                        handle: handle,
                        ca: ca,
                        host: host,
                        port: port,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.deleteCertificate = function(handle, subjectOrSerialNumber, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    handle = handle.toString();
                    delfino.handler.deleteCertificate({
                        handle: handle,
                        subjectOrSerialNumber: subjectOrSerialNumber,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.exportCertificate = function(handle, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    handle = handle.toString();
                    delfino.handler.exportCertificate({
                        handle: handle,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.importCertificate = function(handle, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    handle = handle.toString();
                    delfino.handler.importCertificate({
                        handle: handle,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.signFileUrl = function(handle, downloadurl, uploadurl, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.signFileUrl({
                        handle: handle,
                        downloadurl: downloadurl,
                        uploadurl: uploadurl,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.signFileUrlDown = function(handle, downloadurl, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.signFileUrlDown({
                        handle: handle,
                        downloadurl: downloadurl,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.signFileUrlSign = function(handle, filepath, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.signFileUrlSign({
                        handle: handle,
                        filepath: filepath,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.signFileUrlUp = function(handle, filepath, uploadurl, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.signFileUrlUp({
                        handle: handle,
                        filepath: filepath,
                        uploadurl: uploadurl,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.signFile = function(handle, path, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.signFile({
                        handle: handle,
                        path: path,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.verifySignFile = function(handle, path, signature, cert, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (options.lang == null && _dcrypto.lang != null) {
                        if (_dcrypto.settedLang != _dcrypto.lang.name) {
                            options.lang = _dcrypto.lang;
                        }
                    }
                    if (options.lang != null) _dcrypto.settedLang = options.lang.name;
                    handle = handle.toString();
                    delfino.handler.verifySignFile({
                        handle: handle,
                        path: path,
                        signature: signature,
                        cert: cert,
                        options: options
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.getKTBScanResult = function(handle) {
                    handle = handle.toString();
                    delfino.handler.getKTBScanResult({
                        handle: handle
                    }).onsuccess(this.successCheck).invoke();
                    this.startGetResultTimer();
                };
                _dcrypto.successCheck = function(res) {
                    if (res.res != 0) {
                        _resTimer.stop();
                        window.DC_enableBrowser();
                        Delfino.setHandlerInit(false);
                        if (res.res == 7 || res.res == 8 || res.res == 9 || res.res == 10) {} else if (res.res == 13) {
                            window.DC_alert(res.message || "다중 사용자 환경은 지원하지 않습니다. 다른 사용자 로그아웃후 사용해주세요.");
                        } else {
                            window.DC_alert("Delfino Handler Error : code = " + res.res);
                        }
                    }
                };
                return _dcrypto;
            }(jQuery);
            var DCryptoHtml5 = DCryptoHtml5 || function(jQuery) {
                var _dcrypto = {};
                var _resTimer;
                var _object = {};
                _dcrypto.goInstallPage = function() {
                    window.DC_alert("html5:unsupported");
                };
                _dcrypto.getObject = function(installCheck) {
                    return _object;
                };
                _dcrypto.init = function(installCheck) {
                    return Delfino4Html.init();
                };
                _dcrypto.manageCertificate = function(handle, options) {
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    Delfino4Html.manageCertificate(options, function(result) {
                        result.cmd = "manageCertificate";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.setConfig = function(config) {
                    Delfino4Html.setConfig(config);
                };
                _dcrypto.setProperty = function(key, value) {
                    Delfino4Html.setProperty(key, value);
                };
                _dcrypto.setPropertyJson = function(properties) {
                    window.DC_alert("todo:html5.setPropertyJson:" + DelfinoJSON.stringify(properties));
                };
                _dcrypto.setLang = function(lang, rs) {
                    Delfino4Html.setProperty("lang", {
                        name: lang,
                        value: rs
                    });
                };
                _dcrypto.resetCertificate = function() {
                };
                _dcrypto._resetAll = function(options) {
                    Delfino4Html._resetAll(options);
                };
                _dcrypto.getVersion = function() {
                    return "";
                };
                _dcrypto.sign = function(handle, data, options) {
                    if (typeof options == "string") options = jQuery.parseJSON(options);
                    var isEASign = wiz.util.cookie.get("EAUSE");
                    if (!options.resetCertificate && isEASign) {
                        DCryptoEA.sign(handle, data, options);
                        return;
                    }
                    Delfino4Html.sign(data, options, function(result) {
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.generatePKCS7SignedData = function(data, successCallback, errorCallback) {
                    window.DC_alert("todo:html5.generatePKCS7SignedData");
                };
                _dcrypto.requestCertificate = function(ca, host, port, ref, secret, successCallback) {
                    var options = {};
                    Delfino4Html.requestCertificate(ca, host, port, ref, secret, options, function(result) {
                        if (result.status == 1) {
                            window[successCallback](result.status, result.message);
                        } else {
                            window.DC_alert("Error\n\n" + result.message, function() {
                                window[successCallback](result.status, result.message);
                            });
                        }
                    });
                };
                _dcrypto.requestCertificate2 = function(handle, ca, host, port, ref, secret, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.requestCertificate(ca, host, port, ref, secret, options, function(result) {
                        result.cmd = "requestCertificate2";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.updateCertificate = function(ca, host, port, successCallback) {
                    var options = {};
                    Delfino4Html.updateCertificate(ca, host, port, options, function(result) {
                        if (result.status == 1) {
                            window[successCallback](result.status, result.message);
                        } else {
                            window.DC_alert("Error\n\n" + result.message, function() {
                                window[successCallback](result.status, result.message);
                            });
                        }
                    });
                };
                _dcrypto.updateCertificate2 = function(handle, ca, host, port, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.updateCertificate(ca, host, port, options, function(result) {
                        result.cmd = "updateCertificate2";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.importCertificate = function(handle, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.importCertificateFromDelfino4Html(options, function(result) {
                        result.cmd = "importCertificate";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.exportCertificate = function(handle, options) {
                    options = jQuery.parseJSON(options);
                    if (options.seed) {
                        Delfino4Html.exportCertificateToClient(options, function(result) {
                            result.cmd = "exportCertificate";
                            Delfino_complete(handle, result);
                        });
                    } else {
                        Delfino4Html.exportCertificateToDelfino4Html(options, function(result) {
                            result.cmd = "exportCertificate";
                            Delfino_complete(handle, result);
                        });
                    }
                };
                _dcrypto.signFileUrl = function(handle, downloadurl, uploadurl, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.signFileUrl(downloadurl, uploadurl, options, function(result) {
                        result.cmd = "signFileUrl";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.signFileUrlDown = function(handle, downloadurl, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.signFileUrlDown(downloadurl, options, function(result) {
                        result.cmd = "signFileUrlDown";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.signFileUrlSign = function(handle, filepath, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.signFileUrlSign(filepath, options, function(result) {
                        result.cmd = "signFileUrlSign";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.signFileUrlUp = function(handle, filepath, uploadurl, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.signFileUrlUp(filepath, uploadurl, options, function(result) {
                        result.cmd = "signFileUrlUp";
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.deleteCertificate = function(handle, subjectOrSerialNumber, options) {
                    if (typeof options == "string") options = jQuery.parseJSON(options);
                    Delfino4Html.deleteCertificate(subjectOrSerialNumber, options, function(result) {
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.fincertSign = function(handle, signData, options) {
                    if (typeof options == "string") options = jQuery.parseJSON(options);
                    Delfino4Html.fincertSign(signData, options, function(result) {
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.embedShow = function(handle, options) {
                    options = jQuery.parseJSON(options);
                    Delfino4Html.embedShow(options, function(result) {
                        Delfino_complete(handle, result);
                    });
                };
                return _dcrypto;
            }(jQuery);
            var DCryptoEA = DCryptoEA || function(jQuery) {
                var _dcrypto = {};
                var randomBSID = undefined;
                _dcrypto.goInstallPage = function() {
                    window.DC_alert("EA:unsupported");
                };
                _dcrypto.getObject = function(installCheck) {
                    return _object;
                };
                _dcrypto.init = function(installCheck) {};
                _dcrypto.manageCertificate = function() {
                    window.DC_alert("PC간편인증은 인증서 관리 기능을 지원하지 않습니다.\n(CertGate does not support certificate management.)");
                };
                _dcrypto.setConfig = function(config) {
                    this.config = {};
                    var keyValues = config.split("&");
                    for (var i = 0; i < keyValues.length; i++) {
                        var keyValue = keyValues[i].split("=");
                        if (keyValue.length == 2) {
                            if (keyValue[0] == "IssuerCertFilter") this.config["issuerCertFilter"] = decodeURIComponent(keyValue[1]); else if (keyValue[0] == "PolicyOidCertFilter") this.config["policyOidCertFilter"] = decodeURIComponent(keyValue[1]); else this.config[keyValue[0]] = decodeURIComponent(keyValue[1]);
                        }
                    }
                };
                _dcrypto.setProperty = function(key, value) {
                    this.config[key] = value;
                };
                _dcrypto.setPropertyJson = function(properties) {
                    window.DC_alert("todo:EA.setPropertyJson:" + DelfinoJSON.stringify(properties));
                };
                _dcrypto.setLang = function(lang, rs) {};
                _dcrypto.resetCertificate = function() {
                    EA.resetSessionData();
                };
                _dcrypto.getVersion = function() {
                    return "";
                };
                _dcrypto.sign = function(handle, data, options) {
                    if ("string" === typeof options) options = JSON.parse(options);
                    if (options.resetCertificate) {
                        this.resetCertificate();
                    }
                    if (typeof options === "string") options = jQuery.parseJSON(options);
                    options = options || {};
                    if (!(options.issuerCertFilter || options.IssuerCertFilter)) {
                        options.issuerCertFilter = this.config.issuerCertFilter;
                    }
                    if (!(options.policyOidCertFilter || options.PolicyOidCertFilter)) {
                        options.policyOidCertFilter = this.config.policyOidCertFilter;
                    }
                    data = EA.normalizeSignData(data, options);
                    EA.setTbsData({
                        data: data,
                        options: options
                    });
                    var tmpRand = wizvera.kryptos.random.getBytesSync(32);
                    randomBSID = wizvera.kryptos.util.bytesToHex(tmpRand);
                    EA.init(randomBSID);
                    EA.open_user_interface(function(result) {
                        if (result.status == 1) {
                            wiz.util.cookie.set("EAUSE", "true");
                        }
                        Delfino_complete(handle, result);
                    });
                };
                _dcrypto.generatePKCS7SignedData = function(data, successCallback, errorCallback) {
                    window.DC_alert("PC간편인증은 'generatePKCS7SignedData' 기능을 지원하지 않습니다.");
                };
                _dcrypto.requestCertificate = function(ca, host, port, ref, secret, successCallback) {
                    window.DC_alert("PC간편인증은 인증서 발급 기능을 지원하지 않습니다.\n(CertGate does not support certificate issueance.)");
                };
                _dcrypto.requestCertificate2 = function(handle, ca, host, port, ref, secret, options) {
                    window.DC_alert("PC간편인증은 인증서 발급 기능을 지원하지 않습니다.\n(CertGate does not support certificate issueance.)");
                };
                _dcrypto.updateCertificate = function(ca, host, port, successCallback) {
                    window.DC_alert("PC간편인증은 인증서 갱신 기능을 지원하지 않습니다.\n(CertGate does not support certificate renewal.)");
                };
                _dcrypto.updateCertificate2 = function(handle, ca, host, port, options) {
                    window.DC_alert("PC간편인증은 인증서 갱신 기능을 지원하지 않습니다.\n(CertGate does not support certificate renewal.)");
                };
                _dcrypto.importCertificate = function(handle, options) {
                    window.DC_alert("PC간편인증은 인증서 가져오기 기능을 지원하지 않습니다.\n(CertGate does not support certificate import.)");
                };
                _dcrypto.exportCertificate = function(handle, options) {
                    window.DC_alert("PC간편인증은 인증서 내보내기 기능을 지원하지 않습니다.\n(CertGate does not support certificate export.)");
                };
                _dcrypto.embedShow = function(handle, options) {
                    window.DC_alert("EA:unsupported");
                };
                return _dcrypto;
            }(jQuery);
            function DC_isSupported(module) {
                if (module == "G4" || module == "G5" || module == "G10" || module == "CG") {
                    if (DC_browserInfo.MSIE) {
                        if (DC_compareVersion(DC_browserInfo.version, "11") >= 0) return true;
                        return false;
                    }
                    if (DC_browserInfo.Edge) {
                        return true;
                    }
                    if (DC_browserInfo.Chrome) {
                        if (DC_compareVersion(DC_browserInfo.version, "38") >= 0) return true;
                        return false;
                    }
                    if (DC_browserInfo.Firefox) {
                        if (DC_platformInfo.Mobile) return true;
                        if (DC_compareVersion(DC_browserInfo.version, "38") >= 0) return true;
                        return false;
                    }
                    if (DC_browserInfo.Safari) {
                        if (DC_platformInfo.Mobile && DC_compareVersion(DC_browserInfo.version, "8") >= 0) return true;
                        if (!DC_platformInfo.Mobile && DC_compareVersion(DC_browserInfo.version, "10") >= 0) return true;
                        return false;
                    }
                    if (DC_browserInfo.Opera) {
                        if (DC_compareVersion(DC_browserInfo.version, "30") >= 0) return true;
                        return false;
                    }
                    if (DC_browserInfo.Naver) {
                        return true;
                    }
                    if (DC_browserInfo.Daumapps) {
                        return true;
                    }
                    if (DC_browserInfo.Kakao) {
                        return true;
                    }
                    return false;
                } else if (module == "G3") {
                    return true;
                } else if (module == "G2") {
                    if (DC_browserInfo.Edge) return false;
                    if (DC_browserInfo.Chrome && DC_compareVersion(DC_browserInfo.version, "44") >= 0) return false;
                    if (DC_browserInfo.Firefox && DC_compareVersion(DC_browserInfo.version, "52") >= 0) return false;
                    return true;
                } else if (module == "EA") {
                    if (DC_browserInfo.MSIE) {
                        if (DC_compareVersion(DC_browserInfo.version, "8") >= 0) return true;
                    }
                    if (DC_browserInfo.Edge) {
                        return true;
                    }
                    if (DC_browserInfo.Chrome) {
                        if (DC_compareVersion(DC_browserInfo.version, "31") >= 0) return true;
                    }
                    if (DC_browserInfo.Firefox) {
                        if (DC_compareVersion(DC_browserInfo.version, "38") >= 0) return true;
                    }
                    if (DC_browserInfo.Safari) {
                        if (DC_compareVersion(DC_browserInfo.version, "7.1") >= 0) return true;
                    }
                    if (DC_browserInfo.Opera) {
                        if (DC_compareVersion(DC_browserInfo.version, "30") >= 0) return true;
                    }
                    return false;
                }
            }
            window.DC_isSupported = DC_isSupported;
            try {
                var result = DelfinoConfig.module.all;
                var module = null;
                if (DC_platformInfo.Mobile) {
                    module = DelfinoConfig.module.mobile;
                } else if (DC_platformInfo.Windows) {
                    module = DelfinoConfig.module.win32;
                    if (DC_platformInfo.x64) module = DelfinoConfig.module.win64;
                } else if (DC_platformInfo.Mac) {
                    module = DelfinoConfig.module.mac;
                } else if (DC_platformInfo.Linux) {
                    module = DelfinoConfig.module.linux;
                }
                if (typeof module != "undefined") {
                    if (typeof module.all == "string") result = module.all;
                    if (DC_browserInfo.Chrome) {
                        if (typeof module.chrome == "string") result = module.chrome;
                    } else if (DC_browserInfo.Firefox) {
                        if (typeof module.firefox == "string") result = module.firefox;
                    } else if (DC_browserInfo.Opera) {
                        if (typeof module.opera == "string") result = module.opera;
                    } else if (DC_browserInfo.Safari) {
                        if (typeof module.safari == "string") result = module.safari;
                    } else if (DC_browserInfo.Edge) {
                        if (typeof module.edge == "string") result = module.edge;
                    } else if (DC_browserInfo.MSIE) {
                        if (typeof module.msie == "string") result = module.msie;
                        var currVersion = parseInt(DC_browserInfo.version);
                        if (currVersion == 11 && typeof module.msie11 == "string") result = module.msie11;
                        if (currVersion == 10 && typeof module.msie10 == "string") result = module.msie10;
                        if (currVersion == 9 && typeof module.msie09 == "string") result = module.msie09;
                        if (currVersion == 8 && typeof module.msie08 == "string") result = module.msie08;
                        if (currVersion == 7 && typeof module.msie07 == "string") result = module.msie07;
                        if (currVersion == 6 && typeof module.msie06 == "string") result = module.msie06;
                    }
                }
                if (typeof DelfinoConfig.module != "string") DelfinoConfig.module = result;
                DelfinoConfig.module_org = DelfinoConfig.module;
                if ("G2" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "G2";
                if ("G3" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "G3";
                if ("G4" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "G4";
                if ("G5" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "G5";
                if ("EA" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "EA";
                if ("G10" == wiz.util.cookie.get("delfinoModuleType")) DelfinoConfig.module = "G10";
                if (DC_browserInfo.MSIE && DC_compareVersion(DC_browserInfo.version, "8") < 0) {
                    window.wizvera = window.wizvera || {};
                    window.wizvera.applyUtilIE6 = true;
                }
            } catch (e) {
                window.DC_alert("delfino_internal.js: DelfinoConfig.module Error: " + e);
            }
            window.DC_module = "G2";
            function DC_setModule(module) {
                window.DC_module = module;
                if (module == "EA") {
                    window.DCrypto = DCryptoEA;
                    DelfinoConfig.version = "";
                    DelfinoConfig.installPkg = "";
                    window.DC_version = DelfinoConfig.version;
                    DC_installPkg = DelfinoConfig.installPkg;
                    window.DC_installPkg = DC_installPkg;
                    return;
                }
                if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
                    window.DCrypto = DC_mobileUrlHandlerType ? DCryptoMobileUrlHandler : DCryptoIOS;
                    if (module == "G4" || module == "G5" || module == "G10" || module == "CG") window.DCrypto = DCryptoHtml5;
                } else if (navigator.userAgent.match(/Android/i)) {
                    window.DCrypto = DC_mobileUrlHandlerType ? DCryptoMobileUrlHandler : DCryptoAndroid;
                    if (module == "G4" || module == "G5" || module == "G10" || module == "CG") window.DCrypto = DCryptoHtml5;
                } else if (navigator.userAgent.match(/AppleWebKit/i) && navigator.userAgent.match(/Qt/i)) {
                    window.DCrypto = DCryptoDelfino;
                } else if (navigator.userAgent.match(/Windows NT/i) || navigator.userAgent.match(/Linux/i) || navigator.userAgent.match(/Mac OS X/i)) {
                    window.DCrypto = DCryptoPlugin;
                    if (module == "G3") window.DCrypto = DCryptoHandler;
                    if (module == "G4" || module == "G5" || module == "G10" || module == "CG") window.DCrypto = DCryptoHtml5;
                } else if (navigator.appName == "Microsoft Internet Explorer" && !navigator.userAgent.toLowerCase().match(/phone os/i)) {
                    window.DCrypto = DCryptoPlugin;
                    if (module == "G3") window.DCrypto = DCryptoHandler;
                    if (module == "G4" || module == "G5" || module == "G10" || module == "CG") window.DCrypto = DCryptoHtml5;
                } else if (navigator.userAgent.match(/Trident/i)) {
                    window.DCrypto = DCryptoPlugin;
                    if (module == "G3") window.DCrypto = DCryptoHandler;
                    if (module == "G4" || module == "G5" || module == "G10" || module == "CG") window.DCrypto = DCryptoHtml5;
                } else if (navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Windows CE/i) || navigator.userAgent.match(/Symbian/i)) {
                    window.DCrypto = null;
                } else {
                    window.DCrypto = window.DelfinoCrypto;
                }
                if (module == "G3") {
                    DelfinoConfig.version = DelfinoConfig.version_g3;
                    DelfinoConfig.installPkg = DelfinoConfig.installPkg_g3;
                    window.DC_version = DelfinoConfig.version;
                    DC_installPkg = DelfinoConfig.installPkg;
                    window.DC_installPkg = DC_installPkg;
                } else {
                    DelfinoConfig.version = DelfinoConfig.version_g2;
                    DelfinoConfig.installPkg = DelfinoConfig.installPkg_g2;
                    window.DC_version = DelfinoConfig.version;
                    DC_installPkg = DelfinoConfig.installPkg;
                    window.DC_installPkg = DC_installPkg;
                }
            }
            window.DC_setModule = DC_setModule;
        })(jQuery);
    }
    var name = "gen-delfino_internal";
    function addWizvera() {
        if (typeof initModule !== "function") return;
        var wizvera = {};
        if (typeof window === "object") {
            if (typeof window.wizvera === "object") {
                wizvera = window.wizvera;
            } else {
                window.wizvera = wizvera;
            }
        }
        wizvera.kryptos = wizvera.kryptos || {};
        initModule(wizvera.kryptos);
        return wizvera;
    }
    var wizvera = addWizvera();
})();

(function() {
    function initModule(kryptos) {
        window.delfino = window.delfino || {};
        var delfino = window.delfino;
        delfino.conf = delfino.conf || {};
        delfino.conf.handler = delfino.conf.handler || function(jQuery) {
            var _conf = {};
            _conf.version = DelfinoConfig.version_g3.WinIE;
            _conf.port = 16107;
            _conf.ajaxto = 7e3;
            _conf.checkAjaxto = 7e3;
            _conf.cbName = "delfino_handler_callback";
            _conf.reqUrl = "https://127.0.0.1:" + _conf.port;
            _conf.protocol = "wizvera-delfino-pc";
            _conf.protocol_x64 = "wizvera-delfino-x64";
            _conf.iframe_prefix = "delfino_handler_iframe_";
            _conf.form_prefix = "delfino_handler_form_";
            _conf.retryLimit = 1;
            _conf.supportSync = true;
            _conf.blankPage = "";
            if (DC_platformInfo.Windows) {
                if (!DC_browserInfo.MSIE) _conf.version = DelfinoConfig.version_g3.WinMoz;
                if (DC_browserInfo.MSIE) {
                    _conf.ajaxto = 1e4;
                    _conf.checkAjaxto = 1e4;
                    _conf.supportSync = false;
                    if (DC_browserInfo.version >= 11 && !DC_browserInfo.ETC) {
                        _conf.ajaxto = 15e3;
                        _conf.checkAjaxto = 3e3;
                    }
                    if (DC_browserInfo.version <= 6) _conf.blankPage = DelfinoConfig.handlerBlankUrl;
                }
            } else if (DC_platformInfo.Mac) {
                _conf.version = DelfinoConfig.version_g3.Mac;
            } else if (DC_platformInfo.Linux) {
                _conf.version = DelfinoConfig.version_g3.Linux;
            }
            return _conf;
        }(jQuery);
        delfino.cmd = function(jQuery) {
            var _cmd = {};
            function iframePost(url) {
                var _obj = this;
                _obj.time = new Date().getTime();
                _obj.form = jQuery('<form accept-charset="UTF-8" action="' + url + '" target="delfino_iframe' + _obj.time + '" method="post" style="display:none;" id="delfino_form' + _obj.time + '"></form>');
                _obj.addParam = function(name, value) {
                    jQuery('<input type="hidden"/>').attr("name", name).attr("value", value).appendTo(_obj.form);
                };
                _obj.send = function() {
                    var iframe = jQuery('<iframe src="' + delfino.conf.handler.blankPage + '"  style="width:1px;height:1px;display:hidden" data-time="' + _obj.time + '" id="delfino_iframe' + _obj.time + '" name="delfino_iframe' + _obj.time + '"></iframe>');
                    jQuery("body").append(iframe);
                    jQuery("body").append(_obj.form);
                    _obj.form.get(0).submit();
                    var bindName = "bind";
                    if (typeof iframe.on === "function") {
                        bindName = "on";
                    }
                    iframe[bindName]("load", function() {
                        try {
                            jQuery("#delfino_form" + jQuery(this).data("time")).remove();
                        } catch (e) {
                            var obj = jQuery("#delfino_form" + jQuery(this).data("time"));
                            if (obj.length > 0) {
                                document.body.removeChild(obj[0]);
                            }
                        }
                        try {
                            jQuery(this).remove();
                        } catch (e) {
                            var obj = jQuery(this);
                            if (obj.length > 0) {
                                document.body.removeChild(obj[0]);
                            }
                        }
                    });
                };
            }
            function invokePost(ctx) {
                if (ctx.supportSync == true) {
                    invokeMethod(ctx);
                    return;
                }
                var conf = delfino.conf.handler;
                var ip = new iframePost(conf.reqUrl);
                ip.addParam("data", JSON.stringify(ctx.data));
                ip.send();
            }
            function callJsonp(ctx, reqUrl, callData, retryLimit, ajaxto, callbackName) {
                try {
                    var eventOn, eventOff, abortJsonp, jsonpXHR = jQuery.ajax({
                        userctx: ctx,
                        url: reqUrl,
                        data: callData,
                        retryLimit: retryLimit,
                        retryCount: 0,
                        timeout: ajaxto,
                        cache: false,
                        dataType: "jsonp",
                        jsonpCallback: callbackName,
                        success: function(res) {
                            if (this.userctx.success != undefined) {
                                this.userctx.success(res, this.userctx);
                            }
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            if (textStatus == "abort") {
                                return true;
                            }
                            if (textStatus == "timeout") {
                                if (this.userctx.timeout != undefined) {
                                    this.userctx.timeout(this.userctx);
                                    return;
                                }
                                this.retryCount++;
                                if (this.retryCount <= this.retryLimit) {
                                    jQuery.ajax(this);
                                    return;
                                }
                            }
                            if (this.userctx.error != undefined) {
                                this.userctx.error(xhr, this.userctx);
                            }
                            return;
                        },
                        complete: function(xhr, status) {
                            window[eventOff]("beforeunload", abortJsonp, false);
                            window[eventOff]("unload", abortJsonp, false);
                        }
                    });
                    if (typeof window["addEventListener"] != "undefined") {
                        eventOn = "addEventListener";
                        eventOff = "removeEventListener";
                    } else {
                        eventOn = "attachEvent";
                        eventOff = "detachEvent";
                    }
                    window[eventOn]("beforeunload", abortJsonp = function() {
                        jsonpXHR.abort();
                        window[eventOff]("beforeunload", abortJsonp, false);
                        window[eventOff]("unload", abortJsonp, false);
                    }, false);
                    window[eventOn]("unload", abortJsonp, false);
                    return jsonpXHR;
                } catch (e) {}
            }
            function callAjax(ctx, reqUrl, callData, retryLimit, ajaxto, callbackName) {
                var result = {};
                try {
                    jQuery.ajax({
                        userctx: ctx,
                        url: reqUrl,
                        data: callData,
                        timeout: ajaxto,
                        dataType: "json",
                        type: "POST",
                        async: ctx.supportSync && ctx.sync || false,
                        crossDomain: true,
                        success: function(res) {
                            if (this.userctx.success != undefined) {
                                this.userctx.success(res, this.userctx);
                            }
                            result = res;
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            if (this.userctx.error != undefined) {
                                this.userctx.error(xhr, this.userctx);
                            }
                            result = undefined;
                        }
                    });
                } catch (e) {
                    GLOBAL.DC_alert("delfino_handler.js: callAjax Error: " + e, function() {
                        window.DC_enableBrowser();
                    });
                    result = undefined;
                }
                return result;
            }
            function invokeMethod(ctx) {
                var data = ctx.data;
                if (typeof data == "object") data = JSON.stringify(data);
                var conf = delfino.conf.handler;
                var ajaxto = ctx.ajaxto || conf.ajaxto;
                var retryLimit = ctx.retryLimit || conf.retryLimit;
                var reqUrl = conf.reqUrl;
                if (ctx.reqUrl != undefined) reqUrl = reqUrl + ctx.reqUrl; else reqUrl = reqUrl + "/";
                var callbackName = conf.cbName + parseInt(new Date().getTime() % 999999);
                if (ctx.sync != undefined && ctx.sync == true || data.length > 1024) {
                    return callAjax(ctx, reqUrl, {
                        data: data
                    }, retryLimit, ajaxto, callbackName);
                }
                return callJsonp(ctx, reqUrl, {
                    data: data
                }, retryLimit, ajaxto, callbackName);
            }
            _cmd.invoke = function(ctx) {
                if (ctx.sync != undefined && ctx.sync == true) return invokeMethod(ctx);
                var tempData = JSON.stringify(ctx.data);
                if (tempData.length > 1024) {
                    return invokePost(ctx);
                } else {
                    return invokeMethod(ctx);
                }
            };
            return _cmd;
        }(jQuery);
        delfino.handler = delfino.handler || function(jQuery) {
            var _handler = {};
            _handler._cb = {};
            var _sid = parseInt(new Date().getTime() % 999999).toString();
            jQuery.support.cors = true;
            function commonFunc(cmd, data, ctx) {
                ctx = ctx || {};
                var encryptedData = false;
                var requireEncrypt = false;
                if (delfino.conf.handler.supportSync == true) {
                    var syncMethod = [ "setProperty", "setPropertyJson", "setConfig", "setConfigJson", "getConfig", "getProperty", "isAlive", "getVersion" ];
                    if (jQuery.inArray(cmd, syncMethod) >= 0) ctx.sync = true;
                    ctx.supportSync = true;
                }
                var encCmd = [ "getKTBScanResult", "exportCertificate", "importCertificate", "signFileUrlDown", "signFileUrlSign", "signFileUrlUp", "signFileUrl", "signFile", "verifySignFile", "deleteCertificate", "sign", "requestCertificate", "requestCertificate2", "updateCertificate", "updateCertificate2", "generatePKCS7SignedData", "manageCertificate" ];
                if (jQuery.inArray(cmd, encCmd) >= 0) encryptedData = true;
                if (cmd == "getResult") requireEncrypt = true;
                if (encryptedData == true) data = delfino.handler.secure.enc(data);
                var data = {
                    cmd: cmd,
                    sid: _sid,
                    encryptedData: encryptedData,
                    requireEncrypt: requireEncrypt,
                    data: data
                };
                DelfinoConfig.useDelfinoSession = DelfinoConfig.useDelfinoSession || false;
                if (DelfinoConfig.useDelfinoSession) {
                    data.session = wiz.util.session.get();
                }
                ctx.data = data;
                return getCallbackCtx(ctx.data.cmd, ctx);
            }
            _handler.getSid = function() {
                return _sid;
            };
            _handler.setSid = function(sid) {
                _sid = sid;
            };
            _handler.secureInit = function(data, ctx) {
                ctx.ajaxto = 1e4;
                var tempCtx = commonFunc("init", data, ctx);
                tempCtx.reqUrl = "/sc";
                return tempCtx;
            };
            _handler.multiCmd = function(data, ctx) {
                return commonFunc("multiCmd", data, ctx);
            };
            _handler.setConfig = function(data, ctx) {
                return commonFunc("setConfig", data, ctx);
            };
            _handler.setConfigJson = function(data, ctx) {
                ctx.sync = true;
                return commonFunc("setConfigJson", data, ctx);
            };
            _handler.getProperty = function(key, ctx) {
                return commonFunc("getProperty", {
                    key: key
                }, ctx);
            };
            _handler.setProperty = function(key, value, ctx) {
                return commonFunc("setProperty", {
                    key: key,
                    value: value
                }, ctx);
            };
            _handler.setPropertyJson = function(data, ctx) {
                return commonFunc("setPropertyJson", data, ctx);
            };
            _handler.resetCertificate = function(data, ctx) {
                return commonFunc("resetCertificate", data, ctx);
            };
            _handler.requestCertificate = function(data, ctx) {
                return commonFunc("requestCertificate", data, ctx);
            };
            _handler.requestCertificate2 = function(data, ctx) {
                return commonFunc("requestCertificate2", data, ctx);
            };
            _handler.updateCertificate = function(data, ctx) {
                return commonFunc("updateCertificate", data, ctx);
            };
            _handler.updateCertificate2 = function(data, ctx) {
                return commonFunc("updateCertificate2", data, ctx);
            };
            _handler.deleteCertificate = function(data, ctx) {
                return commonFunc("deleteCertificate", data, ctx);
            };
            _handler.importCertificate = function(data, ctx) {
                return commonFunc("importCertificate", data, ctx);
            };
            _handler.exportCertificate = function(data, ctx) {
                return commonFunc("exportCertificate", data, ctx);
            };
            _handler.clearResult = function(data, ctx) {
                return commonFunc("clearResult", data, ctx);
            };
            _handler.getResult = function(data, ctx) {
                ctx = ctx || {
                    ajaxto: 60 * 1e3
                };
                return commonFunc("getResult", data, ctx);
            };
            _handler.sign = function(data, ctx) {
                return commonFunc("sign", data, ctx);
            };
            _handler.endSign = function(data, ctx) {
                return commonFunc("endSign", data, ctx);
            };
            _handler.manageCertificate = function(data, ctx) {
                return commonFunc("manageCertificate", data, ctx);
            };
            _handler.getVersion = function(ctx) {
                return commonFunc("getVersion", {}, ctx);
            };
            _handler.isAlive = function(ctx) {
                return commonFunc("isAlive", {}, ctx);
            };
            _handler.setLang = function(lang, rs, ctx) {
                return commonFunc("setLang", {
                    lang: lang,
                    rs: rs
                }, ctx);
            };
            _handler.generatePKCS7SignedData = function(data, alg, sc, ec, ctx) {
                return commonFunc("generatePKCS7SignedData", {
                    data: data,
                    alg: alg,
                    succss: sc,
                    error: ec
                }, ctx);
            };
            _handler.signFileUrl = function(data, ctx) {
                return commonFunc("signFileUrl", data, ctx);
            };
            _handler.signFileUrlDown = function(data, ctx) {
                return commonFunc("signFileUrlDown", data, ctx);
            };
            _handler.signFileUrlSign = function(data, ctx) {
                return commonFunc("signFileUrlSign", data, ctx);
            };
            _handler.signFileUrlUp = function(data, ctx) {
                return commonFunc("signFileUrlUp", data, ctx);
            };
            _handler.signFile = function(data, ctx) {
                return commonFunc("signFile", data, ctx);
            };
            _handler.verifySignFile = function(data, ctx) {
                return commonFunc("verifySignFile", data, ctx);
            };
            _handler.getKTBScanResult = function(data, ctx) {
                return commonFunc("getKTBScanResult", data, ctx);
            };
            _handler.invoke = function(ctx) {
                return delfino.cmd.invoke(ctx);
            };
            _handler.on = function(name, success, cbctx) {
                cbctx = cbctx || {};
                cbctx.success = success;
                this._cb[name] = cbctx;
                return this;
            };
            function getCallbackCtx(name, ctx) {
                var defCallback = _handler._cb[name];
                if (undefined == defCallback) {
                    defCallback = {};
                    defCallback.success = function(res) {
                        try {
                            if (res.res == 13) {
                                GLOBAL.DC_alert(res.message || "다중 사용자 환경은 지원하지 않습니다. 다른 사용자 로그아웃후 사용해주세요.");
                            }
                        } catch (e) {}
                    };
                    defCallback.error = function(res) {};
                    defCallback.timeout = function(res) {};
                }
                defCallback.onsuccess = function(cb) {
                    this.success = cb;
                    return this;
                };
                defCallback.onerror = function(cb) {
                    this.error = cb;
                    return this;
                };
                defCallback.ontimeout = function(cb) {
                    this.timeout = cb;
                    return this;
                };
                defCallback.invoke = function() {
                    return delfino.handler.invoke(this);
                };
                ctx = jQuery.extend({}, defCallback, ctx);
                return ctx;
            }
            _handler.execResult = function(results) {
                for (var res in results) {
                    res = results[res];
                    var func = res.func;
                    var args = res.args;
                    var fn = window[func];
                    try {
                        if (typeof fn == "function") {
                            fn.apply(null, args);
                        }
                    } catch (e) {}
                }
            };
            return _handler;
        }(jQuery);
        delfino.handler.secure = delfino.handler.secure || function(jQuery) {
            var _data = {
                mac: "",
                nonce: ""
            };
            var _secure = {};
            var sc = undefined;
            _secure.setData = function(mac, nonce) {
                _data.mac = mac;
                _data.nonce = nonce;
            };
            function isSuccess(res) {
                if (res.error == undefined) {
                    return true;
                } else {
                    GLOBAL.DC_alert("[handler-secure] " + res.error.message);
                    return false;
                }
                return false;
            }
            _secure.reset = function() {
                if (sc != null) {
                    sc.reset();
                    sc = undefined;
                }
            };
            _secure.init = function(ctx) {
                var initctx = ctx;
                if (sc == null) sc = wizvera.sch.create();
                var res = sc.init();
                if (isSuccess(res) != true) {
                    this._initctx.error();
                    return;
                } else {
                    (function(res, initCtx) {
                        delfino.handler.setSid(res.data.sid);
                        delfino.handler.secureInit(res.data, {
                            initCtx: initCtx
                        }).onsuccess(function(cres, ctx) {
                            delfino.handler.secure.setData(cres.data.mac, cres.data.nonce);
                            initCtx.success();
                        }).onerror(function(xhr, status, error) {
                            GLOBAL.DC_alert("[handler-client] 보안채널 초기화 실패", function() {
                                this._initctx.error();
                            }.bind(this));
                        }).invoke();
                    })(res, initctx);
                }
            };
            _secure.enc = function(data) {
                var response = "";
                var res = sc.encrypt(delfino.handler.getSid(), _data, JSON.stringify(data));
                if (isSuccess(res) == false) {
                    return;
                }
                response = res.data.data;
                response = response.replace(/^\s*/, "").replace(/\s*$/, "");
                return response;
            };
            _secure.dec = function(data) {
                var response = "";
                var res = sc.decrypt(delfino.handler.getSid(), data);
                if (isSuccess(res) == false) return false;
                response = res.data.data;
                response = response.replace(/^\s*/, "").replace(/\s*$/, "");
                return response;
            };
            return _secure;
        }(jQuery);
        delfino.handler.state = delfino.handler.state || function(jQuery) {
            var _state = {};
            _state.data = {};
            function updateState() {
                for (var key in _state.data) {
                    var val = _state.data[key];
                    if (val == true) {
                        window.DC_disableBrowser(key);
                        return;
                    }
                }
                window.DC_enableBrowser();
            }
            _state.setState = function(key, state) {
                this.data[key] = state;
                updateState();
            };
            _state.clear = function() {
                _state.data = {};
                window.DC_enableBrowser();
            };
            return _state;
        }(jQuery);
        delfino.handler.helper = delfino.handler.helper || function(jQuery) {
            var _helper = {};
            _helper.isInstall = function(param) {
                param = param || {};
                param.ctx = param.ctx || {};
                param.ctx.ajaxto = param.ctx.ajaxto || delfino.conf.handler.checkAjaxto;
                param.error = param.error || function() {};
                param.success = param.success || function() {};
                delfino.handler.isAlive(param.ctx || {}).onsuccess(function() {
                    (function(param) {
                        delfino.handler.getVersion(param.ctx || {}).onsuccess(function(res, ctx) {
                            var objver = res.data;
                            objver = objver.replace(/[.,]/gi, "");
                            var confver = delfino.conf.handler.version;
                            confver = confver.replace(/[.,]/gi, "");
                            if (objver < confver) {
                                param.error({
                                    objver: objver,
                                    confver: confver
                                });
                            } else {
                                param.success(res.data);
                            }
                        }).invoke();
                    })(param);
                }).onerror(function() {
                    if (param.error) {
                        var confver = delfino.conf.handler.version;
                        confver = confver.replace(/[.,]/gi, "");
                        param.error({
                            objver: "",
                            confver: confver
                        });
                    }
                }).ontimeout(function() {
                    if (param.error) {
                        var confver = delfino.conf.handler.version;
                        confver = confver.replace(/[.,]/gi, "");
                        param.error({
                            objver: "",
                            confver: confver
                        });
                    }
                }).invoke();
            };
            return _helper;
        }(jQuery);
        function delfino_handler_callback(res) {}
    }
    var name = "gen-delfino_handler";
    function addWizvera() {
        if (typeof initModule !== "function") return;
        var wizvera = {};
        if (typeof window === "object") {
            if (typeof window.wizvera === "object") {
                wizvera = window.wizvera;
            } else {
                window.wizvera = wizvera;
            }
        }
        wizvera.kryptos = wizvera.kryptos || {};
        initModule(wizvera.kryptos);
        return wizvera;
    }
    var wizvera = addWizvera();
})();

(function() {
    function initModule(kryptos) {
        (function(GLOBAL, jQuery) {
            "use strict";
            var isMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.search(/ipad|iphone|android/i) > 0;
            var viewportWidth;
            var viewportHeight;
            var startWidth;
            var startHeight;
            var insertViewportTag = DelfinoConfig.g4 && DelfinoConfig.g4.insertViewportTag || DelfinoConfig.g5 && DelfinoConfig.g5.insertViewportTag;
            var delfino4htmlIframe = "delfino4htmlIframe";
            var resize = undefined;
            var currentForceMobile;
            var profileObj = {
                enable: undefined,
                startTime: undefined,
                printString: "",
                init: function() {
                    if (DelfinoConfig && DelfinoConfig.g4 && DelfinoConfig.g4.profileOn && !this.enable || DelfinoConfig && DelfinoConfig.g5 && DelfinoConfig.g5.profileOn && !this.enable) {
                        this.enable = true;
                        this.startTime = new Date().getTime();
                        this._log("Profile Start at " + this.startTime + "!", this.startTime);
                    } else {
                        return;
                    }
                },
                _log: function(message, fromTime, frame) {
                    if (!this.enable) {
                        return;
                    }
                    if (fromTime === undefined) {
                        fromTime = 0;
                    }
                    frame = frame || "Client      ";
                    message = message || "No message from sign server.";
                    var now = new Date().getTime();
                    fromTime = "" + (fromTime - this.startTime);
                    if (fromTime.length < 8) {
                        var length = fromTime.length;
                        for (var i = 0; i < 8 - length; i++) fromTime = " " + fromTime;
                    }
                    var progressTime = "" + (now - this.startTime);
                    var totalMsg = "[" + frame + "][" + fromTime + "] " + message + "    <When Concatenated time: " + progressTime + ">";
                    this.printString += totalMsg + "\n";
                },
                end: function() {
                    this.enable = undefined;
                    this.startTime = undefined;
                    var returnString = this.printString;
                    this.printString = "";
                    return returnString;
                }
            };
            if (DelfinoConfig.g4 && DelfinoConfig.g4.profileOn) GLOBAL["profilingEnd"] = profileObj.end.bind ? profileObj.end.bind(profileObj) : profileObj.end.bind && profileObj.end.call(profileObj);
            if (DelfinoConfig.g5 && DelfinoConfig.g5.profileOn) GLOBAL["profilingEnd"] = profileObj.end.bind ? profileObj.end.bind(profileObj) : profileObj.end.bind && profileObj.end.call(profileObj);
            var Delfino4Html = {
                iframe: undefined,
                iframeDiv: undefined,
                done: undefined,
                inited: false,
                config: undefined,
                markerDiv: undefined,
                embedIframe: undefined,
                init: function() {
                    if (this.inited) return;
                    if (GLOBAL["addEventListener"]) {
                        GLOBAL["addEventListener"]("message", this.handleMessage, false);
                    } else {
                        GLOBAL["attachEvent"]("onmessage", this.handleMessage);
                    }
                    var fakeWindow = window;
                    if (DelfinoConfig.insideIframe && DC_isIframe()) {
                        fakeWindow = top.window;
                    }
                    var fakeDocument = fakeWindow.document || document;
                    viewportWidth = fakeWindow.innerWidth || fakeDocument.documentElement.clientWidth || fakeDocument.body.clientWidth;
                    viewportHeight = fakeWindow.innerHeight || fakeDocument.documentElement.clientHeight || fakeDocument.body.clientHeight;
                    this.inited = true;
                },
                getCurrentModule: function() {
                    if (Delfino) return Delfino.getModule() || "G4"; else "G4";
                },
                preload: function() {
                    var preload = wiz.util.cookie.get("preload");
                    if (preload != "off") {
                        this.init();
                        this.preloadIframe();
                        return true;
                    } else return false;
                },
                preloadOff: function() {
                    document.cookie = "preload=off";
                },
                insertMetaTag: function() {
                    if (!findViewportTag() && insertViewportTag) {
                        var viewportTag = document.createElement("meta");
                        viewportTag.name = "viewport";
                        viewportTag.content = "width=device-width, user-scalable=no";
                        document.getElementsByTagName("head")[0].appendChild(viewportTag);
                        this.viewportTag = viewportTag;
                    }
                },
                removeMetaTag: function() {
                    if (this.viewportTag) {
                        this.viewportTag.content = "width=" + viewportWidth + ", user-scalable=yes";
                        setTimeout(function() {
                            this.viewportTag.parentNode.removeChild(this.viewportTag);
                            this.viewportTag = undefined;
                        }.bind(this), 1);
                    }
                },
                checkIndexedDbIframe: function(notCheckOrigin) {
                    var ua = GLOBAL.navigator.userAgent;
                    var signServerOrigin = getServerOrigin();
                    if (!((this.getCurrentModule() == "G4" || this.getCurrentModule() == "G10") && DelfinoConfig.g4 && DelfinoConfig.g4.newWindowNoDb || this.getCurrentModule() == "G5" && DelfinoConfig.g5 && DelfinoConfig.g5.newWindowNoDb)) {
                        return false;
                    }
                    if (!notCheckOrigin && window.location.origin == signServerOrigin) {
                        return false;
                    }
                    var firefox = ua.match(/Firefox\/([0-9\.]+)(?:\s|$)/);
                    var version = firefox && firefox[1] && firefox[1].split(".");
                    if (ua.match(/Mac OS X/)) {
                        if (ua.match(/(iPad|iPhone)/) || DC_browserInfo.Safari) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (firefox && parseInt(version[0]) < 40) {
                        return true;
                    } else {
                        return false;
                    }
                },
                preloadIframe: function() {
                    this.loadIframe();
                    this.preloaded = true;
                    this.inProgress = false;
                },
                loadIframe: function() {
                    this.inProgress = true;
                    if (this.preloaded) return;
                    var iframeDiv, iframe, fakeDocument;
                    fakeDocument = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                    var serviceData = this.getServiceUrl();
                    var form = document.createElement("form");
                    fakeDocument.body.appendChild(form);
                    if (this.config.useLegacyParameter) {
                        form.setAttribute("action", serviceData.url);
                        var nocache = document.createElement("input");
                        nocache.type = "hidden";
                        nocache.name = "_";
                        nocache.value = parseInt(new Date().getTime() / 1e3);
                        form.appendChild(nocache);
                    } else {
                        form.setAttribute("method", "post");
                        form.setAttribute("action", serviceData.url + "?_=" + serviceData.nocache);
                        for (var key in serviceData.postData) {
                            var data = serviceData.postData[key];
                            if (!data) continue;
                            var input = document.createElement("input");
                            input.type = "hidden";
                            input.name = key;
                            input.value = data;
                            form.appendChild(input);
                        }
                    }
                    this.insertMetaTag();
                    this.setAllAriaHidden();
                    if (Delfino4Html.checkIndexedDbIframe()) {
                        var windowName = delfino4htmlIframe;
                        if (this.config.useLegacyParameter) {
                            windowName = appendQueryString(windowName, serviceData.postData);
                        }
                        form.setAttribute("target", windowName);
                        var newWindow = window.open("", windowName, "toolbar=no,status=no,resizable=yes,location=no,width=800,height=700");
                        this.newWindow = newWindow;
                    } else {
                        iframeDiv = fakeDocument.createElement("div");
                        iframeDiv.className = "scroll-wrapper";
                        iframeDiv.style.webkitOverflowScrolling = "touch";
                        if (this.getCurrentModule() !== "G5") iframeDiv.style.overflow = "auto";
                        iframeDiv.style.position = "fixed";
                        iframeDiv.style.width = "100%";
                        iframeDiv.style.height = "100%";
                        iframeDiv.style.top = "0px";
                        iframeDiv.style.left = "-" + viewportWidth + "px";
                        iframeDiv.style.zIndex = 100010;
                        iframe = fakeDocument.createElement("iframe");
                        iframe.setAttribute("id", delfino4htmlIframe);
                        if (this.config.useLegacyParameter) {
                            var queryString = appendQueryString(delfino4htmlIframe, serviceData.postData);
                            iframe.setAttribute("name", queryString.replace("?", ","));
                            form.setAttribute("target", queryString.replace("?", ","));
                        } else {
                            iframe.setAttribute("name", delfino4htmlIframe);
                            form.setAttribute("target", delfino4htmlIframe);
                        }
                        iframe.frameBorder = 0;
                        iframe.style.width = "100%";
                        iframe.style.height = "100%";
                        iframe.style.display = "block";
                        iframe.style.border = "0px !important";
                        iframe.style.padding = "0px !important";
                        iframeDiv.appendChild(iframe);
                        fakeDocument.body.appendChild(iframeDiv);
                        this.iframeDiv = iframeDiv || iframe;
                        this.iframe = iframe;
                        this.iframe.setAttribute("title", "인증서창");
                        this.iframe.setAttribute("frameBorder", "0");
                    }
                    form.submit();
                    jQuery(form).remove();
                },
                showIframe: function() {
                    if (this.inProgress === false) return;
                    var fakeWindow = window;
                    if (DelfinoConfig.insideIframe && DC_isIframe()) {
                        fakeWindow = top.window;
                    }
                    if (isMobile && window.scrollY != 0) {
                        this.scrollBackup = {
                            X: window.scrollX,
                            Y: window.scrollY
                        };
                        window.scroll(0, 0);
                    }
                    try {
                        this.iframeDiv.style.left = "0px";
                    } catch (e) {}
                },
                hideIframe: function() {
                    if (this.iframeDiv) {
                        this.iframeDiv.style.left = "-" + viewportWidth + "px";
                        this.close();
                    }
                },
                unloadIframe: function(done) {
                    this.inProgress = false;
                    var fakeWindow = window;
                    var fakeDocument = document;
                    if (DelfinoConfig.insideIframe && DC_isIframe()) {
                        fakeWindow = top.window;
                        fakeDocument = top.window.document;
                    }
                    setTimeout(function() {
                        this.removeAllAriaHidden();
                    }.bind(this), 10);
                    if (this.newWindow) {
                        this.newWindow.close();
                        this.newWindow = undefined;
                        window.DC_enableBrowser();
                        return;
                    }
                    if (this.iframeDiv) {
                        if (this.preloaded) {
                            this.hideIframe();
                        } else {
                            if (jQuery(fakeDocument).has(this.iframeDiv).length == 1) {
                                this.iframe.addEventListener("load", function() {
                                    if (jQuery(this.iframeDiv).has(this.iframe).length == 1) this.iframeDiv.removeChild(this.iframe);
                                    fakeDocument.body.removeChild(this.iframeDiv);
                                    jQuery("body").append('<input id="dummyForIE" type="text" style="position:fixed;left:1px;top:1px;width:1px;height:1px;box-sizing:border-box;padding:0px;border:none;"/>');
                                    jQuery("input#dummyForIE").focus();
                                    fakeWindow.focus && fakeWindow.focus();
                                    jQuery("input#dummyForIE").remove();
                                    this.removeMetaTag();
                                    if (this.scrollBackup) {
                                        fakeWindow.scroll(this.scrollBackup.X, this.scrollBackup.Y);
                                    }
                                    window.DC_enableBrowser();
                                    done();
                                }.bind(this), false);
                                this.iframe.src = "about:blank";
                                return;
                            }
                        }
                    }
                    if (this.scrollBackup) {
                        fakeWindow.scroll(this.scrollBackup.X, this.scrollBackup.Y);
                    }
                    window.DC_enableBrowser();
                    done();
                },
                setAllAriaHidden: function() {
                    var fakeDocument;
                    this.ariaTrue = [];
                    fakeDocument = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                    var test = fakeDocument.body.children;
                    for (var i = 0; i < test.length; i++) {
                        var target = test[i];
                        if (jQuery(target).attr("aria-hidden") == true) {
                            this.ariaTrue.push(jQuery(target));
                        }
                        jQuery(target).attr("aria-hidden", true);
                    }
                },
                removeAllAriaHidden: function() {
                    var fakeDocument, test;
                    fakeDocument = DelfinoConfig.insideIframe && DC_isIframe() ? top.window.document : window.document;
                    test = fakeDocument.body.children;
                    for (var i = 0; i < test.length; i++) {
                        jQuery(test[i]).attr("aria-hidden", false);
                        jQuery(test[i]).removeAttr("aria-hidden");
                    }
                    for (var i = 0; i < this.ariaTrue.length; i++) {
                        this.ariaTrue[i].attr("aria-hidden", true);
                    }
                    this.ariaTrue = [];
                },
                handleMessage: function(evt) {
                    var me = Delfino4Html;
                    var signServerOrigin = getServerOrigin();
                    var message;
                    if (evt.origin !== signServerOrigin && evt.origin !== window.location.protocol + "//" + window.location.host) {
                        return;
                    }
                    try {
                        message = JSON.parse(evt.data);
                    } catch (e) {
                        return;
                    }
                    if (message.onload) {
                        me.onload && me.onload();
                        return;
                    }
                    if (message.profile) {
                        var profileMsg = message.profile;
                        profileObj._log(profileMsg.message, profileMsg.fromTime, profileMsg.frame);
                        return;
                    }
                    if (Delfino4Html.getCurrentModule() !== "G5" ? DelfinoConfig.g4 && !DelfinoConfig.g4.needKey : DelfinoConfig.g5 && !DelfinoConfig.g5.needKey) {
                        if (message.delfino4htmlKey !== "delfino4htmlKey") {
                            return;
                        }
                    }
                    me.unloadIframe(function() {
                        if (me.done) {
                            if (typeof message.delfino4htmlKey !== "undefined") {
                                message.delfino4htmlKey = undefined;
                                delete message.delfino4htmlKey;
                            }
                            me.done(message);
                        }
                    });
                },
                postMessage: function(frame, message) {
                    var signServerOrigin = getServerOrigin();
                    if (this.newWindow) {
                        frame.postMessage(message, signServerOrigin);
                    } else {
                        frame.contentWindow.postMessage(message, signServerOrigin);
                    }
                },
                service: function(service, param, done) {
                    if (isForbiddenRotation() && service != "closeInIframe") {
                        GLOBAL.DC_alert("가로보기에서는 사용할 수 없습니다.\n세로로 다시 돌려 사용해주세요");
                        return;
                    }
                    profileObj.init();
                    this.init();
                    if (done !== undefined) this.done = done;
                    param = param || {};
                    param.config = Delfino4Html.config;
                    if (Delfino4Html.getCurrentModule() == "G4") {
                        for (var key in DelfinoConfig.g4) {
                            param.config[key] = DelfinoConfig.g4[key];
                        }
                        param.config.g3Conf = {};
                        param.config.g3Conf.supportSync = delfino.conf.handler.supportSync;
                        currentForceMobile = param.options.forceMobile === undefined ? param.config.g4.forceMobile : param.options.forceMobile;
                    }
                    if (Delfino4Html.getCurrentModule() == "G5") {
                        for (var key in DelfinoConfig.g5) {
                            param.config[key] = DelfinoConfig.g5[key];
                        }
                    }
                    if (Delfino4Html.getCurrentModule() == "G10" || Delfino4Html.getCurrentModule() == "CG") {
                        for (var key in DelfinoConfig.cg) {
                            param.config[key] = DelfinoConfig.cg[key];
                        }
                        if (Delfino4Html.getCurrentModule() == "G10") {
                            param.currentModule = Delfino4Html.getCurrentModule();
                            currentForceMobile = param.options.forceMobile === undefined ? param.config.cg.forceMobile : param.options.forceMobile;
                        }
                    }
                    var message = JSON.stringify({
                        service: service,
                        param: param
                    });
                    if (this.inProgress && !this.preloaded) return;
                    if (service != "closeInIframe") {
                        window.DC_disableBrowser();
                    }
                    var startTrigger = true;
                    var doService = function(evt) {
                        var me = Delfino4Html;
                        if (service != "closeInIframe") me.showIframe();
                        var message = JSON.stringify({
                            service: service,
                            param: param
                        });
                        var time = new Date().getTime();
                        profileObj._log("Service " + service + " start.", time);
                        startTrigger = false;
                        me.postMessage(me.iframe || me.newWindow, message);
                    };
                    if (this.preloaded) {
                        if (service != "closeInIframe") {
                            this.inProgress = true;
                        }
                        doService();
                    } else if (service === "closeInIframe") {} else {
                        this.loadIframe();
                        if (this.newWindow) {
                            this.onload = doService;
                            return;
                        }
                        this.iframe.onload = doService;
                    }
                },
                setConfig: function(config, done) {
                    this.config = {};
                    var keyValues = config.split("&");
                    for (var i = 0; i < keyValues.length; i++) {
                        var keyValue = keyValues[i].split("=");
                        if (keyValue.length == 2) {
                            if (keyValue[0] == "IssuerCertFilter") this.config["issuerCertFilter"] = decodeURIComponent(keyValue[1]); else if (keyValue[0] == "PolicyOidCertFilter") this.config["policyOidCertFilter"] = decodeURIComponent(keyValue[1]); else this.config[keyValue[0]] = decodeURIComponent(keyValue[1]);
                        }
                    }
                    this.config.g3 = {};
                    this.config.g3.installPage = DelfinoConfig.installPage_g3;
                    this.config.g3.version = delfino.conf.handler.version;
                    this.config.g4 = jQuery.extend(true, {}, DelfinoConfig.g4);
                    this.config.g5 = jQuery.extend(true, {}, DelfinoConfig.g5);
                    this.config.cg = jQuery.extend(true, {}, DelfinoConfig.cg);
                    if (DC_platformInfo.Windows) {
                        this.config.g4.certConverter = this.config.g4.certConverter.Win;
                    } else if (DC_platformInfo.Mac) {
                        this.config.g4.certConverter = this.config.g4.certConverter.Mac;
                    } else if (DC_platformInfo.Linux) {
                        if (DC_platformInfo.x64) {
                            this.config.g4.certConverter = this.config.g4.certConverter.Linux64;
                        } else {
                            this.config.g4.certConverter = this.config.g4.certConverter.Linux32;
                        }
                    }
                    if (this.config.g4.logoUrl == null && DelfinoConfig.logoImageUrl_html5 != null) {
                        this.config.g4.logoUrl = DelfinoConfig.logoImageUrl_html5;
                    }
                    if (this.config.g4.confirmSignTitleUrl == null && DelfinoConfig.confirmSignTitleImageUrl_html5 != null) {
                        this.config.g4.confirmSignTitleUrl = DelfinoConfig.confirmSignTitleImageUrl_html5;
                    }
                    if (this.config.oneSign == null && DelfinoConfig.oneSign) {
                        this.config.oneSign = DelfinoConfig.oneSign;
                    }
                    if (this.config.certRelay == null && DelfinoConfig.certRelay) {
                        this.config.certRelay = DelfinoConfig.certRelay;
                    }
                },
                setProperty: function(key, value, done) {
                    if (key == "logoImage") return;
                    if (key == "delfino.logoimage") return;
                    this.config[key] = value;
                },
                sign: function(data, options, done) {
                    this.service("sign", {
                        data: data,
                        options: options
                    }, done);
                },
                manageCertificate: function(options, done) {
                    this.service("manageCertificate", {
                        options: options
                    }, done);
                },
                requestCertificate: function(ca, host, port, reference, secret, options, done) {
                    var caObj = {
                        name: ca,
                        host: host,
                        port: port
                    };
                    this.service("requestCertificate", {
                        ca: caObj,
                        reference: reference,
                        secret: secret,
                        options: options
                    }, done);
                },
                updateCertificate: function(ca, host, port, options, done) {
                    var caObj = {
                        name: ca,
                        host: host,
                        port: port
                    };
                    this.service("updateCertificate", {
                        ca: caObj,
                        options: options
                    }, done);
                },
                exportCertificateToDelfino4Html: function(options, done) {
                    this.service("exportCertificateToDelfino4Html", {
                        options: options
                    }, done);
                },
                exportCertificateToClient: function(options, done) {
                    this.service("exportCertificateToClient", {
                        options: options
                    }, done);
                },
                importCertificateFromDelfino4Html: function(options, done) {
                    this.service("importCertificateFromDelfino4Html", {
                        options: options
                    }, done);
                },
                signFileUrl: function(downloadurl, uploadurl, options, done) {
                    this.service("signFileUrl", {
                        downloadurl: downloadurl,
                        uploadurl: uploadurl,
                        options: options
                    }, done);
                },
                signFileUrlDown: function(downloadurl, options, done) {
                    this.service("signFileUrlDown", {
                        downloadurl: downloadurl,
                        options: options
                    }, done);
                },
                signFileUrlSign: function(filepath, options, done) {
                    this.service("signFileUrlSign", {
                        filepath: filepath,
                        options: options
                    }, done);
                },
                signFileUrlUp: function(filepath, uploadurl, options, done) {
                    this.service("signFileUrlUp", {
                        filepath: filepath,
                        uploadurl: uploadurl,
                        options: options
                    }, done);
                },
                deleteCertificate: function(subjectOrSerialNumber, options, done) {
                    this.service("deleteCertificate", {
                        subjectOrSerialNumber: subjectOrSerialNumber,
                        options: options
                    }, done);
                },
                fincertSign: function(signData, options, done) {
                    this.service("fincertSign", {
                        signData: signData,
                        options: options
                    }, done);
                },
                embedShow: function(options, done) {
                    this.service("embedShow", {
                        options: options
                    }, done);
                },
                close: function() {
                    if ((Delfino4Html.getCurrentModule() !== "G5" ? DelfinoConfig.g4 && DelfinoConfig.g4.enablePreload : DelfinoConfig.g5 && DelfinoConfig.g5.enablePreload) && resize) {
                        resize = undefined;
                        return;
                    }
                    if (this.newWindow) {
                        this.newWindow.close();
                        return;
                    }
                    this.service("closeInIframe", {});
                },
                _resetAll: function(options) {
                    this.service("_resetAll", {
                        options: options
                    }, function() {});
                },
                getServiceUrl: function() {
                    var currentModule = this.getCurrentModule();
                    if (currentModule == "G5") return getDelfinoG5ServerUrl(); else if (currentModule == "CG") return getDelfinoCGServiceUrl(); else return getDelfino4htmlServerUrl();
                }
            };
            function isSecureKeyboardEnableOS() {
                var currentModule = (Delfino4Html.getCurrentModule() || "g4").toLowerCase();
                if (currentModule === "g10") currentModule = "cg";
                var nowOS = [];
                for (var key in DC_platformInfo) {
                    var target = DC_platformInfo[key];
                    if (target === true) {
                        nowOS.push(key);
                    }
                }
                if (DelfinoConfig[currentModule].secureKeyboard && !DelfinoConfig[currentModule].secureKeyboard.enable || !DelfinoConfig[currentModule].secureKeyboard.enableOS || DelfinoConfig[currentModule].secureKeyboard.name != "touchennxkey") {
                    return false;
                }
                var enableOS = DelfinoConfig[currentModule].secureKeyboard.enableOS.split("|");
                for (var i = 0; i < nowOS.length; i++) {
                    var os = nowOS[i].toUpperCase();
                    for (var j = 0; j < enableOS.length; j++) {
                        if (os == enableOS[j]) return true;
                    }
                }
                return false;
            }
            function appendQueryString(uri, queryString) {
                if (uri.indexOf("?") == -1) {
                    uri += "?";
                }
                if (uri.lastIndexOf("&") !== uri.length - 1 && uri.lastIndexOf("?") !== uri.length - 1) {
                    uri += "&";
                }
                if (typeof queryString === "string") {
                    uri += queryString;
                } else if (typeof queryString === "object") {
                    for (var key in queryString) {
                        if (uri.lastIndexOf("&") !== uri.length - 1 && uri.lastIndexOf("?") !== uri.length - 1) {
                            uri += "&";
                        }
                        uri += key + "=" + encodeURIComponent(queryString[key]);
                    }
                }
                return uri;
            }
            function getServerOrigin() {
                var currentModule = Delfino4Html.getCurrentModule();
                if (currentModule == "G5") return getDelfinoG5ServerOrigin(); else if (currentModule == "CG") return getDelfinoCGServerOrigin(); else return getDelfino4htmlServerOrigin();
            }
            function getDelfino4htmlServerUrl() {
                var serviceName;
                if (Delfino4Html.getCurrentModule() == "G10") {
                    serviceName = "cg";
                } else {
                    serviceName = "g4";
                }
                var serverUrl = DelfinoConfig[serviceName].signServerUrl;
                if (serverUrl.substring(serverUrl.length - 1) != "/") {
                    serverUrl += "/";
                }
                serverUrl += DelfinoConfig[serviceName] && DelfinoConfig[serviceName].mainPageName || "ui.jsp";
                var mode = chooseMode();
                var preload = DelfinoConfig[serviceName].enablePreload ? "on" : "off";
                if (DelfinoConfig.cg && DelfinoConfig.cg.VPCGClientConfig && DelfinoConfig.cg.VPCGClientConfig.disableG4) {
                    DelfinoConfig[serviceName].opencert.enable = false;
                }
                var opencert, encryptedParams, useOnlyOpencert;
                if (DelfinoConfig[serviceName].opencert && DelfinoConfig[serviceName].opencert.enable == true) {
                    opencert = DelfinoConfig[serviceName].opencert.mode;
                    encryptedParams = DelfinoConfig[serviceName].opencert.encryptedParams;
                    if (DelfinoConfig[serviceName].opencert.useOnlyOpencertStorage) {
                        useOnlyOpencert = "true";
                    }
                } else {
                    opencert = "off";
                }
                var profileOn = DelfinoConfig[serviceName].profileOn ? "true" : "false";
                var logger = typeof wizveraLogger !== "undefined" ? "true" : undefined;
                var touchenKeyJs;
                if (DelfinoConfig[serviceName].secureKeyboard && isSecureKeyboardEnableOS()) {
                    touchenKeyJs = DelfinoConfig[serviceName].secureKeyboard.src;
                }
                var g10;
                if (Delfino4Html.getCurrentModule() == "G10") {
                    g10 = "true";
                }
                var postData = {
                    origin: window.location.toString(),
                    targetUrl: serverUrl,
                    mode: mode,
                    preload: preload,
                    opencert: opencert,
                    encryptedParams: encryptedParams,
                    useOnlyOpencert: useOnlyOpencert,
                    profileOn: profileOn,
                    logger: logger,
                    touchenKeyJs: touchenKeyJs,
                    g10: g10
                };
                return {
                    url: serverUrl,
                    nocache: new Date().getTime(),
                    postData: postData
                };
            }
            function getDelfinoG5ServerUrl() {
                var serviceName = "g5";
                var serverUrl = DelfinoConfig[serviceName].signServerUrl;
                if (serverUrl.substring(serverUrl.length - 1) != "/") {
                    serverUrl += "/";
                }
                serverUrl += DelfinoConfig[serviceName] && DelfinoConfig[serviceName].mainPageName || "main.jsp";
                var mode = chooseMode();
                var preload = DelfinoConfig[serviceName].enablePreload ? "on" : "off";
                if (DelfinoConfig.cg && DelfinoConfig.cg.VPCGClientConfig && DelfinoConfig.cg.VPCGClientConfig.disableG4) {
                    DelfinoConfig[serviceName].opencert.enable = false;
                }
                var opencert, encryptedParams, useOnlyOpencert;
                if (DelfinoConfig[serviceName].opencert && DelfinoConfig[serviceName].opencert.enable == true) {
                    opencert = DelfinoConfig[serviceName].opencert.mode;
                    encryptedParams = DelfinoConfig[serviceName].opencert.encryptedParams;
                    if (DelfinoConfig[serviceName].opencert.useOnlyOpencertStorage) {
                        useOnlyOpencert = "true";
                    }
                } else {
                    opencert = "off";
                }
                var profileOn = DelfinoConfig[serviceName].profileOn ? "true" : "false";
                var logger = typeof wizveraLogger !== "undefined" ? "true" : undefined;
                var touchenKeyJs;
                if (DelfinoConfig[serviceName].secureKeyboard && isSecureKeyboardEnableOS()) {
                    touchenKeyJs = DelfinoConfig[serviceName].secureKeyboard.src;
                }
                var moduleName = "G5";
                var postData = {
                    origin: window.location.toString(),
                    targetUrl: serverUrl,
                    mode: mode,
                    preload: preload,
                    opencert: opencert,
                    encryptedParams: encryptedParams,
                    useOnlyOpencert: useOnlyOpencert,
                    profileOn: profileOn,
                    logger: logger,
                    touchenKeyJs: touchenKeyJs,
                    module: moduleName
                };
                return {
                    url: serverUrl,
                    nocache: new Date().getTime(),
                    postData: postData
                };
            }
            function getDelfinoCGServiceUrl() {
                var serverUrl = DelfinoConfig.cg.signServerUrl;
                if (serverUrl.substring(serverUrl.length - 1) != "/") {
                    serverUrl += "/";
                }
                serverUrl += DelfinoConfig.cg && DelfinoConfig.cg.mainPageName || "vpcg.jsp";
                var mode = chooseMode();
                var parameters = "?origin=" + encodeURIComponent(window.location.toString()) + "&target=" + encodeURIComponent(serverUrl) + "&userAgent=" + encodeURIComponent(window.navigator.userAgent) + "&mode=" + mode;
                serverUrl += parameters;
                serverUrl += "&nocache=" + new Date().getTime();
                if (DelfinoConfig.cg.enablePreload) {
                    serverUrl += "&preload=on";
                } else {
                    serverUrl += "&preload=off";
                }
                if (DelfinoConfig.cg.profileOn) {
                    serverUrl += "&profileOn=true";
                } else {
                    serverUrl += "&profileOn=false";
                }
                if (typeof wizveraLogger !== "undefined") {
                    serverUrl += "&logger=true";
                }
                if (DelfinoConfig.g4.secureKeyboard && isSecureKeyboardEnableOS()) {
                    serverUrl += "&touchenKeyJs=" + encodeURIComponent(DelfinoConfig.g4.secureKeyboard.src);
                }
                return serverUrl;
            }
            function getOrigin(url) {
                if (!url || typeof url !== "string") return null;
                var index = url.indexOf("://");
                if (index == -1) return null;
                index = url.indexOf("/", index + 4);
                if (index == -1) return url;
                return url.substring(0, index);
            }
            function getDelfino4htmlServerOrigin() {
                return getOrigin(DelfinoConfig.g4.signServerUrl);
            }
            function getDelfinoG5ServerOrigin() {
                return getOrigin(DelfinoConfig.g5.signServerUrl);
            }
            function getDelfinoCGServerOrigin() {
                return getOrigin(DelfinoConfig.cg.signServerUrl);
            }
            function findViewportTag() {
                var tags = document.getElementsByName("viewport");
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].tagName && tags[i].tagName.toLowerCase() == "meta") {
                        return true;
                    }
                }
                return false;
            }
            function chooseMode() {
                var mode = "desktop";
                if (isMobile) {
                    if (findViewportTag()) {
                        if (currentForceMobile) {
                            mode = "mobile";
                        } else if (Math.min(window.screen.width, window.screen.height) >= 600 && window.navigator.userAgent.indexOf("SM-F936") === -1 && window.navigator.userAgent.indexOf("SM-F926") === -1 && window.navigator.userAgent.indexOf("SM-F916") === -1) {
                            mode = "tablet";
                        } else {
                            mode = "mobile";
                        }
                    } else {
                        mode = "tablet";
                    }
                }
                return mode;
            }
            function isForbiddenRotation() {
                var mode = chooseMode();
                var width = window.screen.width;
                var height = window.screen.height;
                if (mode == "mobile") {
                    if (width > height) return true;
                } else if (mode == "tablet") {
                    if (Delfino4Html.getCurrentModule() !== "G5" ? DelfinoConfig.g4 && DelfinoConfig.g4.enableRotationOnTablet : DelfinoConfig.g5 && DelfinoConfig.g5.enableRotationOnTablet) {
                        return false;
                    }
                    if (findViewportTag()) {
                        if (Math.min(width, height) < 768 && width > height) return true;
                    } else {
                        if (Math.min(width, height) < 780 && width > height) return true;
                    }
                }
                return false;
            }
            var startTime = new Date().getTime();
            function ajaxLog(message) {
                return;
                var serverUrl = DelfinoConfig.g4.signServerUrl;
                if (serverUrl.substring(serverUrl.length - 1) != "/") {
                    serverUrl += "/";
                }
                var loggerUrl = serverUrl + "logger.jsp";
                var currentTime = new Date().getTime();
                var timeDiff = currentTime - startTime;
                message = timeDiff + " " + message;
                var data = "data=" + encodeURIComponent(message);
                jQuery.ajax({
                    url: loggerUrl,
                    data: "data=" + message,
                    success: function(result) {}
                });
            }
            GLOBAL["Delfino4Html"] = Delfino4Html;
            var addListener = GLOBAL["addEventListener"] ? "addEventListener" : "attachEvent";
            var FAKE_GLOBAL = GLOBAL;
            if (DelfinoConfig.insideIframe && DC_isIframe()) {
                FAKE_GLOBAL = top.window;
                FAKE_GLOBAL[addListener]("resize", resizeHandlerTop, false);
            } else {
                FAKE_GLOBAL[addListener]("resize", resizeHandler, false);
            }
            function resizeHandlerTop(evt) {
                isMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.search(/ipad|iphone|android/i) > 0;
                var fakeWindow = window;
                if (DelfinoConfig.insideIframe && DC_isIframe()) {
                    fakeWindow = top.window;
                }
                var document = fakeWindow.document;
                viewportWidth = fakeWindow.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                viewportHeight = fakeWindow.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                if (isForbiddenRotation()) {
                    resize = true;
                    !isNoHideOnRotation() && Delfino4Html.hideIframe();
                    if (Delfino4Html.inProgress) GLOBAL.DC_alert("가로보기에서는 사용할 수 없습니다.\n세로로 다시 돌려 사용해주세요");
                } else {
                    if (Delfino4Html.inProgress) {
                        Delfino4Html.showIframe();
                    }
                }
            }
            function resizeHandler(evt) {
                isMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.search(/ipad|iphone|android/i) > 0;
                viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                if (isForbiddenRotation()) {
                    resize = true;
                    !isNoHideOnRotation() && Delfino4Html.hideIframe();
                    if (Delfino4Html.inProgress) GLOBAL.DC_alert("가로보기에서는 사용할 수 없습니다.\n세로로 다시 돌려 사용해주세요");
                } else {
                    if (Delfino4Html.inProgress) {
                        Delfino4Html.showIframe();
                    }
                }
            }
            function isNoHideOnRotation() {
                var module = Delfino4Html.getCurrentModule().toLowerCase();
                if (module == "g10") module = "cg";
                var config = DelfinoConfig[module];
                return DelfinoConfig[module] && DelfinoConfig[module].noHideOnRotation;
            }
            function insertRelayJs() {
                if (typeof DelfinoConfig === "undefined" || typeof Delfino === "undefined" || typeof Delfino4Html === "undefined") {
                    return setTimeout(insertRelayJs, 100);
                }
                if ((Delfino4Html.getCurrentModule() === "G4" || Delfino4Html.getCurrentModule() === "G10") && (DelfinoConfig.g4 && DelfinoConfig.g4.opencert && DelfinoConfig.g4.opencert.enable == true) || Delfino4Html.getCurrentModule() === "G5" && (DelfinoConfig.g5 && DelfinoConfig.g5.opencert && DelfinoConfig.g5.opencert.enable == true)) {
                    var script = document.createElement("script");
                    var src = Delfino4Html.getCurrentModule() === "G5" ? DelfinoConfig.g5.opencert.relaySrc : DelfinoConfig.g4.opencert.relaySrc;
                    if (!src) {
                        var mode = Delfino4Html.getCurrentModule() === "G5" ? DelfinoConfig.g5.opencert.mode : DelfinoConfig.g4.opencert.mode;
                        src = mode == "real" ? "https://www.yessign.or.kr:3100/v2/relay.js" : "https://fidoweb.yessign.or.kr:3100/v2/relay.js";
                    }
                    var today = new Date();
                    var year = "" + today.getFullYear();
                    var month = "" + (today.getMonth() + 1);
                    if (month.length == 1) month = "0" + month;
                    var date = "" + today.getDate();
                    if (date.length == 1) date = "0" + date;
                    var corpCode = Delfino4Html.getCurrentModule() === "G5" ? DelfinoConfig.g5.opencert.corpCode : DelfinoConfig.g4.opencert.corpCode;
                    script.src = src + "?dt=" + year + month + date + (corpCode ? "&corp=" + corpCode : "");
                    document.body.appendChild(script);
                }
            }
            jQuery(document).ready(function() {
                if (DelfinoConfig.insideIframe && DC_isIframe()) {
                    FAKE_GLOBAL = top.window;
                } else {}
                insertRelayJs();
                jQuery(function() {
                    if (window.DC_module == "G4" && DelfinoConfig.g4 && DelfinoConfig.g4.enablePreload) Delfino4Html.preload();
                    if (window.DC_module == "G5" && DelfinoConfig.g5 && DelfinoConfig.g5.enablePreload) Delfino4Html.preload();
                    if (window.DC_module == "G10" && DelfinoConfig.g4 && DelfinoConfig.g4.enablePreload) Delfino4Html.preload();
                    if (window.DC_module == "CG" && DelfinoConfig.g4 && DelfinoConfig.cg.enablePreload) Delfino4Html.preload();
                });
            });
        })(window, jQuery);
    }
    var name = "gen-delfino_html5";
    function addWizvera() {
        if (typeof initModule !== "function") return;
        var wizvera = {};
        if (typeof window === "object") {
            if (typeof window.wizvera === "object") {
                wizvera = window.wizvera;
            } else {
                window.wizvera = wizvera;
            }
        }
        wizvera.kryptos = wizvera.kryptos || {};
        initModule(wizvera.kryptos);
        return wizvera;
    }
    var wizvera = addWizvera();
})();(function(){function t(t){(function(){if(typeof window==="object"){GLOBAL=window}else{GLOBAL=global}var t=GLOBAL.wizvera||{};GLOBAL.wizvera=t;t.version="4.3.8.8";t.buildDate="2022-12-01 10:59:44";t.moduleName="WizIN-Delfino G4";t.moduleVendorName="WIZVERA";if(GLOBAL.kryptos){t.kryptos=GLOBAL.kryptos}if(typeof module==="object"&&module.exports){module.exports=t}})()}var e="gen-wizvera";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){window.console=window.console||new Object;window.console.log=window.console.log||function(t){}}var e="gen-shim";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.util=t.util||{};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){e.setImmediate=setImmediate;e.nextTick=function(t){return setImmediate(t)}}else{e.setImmediate=function(t){setTimeout(t,0)};e.nextTick=e.setImmediate}}else{e.nextTick=process.nextTick;if(typeof setImmediate==="function"){e.setImmediate=setImmediate}else{e.setImmediate=e.nextTick}}e.isArray=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};e.isArrayBuffer=function(t){return typeof ArrayBuffer!=="undefined"&&t instanceof ArrayBuffer};var r=[];if(typeof DataView!=="undefined"){r.push(DataView)}if(typeof Int8Array!=="undefined"){r.push(Int8Array)}if(typeof Uint8Array!=="undefined"){r.push(Uint8Array)}if(typeof Uint8ClampedArray!=="undefined"){r.push(Uint8ClampedArray)}if(typeof Int16Array!=="undefined"){r.push(Int16Array)}if(typeof Uint16Array!=="undefined"){r.push(Uint16Array)}if(typeof Int32Array!=="undefined"){r.push(Int32Array)}if(typeof Uint32Array!=="undefined"){r.push(Uint32Array)}if(typeof Float32Array!=="undefined"){r.push(Float32Array)}if(typeof Float64Array!=="undefined"){r.push(Float64Array)}e.isArrayBufferView=function(t){for(var e=0;e<r.length;++e){if(t instanceof r[e]){return true}}return false};e.ByteBuffer=i;function i(t){this.data="";this.read=0;if(typeof t==="string"){this.data=t}else if(e.isArrayBuffer(t)||e.isArrayBufferView(t)){var r=new Uint8Array(t);try{this.data=String.fromCharCode.apply(null,r)}catch(n){for(var a=0;a<r.length;++a){this.putByte(r[a])}}}else if(t instanceof i||typeof t==="object"&&typeof t.data==="string"&&typeof t.read==="number"){this.data=t.data;this.read=t.read}this._constructedStringLength=0}e.ByteStringBuffer=i;var n=4096;e.ByteStringBuffer.prototype._optimizeConstructedString=function(t){this._constructedStringLength+=t;if(this._constructedStringLength>n){this.data.substr(0,1);this._constructedStringLength=0}};e.ByteStringBuffer.prototype.length=function(){return this.data.length-this.read};e.ByteStringBuffer.prototype.isEmpty=function(){return this.length()<=0};e.ByteStringBuffer.prototype.putByte=function(t){return this.putBytes(String.fromCharCode(t))};e.ByteStringBuffer.prototype.fillWithByte=function(t,e){t=String.fromCharCode(t);var r=this.data;while(e>0){if(e&1){r+=t}e>>>=1;if(e>0){t+=t}}this.data=r;this._optimizeConstructedString(e);return this};e.ByteStringBuffer.prototype.putBytes=function(t){this.data+=t;this._optimizeConstructedString(t.length);return this};e.ByteStringBuffer.prototype.putString=function(t){return this.putBytes(e.encodeUtf8(t))};e.ByteStringBuffer.prototype.putInt16=function(t){return this.putBytes(String.fromCharCode(t>>8&255)+String.fromCharCode(t&255))};e.ByteStringBuffer.prototype.putInt24=function(t){return this.putBytes(String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(t&255))};e.ByteStringBuffer.prototype.putInt32=function(t){return this.putBytes(String.fromCharCode(t>>24&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(t&255))};e.ByteStringBuffer.prototype.putInt16Le=function(t){return this.putBytes(String.fromCharCode(t&255)+String.fromCharCode(t>>8&255))};e.ByteStringBuffer.prototype.putInt24Le=function(t){return this.putBytes(String.fromCharCode(t&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(t>>16&255))};e.ByteStringBuffer.prototype.putInt32Le=function(t){return this.putBytes(String.fromCharCode(t&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>24&255))};e.ByteStringBuffer.prototype.putInt=function(t,e){var r="";do{e-=8;r+=String.fromCharCode(t>>e&255)}while(e>0);return this.putBytes(r)};e.ByteStringBuffer.prototype.putSignedInt=function(t,e){if(t<0){t+=2<<e-1}return this.putInt(t,e)};e.ByteStringBuffer.prototype.putBuffer=function(t){return this.putBytes(t.getBytes())};e.ByteStringBuffer.prototype.getByte=function(){return this.data.charCodeAt(this.read++)};e.ByteStringBuffer.prototype.getInt16=function(){var t=this.data.charCodeAt(this.read)<<8^this.data.charCodeAt(this.read+1);this.read+=2;return t};e.ByteStringBuffer.prototype.getInt24=function(){var t=this.data.charCodeAt(this.read)<<16^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2);this.read+=3;return t};e.ByteStringBuffer.prototype.getInt32=function(){var t=this.data.charCodeAt(this.read)<<24^this.data.charCodeAt(this.read+1)<<16^this.data.charCodeAt(this.read+2)<<8^this.data.charCodeAt(this.read+3);this.read+=4;return t};e.ByteStringBuffer.prototype.getInt16Le=function(){var t=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8;this.read+=2;return t};e.ByteStringBuffer.prototype.getInt24Le=function(){var t=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16;this.read+=3;return t};e.ByteStringBuffer.prototype.getInt32Le=function(){var t=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16^this.data.charCodeAt(this.read+3)<<24;this.read+=4;return t};e.ByteStringBuffer.prototype.getInt=function(t){var e=0;do{e=(e<<8)+this.data.charCodeAt(this.read++);t-=8}while(t>0);return e};e.ByteStringBuffer.prototype.getSignedInt=function(t){var e=this.getInt(t);var r=2<<t-2;if(e>=r){e-=r<<1}return e};e.ByteStringBuffer.prototype.getBytes=function(t){var e;if(t){t=Math.min(this.length(),t);e=this.data.slice(this.read,this.read+t);this.read+=t}else if(t===0){e=""}else{e=this.read===0?this.data:this.data.slice(this.read);this.clear()}return e};e.ByteStringBuffer.prototype.bytes=function(t){return typeof t==="undefined"?this.data.slice(this.read):this.data.slice(this.read,this.read+t)};e.ByteStringBuffer.prototype.at=function(t){return this.data.charCodeAt(this.read+t)};e.ByteStringBuffer.prototype.setAt=function(t,e){this.data=this.data.substr(0,this.read+t)+String.fromCharCode(e)+this.data.substr(this.read+t+1);return this};e.ByteStringBuffer.prototype.last=function(){return this.data.charCodeAt(this.data.length-1)};e.ByteStringBuffer.prototype.copy=function(){var t=e.createBuffer(this.data);t.read=this.read;return t};e.ByteStringBuffer.prototype.compact=function(){if(this.read>0){this.data=this.data.slice(this.read);this.read=0}return this};e.ByteStringBuffer.prototype.clear=function(){this.data="";this.read=0;return this};e.ByteStringBuffer.prototype.truncate=function(t){var e=Math.max(0,this.length()-t);this.data=this.data.substr(this.read,e);this.read=0;return this};e.ByteStringBuffer.prototype.toHex=function(){var t="";for(var e=this.read;e<this.data.length;++e){var r=this.data.charCodeAt(e);if(r<16){t+="0"}t+=r.toString(16)}return t};e.ByteStringBuffer.prototype.toString=function(){return e.decodeUtf8(this.bytes())};function a(t,r){r=r||{};this.read=r.readOffset||0;this.growSize=r.growSize||1024;var i=e.isArrayBuffer(t);var n=e.isArrayBufferView(t);if(i||n){if(i){this.data=new DataView(t)}else{this.data=new DataView(t.buffer,t.byteOffset,t.byteLength)}this.write="writeOffset"in r?r.writeOffset:this.data.byteLength;return}this.data=new DataView(new ArrayBuffer(0));this.write=0;if(t!==null&&t!==undefined){this.putBytes(t)}if("writeOffset"in r){this.write=r.writeOffset}}e.DataBuffer=a;e.DataBuffer.prototype.length=function(){return this.write-this.read};e.DataBuffer.prototype.isEmpty=function(){return this.length()<=0};e.DataBuffer.prototype.accommodate=function(t,e){if(this.length()>=t){return this}e=Math.max(e||this.growSize,t);var r=new Uint8Array(this.data.buffer,this.data.byteOffset,this.data.byteLength);var i=new Uint8Array(this.length()+e);i.set(r);this.data=new DataView(i.buffer);return this};e.DataBuffer.prototype.putByte=function(t){this.accommodate(1);this.data.setUint8(this.write++,t);return this};e.DataBuffer.prototype.fillWithByte=function(t,e){this.accommodate(e);for(var r=0;r<e;++r){this.data.setUint8(t)}return this};e.DataBuffer.prototype.putBytes=function(t,r){if(e.isArrayBufferView(t)){var i=new Uint8Array(t.buffer,t.byteOffset,t.byteLength);var n=i.byteLength-i.byteOffset;this.accommodate(n);var a=new Uint8Array(this.data.buffer,this.write);a.set(i);this.write+=n;return this}if(e.isArrayBuffer(t)){var i=new Uint8Array(t);this.accommodate(i.byteLength);var a=new Uint8Array(this.data.buffer);a.set(i,this.write);this.write+=i.byteLength;return this}if(t instanceof e.DataBuffer||typeof t==="object"&&typeof t.read==="number"&&typeof t.write==="number"&&e.isArrayBufferView(t.data)){var i=new Uint8Array(t.data.byteLength,t.read,t.length());this.accommodate(i.byteLength);var a=new Uint8Array(t.data.byteLength,this.write);a.set(i);this.write+=i.byteLength;return this}if(t instanceof e.ByteStringBuffer){t=t.data;r="binary"}r=r||"binary";if(typeof t==="string"){var s;if(r==="hex"){this.accommodate(Math.ceil(t.length/2));s=new Uint8Array(this.data.buffer,this.write);this.write+=e.binary.hex.decode(t,s,this.write);return this}if(r==="base64"){this.accommodate(Math.ceil(t.length/4)*3);s=new Uint8Array(this.data.buffer,this.write);this.write+=e.binary.base64.decode(t,s,this.write);return this}if(r==="utf8"){t=e.encodeUtf8(t);r="binary"}if(r==="binary"||r==="raw"){this.accommodate(t.length);s=new Uint8Array(this.data.buffer,this.write);this.write+=e.binary.raw.decode(s);return this}if(r==="utf16"){this.accommodate(t.length*2);s=new Uint16Array(this.data.buffer,this.write);this.write+=e.text.utf16.encode(s);return this}throw new Error("Invalid encoding: "+r)}throw Error("Invalid parameter: "+t)};e.DataBuffer.prototype.putBuffer=function(t){this.putBytes(t);t.clear();return this};e.DataBuffer.prototype.putString=function(t){return this.putBytes(t,"utf16")};e.DataBuffer.prototype.putInt16=function(t){this.accommodate(2);this.data.setInt16(this.write,t);this.write+=2;return this};e.DataBuffer.prototype.putInt24=function(t){this.accommodate(3);this.data.setInt16(this.write,t>>8&65535);this.data.setInt8(this.write,t>>16&255);this.write+=3;return this};e.DataBuffer.prototype.putInt32=function(t){this.accommodate(4);this.data.setInt32(this.write,t);this.write+=4;return this};e.DataBuffer.prototype.putInt16Le=function(t){this.accommodate(2);this.data.setInt16(this.write,t,true);this.write+=2;return this};e.DataBuffer.prototype.putInt24Le=function(t){this.accommodate(3);this.data.setInt8(this.write,t>>16&255);this.data.setInt16(this.write,t>>8&65535,true);this.write+=3;return this};e.DataBuffer.prototype.putInt32Le=function(t){this.accommodate(4);this.data.setInt32(this.write,t,true);this.write+=4;return this};e.DataBuffer.prototype.putInt=function(t,e){this.accommodate(e/8);do{e-=8;this.data.setInt8(this.write++,t>>e&255)}while(e>0);return this};e.DataBuffer.prototype.putSignedInt=function(t,e){this.accommodate(e/8);if(t<0){t+=2<<e-1}return this.putInt(t,e)};e.DataBuffer.prototype.getByte=function(){return this.data.getInt8(this.read++)};e.DataBuffer.prototype.getInt16=function(){var t=this.data.getInt16(this.read);this.read+=2;return t};e.DataBuffer.prototype.getInt24=function(){var t=this.data.getInt16(this.read)<<8^this.data.getInt8(this.read+2);this.read+=3;return t};e.DataBuffer.prototype.getInt32=function(){var t=this.data.getInt32(this.read);this.read+=4;return t};e.DataBuffer.prototype.getInt16Le=function(){var t=this.data.getInt16(this.read,true);this.read+=2;return t};e.DataBuffer.prototype.getInt24Le=function(){var t=this.data.getInt8(this.read)^this.data.getInt16(this.read+1,true)<<8;this.read+=3;return t};e.DataBuffer.prototype.getInt32Le=function(){var t=this.data.getInt32(this.read,true);this.read+=4;return t};e.DataBuffer.prototype.getInt=function(t){var e=0;do{e=(e<<8)+this.data.getInt8(this.read++);t-=8}while(t>0);return e};e.DataBuffer.prototype.getSignedInt=function(t){var e=this.getInt(t);var r=2<<t-2;if(e>=r){e-=r<<1}return e};e.DataBuffer.prototype.getBytes=function(t){var e;if(t){t=Math.min(this.length(),t);e=this.data.slice(this.read,this.read+t);this.read+=t}else if(t===0){e=""}else{e=this.read===0?this.data:this.data.slice(this.read);this.clear()}return e};e.DataBuffer.prototype.bytes=function(t){return typeof t==="undefined"?this.data.slice(this.read):this.data.slice(this.read,this.read+t)};e.DataBuffer.prototype.at=function(t){return this.data.getUint8(this.read+t)};e.DataBuffer.prototype.setAt=function(t,e){this.data.setUint8(t,e);return this};e.DataBuffer.prototype.last=function(){return this.data.getUint8(this.write-1)};e.DataBuffer.prototype.copy=function(){return new e.DataBuffer(this)};e.DataBuffer.prototype.compact=function(){if(this.read>0){var t=new Uint8Array(this.data.buffer,this.read);var e=new Uint8Array(t.byteLength);e.set(t);this.data=new DataView(e);this.write-=this.read;this.read=0}return this};e.DataBuffer.prototype.clear=function(){this.data=new DataView(new ArrayBuffer(0));this.read=this.write=0;return this};e.DataBuffer.prototype.truncate=function(t){this.write=Math.max(0,this.length()-t);this.read=Math.min(this.read,this.write);return this};e.DataBuffer.prototype.toHex=function(){var t="";for(var e=this.read;e<this.data.byteLength;++e){var r=this.data.getUint8(e);if(r<16){t+="0"}t+=r.toString(16)}return t};e.DataBuffer.prototype.toString=function(t){var r=new Uint8Array(this.data,this.read,this.length());t=t||"utf8";if(t==="binary"||t==="raw"){return e.binary.raw.encode(r)}if(t==="hex"){return e.binary.hex.encode(r)}if(t==="base64"){return e.binary.base64.encode(r)}if(t==="utf8"){return e.text.utf8.decode(r)}if(t==="utf16"){return e.text.utf16.decode(r)}throw new Error("Invalid encoding: "+t)};e.createBuffer=function(t,r){r=r||"raw";if(t!==undefined&&r==="utf8"){t=e.encodeUtf8(t)}return new e.ByteBuffer(t)};e.fillString=function(t,e){var r="";while(e>0){if(e&1){r+=t}e>>>=1;if(e>0){t+=t}}return r};e.xorBytes=function(t,e,r){var i="";var n="";var a="";var s=0;var o=0;for(;r>0;--r,++s){n=t.charCodeAt(s)^e.charCodeAt(s);if(o>=10){i+=a;a="";o=0}a+=String.fromCharCode(n);++o}i+=a;return i};e.hexToBytes=function(t){var e="";var r=0;if(t.length&1==1){r=1;e+=String.fromCharCode(parseInt(t.substr(0,1),16))}for(;r<t.length;r+=2){e+=String.fromCharCode(parseInt(t.substr(r,2),16))}return e};e.bytesToHex=function(t){return e.createBuffer(t).toHex()};e.int32ToBytes=function(t){return String.fromCharCode(t>>24&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(t&255)};var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var o=[62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,64,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];e.encode64=function(t,e){var r="";var i="";var n,a,o;var f=0;while(f<t.length){n=t.charCodeAt(f++);a=t.charCodeAt(f++);o=t.charCodeAt(f++);r+=s.charAt(n>>2);r+=s.charAt((n&3)<<4|a>>4);if(isNaN(a)){r+="=="}else{r+=s.charAt((a&15)<<2|o>>6);r+=isNaN(o)?"=":s.charAt(o&63)}if(e&&r.length>e){i+=r.substr(0,e)+"\r\n";r=r.substr(e)}}i+=r;return i};e.decode64=function(t){t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");var e="";var r,i,n,a;var s=0;while(s<t.length){r=o[t.charCodeAt(s++)-43];i=o[t.charCodeAt(s++)-43];n=o[t.charCodeAt(s++)-43];a=o[t.charCodeAt(s++)-43];e+=String.fromCharCode(r<<2|i>>4);if(n!==64){e+=String.fromCharCode((i&15)<<4|n>>2);if(a!==64){e+=String.fromCharCode((n&3)<<6|a)}}}return e};e.encodeUtf8=function(t){return unescape(encodeURIComponent(t))};e.decodeUtf8=function(t){return decodeURIComponent(escape(t))};e.binary={raw:{},hex:{},base64:{}};e.binary.raw.encode=function(t){return String.fromCharCode.apply(null,t)};e.binary.raw.decode=function(t,e,r){var i=e;if(!i){i=new Uint8Array(t.length)}r=r||0;var n=r;for(var a=0;a<t.length;++a){i[n++]=t.charCodeAt(a)}return e?n-r:i};e.binary.hex.encode=e.bytesToHex;e.binary.hex.decode=function(t,e,r){var i=e;if(!i){i=new Uint8Array(Math.ceil(t.length/2))}r=r||0;var n=0,a=r;if(t.length&1){n=1;i[a++]=parseInt(t.substr(0,1),16)}for(;n<t.length;n+=2){i[a++]=parseInt(t.substr(n,2),16)}return e?a-r:i};e.binary.base64.encode=function(t,e){var r="";var i="";var n,a,o;var f=0;while(f<t.byteLength){n=t[f++];a=t[f++];o=t[f++];r+=s.charAt(n>>2);r+=s.charAt((n&3)<<4|a>>4);if(isNaN(a)){r+="=="}else{r+=s.charAt((a&15)<<2|o>>6);r+=isNaN(o)?"=":s.charAt(o&63)}if(e&&r.length>e){i+=r.substr(0,e)+"\r\n";r=r.substr(e)}}i+=r;return i};e.binary.base64.decode=function(t,e,r){var i=e;if(!i){i=new Uint8Array(Math.ceil(t.length/4)*3)}t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");r=r||0;var n,a,s,f;var u=0,h=r;while(u<t.length){n=o[t.charCodeAt(u++)-43];a=o[t.charCodeAt(u++)-43];s=o[t.charCodeAt(u++)-43];f=o[t.charCodeAt(u++)-43];i[h++]=n<<2|a>>4;if(s!==64){i[h++]=(a&15)<<4|s>>2;if(f!==64){i[h++]=(s&3)<<6|f}}}return e?h-r:i};e.text={utf8:{},utf16:{}};e.text.utf8.encode=function(t,r,i){t=e.encodeUtf8(t);var n=r;if(!n){n=new Uint8Array(t.length)}i=i||0;var a=i;for(var s=0;s<t.length;++s){n[a++]=t.charCodeAt(s)}return r?a-i:n};e.text.utf8.decode=function(t){return e.decodeUtf8(String.fromCharCode.apply(null,t))};e.text.utf16.encode=function(t,e,r){var i=e;if(!i){i=new Uint8Array(t.length)}var n=new Uint16Array(i);r=r||0;var a=r;var s=r;for(var o=0;o<t.length;++o){n[s++]=t.charCodeAt(o);a+=2}return e?a-r:i};e.text.utf16.decode=function(t){return String.fromCharCode.apply(null,new Uint16Array(t))};e.deflate=function(t,r,i){r=e.decode64(t.deflate(e.encode64(r)).rval);if(i){var n=2;var a=r.charCodeAt(1);if(a&32){n=6}r=r.substring(n,r.length-4)}return r};e.inflate=function(t,r,i){var n=t.inflate(e.encode64(r)).rval;return n===null?null:e.decode64(n)};var f=function(t,r,i){if(!t){throw new Error("WebStorage not available.")}var n;if(i===null){n=t.removeItem(r)}else{i=e.encode64(JSON.stringify(i));n=t.setItem(r,i)}if(typeof n!=="undefined"&&n.rval!==true){var a=new Error(n.error.message);a.id=n.error.id;a.name=n.error.name;throw a}};var u=function(t,r){if(!t){throw new Error("WebStorage not available.")}var i=t.getItem(r);if(t.init){if(i.rval===null){if(i.error){var n=new Error(i.error.message);n.id=i.error.id;n.name=i.error.name;throw n}i=null}else{i=i.rval}}if(i!==null){i=JSON.parse(e.decode64(i))}return i};var h=function(t,e,r,i){var n=u(t,e);if(n===null){n={}}n[r]=i;f(t,e,n)};var c=function(t,e,r){var i=u(t,e);if(i!==null){i=r in i?i[r]:null}return i};var l=function(t,e,r){var i=u(t,e);if(i!==null&&r in i){delete i[r];var n=true;for(var a in i){n=false;break}if(n){i=null}f(t,e,i)}};var p=function(t,e){f(t,e,null)};var d=function(t,e,r){var i=null;if(typeof r==="undefined"){r=["web","flash"]}var n;var a=false;var s=null;for(var o in r){n=r[o];try{if(n==="flash"||n==="both"){if(e[0]===null){throw new Error("Flash local storage not available.")}i=t.apply(this,e);a=n==="flash"}if(n==="web"||n==="both"){e[0]=localStorage;i=t.apply(this,e);a=true}}catch(f){s=f}if(a){break}}if(!a){throw s}return i};e.setItem=function(t,e,r,i,n){d(h,arguments,n)};e.getItem=function(t,e,r,i){return d(c,arguments,i)};e.removeItem=function(t,e,r,i){d(l,arguments,i)};e.clearItems=function(t,e,r){d(p,arguments,r)};e.parseUrl=function(t){var e=/^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;e.lastIndex=0;var r=e.exec(t);var i=r===null?null:{full:t,scheme:r[1],host:r[2],port:r[3],path:r[4]};if(i){i.fullHost=i.host;if(i.port){if(i.port!==80&&i.scheme==="http"){i.fullHost+=":"+i.port}else if(i.port!==443&&i.scheme==="https"){i.fullHost+=":"+i.port}}else if(i.scheme==="http"){i.port=80}else if(i.scheme==="https"){i.port=443}i.full=i.scheme+"://"+i.fullHost}return i};var y=null;e.getQueryVariables=function(t){var e=function(t){var e={};var r=t.split("&");for(var i=0;i<r.length;i++){var n=r[i].indexOf("=");var a;var s;if(n>0){a=r[i].substring(0,n);s=r[i].substring(n+1)}else{a=r[i];s=null}if(!(a in e)){e[a]=[]}if(!(a in Object.prototype)&&s!==null){e[a].push(unescape(s))}}return e};var r;if(typeof t==="undefined"){if(y===null){if(typeof window==="undefined"){y={}}else{y=e(window.location.search.substring(1))}}r=y}else{r=e(t)}return r};e.parseFragment=function(t){var r=t;var i="";var n=t.indexOf("?");if(n>0){r=t.substring(0,n);i=t.substring(n+1)}var a=r.split("/");if(a.length>0&&a[0]===""){a.shift()}var s=i===""?{}:e.getQueryVariables(i);return{pathString:r,queryString:i,path:a,query:s}};e.makeRequest=function(t){var r=e.parseFragment(t);var i={path:r.pathString,query:r.queryString,getPath:function(t){return typeof t==="undefined"?r.path:r.path[t]},getQuery:function(t,e){var i;if(typeof t==="undefined"){i=r.query}else{i=r.query[t];if(i&&typeof e!=="undefined"){i=i[e]}}return i},getQueryLast:function(t,e){var r;var n=i.getQuery(t);if(n){r=n[n.length-1]}else{r=e}return r}};return i};e.makeLink=function(t,e,r){t=jQuery.isArray(t)?t.join("/"):t;var i=jQuery.param(e||{});r=r||"";return t+(i.length>0?"?"+i:"")+(r.length>0?"#"+r:"")};e.setPath=function(t,e,r){if(typeof t==="object"&&t!==null){var i=0;var n=e.length;while(i<n){var a=e[i++];if(i==n){t[a]=r}else{var s=a in t;if(!s||s&&typeof t[a]!=="object"||s&&t[a]===null){t[a]={}}t=t[a]}}}};e.getPath=function(t,e,r){var i=0;var n=e.length;var a=true;while(a&&i<n&&typeof t==="object"&&t!==null){var s=e[i++];a=s in t;if(a){t=t[s]}}return a?t:r};e.deletePath=function(t,e){if(typeof t==="object"&&t!==null){var r=0;var i=e.length;while(r<i){var n=e[r++];if(r==i){delete t[n]}else{if(!(n in t)||typeof t[n]!=="object"||t[n]===null){break}t=t[n]}}}};e.isEmpty=function(t){for(var e in t){if(t.hasOwnProperty(e)){return false}}return true};e.format=function(t){var e=/%./g;var r;var i;var n=0;var a=[];var s=0;while(r=e.exec(t)){i=t.substring(s,e.lastIndex-2);if(i.length>0){a.push(i)}s=e.lastIndex;var o=r[0][1];switch(o){case"s":case"o":if(n<arguments.length){a.push(arguments[n++ +1])}else{a.push("<?>")}break;case"%":a.push("%");break;default:a.push("<%"+o+"?>")}}a.push(t.substring(s));return a.join("")};e.formatNumber=function(t,e,r,i){var n=t,a=isNaN(e=Math.abs(e))?2:e;var s=r===undefined?",":r;var o=i===undefined?".":i,f=n<0?"-":"";var u=parseInt(n=Math.abs(+n||0).toFixed(a),10)+"";var h=u.length>3?u.length%3:0;return f+(h?u.substr(0,h)+o:"")+u.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+o)+(a?s+Math.abs(n-u).toFixed(a).slice(2):"")};e.formatSize=function(t){if(t>=1073741824){t=e.formatNumber(t/1073741824,2,".","")+" GiB"}else if(t>=1048576){t=e.formatNumber(t/1048576,2,".","")+" MiB"}else if(t>=1024){t=e.formatNumber(t/1024,0)+" KiB"}else{t=e.formatNumber(t,0)+" bytes"}return t};e.bytesFromIP=function(t){if(t.indexOf(".")!==-1){return e.bytesFromIPv4(t)}if(t.indexOf(":")!==-1){return e.bytesFromIPv6(t)}return null};e.bytesFromIPv4=function(t){t=t.split(".");if(t.length!==4){return null}var r=e.createBuffer();for(var i=0;i<t.length;++i){var n=parseInt(t[i],10);if(isNaN(n)){return null}r.putByte(n)}return r.getBytes()};e.bytesFromIPv6=function(t){var r=0;t=t.split(":").filter(function(t){if(t.length===0)++r;return true});var i=(8-t.length+r)*2;var n=e.createBuffer();for(var a=0;a<8;++a){if(!t[a]||t[a].length===0){n.fillWithByte(0,i);i=0;continue}var s=e.hexToBytes(t[a]);if(s.length<2){n.putByte(0)}n.putBytes(s)}return n.getBytes()};e.bytesToIP=function(t){if(t.length===4){return e.bytesToIPv4(t)}if(t.length===16){return e.bytesToIPv6(t)}return null};e.bytesToIPv4=function(t){if(t.length!==4){return null}var e=[];for(var r=0;r<t.length;++r){e.push(t.charCodeAt(r))}return e.join(".")};e.bytesToIPv6=function(t){if(t.length!==16){return null}var r=[];var i=[];var n=0;for(var a=0;a<t.length;a+=2){var s=e.bytesToHex(t[a]+t[a+1]);while(s[0]==="0"&&s!=="0"){s=s.substr(1)}if(s==="0"){var o=i[i.length-1];var f=r.length;if(!o||f!==o.end+1){i.push({start:f,end:f})}else{o.end=f;if(o.end-o.start>i[n].end-i[n].start){n=i.length-1}}}r.push(s)}if(i.length>0){var u=i[n];if(u.end-u.start>0){r.splice(u.start,u.end-u.start+1,"");if(u.start===0){r.unshift("")}if(u.end===7){r.push("")}}}return r.join(":")};e.estimateCores=function(t,r){if(typeof t==="function"){r=t;t={}}t=t||{};if("cores"in e&&!t.update){return r(null,e.cores)}if(typeof navigator!=="undefined"&&"hardwareConcurrency"in navigator&&navigator.hardwareConcurrency>0){e.cores=navigator.hardwareConcurrency;return r(null,e.cores)}if(typeof Worker==="undefined"){e.cores=1;return r(null,e.cores)}if(typeof Blob==="undefined"){e.cores=2;return r(null,e.cores)}var i=URL.createObjectURL(new Blob(["(",function(){self.addEventListener("message",function(t){var e=Date.now();var r=e+4;while(Date.now()<r);self.postMessage({st:e,et:r})})}.toString(),")()"],{type:"application/javascript"}));n([],5,16);function n(t,o,f){if(o===0){var u=Math.floor(t.reduce(function(t,e){return t+e},0)/t.length);e.cores=Math.max(1,u);URL.revokeObjectURL(i);return r(null,e.cores)}a(f,function(e,r){t.push(s(f,r));n(t,o-1,f)})}function a(t,e){var r=[];var n=[];for(var a=0;a<t;++a){var s=new Worker(i);s.addEventListener("message",function(i){n.push(i.data);if(n.length===t){for(var a=0;a<t;++a){r[a].terminate()}e(null,n)}});r.push(s)}for(var a=0;a<t;++a){r[a].postMessage(a)}}function s(t,e){var r=[];for(var i=0;i<t;++i){var n=e[i];var a=r[i]=[];for(var s=0;s<t;++s){if(i===s){continue}var o=e[s];if(n.st>o.st&&n.st<o.et||o.st>n.st&&o.st<n.et){a.push(s)}}}return r.reduce(function(t,e){return Math.max(t,e.length)},0)}};e.inArray=function(t,e){if(!e){return-1}if(e.indexOf){return e.indexOf(t)}for(var r=0,i=e.length;r<i;r++){if(e[r]===t){return r}}return-1}}var e="util";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){t.pki=t.pki||{};var e=t.pki.oids=t.oids=t.oids||{};e["1.2.840.113549.1.1.1"]="rsaEncryption";e["rsaEncryption"]="1.2.840.113549.1.1.1";e["1.2.840.113549.1.1.4"]="md5WithRSAEncryption";e["md5WithRSAEncryption"]="1.2.840.113549.1.1.4";e["1.2.840.113549.1.1.5"]="sha1WithRSAEncryption";e["sha1WithRSAEncryption"]="1.2.840.113549.1.1.5";e["1.2.840.113549.1.1.7"]="RSAES-OAEP";e["RSAES-OAEP"]="1.2.840.113549.1.1.7";e["1.2.840.113549.1.1.8"]="mgf1";e["mgf1"]="1.2.840.113549.1.1.8";e["1.2.840.113549.1.1.9"]="pSpecified";e["pSpecified"]="1.2.840.113549.1.1.9";e["1.2.840.113549.1.1.10"]="RSASSA-PSS";e["RSASSA-PSS"]="1.2.840.113549.1.1.10";e["1.2.840.113549.1.1.11"]="sha256WithRSAEncryption";e["sha256WithRSAEncryption"]="1.2.840.113549.1.1.11";e["1.2.840.113549.1.1.12"]="sha384WithRSAEncryption";e["sha384WithRSAEncryption"]="1.2.840.113549.1.1.12";e["1.2.840.113549.1.1.13"]="sha512WithRSAEncryption";e["sha512WithRSAEncryption"]="1.2.840.113549.1.1.13";e["1.3.14.3.2.7"]="desCBC";e["desCBC"]="1.3.14.3.2.7";e["1.3.14.3.2.26"]="sha1";e["sha1"]="1.3.14.3.2.26";e["2.16.840.1.101.3.4.2.1"]="sha256";e["sha256"]="2.16.840.1.101.3.4.2.1";e["2.16.840.1.101.3.4.2.2"]="sha384";e["sha384"]="2.16.840.1.101.3.4.2.2";e["2.16.840.1.101.3.4.2.3"]="sha512";e["sha512"]="2.16.840.1.101.3.4.2.3";e["1.2.840.113549.2.5"]="md5";e["md5"]="1.2.840.113549.2.5";e["1.2.840.113549.1.7.1"]="data";e["data"]="1.2.840.113549.1.7.1";e["1.2.840.113549.1.7.2"]="signedData";e["signedData"]="1.2.840.113549.1.7.2";e["1.2.840.113549.1.7.3"]="envelopedData";e["envelopedData"]="1.2.840.113549.1.7.3";e["1.2.840.113549.1.7.4"]="signedAndEnvelopedData";e["signedAndEnvelopedData"]="1.2.840.113549.1.7.4";e["1.2.840.113549.1.7.5"]="digestedData";e["digestedData"]="1.2.840.113549.1.7.5";e["1.2.840.113549.1.7.6"]="encryptedData";e["encryptedData"]="1.2.840.113549.1.7.6";e["1.2.840.113549.1.9.1"]="emailAddress";e["emailAddress"]="1.2.840.113549.1.9.1";e["1.2.840.113549.1.9.2"]="unstructuredName";e["unstructuredName"]="1.2.840.113549.1.9.2";e["1.2.840.113549.1.9.3"]="contentType";e["contentType"]="1.2.840.113549.1.9.3";e["1.2.840.113549.1.9.4"]="messageDigest";e["messageDigest"]="1.2.840.113549.1.9.4";e["1.2.840.113549.1.9.5"]="signingTime";e["signingTime"]="1.2.840.113549.1.9.5";e["1.2.840.113549.1.9.6"]="counterSignature";e["counterSignature"]="1.2.840.113549.1.9.6";e["1.2.840.113549.1.9.7"]="challengePassword";e["challengePassword"]="1.2.840.113549.1.9.7";e["1.2.840.113549.1.9.8"]="unstructuredAddress";e["unstructuredAddress"]="1.2.840.113549.1.9.8";e["1.2.840.113549.1.9.14"]="extensionRequest";e["extensionRequest"]="1.2.840.113549.1.9.14";e["1.2.840.113549.1.9.20"]="friendlyName";e["friendlyName"]="1.2.840.113549.1.9.20";e["1.2.840.113549.1.9.21"]="localKeyId";e["localKeyId"]="1.2.840.113549.1.9.21";e["1.2.840.113549.1.9.22.1"]="x509Certificate";e["x509Certificate"]="1.2.840.113549.1.9.22.1";e["1.2.840.113549.1.12.10.1.1"]="keyBag";e["keyBag"]="1.2.840.113549.1.12.10.1.1";e["1.2.840.113549.1.12.10.1.2"]="pkcs8ShroudedKeyBag";e["pkcs8ShroudedKeyBag"]="1.2.840.113549.1.12.10.1.2";e["1.2.840.113549.1.12.10.1.3"]="certBag";e["certBag"]="1.2.840.113549.1.12.10.1.3";e["1.2.840.113549.1.12.10.1.4"]="crlBag";e["crlBag"]="1.2.840.113549.1.12.10.1.4";e["1.2.840.113549.1.12.10.1.5"]="secretBag";e["secretBag"]="1.2.840.113549.1.12.10.1.5";e["1.2.840.113549.1.12.10.1.6"]="safeContentsBag";e["safeContentsBag"]="1.2.840.113549.1.12.10.1.6";e["1.2.840.113549.1.5.13"]="pkcs5PBES2";e["pkcs5PBES2"]="1.2.840.113549.1.5.13";e["1.2.840.113549.1.5.12"]="pkcs5PBKDF2";e["pkcs5PBKDF2"]="1.2.840.113549.1.5.12";e["1.2.840.113549.1.12.1.1"]="pbeWithSHAAnd128BitRC4";e["pbeWithSHAAnd128BitRC4"]="1.2.840.113549.1.12.1.1";e["1.2.840.113549.1.12.1.2"]="pbeWithSHAAnd40BitRC4";e["pbeWithSHAAnd40BitRC4"]="1.2.840.113549.1.12.1.2";e["1.2.840.113549.1.12.1.3"]="pbeWithSHAAnd3-KeyTripleDES-CBC";e["pbeWithSHAAnd3-KeyTripleDES-CBC"]="1.2.840.113549.1.12.1.3";e["1.2.840.113549.1.12.1.4"]="pbeWithSHAAnd2-KeyTripleDES-CBC";e["pbeWithSHAAnd2-KeyTripleDES-CBC"]="1.2.840.113549.1.12.1.4";e["1.2.840.113549.1.12.1.5"]="pbeWithSHAAnd128BitRC2-CBC";e["pbeWithSHAAnd128BitRC2-CBC"]="1.2.840.113549.1.12.1.5";e["1.2.840.113549.1.12.1.6"]="pbewithSHAAnd40BitRC2-CBC";e["pbewithSHAAnd40BitRC2-CBC"]="1.2.840.113549.1.12.1.6";e["1.2.840.113549.3.7"]="des-EDE3-CBC";e["des-EDE3-CBC"]="1.2.840.113549.3.7";e["2.16.840.1.101.3.4.1.2"]="aes128-CBC";e["aes128-CBC"]="2.16.840.1.101.3.4.1.2";e["2.16.840.1.101.3.4.1.22"]="aes192-CBC";e["aes192-CBC"]="2.16.840.1.101.3.4.1.22";e["2.16.840.1.101.3.4.1.42"]="aes256-CBC";e["aes256-CBC"]="2.16.840.1.101.3.4.1.42";e["2.5.4.3"]="commonName";e["commonName"]="2.5.4.3";e["2.5.4.5"]="serialName";e["serialName"]="2.5.4.5";e["2.5.4.6"]="countryName";e["countryName"]="2.5.4.6";e["2.5.4.7"]="localityName";e["localityName"]="2.5.4.7";e["2.5.4.8"]="stateOrProvinceName";e["stateOrProvinceName"]="2.5.4.8";e["2.5.4.10"]="organizationName";e["organizationName"]="2.5.4.10";e["2.5.4.11"]="organizationalUnitName";e["organizationalUnitName"]="2.5.4.11";e["2.16.840.1.113730.1.1"]="nsCertType";e["nsCertType"]="2.16.840.1.113730.1.1";e["2.5.29.1"]="authorityKeyIdentifier";e["2.5.29.2"]="keyAttributes";e["2.5.29.3"]="certificatePolicies";e["2.5.29.4"]="keyUsageRestriction";e["2.5.29.5"]="policyMapping";e["2.5.29.6"]="subtreesConstraint";e["2.5.29.7"]="subjectAltName";e["2.5.29.8"]="issuerAltName";e["2.5.29.9"]="subjectDirectoryAttributes";e["2.5.29.10"]="basicConstraints";
e["2.5.29.11"]="nameConstraints";e["2.5.29.12"]="policyConstraints";e["2.5.29.13"]="basicConstraints";e["2.5.29.14"]="subjectKeyIdentifier";e["subjectKeyIdentifier"]="2.5.29.14";e["2.5.29.15"]="keyUsage";e["keyUsage"]="2.5.29.15";e["2.5.29.16"]="privateKeyUsagePeriod";e["2.5.29.17"]="subjectAltName";e["subjectAltName"]="2.5.29.17";e["2.5.29.18"]="issuerAltName";e["issuerAltName"]="2.5.29.18";e["2.5.29.19"]="basicConstraints";e["basicConstraints"]="2.5.29.19";e["2.5.29.20"]="cRLNumber";e["2.5.29.21"]="cRLReason";e["2.5.29.22"]="expirationDate";e["2.5.29.23"]="instructionCode";e["2.5.29.24"]="invalidityDate";e["2.5.29.25"]="cRLDistributionPoints";e["2.5.29.26"]="issuingDistributionPoint";e["2.5.29.27"]="deltaCRLIndicator";e["2.5.29.28"]="issuingDistributionPoint";e["2.5.29.29"]="certificateIssuer";e["2.5.29.30"]="nameConstraints";e["2.5.29.31"]="cRLDistributionPoints";e["2.5.29.32"]="certificatePolicies";e["2.5.29.33"]="policyMappings";e["2.5.29.34"]="policyConstraints";e["2.5.29.35"]="authorityKeyIdentifier";e["2.5.29.36"]="policyConstraints";e["2.5.29.37"]="extKeyUsage";e["extKeyUsage"]="2.5.29.37";e["2.5.29.46"]="freshestCRL";e["2.5.29.54"]="inhibitAnyPolicy";e["1.3.6.1.5.5.7.3.1"]="serverAuth";e["serverAuth"]="1.3.6.1.5.5.7.3.1";e["1.3.6.1.5.5.7.3.2"]="clientAuth";e["clientAuth"]="1.3.6.1.5.5.7.3.2";e["1.3.6.1.5.5.7.3.3"]="codeSigning";e["codeSigning"]="1.3.6.1.5.5.7.3.3";e["1.3.6.1.5.5.7.3.4"]="emailProtection";e["emailProtection"]="1.3.6.1.5.5.7.3.4";e["1.3.6.1.5.5.7.3.8"]="timeStamping";e["timeStamping"]="1.3.6.1.5.5.7.3.8"}var e="oids";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.asn1=t.asn1||{};e.Class={UNIVERSAL:0,APPLICATION:64,CONTEXT_SPECIFIC:128,PRIVATE:192};e.Type={NONE:0,BOOLEAN:1,INTEGER:2,BITSTRING:3,OCTETSTRING:4,NULL:5,OID:6,ODESC:7,EXTERNAL:8,REAL:9,ENUMERATED:10,EMBEDDED:11,UTF8:12,ROID:13,SEQUENCE:16,SET:17,PRINTABLESTRING:19,IA5STRING:22,UTCTIME:23,GENERALIZEDTIME:24,BMPSTRING:30};e.create=function(e,r,i,n){if(t.util.isArray(n)){var a=[];for(var s=0;s<n.length;++s){if(n[s]!==undefined){a.push(n[s])}}n=a}return{tagClass:e,type:r,constructed:i,composed:i||t.util.isArray(n),value:n}};var r=function(t){var e=t.getByte();if(e===128){return undefined}var r;var i=e&128;if(!i){r=e}else{r=t.getInt((e&127)<<3)}return r};e.fromDer=function(i,n){if(n===undefined){n=true}if(typeof i==="string"){i=t.util.createBuffer(i)}if(i.length()<2){var a=new Error("Too few bytes to parse DER.");a.bytes=i.length();throw a}var s=i.getByte();var o=s&192;var f=s&31;var u=r(i);if(i.length()<u){if(n){var a=new Error("Too few bytes to read ASN.1 value.");a.detail=i.length()+" < "+u;throw a}u=i.length()}var h;var c=(s&32)===32;var l=c;if(!l&&o===e.Class.UNIVERSAL&&f===e.Type.BITSTRING&&u>1){}if(l){h=[];if(u===undefined){for(;;){if(i.bytes(2)===String.fromCharCode(0,0)){i.getBytes(2);break}h.push(e.fromDer(i,n))}}else{var p=i.length();while(u>0){h.push(e.fromDer(i,n));u-=p-i.length();p=i.length()}}}else{if(u===undefined){if(n){throw new Error("Non-constructed ASN.1 object of indefinite length.")}u=i.length()}if(f===e.Type.BMPSTRING){h="";for(var d=0;d<u;d+=2){h+=String.fromCharCode(i.getInt16())}}else{h=i.getBytes(u)}}return e.create(o,f,c,h)};e.toDer=function(r){var i=t.util.createBuffer();var n=r.tagClass|r.type;var a=t.util.createBuffer();if(r.composed){if(r.constructed){n|=32}else{a.putByte(0)}for(var s=0;s<r.value.length;++s){if(r.value[s]!==undefined){a.putBuffer(e.toDer(r.value[s]))}}}else{if(r.type===e.Type.BMPSTRING){for(var s=0;s<r.value.length;++s){a.putInt16(r.value.charCodeAt(s))}}else{a.putBytes(r.value)}}i.putByte(n);if(a.length()<=127){i.putByte(a.length()&127)}else{var o=a.length();var f="";do{f+=String.fromCharCode(o&255);o=o>>>8}while(o>0);i.putByte(f.length|128);for(var s=f.length-1;s>=0;--s){i.putByte(f.charCodeAt(s))}}i.putBuffer(a);return i};e.oidToDer=function(e){var r=e.split(".");var i=t.util.createBuffer();i.putByte(40*parseInt(r[0],10)+parseInt(r[1],10));var n,a,s,o;for(var f=2;f<r.length;++f){n=true;a=[];s=parseInt(r[f],10);do{o=s&127;s=s>>>7;if(!n){o|=128}a.push(o);n=false}while(s>0);for(var u=a.length-1;u>=0;--u){i.putByte(a[u])}}return i};e.derToOid=function(e){var r;if(typeof e==="string"){e=t.util.createBuffer(e)}var i=e.getByte();r=Math.floor(i/40)+"."+i%40;var n=0;while(e.length()>0){i=e.getByte();n=n<<7;if(i&128){n+=i&127}else{r+="."+(n+i);n=0}}return r};e.utcTimeToDate=function(t){var e=new Date;var r=parseInt(t.substr(0,2),10);r=r>=50?1900+r:2e3+r;var i=parseInt(t.substr(2,2),10)-1;var n=parseInt(t.substr(4,2),10);var a=parseInt(t.substr(6,2),10);var s=parseInt(t.substr(8,2),10);var o=0;if(t.length>11){var f=t.charAt(10);var u=10;if(f!=="+"&&f!=="-"){o=parseInt(t.substr(10,2),10);u+=2}}e.setUTCFullYear(r,i,n);e.setUTCHours(a,s,o,0);if(u){f=t.charAt(u);if(f==="+"||f==="-"){var h=parseInt(t.substr(u+1,2),10);var c=parseInt(t.substr(u+4,2),10);var l=h*60+c;l*=6e4;if(f==="+"){e.setTime(+e-l)}else{e.setTime(+e+l)}}}return e};e.generalizedTimeToDate=function(t){var e=new Date;var r=parseInt(t.substr(0,4),10);var i=parseInt(t.substr(4,2),10)-1;var n=parseInt(t.substr(6,2),10);var a=parseInt(t.substr(8,2),10);var s=parseInt(t.substr(10,2),10);var o=parseInt(t.substr(12,2),10);var f=0;var u=0;var h=false;if(t.charAt(t.length-1)==="Z"){h=true}var c=t.length-5,l=t.charAt(c);if(l==="+"||l==="-"){var p=parseInt(t.substr(c+1,2),10);var d=parseInt(t.substr(c+4,2),10);u=p*60+d;u*=6e4;if(l==="+"){u*=-1}h=true}if(t.charAt(14)==="."){f=parseFloat(t.substr(14),10)*1e3}if(h){e.setUTCFullYear(r,i,n);e.setUTCHours(a,s,o,f);e.setTime(+e+u)}else{e.setFullYear(r,i,n);e.setHours(a,s,o,f)}return e};e.dateToUtcTime=function(t){var e="";var r=[];r.push((""+t.getUTCFullYear()).substr(2));r.push(""+(t.getUTCMonth()+1));r.push(""+t.getUTCDate());r.push(""+t.getUTCHours());r.push(""+t.getUTCMinutes());r.push(""+t.getUTCSeconds());for(var i=0;i<r.length;++i){if(r[i].length<2){e+="0"}e+=r[i]}e+="Z";return e};e.integerToDer=function(e){var r=t.util.createBuffer();if(e>=-128&&e<128){return r.putSignedInt(e,8)}if(e>=-32768&&e<32768){return r.putSignedInt(e,16)}if(e>=-8388608&&e<8388608){return r.putSignedInt(e,24)}if(e>=-2147483648&&e<2147483648){return r.putSignedInt(e,32)}var i=new Error("Integer too large; max is 32-bits.");i.integer=e;throw i};e.derToInteger=function(e){if(typeof e==="string"){e=t.util.createBuffer(e)}var r=e.length()*8;if(r>32){throw new Error("Integer too large; max is 32-bits.")}return e.getSignedInt(r)};e.validate=function(r,i,n,a){var s=false;if((r.tagClass===i.tagClass||typeof i.tagClass==="undefined")&&(r.type===i.type||typeof i.type==="undefined")){if(r.constructed===i.constructed||typeof i.constructed==="undefined"){s=true;if(i.value&&t.util.isArray(i.value)){var o=0;for(var f=0;s&&f<i.value.length;++f){s=i.value[f].optional||false;if(r.value[o]){s=e.validate(r.value[o],i.value[f],n,a);if(s){++o}else if(i.value[f].optional){s=true}}if(!s&&a){a.push("["+i.name+"] "+'Tag class "'+i.tagClass+'", type "'+i.type+'" expected value length "'+i.value.length+'", got "'+r.value.length+'"')}}}if(s&&n){if(i.capture){n[i.capture]=r.value}if(i.captureAsn1){n[i.captureAsn1]=r}}}else if(a){a.push("["+i.name+"] "+'Expected constructed "'+i.constructed+'", got "'+r.constructed+'"')}}else if(a){if(r.tagClass!==i.tagClass){a.push("["+i.name+"] "+'Expected tag class "'+i.tagClass+'", got "'+r.tagClass+'"')}if(r.type!==i.type){a.push("["+i.name+"] "+'Expected type "'+i.type+'", got "'+r.type+'"')}}return s};var i=/[^\\u0000-\\u00ff]/;e.prettyPrint=function(r,n,a){var s="";n=n||0;a=a||2;if(n>0){s+="\n"}var o="";for(var f=0;f<n*a;++f){o+=" "}s+=o+"Tag: ";switch(r.tagClass){case e.Class.UNIVERSAL:s+="Universal:";break;case e.Class.APPLICATION:s+="Application:";break;case e.Class.CONTEXT_SPECIFIC:s+="Context-Specific:";break;case e.Class.PRIVATE:s+="Private:";break}if(r.tagClass===e.Class.UNIVERSAL){s+=r.type;switch(r.type){case e.Type.NONE:s+=" (None)";break;case e.Type.BOOLEAN:s+=" (Boolean)";break;case e.Type.BITSTRING:s+=" (Bit string)";break;case e.Type.INTEGER:s+=" (Integer)";break;case e.Type.OCTETSTRING:s+=" (Octet string)";break;case e.Type.NULL:s+=" (Null)";break;case e.Type.OID:s+=" (Object Identifier)";break;case e.Type.ODESC:s+=" (Object Descriptor)";break;case e.Type.EXTERNAL:s+=" (External or Instance of)";break;case e.Type.REAL:s+=" (Real)";break;case e.Type.ENUMERATED:s+=" (Enumerated)";break;case e.Type.EMBEDDED:s+=" (Embedded PDV)";break;case e.Type.UTF8:s+=" (UTF8)";break;case e.Type.ROID:s+=" (Relative Object Identifier)";break;case e.Type.SEQUENCE:s+=" (Sequence)";break;case e.Type.SET:s+=" (Set)";break;case e.Type.PRINTABLESTRING:s+=" (Printable String)";break;case e.Type.IA5String:s+=" (IA5String (ASCII))";break;case e.Type.UTCTIME:s+=" (UTC time)";break;case e.Type.GENERALIZEDTIME:s+=" (Generalized time)";break;case e.Type.BMPSTRING:s+=" (BMP String)";break}}else{s+=r.type}s+="\n";s+=o+"Constructed: "+r.constructed+"\n";if(r.composed){var u=0;var h="";for(var f=0;f<r.value.length;++f){if(r.value[f]!==undefined){u+=1;h+=e.prettyPrint(r.value[f],n+1,a);if(f+1<r.value.length){h+=","}}}s+=o+"Sub values: "+u+h}else{s+=o+"Value: ";if(r.type===e.Type.OID){var c=e.derToOid(r.value);s+=c;if(t.pki&&t.pki.oids){if(c in t.pki.oids){s+=" ("+t.pki.oids[c]+") "}}}if(r.type===e.Type.INTEGER){try{s+=e.derToInteger(r.value)}catch(l){s+="0x"+t.util.bytesToHex(r.value)}}else if(r.type===e.Type.OCTETSTRING){if(!i.test(r.value)){s+="("+r.value+") "}s+="0x"+t.util.bytesToHex(r.value)}else if(r.type===e.Type.UTF8){s+=t.util.decodeUtf8(r.value)}else if(r.type===e.Type.PRINTABLESTRING||r.type===e.Type.IA5String){s+=r.value}else if(i.test(r.value)){s+="0x"+t.util.bytesToHex(r.value)}else if(r.value.length===0){s+="[null]"}else{s+=r.value}}return s}}var e="asn1";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e;var r=0xdeadbeefcafe;var i=(r&16777215)==15715070;function n(t,e,r){this.data=[];if(t!=null)if("number"==typeof t)this.fromNumber(t,e,r);else if(e==null&&"string"!=typeof t)this.fromString(t,256);else this.fromString(t,e)}function a(){return new n(null)}function s(t,e,r,i,n,a){while(--a>=0){var s=e*this.data[t++]+r.data[i]+n;n=Math.floor(s/67108864);r.data[i++]=s&67108863}return n}function o(t,e,r,i,n,a){var s=e&32767,o=e>>15;while(--a>=0){var f=this.data[t]&32767;var u=this.data[t++]>>15;var h=o*f+u*s;f=s*f+((h&32767)<<15)+r.data[i]+(n&1073741823);n=(f>>>30)+(h>>>15)+o*u+(n>>>30);r.data[i++]=f&1073741823}return n}function f(t,e,r,i,n,a){var s=e&16383,o=e>>14;while(--a>=0){var f=this.data[t]&16383;var u=this.data[t++]>>14;var h=o*f+u*s;f=s*f+((h&16383)<<14)+r.data[i]+n;n=(f>>28)+(h>>14)+o*u;r.data[i++]=f&268435455}return n}if(typeof navigator==="undefined"){n.prototype.am=f;e=28}else if(i&&navigator.appName=="Microsoft Internet Explorer"){n.prototype.am=o;e=30}else if(i&&navigator.appName!="Netscape"){n.prototype.am=s;e=26}else{n.prototype.am=f;e=28}n.prototype.DB=e;n.prototype.DM=(1<<e)-1;n.prototype.DV=1<<e;var u=52;n.prototype.FV=Math.pow(2,u);n.prototype.F1=u-e;n.prototype.F2=2*e-u;var h="0123456789abcdefghijklmnopqrstuvwxyz";var c=new Array;var l,p;l="0".charCodeAt(0);for(p=0;p<=9;++p)c[l++]=p;l="a".charCodeAt(0);for(p=10;p<36;++p)c[l++]=p;l="A".charCodeAt(0);for(p=10;p<36;++p)c[l++]=p;function d(t){return h.charAt(t)}function y(t,e){var r=c[t.charCodeAt(e)];return r==null?-1:r}function v(t){for(var e=this.t-1;e>=0;--e)t.data[e]=this.data[e];t.t=this.t;t.s=this.s}function g(t){this.t=1;this.s=t<0?-1:0;if(t>0)this.data[0]=t;else if(t<-1)this.data[0]=t+this.DV;else this.t=0}function m(t){var e=a();e.fromInt(t);return e}function w(t,e){var r;if(e==16)r=4;else if(e==8)r=3;else if(e==256)r=8;else if(e==2)r=1;else if(e==32)r=5;else if(e==4)r=2;else{this.fromRadix(t,e);return}this.t=0;this.s=0;var i=t.length,a=false,s=0;while(--i>=0){var o=r==8?t[i]&255:y(t,i);if(o<0){if(t.charAt(i)=="-")a=true;continue}a=false;if(s==0)this.data[this.t++]=o;else if(s+r>this.DB){this.data[this.t-1]|=(o&(1<<this.DB-s)-1)<<s;this.data[this.t++]=o>>this.DB-s}else this.data[this.t-1]|=o<<s;s+=r;if(s>=this.DB)s-=this.DB}if(r==8&&(t[0]&128)!=0){this.s=-1;if(s>0)this.data[this.t-1]|=(1<<this.DB-s)-1<<s}this.clamp();if(a)n.ZERO.subTo(this,this)}function B(){var t=this.s&this.DM;while(this.t>0&&this.data[this.t-1]==t)--this.t}function b(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(t==16)e=4;else if(t==8)e=3;else if(t==2)e=1;else if(t==32)e=5;else if(t==4)e=2;else return this.toRadix(t);var r=(1<<e)-1,i,n=false,a="",s=this.t;var o=this.DB-s*this.DB%e;if(s-->0){if(o<this.DB&&(i=this.data[s]>>o)>0){n=true;a=d(i)}while(s>=0){if(o<e){i=(this.data[s]&(1<<o)-1)<<e-o;i|=this.data[--s]>>(o+=this.DB-e)}else{i=this.data[s]>>(o-=e)&r;if(o<=0){o+=this.DB;--s}}if(i>0)n=true;if(n)a+=d(i)}}return n?a:"0"}function S(){var t=a();n.ZERO.subTo(this,t);return t}function I(){return this.s<0?this.negate():this}function A(t){var e=this.s-t.s;if(e!=0)return e;var r=this.t;e=r-t.t;if(e!=0)return this.s<0?-e:e;while(--r>=0)if((e=this.data[r]-t.data[r])!=0)return e;return 0}function k(t){var e=1,r;if((r=t>>>16)!=0){t=r;e+=16}if((r=t>>8)!=0){t=r;e+=8}if((r=t>>4)!=0){t=r;e+=4}if((r=t>>2)!=0){t=r;e+=2}if((r=t>>1)!=0){t=r;e+=1}return e}function C(){if(this.t<=0)return 0;return this.DB*(this.t-1)+k(this.data[this.t-1]^this.s&this.DM)}function E(t,e){var r;for(r=this.t-1;r>=0;--r)e.data[r+t]=this.data[r];for(r=t-1;r>=0;--r)e.data[r]=0;e.t=this.t+t;e.s=this.s}function T(t,e){for(var r=t;r<this.t;++r)e.data[r-t]=this.data[r];e.t=Math.max(this.t-t,0);e.s=this.s}function L(t,e){var r=t%this.DB;var i=this.DB-r;var n=(1<<i)-1;var a=Math.floor(t/this.DB),s=this.s<<r&this.DM,o;for(o=this.t-1;o>=0;--o){e.data[o+a+1]=this.data[o]>>i|s;s=(this.data[o]&n)<<r}for(o=a-1;o>=0;--o)e.data[o]=0;e.data[a]=s;e.t=this.t+a+1;e.s=this.s;e.clamp()}function N(t,e){e.s=this.s;var r=Math.floor(t/this.DB);if(r>=this.t){e.t=0;return}var i=t%this.DB;var n=this.DB-i;var a=(1<<i)-1;e.data[0]=this.data[r]>>i;for(var s=r+1;s<this.t;++s){e.data[s-r-1]|=(this.data[s]&a)<<n;e.data[s-r]=this.data[s]>>i}if(i>0)e.data[this.t-r-1]|=(this.s&a)<<n;e.t=this.t-r;e.clamp()}function R(t,e){var r=0,i=0,n=Math.min(t.t,this.t);while(r<n){i+=this.data[r]-t.data[r];e.data[r++]=i&this.DM;i>>=this.DB}if(t.t<this.t){i-=t.s;while(r<this.t){i+=this.data[r];e.data[r++]=i&this.DM;i>>=this.DB}i+=this.s}else{i+=this.s;while(r<t.t){i-=t.data[r];e.data[r++]=i&this.DM;i>>=this.DB}i-=t.s}e.s=i<0?-1:0;if(i<-1)e.data[r++]=this.DV+i;else if(i>0)e.data[r++]=i;e.t=r;e.clamp()}function _(t,e){var r=this.abs(),i=t.abs();var a=r.t;e.t=a+i.t;while(--a>=0)e.data[a]=0;for(a=0;a<i.t;++a)e.data[a+r.t]=r.am(0,i.data[a],e,a,0,r.t);e.s=0;e.clamp();if(this.s!=t.s)n.ZERO.subTo(e,e)}function D(t){var e=this.abs();var r=t.t=2*e.t;while(--r>=0)t.data[r]=0;for(r=0;r<e.t-1;++r){var i=e.am(r,e.data[r],t,2*r,0,1);if((t.data[r+e.t]+=e.am(r+1,2*e.data[r],t,2*r+1,i,e.t-r-1))>=e.DV){t.data[r+e.t]-=e.DV;t.data[r+e.t+1]=1}}if(t.t>0)t.data[t.t-1]+=e.am(r,e.data[r],t,2*r,0,1);t.s=0;t.clamp()}function U(t,e,r){var i=t.abs();if(i.t<=0)return;var s=this.abs();if(s.t<i.t){if(e!=null)e.fromInt(0);if(r!=null)this.copyTo(r);return}if(r==null)r=a();var o=a(),f=this.s,u=t.s;var h=this.DB-k(i.data[i.t-1]);if(h>0){i.lShiftTo(h,o);s.lShiftTo(h,r)}else{i.copyTo(o);s.copyTo(r)}var c=o.t;var l=o.data[c-1];if(l==0)return;var p=l*(1<<this.F1)+(c>1?o.data[c-2]>>this.F2:0);var d=this.FV/p,y=(1<<this.F1)/p,v=1<<this.F2;var g=r.t,m=g-c,w=e==null?a():e;o.dlShiftTo(m,w);if(r.compareTo(w)>=0){r.data[r.t++]=1;r.subTo(w,r)}n.ONE.dlShiftTo(c,w);w.subTo(o,o);while(o.t<c)o.data[o.t++]=0;while(--m>=0){var B=r.data[--g]==l?this.DM:Math.floor(r.data[g]*d+(r.data[g-1]+v)*y);if((r.data[g]+=o.am(0,B,r,m,0,c))<B){o.dlShiftTo(m,w);r.subTo(w,r);while(r.data[g]<--B)r.subTo(w,r)}}if(e!=null){r.drShiftTo(c,e);if(f!=u)n.ZERO.subTo(e,e)}r.t=c;r.clamp();if(h>0)r.rShiftTo(h,r);if(f<0)n.ZERO.subTo(r,r)}function P(t){var e=a();this.abs().divRemTo(t,null,e);if(this.s<0&&e.compareTo(n.ZERO)>0)t.subTo(e,e);return e}function x(t){this.m=t}function O(t){if(t.s<0||t.compareTo(this.m)>=0)return t.mod(this.m);else return t}function z(t){return t}function M(t){t.divRemTo(this.m,null,t)}function K(t,e,r){t.multiplyTo(e,r);this.reduce(r)}function V(t,e){t.squareTo(e);this.reduce(e)}x.prototype.convert=O;x.prototype.revert=z;x.prototype.reduce=M;x.prototype.mulTo=K;x.prototype.sqrTo=V;function j(){if(this.t<1)return 0;var t=this.data[0];if((t&1)==0)return 0;var e=t&3;e=e*(2-(t&15)*e)&15;e=e*(2-(t&255)*e)&255;e=e*(2-((t&65535)*e&65535))&65535;e=e*(2-t*e%this.DV)%this.DV;return e>0?this.DV-e:-e}function q(t){this.m=t;this.mp=t.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<t.DB-15)-1;this.mt2=2*t.t}function G(t){var e=a();t.abs().dlShiftTo(this.m.t,e);e.divRemTo(this.m,null,e);if(t.s<0&&e.compareTo(n.ZERO)>0)this.m.subTo(e,e);return e}function F(t){var e=a();t.copyTo(e);this.reduce(e);return e}function H(t){while(t.t<=this.mt2)t.data[t.t++]=0;for(var e=0;e<this.m.t;++e){var r=t.data[e]&32767;var i=r*this.mpl+((r*this.mph+(t.data[e]>>15)*this.mpl&this.um)<<15)&t.DM;r=e+this.m.t;t.data[r]+=this.m.am(0,i,t,e,0,this.m.t);while(t.data[r]>=t.DV){t.data[r]-=t.DV;t.data[++r]++}}t.clamp();t.drShiftTo(this.m.t,t);if(t.compareTo(this.m)>=0)t.subTo(this.m,t)}function Q(t,e){t.squareTo(e);this.reduce(e)}function W(t,e,r){t.multiplyTo(e,r);this.reduce(r)}q.prototype.convert=G;q.prototype.revert=F;q.prototype.reduce=H;q.prototype.mulTo=W;q.prototype.sqrTo=Q;function Z(){return(this.t>0?this.data[0]&1:this.s)==0}function Y(t,e){if(t>4294967295||t<1)return n.ONE;var r=a(),i=a(),s=e.convert(this),o=k(t)-1;s.copyTo(r);while(--o>=0){e.sqrTo(r,i);if((t&1<<o)>0)e.mulTo(i,s,r);else{var f=r;r=i;i=f}}return e.revert(r)}function J(t,e){var r;if(t<256||e.isEven())r=new x(e);else r=new q(e);return this.exp(t,r)}n.prototype.copyTo=v;n.prototype.fromInt=g;n.prototype.fromString=w;n.prototype.clamp=B;n.prototype.dlShiftTo=E;n.prototype.drShiftTo=T;n.prototype.lShiftTo=L;n.prototype.rShiftTo=N;n.prototype.subTo=R;n.prototype.multiplyTo=_;n.prototype.squareTo=D;n.prototype.divRemTo=U;n.prototype.invDigit=j;n.prototype.isEven=Z;n.prototype.exp=Y;n.prototype.toString=b;n.prototype.negate=S;n.prototype.abs=I;n.prototype.compareTo=A;n.prototype.bitLength=C;n.prototype.mod=P;n.prototype.modPowInt=J;n.ZERO=m(0);n.ONE=m(1);function X(){var t=a();this.copyTo(t);return t}function $(){if(this.s<0){if(this.t==1)return this.data[0]-this.DV;else if(this.t==0)return-1}else if(this.t==1)return this.data[0];else if(this.t==0)return 0;return(this.data[1]&(1<<32-this.DB)-1)<<this.DB|this.data[0]}function tt(){return this.t==0?this.s:this.data[0]<<24>>24}function et(){return this.t==0?this.s:this.data[0]<<16>>16}function rt(t){return Math.floor(Math.LN2*this.DB/Math.log(t))}function it(){if(this.s<0)return-1;else if(this.t<=0||this.t==1&&this.data[0]<=0)return 0;else return 1}function nt(t){if(t==null)t=10;if(this.signum()==0||t<2||t>36)return"0";var e=this.chunkSize(t);var r=Math.pow(t,e);var i=m(r),n=a(),s=a(),o="";this.divRemTo(i,n,s);while(n.signum()>0){o=(r+s.intValue()).toString(t).substr(1)+o;n.divRemTo(i,n,s)}return s.intValue().toString(t)+o}function at(t,e){this.fromInt(0);if(e==null)e=10;var r=this.chunkSize(e);var i=Math.pow(e,r),a=false,s=0,o=0;for(var f=0;f<t.length;++f){var u=y(t,f);if(u<0){if(t.charAt(f)=="-"&&this.signum()==0)a=true;continue}o=e*o+u;if(++s>=r){this.dMultiply(i);this.dAddOffset(o,0);s=0;o=0}}if(s>0){this.dMultiply(Math.pow(e,s));this.dAddOffset(o,0)}if(a)n.ZERO.subTo(this,this)}function st(t,e,r){if("number"==typeof e){if(t<2)this.fromInt(1);else{this.fromNumber(t,r);if(!this.testBit(t-1))this.bitwiseTo(n.ONE.shiftLeft(t-1),dt,this);if(this.isEven())this.dAddOffset(1,0);while(!this.isProbablePrime(e)){this.dAddOffset(2,0);if(this.bitLength()>t)this.subTo(n.ONE.shiftLeft(t-1),this)}}}else{var i=new Array,a=t&7;i.length=(t>>3)+1;e.nextBytes(i);if(a>0)i[0]&=(1<<a)-1;else i[0]=0;this.fromString(i,256)}}function ot(){var t=this.t,e=new Array;e[0]=this.s;var r=this.DB-t*this.DB%8,i,n=0;if(t-->0){if(r<this.DB&&(i=this.data[t]>>r)!=(this.s&this.DM)>>r)e[n++]=i|this.s<<this.DB-r;while(t>=0){if(r<8){i=(this.data[t]&(1<<r)-1)<<8-r;i|=this.data[--t]>>(r+=this.DB-8)}else{i=this.data[t]>>(r-=8)&255;if(r<=0){r+=this.DB;--t}}if((i&128)!=0)i|=-256;if(n==0&&(this.s&128)!=(i&128))++n;if(n>0||i!=this.s)e[n++]=i}}return e}function ft(t){return this.compareTo(t)==0}function ut(t){return this.compareTo(t)<0?this:t}function ht(t){return this.compareTo(t)>0?this:t}function ct(t,e,r){var i,n,a=Math.min(t.t,this.t);for(i=0;i<a;++i)r.data[i]=e(this.data[i],t.data[i]);if(t.t<this.t){n=t.s&this.DM;for(i=a;i<this.t;++i)r.data[i]=e(this.data[i],n);r.t=this.t}else{n=this.s&this.DM;for(i=a;i<t.t;++i)r.data[i]=e(n,t.data[i]);r.t=t.t}r.s=e(this.s,t.s);r.clamp()}function lt(t,e){return t&e}function pt(t){var e=a();this.bitwiseTo(t,lt,e);return e}function dt(t,e){return t|e}function yt(t){var e=a();this.bitwiseTo(t,dt,e);return e}function vt(t,e){return t^e}function gt(t){var e=a();this.bitwiseTo(t,vt,e);return e}function mt(t,e){return t&~e}function wt(t){var e=a();this.bitwiseTo(t,mt,e);return e}function Bt(){var t=a();for(var e=0;e<this.t;++e)t.data[e]=this.DM&~this.data[e];t.t=this.t;t.s=~this.s;return t}function bt(t){var e=a();if(t<0)this.rShiftTo(-t,e);else this.lShiftTo(t,e);return e}function St(t){var e=a();if(t<0)this.lShiftTo(-t,e);else this.rShiftTo(t,e);return e}function It(t){if(t==0)return-1;var e=0;if((t&65535)==0){t>>=16;e+=16}if((t&255)==0){t>>=8;e+=8}if((t&15)==0){t>>=4;e+=4}if((t&3)==0){t>>=2;e+=2}if((t&1)==0)++e;return e}function At(){for(var t=0;t<this.t;++t)if(this.data[t]!=0)return t*this.DB+It(this.data[t]);if(this.s<0)return this.t*this.DB;return-1}function kt(t){var e=0;while(t!=0){t&=t-1;++e}return e}function Ct(){var t=0,e=this.s&this.DM;for(var r=0;r<this.t;++r)t+=kt(this.data[r]^e);return t}function Et(t){var e=Math.floor(t/this.DB);if(e>=this.t)return this.s!=0;return(this.data[e]&1<<t%this.DB)!=0}function Tt(t,e){var r=n.ONE.shiftLeft(t);this.bitwiseTo(r,e,r);return r}function Lt(t){return this.changeBit(t,dt)}function Nt(t){return this.changeBit(t,mt)}function Rt(t){return this.changeBit(t,vt)}function _t(t,e){var r=0,i=0,n=Math.min(t.t,this.t);while(r<n){i+=this.data[r]+t.data[r];e.data[r++]=i&this.DM;i>>=this.DB}if(t.t<this.t){i+=t.s;while(r<this.t){i+=this.data[r];e.data[r++]=i&this.DM;i>>=this.DB}i+=this.s}else{i+=this.s;while(r<t.t){i+=t.data[r];e.data[r++]=i&this.DM;i>>=this.DB}i+=t.s}e.s=i<0?-1:0;if(i>0)e.data[r++]=i;else if(i<-1)e.data[r++]=this.DV+i;e.t=r;e.clamp()}function Dt(t){var e=a();this.addTo(t,e);return e}function Ut(t){var e=a();this.subTo(t,e);return e}function Pt(t){var e=a();this.multiplyTo(t,e);return e}function xt(t){var e=a();this.divRemTo(t,e,null);return e}function Ot(t){var e=a();this.divRemTo(t,null,e);return e}function zt(t){var e=a(),r=a();this.divRemTo(t,e,r);return new Array(e,r)}function Mt(t){this.data[this.t]=this.am(0,t-1,this,0,0,this.t);++this.t;this.clamp()}function Kt(t,e){if(t==0)return;while(this.t<=e)this.data[this.t++]=0;this.data[e]+=t;while(this.data[e]>=this.DV){this.data[e]-=this.DV;if(++e>=this.t)this.data[this.t++]=0;++this.data[e]}}function Vt(){}function jt(t){return t}function qt(t,e,r){t.multiplyTo(e,r)}function Gt(t,e){t.squareTo(e)}Vt.prototype.convert=jt;Vt.prototype.revert=jt;Vt.prototype.mulTo=qt;Vt.prototype.sqrTo=Gt;function Ft(t){return this.exp(t,new Vt)}function Ht(t,e,r){var i=Math.min(this.t+t.t,e);r.s=0;r.t=i;while(i>0)r.data[--i]=0;var n;for(n=r.t-this.t;i<n;++i)r.data[i+this.t]=this.am(0,t.data[i],r,i,0,this.t);for(n=Math.min(t.t,e);i<n;++i)this.am(0,t.data[i],r,i,0,e-i);r.clamp()}function Qt(t,e,r){--e;var i=r.t=this.t+t.t-e;r.s=0;while(--i>=0)r.data[i]=0;for(i=Math.max(e-this.t,0);i<t.t;++i)r.data[this.t+i-e]=this.am(e-i,t.data[i],r,0,0,this.t+i-e);r.clamp();r.drShiftTo(1,r)}function Wt(t){this.r2=a();this.q3=a();n.ONE.dlShiftTo(2*t.t,this.r2);this.mu=this.r2.divide(t);this.m=t}function Zt(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);else if(t.compareTo(this.m)<0)return t;else{var e=a();t.copyTo(e);this.reduce(e);return e}}function Yt(t){return t}function Jt(t){t.drShiftTo(this.m.t-1,this.r2);if(t.t>this.m.t+1){t.t=this.m.t+1;t.clamp()}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(t.compareTo(this.r2)<0)t.dAddOffset(1,this.m.t+1);t.subTo(this.r2,t);while(t.compareTo(this.m)>=0)t.subTo(this.m,t)}function Xt(t,e){t.squareTo(e);this.reduce(e)}function $t(t,e,r){t.multiplyTo(e,r);this.reduce(r)}Wt.prototype.convert=Zt;Wt.prototype.revert=Yt;Wt.prototype.reduce=Jt;Wt.prototype.mulTo=$t;Wt.prototype.sqrTo=Xt;function te(t,e){var r=t.bitLength(),i,n=m(1),s;if(r<=0)return n;else if(r<18)i=1;else if(r<48)i=3;else if(r<144)i=4;else if(r<768)i=5;else i=6;if(r<8)s=new x(e);else if(e.isEven())s=new Wt(e);else s=new q(e);var o=new Array,f=3,u=i-1,h=(1<<i)-1;o[1]=s.convert(this);if(i>1){var c=a();s.sqrTo(o[1],c);while(f<=h){o[f]=a();s.mulTo(c,o[f-2],o[f]);f+=2}}var l=t.t-1,p,d=true,y=a(),v;r=k(t.data[l])-1;while(l>=0){if(r>=u)p=t.data[l]>>r-u&h;else{p=(t.data[l]&(1<<r+1)-1)<<u-r;if(l>0)p|=t.data[l-1]>>this.DB+r-u}f=i;while((p&1)==0){p>>=1;--f}if((r-=f)<0){r+=this.DB;--l}if(d){o[p].copyTo(n);d=false}else{while(f>1){s.sqrTo(n,y);s.sqrTo(y,n);f-=2}if(f>0)s.sqrTo(n,y);else{v=n;n=y;y=v}s.mulTo(y,o[p],n)}while(l>=0&&(t.data[l]&1<<r)==0){s.sqrTo(n,y);v=n;n=y;y=v;if(--r<0){r=this.DB-1;--l}}}return s.revert(n)}function ee(t){var e=this.s<0?this.negate():this.clone();var r=t.s<0?t.negate():t.clone();if(e.compareTo(r)<0){var i=e;e=r;r=i}var n=e.getLowestSetBit(),a=r.getLowestSetBit();if(a<0)return e;if(n<a)a=n;if(a>0){e.rShiftTo(a,e);r.rShiftTo(a,r)}while(e.signum()>0){if((n=e.getLowestSetBit())>0)e.rShiftTo(n,e);if((n=r.getLowestSetBit())>0)r.rShiftTo(n,r);if(e.compareTo(r)>=0){e.subTo(r,e);e.rShiftTo(1,e)}else{r.subTo(e,r);r.rShiftTo(1,r)}}if(a>0)r.lShiftTo(a,r);return r}function re(t){if(t<=0)return 0;var e=this.DV%t,r=this.s<0?t-1:0;if(this.t>0)if(e==0)r=this.data[0]%t;else for(var i=this.t-1;i>=0;--i)r=(e*r+this.data[i])%t;return r}function ie(t){var e=t.isEven();if(this.isEven()&&e||t.signum()==0)return n.ZERO;var r=t.clone(),i=this.clone();var a=m(1),s=m(0),o=m(0),f=m(1);while(r.signum()!=0){while(r.isEven()){r.rShiftTo(1,r);if(e){if(!a.isEven()||!s.isEven()){a.addTo(this,a);s.subTo(t,s)}a.rShiftTo(1,a)}else if(!s.isEven())s.subTo(t,s);s.rShiftTo(1,s)}while(i.isEven()){i.rShiftTo(1,i);if(e){if(!o.isEven()||!f.isEven()){o.addTo(this,o);f.subTo(t,f)}o.rShiftTo(1,o)}else if(!f.isEven())f.subTo(t,f);f.rShiftTo(1,f)}if(r.compareTo(i)>=0){r.subTo(i,r);if(e)a.subTo(o,a);s.subTo(f,s)}else{i.subTo(r,i);if(e)o.subTo(a,o);f.subTo(s,f)}}if(i.compareTo(n.ONE)!=0)return n.ZERO;if(f.compareTo(t)>=0)return f.subtract(t);if(f.signum()<0)f.addTo(t,f);else return f;if(f.signum()<0)return f.add(t);else return f}var ne=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];var ae=(1<<26)/ne[ne.length-1];function se(t){var e,r=this.abs();if(r.t==1&&r.data[0]<=ne[ne.length-1]){for(e=0;e<ne.length;++e)if(r.data[0]==ne[e])return true;return false}if(r.isEven())return false;e=1;while(e<ne.length){var i=ne[e],n=e+1;while(n<ne.length&&i<ae)i*=ne[n++];i=r.modInt(i);while(e<n)if(i%ne[e++]==0)return false}return r.millerRabin(t)}function oe(t){var e=this.subtract(n.ONE);var r=e.getLowestSetBit();if(r<=0)return false;var i=e.shiftRight(r);var a=fe();var s;for(var o=0;o<t;++o){do{s=new n(this.bitLength(),a)}while(s.compareTo(n.ONE)<=0||s.compareTo(e)>=0);var f=s.modPow(i,this);if(f.compareTo(n.ONE)!=0&&f.compareTo(e)!=0){var u=1;while(u++<r&&f.compareTo(e)!=0){f=f.modPowInt(2,this);if(f.compareTo(n.ONE)==0)return false}if(f.compareTo(e)!=0)return false}}return true}function fe(){return{nextBytes:function(t){for(var e=0;e<t.length;++e){t[e]=Math.floor(Math.random()*255)}}}}n.prototype.chunkSize=rt;n.prototype.toRadix=nt;n.prototype.fromRadix=at;n.prototype.fromNumber=st;n.prototype.bitwiseTo=ct;n.prototype.changeBit=Tt;n.prototype.addTo=_t;n.prototype.dMultiply=Mt;n.prototype.dAddOffset=Kt;n.prototype.multiplyLowerTo=Ht;n.prototype.multiplyUpperTo=Qt;n.prototype.modInt=re;n.prototype.millerRabin=oe;n.prototype.clone=X;n.prototype.intValue=$;n.prototype.byteValue=tt;n.prototype.shortValue=et;n.prototype.signum=it;n.prototype.toByteArray=ot;n.prototype.equals=ft;n.prototype.min=ut;n.prototype.max=ht;n.prototype.and=pt;n.prototype.or=yt;n.prototype.xor=gt;n.prototype.andNot=wt;n.prototype.not=Bt;n.prototype.shiftLeft=bt;n.prototype.shiftRight=St;n.prototype.getLowestSetBit=At;n.prototype.bitCount=Ct;n.prototype.testBit=Et;n.prototype.setBit=Lt;n.prototype.clearBit=Nt;n.prototype.flipBit=Rt;n.prototype.add=Dt;n.prototype.subtract=Ut;n.prototype.multiply=Pt;n.prototype.divide=xt;n.prototype.remainder=Ot;n.prototype.divideAndRemainder=zt;n.prototype.modPow=te;n.prototype.modInverse=ie;n.prototype.pow=Ft;n.prototype.gcd=ee;n.prototype.isProbablePrime=se;t.jsbn=t.jsbn||{};t.jsbn.BigInteger=n}var e="jsbn";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){t.cipher=t.cipher||{};t.cipher.algorithms=t.cipher.algorithms||{};t.cipher.createCipher=function(e,r){var i=e;if(typeof i==="string"){i=t.cipher.getAlgorithm(i);if(i){i=i()}}if(!i){throw new Error("Unsupported algorithm: "+e)}return new t.cipher.BlockCipher({algorithm:i,key:r,decrypt:false})};t.cipher.createDecipher=function(e,r){var i=e;if(typeof i==="string"){i=t.cipher.getAlgorithm(i);if(i){i=i()}}if(!i){throw new Error("Unsupported algorithm: "+e)}return new t.cipher.BlockCipher({algorithm:i,key:r,decrypt:true})};t.cipher.registerAlgorithm=function(e,r){e=e.toUpperCase();t.cipher.algorithms[e]=r};t.cipher.getAlgorithm=function(e){e=e.toUpperCase();if(e in t.cipher.algorithms){return t.cipher.algorithms[e]}return null};var e=t.cipher.BlockCipher=function(t){this.algorithm=t.algorithm;this.mode=this.algorithm.mode;this.blockSize=this.mode.blockSize;this._finish=false;this._input=null;this.output=null;this._op=t.decrypt?this.mode.decrypt:this.mode.encrypt;this._decrypt=t.decrypt;this.algorithm.initialize(t)};e.prototype.start=function(e){e=e||{};var r={};for(var i in e){r[i]=e[i]}r.decrypt=this._decrypt;this._finish=false;this._input=t.util.createBuffer();this.output=e.output||t.util.createBuffer();this.mode.start(r)};e.prototype.update=function(t){if(!this._finish){this._input.putBuffer(t)}while(this._input.length()>=this.blockSize||this._input.length()>0&&this._finish){this._op.call(this.mode,this._input,this.output)}this._input.compact()};e.prototype.finish=function(t){if(t&&this.mode.name==="CBC"){this.mode.pad=function(e){return t(this.blockSize,e,false)};this.mode.unpad=function(e){return t(this.blockSize,e,true)}}var e={};e.decrypt=this._decrypt;e.overflow=this._input.length()%this.blockSize;if(!this._decrypt&&this.mode.pad){if(!this.mode.pad(this._input,e)){return false}}this._finish=true;this.update();if(this._decrypt&&this.mode.unpad){if(!this.mode.unpad(this.output,e)){return false}}if(this.mode.afterFinish){if(!this.mode.afterFinish(this.output,e)){return false}}return true}}var e="cipher";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){
if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){t.cipher=t.cipher||{};var e=t.cipher.modes=t.cipher.modes||{};e.ecb=function(t){t=t||{};this.name="ECB";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=new Array(this._blocks);this._outBlock=new Array(this._blocks)};e.ecb.prototype.start=function(t){};e.ecb.prototype.encrypt=function(t,e){for(var r=0;r<this._blocks;++r){this._inBlock[r]=t.getInt32()}this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){e.putInt32(this._outBlock[r])}};e.ecb.prototype.decrypt=function(t,e){for(var r=0;r<this._blocks;++r){this._inBlock[r]=t.getInt32()}this.cipher.decrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){e.putInt32(this._outBlock[r])}};e.ecb.prototype.pad=function(t,e){var r=t.length()===this.blockSize?this.blockSize:this.blockSize-t.length();t.fillWithByte(r,r);return true};e.ecb.prototype.unpad=function(t,e){if(e.overflow>0){return false}var r=t.length();var i=t.at(r-1);if(i>this.blockSize<<2){return false}t.truncate(i);return true};e.cbc=function(t){t=t||{};this.name="CBC";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=new Array(this._blocks);this._outBlock=new Array(this._blocks)};e.cbc.prototype.start=function(t){if(t.iv===null){if(!this._prev){throw new Error("Invalid IV parameter.")}this._iv=this._prev.slice(0)}else if(!("iv"in t)){throw new Error("Invalid IV parameter.")}else{this._iv=r(t.iv);this._prev=this._iv.slice(0)}};e.cbc.prototype.encrypt=function(t,e){for(var r=0;r<this._blocks;++r){this._inBlock[r]=this._prev[r]^t.getInt32()}this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){e.putInt32(this._outBlock[r])}this._prev=this._outBlock};e.cbc.prototype.decrypt=function(t,e){for(var r=0;r<this._blocks;++r){this._inBlock[r]=t.getInt32()}this.cipher.decrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){e.putInt32(this._prev[r]^this._outBlock[r])}this._prev=this._inBlock.slice(0)};e.cbc.prototype.pad=function(t,e){var r=t.length()===this.blockSize?this.blockSize:this.blockSize-t.length();t.fillWithByte(r,r);return true};e.cbc.prototype.unpad=function(t,e){if(e.overflow>0){return false}var r=t.length();var i=t.at(r-1);if(i>this.blockSize<<2){return false}t.truncate(i);return true};e.cfb=function(t){t=t||{};this.name="CFB";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=null;this._outBlock=new Array(this._blocks)};e.cfb.prototype.start=function(t){if(!("iv"in t)){throw new Error("Invalid IV parameter.")}this._iv=r(t.iv);this._inBlock=this._iv.slice(0)};e.cfb.prototype.encrypt=function(t,e){this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){this._inBlock[r]=t.getInt32()^this._outBlock[r];e.putInt32(this._inBlock[r])}};e.cfb.prototype.decrypt=function(t,e){this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){this._inBlock[r]=t.getInt32();e.putInt32(this._inBlock[r]^this._outBlock[r])}};e.cfb.prototype.afterFinish=function(t,e){if(e.overflow>0){t.truncate(this.blockSize-e.overflow)}return true};e.ofb=function(t){t=t||{};this.name="OFB";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=null;this._outBlock=new Array(this._blocks)};e.ofb.prototype.start=function(t){if(!("iv"in t)){throw new Error("Invalid IV parameter.")}this._iv=r(t.iv);this._inBlock=this._iv.slice(0)};e.ofb.prototype.encrypt=function(t,e){this.cipher.encrypt(this._inBlock,this._outBlock);for(var r=0;r<this._blocks;++r){e.putInt32(t.getInt32()^this._outBlock[r]);this._inBlock[r]=this._outBlock[r]}};e.ofb.prototype.decrypt=e.ofb.prototype.encrypt;e.ofb.prototype.afterFinish=function(t,e){if(e.overflow>0){t.truncate(this.blockSize-e.overflow)}return true};e.ctr=function(t){t=t||{};this.name="CTR";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=null;this._outBlock=new Array(this._blocks)};e.ctr.prototype.start=function(t){if(!("iv"in t)){throw new Error("Invalid IV parameter.")}this._iv=r(t.iv);this._inBlock=this._iv.slice(0)};e.ctr.prototype.encrypt=function(t,e){this.cipher.encrypt(this._inBlock,this._outBlock);i(this._inBlock);for(var r=0;r<this._blocks;++r){e.putInt32(t.getInt32()^this._outBlock[r])}};e.ctr.prototype.decrypt=e.ctr.prototype.encrypt;e.ctr.prototype.afterFinish=function(t,e){if(e.overflow>0){t.truncate(this.blockSize-e.overflow)}return true};e.gcm=function(t){t=t||{};this.name="GCM";this.cipher=t.cipher;this.blockSize=t.blockSize||16;this._blocks=this.blockSize/4;this._inBlock=new Array(this._blocks);this._outBlock=new Array(this._blocks);this._R=3774873600};e.gcm.prototype.start=function(e){if(!("iv"in e)){throw new Error("Invalid IV parameter.")}var r=t.util.createBuffer(e.iv);this._cipherLength=0;var a;if("additionalData"in e){a=t.util.createBuffer(e.additionalData)}else{a=t.util.createBuffer()}if("tagLength"in e){this._tagLength=e.tagLength}else{this._tagLength=128}this._tag=null;if(e.decrypt){this._tag=t.util.createBuffer(e.tag).getBytes();if(this._tag.length!==this._tagLength/8){throw new Error("Authentication tag does not match tag length.")}}this._hashBlock=new Array(this._blocks);this.tag=null;this._hashSubkey=new Array(this._blocks);this.cipher.encrypt([0,0,0,0],this._hashSubkey);this.componentBits=4;this._m=this.generateHashTable(this._hashSubkey,this.componentBits);var s=r.length();if(s===12){this._j0=[r.getInt32(),r.getInt32(),r.getInt32(),1]}else{this._j0=[0,0,0,0];while(r.length()>0){this._j0=this.ghash(this._hashSubkey,this._j0,[r.getInt32(),r.getInt32(),r.getInt32(),r.getInt32()])}this._j0=this.ghash(this._hashSubkey,this._j0,[0,0].concat(n(s*8)))}this._inBlock=this._j0.slice(0);i(this._inBlock);a=t.util.createBuffer(a);this._aDataLength=n(a.length()*8);var o=a.length()%this.blockSize;if(o){a.fillWithByte(0,this.blockSize-o)}this._s=[0,0,0,0];while(a.length()>0){this._s=this.ghash(this._hashSubkey,this._s,[a.getInt32(),a.getInt32(),a.getInt32(),a.getInt32()])}};e.gcm.prototype.encrypt=function(e,r){this.cipher.encrypt(this._inBlock,this._outBlock);i(this._inBlock);var n=e.length();for(var a=0;a<this._blocks;++a){this._outBlock[a]^=e.getInt32()}if(n<this.blockSize){var s=n%this.blockSize;this._cipherLength+=s;var o=t.util.createBuffer();o.putInt32(this._outBlock[0]);o.putInt32(this._outBlock[1]);o.putInt32(this._outBlock[2]);o.putInt32(this._outBlock[3]);o.truncate(this.blockSize-s);this._outBlock[0]=o.getInt32();this._outBlock[1]=o.getInt32();this._outBlock[2]=o.getInt32();this._outBlock[3]=o.getInt32()}else{this._cipherLength+=this.blockSize}for(var a=0;a<this._blocks;++a){r.putInt32(this._outBlock[a])}this._s=this.ghash(this._hashSubkey,this._s,this._outBlock)};e.gcm.prototype.decrypt=function(t,e){this.cipher.encrypt(this._inBlock,this._outBlock);i(this._inBlock);var r=t.length();this._hashBlock[0]=t.getInt32();this._hashBlock[1]=t.getInt32();this._hashBlock[2]=t.getInt32();this._hashBlock[3]=t.getInt32();this._s=this.ghash(this._hashSubkey,this._s,this._hashBlock);for(var n=0;n<this._blocks;++n){e.putInt32(this._outBlock[n]^this._hashBlock[n])}if(r<this.blockSize){this._cipherLength+=r%this.blockSize}else{this._cipherLength+=this.blockSize}};e.gcm.prototype.afterFinish=function(e,r){var i=true;if(r.overflow){e.truncate(this.blockSize-r.overflow)}this.tag=t.util.createBuffer();var a=this._aDataLength.concat(n(this._cipherLength*8));this._s=this.ghash(this._hashSubkey,this._s,a);var s=[];this.cipher.encrypt(this._j0,s);for(var o=0;o<this._blocks;++o){this.tag.putInt32(this._s[o]^s[o])}this.tag.truncate(this.tag.length()%(this._tagLength/8));if(r.decrypt&&this.tag.bytes()!==this._tag){i=false}return i};e.gcm.prototype.multiply=function(t,e){var r=[0,0,0,0];var i=e.slice(0);for(var n=0;n<128;++n){var a=t[n/32|0]&1<<31-n%32;if(a){r[0]^=i[0];r[1]^=i[1];r[2]^=i[2];r[3]^=i[3]}this.pow(i,i)}return r};e.gcm.prototype.pow=function(t,e){var r=t[3]&1;for(var i=3;i>0;--i){e[i]=t[i]>>>1|(t[i-1]&1)<<31}e[0]=t[0]>>>1;if(r){e[0]^=this._R}};e.gcm.prototype.tableMultiply=function(t){var e=[0,0,0,0];for(var r=0;r<32;++r){var i=r/8|0;var n=t[i]>>>(7-r%8)*4&15;var a=this._m[r][n];e[0]^=a[0];e[1]^=a[1];e[2]^=a[2];e[3]^=a[3]}return e};e.gcm.prototype.ghash=function(t,e,r){e[0]^=r[0];e[1]^=r[1];e[2]^=r[2];e[3]^=r[3];return this.tableMultiply(e)};e.gcm.prototype.generateHashTable=function(t,e){var r=8/e;var i=4*r;var n=16*r;var a=new Array(n);for(var s=0;s<n;++s){var o=[0,0,0,0];var f=s/i|0;var u=(i-1-s%i)*e;o[f]=1<<e-1<<u;a[s]=this.generateSubHashTable(this.multiply(o,t),e)}return a};e.gcm.prototype.generateSubHashTable=function(t,e){var r=1<<e;var i=r>>>1;var n=new Array(r);n[i]=t.slice(0);var a=i>>>1;while(a>0){this.pow(n[2*a],n[a]=[]);a>>=1}a=2;while(a<i){for(var s=1;s<a;++s){var o=n[a];var f=n[s];n[a+s]=[o[0]^f[0],o[1]^f[1],o[2]^f[2],o[3]^f[3]]}a*=2}n[0]=[0,0,0,0];for(a=i+1;a<r;++a){var u=n[a^i];n[a]=[t[0]^u[0],t[1]^u[1],t[2]^u[2],t[3]^u[3]]}return n};function r(e){if(typeof e==="string"){e=t.util.createBuffer(e)}if(t.util.isArray(e)&&e.length>4){var r=e;e=t.util.createBuffer();for(var i=0;i<e.length;++i){e.putByte(r[i])}}if(!t.util.isArray(e)){e=[e.getInt32(),e.getInt32(),e.getInt32(),e.getInt32()]}return e}function i(t){t[t.length-1]=t[t.length-1]+1&4294967295}function n(t){return[t/4294967296|0,t&4294967295]}}var e="cipherModes";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){t.aes=t.aes||{};t.aes.startEncrypting=function(t,e,r,i){var n=l({key:t,output:r,decrypt:false,mode:i});n.start(e);return n};t.aes.createEncryptionCipher=function(t,e){return l({key:t,output:null,decrypt:false,mode:e})};t.aes.startDecrypting=function(t,e,r,i){var n=l({key:t,output:r,decrypt:true,mode:i});n.start(e);return n};t.aes.createDecryptionCipher=function(t,e){return l({key:t,output:null,decrypt:true,mode:e})};t.aes.Algorithm=function(t,e){if(!r){u()}var i=this;i.name=t;i.mode=new e({blockSize:16,cipher:{encrypt:function(t,e){return c(i._w,t,e,false)},decrypt:function(t,e){return c(i._w,t,e,true)}}});i._init=false};t.aes.Algorithm.prototype.initialize=function(e){if(this._init){return}var r=e.key;var i;if(typeof r==="string"&&(r.length===16||r.length===24||r.length===32)){r=t.util.createBuffer(r)}else if(t.util.isArray(r)&&(r.length===16||r.length===24||r.length===32)){i=r;r=t.util.createBuffer();for(var n=0;n<i.length;++n){r.putByte(i[n])}}if(!t.util.isArray(r)){i=r;r=[];var a=i.length();if(a===16||a===24||a===32){a=a>>>2;for(var n=0;n<a;++n){r.push(i.getInt32())}}}if(!t.util.isArray(r)||!(r.length===4||r.length===6||r.length===8)){throw new Error("Invalid key parameter.")}var s=this.mode.name;var o=t.util.inArray(s,["CFB","OFB","CTR","GCM"])!==-1;this._w=h(r,e.decrypt&&!o);this._init=true};t.aes._expandKey=function(t,e){if(!r){u()}return h(t,e)};t.aes._updateBlock=c;e("AES-CBC",t.cipher.modes.cbc);e("AES-CFB",t.cipher.modes.cfb);e("AES-OFB",t.cipher.modes.ofb);e("AES-CTR",t.cipher.modes.ctr);e("AES-GCM",t.cipher.modes.gcm);function e(e,r){var i=function(){return new t.aes.Algorithm(e,r)};t.cipher.registerAlgorithm(e,i)}var r=false;var i=4;var n;var a;var s;var o;var f;function u(){r=true;s=[0,1,2,4,8,16,32,64,128,27,54];var t=new Array(256);for(var e=0;e<128;++e){t[e]=e<<1;t[e+128]=e+128<<1^283}n=new Array(256);a=new Array(256);o=new Array(4);f=new Array(4);for(var e=0;e<4;++e){o[e]=new Array(256);f[e]=new Array(256)}var i=0,u=0,h,c,l,p,d,y,v;for(var e=0;e<256;++e){p=u^u<<1^u<<2^u<<3^u<<4;p=p>>8^p&255^99;n[i]=p;a[p]=i;d=t[p];h=t[i];c=t[h];l=t[c];y=d<<24^p<<16^p<<8^(p^d);v=(h^c^l)<<24^(i^l)<<16^(i^c^l)<<8^(i^h^l);for(var g=0;g<4;++g){o[g][i]=y;f[g][p]=v;y=y<<24|y>>>8;v=v<<24|v>>>8}if(i===0){i=u=1}else{i=h^t[t[t[h^l]]];u^=t[t[u]]}}}function h(t,e){if(typeof checkIntegrity==="function"){checkIntegrity()}var r=t.slice(0);var a,o=1;var u=r.length;var h=u+6+1;var c=i*h;for(var l=u;l<c;++l){a=r[l-1];if(l%u===0){a=n[a>>>16&255]<<24^n[a>>>8&255]<<16^n[a&255]<<8^n[a>>>24]^s[o]<<24;o++}else if(u>6&&l%u===4){a=n[a>>>24]<<24^n[a>>>16&255]<<16^n[a>>>8&255]<<8^n[a&255]}r[l]=r[l-u]^a}if(e){var p;var d=f[0];var y=f[1];var v=f[2];var g=f[3];var m=r.slice(0);c=r.length;for(var l=0,w=c-i;l<c;l+=i,w-=i){if(l===0||l===c-i){m[l]=r[w];m[l+1]=r[w+3];m[l+2]=r[w+2];m[l+3]=r[w+1]}else{for(var B=0;B<i;++B){p=r[w+B];m[l+(3&-B)]=d[n[p>>>24]]^y[n[p>>>16&255]]^v[n[p>>>8&255]]^g[n[p&255]]}}}r=m}return r}function c(t,e,r,i){if(typeof checkIntegrity==="function"){checkIntegrity()}var s=t.length/4-1;var u,h,c,l,p;if(i){u=f[0];h=f[1];c=f[2];l=f[3];p=a}else{u=o[0];h=o[1];c=o[2];l=o[3];p=n}var d,y,v,g,m,w,B;d=e[0]^t[0];y=e[i?3:1]^t[1];v=e[2]^t[2];g=e[i?1:3]^t[3];var b=3;for(var S=1;S<s;++S){m=u[d>>>24]^h[y>>>16&255]^c[v>>>8&255]^l[g&255]^t[++b];w=u[y>>>24]^h[v>>>16&255]^c[g>>>8&255]^l[d&255]^t[++b];B=u[v>>>24]^h[g>>>16&255]^c[d>>>8&255]^l[y&255]^t[++b];g=u[g>>>24]^h[d>>>16&255]^c[y>>>8&255]^l[v&255]^t[++b];d=m;y=w;v=B}r[0]=p[d>>>24]<<24^p[y>>>16&255]<<16^p[v>>>8&255]<<8^p[g&255]^t[++b];r[i?3:1]=p[y>>>24]<<24^p[v>>>16&255]<<16^p[g>>>8&255]<<8^p[d&255]^t[++b];r[2]=p[v>>>24]<<24^p[g>>>16&255]<<16^p[d>>>8&255]<<8^p[y&255]^t[++b];r[i?1:3]=p[g>>>24]<<24^p[d>>>16&255]<<16^p[y>>>8&255]<<8^p[v&255]^t[++b]}function l(e){if(typeof checkIntegrity==="function"){checkIntegrity()}e=e||{};var r=(e.mode||"CBC").toUpperCase();var i="AES-"+r;var n;if(e.decrypt){n=t.cipher.createDecipher(i,e.key)}else{n=t.cipher.createCipher(i,e.key)}var a=n.start;n.start=function(e,r){var i=null;if(r instanceof t.util.ByteBuffer){i=r;r={}}r=r||{};r.output=i;r.iv=e;a.call(n,r)};return n}}var e="aes";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.md5=t.md5||{};t.md=t.md||{};t.md.algorithms=t.md.algorithms||{};t.md.md5=t.md.algorithms.md5=e;e.create=function(){if(!s){o()}var e=null;var i=t.util.createBuffer();var n=new Array(16);var a={algorithm:"md5",blockLength:64,digestLength:16,messageLength:0,messageLength64:[0,0]};a.start=function(){a.messageLength=0;a.messageLength64=[0,0];i=t.util.createBuffer();e={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878};return a};a.start();a.update=function(r,s){if(s==="utf8"){r=t.util.encodeUtf8(r)}else if(s==="euc-kr"){r=t.util.encodeCp949(r)}a.messageLength+=r.length;a.messageLength64[0]+=r.length/4294967296>>>0;a.messageLength64[1]+=r.length>>>0;i.putBytes(r);f(e,n,i);if(i.read>2048||i.length()===0){i.compact()}return a};a.digest=function(){var s=t.util.createBuffer();s.putBytes(i.bytes());s.putBytes(r.substr(0,64-(a.messageLength64[1]+8&63)));s.putInt32Le(a.messageLength64[1]<<3);s.putInt32Le(a.messageLength64[0]<<3|a.messageLength64[0]>>>28);var o={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3};f(o,n,s);var u=t.util.createBuffer();u.putInt32Le(o.h0);u.putInt32Le(o.h1);u.putInt32Le(o.h2);u.putInt32Le(o.h3);return u};return a};var r=null;var i=null;var n=null;var a=null;var s=false;function o(){if(typeof checkIntegrity==="function"){checkIntegrity()}r=String.fromCharCode(128);r+=t.util.fillString(String.fromCharCode(0),64);i=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,6,11,0,5,10,15,4,9,14,3,8,13,2,7,12,5,8,11,14,1,4,7,10,13,0,3,6,9,12,15,2,0,7,14,5,12,3,10,1,8,15,6,13,4,11,2,9];n=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];a=new Array(64);for(var e=0;e<64;++e){a[e]=Math.floor(Math.abs(Math.sin(e+1))*4294967296)}s=true}function f(t,e,r){if(typeof checkIntegrity==="function"){checkIntegrity()}var s,o,f,u,h,c,l,p;var d=r.length();while(d>=64){o=t.h0;f=t.h1;u=t.h2;h=t.h3;for(p=0;p<16;++p){e[p]=r.getInt32Le();c=h^f&(u^h);s=o+c+a[p]+e[p];l=n[p];o=h;h=u;u=f;f+=s<<l|s>>>32-l}for(;p<32;++p){c=u^h&(f^u);s=o+c+a[p]+e[i[p]];l=n[p];o=h;h=u;u=f;f+=s<<l|s>>>32-l}for(;p<48;++p){c=f^u^h;s=o+c+a[p]+e[i[p]];l=n[p];o=h;h=u;u=f;f+=s<<l|s>>>32-l}for(;p<64;++p){c=u^(f|~h);s=o+c+a[p]+e[i[p]];l=n[p];o=h;h=u;u=f;f+=s<<l|s>>>32-l}t.h0=t.h0+o|0;t.h1=t.h1+f|0;t.h2=t.h2+u|0;t.h3=t.h3+h|0;d-=64}}}var e="md5";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.sha1=t.sha1||{};t.md=t.md||{};t.md.algorithms=t.md.algorithms||{};t.md.sha1=t.md.algorithms.sha1=e;e.create=function(){if(!i){n()}var e=null;var s=t.util.createBuffer();var o=new Array(80);var f={algorithm:"sha1",blockLength:64,digestLength:20,messageLength:0,messageLength64:[0,0]};f.start=function(){f.messageLength=0;f.messageLength64=[0,0];s=t.util.createBuffer();e={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878,h4:3285377520};return f};f.start();f.update=function(r,i){if(i==="utf8"){r=t.util.encodeUtf8(r)}else if(i==="euc-kr"){r=t.util.encodeCp949(r)}f.messageLength+=r.length;f.messageLength64[0]+=r.length/4294967296>>>0;f.messageLength64[1]+=r.length>>>0;s.putBytes(r);a(e,o,s);if(s.read>2048||s.length()===0){s.compact()}return f};f.digest=function(){var i=t.util.createBuffer();i.putBytes(s.bytes());i.putBytes(r.substr(0,64-(f.messageLength64[1]+8&63)));i.putInt32(f.messageLength64[0]<<3|f.messageLength64[0]>>>28);i.putInt32(f.messageLength64[1]<<3);var n={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3,h4:e.h4};a(n,o,i);var u=t.util.createBuffer();u.putInt32(n.h0);u.putInt32(n.h1);u.putInt32(n.h2);u.putInt32(n.h3);u.putInt32(n.h4);return u};return f};var r=null;var i=false;function n(){if(typeof checkIntegrity==="function"){checkIntegrity()}r=String.fromCharCode(128);r+=t.util.fillString(String.fromCharCode(0),64);i=true}function a(t,e,r){if(typeof checkIntegrity==="function"){checkIntegrity()}var i,n,a,s,o,f,u,h;var c=r.length();while(c>=64){n=t.h0;a=t.h1;s=t.h2;o=t.h3;f=t.h4;for(h=0;h<16;++h){i=r.getInt32();e[h]=i;u=o^a&(s^o);i=(n<<5|n>>>27)+u+f+1518500249+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}for(;h<20;++h){i=e[h-3]^e[h-8]^e[h-14]^e[h-16];i=i<<1|i>>>31;e[h]=i;u=o^a&(s^o);i=(n<<5|n>>>27)+u+f+1518500249+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}for(;h<32;++h){i=e[h-3]^e[h-8]^e[h-14]^e[h-16];i=i<<1|i>>>31;e[h]=i;u=a^s^o;i=(n<<5|n>>>27)+u+f+1859775393+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}for(;h<40;++h){i=e[h-6]^e[h-16]^e[h-28]^e[h-32];i=i<<2|i>>>30;e[h]=i;u=a^s^o;i=(n<<5|n>>>27)+u+f+1859775393+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}for(;h<60;++h){i=e[h-6]^e[h-16]^e[h-28]^e[h-32];i=i<<2|i>>>30;e[h]=i;u=a&s|o&(a^s);i=(n<<5|n>>>27)+u+f+2400959708+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}for(;h<80;++h){i=e[h-6]^e[h-16]^e[h-28]^e[h-32];i=i<<2|i>>>30;e[h]=i;u=a^s^o;i=(n<<5|n>>>27)+u+f+3395469782+i;f=o;o=s;s=(a<<30|a>>>2)>>>0;a=n;n=i}t.h0=t.h0+n|0;t.h1=t.h1+a|0;t.h2=t.h2+s|0;t.h3=t.h3+o|0;t.h4=t.h4+f|0;c-=64}}}var e="sha1";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.sha256=t.sha256||{};t.md=t.md||{};t.md.algorithms=t.md.algorithms||{};t.md.sha256=t.md.algorithms.sha256=e;e.create=function(){if(!i){a()}var e=null;var n=t.util.createBuffer();var o=new Array(64);var f={algorithm:"sha256",blockLength:64,digestLength:32,messageLength:0,messageLength64:[0,0]};f.start=function(){f.messageLength=0;f.messageLength64=[0,0];n=t.util.createBuffer();e={h0:1779033703,h1:3144134277,h2:1013904242,h3:2773480762,h4:1359893119,h5:2600822924,h6:528734635,h7:1541459225};return f};f.start();f.update=function(r,i){if(i==="utf8"){r=t.util.encodeUtf8(r)}else if(i==="euc-kr"){r=t.util.encodeCp949(r)}f.messageLength+=r.length;f.messageLength64[0]+=r.length/4294967296>>>0;f.messageLength64[1]+=r.length>>>0;n.putBytes(r);s(e,o,n);if(n.read>2048||n.length()===0){n.compact()}return f};f.digest=function(){var i=t.util.createBuffer();i.putBytes(n.bytes());i.putBytes(r.substr(0,64-(f.messageLength64[1]+8&63)));i.putInt32(f.messageLength64[0]<<3|f.messageLength64[0]>>>28);i.putInt32(f.messageLength64[1]<<3);var a={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3,h4:e.h4,h5:e.h5,h6:e.h6,h7:e.h7};s(a,o,i);var u=t.util.createBuffer();u.putInt32(a.h0);u.putInt32(a.h1);u.putInt32(a.h2);u.putInt32(a.h3);u.putInt32(a.h4);u.putInt32(a.h5);u.putInt32(a.h6);u.putInt32(a.h7);return u};return f};var r=null;var i=false;var n=null;function a(){r=String.fromCharCode(128);r+=t.util.fillString(String.fromCharCode(0),64);n=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];i=true}function s(t,e,r){var i,a,s,o,f,u,h,c,l,p,d,y,v,g,m;var w=r.length();while(w>=64){for(h=0;h<16;++h){e[h]=r.getInt32()}for(;h<64;++h){i=e[h-2];i=(i>>>17|i<<15)^(i>>>19|i<<13)^i>>>10;a=e[h-15];a=(a>>>7|a<<25)^(a>>>18|a<<14)^a>>>3;e[h]=i+e[h-7]+a+e[h-16]|0}c=t.h0;l=t.h1;p=t.h2;d=t.h3;y=t.h4;v=t.h5;g=t.h6;m=t.h7;for(h=0;h<64;++h){o=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7);f=g^y&(v^g);s=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10);u=c&l|p&(c^l);i=m+o+f+n[h]+e[h];a=s+u;m=g;g=v;v=y;y=d+i>>>0;d=p;p=l;l=c;c=i+a>>>0}t.h0=t.h0+c|0;t.h1=t.h1+l|0;t.h2=t.h2+p|0;t.h3=t.h3+d|0;t.h4=t.h4+y|0;t.h5=t.h5+v|0;t.h6=t.h6+g|0;t.h7=t.h7+m|0;w-=64}}}var e="sha256";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.sha512=t.sha512||{};t.md=t.md||{};t.md.algorithms=t.md.algorithms||{};t.md.sha512=t.md.algorithms.sha512=e;var r=t.sha384=t.sha512.sha384=t.sha512.sha384||{};r.create=function(){return e.create("SHA-384")};t.md.sha384=t.md.algorithms.sha384=r;t.sha512.sha256=t.sha512.sha256||{create:function(){return e.create("SHA-512/256")}};t.md["sha512/256"]=t.md.algorithms["sha512/256"]=t.sha512.sha256;t.sha512.sha224=t.sha512.sha224||{create:function(){return e.create("SHA-512/224")}};t.md["sha512/224"]=t.md.algorithms["sha512/224"]=t.sha512.sha224;e.create=function(e){if(!n){o()}if(typeof e==="undefined"){e="SHA-512"}if(!(e in s)){throw new Error("Invalid SHA-512 algorithm: "+e)}var r=s[e];var a=null;var u=t.util.createBuffer();var h=new Array(80);for(var c=0;c<80;++c){h[c]=new Array(2)}var l={algorithm:e.replace("-","").toLowerCase(),blockLength:128,digestLength:64,messageLength:0,messageLength128:[0,0,0,0]};l.start=function(){l.messageLength=0;l.messageLength128=[0,0,0,0];u=t.util.createBuffer();a=new Array(r.length);for(var e=0;e<r.length;++e){a[e]=r[e].slice(0)}return l};l.start();l.update=function(e,r){if(r==="utf8"){e=t.util.encodeUtf8(e)}else if(r==="euc-kr"){e=t.util.encodeCp949(e)}l.messageLength+=e.length;var i=e.length;i=[i/4294967296>>>0,i>>>0];for(var n=3;n>=0;--n){l.messageLength128[n]+=i[1];i[1]=i[0]+(l.messageLength128[n]/4294967296>>>0);l.messageLength128[n]=l.messageLength128[n]>>>0;i[0]=i[1]/4294967296>>>0}u.putBytes(e);f(a,h,u);if(u.read>2048||u.length()===0){u.compact()}return l};l.digest=function(){var r=t.util.createBuffer();r.putBytes(u.bytes());r.putBytes(i.substr(0,128-(l.messageLength128[3]+16&127)));var n=[];for(var s=0;s<3;++s){n[s]=l.messageLength128[s]<<3|l.messageLength128[s-1]>>>28}n[3]=l.messageLength128[3]<<3;r.putInt32(n[0]);r.putInt32(n[1]);r.putInt32(n[2]);r.putInt32(n[3]);var o=new Array(a.length);for(var s=0;s<a.length;++s){o[s]=a[s].slice(0)}f(o,h,r);var c=t.util.createBuffer();var p;if(e==="SHA-512"){p=o.length}else if(e==="SHA-384"){p=o.length-2}else{p=o.length-4}for(var s=0;s<p;++s){c.putInt32(o[s][0]);if(s!==p-1||e!=="SHA-512/224"){c.putInt32(o[s][1])}}return c};return l};var i=null;var n=false;var a=null;var s=null;function o(){if(typeof checkIntegrity==="function"){checkIntegrity()}i=String.fromCharCode(128);i+=t.util.fillString(String.fromCharCode(0),128);a=[[1116352408,3609767458],[1899447441,602891725],[3049323471,3964484399],[3921009573,2173295548],[961987163,4081628472],[1508970993,3053834265],[2453635748,2937671579],[2870763221,3664609560],[3624381080,2734883394],[310598401,1164996542],[607225278,1323610764],[1426881987,3590304994],[1925078388,4068182383],[2162078206,991336113],[2614888103,633803317],[3248222580,3479774868],[3835390401,2666613458],[4022224774,944711139],[264347078,2341262773],[604807628,2007800933],[770255983,1495990901],[1249150122,1856431235],[1555081692,3175218132],[1996064986,2198950837],[2554220882,3999719339],[2821834349,766784016],[2952996808,2566594879],[3210313671,3203337956],[3336571891,1034457026],[3584528711,2466948901],[113926993,3758326383],[338241895,168717936],[666307205,1188179964],[773529912,1546045734],[1294757372,1522805485],[1396182291,2643833823],[1695183700,2343527390],[1986661051,1014477480],[2177026350,1206759142],[2456956037,344077627],[2730485921,1290863460],[2820302411,3158454273],[3259730800,3505952657],[3345764771,106217008],[3516065817,3606008344],[3600352804,1432725776],[4094571909,1467031594],[275423344,851169720],[430227734,3100823752],[506948616,1363258195],[659060556,3750685593],[883997877,3785050280],[958139571,3318307427],[1322822218,3812723403],[1537002063,2003034995],[1747873779,3602036899],[1955562222,1575990012],[2024104815,1125592928],[2227730452,2716904306],[2361852424,442776044],[2428436474,593698344],[2756734187,3733110249],[3204031479,2999351573],[3329325298,3815920427],[3391569614,3928383900],[3515267271,566280711],[3940187606,3454069534],[4118630271,4000239992],[116418474,1914138554],[174292421,2731055270],[289380356,3203993006],[460393269,320620315],[685471733,587496836],[852142971,1086792851],[1017036298,365543100],[1126000580,2618297676],[1288033470,3409855158],[1501505948,4234509866],[1607167915,987167468],[1816402316,1246189591]];s={};s["SHA-512"]=[[1779033703,4089235720],[3144134277,2227873595],[1013904242,4271175723],[2773480762,1595750129],[1359893119,2917565137],[2600822924,725511199],[528734635,4215389547],[1541459225,327033209]];s["SHA-384"]=[[3418070365,3238371032],[1654270250,914150663],[2438529370,812702999],[355462360,4144912697],[1731405415,4290775857],[2394180231,1750603025],[3675008525,1694076839],[1203062813,3204075428]];s["SHA-512/256"]=[[573645204,4230739756],[2673172387,3360449730],[596883563,1867755857],[2520282905,1497426621],[2519219938,2827943907],[3193839141,1401305490],[721525244,746961066],[246885852,2177182882]];s["SHA-512/224"]=[[2352822216,424955298],[1944164710,2312950998],[502970286,855612546],[1738396948,1479516111],[258812777,2077511080],[2011393907,79989058],[1067287976,1780299464],[286451373,2446758561]];n=true}function f(t,e,r){if(typeof checkIntegrity==="function"){checkIntegrity()}var i,n;var s,o;var f,u;var h,c;var l,p;var d,y;var v,g;var m,w;var B,b;var S,I;var A,k;var C,E;var T,L;var N,R;var _,D,U,P,x,O,z;var M=r.length();while(M>=128){for(_=0;_<16;++_){e[_][0]=r.getInt32()>>>0;e[_][1]=r.getInt32()>>>0}for(;_<80;++_){P=e[_-2];D=P[0];U=P[1];i=((D>>>19|U<<13)^(U>>>29|D<<3)^D>>>6)>>>0;n=((D<<13|U>>>19)^(U<<3|D>>>29)^(D<<26|U>>>6))>>>0;O=e[_-15];D=O[0];U=O[1];s=((D>>>1|U<<31)^(D>>>8|U<<24)^D>>>7)>>>0;o=((D<<31|U>>>1)^(D<<24|U>>>8)^(D<<25|U>>>7))>>>0;x=e[_-7];z=e[_-16];U=n+x[1]+o+z[1];e[_][0]=i+x[0]+s+z[0]+(U/4294967296>>>0)>>>0;e[_][1]=U>>>0}v=t[0][0];g=t[0][1];m=t[1][0];w=t[1][1];B=t[2][0];b=t[2][1];S=t[3][0];I=t[3][1];A=t[4][0];k=t[4][1];C=t[5][0];E=t[5][1];T=t[6][0];L=t[6][1];N=t[7][0];R=t[7][1];for(_=0;_<80;++_){h=((A>>>14|k<<18)^(A>>>18|k<<14)^(k>>>9|A<<23))>>>0;c=((A<<18|k>>>14)^(A<<14|k>>>18)^(k<<23|A>>>9))>>>0;l=(T^A&(C^T))>>>0;p=(L^k&(E^L))>>>0;f=((v>>>28|g<<4)^(g>>>2|v<<30)^(g>>>7|v<<25))>>>0;u=((v<<4|g>>>28)^(g<<30|v>>>2)^(g<<25|v>>>7))>>>0;d=(v&m|B&(v^m))>>>0;y=(g&w|b&(g^w))>>>0;U=R+c+p+a[_][1]+e[_][1];i=N+h+l+a[_][0]+e[_][0]+(U/4294967296>>>0)>>>0;n=U>>>0;U=u+y;s=f+d+(U/4294967296>>>0)>>>0;o=U>>>0;N=T;R=L;T=C;L=E;C=A;E=k;U=I+n;A=S+i+(U/4294967296>>>0)>>>0;k=U>>>0;S=B;I=b;B=m;b=w;m=v;w=g;U=n+o;v=i+s+(U/4294967296>>>0)>>>0;g=U>>>0}U=t[0][1]+g;t[0][0]=t[0][0]+v+(U/4294967296>>>0)>>>0;t[0][1]=U>>>0;U=t[1][1]+w;t[1][0]=t[1][0]+m+(U/4294967296>>>0)>>>0;t[1][1]=U>>>0;U=t[2][1]+b;t[2][0]=t[2][0]+B+(U/4294967296>>>0)>>>0;t[2][1]=U>>>0;U=t[3][1]+I;t[3][0]=t[3][0]+S+(U/4294967296>>>0)>>>0;t[3][1]=U>>>0;U=t[4][1]+k;t[4][0]=t[4][0]+A+(U/4294967296>>>0)>>>0;t[4][1]=U>>>0;U=t[5][1]+E;t[5][0]=t[5][0]+C+(U/4294967296>>>0)>>>0;t[5][1]=U>>>0;U=t[6][1]+L;t[6][0]=t[6][0]+T+(U/4294967296>>>0)>>>0;t[6][1]=U>>>0;U=t[7][1]+R;t[7][0]=t[7][0]+N+(U/4294967296>>>0)>>>0;t[7][1]=U>>>0;M-=128}}}var e="sha512";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){t.md=t.md||{};t.md.algorithms={md5:t.md5,sha1:t.sha1,sha256:t.sha256};t.md.md5=t.md5;t.md.sha1=t.sha1;t.md.sha256=t.sha256}var e="md";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=typeof process!=="undefined"&&process.versions&&process.versions.node;var r=null;if(!t.disableNativeCode&&e&&!process.versions["node-webkit"]){r="";var i=window.wizvera}var n=t.prng=t.prng||{};n.create=function(e){var i={plugin:e,key:null,seed:null,time:null,reseeds:0,generated:0};var n=e.md;var a=new Array(32);for(var s=0;s<32;++s){a[s]=n.create()}i.pools=a;i.pool=0;i.generate=function(e,r){if(!r){return i.generateSync(e)}var n=i.plugin.cipher;var a=i.plugin.increment;var s=i.plugin.formatKey;var f=i.plugin.formatSeed;var u=t.util.createBuffer();i.key=null;h();function h(c){if(c){return r(c)}if(u.length()>=e){return r(null,u.getBytes(e))}if(i.generated>1048575){i.key=null}if(i.key===null){return t.util.nextTick(function(){o(h)})}var l=n(i.key,i.seed);i.generated+=l.length;u.putBytes(l);i.key=s(n(i.key,a(i.seed)));i.seed=f(n(i.key,i.seed));t.util.setImmediate(h)}};i.generateSync=function(e){var r=i.plugin.cipher;var n=i.plugin.increment;var a=i.plugin.formatKey;var s=i.plugin.formatSeed;i.key=null;var o=t.util.createBuffer();while(o.length()<e){if(i.generated>1048575){i.key=null}if(i.key===null){f()}var u=r(i.key,i.seed);i.generated+=u.length;o.putBytes(u);i.key=a(r(i.key,n(i.seed)));i.seed=s(r(i.key,i.seed))}return o.getBytes(e)};function o(t){if(typeof checkIntegrity==="function"){checkIntegrity()}if(i.pools[0].messageLength>=32){u();return t()}var e=32-i.pools[0].messageLength<<5;i.seedFile(e,function(e,r){if(e){return t(e)}i.collect(r);u();t()})}function f(){if(typeof checkIntegrity==="function"){checkIntegrity()}if(i.pools[0].messageLength>=32){return u()}var t=32-i.pools[0].messageLength<<5;i.collect(i.seedFileSync(t));u()}function u(){if(typeof checkIntegrity==="function"){checkIntegrity()}var t=i.plugin.md.create();t.update(i.pools[0].digest().getBytes());i.pools[0].start();var e=1;for(var r=1;r<32;++r){e=e===31?2147483648:e<<2;if(e%i.reseeds===0){t.update(i.pools[r].digest().getBytes());i.pools[r].start()}}var n=t.digest().getBytes();
t.start();t.update(n);var a=t.digest().getBytes();i.key=i.plugin.formatKey(n);i.seed=i.plugin.formatSeed(a);i.reseeds=i.reseeds===4294967295?0:i.reseeds+1;i.generated=0}function h(e){var r=null;if(typeof window!=="undefined"){var i=window.crypto||window.msCrypto;if(i&&i.getRandomValues){r=function(t){return i.getRandomValues(t)}}}var n=t.util.createBuffer();if(r){while(n.length()<e){var a=Math.max(1,Math.min(e-n.length(),65536)/4);var s=new Uint32Array(Math.floor(a));try{r(s);for(var o=0;o<s.length;++o){n.putInt32(s[o])}}catch(f){if(!(typeof QuotaExceededError!=="undefined"&&f instanceof QuotaExceededError)){throw f}}}}if(n.length()<e){var u,h,c;var l=Math.floor(Math.random()*65536);while(n.length()<e){h=16807*(l&65535);u=16807*(l>>16);h+=(u&32767)<<16;h+=u>>15;h=(h&2147483647)+(h>>31);l=h&4294967295;for(var o=0;o<3;++o){c=l>>>(o<<3);c^=Math.floor(Math.random()*256);n.putByte(c&255)}}}return n.getBytes(e)}if(r){i.seedFile=function(t,e){r.randomBytes(t,function(t,r){if(t){return e(t)}e(null,r.toString())})};i.seedFileSync=function(t){return r.randomBytes(t).toString()}}else{i.seedFile=function(t,e){try{e(null,h(t))}catch(r){e(r)}};i.seedFileSync=h}i.collect=function(t){var e=t.length;for(var r=0;r<e;++r){i.pools[i.pool].update(t.substr(r,1));i.pool=i.pool===31?0:i.pool+1}};i.collectInt=function(t,e){var r="";for(var n=0;n<e;n+=8){r+=String.fromCharCode(t>>n&255)}i.collect(r)};i.registerWorker=function(t){if(t===self){i.seedFile=function(t,e){function r(t){var i=t.data;if(i.kryptos&&i.kryptos.prng){self.removeEventListener("message",r);e(i.kryptos.prng.err,i.kryptos.prng.bytes)}}self.addEventListener("message",r);self.postMessage({kryptos:{prng:{needed:t}}})}}else{var e=function(e){var r=e.data;if(r.kryptos&&r.kryptos.prng){i.seedFile(r.kryptos.prng.needed,function(e,r){t.postMessage({kryptos:{prng:{err:e,bytes:r}}})})}};t.addEventListener("message",e)}};return i}}var e="prng";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){if(t.random&&t.random.getBytes){return}(function(e){var r={};var i=new Array(4);var n=t.util.createBuffer();r.formatKey=function(e){var r=t.util.createBuffer(e);e=new Array(4);e[0]=r.getInt32();e[1]=r.getInt32();e[2]=r.getInt32();e[3]=r.getInt32();return t.aes._expandKey(e,false)};r.formatSeed=function(e){var r=t.util.createBuffer(e);e=new Array(4);e[0]=r.getInt32();e[1]=r.getInt32();e[2]=r.getInt32();e[3]=r.getInt32();return e};r.cipher=function(e,r){t.aes._updateBlock(e,r,i,false);n.putInt32(i[0]);n.putInt32(i[1]);n.putInt32(i[2]);n.putInt32(i[3]);return n.getBytes()};r.increment=function(t){++t[3];return t};r.md=t.md.sha256;function a(){var e=t.prng.create(r);e.getBytes=function(t,r){return e.generate(t,r)};e.getBytesSync=function(t){return e.generate(t)};return e}var s=a();var o=typeof process!=="undefined"&&process.versions&&process.versions.node;var f=null;if(typeof window!=="undefined"){var u=window.crypto||window.msCrypto;if(u&&u.getRandomValues){f=function(t){return u.getRandomValues(t)}}}if(t.disableNativeCode||!o&&!f){if(typeof window==="undefined"||window.document===undefined){}s.collectInt(+new Date,32);if(typeof navigator!=="undefined"){var h="";for(var c in navigator){try{if(typeof navigator[c]=="string"){h+=navigator[c]}}catch(l){}}s.collect(h);h=null}if(e){e().mousemove(function(t){s.collectInt(t.clientX,16);s.collectInt(t.clientY,16)});e().keypress(function(t){s.collectInt(t.charCode,8)})}}if(!t.random){t.random=s}else{for(var c in s){t.random[c]=s[c]}}t.random.createInstance=a})(typeof jQuery!=="undefined"?jQuery:null)}var e="random";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){var e=t.pkcs1=t.pkcs1||{};e.encode_rsa_oaep=function(e,i,n){var a;var s;var o;var f;if(typeof n==="string"){a=n;s=arguments[3]||undefined;o=arguments[4]||undefined}else if(n){a=n.label||undefined;s=n.seed||undefined;o=n.md||undefined;if(n.mgf1&&n.mgf1.md){f=n.mgf1.md}}if(!o){o=t.md.sha1.create()}else{o.start()}if(!f){f=o}var u=Math.ceil(e.n.bitLength()/8);var h=u-2*o.digestLength-2;if(i.length>h){var c=new Error("RSAES-OAEP input message length is too long.");c.length=i.length;c.maxLength=h;throw c}if(!a){a=""}o.update(a,"raw");var l=o.digest();var p="";var d=h-i.length;for(var y=0;y<d;y++){p+="\x00"}var v=l.getBytes()+p+""+i;if(!s){s=t.random.getBytes(o.digestLength)}else if(s.length!==o.digestLength){var c=new Error("Invalid RSAES-OAEP seed. The seed length must "+"match the digest length.");c.seedLength=s.length;c.digestLength=o.digestLength;throw c}var g=r(s,u-o.digestLength-1,f);var m=t.util.xorBytes(v,g,v.length);var w=r(m,o.digestLength,f);var B=t.util.xorBytes(s,w,s.length);return"\x00"+B+m};e.decode_rsa_oaep=function(e,i,n){var a;var s;var o;if(typeof n==="string"){a=n;s=arguments[3]||undefined}else if(n){a=n.label||undefined;s=n.md||undefined;if(n.mgf1&&n.mgf1.md){o=n.mgf1.md}}var f=Math.ceil(e.n.bitLength()/8);if(i.length!==f){var u=new Error("RSAES-OAEP encoded message length is invalid.");u.length=i.length;u.expectedLength=f;throw u}if(s===undefined){s=t.md.sha1.create()}else{s.start()}if(!o){o=s}if(f<2*s.digestLength+2){throw new Error("RSAES-OAEP key is too short for the hash function.")}if(!a){a=""}s.update(a,"raw");var h=s.digest().getBytes();var c=i.charAt(0);var l=i.substring(1,s.digestLength+1);var p=i.substring(1+s.digestLength);var d=r(p,s.digestLength,o);var y=t.util.xorBytes(l,d,l.length);var v=r(y,f-s.digestLength-1,o);var g=t.util.xorBytes(p,v,p.length);var m=g.substring(0,s.digestLength);var u=c!=="\x00";for(var w=0;w<s.digestLength;++w){u|=h.charAt(w)!==m.charAt(w)}var B=1;var b=s.digestLength;for(var S=s.digestLength;S<g.length;S++){var I=g.charCodeAt(S);var A=I&1^1;var k=B?65534:0;u|=I&k;B=B&A;b+=B}if(u||g.charCodeAt(b)!==1){throw new Error("Invalid RSAES-OAEP padding.")}return g.substring(b+1)};function r(e,r,i){if(!i){i=t.md.sha1.create()}var n="";var a=Math.ceil(r/i.digestLength);for(var s=0;s<a;++s){var o=String.fromCharCode(s>>24&255,s>>16&255,s>>8&255,s&255);i.start();i.update(e+o);n+=i.digest().getBytes()}return n.substring(0,r)}}var e="pkcs1";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){if(t.prime){return}var e=t.prime=t.prime||{};var r=t.jsbn.BigInteger;var i=[6,4,2,4,2,4,6,2];var n=new r(null);n.fromInt(30);var a=function(t,e){return t|e};e.generateProbablePrime=function(e,r,i){if(typeof r==="function"){i=r;r={}}r=r||{};var n=r.algorithm||"PRIMEINC";if(typeof n==="string"){n={name:n}}n.options=n.options||{};var a=r.prng||t.random;var o={nextBytes:function(t){var e=a.getBytesSync(t.length);for(var r=0;r<t.length;++r){t[r]=e.charCodeAt(r)}}};if(n.name==="PRIMEINC"){return s(e,o,n.options,i)}throw new Error("Invalid prime generation algorithm: "+n.name)};function s(t,e,r,i){if("workers"in r){return f(t,e,r,i)}return o(t,e,r,i)}function o(e,r,n,a){var s=u(e,r);var f=0;var c=h(s.bitLength());if("millerRabinTests"in n){c=n.millerRabinTests}var l=10;if("maxBlockTime"in n){l=n.maxBlockTime}var p=+new Date;do{if(s.bitLength()>e){s=u(e,r)}if(s.isProbablePrime(c)){return a(null,s)}s.dAddOffset(i[f++%8],0)}while(l<0||+new Date-p<l);t.util.setImmediate(function(){o(e,r,n,a)})}function f(e,i,n,a){if(typeof Worker==="undefined"){return o(e,i,n,a)}var s=u(e,i);var f=n.workers;var h=n.workLoad||100;var c=h*30/8;var l=n.workerScript||"kryptos/prime.worker.js";if(f===-1){return t.util.estimateCores(function(t,e){if(t){e=2}f=e-1;p()})}p();function p(){f=Math.max(1,f);var t=[];for(var n=0;n<f;++n){t[n]=new Worker(l)}var o=f;for(var n=0;n<f;++n){t[n].addEventListener("message",d)}var p=false;function d(n){if(p){return}--o;var f=n.data;if(f.found){for(var l=0;l<t.length;++l){t[l].terminate()}p=true;return a(null,new r(f.prime,16))}if(s.bitLength()>e){s=u(e,i)}var d=s.toString(16);n.target.postMessage({hex:d,workLoad:h});s.dAddOffset(c,0)}}}function u(t,e){var i=new r(t,e);var s=t-1;if(!i.testBit(s)){i.bitwiseTo(r.ONE.shiftLeft(s),a,i)}i.dAddOffset(31-i.mod(n).byteValue(),0);return i}function h(t){if(t<=100)return 27;if(t<=150)return 18;if(t<=200)return 15;if(t<=250)return 12;if(t<=300)return 9;if(t<=350)return 8;if(t<=400)return 7;if(t<=500)return 6;if(t<=600)return 5;if(t<=800)return 4;if(t<=1250)return 3;return 2}}var e="prime";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){if(typeof e==="undefined"){var e=t.jsbn.BigInteger}var r=t.asn1;t.pki=t.pki||{};t.pki.rsa=t.rsa=t.rsa||{};var i=t.pki;var n=[6,4,2,4,2,4,6,2];var a={name:"PrivateKeyInfo",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,value:[{name:"PrivateKeyInfo.version",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyVersion"},{name:"PrivateKeyInfo.privateKeyAlgorithm",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:r.Class.UNIVERSAL,type:r.Type.OID,constructed:false,capture:"privateKeyOid"}]},{name:"PrivateKeyInfo",tagClass:r.Class.UNIVERSAL,type:r.Type.OCTETSTRING,constructed:false,capture:"privateKey"}]};var s={name:"RSAPrivateKey",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,value:[{name:"RSAPrivateKey.version",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyVersion"},{name:"RSAPrivateKey.modulus",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyModulus"},{name:"RSAPrivateKey.publicExponent",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyPublicExponent"},{name:"RSAPrivateKey.privateExponent",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyPrivateExponent"},{name:"RSAPrivateKey.prime1",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyPrime1"},{name:"RSAPrivateKey.prime2",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyPrime2"},{name:"RSAPrivateKey.exponent1",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyExponent1"},{name:"RSAPrivateKey.exponent2",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyExponent2"},{name:"RSAPrivateKey.coefficient",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"privateKeyCoefficient"}]};var o={name:"RSAPublicKey",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,value:[{name:"RSAPublicKey.modulus",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"publicKeyModulus"},{name:"RSAPublicKey.exponent",tagClass:r.Class.UNIVERSAL,type:r.Type.INTEGER,constructed:false,capture:"publicKeyExponent"}]};var f=t.pki.rsa.publicKeyValidator={name:"SubjectPublicKeyInfo",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,captureAsn1:"subjectPublicKeyInfo",value:[{name:"SubjectPublicKeyInfo.AlgorithmIdentifier",tagClass:r.Class.UNIVERSAL,type:r.Type.SEQUENCE,constructed:true,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:r.Class.UNIVERSAL,type:r.Type.OID,constructed:false,capture:"publicKeyOid"}]},{name:"SubjectPublicKeyInfo.subjectPublicKey",tagClass:r.Class.UNIVERSAL,type:r.Type.BITSTRING,constructed:false,captureAsn1:"rsaPublicKey"}]};var u=function(t){var e;if(t.algorithm in i.oids){e=i.oids[t.algorithm]}else{var n=new Error("Unknown message digest algorithm.");n.algorithm=t.algorithm;throw n}var a=r.oidToDer(e).getBytes();var s=r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[]);var o=r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[]);o.value.push(r.create(r.Class.UNIVERSAL,r.Type.OID,false,a));o.value.push(r.create(r.Class.UNIVERSAL,r.Type.NULL,false,""));var f=r.create(r.Class.UNIVERSAL,r.Type.OCTETSTRING,false,t.digest().getBytes());s.value.push(o);s.value.push(f);return r.toDer(s).getBytes()};var h=function(r,i,n){if(n){return r.modPow(i.e,i.n)}if(!i.p||!i.q){return r.modPow(i.d,i.n)}if(!i.dP){i.dP=i.d.mod(i.p.subtract(e.ONE))}if(!i.dQ){i.dQ=i.d.mod(i.q.subtract(e.ONE))}if(!i.qInv){i.qInv=i.q.modInverse(i.p)}var a;do{a=new e(t.util.bytesToHex(t.random.getBytes(i.n.bitLength()/8)),16).mod(i.n)}while(a.equals(e.ZERO));r=r.multiply(a.modPow(i.e,i.n)).mod(i.n);var s=r.mod(i.p).modPow(i.dP,i.p);var o=r.mod(i.q).modPow(i.dQ,i.q);while(s.compareTo(o)<0){s=s.add(i.p)}var f=s.subtract(o).multiply(i.qInv).mod(i.p).multiply(i.q).add(o);f=f.multiply(a.modInverse(i.n)).mod(i.n);return f};i.rsa.encrypt=function(r,i,n){var a=n;var s;var o=Math.ceil(i.n.bitLength()/8);if(n!==false&&n!==true){a=n===2;s=c(r,i,n)}else{s=t.util.createBuffer();s.putBytes(r)}var f=new e(s.toHex(),16);var u=h(f,i,a);var l=u.toString(16);var p=t.util.createBuffer();var d=o-Math.ceil(l.length/2);while(d>0){p.putByte(0);--d}p.putBytes(t.util.hexToBytes(l));return p.getBytes()};i.rsa.decrypt=function(r,i,n,a){var s=Math.ceil(i.n.bitLength()/8);if(r.length!==s){var o=new Error("Encrypted message length is invalid.");o.length=r.length;o.expected=s;throw o}var f=new e(t.util.createBuffer(r).toHex(),16);if(f.compareTo(i.n)>=0){throw new Error("Encrypted message is invalid.")}var u=h(f,i,n);var c=u.toString(16);var p=t.util.createBuffer();var d=s-Math.ceil(c.length/2);while(d>0){p.putByte(0);--d}p.putBytes(t.util.hexToBytes(c));if(a!==false){return l(p.getBytes(),i,n)}return p.getBytes()};i.rsa.createKeyPairGenerationState=function(r,i,n){if(typeof r==="string"){r=parseInt(r,10)}r=r||2048;n=n||{};var a=n.prng||t.random;var s={nextBytes:function(t){var e=a.getBytesSync(t.length);for(var r=0;r<t.length;++r){t[r]=e.charCodeAt(r)}}};var o=n.algorithm||"PRIMEINC";var f;if(o==="PRIMEINC"){f={algorithm:o,state:0,bits:r,rng:s,eInt:i||65537,e:new e(null),p:null,q:null,qBits:r>>1,pBits:r-(r>>1),pqState:0,num:null,keys:null};f.e.fromInt(f.eInt)}else{throw new Error("Invalid key generation algorithm: "+o)}return f};i.rsa.stepKeyPairGenerationState=function(t,r){if(!("algorithm"in t)){t.algorithm="PRIMEINC"}var a=new e(null);a.fromInt(30);var s=0;var o=function(t,e){return t|e};var f=+new Date;var u;var h=0;while(t.keys===null&&(r<=0||h<r)){if(t.state===0){var c=t.p===null?t.pBits:t.qBits;var l=c-1;if(t.pqState===0){t.num=new e(c,t.rng);if(!t.num.testBit(l)){t.num.bitwiseTo(e.ONE.shiftLeft(l),o,t.num)}t.num.dAddOffset(31-t.num.mod(a).byteValue(),0);s=0;++t.pqState}else if(t.pqState===1){if(t.num.bitLength()>c){t.pqState=0}else if(t.num.isProbablePrime(y(t.num.bitLength()))){++t.pqState}else{t.num.dAddOffset(n[s++%8],0)}}else if(t.pqState===2){t.pqState=t.num.subtract(e.ONE).gcd(t.e).compareTo(e.ONE)===0?3:0}else if(t.pqState===3){t.pqState=0;if(t.p===null){t.p=t.num}else{t.q=t.num}if(t.p!==null&&t.q!==null){++t.state}t.num=null}}else if(t.state===1){if(t.p.compareTo(t.q)<0){t.num=t.p;t.p=t.q;t.q=t.num}++t.state}else if(t.state===2){t.p1=t.p.subtract(e.ONE);t.q1=t.q.subtract(e.ONE);t.phi=t.p1.multiply(t.q1);++t.state}else if(t.state===3){if(t.phi.gcd(t.e).compareTo(e.ONE)===0){++t.state}else{t.p=null;t.q=null;t.state=0}}else if(t.state===4){t.n=t.p.multiply(t.q);if(t.n.bitLength()===t.bits){++t.state}else{t.q=null;t.state=0}}else if(t.state===5){var p=t.e.modInverse(t.phi);t.keys={privateKey:i.rsa.setPrivateKey(t.n,t.e,p,t.p,t.q,p.mod(t.p1),p.mod(t.q1),t.q.modInverse(t.p)),publicKey:i.rsa.setPublicKey(t.n,t.e)}}u=+new Date;h+=u-f;f=u}return t.keys!==null};i.rsa.generateKeyPair=function(t,e,r,n){if(arguments.length===1){if(typeof t==="object"){r=t;t=undefined}else if(typeof t==="function"){n=t;t=undefined}}else if(arguments.length===2){if(typeof t==="number"){if(typeof e==="function"){n=e;e=undefined}else if(typeof e!=="number"){r=e;e=undefined}}else{r=t;n=e;t=undefined;e=undefined}}else if(arguments.length===3){if(typeof e==="number"){if(typeof r==="function"){n=r;r=undefined}}else{n=r;r=e;e=undefined}}r=r||{};if(t===undefined){t=r.bits||2048}if(e===undefined){e=r.e||65537}var a=i.rsa.createKeyPairGenerationState(t,e,r);if(!n){i.rsa.stepKeyPairGenerationState(a,0);return a.keys}p(a,r,n)};i.setRsaPublicKey=i.rsa.setPublicKey=function(e,n){var a={n:e,e:n};a.encrypt=function(e,r,n){if(typeof r==="string"){r=r.toUpperCase()}else if(r===undefined){r="RSAES-PKCS1-V1_5"}if(r==="RSAES-PKCS1-V1_5"){r={encode:function(t,e,r){return c(t,e,2).getBytes()}}}else if(r==="RSA-OAEP"||r==="RSAES-OAEP"){r={encode:function(e,r){return t.pkcs1.encode_rsa_oaep(r,e,n)}}}else if(t.util.inArray(r,["RAW","NONE","NULL",null])!==-1){r={encode:function(t){return t}}}else if(typeof r==="string"){throw new Error('Unsupported encryption scheme: "'+r+'".')}var s=r.encode(e,a,true);return i.rsa.encrypt(s,a,true)};a.verify=function(t,e,n){if(typeof n==="string"){n=n.toUpperCase()}else if(n===undefined){n="RSASSA-PKCS1-V1_5"}if(n==="RSASSA-PKCS1-V1_5"){n={verify:function(t,e){e=l(e,a,true);var i=r.fromDer(e);return t===i.value[1].value}}}else if(n==="NONE"||n==="NULL"||n===null){n={verify:function(t,e){e=l(e,a,true);return t===e}}}var s=i.rsa.decrypt(e,a,true,false);return n.verify(t,s,a.n.bitLength())};return a};i.setRsaPrivateKey=i.rsa.setPrivateKey=function(e,r,n,a,s,o,f,h){var c={n:e,e:r,d:n,p:a,q:s,dP:o,dQ:f,qInv:h};c.decrypt=function(e,r,n){if(typeof r==="string"){r=r.toUpperCase()}else if(r===undefined){r="RSAES-PKCS1-V1_5"}var a=i.rsa.decrypt(e,c,false,false);if(r==="RSAES-PKCS1-V1_5"){r={decode:l}}else if(r==="RSA-OAEP"||r==="RSAES-OAEP"){r={decode:function(e,r){return t.pkcs1.decode_rsa_oaep(r,e,n)}}}else if(t.util.inArray(r,["RAW","NONE","NULL",null])!==-1){r={decode:function(t){return t}}}else{throw new Error('Unsupported encryption scheme: "'+r+'".')}return r.decode(a,c,false)};c.sign=function(t,e){var r=false;if(typeof e==="string"){e=e.toUpperCase()}if(e===undefined||e==="RSASSA-PKCS1-V1_5"){e={encode:u};r=1}else if(e==="NONE"||e==="NULL"||e===null){e={encode:function(){return t}};r=1}var n=e.encode(t,c.n.bitLength());return i.rsa.encrypt(n,c,r)};return c};i.wrapRsaPrivateKey=function(t){return r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,r.integerToDer(0).getBytes()),r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.OID,false,r.oidToDer(i.oids.rsaEncryption).getBytes()),r.create(r.Class.UNIVERSAL,r.Type.NULL,false,"")]),r.create(r.Class.UNIVERSAL,r.Type.OCTETSTRING,false,r.toDer(t).getBytes())])};i.privateKeyFromAsn1=function(n){var o={};var f=[];if(r.validate(n,a,o,f)){n=r.fromDer(t.util.createBuffer(o.privateKey))}o={};f=[];if(!r.validate(n,s,o,f)){var u=new Error("Cannot read private key. "+"ASN.1 object does not contain an RSAPrivateKey.");u.errors=f;throw u}var h,c,l,p,d,y,v,g;h=t.util.createBuffer(o.privateKeyModulus).toHex();c=t.util.createBuffer(o.privateKeyPublicExponent).toHex();l=t.util.createBuffer(o.privateKeyPrivateExponent).toHex();p=t.util.createBuffer(o.privateKeyPrime1).toHex();d=t.util.createBuffer(o.privateKeyPrime2).toHex();y=t.util.createBuffer(o.privateKeyExponent1).toHex();v=t.util.createBuffer(o.privateKeyExponent2).toHex();g=t.util.createBuffer(o.privateKeyCoefficient).toHex();return i.setRsaPrivateKey(new e(h,16),new e(c,16),new e(l,16),new e(p,16),new e(d,16),new e(y,16),new e(v,16),new e(g,16))};i.privateKeyToAsn1=i.privateKeyToRSAPrivateKey=function(t){return r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,r.integerToDer(0).getBytes()),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.n)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.e)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.d)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.p)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.q)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.dP)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.dQ)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.qInv))])};i.publicKeyFromAsn1=function(n){var a={};var s=[];if(r.validate(n,f,a,s)){var u=r.derToOid(a.publicKeyOid);if(u!==i.oids.rsaEncryption){var h=new Error("Cannot read public key. Unknown OID.");h.oid=u;throw h}var c=t.util.createBuffer(a.rsaPublicKey.value);var l=c.getByte();if(l!==0){throw new Error("rsaPublicKey bitString has unsupported value : "+l)}n=r.fromDer(c.getBytes())}s=[];if(!r.validate(n,o,a,s)){var h=new Error("Cannot read public key. "+"ASN.1 object does not contain an RSAPublicKey.");h.errors=s;throw h}var p=t.util.createBuffer(a.publicKeyModulus).toHex();var d=t.util.createBuffer(a.publicKeyExponent).toHex();return i.setRsaPublicKey(new e(p,16),new e(d,16))};i.publicKeyToAsn1=i.publicKeyToSubjectPublicKeyInfo=function(t){return r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.OID,false,r.oidToDer(i.oids.rsaEncryption).getBytes()),r.create(r.Class.UNIVERSAL,r.Type.NULL,false,"")]),r.create(r.Class.UNIVERSAL,r.Type.BITSTRING,false,[i.publicKeyToRSAPublicKey(t)])])};i.publicKeyToRSAPublicKey=function(t){return r.create(r.Class.UNIVERSAL,r.Type.SEQUENCE,true,[r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.n)),r.create(r.Class.UNIVERSAL,r.Type.INTEGER,false,d(t.e))])};function c(e,r,i){if(typeof checkIntegrity==="function"){checkIntegrity()}var n=t.util.createBuffer();var a=Math.ceil(r.n.bitLength()/8);if(e.length>a-11){var s=new Error("Message is too long for PKCS#1 v1.5 padding.");s.length=e.length;s.max=a-11;throw s}n.putByte(0);n.putByte(i);var o=a-3-e.length;var f;if(i===0||i===1){f=i===0?0:255;for(var u=0;u<o;++u){n.putByte(f)}}else{while(o>0){var h=0;var c=t.random.getBytes(o);for(var u=0;u<o;++u){f=c.charCodeAt(u);if(f===0){++h}else{n.putByte(f)}}o=h}}n.putByte(0);n.putBytes(e);return n}function l(e,r,i,n){if(typeof checkIntegrity==="function"){checkIntegrity()}var a=Math.ceil(r.n.bitLength()/8);var s=t.util.createBuffer(e);var o=s.getByte();var f=s.getByte();if(o!==0||i&&f!==0&&f!==1||!i&&f!=2||i&&f===0&&typeof n==="undefined"){throw new Error("Encryption block is invalid.")}var u=0;if(f===0){u=a-3-n;for(var h=0;h<u;++h){if(s.getByte()!==0){throw new Error("Encryption block is invalid.")}}}else if(f===1){u=0;while(s.length()>1){if(s.getByte()!==255){--s.read;break}++u}}else if(f===2){u=0;while(s.length()>1){if(s.getByte()===0){--s.read;break}++u}}var c=s.getByte();if(c!==0||u!==a-3-s.length()){throw new Error("Encryption block is invalid.")}return s.getBytes()}function p(r,n,a){if(typeof checkIntegrity==="function"){checkIntegrity()}if(typeof n==="function"){a=n;n={}}n=n||{};var s={algorithm:{name:n.algorithm||"PRIMEINC",options:{workers:n.workers||2,workLoad:n.workLoad||100,workerScript:n.workerScript}}};if("prng"in n){s.prng=n.prng}o();function o(){f(r.pBits,function(t,e){if(t){return a(t)}r.p=e;if(r.q!==null){return u(t,r.q)}f(r.qBits,u)})}function f(e,r){t.prime.generateProbablePrime(e,s,r)}function u(t,n){if(t){return a(t)}r.q=n;if(r.p.compareTo(r.q)<0){var s=r.p;r.p=r.q;r.q=s}if(r.p.subtract(e.ONE).gcd(r.e).compareTo(e.ONE)!==0){r.p=null;o();return}if(r.q.subtract(e.ONE).gcd(r.e).compareTo(e.ONE)!==0){r.q=null;f(r.qBits,u);return}r.p1=r.p.subtract(e.ONE);r.q1=r.q.subtract(e.ONE);r.phi=r.p1.multiply(r.q1);if(r.phi.gcd(r.e).compareTo(e.ONE)!==0){r.p=r.q=null;o();return}r.n=r.p.multiply(r.q);if(r.n.bitLength()!==r.bits){r.q=null;f(r.qBits,u);return}var h=r.e.modInverse(r.phi);r.keys={privateKey:i.rsa.setPrivateKey(r.n,r.e,h,r.p,r.q,h.mod(r.p1),h.mod(r.q1),r.q.modInverse(r.p)),publicKey:i.rsa.setPublicKey(r.n,r.e)};a(null,r.keys)}}function d(e){if(typeof checkIntegrity==="function"){checkIntegrity()}var r=e.toString(16);if(r[0]>="8"){r="00"+r}var i=t.util.hexToBytes(r);if(i.length>1&&(i.charCodeAt(0)===0&&(i.charCodeAt(1)&128)===0||i.charCodeAt(0)===255&&(i.charCodeAt(1)&128)===128)){return i.substr(1)}return i}function y(t){if(typeof checkIntegrity==="function"){checkIntegrity()}if(t<=100)return 27;if(t<=150)return 18;if(t<=200)return 15;if(t<=250)return 12;if(t<=300)return 9;if(t<=350)return 8;if(t<=400)return 7;if(t<=500)return 6;if(t<=600)return 5;if(t<=800)return 4;if(t<=1250)return 3;return 2}}var e="rsa";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();(function(){function t(t){(function(t){"";var e=window.wizvera;var e=t.wizvera;var r=e.kryptos;var i=r.pki.rsa;var n=r.util;var a=r.random;var s=r.pki;var o=r.asn1;var f=r.md;var u=r.jsbn.BigInteger;var h=r.cipher;var c={};c.version=1;e.sch=c;var l="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwnmDQR2Fx7KPdfyN+KfP"+"YLpF8uuLclkz6n0maK2FJwD/iYNAmtqn6fVHp1Gg5j7ilHLMl4eOw7K5pDgYnNbC"+"vAJpe4NjG0JdKB1jPg3+aMVx+nGMm5GE6vJEg9J8VxoOiNP9cYIVcRpqMq+atE1v"+"1gmxB/t1sXo4l5XKqAHvaFikKjjQDivg3BDW8d4vlf5FXMZl9yOprf1mpQd6uilT"+"fIJ5Axfy5JaaVXNOCcjhC9H9D3nVdrHygSVITtn1ULfZP0HgPSCiA3OdrcuVHLo3"+"QuiFBi8WfpLuRaMox+CIclRN8t07P3n/WUUTkA0KW0rzjYGAqVT1B0GLOupHfc3x"+"vQIDAQAB";var p=s.publicKeyFromAsn1(o.fromDer(n.decode64(l)));function d(){var t=n.binary.hex.encode(a.getBytesSync(20));return t}function y(){var t=a.getBytesSync(32);return t}function v(t){var e=p.encrypt(t);e=n.encode64(e);return e}function g(t,e,r){var i=f.sha256.create();i.update(t);i.update(e);var n=i.digest();return n.getBytes(r)}function m(t,e){if(t.length!=e.length)return false;for(var r=0;r<t.length;r++){if(t[r]!=e[r])return false}return true}var w={Exception:1,Mac_Verify_Fail:2,Not_Inited:11,Mismatch_Sid:12,No_ExchangedKey:13};function B(t,e){var r={code:t,message:e};return{error:r}}c.create=function(){var t={};t.reset=function(){this.sid=null;this.nonce1=null;this.encNonce1=null};t.init=function(){if(this.sid==null){this.sid=d();this.nonce1=y();this.encNonce1=v(this.nonce1)}var t={sid:this.sid,nonce:this.encNonce1};return{data:t}};t.encrypt=function(t,e,r){if(this.sid==null){return B(w.Not_Inited,"not inited")}if(this.sid!=t){return B(w.Mismatch_Sid,"mismatch sid")}if(e!=null){this.generateKey(e.nonce);if(!this.verifyMac(e.mac)){return B(w.Mac_Verify_Fail,"mac verify fail")}this.keyexchanged=true}if(!this.keyexchanged){return B(w.No_ExchangedKey,"no exchanged key")}var i=this.encryptData(r);var n={data:i};return{data:n}};t.decrypt=function(t,e){if(!this.keyexchanged){return B(w.No_ExchangedKey,"no exchanged key")}var r=n.decodeUtf8(this.decryptData(e));var i={data:r};return{data:i}};t.generateKey=function(t){this.nonce2=n.decode64(t);var e=f.sha256.create();e.update(n.createBuffer(this.nonce1).getBytes());e.update(n.createBuffer(this.nonce2).getBytes());var r=e.digest().getBytes();this.ekey=g("wizvera delfino key 1",r,16);this.dkey=g("wizvera delfino key 2",r,16);this.eiv=g("wizvera delfino iv 1",r,16);this.div=g("wizvera delfino iv 2",r,16)};t.verifyMac=function(t){expectedMac=this.decryptData(t);if(expectedMac.length==0)return false;var e=f.sha256.create();e.update("wizvera delfino mac");e.update(n.createBuffer(this.nonce1).getBytes());calMac=e.digest().getBytes();return m(expectedMac,calMac)};t.encryptData=function(t){var e=h.createCipher("AES-CBC",this.ekey);e.start({iv:this.eiv});e.update(n.createBuffer(t,"utf8"));e.finish();return n.encode64(e.output.getBytes())};t.decryptData=function(t){t=n.decode64(t);var e=h.createDecipher("AES-CBC",this.dkey);e.start({iv:this.div});e.update(n.createBuffer(t));e.finish();return e.output.getBytes()};return t};if(typeof module==="object"&&module.exports){module.exports=c;e.sch=c}})(window)}var e="gen-secure-handler";function r(){if(typeof t!=="function")return;var e={};if(typeof window==="object"){if(typeof window.wizvera==="object"){e=window.wizvera}else{window.wizvera=e}}e.kryptos=e.kryptos||{};t(e.kryptos);return e}var i=r()})();