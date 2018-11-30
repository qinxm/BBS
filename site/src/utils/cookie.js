
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function setCookie(cookies) {
    let exdate = new Date()
    let cookie = ''
    for (const key in cookies) {
        if (cookies.hasOwnProperty(key)) {
            debugger
            if (key == 'expires') {
                if (cookies[key] > 0) {
                    cookie += `${key}=${exdate.setDate(exdate.getDate() + cookies[key]).toGMTString()};`
                } else {
                    cookie += `${key}=${escape(cookies[key])};`
                }
            } else {
                cookie += `${key}=${escape(cookies[key])};`
            }
        }
    }
    if (cookie) {
        return document.cookie = cookie
    }
}


export default {
    setCookie,
    getCookie
}