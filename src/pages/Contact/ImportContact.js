/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-17 09:29
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import LinearGradient from "react-native-linear-gradient";
import PopupDialog from "react-native-popup-dialog";
import CheckBox from "./CheckBox"
import SearchBar from "../Home/Components/businessManagement/SearchBar"
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
} from 'react-native';

/**
 * @mark 文件内变量
 */
const CANCEL_INDEX = 0;

//文件内变量结束
// class CheckCell extends React.Component {
//     static defaultProps = {
//         checked: false,
//         title: "",
//         value: "",
//         iconColor: "#58BDC5",
//         onPress: (checked, callback) => {
//             callback(Boolean)
//         }
//     };
//
//     constructor(props) {
//         super(props);
//         var {title, value, checkedColor, iconColor, icon, photo, name, phoneNum} = this.props;
//         this.state = {
//             title: title,
//             value: value,
//             iconColor: iconColor,
//             icon: icon,
//             checkedColor: checkedColor,
//             photo: photo,
//             name: name,
//             phoneNum: phoneNum
//         }
//         this.searchName = "";
//     }
//
//     refresh(checked) {
//         this.setState({checked: checked})
//     }
//
//     _onPress() {
//         this.props.onPress(this.props.checked);
//     }
//
//     makeShowDate() {
//         //筛选
//         // 设置数据源
//
//     }
//
//     renderDataFunc(item) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.itemTitleOne}>
//                     {/*{item.pinyin}*/}
//                 </Text >
//                 <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor="#F0F0F0"
//                                     style={{marginBottom: 1}}>
//                     <View style={{backgroundColor: Theme.color.view_Background, height: 55}}>
//                         <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
//                             <View style={styles.cell}>
//                                 <View style={styles.content}>
//                                     <Image style=
//                                                {{
//                                                    borderRadius: 14,
//                                                    backgroundColor: "transparent",
//                                                    width: 28,
//                                                    height: 28,
//                                                    marginLeft: 16
//                                                }}
//                                            source={this.state.photo == "" ? require("../../../imgs/pic_my_nophoto@3x.png") : {uri: this.state.photo} || require("../../../imgs/ico_store_news_type_1@3x.png")}/>
//                                     <View style={[{marginLeft: Theme.padding.less}]}>
//                                         <Text style={styles.left_top}>
//                                             {this.state.name}
//                                         </Text>
//                                         <Text style={styles.left_bottom}>
//                                             {this.state.phoneNum}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{flex: 1, alignItems: "flex-end", marginRight: Theme.padding.larger}}>
//                                 <FontIcon color={this.props.checked ? "#58BDC5" : "#BBBBBB"}
//                                           size={14}
//                                           icon={this.props.checked ? "xuanzhong" : "weixuanzhong"}
//                                 />
//                             </View>
//                         </View>
//                     </View>
//                 </TouchableHighlight>
//             </View>
//         )
//     }
//
//     render() {
//         return (
//             this.renderDataFunc()
//         )
//     }
// }
//
// class CheckBox extends React.Component {
//
//     static defaultProps = {
//         isMulti: false,
//         datas: [],
//         // select: 0,
//         selects: [0],
//         onChange: (index, datas) => {
//         }
//     };
//
//     constructor(props) {
//         super(props);
//         var {datas, isMulti, select, selects} = this.props;
//         console.warn(datas)
//         this.state = {
//             datas: datas,
//             isMulti: isMulti,
//             select: select,
//             selects: selects
//         }
//     }
//
//     render() {
//         var components = this.props.datas.map((l, i) => (
//
//             <CheckCell {...l}
//                        key={i}
//                        ref={"cell" + i}
//                        checked={this.state.isMulti ? this.state.selects.indexOf(i) != -1 : this.state.select == i}
//                        onPress={(checked) => {
//                            if (this.state.isMulti) {
//                                var arr = this.state.selects;
//                                console.warn(checked)
//                                if (!checked) {
//                                    arr.push(i);
//                                    console.warn(arr)
//                                } else {
//                                    arr.splice(arr.indexOf(i), 1)
//                                }
//                                this.setState({selects: arr});
//                                this.props.onChange(arr, this.state.datas);
//                            } else {
//                                if (!checked && this.state.select !== i) {
//                                    this.setState({select: i});
//                                    this.props.onChange(i, this.state.datas);
//                                }
//                            }
//                        }}/>
//         ));
//         return (
//             <View {...this.props}>
//                 {components}
//             </View>
//         )
//     }
// }
export default class ImportContactAdd extends React.Component {

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
        searchText: "",
        message: "",
        scan: false,
        datas: [],
        baseData: [],
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.selects = [];
        this.searchName = "";
    }

    /**
     * @mark 组件声明周期区域
     */

    makeShowData() {
        let showData = [];
        if (this.state.searchName && this.state.searchName != "") {
            for (let j = 0; j < this.state.baseData.length; j++) {
                let phoneNum=this.state.baseData[j].phoneNum;
                phoneNum=Array.isArray(phoneNum)?phoneNum[0]:phoneNum;
                if (phoneNum.startsWith(this.state.searchName)||this.state.baseData[j].name.startsWith(this.state.searchName))
                    showData.push(this.state.baseData[j]);
            }
            this.setState({datas: showData});
        } else {
            this.setState({datas: this.state.baseData});
        }
    }

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {
        Phone.phoneBook().then((data) => {
            this.setState({baseData: data});
            this.makeShowData();
        }).catch(e => {
            this.state.message = e.message
            this.forceUpdate()
        });
        CountEmitter.addListener("CheckRightBtn", () => {
            {
                Ajax("CmgInfoRemakeController/addCmgConcatList.do", {json: JSON.stringify(this.selects)}).then(v => {
                    if (v.success) {
                        Actions.popTo("contact")
                        CountEmitter.emit("updateUserInfo");
                    }
                }).catch(e => {
                    console.warn(e.message)
                })

            }
        });

    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    importContact(name, phoneNum) {
        this.name = name
        this.phoneNum = phoneNum
        this.AddSheet.show()
    }


    /**
     * @mark 搜索
     */
    renderSearch() {
        return <View style={styles.searchBtn}>
            <TouchableOpacity
                onPress={() => {
                }}>
                <View>
                    <FontIcon size={15} icon="sousuo" style={[{
                        color: 'white',
                        marginLeft: Theme.padding.less,
                        marginRight: Theme.padding.less
                    }]}/>
                </View>
            </TouchableOpacity>
            <TextInput placeholder={"请输入商户名称或电话号"} placeholderTextColor={'white'}
                       value={ this.state.searchText}
                       onChangeText={(text) => {
                           this.state.searchText = text;
                           this.forceUpdate()
                       }
                       }
                       style={[{flex: 1, color: 'white', fontSize: Theme.fontSize.larger}]
                       }>
            </TextInput>
        </View>

    }

    renderCheckBox(datas) {
        // console.warn(this.state.datas)
        return (
            <CheckBox
                isMulti={true}
                datas={this.state.datas}
                onChange={(index, datas) => {
                    this.selects = index.map(l => this.state.datas[l]);
                }}
                selects={[]}
            />);
    }


    renderTopView() {
        return <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.0, 0.3]}
            colors={[Theme.color.gradual_blue1, Theme.color.gradual_blue2]}
            style={styles.topTitle}>
            {/*{this.renderSearch()}*/}
            <SearchBar placeholder="查找姓名或电话"
                       search={(data) => {
            this.state.searchName = data;
            this.makeShowData();
        }} style={styles.searchBar}/>
        </LinearGradient>
    }

    renderDataFunc(item) {
        var a = item;
        return this.renderContact(item);
    }


    popDialog(message) {
        this.state.message = message
        this.forceUpdate()
        this.popupDialog.show();
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.Contact}>
            {this.renderTopView()}
            <ScrollView>
                {this.renderCheckBox()}
            </ScrollView>
            <PopupDialog
                width={275}
                height={80}
                ref={(popupDialog) => {
                    this.popupDialog = popupDialog
                }}
            >
                <View style={styles.dialogContentView}>
                    <Text style={styles.left_top}>
                        {this.state.message}
                    </Text>
                </View>
            </PopupDialog>
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    Contact: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background,
        flex: 1
    }
    , center: {
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
    },
    topTitle: {
        paddingTop: Theme.navigationBar.barHeight
    },
    searchBtn: {
        marginBottom: Theme.padding.smaller,
        marginRight: Theme.padding.less,
        marginLeft: Theme.padding.less,
        backgroundColor: "rgba(0, 0, 0,0.2)",
        paddingRight: Theme.padding.smaller,
        paddingLeft: Theme.padding.smaller,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Theme.size.radius,
        height: 40,
        justifyContent: "space-between"
    }
    ,
    itemTitleOne: {
        width: Theme.size.width,
        marginLeft: Theme.padding.bsmaller
    }, content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Theme.padding.less,
        paddingBottom: Theme.padding.less,
        paddingRight: Theme.padding.max,
        marginBottom: Theme.pixel,
        backgroundColor: "#ffffff"
    },
    left_top: {
        color: Theme.color.font_content,
        fontSize: Theme.fontSize.larger
    },
    left_bottom: {
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.base
    }, dialogContentView: {
        marginTop: Theme.padding.larger,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: Theme.padding.smaller
    },
});
