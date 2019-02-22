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

import React from "react";
import LinearGradient from "react-native-linear-gradient";
import ActionSheet from "react-native-actionsheet";
import PullListView from "../../view/component/PullListView";
import NaviSegment from "../Home/Components/businessManagement/NaviSegment";
import RightButton from "../Home/Components/businessManagement/RightButton";
import {Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import SearchBar from "../Home/Components/businessManagement/SearchBar"

/**
 * @mark 文件内变量
 */
const CANCEL_INDEX = 0;
var functionMap = {
    "segment": (action) => {
    },
    "rightButtonAction": () => {
    },
    "segmentValue": 0,
    "ss": (callback) => {

    }
};
//文件内变量结束

export default class Contact extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        segment: () => <NaviSegment action={functionMap.segment} datas={["商户", "公司"]}
                                    value={functionMap.segmentValue}/>,
        rightButton: () => <RightButton action={functionMap.rightButtonAction}
                                        sethidden={functionMap.ss}
        />,

    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        segment: React.PropTypes.func,
        rightButton: React.PropTypes.func,
    }

    /**
     * @mark state
     */
    state = {
        searchText: "",
        mctName: "",
        phoneId: "",
        pinyin: "B",
        mctLogoUrl: "",
        cardPicOneTit: "sss",
        contentType: 0,
        mctId: "",
        headUrl: "",
        conId: ""
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.searchName = "";
        functionMap.segment = this.segment.bind(this);
        functionMap.rightButtonAction = this.rightButtonAction.bind(this);
        functionMap.ss = (callback) => {
            this.changeRightButton = callback
        }
        this.onUpdateUserInfo = () => {
            this.PullListViews._onRefresh();
        };
        CountEmitter.addListener("updateUserInfo", this.onUpdateUserInfo);
    }

    segment(index) {
        this.setState({contentType: index})
        functionMap.segmentValue = index
        if (index == 0) {
            this.changeRightButton && this.changeRightButton(true);
        } else {
            // this.PullListView._onRefresh();
            this.changeRightButton && this.changeRightButton(false);
        }
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {
        this.changeRightButton && this.changeRightButton(true);


    }

    componentWillUnmount() {
        functionMap.segmentValue = 0
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    rightButtonAction() {
        if (this.state.contentType == 0) {
            // {this.actions()}
        } else {
            {
                this.company()
            }
        }
    }

    /**
     * @mark 商户itme点击
     */
    action(focus, phoneId) {
        this.phoneId = phoneId
        // if (this.state.contentType == 0) {
        if (focus == "1") {
            this.AddSheetFoucus.show()
        } else {
            this.AddSheet.show()
        }
    }

    /**
     * @mark 公司item点击
     */
    clickContact(focus, conPhone, conName, conId, headUrl) {
        this.headUrl = headUrl
        this.conId = conId
        this.conName = conName
        this.conPhone = conPhone
        if (focus == "1") {
            this.AddSheetFoucusContact.show()
        } else {
            this.AddSheetC.show()
        }

    }

    /**
     * @mark 编辑
     */
    edits() {
        DataBus.set("conName", this.conName)
        DataBus.set("conPhone", this.conPhone)
        DataBus.set("headUrl", this.headUrl)
        // this.PullListViews._onRefresh();
        Actions.infoEdit()
    }

    /**
     * @mark 手动添加商户联系人
     */
    addMct() {
        this.PullListViews._onRefresh();
        Actions.addMctInfo()
    }

    /**
     * @mark 从通讯录导入
     */
    importContact() {
        this.PullListViews._onRefresh();
        Actions.importContact()
    }

    /**
     * @mark 添加按钮
     */
    actions() {
        this.AddSheets.show()
    }

    /**
     * @mark 添加联系人信息
     */
    company() {
        this.AddMctInfos.show();
    }

    /**
     * @mark 手动添加联系人信息
     */
    addContactInfo() {
        Actions.addContactInfos();
    }

    /**`xz
     * @mark 取消商户特别关注
     */
    cancelAttention() {
        Ajax("CmgInfoRemakeController/setFocusMct.do", {focus: "0", mctId: this.state.mctId}).then(v => {
            if (v.success) {
                this.PullListView._onRefresh();
            }
        }).catch(e => {
        })
    }

    /**
     * @mark 取消公司特别关注
     */
    cancelContact() {
        Ajax("CmgInfoRemakeController/setCmgFocus.do", {focus: "0", conId: this.state.conId}).then(v => {
            if (v.success) {
                this.PullListViews._onRefresh();
            }
        }).catch(e => {
        })
    }

    /**
     * @mark 打商户电话
     */
    dial() {
        Phone.makingCalls(this.phoneId);
    }

    /**
     * @mark 打公司电话
     */
    dialContact() {
        Phone.makingCalls(this.conPhone);
    }

    /**`
     * @mark 删除联系人
     */
    deleteContact() {
        Ajax("CmgInfoRemakeController/delCmgConcat.do", {conId: this.state.conId}).then(v => {
            if (v.success) {
                this.PullListViews._onRefresh();
            }
        }).catch(e => {
        })
    }

    /**`
     * @mark 设置商户特别关注
     */
    attention() {
        Ajax("CmgInfoRemakeController/setFocusMct.do", {focus: "1", mctId: this.state.mctId}).then(v => {
            if (v.success) {
                this.PullListView._onRefresh();
            }
        }).catch(e => {
        })

    }

    /**`
     * @mark 设置公司特别关注
     */
    attentionContact() {
        Ajax("CmgInfoRemakeController/setCmgFocus.do", {focus: "1", conId: this.state.conId}).then(v => {
            if (v.success) {
                this.PullListViews._onRefresh();
            }
        }).catch(e => {
        })
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

    headView() {
        return (
            <View style={styles.itemTitleTwo}>
                <FontIcon color={Theme.color.vision_main} size={Theme.fontSize.lesser}
                          icon="yiguanzhu" style={{
                    fontSize: Theme.fontSize.lesser,
                    marginLeft: Theme.padding.bsmaller,
                    marginTop: Theme.padding.bsmaller
                }}
                />
                <Text style={{
                    color: Theme.color.font_classify,
                    fontSize: Theme.fontSize.lesser,
                    marginLeft: Theme.padding.smaller,
                    marginTop: Theme.padding.bsmaller
                }}>
                    特别关注
                </Text>
            </View>
        )
    }

    /**
     * @mark 商户列表
     */
    renderContact(item) {
        return <View style={styles.center}>
            <Text style={styles.itemTitleOne}>
                {/*{item.pinyin}*/}
            </Text>
            <TouchableHighlight
                style={[{backgroundColor: 'white'}]}
                underlayColor={Theme.color.line_horizontal}
                onPress={() => {
                    this.state.mctId = item.mctId;
                    this.forceUpdate();
                    this.action(item.focus, item.phoneId)
                }}>
                <View>
                    <View style={styles.cell}>
                        <View style={styles.content}>
                            <Image style=
                                       {{
                                           borderRadius: 14,
                                           backgroundColor: "transparent",
                                           width: 28,
                                           height: 28,
                                           marginLeft: 16
                                       }}
                                   source={item.mctLogoUrl == "" ? require("../../../imgs/pic_my_nophoto@3x.png") : {uri: item.mctLogoUrl} || require("../../../imgs/ico_store_news_type_1@3x.png")}/>
                            <View style={[{marginLeft: Theme.padding.less}]}>
                                <Text style={styles.left_top}>
                                    {item.mctName}
                                </Text>
                                <Text style={styles.left_bottom}>
                                    {item.phoneId}
                                </Text>
                            </View>
                        </View>
                        {this.showFocus(item.focus)}

                    </View>
                </View>
            </TouchableHighlight>
        </View>

    }

    showFocus(focus) {
        if (focus != null && focus == "1") {
            return <View style={{position: "absolute", right: 40, top: 20}}>
                <FontIcon color={Theme.color.vision_main} size={Theme.fontSize.lesser}
                          icon="yiguanzhu"
                />
            </View>
        } else {
            return null;
        }
    }

    renderTopView() {
        return <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.0, 0.3]}
            colors={[Theme.color.gradual_blue1, Theme.color.gradual_blue2]}
            style={styles.topTitle}>
            {/*{this.renderSearch()}*/}
            {this.state.contentType == 0 ?
            <SearchBar placeholder="查找商户名称或电话" search={(v) => {
                this.searchName = v;
                this.PullListView._onRefresh();
            }} style={styles.searchBar}/>
                : <SearchBar placeholder="查找公司联系人名称或电话" search={(v) => {
                this.searchName = v;
                this.PullListViews._onRefresh();
            }} style={styles.searchBar}/>}
        </LinearGradient>
    }

    /**
     * @mark 公司列表
     */
    renderCompany(item) {
        return <View style={styles.center}>
            <Text style={styles.itemTitleOne}>
                {/*{item.pinyin}*/}
            </Text>
            <TouchableHighlight
                style={[{backgroundColor: 'white'}]}
                underlayColor={Theme.color.line_horizontal}
                onPress={() => {
                    {
                        this.state.conId = item.conId;
                    }
                    {
                        this.forceUpdate();
                    }
                    {
                        this.clickContact(item.focus, item.conPhone, item.conName, item.conId, item.headUrl)
                    }
                }}>
                <View>
                    <View style={styles.cell}>
                        <View style={styles.content}>
                            <Image style=
                                       {{
                                           borderRadius: 14,
                                           backgroundColor: "transparent",
                                           width: 28,
                                           height: 28,
                                           marginLeft: 16
                                       }}
                                   source={FS + item.headUrl == "" ? require("../../../imgs/pic_my_nophoto@3x.png") : {uri: FS + item.headUrl} || require("../../../imgs/ico_store_news_type_1@3x.png")}/>
                            <View style={[{marginLeft: Theme.padding.less}]}>
                                <Text style={styles.left_top}>
                                    {item.conName}
                                </Text>
                                {/*{item.conName=="阿策"&&console.warn(JSON.stringify(item.conPhone))}*/}
                                <Text style={styles.left_bottom}>
                                    {item.conPhone}
                                </Text>
                            </View>
                        </View>
                        {this.showFocusContact(item.focus)}
                    </View>
                </View>
            </TouchableHighlight>
        </View>

    }

    showFocusContact(focus) {
        if (focus != null && focus == "1") {
            return <View style={{position: "absolute", right: 40, top: 20}}>
                <FontIcon color={Theme.color.vision_main} size={Theme.fontSize.lesser}
                          icon="yiguanzhu"
                />
            </View>
        } else {
            return null;
        }
    }

    renderDataFunc(item) {
        var a = item;
        return this.renderContact(item);
    }

    /**
     * @mark 商户请求接口
     */
    fetchDatas(page, callback, options) {
        Ajax("CmgInfoRemakeController/getCmgMctConcatInfo.do", {content: this.searchName}).then(v => {
            if (v.success) {
                if (true === v.success) {
                    var info = v.data.map(function (obj) {
                        obj.mctLogoUrl = FS + obj.mctLogoUrl;
                        return obj;
                    }, this);
                    var tab = v.focus.map(function (obj) {
                        obj.mctLogoUrl = FS + obj.mctLogoUrl;
                        return obj;
                    }, this);
                    if (tab == null) {
                        callback(info, {allLoaded: true});
                    }
                    else {
                        var rows = tab.concat(info);
                        callback(rows, {allLoaded: true});
                    }
                }
            }
        }).catch(e => {
        })
    }

    /**
     * @mark 公司请求接口
     */
    fetchCompany(page, callback, options) {
        Ajax("CmgInfoRemakeController/getCmgConcatList.do", {pageNum: 1, pageSize: page,content: this.searchName}).then(v => {
            if (v.success) {
                console.warn(JSON.stringify(v))

                callback(v.result, {allLoaded: true})
            }
        }).catch(e => {
        })
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {

        return <View style={styles.Contact}>
            {this.renderTopView()}
            {this.state.contentType == 0 ?
                <PullListView
                    key="contentType_0"
                    showEmpty={true}
                    ref={(o) => this.PullListView = o}
                    fetchDatas={this.fetchDatas.bind(this)}
                    renderRow={this.renderDataFunc.bind(this)}
                    style={{backgroundColor: Theme.color.background}}
                    removeClippedSubviews={false}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.headView.bind(this)}
                /> :
                <PullListView
                    key="contentType_1"
                    ref={(a) => this.PullListViews = a}
                    fetchDatas={this.fetchCompany.bind(this)}
                    renderRow={this.renderCompany.bind(this)}
                    style={{backgroundColor: Theme.color.background}}
                    removeClippedSubviews={false}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.headView.bind(this)}
                />
            }
            <ActionSheet
                ref={(o) => this.AddSheet = o}
                options={["取消", "拨打电话", "设置特别关注"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.dial();
                            break;
                        }
                        case 2: {
                            this.attention();
                        }
                    }
                }}/>
            <ActionSheet
                ref={(o) => this.AddSheetFoucus = o}
                options={["取消", "拨打电话", "取消特别关注"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.dial();
                            break;
                        }
                        case 2: {
                            this.cancelAttention();
                        }
                    }
                }}/>
            <ActionSheet
                ref={(o) => this.AddSheetFoucusContact = o}
                options={["取消", "拨打电话", "编辑", "取消特别关注", "删除"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.dialContact();
                            break;
                        }
                        case 2: {
                            this.edits();
                            break;
                        }
                        case 3: {
                            this.cancelContact();
                            break;
                        }
                        case 4: {
                            this.deleteContact();
                            break;
                        }
                    }
                }}/>
            <ActionSheet
                ref={(o) => this.AddSheetC = o}
                options={["取消", "拨打电话", "编辑", "设置特别关注", "删除"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.dialContact();
                            break;
                        }
                        case 2: {
                            this.edits();
                            break;
                        }
                        case 3: {
                            this.attentionContact();
                            break;
                        }
                        case 4: {
                            this.deleteContact();
                            break;
                        }
                    }
                }}/>
            <ActionSheet
                ref={(o) => this.AddSheets = o}
                options={["取消", "手动添加", "从通讯录中导入"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.addMct();
                            break;
                        }
                        case 2: {
                            this.importContact();
                        }
                    }
                }}/>
            <ActionSheet
                ref={(o) => this.AddMctInfos = o}
                options={["取消", "手动添加", "从通讯录中导入"]}
                cancelButtonIndex={CANCEL_INDEX}
                onPress={(index) => {
                    switch (index) {
                        case 1: {
                            this.addContactInfo();
                            break;
                        }
                        case 2: {
                            this.importContact();
                        }
                    }
                }}/>

        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    Contact: {
        width: Theme.size.width,
        flex: 1,
        backgroundColor: Theme.color.background,
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
        marginLeft: Theme.padding.bsmaller,
        color: Theme.color.font_classify
    },
    itemTitleTwo: {
        width: Theme.size.width - Theme.padding.less * 2,
        flexDirection: "row",
        alignItems: "center",
    }, content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Theme.padding.less,
        paddingBottom: Theme.padding.less,
        paddingRight: Theme.padding.max,
        width: Theme.size.width,
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
    }
});
