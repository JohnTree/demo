/**
 *   Created by wangshiyang on 2017/2/10.
 *
 */

'use strict';
import FinalCheck from "./Check/FinalCheck"

import React, {Component} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Navigation, Router, Scene} from "react-native-router-flux";
import Home from "./Home/Home";
import Spread from "./Spread/Spread";
import Analyse from "./Analyse/Analyse";
import NavBar from "../view/component/MyNavBar";
import Routes from "../../routes";
const tabItems = {
    index: {
        title: "首页",
        icon: "shoukuan_off",
        selectedIcon: "shoukuan_on",
    },
    analyse: {
        title: "分析",
        icon: "fenxi",
        selectedIcon: "fenxion",
    }, message: {
        title: "消息",
        icon: "shezhi-xiaoxitongzhi",
        selectedIcon: "shezhi-xiaoxitongzhi",
    },
};

//@mark TabBar类定义
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

//@mark TabBar类render
    render() {
        let param = tabItems[this.props.sceneKey];
        let activeStyle = this.props.selected ? {color: Theme.color.vision_main} : {color: Theme.color.font_content};
        return (
            <View>
                <FontIcon color={ Theme.color.vision_main} size={24}
                          icon={this.props.selected ? (this.props.selectedIcon||param.selectedIcon) : (this.props.unSelectIcon||param.icon)}
                          style={[activeStyle, {textAlign: "center", marginBottom: 0}]}/>
                <Text style={[activeStyle, styles.tabbarItem]}>{this.props.title||param.title}</Text>
            </View>
        );
    }
}

function WrapTabBar(title,icon,selectedIcon){
    return function(props){
        return <TabBar {...props} selectedIcon={selectedIcon} unSelectIcon={icon} title={title}/>
    }
}

class Index extends Component {
    renderTranRightButton() {
        return (
            <TouchableOpacity underlayColor={'transparent'}
                              style={[{justifyContent: 'center'}]}
                              onPress={() => {
                                  CountEmitter.emit("30001");
                              }}>
                <FontIcon size={22} icon="richenganpai"
                          style={[{color: 'white', paddingRight: Theme.padding.smaller}]}/>
            </TouchableOpacity>
        );
    }

    // 构造
    state = {
        selectEd: "Home",
        //@mark 路由定义
        sceneItems: Routes,
        flag:true,
        key:"defaultKey"
    };

    constructor(props) {
        super(props);
        // 初始状态
    }

    componentWillMount() {
        CountEmitter.addListener("30001", () => {
            Actions.login();
        });
    }

    componentDidMount() {
        this.chackToken();
    }

//@mark 验证用户登录
    chackToken() {
        // CountEmitter.emit("30001");
        Ajax("cmgController/cmgCheckToken.do", {}).then(v => {
            // console.warn(JSON.stringify(v));
            if (!v.success) {
                CountEmitter.emit("30001");
            }
            if (!v.success) {
                CountEmitter.emit("30001");
            }
            LocalPersistence.getData("cmgType").then((type) => {
                if(type=="01"){
                    Actions.finalHome();
                }
            });
        }).catch(e => {
            CountEmitter.emit("30001");
            // console.warn(JSON.stringify(e));
        });
    }

    renderMyBackButton(navProps) {
        //@ mark 重新定义 backButton
        const state = navProps.navigationState;
        const childState = state.children[state.index];
        const BackButton = (childState.component && childState.component.backButton) || state.backButton
            || childState.backButton;
        const textButtonStyle = [
            styles.barBackButtonText,
            this.props.backButtonTextStyle,
            state.backButtonTextStyle,
            childState.backButtonTextStyle,
        ];
        const style = [
            styles.backButton,
            this.props.leftButtonStyle,
            state.leftButtonStyle,
            childState.leftButtonStyle,
        ];

        if (state.index === 0 && (!state.parentIndex || state.parentIndex === 0)) {
            return null;
        }

        if (BackButton) {
            return (
                <BackButton
                    testID="backNavButton"
                    textButtonStyle={textButtonStyle}
                    {...childState}
                    style={style}
                />
            );
        }
        let buttonImage = childState.backButtonImage ||
            state.backButtonImage || this.props.backButtonImage;
        let onPress = childState.onBack || childState.component.onBack;
        if (onPress) {
            onPress = onPress.bind(null, state);
        } else {
            onPress = Actions.pop;
        }

        let text = childState.backTitle ?
            <Text style={textButtonStyle}>
                {childState.backTitle}
            </Text>
            : null;

        return (
            <TouchableOpacity
                testID="backNavButton"
                style={style}
                onPress={onPress}
            >
                <FontIcon color={"#FFFFFF"} size={24}
                          icon="fanhui"
                          style={[{textAlign: "center", marginBottom: 0}]}/>
            </TouchableOpacity>)
    }

// {key="index" component={Home} title="收款" hideNavBar={true} icon={TabBar}}
    renderSceneItem(props) {
        // console.error("ccc");
        return <Scene {...props}/>
    }


    componentDidUpdate(){
        // this.refs["router"].forceUpdate();
    }

//@mark render
    render() {
        // var backImg = require('../../imgs/back.png');
        return (
            <Router
                key={this.state.key}
                renderBackButton={this.renderMyBackButton.bind(this) }
                navigationBarStyle={{
                    backgroundColor: Theme.color.clean,
                    borderBottomColor: Theme.color.clean,
                    borderBottomWidth: 0
                }}
                navBar={NavBar}
                titleStyle={{color: "white", fontSize: Theme.fontSize.max}}
            >
                <Scene tabBarStyle={styles.tabBar}
                       key="root" type="reset"
                       name="tabbar" tabs={true}
                       initial={this.state.selectEd == "Home"} hideNavBar={true} renderBackButton={() => {
                    return null
                }}>
                    <Scene key="index" component={Home} title="首页" hideNavBar={true} icon={TabBar}
                           renderBackButton={() => {
                               return null
                           }}/>
                    <Scene key="analyse" component={Analyse} title="营销分析" hideNavBar={false} icon={TabBar}
                           renderBackButton={() => {
                               return null
                           }}/>

                    <Scene key="message" component={Spread} title="消息中心"
                           hideNavBar={false} icon={TabBar} renderBackButton={() => {
                        return null
                    }}
                    />

                </Scene>
                {
                    this.state.sceneItems.map((v, index) => {
                        return this.renderSceneItem(v);
                    })
                }

            </Router>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        borderTopColor: Theme.color.line_horizontal, borderTopWidth: Theme.pixel
    },
    tabbarItem: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: Theme.fontSize.min,
        // color: Theme.color.font_title
    }
});


export default Index;
