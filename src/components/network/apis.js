

let apis = {
    '1': '/login/cellphone',// 手机号登录
    '2': '/captcha/sent', // 发送验证码
    '3': '/captcha/verify', // 验证验证码
    '4': '/register/cellphone', // 注册(修改密码)
    '5': '/user/account', // 获取账号信息
    '6': '/banner', ///banner
    '37': '/personalized', // 推荐歌单,
    '371': '/personalized/newsong', // 推荐音乐
    '25': '/song/detail', // 歌曲详情
    '251': '/lyric', // 歌曲内容
    '11': '/search/hot', // 热门搜索
    '111': '/cloudsearch',// 搜索结果
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