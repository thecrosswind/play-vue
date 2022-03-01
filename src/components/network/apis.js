

let apis = {
    '1': '/login/cellphone',// 手机号登录
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