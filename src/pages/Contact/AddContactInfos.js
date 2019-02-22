/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-21 13:41
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TextInput, Alert} from "react-native";
import {List, ListItem, Button} from 'react-native-elements'
import MListItem from  './MListItem'
import EventComponent from  "../../view/component/EventComponent"
import ImagePicker from "react-native-image-crop-picker";
import ActionSheet from 'react-native-actionsheet';
import ContactMctInfoEdit from "./ContactMctInfoEdit";
/**
 * @mark 文件内变量
 */
const buttons = ['取消', '拍照', '相册选取'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const titleList = [
    {
        name: '头像',
        key: "mctLogoUrl",
    },
    // {
    //     name: '商户名',
    //     key: "mctName",
    // },
    // {
    //     name: '电话',
    //     key: "mctLinkPhone",
    // },

];
//文件内变量结束

export default class AddContactInfos extends EventComponent {

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
        data: {},
        imgPath: "",
        select: false,
        originPath: null,
        hide: false,
        conName: "",
        conPhone: "",
        headUrlFile: "",
        mime:""
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        titleList.forEach(item => {
            this.on(item.key, this.onChange.bind(this, item.key));
        })
    }

    onChange(key, data) {
        this.state.data[key] = data;
        this.forceUpdate();
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {

    }

    componentWillMount() {

    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    /**
     * @mark 组件点击
     * @param item
     */
    itemCLick(name) {
        DataBus.set("storeInfo", this);
        if (name == "头像") {
            // console.warn(name);
            this.ActionSheet.show();
        } else if (name == "商户名") {
            console.warn(name);
            jumpPage("商户名", <ContactMctInfoEdit name={this.state.data["mctName"]} keyValue="mctName"/>)
        } else if (name == "电话") {
            // console.warn(name);
            jumpPage("电话", <ContactMctInfoEdit name={this.state.data["mctLinkPhone"]} keyValue="mctLinkPhone"/>)
        }
    }

    /**
     * @mark 相机选择
     */
    _handlePress(index) {
        if (index === 1) {
            this._pickSingleWithCamera(false)
        } else if (index === 2) {
            this._pickSingle(false, false)

        }
    }

    /**
     * @mark 照相机照片
     * @param item
     */
    _pickSingleWithCamera(cropping) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
        }).then(image => {
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
                imgPath: image.path,
                select: true,

            });
            this.updatePic(image);

        }).catch(e =>{});
    }

    /**
     * @mark 选择照片
     * @param item
     */
    _pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
        }).then(image => {
            this.setState({
                image: image,
                imgPath: image.path,
                select: true,
            });
            this.updatePic(image);
        }).catch(e => {

        });
    }

    /**
     * @mark 上传图片
     */
    updatePic(image) {
        Ajax("CmgInfoRemakeController/headUrlFile.do",
            {},[{name:"headUrlFile",path:image.path,mime:image.mime}]).then(v => {
            if (true === v.success) {
                this.setState({imgPath: v.headUrl,select:false});
                CountEmitter.emit("updateUserInfo",this.state.imgPath);
            } else {
                console.warn(v.message)
            }
        }).catch(e => {
            console.error(e)
        });

    }

    //判断下一步按钮是否可用
    _isTrue() {
        if (this.state.conName != null
            && this.state.conPhone != null && this.state.conName != '' && this.state.conPhone != ''
        ) {
            return false;
        } else {
            return true;
        }
    }

    handerRegisetClick() {
        Ajax("CmgInfoRemakeController/addConcatInfo.do", {
            conName: this.state.conName,
            conPhone: this.state.conPhone,
            headUrl:this.state.imgPath
            },).then(v => {
            if (true === v.success) {
                // DataBus.set("cid", v.cid);
                Actions.popTo("contact")
                CountEmitter.emit("updateUserInfo");
            } else {
                Alert.alert(v.message)
            }
        }).catch(e => {
            Alert.alert(e.message)
            console.warn(e.message)
        });
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        var {data}=this.state;
        return <View style={{height: Theme.size.height, backgroundColor: Theme.color.background}}>
            <List containerStyle={styles.listsStyle} scrollEnabled={true}
            >
                {
                    titleList.map((l, i) => {

                        let Component = i == 0 ? MListItem : ListItem;
                        var rightTitle = data[l.key];
                        if (rightTitle && l.key != "mctLogoUrl" && rightTitle.length > 40) {
                            rightTitle = rightTitle.slice(0, 40) + "...";
                        }


                        let props={
                            rightTitle:true
                        }
                        console.warn(this.state.imgPath)
                        if((Component==MListItem)&&this.state.imgPath){
                            props.rightTitle=this.state.imgPath;
                        }

                        return <Component
                            selectState={this.state.select}
                            imgStr={this.state.imgPath}
                            onPress={() => this.itemCLick(l.name)}
                            hideChevron={false}
                            underlayColor={Theme.color.background}
                            key={i}
                            rightIcon={{
                                type: "iconfont",
                                color: Theme.color.font_assist,
                                name: "youjiantou",
                                style: {fontSize: Theme.fontSize.min}
                            }}
                            {...props}
                            rightTitleStyle={i === 0 ? styles.itemRightimg : styles.itemRight}
                            rightTitleContainerStyle={styles.rightContainer}
                            scrollEnabled={true}
                            title={l.name}
                            containerStyle={styles.titleContainer}
                            titleStyle={styles.listItem}
                        />
                    })

                }
            </List>
            <View style={styles.center}>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitles}>
                        姓名
                    </Text >
                    <TextInput style={styles.textInput} placeholder="请输入姓名"
                               value={this.state.conName}
                               placeholderTextColor={"#dfdfdf"}
                               onChangeText={(namesValue) => {
                                   this.setState({conName: namesValue});
                               }}/>
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitles}>
                        电话
                    </Text>
                    <TextInput style={styles.textInput} placeholder="请输入电话"
                               value={this.state.conPhone}
                               placeholderTextColor={"#dfdfdf"}
                               onChangeText={(phoneValue) => {
                                   this.setState({conPhone: phoneValue});
                               }}/>
                </View>
            </View>
            <Button
                backgroundColor={Theme.color.orange1}
                fontSize={Theme.fontSize.max}
                buttonStyle={styles.regBtn}
                disabled={this._isTrue()}
                onPress={this.handerRegisetClick.bind(this)}
                title='确认提交'
            />
            <ActionSheet
                ref={(o) => this.ActionSheet = o}
                title="选取头像照片"
                options={buttons}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this._handlePress.bind(this)}
            />
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    listsStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0,
        marginTop: Theme.navigationBar.barHeight
    },

    itemTitle: {
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_content,
    },
    titleContainer: {
        borderBottomWidth: Theme.pixel
    },
    itemRight: {
        marginRight: 5,
        fontSize: Theme.size.larger,
        color: Theme.color.font_classify,

    },
    itemRightimg: {
        marginRight: 5
        // fontSize:Theme.size.larger
    },
    rightContainer: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    listItem: {
        marginLeft: -1,
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_content,
    },
    itemInput: {
        width: Theme.size.width,
        backgroundColor: "#ffffff",
        marginTop: 1,
        paddingLeft: 10,
        alignItems: "center",
        flexDirection: 'row'
    },
    textInput: {
        width: Theme.size.width,
        height: 50,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    },
    itemTitles: {
        width: 70,
        color: Theme.color.font_content,
        fontSize: Theme.fontSize.max
    },
    center: {
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
    },
    regBtn: {
        backgroundColor: Theme.color.orange1,
        borderRadius: Theme.size.radius,
        marginLeft: Theme.padding.max,
        marginRight: Theme.padding.max,
        marginTop: 30
    },


});
