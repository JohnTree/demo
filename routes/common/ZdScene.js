
import ManagerRank from "../../src/pages/Analyse/ManagerRank";
import PracticalBook from "../../src/pages/Home/Practical/PracticalBook";
import Attribution from "../../src/pages/Home/Practical/Attribution";
import SpreadSystem from "../../src/pages/Spread/SpreadSystem";
import SpreadSystemMsg from "../../src/pages/Spread/SpreadSystemMsg";
import SelectLocPoint from "../../src/pages/Spread/SelectLocPoint"
import UpdateMctMessage from "../../src/pages/Home/BusinessManagement/UpdateMctMessage"
import BankCheck from "../../src/pages/Home/ShopMessage/BankCheck"
import BankRefuseCause from "../../src/pages/Home/ShopMessage/BankRefuseCause"
import UpdateLimitMessage from "../../src/pages/Home/BusinessManagement/UpdateLimitMessage"
import LimitCheckList from "../../src/pages/Home/LimitCheck/LimitCheckList"
import LimitCheck from "../../src/pages/Home/LimitCheck/LimitCheck"
import LimitRefuseCause from "../../src/pages/Home/LimitCheck/LimitRefuseCause"

import FinalCheck from "../../src/pages/Check/FinalCheck"
import CheckBankList from "../../src/pages/Home/ShopMessage/CheckBankList"
module.exports = [
    {key: "managerRank", component: ManagerRank, title: "客户经理排行", hideNavBar: false},
    {key: "practicalBook", component: PracticalBook, title: "操作手册", hideNavBar: false},
    {key: "attribution", component: Attribution, title: "归属地查询", hideNavBar: false},
    {key: "spreadSystem", component: SpreadSystem, title: "系统公告", hideNavBar: false},
    {key: "spreadSystemMsg", component: SpreadSystemMsg, title: "系统公告", hideNavBar: false},
    {key: "selectLocPoint", component: SelectLocPoint, title: "选择地点",onBack:SelectLocPoint.defaultProps.onBack, hideNavBar: false},
    {key: "updateMctMessage", component: UpdateMctMessage, title: "修改店铺信息", hideNavBar: false},
    {key: "finalCheck", component: FinalCheck, title: "入驻审核", hideNavBar: false},
    {key: "checkBankList", component: CheckBankList, title: "商户银行卡信息审核", hideNavBar: false},
    {key: "bankCheck", component: BankCheck, title: "银行卡信息认证", hideNavBar: false},
    {key: "bankRefuseCause", component: BankRefuseCause, title: "驳回原因", hideNavBar: false},
    {key: "updateLimitMessage", component: UpdateLimitMessage, title: "修改", hideNavBar: false},
    {key: "limitCheckList", component: LimitCheckList, title: "费率限额信息审核", hideNavBar: false},
    {key: "limitCheck", component: LimitCheck, title: "费率限额信息认证", hideNavBar: false},
    {key: "limitRefuseCause", component: LimitRefuseCause, title: "驳回原因", hideNavBar: false},


]