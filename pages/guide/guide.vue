<template>
    <view class="content page">
        <swiper class="swiper" :indicator-dots="true">
            <swiper-item v-for="(item, index) in 5">
                <image src="../../static/images/guide_b.jpg" mode="center"></image>
                <view class="box">
                    <button v-if="index == 4" size="default" type="primary" @click="clickLogin()">进入主页</button>
                    <button v-if="index == 4" size="default" type="primary" @click="networkOptios()">网络设置</button>
                </view>
            </swiper-item>
        </swiper>
        <!-- 输入框示例 -->
        <view>
            <uni-popup ref="inputDialog" type="dialog">
                <uni-card title="网络设置" thumbnail="" note="Tips">
                    <view>当前ip:{{network.host}}</view>
                    <view>当前端口号:{{network.port}}</view>
                    <form @submit="modifyNetwork">
                        <uni-easyinput type="text" name="host" placeholder="请输入IP地址" />
                        <uni-easyinput type="number" name="port" placeholder="请输入端口号" />
                        <button type="default" form-type="submit">修改</button>
                        <button type="default" @click="saveSettings()">保存</button>
                    </form>
                </uni-card>
            </uni-popup>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                areaShow: true,
                testForms: {
                    ipAddrs: '',
                    port: ''
                }
            }
        },
        computed: {
            network() {
                return this.$store.state.network
            }
        },
        methods: {
            clickLogin() {
                uni.switchTab({
                    url: '/pages/home/home'
                })
            },
            networkOptios() {
                this.$refs.inputDialog.open()
            },
            dialogInputConfirm() {
                this.$refs.inputDialog.close()
            },
            modifyNetwork(ev) {
                const { host, port } = ev.detail.value
                this.$store.commit('updateNetwork', { host, port })
            },
            saveSettings() {
                this.$store.commit('updateNetwork', { save: true })
            }
        }
    }
</script>

<style lang="scss">
    .swiper {
        position: relative;
        height: calc(100%);
        width: 100%;
    }
    .box {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        bottom: 3%;
        button {
            width: 100px;
            height: 50px;
            line-height: 50px;
        }
    }

    .uni-dialog-content {
        flex-direction: column;
    }

    image {
        height: 100%;
        width: 100%;
    }
</style>