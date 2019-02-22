/**
 *
 */
import RecordComponent from "../../src/pages/Home/Record/RecordComponent";
import RecordCreate from "../../src/pages/Home/Record/RecordCreate";
import RecordNavigation from "../../src/pages/Home/Record/RecordNavigation"
import ForgetPswd from "../../src/pages/Login/ForgetPswd"
import SetNewPswd from "../../src/pages/Login/SetNewPswd"
import Setting from "../../src/pages/Home/Setting/Setting"
import EditPswd from "../../src/pages/Home/Setting/EditPswd"
import UpdateVersion from "../../src/pages/Home/Setting/UpdateVersion"
import Advice from "../../src/pages/Home/Setting/Advice"

module.exports = [
    {key: "recordComponent", component: RecordComponent,
        renderTitle: RecordComponent.defaultProps.title,
        renderBackButton: RecordComponent.defaultProps.leftButton,
        renderRightButton: RecordComponent.defaultProps.rightButton,
        hideNavBar: true,navBar:RecordNavigation},
    {key: "recordCreate", component: RecordCreate, title: "新建记录", hideNavBar:
        false,
        renderRightButton: RecordCreate.defaultProps.rightButton,
    },
    {key: "forgetPswd", component: ForgetPswd, title: "验证手机号", hideNavBar:
        false,
    },
    {key: "setNewPswd", component: SetNewPswd, title: "设置新密码", hideNavBar:
        false,
    },
    {key: "setting", component: Setting, title: "设置", hideNavBar:
        false,
    },
    {key: "editPswd", component: EditPswd, title: "修改登录密码", hideNavBar:
        false,
    },
    {key: "updateVersion", component: UpdateVersion, title: "关于宁e付", hideNavBar:
        false,
    },
    {key: "advice", component: Advice, title: "意见反馈", hideNavBar:
        false,
    },
]