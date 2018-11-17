/**
 * -----------------------------本地存储-----------------------------
 */

/**
 * 获取本地存储项目store信息
 * key: 存储标识、success：成功回调、fail：失败回调
 */
export function getStorageData({ key = "platformTag", success = false, fail = false }) {
    const data = localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))
    const ret = { data, isExpires: false }
    if (data) {
        localStorage.removeItem(key);
        // data.vary 验证
        if (!data.vary) {
            // 无需验证 
            return success && success(ret);
        }
        // 校验 如果没设置expires 则算无限期
        if (authenticate(data.expires)) {
            // 验证失败
            ret.isExpires = true;
            return fail && fail(ret);
        }
        return success && success(ret);
    } else {
        return fail && fail(ret);
    }
}

/**
* 验证 不仅仅过期
* @param {*} expires 过期时间
*/
export function authenticate(expires) {
    if (expires) {
        const isExpires = (new Date().getTime() / 1000 - expires) <= 0;
        return isExpires
    }
    return false
}

export function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


export function setCacheDataToStorage({
    key = "platformTag",
    data,
    vary = false,
    expiresSecond = 3600,
    onbeforeunload = [],
}) {
    // const store = this.$store.state;
    const expires = new Date().getTime() / 1000 + expiresSecond;
    onbeforeunload.push(e => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        setStorageData(key, {
            expires,
            vary,
            store: data,
            scrollTop
        });
    });
    window.onunload = e => {
        for (let i = 0; i < onbeforeunload.length; ++i) {
            onbeforeunload[i](e);
        }
    };
}

export function setCacheData(onbeforeunload = [], handler = false) {
    onbeforeunload.push(e => {
        handler && handler();
    });
    window.onunload = e => {
        for (let i = 0; i < onbeforeunload.length; ++i) {
            onbeforeunload[i](e);
        }
    };
}

export default {
    setCacheData,
    getStorageData,
    authenticate,
    setStorageData,
    setCacheDataToStorage
}