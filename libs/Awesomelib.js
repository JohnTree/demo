/**
 *
 *
 */

'use strict';
import React from "react";
import Platform from "Platform";
import {PermissionsAndroid} from "react-native";
import CountEmitter from "../src/utils/CountEmitter";
import RNPandora from "react-native-pandora";
import co from "co";

var requestPermission = (permission) => {
    return PermissionsAndroid.request(
        permission
    );
}
var lpt = RNPandora.LocalPersistence;
var _LocalPersistence = {
    //清空本地数据
    clear: () => {
        lpt.clear();
    },
    //清除key
    remove: (key) => {
        lpt.remove(key);
    },
    //写入数据
    pushData: function (key, value) {
        lpt.pushData(key, value);
    },
    //获得数据
    getData: function (key) {
        return new Promise(function (resole, reject) {
            lpt.getData(key, (error, v) => {
                if (error) {
                    reject(error);
                } else {
                    resole(v);
                }
            })
        });
    }
};
///硬件调用工具
var hds = RNPandora.HardwareDrivers
var _HardwareDrivers = {
    deviceToken: function () {
        return new Promise((resole, reject) => {
            hds.deviceToken((error, v) => {
                if (error) {
                    reject(error);
                } else {
                    resole(v);
                }
            });
        });
    }
};
//序列化类
var sll = RNPandora.Serializer;
var _Serializer = {
    rsaSerializer: (params) => {
        return new Promise((resole, reject) => {
            var p = JSON.parse(JSON.stringify(params));
            sll.rsaSerializer(p, (error, v) => {
                if (error) {
                    reject(error);
                } else {
                    resole(v);
                }
            });
        });
    },
    getDHPubMap: () => {
        return new Promise((resole, reject) => {
            sll.getDHPubMap((error, v) => {
                if (error) {
                    reject(error);
                } else {
                    resole(v);
                }
            });
        });
    },
    rsaEncoding: (str) => {
        return new Promise((resole, reject) => {
            sll.rsaEncoding(str, (error, v) => {
                if (error) {
                    reject(error);
                } else {
                    v = v.replace(/\r|\n/g, "");
                    resole(v);
                }
            });
        });
    }, getDHKeyWith: (hd_y) => {
        return new Promise((resole, reject) => {
            sll.getDHKeyWith(hd_y, (error, v) => {
                if (error) {
                    reject(error);
                } else {
                    if (v) {
                        v = v.replace(/\r|\n/g, "");
                    }
                    resole(v);
                }
            });
        });
    }, des3Encoding: (str, key) => {
        return new Promise((resole, reject) => {
            sll.des3Encoding(str, key, (error, v) => {
                if (error) {
                    reject(error);
                } else {
                    if (v) {
                        v = v.replace(/\r|\n/g, "");
                    }
                    resole(v);
                }
            });
        });
    }, des3decoding: (str, key) => {
        console.warn("eeeedddffd"+str)
        return new Promise((resole, reject) => {
            sll.des3decoding(str, key, (error, v) => {
                console.warn("strstrstrstrstr"+str)
                console.warn("eeeeee"+v)
                if (error) {
                    reject(error);
                } else {
                    // console.warn(str, key, v);
                    if (v) {
                        v = v.replace(/\r|\n/g, "");
                    }
                    console.warn("tttttttt"+v);
                    resole(v);
                }
            });
        });
    }
};
var _phone = RNPandora.Phone
var phone = {
    makingCalls: function (phoneNum) {
        _phone.makingCalls(phoneNum)
    },
    phoneBook: function () {
        CountEmitter.emit("popLoading")
        if (Platform.OS === 'android') {
            return requestPermission("android.permission.READ_CONTACTS", "授权").then(result => {
                if (result) {
                    return new Promise((resole, reject) => {
                        _phone.phoneBook((error, v) => {
                            CountEmitter.emit("closeLoading");
                            if (error) {
                                reject(error);
                            } else {
                                let phoneBook = JSON.parse(v);
                                resole(phoneBook.sort((v1, v2) => {
                                    v1.pinyin = Pinyin.getFullChars(v1.name);
                                    v2.pinyin = Pinyin.getFullChars(v2.name);
                                    return v1.pinyin[0] > v2.pinyin[0] ? 1 : -1;
                                }));
                            }
                        })
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        reject({message: "授权失败,请在【设置】-【权限管理】中打开【通讯录】访问权限。"});
                    });
                }
            }).catch(e => {
                return new Promise((resolve, reject) => {
                    reject({message: "授权失败,请在【设置】-【权限管理】中打开【通讯录】访问权限。"});
                });
            })
        } else {
            return new Promise((resole, reject) => {
                _phone.phoneBook((error, v) => {
                    CountEmitter.emit("closeLoading");
                    if (error) {
                        reject(error);
                    } else {
                        let phoneBook = JSON.parse(v);
                        resole(phoneBook.sort((v1, v2) => {
                            v1.pinyin = Pinyin.getFullChars(v1.name);
                            v2.pinyin = Pinyin.getFullChars(v2.name);
                            return v1.pinyin[0] > v2.pinyin[0] ? 1 : -1;
                        }));
                    }
                })
            });
        }
    }
}

//于服务器交换token
var aj = RNPandora.Ajax;

function aja(url, param, imgs, type = "json", desKey) {
    return new Promise((resole, reject) => {
        console.warn("222w2ww");
        if (Array.isArray(imgs)) {
            aj.POSTWITHIMGS(url, param, imgs, (error, v) => {
                CountEmitter.emit("closeLoading");
                console.warn("ccceeedd");
                CountEmitter.emit("closeLoading");
                // CountEmitter.emit("30001");
                if (error) {
                    reject({success: false, error: error, message: "服务器错误"});
                } else {
                    if (v) {
                        console.warn(JSON.stringify(v) + "-----eeees---");
                        //数据不为空
                        if (type == "json") {
                            var resoult = JSON.parse(v);
                            if (typeof resoult == "string") {
                                resoult = JSON.parse(resoult);
                            }
                            if (resoult.success) {
                                console.warn("success");
                                _Serializer.des3decoding(resoult._secureData, desKey).then(str => {
                                    console.warn("EEEEEEE"+str+"___________________________________________")
                                    resole(JSON.parse(str));
                                }).catch(e => {
                                    reject(e);
                                });
                            } else {
                                if (resoult.error == "40000") {
                                    CountEmitter.emit("closeLoading");
                                    CountEmitter.emit("30001");
                                } else {

                                }
                            }
                        }
                    } else {
                        //数据为空
                        reject({success: false, error: "返回数据为空", message: "返回数据为空"});
                    }
                }
            }, (error, v) => {
                CountEmitter.emit("closeLoading");
                reject({error: error, message: v});
            });
        } else {
            // console.warn("111111111ddd");
            aj.POST(url, param, (error, v) => {
                // console.warn("ccceeedd");
                CountEmitter.emit("closeLoading");
                // CountEmitter.emit("30001");
                if (error) {
                    reject({success: false, error: error, message: "服务器错误"});
                } else {
                    if (v) {
                        // console.warn(JSON.stringify(v) + "-----eeees---");
                        //数据不为空
                        if (type == "json") {
                            var resoult = JSON.parse(v);
                            if (typeof resoult == "string") {
                                resoult = JSON.parse(resoult);
                            }
                            if (resoult.success) {
                                console.warn("success");
                                _Serializer.des3decoding(resoult._secureData, desKey).then(str => {
                                    console.warn("DDDDDDDDDDDDDDDDDDDdddd"+str+"___________________________________________")
                                    resole(JSON.parse(str));
                                }).catch(e => {
                                    reject(e);
                                });
                            } else {
                                if (resoult.error == "40000") {
                                    CountEmitter.emit("closeLoading");
                                    CountEmitter.emit("30001");
                                } else {

                                }
                            }
                        }
                    } else {
                        //数据为空
                        reject({success: false, error: "返回数据为空", message: "返回数据为空"});
                    }
                }
            }, (error, v) => {
                CountEmitter.emit("closeLoading");
                console.warn(error);
                reject({error: error, message: v});
            });
        }
    });
}

function ajax(url, param, imgs, type = "json") {
    if (__DEV__) {
        if (/\s/g.test(url)) {
            console.error("URL中有空格。")
        }
    }
    CountEmitter.emit("popLoading");
    for (var i in param) {
        param[i] = "" + param[i];
    }
    var sendParams = JSON.parse(JSON.stringify(param));
    var sendData = {};

    return co(function* () {
        let [saveToken, branchID, DESKey] = yield[_LocalPersistence.getData("token"), _LocalPersistence.getData("BranchID"), _LocalPersistence.getData("DESKey")];
        sendParams.branchId = branchID;
        if (saveToken) {
            sendParams.token = saveToken;
            if (DESKey) {
                // console.warn(DESKey);
                let sendStr = yield _Serializer.des3Encoding(JSON.stringify(sendParams), DESKey);
                sendData._secureData = sendStr;
                sendData.token = saveToken;
                return yield aja(url, sendData, imgs, "json", DESKey);
            } else {
                CountEmitter.emit("closeLoading");
                CountEmitter.emit("30001");
            }
        } else {
            CountEmitter.emit("closeLoading");
            CountEmitter.emit("30001");
        }

    }).catch(console.warn);

}

function getSaveToken() {
    return _LocalPersistence.getData("token");
}


var scode = {
    show: () => {
        return new Promise(function (resole, reject) {
            var sc = RNPandora.ScanCode;
            sc.show((error, v) => {
                if (error) {
                    reject(v)
                } else {
                    resole(v)
                }
            })
        });
    }
}

global.LocalPersistence = _LocalPersistence;
global.Serializer = _Serializer;
global.HardwareDrivers = _HardwareDrivers;
global.ScanCode = scode;
global.Phone = phone;
global.Ajax = ajax;


