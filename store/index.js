import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let network = null

try {
    network = uni.getStorageSync('network')
} catch(error) {
    console.log('获取本地缓存 network 失败：', error.message)
}
network = network ? network : { host: '192.168.1.10', port: 8080 }

const store = new Vuex.Store({
    state: {
        network: network
    },
    mutations: {
        updateNetwork(state, payload) {
            const { host = state.network.host, port = this.state.network.port, save = false } = payload
            state.network.host = host
            state.network.port = port
            if (save) {
                uni.setStorage({
                	key: 'network',
                	data: { host, port }
                })
            }
        }
    },
    getters: {
        getUrl(state) {
            return state.network.host + ':' + state.network.port
        }
    }
})

export default store