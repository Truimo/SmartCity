import store from '../store'

export default {
    getUrl() {
        return store.getters.getUrl
    },
    getToken() {
        return store.getters.getToken
    },
    request(options) {
        const baseUrl = this.getUrl()
        const token = this.getToken()
        const defaultOptions = {
            url: '',
            data: void 0,
            header: {
                Authorization: token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text'
        }
        options = Object.assign(defaultOptions, options)
        return new Promise((resolve, reject) => {
            uni.request({
                ...options,
                url: '//' + baseUrl + options.url,
                success: (res) => resolve(res.data),
                fail: (error) => reject(error)
            })
        })
    },
    getRotationList(query = {}) {
        const defaultQuery = {
            type: 1,
            pageNum: 1,
            pageSize: 10
        }
        const data = Object.assign(defaultQuery, query)
        const url = '/prod-api/api/rotation/list'
        return this.request({ url, data })
    }
}
