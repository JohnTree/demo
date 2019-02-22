import React, {Component} from "react";
import BusinessManagement from "../../src/pages/Home/BusinessManagement/BusinessManagement";
import PhotoAlbum from "../../src/pages/Home/BusinessManagement/Album/PhotoAlbum";
import AlbumDetail from "../../src/pages/Home/BusinessManagement/Album/AlbumDetail";
import PhotoList from "../../src/pages/Home/BusinessManagement/Album/PhotoList";
import CreateSchedule from "../../src/pages/Home/BusinessManagement/CreateSchedule";
import BusinessAssistant from "../../src/pages/Home/BusinessManagement/Assistant/BusinessAssistant";
import CreateSimpleSchedule from "../../src/pages/Home/BusinessManagement/CreateSimpleSchedule"
import NavigationSchedule from "../../src/pages/Home/BusinessManagement/NavigationSchedule"
import ScheduleInfo from "../../src/pages/Home/BusinessManagement/ScheduleInfo";
import RecordPhotoList from "../../src/pages/Home/Record/RecordPhotoList";
import Sign from "../../src/pages/Home/Sign/Sign";
import SignDetail from "../../src/pages/Home/Sign/SignDetail";
import BusinessSelect from "../../src/pages/Home/Sign/BusinessSelect";
module.exports = [
    {
        key: "businessManagement",
        component: BusinessManagement,
        title: "商户列表",
        hideNavBar: false,
        renderRightButton: BusinessManagement.defaultProps.rightBotton
    },
    {
        key: "photoAlbum",
        component: PhotoAlbum,
        renderTitle: PhotoAlbum.defaultProps.segment,
        // renderRightButton: PhotoAlbum.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "albumDetail",
        component: AlbumDetail,
        renderRightButton: AlbumDetail.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "photoList", component: PhotoList, title: "",
        renderTitle: PhotoList.defaultProps.numberHeader,
        renderRightButton: PhotoList.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "createSchedule", component: CreateSchedule, title: "新建日程",
        renderRightButton: CreateSchedule.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "scheduleInfo", component: ScheduleInfo, title: "日程",
        renderRightButton: ScheduleInfo.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "createSimpleSchedule", component: CreateSimpleSchedule, title: "新建日程",
        hideNavBar: false
    },
    {
        key: "assistant", component: BusinessAssistant, title: "业务助手", hideNavBar: false
    },
    {
        key: "navigationSchedule",
        component: NavigationSchedule,
        title: "导航",
        onBack: NavigationSchedule.defaultProps.onBack,
        hideNavBar: false
    },
    {
        key: "recorderPhotoList", component: RecordPhotoList, renderTitle: RecordPhotoList.defaultProps.numberHeader,
        renderRightButton: RecordPhotoList.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "sign", component: Sign,
        title:"标牌管理",
        renderRightButton: Sign.defaultProps.rightButton,
        hideNavBar: false
    },
    {
        key: "signDetail", component: SignDetail,
        title:"标牌详情",
        hideNavBar: false
    },
    {
        key: "businessSelect", component: BusinessSelect,
        title:"选择商户",
        renderRightButton: BusinessSelect.defaultProps.rightButton,
        hideNavBar: false
    },

];

