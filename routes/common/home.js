import MapManger from "../../src/pages/Home/Map/MapManger";
import CommonScene from "../../src/utils/CommonScene"

module.exports = [
    // {key: "login", type: "reset", component: Demo, title: "登录", hideNavBar: true},
    {
        key: "commonScene", component: CommonScene, getTitle: () => {
        return DataBus.get("jumpPageTitle")
    }, hideNavBar: false
    },
    {key: "mapManger", component: MapManger, title: "地图查询", hideNavBar: false},
]