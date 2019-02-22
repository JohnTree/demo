import React from "react";
import {Text, TouchableOpacity} from "react-native";
import BaiduMap from "../../src/view/component/Map/BaiduMap";
import TimeSelect from "../../src/pages/Home/BusinessManagement/TimeSelect";
import StoreDetails from "../../src/pages/Home/BusinessManagement/StoreDetails";
import BaseNavBar from "../../src/view/component/BaseNavBar";
import AddMctInfo from "../../src/pages/Contact/AddMctInfo";
import InfoEdit from "../../src/pages/Contact/InfoEdit";
import ContactMctInfoEdit from "../../src/pages/Contact/ContactMctInfoEdit";
import ImportContact from "../../src/pages/Contact/ImportContact";
import AddContactInfos from "../../src/pages/Contact/AddContactInfos";
import Contact from "../../src/pages/Contact/Contact";
import FinancialNews from "../../src/pages/News/FinancialNews"
import FinancialDetails from "../../src/pages/News/FinancialDetails"
import ForceULoginPwd from "../../src/pages/Login/ForceULoginPwd"
import ForceULoginPwdT from "../../src/pages/Login/ForceULoginPwdT"
import FinalHome from "../../src/pages/Home/Components/finalHome/FinalHome"

module.exports = [
    // {key: "login", type: "reset", component: Demo, title: "登录", hideNavBar: true},
    {key: "baiduMap", component: BaiduMap, title: "地址选择", hideNavBar: false},
    {key: "storeDetails", component: StoreDetails, title: "商户详情", hideNavBar: false, navBar: BaseNavBar,
        renderRightButton: StoreDetails.defaultProps.rightButton,},
    {key: "timeSelect", component: TimeSelect, title: "时间选择", hideNavBar: false},
    {key: "addMctInfo", component: AddMctInfo, title: "添加商户信息", hideNavBar: false},
    {key: "addContactInfos", component: AddContactInfos, title: "添加联系人信息", hideNavBar: false},
    {key: "contactMctInfoEdit", component: ContactMctInfoEdit, title: "添加商户信息", hideNavBar: false},
    {key: "infoEdit", component: InfoEdit, title: "编辑信息", hideNavBar: false},
    {key: "financialNews", component: FinancialNews, title: "金融资讯", hideNavBar: false},
    {key: "financialDetails", component: FinancialDetails, title: "金融资讯", hideNavBar: false},
    {key: "forceULoginPwd", component: ForceULoginPwd, title: "修改登录密码", hideNavBar: false,renderBackButton:()=>{return null}},
    {key: "forceULoginPwdT", component: ForceULoginPwdT, title: "修改登录密码", hideNavBar: false,renderBackButton:()=>{return null}},
    {key: "finalHome", component: FinalHome, title: null, hideNavBar: true ,renderBackButton:()=>{return null}},
    {
        key: "importContact", component: ImportContact, title: "从通讯录中导入",
        renderRightButton: () => {
            return (
                <TouchableOpacity underlayColor={'transparent'}
                                  style={[{justifyContent: 'center'}]}
                                  onPress={() => {
                                      CountEmitter.emit("CheckRightBtn");
                                  }}>
                    <Text style={[{color: 'white', paddingRight: Theme.padding.smaller, fontSize: Theme.fontSize.max}]}>确认</Text>
                </TouchableOpacity>
            );
        },
        hideNavBar: false
    },
    {
        key: "contact", component: Contact,
        hideNavBar: false,
        title: "通讯录",
        // renderTitle: Contact.defaultProps.segment,
        // renderRightButton: Contact.defaultProps.rightButton,
    },
]

