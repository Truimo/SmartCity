import Vue from 'vue'
import Vuex from 'vuex'
import { getStorageSync } from '../utils/tools'

Vue.use(Vuex)

const network = getStorageSync('network', { host: '192.168.1.10', port: 8080 }),
token = getStorageSync('token', '')

const store = new Vuex.Store({
    state: {
        network: network,
        token: token
    },
    mutations: {
        updateNetwork(state, payload) {
            const { host = state.network.host, port = this.state.network.port, save = false } = payload
            state.network.host = host
            state.network.port = port
            if (save) {
                uni.setStorage({ key: 'network', data: { host, port } })
            }
        },
        updateToken(state, payload) {
            const { token = '' } = payload
            state.token = token
            uni.setStorage({ key: 'token', data: token })
        }
    },
    getters: {
        getUrl(state) {
            return state.network.host + ':' + state.network.port
        },
        getToken(state) {
            return state.token.toString()
        }
    }
})

export default store