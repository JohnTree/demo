

'use strict';

import React, {Component} from "react";
import {StyleSheet, Text} from "react-native";
import iconfont from "./iconfont";
class FontIcon extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        var {color, size, icon, name, style}=this.props;
        return (
            <Text style={[{fontFamily: "iconfont", color: color, fontSize: size}, style]}>
                {iconfont(icon || name)}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    FontIcon: {}
});


export default FontIcon;
