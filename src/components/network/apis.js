

let apis = {
    '1': '/login/cellphone',// 手机号登录
    '2': '/captcha/sent', // 发送验证码
    '3': '/captcha/verify', // 验证验证码
    '4': '/register/cellphone', // 注册(修改密码)
    '5': '/user/account', // 获取账号信息
    '6': '/banner', ///banner
}

function getApiUrl (apiNumber) {
    if (apis[apiNumber]) {
        return apis[apiNumber];
    } else {
        throw new Error(apiNumber + '-> 该api未配置！');
    }
}

export default {
    getApiUrl
}