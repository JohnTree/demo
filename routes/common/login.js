import React, {Component} from "react";
import {TouchableOpacity, Text} from "react-native";
import Login from "../../src/pages/Login/Login";
import LoginSecond from "../../src/pages/Login/LoginSecond";
module.exports = [
    // {key: "login", type: "reset", component: Demo, title: "登录", hideNavBar: true},
    {key: "login", type: "reset", component: Login, title: "登录", hideNavBar: true},
    {key: "loginSecond", component: LoginSecond, title: "门店选择", hideNavBar: false},

]

