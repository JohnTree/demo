/**
 *   创建人：wangshiyang
 *   创建时间：2017-03-02 14:50
 *   简介：店铺认证
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React from "react";
import {Button} from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";

import {Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";

/**
 * @mark 文件内变量
 */
const buttons = ['取消', '拍照', '相册选取'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const ID_CARD_FACE = {
    FACE: "正面",
    BK_FACE: "反面",
    BS: "营业执照",
    SHOP_FACE: "店铺外部",
    SHOP_BACK: "店铺内部"
}
//文件内变量结束

export default class StoreCertification extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {}

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {}

    /**
     * @mark state
     */
    state = {
        modalVisible: false,
        modalVisibleOne: false,
        modalVisibleShop: false,//显示门店规范
        hide: true,
        idCardPath: null,//法人身份证正面图片
        idCardBackPath: null,//法人身份证反面图片
        bsPath: null,//营业执照图片
        shopFacePath: null,//门店内部照片
        shopBackPath: null,//门店外部照片
        mime: '',
        currentSelectTitle: "",
        currentSelectState: ID_CARD_FACE.FACE,
        phoneNo: '',//客户手机号
        mctName: '',//商户名
        sTypeCode: '',//经营类别编码
        province: '',//省
        city: '',//市
        taId: '',//商圈
        area: '',//区
        address: '请选择',//地址
        lng: '',//经度
        lat: '',//纬度
        mctTel: '',//门店电话
        parentSTypeCode: '',//父类经营类别编码
        companyName: '', //工商注册名称
        licenseNo: '', //营业执照号
        legalName: '',//法人名
        mobilNo: '',//法人手机号
        legalIdCard: '',//法人身份证号

        sTypeText: '请选择',
        taText: '请选择'

    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.adressRelps = this.adressRelps.bind(this)
        this.taresple = this.taresple.bind(this)
        this.sypeCodeRelpse = this.sypeCodeRelpse.bind(this)
        CountEmitter.on("addressmap", this.adressRelps)
        CountEmitter.on("taSelect", this.taresple)
        CountEmitter.on("stpyeCcodeSelect", this.sypeCodeRelpse)
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
        CountEmitter.removeListener("addressmap", this.adressRelps);
        CountEmitter.removeListener("taSelect", this.taresple);
        CountEmitter.removeListener("stpyeCcodeSelect", this.sypeCodeRelpse);
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    showModal() {
        this.setState({
            modalVisible: true
        })
    }

    showModalOne() {
        this.setState({
            modalVisibleOne: true
        })
    }

    showModalShop() {
        this.setState({
            modalVisibleShop: true
        })
    }

    onRequestClose() {
        this.setState({
            modalVisible: flase
        })
    }

    onRequestCloseOne() {
        this.setState({
            modalVisibleOne: flase
        })
    }

    onRequestCloseShop() {
        this.setState({
            modalVisibleShop: flase
        })
    }

    adressRelps() {
        this.setState({lat: DataBus.getAndClear("lat")})
        this.setState({lng: DataBus.getAndClear("lng")})
        this.setState({address: DataBus.getAndClear("address")})
    }

    taresple() {
        this.setState({city: DataBus.getAndClear("cityId")})
        this.setState({area: DataBus.getAndClear("areaId")})
        this.setState({taId: DataBus.getAndClear("taId")})
        var text = DataBus.getAndClear("cityName") + " " + DataBus.getAndClear("areaName") + " " + DataBus.getAndClear("taName")
        this.setState({taText: text})
        console.warn(text)
    }

    sypeCodeRelpse() {
        this.setState({
            parentSTypeCode: DataBus.getAndClear("parentSTypeCode"),
            sTypeCode: DataBus.getAndClear("sTypeCode"),
            sTypeText: DataBus.getAndClear("sTypeText")
        })
        console.warn(this.state.sTypeText)
    }

    sTypeCodeClick() {
        Actions.stypeCodePage();
    }


    adressClick() {
        Actions.adressMap();
    }

    taClick() {
        DataBus.set("update", false);
        Actions.citySelectPage();
    }

    //下一步点击事件
    handerNextClick() {
        var message = ''
        if (this.state.mctName == null || this.state.mctName.trim() == '') {
            message = "请填写门店名称";
            Alert.alert(message)
            return;
        }
        if (this.state.phoneNo == null || this.state.phoneNo.trim() == '') {
            message = "请填写手机号";
            Alert.alert(message)
            return;
        }
        if (this.state.sTypeCode == null || this.state.sTypeCode.trim() == '') {
            message = "请选择主营品类";
            Alert.alert(message)
            return;
        }
        if (this.state.taText == '请选择') {
            message = "请选择所在商圈";
            Alert.alert(message)
            return;
        }
        if (this.state.address == '请选择') {
            message = "请选择详细地址";
            Alert.alert(message)
            return;
        }
        if (this.state.companyName == null || this.state.companyName.trim() == '') {
            message = "请填写营业工商注册名称";
            Alert.alert(message)
            return;
        }
        if (this.state.licenseNo == null || this.state.licenseNo.trim() == '') {
            message = "请填写营业执照注册号";
            Alert.alert(message)
            return;
        }
        if (this.state.bsPath == null || this.state.bsPath.trim() == '') {
            message = "请上传营业执照照片";
            Alert.alert(message)
            return;
        }
        if (this.state.legalName == null || this.state.legalName.trim() == '') {
            message = "请填写法人姓名";
            Alert.alert(message)
            return;
        }
        if (this.state.legalIdCard == null || this.state.legalIdCard.trim() == '') {
            message = "请填写法人身份证号";
            Alert.alert(message)
            return;
        }
        if (this.state.legalIdCard.length !== 15 && this.state.legalIdCard.length !== 18) {
            message = "请输入的身份证号格式不对";
            Alert.alert(message)
            return;
        }
        if (this.state.idCardPath == null || this.state.idCardPath.trim() == '') {
            message = "请上传法人身份证正面照片";
            Alert.alert(message)
            return;
        }
        if (this.state.idCardBackPath == null || this.state.idCardBackPath.trim() == '') {
            message = "请上传法人身份证反面照片";
            Alert.alert(message)
            return;
        }
        if (this.state.shopFacePath == null || this.state.shopFacePath.trim() == '') {
            message = "请上传门店外部照片";
            Alert.alert(message)
            return;
        }
        if (this.state.shopBackPath == null || this.state.shopBackPath.trim() == '') {
            message = "请上传门店内部照片";
            Alert.alert(message)
            return;
        }
        let files = [{"name": "LicFile", "path": this.state.bsPath, mime: this.state.mime},
            {"name": "legalIdCardFaceFile", "path": this.state.idCardPath, mime: this.state.mime},
            {"name": "legalIdCardBackFile", "path": this.state.idCardBackPath, mime: this.state.mime},
            {"name": "doorPicFile", "path": this.state.shopFacePath, mime: this.state.mime},
            {"name": "insidePicFile", "path": this.state.shopBackPath, mime: this.state.mime}];
        let parms = {
            mctName: this.state.mctName,
            phoneNo: this.state.phoneNo,
            parentSTypeCode: this.state.parentSTypeCode,
            sTypeCode: this.state.sTypeCode,
            city: this.state.city,
            area: this.state.area,
            taId: this.state.taId,
            address: this.state.address,
            lng: this.state.lng,
            lat: this.state.lat,
            mctTel: this.state.mctTel,
            licenseNo: this.state.licenseNo,
            companyName: this.state.companyName,
            legalName: this.state.legalName,
            legalIdCard: this.state.legalIdCard,
            cmgId: "",
            shopFacePath: this.state.shopFacePath,
            shopBackPath: this.state.shopBackPath
        };
        LocalPersistence.getData("cmgId").then(cmgId => {
            parms.cmgId = cmgId;
            DataBus.set("companyName", parms.companyName)
            DataBus.set("certName", parms.legalName)
            DataBus.set("legalIdCard", parms.legalIdCard)
            console.warn(JSON.stringify(parms) + "55555555");
            Actions.addBankCardRegister({parms: parms, files: files});
        })
        // Ajax("ConsRegisterController/validateLicAndIdCard.do", {
        //     licenseNo:this.state.licenseNo,
        //     legalName:this.state.legalName,
        //     mobilNo:this.state.phoneNo,
        //     legalIdCard:this.state.legalIdCard
        // }, files).then(v => {
        //     if (v.success) {
        //         let parms = {
        //             mctName: this.state.mctName,
        //             phoneNo: this.state.phoneNo,
        //             parentSTypeCode: this.state.parentSTypeCode,
        //             sTypeCode: this.state.sTypeCode,
        //             city: this.state.city,
        //             area: this.state.area,
        //             taId: this.state.taId,
        //             address: this.state.address,
        //             lng: this.state.lng,
        //             lat: this.state.lat,
        //             mctTel: this.state.mctTel,
        //             licenseNo: this.state.licenseNo,
        //             legalName: this.state.legalName,
        //             legalIdCard: this.state.legalIdCard,
        //             cmgId: "",
        //             shopFacePath:this.state.shopFacePath,
        //             shopBackPath:this.state.shopBackPath
        //         };
        //         LocalPersistence.getData("cmgId").then(cmgId => {
        //             parms.cmgId=cmgId;
        //             DataBus.set("legalIdCard",parms.legalIdCard)
        //             console.warn( JSON.stringify(parms)+"55555555");
        //             Actions.addBankCardRegister({parms: parms,files:files});
        //         })
        //
        //     } else {
        //         require('Alert').alert('验证失败', v.message);
        //     }
        // }).catch(e => {
        // });
    }


    //身份证反面点击事件
    handerIdCardBackClick(id) {
        switch (id) {
            case ID_CARD_FACE.FACE:
                this.setState({
                        currentSelectState: id,
                        currentSelectTitle: "选取身份证正面照片"
                    },
                    () => {
                        this.ActionSheet.show();
                    });
                break;
            case ID_CARD_FACE.BK_FACE:
                this.setState({
                        currentSelectState: id,
                        currentSelectTitle: "选取身份证反面照片"
                    },
                    () => {
                        this.ActionSheet.show();
                    });
                break;
            case ID_CARD_FACE.BS:
                this.setState({
                        currentSelectState: id,
                        currentSelectTitle: "选取营业执照照片"
                    },
                    () => {
                        this.ActionSheet.show();
                    });
                break;
            case ID_CARD_FACE.SHOP_FACE:
                this.setState({
                        currentSelectState: id,
                        currentSelectTitle: "选取店铺外部照片"
                    },
                    () => {
                        this.ActionSheet.show();
                    });
                break;
            case ID_CARD_FACE.SHOP_BACK:
                this.setState({
                        currentSelectState: id,
                        currentSelectTitle: "选取店铺内部照片"
                    },
                    () => {
                        this.ActionSheet.show();
                    });
                break;
        }
    }

    _handlePress(index) {
        if (index != 1 && index != 2) {
            return;
        }
        let method = "cancel";
        index === 1 && (method = "openCamera");
        index === 2 && (method = "openPicker");
        ImagePicker[method]({
            cropping: false,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
        }).then(image => {
            var nState = {};
            if (this.state.currentSelectState == ID_CARD_FACE.FACE) {
                nState.idCardPath = image.path;
                nState.mine = image.mine;
            } else if (this.state.currentSelectState == ID_CARD_FACE.BK_FACE) {
                nState.idCardBackPath = image.path;
                nState.mine = image.mine;
            } else if (this.state.currentSelectState == ID_CARD_FACE.BS) {
                nState.bsPath = image.path;
                nState.mine = image.mine;
            } else if (this.state.currentSelectState == ID_CARD_FACE.SHOP_FACE) {
                nState.shopFacePath = image.path;
                nState.mine = image.mine;
            } else if (this.state.currentSelectState == ID_CARD_FACE.SHOP_BACK) {
                nState.shopBackPath = image.path;
                nState.mine = image.mine;
            }
            this.setState(nState);
        }).catch(e => {
            // console.warn(e);
        });
    }

    //身份证反面判断
    replaceView(text, icon, id) {
        var selectFace;
        switch (id) {
            case ID_CARD_FACE.FACE:
                selectFace = "idCardPath"
                break;
            case ID_CARD_FACE.BK_FACE:
                selectFace = "idCardBackPath"
                break;
            case ID_CARD_FACE.BS:
                selectFace = "bsPath"
                break;
            case ID_CARD_FACE.SHOP_FACE:
                selectFace = "shopFacePath"
                break;
            case ID_CARD_FACE.SHOP_BACK:
                selectFace = "shopBackPath"
                break;
        }
        if (this.state[selectFace] != null) {
            return <View style={{}}><Image
                style={{
                    width: Theme.size.width - Theme.padding.base * 2,
                    height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
                    resizeMode: "stretch"
                }}
                source={{uri: this.state[selectFace]}}/>
            </View>
        } else {
            return <View style={{alignItems: "center"}}>
                <FontIcon size={90} icon={icon}
                          style={[{color: Theme.color.font_assist}]}/>
                <Text style={{fontSize: Theme.fontSize.larger, color: Theme.color.font_assist, marginTop: 5}}>
                    {text}
                </Text>
            </View>
        }
    }

    renderIdCard(text, icon, id) {
        return <TouchableHighlight underlayColor='transparent'
                                   onPress={this.handerIdCardBackClick.bind(this, id)}>
            <View style={{
                borderWidth: Theme.pixel * 2,
                justifyContent: "center",
                borderColor: Theme.color.font_assist, padding: 5, borderRadius: Theme.size.radius,
                borderStyle: "dashed", alignItems: "center", marginLeft: 20, marginTop: 10,
                margin: Theme.padding.base,
                width: Theme.size.width - 2 * Theme.padding.base,
                height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
            }}>
                {this.replaceView(text, icon, id)}
            </View>
        </TouchableHighlight>
    }


    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return (
            <View style={{
                width: Theme.size.width,
                height: Theme.size.height + 50,
            }}>
                <ScrollView style={styles.StoreCertification}>
                    <View style={styles.center}>
                        <Text style={{
                            fontSize: Theme.fontSize.larger,
                            color: "#999999",
                            marginLeft: 10,
                            marginBottom: 10
                        }}>
                            基本信息
                        </Text >
                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitle}>
                                门店名称
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入门店名称"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.mctName}
                                       onChangeText={(mctNameValue) => {
                                           this.setState({mctName: mctNameValue});
                                       }}/>
                        </View>

                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitle}>
                                手机号
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入入驻商户的手机号"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.phoneNo}
                                       onChangeText={(phoneNoValue) => {
                                           this.setState({phoneNo: phoneNoValue});
                                       }}/>
                        </View>

                        <View style={[styles.itemInput, {justifyContent: 'space-between'}]}>
                            <View>
                                <Text style={{
                                    marginTop: 15,
                                    marginBottom: 15,
                                    color: Theme.color.font_classify,
                                    fontSize: Theme.fontSize.max
                                }}>
                                    主营品类
                                </Text >
                            </View>
                            <TouchableHighlight underlayColor='transparent' onPress={() => this.sTypeCodeClick()}>
                                <View style={{alignItems: "center", flexDirection: 'row', marginRight: 10}}>
                                    <Text style={{color: "#999999"}}>
                                        {this.state.sTypeText}
                                    </Text>
                                    <FontIcon size={10} icon={ "youjiantou"}
                                              style={[{color: Theme.color.font_classify, marginTop: 2}]}/>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={[styles.itemInput, {justifyContent: 'space-between'}]}>
                            <View>
                                <Text style={{
                                    marginTop: 15,
                                    marginBottom: 15,
                                    color: Theme.color.font_classify,
                                    fontSize: Theme.fontSize.max
                                }}>
                                    所在商圈
                                </Text >
                            </View>
                            <TouchableHighlight underlayColor='transparent' onPress={() => this.taClick()}>
                                <View style={{alignItems: "center", flexDirection: 'row', marginRight: 10}}>
                                    <Text style={{color: "#999999"}}>
                                        {this.state.taText}
                                    </Text>
                                    <FontIcon size={10} icon={ "youjiantou"}
                                              style={[{color: Theme.color.font_classify, marginTop: 2}]}/>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={[styles.itemInput, {justifyContent: 'space-between'}]}>
                            <View>
                                <Text style={{
                                    marginTop: 15,
                                    marginBottom: 15,
                                    color: Theme.color.font_classify,
                                    fontSize: Theme.fontSize.max
                                }}>
                                    详细地址
                                </Text >
                            </View>
                            <TouchableHighlight underlayColor='transparent' onPress={() => this.adressClick()}>
                                <View style={{alignItems: "center", flexDirection: 'row', marginRight: 10}}>
                                    <Text style={{color: "#999999"}}>
                                        {this.state.address}
                                    </Text>
                                    <FontIcon size={10} icon={ "youjiantou"}
                                              style={[{color: Theme.color.font_classify, marginTop: 2}]}/>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitle}>
                                门店电话
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入门店电话(非必填)"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.mctTel }
                                       onChangeText={(mctTelValue) => {
                                           this.setState({mctTel: mctTelValue});
                                       }}/>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{
                                color: Theme.color.font_classify,
                                fontSize: 13,
                                marginLeft: 17,
                                marginTop: 5,
                                marginBottom: 5
                            }}>
                                上传门店照片
                            </Text>
                            <TouchableHighlight onPress={() => this.showModalShop()}>
                                <View style={{marginTop: 5, marginBottom: 5, marginRight: 17}}>
                                    <Text style={{color: Theme.color.gradual_blue1, fontSize: 13}}>
                                        查看要求</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff",
                            padding: 10
                        }}>
                            {this.renderIdCard("点击上传门店外部照片", "yingyezhizhao", ID_CARD_FACE.SHOP_FACE)}
                            {this.renderIdCard("点击上传门店内部照片", "shenfenzhengfanmian", ID_CARD_FACE.SHOP_BACK)}
                        </View>


                        <Text style={{
                            fontSize: Theme.fontSize.larger,
                            color: "#999999",
                            marginLeft: 10,
                            marginBottom: 10,
                            marginTop: 10
                        }}>
                            资质信息
                        </Text >

                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitles}>
                                工商注册名称
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入工商注册名称"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.companyName}
                                       onChangeText={(companyNameValue) => {
                                           this.setState({companyName: companyNameValue});
                                       }}/>
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitles}>
                                营业执照编号
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入营业执照注册号"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.licenseNo}
                                       onChangeText={(licenseNoValue) => {
                                           this.setState({licenseNo: licenseNoValue});
                                       }}/>
                        </View>


                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{
                                color: Theme.color.font_classify,
                                fontSize: 13,
                                marginLeft: 17,
                                marginTop: 5,
                                marginBottom: 5
                            }}>
                                上传营业执照</Text>
                            <TouchableHighlight onPress={() => this.showModalOne()}>
                                <View style={{marginTop: 5, marginBottom: 5, marginRight: 17}}>
                                    <Text style={{color: Theme.color.gradual_blue1, fontSize: 13}}>
                                        查看要求</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff",
                            padding: 10
                        }}>
                            {this.renderIdCard("点击上传营业执照", "yingyezhizhao", ID_CARD_FACE.BS)}
                        </View>
                        <Text style={{
                            fontSize: Theme.fontSize.larger,
                            color: "#999999",
                            marginLeft: 10,
                            marginBottom: 10,
                            marginTop: 10
                        }}>
                            法人信息
                        </Text >

                        <View style={styles.itemInput}>
                            <Text style={styles.itemTitle}>
                                法人姓名
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入法人姓名"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.legalName }
                                       onChangeText={(legalNameValue) => {
                                           this.setState({legalName: legalNameValue});
                                       }}/>
                        </View>

                        <View style={styles.itemInput}>
                            <Text style={{
                                width: 100, color: Theme.color.font_classify,
                                fontSize: Theme.fontSize.max
                            }}>
                                法人身份证号
                            </Text >
                            <TextInput style={styles.textInput} placeholder="请输入法人身份证号"
                                       placeholderTextColor={"#dfdfdf"}
                                       value={this.state.legalIdCard}
                                       onChangeText={(legalIdCardValue) => {
                                           this.setState({legalIdCard: legalIdCardValue});
                                       }}/>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{
                                color: Theme.color.font_classify,
                                fontSize: 13,
                                marginLeft: 17,
                                marginTop: 5,
                                marginBottom: 5
                            }}>
                                上传身份证照片</Text>
                            <TouchableHighlight onPress={() => this.showModal()}>
                                <View style={{marginTop: 5, marginBottom: 5, marginRight: 17}}>
                                    <Text style={{color: Theme.color.gradual_blue1, fontSize: 13}}>
                                        查看要求</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ffffff",
                            padding: 10
                        }}>
                            {this.renderIdCard("点击上传身份证正面", "shenfenzhengzhengmian", ID_CARD_FACE.FACE)}
                            {this.renderIdCard("点击上传身份证反面", "shenfenzhengfanmian", ID_CARD_FACE.BK_FACE)}
                        </View>

                        <Button
                            fontSize={Theme.fontSize.max}
                            buttonStyle={styles.regBtn}
                            onPress={this.handerNextClick.bind(this)}
                            title='下一步'
                        />

                        <ActionSheet
                            ref={(o) => this.ActionSheet = o}
                            title={this.state.currentSelectTitle}
                            options={buttons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handlePress.bind(this)}
                        />
                    </View>
                </ScrollView>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    transparent={true}
                    onRequestClose={() => this.onRequestClose()}
                >
                    <View style={{
                        width: Theme.size.width,
                        height: Theme.size.height,
                        backgroundColor: 'rgba(0,0,0, 0.8)',
                        alignItems: "center",
                    }}>
                        <Text style={{color: "#fff", fontSize: 14, paddingLeft: 20, paddingRight: 20, paddingTop: 40}}>
                            您可以通过手机拍摄身份证或者从相册中选取身份证照片上传，请确保照片的清晰度和完整性
                        </Text>
                        <View style={{height: Theme.size.height * 0.7, justifyContent: "center",}}>
                            <Image
                                style={{
                                    width: Theme.size.width - Theme.padding.base * 2 - 20,
                                    height: (Theme.size.width - 2 * Theme.padding.base - 20) * 9 / 16,
                                    resizeMode: "stretch",
                                }}
                                source={require('../../../imgs/idCard1.png')}/>
                            <Image
                                style={{
                                    width: Theme.size.width - Theme.padding.base * 2 - 20,
                                    height: (Theme.size.width - 2 * Theme.padding.base - 20) * 9 / 16,
                                    resizeMode: "stretch", marginTop: 30
                                }}
                                source={require('../../../imgs/idCard2.png')}/>
                        </View>
                        <TouchableHighlight onPress={() => this.setState({modalVisible: false})}>
                            <View>
                                <FontIcon size={40} icon={"mengbanguanbianniu"}
                                          style={[{color: "#fff", marginTop: 20}]}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.modalVisibleOne}
                    animationType={'slide'}
                    transparent={true}
                    onRequestClose={() => this.onRequestCloseOne()}
                >
                    <View style={{
                        width: Theme.size.width,
                        height: Theme.size.height,
                        backgroundColor: 'rgba(0,0,0, 0.8)',
                        alignItems: "center",
                    }}>
                        <Text style={{color: "#fff", fontSize: 14, paddingLeft: 20, paddingRight: 20, paddingTop: 40}}>
                            您可以通过手机拍摄营业执照或者从相册中选取营业执照照片上传，请确保照片的清晰度和完整性
                        </Text>
                        <View style={{height: Theme.size.height * 0.7, justifyContent: "center",}}>
                            <Image
                                style={{
                                    width: Theme.size.width - Theme.padding.base * 2 - 20,
                                    height: (Theme.size.width - 2 * Theme.padding.base - 20) * 9 / 16,
                                    resizeMode: "stretch", marginTop: 30
                                }}
                                source={require('../../../imgs/yingyezhizhao.jpg')}/>
                        </View>
                        <TouchableHighlight onPress={() => this.setState({modalVisibleOne: false})}>
                            <View>
                                <FontIcon size={40} icon={"mengbanguanbianniu"}
                                          style={[{color: "#fff", marginTop: 0}]}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.modalVisibleShop}
                    animationType={'slide'}
                    transparent={true}
                    onRequestClose={() => this.onRequestCloseShop()}
                >
                    <View style={{
                        width: Theme.size.width,
                        height: Theme.size.height,
                        backgroundColor: 'rgba(0,0,0, 0.8)',
                        alignItems: "center",
                    }}>
                        <Text style={{color: "#fff", fontSize: 14, paddingLeft: 20, paddingRight: 20, paddingTop: 40}}>
                            您可以通过手机拍店铺照片或者从相册中选取店铺照片上传，请确保照片的清晰度和完整性
                        </Text>
                        <View style={{height: Theme.size.height * 0.7, justifyContent: "center",}}>
                            <Image
                                style={{
                                    width: Theme.size.width - Theme.padding.base * 2 - 20,
                                    height: (Theme.size.width - 2 * Theme.padding.base - 20) * 9 / 16,
                                    resizeMode: "stretch",
                                }}
                                source={require('../../../imgs/shopface.jpg')}/>
                            <Image
                                style={{
                                    width: Theme.size.width - Theme.padding.base * 2 - 20,
                                    height: (Theme.size.width - 2 * Theme.padding.base - 20) * 9 / 16,
                                    resizeMode: "stretch", marginTop: 30
                                }}
                                source={require('../../../imgs/dn.jpg')}/>
                        </View>
                        <TouchableHighlight onPress={() => this.setState({modalVisibleShop: false})}>
                            <View>
                                <FontIcon size={40} icon={"mengbanguanbianniu"}
                                          style={[{color: "#fff", marginTop: 0}]}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>);

    }
}

//@mark style
const styles = StyleSheet.create({
    StoreCertification: {
        width: Theme.size.width,
        height: Theme.size.height + 100,
        backgroundColor: Theme.color.background
    },
    center: {
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
        marginTop: Theme.navigationBar.barHeight + 10,
    },
    itemInput: {
        width: Theme.size.width,
        backgroundColor: "#ffffff",
        marginTop: 1,
        paddingLeft: 10,
        alignItems: "center",
        flexDirection: 'row',

    },
    textInput: {
        width: Theme.size.width - 100,
        height: 50,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    },
    itemTitle: {
        width: 70,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    },
    itemTitles: {
        width: 110,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    },
    regBtn: {
        backgroundColor: Theme.color.orange1,
        borderRadius: Theme.size.radius,
        marginLeft: Theme.padding.max,
        marginRight: Theme.padding.max,
        marginTop: 30,
        marginBottom: 150
    }
});
