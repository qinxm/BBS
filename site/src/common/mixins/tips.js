
const tipsMixin = {
    methods: {
        '$error'(res) {
            const { code, result, message } = res;
            if (code && code == 200) {
                return result || {}
            }
            this.$Message.error(!!message ? message : '失败，然而服务器未返回错误信息');
            return !!result && result

        },
        '$notice'(res, {
            type = 'error',
            title = '通知',
            desc = '',
            top = 50,
            duration = 3,
            onClose = false
        } = {}) {
            const { code, result, message } = res;
            if (code && code == 200) {
                return result || {}
            }
            this.$Notice[type]({
                title,
                desc: !!message ? desc || message : '失败，然而服务器未返回错误信息',
                duration
            })
            onClose && (onClose())
            return !!result && result
        },
        '$success'(res) {

        }
    },
}

export default tipsMixin
