import "./Patches/IconPatche"
import  "./Patches/TextInputPatche"
import "./global";
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, ScrollView} from "react-native";
import App from "./src/App";
/**
 * 主工程类
 *
 * @export
 * @class biz
 * @extends {Component}
 */
export default class acm extends Component {

    render() {
        return (
            <App ></App>
        );
    }
}

AppRegistry.registerComponent('acm', () => acm);
