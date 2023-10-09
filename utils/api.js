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
            header: {
                Authorization: token
            },
            method: 'GET'
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
    /**
    * 查询引导页及主页轮播
    * @param {object} query - 请求参数
    * @param {number} query.type - 广告类型 1 引导页轮播 2 主页轮播
    * @param {number} query.pageNum - 页数
    * @param {number} query.pageSize - 每页大小
    * @return {Promise<{code: number, msg: string, total: number, rows: Array }>} 响应内容
    */
    getRotationList(query = {}) {
        const defaultQuery = {
            type: 1,
            pageNum: 1,
            pageSize: 10
        }
        const data = Object.assign(defaultQuery, query)
        const url = '/prod-api/api/rotation/list'
        return this.request({ url, data })
    },
    /**
     * 获取新闻分类
     * @return {Promise<{code: number, msg: string, data: Array}>} 响应内容
     */
    getPressCategoryList() {
        const url = '/prod-api/press/category/list'
        return this.request({ url })
    },
    /**
     * 获取系统全部服务
     * @param {object} query - 请求参数
     * @param {string} query.isRecommend - 是否推荐，参看字典名：系统是否
     */
    getServiceList(query = {}) {
        const defaultQuery = {
            isRecommend: ''
        }
        const data = Object.assign(defaultQuery, query)
        const url = '/prod-api/api/service/list'
        return this.request({ url, data })
    },
    /**
     * 获取新闻列表
     * @param {object} query - 请求参数
     * @param {string} query.hot - 是否热点，参见字典名：系统是否
     * @param {string} query.publishDate - 发布日期 string(date-time)
     * @param {string} query.title - 新闻标题
     * @param {string} query.top - 是否推荐，参见字典名：系统是否
     * @param {string} query.type - 新闻类型 id
     */
    getPressList(query = {}) {
        const defaultQuery = {
            hot: '',
            publishDate: '',
            title: '',
            top: '',
            type: ''
        }
        const data = Object.assign(defaultQuery, query)
        const url = '/prod-api/press/press/list'
        return this.request({ url, data })
    }
}
