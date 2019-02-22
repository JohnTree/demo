/**
 *
 */
import React, {Component} from "react";
import {TouchableOpacity, Text} from "react-native";
import EnterCheck from "../../src/pages/Check/EnterCheck";
import WaitCheck from "../../src/pages/Check/WaitCheck";
import PassCheck from "../../src/pages/Check/PassCheck";
import RefuseCause from "../../src/pages/Check/RefuseCause";
import NotPassCheck from "../../src/pages/Check/NotPassCheck";
import Schedule from "../../src/pages/Spread/Schedule";
import SiteRecord from "../../src/pages/Spread/SiteRecord";
import StoreCertification from "../../src/pages/Check/StoreCertification"
import StypeCodePage from "../../src/pages/Check/StypeCodePage"
import CitySelectPage from "../../src/pages/Check/CitySelectPage"
import AreaSelect from "../../src/pages/Check/AreaSelect"
import AdressMap from "../../src/pages/Check/AdressMap"
import AddBankCard from "../../src/pages/Check/AddBankCard"
import WaitFinalCheck from "../../src/pages/Check/WaitFinalCheck"


module.exports = [

    {key: "waitCheck", component: WaitCheck, title: "认证信息", hideNavBar: false},
    {key: "waitFinalCheck", component: WaitFinalCheck, title: "认证信息", hideNavBar: false},
    {key: "notPassCheck", component: NotPassCheck, title: "认证信息", hideNavBar: false},
    {key: "passCheck", component: PassCheck, title: "认证信息", hideNavBar: false},
    {key: "refuseCause", component: RefuseCause, title: "驳回原因", hideNavBar: false},
    {
        key: "schedule", component: Schedule,
        hideNavBar: false,
        renderTitle: Schedule.defaultProps.segment,
    },
    {key: "siteRecord", component: SiteRecord, title: "地点记录", hideNavBar: false},
    {key: "storeCertification", component: StoreCertification, title: "商户添加", hideNavBar: false},
    {key: "stypeCodePage", component: StypeCodePage, title: "主营品类选择", hideNavBar: false},
    {key: "citySelectPage", component: CitySelectPage, title: "商圈选择", hideNavBar: false},
    {key: "areaSelect", component: AreaSelect, title: "商圈选择", hideNavBar: false},
    {key: "adressMap", component: AdressMap, title: "地址选择", hideNavBar: false},
    {key: "addBankCardRegister", component: AddBankCard, title: "添加信息", hideNavBar: false},
    {
        key: "enterCheck",
        component: EnterCheck,
        title: "入驻审核",
        hideNavBar: false,
    }


]