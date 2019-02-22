/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-22 16:15
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Easing,
    Animated,
    PanResponder,
    LayoutAnimation,
    Modal,
    TouchableHighlight,
    Platform
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

let defualtPanValue = {x: 0, y: 0}

export default class LateralMovementView extends React.Component {

    static defaultProps = {
        renderRightView: ()=> {
            return null
        },
        duration: 300,
        willShow:()=>{},
        didHidden:()=>{}
    }

    static propTypes = {
        renderRightView: React.PropTypes.func,
        duration: React.PropTypes.number
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            view_height: 0,
            offsetXY: new Animated.ValueXY(defualtPanValue),
            isShow: false,
            rightTop: 0,

        }
        this.listener = this.state.offsetXY.addListener(e => this.PanX = e.x);
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentWillMount() {
        let onPanResponderMoveCb = Animated.event([null, {
            dx: this.state.offsetXY.x,
            dy: this.state.offsetXY.y
        }]);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => true,
            onMoveShouldSetPanResponderCapture: (e, a) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.props.willShow();
            },
            // onPanResponderMove: (evt, gestureState) => {
            //     gestureState.dy = 0;
            //     if (this.PanX > -this.state.rightViewWidth) {
            //         gestureState.dx = gestureState.dx > 0 ? 0 : gestureState.dx;
            //         onPanResponderMoveCb(evt, gestureState);
            //     }
            // },
            // onPanResponderRelease: (e) => {
            //     if (this.PanX < -this.state.rightViewWidth / 2) {
            //         this.show()
            //     } else {
            //         this.hidden()
            //     }
            // }
        })
    }

    componentDidMount() {
    }

    rightMeasure() {
        this.RightView.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            this.setState({
                rightViewWidth: frameWidth,
                rightTop: pageY,
            })
        });
    }

    isShow() {
        return this.state.isShow;
    }

    show() {
        if (this.state.rightViewWidth !== 0) {
            this.rightMeasure();
            Animated.timing(this.state.offsetXY, {
                toValue: {x: -this.state.rightViewWidth, y: 0}, // 目标值
                duration: this.props.duration, // 动画时间
                easing: Easing.linear // 缓动函数
            }).start(()=> {
                this.setState({isShow: true})
            });
        }
    }

    hidden() {
        this.setState({isShow: false})
        Animated.timing(this.state.offsetXY, {
            toValue: defualtPanValue, // 目标值
            duration: this.props.duration, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(()=> {
        });
        this.props.didHidden();
    }

    render() {
        let RightView = this.props.renderRightView()
        if (RightView && RightView.props.style) {
            RightView.props.style.flex = 1;
        }
        return (
            <View
                {...this.panResponder.panHandlers}
                style={[this.props.wrapperStyle, {height: this.state.view_height}]}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{flex: 1}}/>
                    <View
                        ref={(o)=> {
                            this.RightView = o
                        }}
                        onLayout={(e)=> {
                            this.rightMeasure()
                        }}
                        style={{height: this.state.view_height, opacity: this.state.isShow ? 0 : 1}}
                    >
                        {RightView}
                    </View>
                </View>
                <Animated.View
                    onLayout={(e) => {
                        this.setState({view_height: e.nativeEvent.layout.height})
                    }}
                    style={{
                        width: Theme.size.width,
                        ...this.props.style,
                        position: "absolute",
                        left: this.state.offsetXY.x,
                    }}
                >

                    {this.props.children}
                </Animated.View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.isShow}
                >
                    <TouchableHighlight style={{flex: 1}} onPress={this.hidden.bind(this)} underlayColor="transparent">
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            top: this.state.rightTop
                        }}>
                            <View style={{flex: 1}}/>
                            <View>
                                {RightView}
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
            </View>
        )
    }
}
