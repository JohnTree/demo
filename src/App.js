/**
 *Created by wangshiyang on 2017/2/4.
 */
'use strict';
// AppRegistry,DeviceEventEmitter,Image,Navigator,ScrollView,StatusBar,StyleSheet,Text, TouchableOpacity, TouchableHighlight,View
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Platform,
    Text,
    StyleSheet,
    Modal,
    TouchableHighlight,
    NativeModules,
    StatusBar,
    UIManager
} from "react-native";
import StartPage from "./StartPage";
import Index from "./pages/Index";
// export const Bubbles = BubblesComponent;
// export const Bars = BarsComponent;
// export const Pulse = PulseComponent;
// export const DoubleBounce = DoubleBounceComponent;
import {Bubbles} from "react-native-loader";

class App extends Component {
    // 构造
    constructor(props) {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        // console.warn("App constructor");
        super(props);
        // 初始状态
        this.state = {
            modelShow: false,
            showIndex: 0
        };
        CountEmitter.addListener("popLoading", () => {
            try {
                let me = this;
                if (me.state.showIndex == 0) {
                    me.setState({modelShow: true});
                }
                me.state.showIndex++;
            } catch (e) {
                console.error(e);
            }
        });
        CountEmitter.addListener("closeLoading", () => {
            try {
                let me = this;
                if (me.state.showIndex > 0) {
                    me.state.showIndex--;
                }
                if (me.state.showIndex == 0) {
                    me.setState({modelShow: false});
                }
            } catch (e) {
                console.error(e);
            }
        });
    }


    // none', 'slide', 'fade'
    renderModal() {
        if (this.state.modelShow) {
            return (
                <View style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    width: Theme.size.width,
                    height: Theme.size.height,
                    position: "absolute",
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    left: 0
                }}>
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        height: 100,
                        width: 100, borderWidth: 0,
                        alignItems: 'center', borderRadius: 5, justifyContent: 'center',
                    }}>
                        <View style={{alignItems: 'center'}}>
                            <FontIcon color={"#FFFFFF"} size={30}
                                      icon="jyf_LOGO"
                                      style={[{textAlign: "center", marginBottom: 0}]}/>
                            <Text style={{color: "#fff", margin: 4}}>宁e付</Text>
                            <Bubbles style={{flex: 1, flexDirection: "row", alignItems: 'center'}} size={5}
                                     color="#ffff"/>
                        </View>
                    </View>
                </View>
            );
        }
    }


    renderShowPage() {
        if (false) {
            return (<StartPage/>);
        } else {
            return (<Index/>);
        }
        //
        // {this.renderModal()}

    }

    render() {
        return (
            <View style={{
                flex: 1, flexDirection: "column",
                position: "relative"
            } }>
                {
                    (() => {
                        if (Platform.OS === 'android') {
                        } else {
                            return <StatusBar
                                barStyle="light-content"
                            />
                        }
                    })()
                }
                {this.renderShowPage()}
                {this.renderModal()}
            </View>
        );

    }
}
export default App;