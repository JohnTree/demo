/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-02 13:30
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import ModalPicker from "../../view/component/ModalPicker"

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';
import {Button} from "react-native-elements";
import SelectBar from "../../view/component/SelectBar"
import PopupDialog from 'react-native-popup-dialog';
/**
 * @mark 文件内变量
 */
//文件内变量结束

export default class AddBankCard extends React.Component {

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.categoryNo = "";
        this.bankNo = "";
        this.provinceNo = "";
        this.cityNo = "";
        this.state = {
            titleIndex: "00",
            titles: [{
                key: 0,
                titleName: "添加银行卡"
            },
                {
                    key: 1,
                    titleName: "添加对公账户"
                }],

            coporateNo: "",
            coporateAcctName: DataBus.getAndClear("companyName"),
            coporateEnable: false,
            coporateHasBindWarn: false,

            isSelf: true,
            certName: DataBus.getAndClear("certName"),
            certNo: "",
            bankName: "",
            cardNo: "",
            province: "",
            city: "",
            subbranch: "",
            color: Theme.color.vision_main,
            bankEnable: false,
            hasBindWarn: false,
            mctId: DataBus.getAndClear("mctId"),
            popText: "",
            popTexts: "",
            legalIdCard: DataBus.getAndClear("legalIdCard")
        }
    }


    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    titleClick(index) {
        if (index === 0) {
            this.state.titleIndex = "00";
        }
        if (index === 1) {
            this.state.titleIndex = "01";
        }
        this.forceUpdate();
    }

    getCardInfo(cardNo) {
        if (cardNo.length >= 16) {
            Ajax("bankCardController/queryCardByCardNo.do", {cardNo: cardNo}).then(v => {
                console.warn(JSON.stringify(v))
                if (v.success) {
                    this.setState({hasBindWarn: true})
                } else {
                    this.setState({bankEnable: true})
                }
            }).catch(e => {
            });
            Ajax("bankCardController/selfBankCardValidate.do", {cardNo: cardNo}).then(v => {
                if (v.success) {
                    this.setState({isSelf: v.success})
                } else {
                    this.state.popText = "非本行借记卡";
                    this.forceUpdate();
                    this.popupDialog.show();
                }
            }).catch(e => {
                this.state.popText = e.message;
                this.forceUpdate();
                this.popupDialog.show()
            })
        }
    }

    checkNumber(theObj) {
        let reg = /^[0-9]*$/;
        return reg.test(theObj) || theObj === "";
    }


    getCoporateInfo(cardNo) {
        Ajax("bankCardController/queryCardByCardNo.do", {cardNo: cardNo}).then(v => {
            if (v.success) {
                this.setState({coporateHasBindWarn: true})
            } else {
                this.setState({coporateEnable: true})
            }
        }).catch(e => {

        })
    }


    renderOthr() {
        return this.state.isSelf ? null : (
            <View>
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => {
                        Ajax("bankOfDepositController/getBankCategories.do", {}).then(v => {
                            if (v.success) {
                                let arr = v.result.map(item => {
                                    return {
                                        label: item.bankName,
                                        value: item.categoryNo
                                    }
                                });
                                this.Picker.show(arr,
                                    (value, item) => {
                                        this.categoryNo = value;
                                        this.setState({bankName: item.label})
                                    }, arr[0].value
                                )
                            }
                        }).catch(e => {
                        })
                    }}>
                        <View style={styles.item_container}>
                            <Text style={styles.itemTitle}>开户银行</Text>
                            <TextInput placeholder="请选择开户行"
                                       style={styles.input}
                                       value={this.state.bankName}
                                       editable={false}
                            />
                            <FontIcon style={{marginRight: Theme.padding.bsmaller}} icon="youjiantou" size={12}
                                      color={Theme.color.font_assist}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => {
                        Ajax("bankOfDepositController/getProvinces.do", {}).then(v => {
                            if (v.success) {
                                let arr = v.result.map(item => {
                                    return {
                                        label: item.provinceName,
                                        value: item.provinceNo
                                    }
                                });
                                this.Picker.show(arr,
                                    (value, item) => {
                                        this.provinceNo = value;
                                        this.setState({province: item.label})
                                    }, arr[0].value
                                )
                            }
                        }).catch(e => {
                        })
                    }}>
                        <View style={styles.item_container}>
                            <Text style={styles.itemTitle}>开户行-省</Text>
                            <TextInput placeholder="请选择开户行所在省份"
                                       style={styles.input}
                                       value={this.state.province}
                                       editable={false}
                            />
                            <FontIcon style={{marginRight: Theme.padding.bsmaller}} icon="youjiantou" size={12}
                                      color={Theme.color.font_assist}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => {
                        if (this.provinceNo === "") {
                            alert("请先选择省");
                            return;
                        }
                        Ajax("bankOfDepositController/getCitiesByProvince.do", {provinceNo: this.provinceNo}).then(v => {
                            if (v.success) {
                                let arr = v.result.map(item => {
                                    return {
                                        label: item.cityName,
                                        value: item.cityNo
                                    }
                                });
                                this.Picker.show(arr,
                                    (value, item) => {
                                        this.cityNo = value;
                                        this.setState({city: item.label})
                                    }, arr[0].value
                                )
                            }
                        }).catch(e => {

                        })
                    }}>
                        <View style={styles.item_container}>
                            <Text style={styles.itemTitle}>开户行-市</Text>
                            <TextInput placeholder="请选择开户行所在城市"
                                       style={styles.input}
                                       value={this.state.city}
                                       editable={false}
                            />
                            <FontIcon style={{marginRight: Theme.padding.bsmaller}} icon="youjiantou" size={12}
                                      color={Theme.color.font_assist}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => {
                        if (this.cityNo === "" || this.categoryNo === "") {
                            alert("请先选择市及开户行");
                            return;
                        }
                        Ajax("bankOfDepositController/getBankBranchesByCityAndCategory.do", {
                            categoryNo: this.categoryNo,
                            cityNo: this.cityNo
                        }).then(v => {
                            if (v.success) {
                                let arr = v.result.map(item => {
                                    return {
                                        label: item.bankName,
                                        value: item.bankNo
                                    }
                                });
                                this.Picker.show(arr,
                                    (value, item) => {
                                        this.bankNo = value;
                                        this.setState({subbranch: item.label})
                                    }, arr[0].value
                                )
                            }
                        }).catch(e => {
                            console.warn(e.message)
                        })
                    }}>
                        <View style={styles.item_container}>
                            <Text style={styles.itemTitle}>支行名称</Text>
                            <TextInput placeholder="请选择支行"
                                       style={styles.input}
                                       value={this.state.subbranch}
                                       editable={false}
                            />
                            <FontIcon style={{marginRight: Theme.padding.bsmaller}} icon="youjiantou" size={12}
                                      color={Theme.color.font_assist}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    replesePage() {
        if (this.state.titleIndex === '00') {
            return <ScrollView style={styles.mainContainer}>
                <View style={styles.item}>
                    <View style={styles.item_container}>
                        <Text style={styles.itemTitle}>持卡人</Text>
                        <TextInput placeholder="请输入持卡人姓名"
                                   style={styles.input}
                                   value={this.state.certName}
                                   onChangeText={v => {
                                       this.setState({certName: v})
                                   }
                                   }
                        />
                    </View>
                </View>
                {/*<View style={styles.item}>*/}
                {/*<View style={styles.item_container}>*/}
                {/*<Text style={styles.itemTitle}>身份证</Text>*/}
                {/*<TextInput placeholder="请输入持卡人身份证号"*/}
                {/*style={styles.input}*/}
                {/*value={this.state.certNo}*/}
                {/*onChangeText={v => {*/}
                {/*this.setState({certNo: v})*/}
                {/*}*/}
                {/*}*/}
                {/*/>*/}
                {/*</View>*/}
                {/*</View>*/}
                <View style={styles.item}>
                    <View style={styles.item_container}>
                        <Text style={styles.itemTitle}>卡号</Text>
                        <TextInput placeholder="请输入银行卡号"
                                   style={styles.input}
                                   value={this.state.cardNo}
                                   onChangeText={v => {
                                       this.setState({cardNo: v});
                                       {/*this.getCardInfo(v);*/
                                       }
                                   }
                                   }
                        />
                    </View>
                </View>
                {/*{this.renderOthr()}*/}
                <View style={styles.warnLabel}>
                    <FontIcon color="red" size={16} icon="important"/>
                    <Text style={{
                        marginLeft: Theme.padding.less,
                        marginRight: Theme.padding.base,
                        fontSize: Theme.fontSize.lesser
                    }}
                          numberOfLines={0}>{"为保证资金安全，请绑定您本人名下的银行卡作为提现账户"}</Text>
                </View>

                <Button title="确认"
                        onPress={() => {
                            if(this.state.cardNo.length==19){
                            Ajax("bankCardController/selfBankCardValidate.do", {cardNo: this.state.cardNo}).then(v => {
                                if (v.success) {
                                    Ajax("/ConsRegisterController/mctByCmgRegister.do", {
                                        certName: this.state.certName,
                                        certNo: this.state.legalIdCard,
                                        bankNo: this.bankNo,
                                        cardNo: this.state.cardNo,
                                        cardProvice: this.state.province,
                                        cardCity: this.state.city,
                                        subbranch: this.state.subbranch,
                                        acctCardType: "c",
                                        mctAppStatus: "02",
                                        ...this.props.parms
                                    }, this.props.files).then(v => {
                                        if (v.success) {
                                            CountEmitter.emit("addStorepage", "");
                                            this.state.popTexts = v.message;
                                            this.forceUpdate();
                                            this.popupDialogs.show()
                                        } else {
                                            this.state.popText = v.message;
                                            this.forceUpdate();
                                            this.popupDialog.show()
                                        }
                                    }).catch(e => {
                                        this.state.popText = e.message;
                                        this.forceUpdate();
                                        this.popupDialog.show()
                                    })
                                } else {
                                    this.state.popText = "非本行借记卡";
                                    this.forceUpdate();
                                    this.popupDialog.show();
                                }
                            }).catch(e => {
                                this.state.popText = e.message;
                                this.forceUpdate();
                                this.popupDialog.show()
                            })
                            }else{
                                this.state.popText = "您输入的银行卡号格式不正确";
                                this.forceUpdate();
                                this.popupDialog.show()
                            }
                        }}
                        disabled={!(this.state.certName !== "" && this.state.cardNo !== "")}
                        disabledStyle={{backgroundColor: "#CCCCCC"}}
                        buttonStyle={{
                            marginTop: Theme.padding.max,
                            borderRadius: Theme.padding.smaller,
                            backgroundColor: Theme.color.vision_main
                        }}/>
                <ModalPicker ref={(o) => {
                    this.Picker = o
                }}/>
            </ScrollView>
        } else {
            return <ScrollView style={styles.mainContainer}>
                <View style={styles.item}>
                    <View style={styles.item_container}>
                        <Text style={styles.itemTitle}>账户号</Text>
                        <TextInput placeholder="请输入银行账户号"
                                   style={styles.input}
                                   value={this.state.coporateNo}
                                   onChangeText={v => {
                                       this.setState({coporateNo: v});
                                       {/*this.getCoporateInfo(v)*/
                                       }
                                   }
                                   }
                        />
                    </View>
                </View>
                {/*{this.state.coporateHasBindWarn ? <View style={styles.warnLabel}>*/}
                {/*<FontIcon color="red" size={16} icon="important"/>*/}
                {/*<Text style={{*/}
                {/*marginLeft: Theme.padding.less,*/}
                {/*marginRight: Theme.padding.base,*/}
                {/*fontSize: Theme.fontSize.lesser*/}
                {/*}}*/}
                {/*numberOfLines={0}>"该银行卡已被绑定" </Text>*/}
                {/*</View> : null}*/}
                <View style={styles.item}>
                    <View style={styles.item_container}>
                        <Text style={styles.itemTitle}>账户名</Text>
                        <TextInput placeholder="请输入银行账户名"
                                   style={styles.input}
                                   value={this.state.coporateAcctName}
                                   onChangeText={v => {
                                       this.setState({coporateAcctName: v});
                                   }
                                   }
                        />
                    </View>
                </View>
                <Button title="确认"
                        onPress={() => {
                            console.warn("pppppp" + JSON.stringify(this.props.files));
                            if (this.state.coporateNo.length < 6) {
                                this.state.popText = "您输入的账户号格式不对";
                                this.forceUpdate();
                                this.popupDialog.show()
                            } else {
                                Ajax("bankCardController/queryCardByCardNo.do", {cardNo: this.state.coporateNo}).then(v => {
                                    if (v.success) {
                                        this.state.popText = "账户号已经绑定，请重新输入";
                                        this.forceUpdate();
                                        this.popupDialog.show()
                                    } else {
                                        Ajax("/ConsRegisterController/mctByCmgRegister.do", {
                                            cardNo: this.state.coporateNo,
                                            bankAcctName: this.state.coporateAcctName,
                                            acctCardType: "z",
                                            mctAppStatus: "02",
                                            ...this.props.parms
                                        }, this.props.files).then(v => {
                                            if (v.success) {
                                                console.warn("================"+JSON.stringify(v));
                                                CountEmitter.emit("addStorepage", "");
                                                this.state.popTexts = v.message;
                                                this.forceUpdate();
                                                this.popupDialogs.show()
                                            } else {
                                                this.state.popText = v.message;
                                                this.forceUpdate();
                                                this.popupDialog.show()
                                            }
                                        }).catch(e => {
                                            this.state.popText = e.message;
                                            this.forceUpdate();
                                            this.popupDialog.show()
                                        })
                                    }
                                }).catch(e => {
                                    this.state.popText = e.message;
                                    this.forceUpdate();
                                    this.popupDialog.show()
                                })
                            }
                        }}
                        disabled={!(this.state.coporateNo !== "" && this.state.coporateAcctName !== "") }
                        disabledStyle={{backgroundColor: "#CCCCCC"}}
                        buttonStyle={{
                            marginTop: Theme.padding.max,
                            borderRadius: Theme.padding.smaller,
                            backgroundColor: Theme.color.vision_main
                        }}/>
                <ModalPicker ref={(o) => {
                    this.Picker = o
                }}/>
            </ScrollView>
        }
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.AddBankCard}>
            <SelectBar titles={this.state.titles} column={2} color="transparent" onClick={this.titleClick.bind(this)}/>
            {this.replesePage()}
            <PopupDialog
                width={Theme.size.width * 0.6}
                height={100}
                ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}>
                <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{
                        height: 60,
                        textAlign: "center",
                        fontSize: Theme.fontSize.max,
                        padding: Theme.padding.less,
                        borderBottomWidth: Theme.pixel,
                        borderColor: Theme.color.line_horizontal,
                        paddingTop: 10,
                        width: Theme.size.width * 0.6
                    }}>{this.state.popText}</Text>
                    <TouchableOpacity style={{
                        height: 40, alignItems: "center", justifyContent: "center"
                    }} onPress={() => {
                        this.popupDialog.dismiss()
                    } }>
                        <Text style={{
                            textAlign: "center",
                            fontSize: Theme.padding.base,
                            color: "#58BDC5",
                            width: Theme.size.width * 0.6
                        }}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupDialog>
            <PopupDialog
                width={Theme.size.width * 0.6}
                height={100}
                ref={(popupDialogs) => {
                    this.popupDialogs = popupDialogs;
                }}>
                <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{
                        height: 60,
                        textAlign: "center",
                        fontSize: Theme.fontSize.max,
                        padding: Theme.padding.less,
                        borderBottomWidth: Theme.pixel,
                        borderColor: Theme.color.line_horizontal,
                        paddingTop: 10,
                        width: Theme.size.width * 0.6
                    }}>{this.state.popTexts}</Text>
                    <TouchableOpacity style={{
                        height: 40, alignItems: "center", justifyContent: "center"
                    }} onPress={() => {
                        this.popupDialogs.dismiss()
                        Actions.popTo("businessManagement");
                    } }>
                        <Text style={{
                            textAlign: "center",
                            fontSize: Theme.padding.base,
                            color: "#58BDC5",
                            width: Theme.size.width * 0.6
                        }}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupDialog>
        </View>
    }

}

//@mark style
const styles = StyleSheet.create({
    AddBankCard: {
        flex: 1,
        backgroundColor: Theme.color.background,
        marginTop: Theme.navigationBar.barHeight
    },
    mainContainer: {
        flex: 1,
        marginTop: 10
    },
    item: {},
    item_container: {
        backgroundColor: Theme.color.view_Background,
        marginBottom: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    itemTitle: {
        fontSize: Theme.fontSize.larger,
        color: Theme.color.font_classify,
        margin: Theme.padding.base,
        width: 70
    },
    input: {
        marginRight: Theme.padding.base,
        flex: 1,
        fontSize: Theme.fontSize.larger
    },
    warnLabel: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Theme.padding.base,
        marginRight: Theme.padding.base,
        marginTop: Theme.padding.less,
        marginBottom: Theme.padding.less,
    },
    vcb: {
        borderRadius: Theme.padding.smaller,
        borderWidth: 1,
        justifyContent: "center",
        marginRight: Theme.padding.base,
        overflow: "hidden"
    },
    vcbt: {
        fontSize: Theme.fontSize.lesser,
        padding: Theme.padding.smaller,
        textAlign: "center"
    }
});
