<template>
	<view class="content page">
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item v-for="(item,index) in 5">
				<image src="../../static/images/guide_b.jpg" mode=""></image>
				<view class="box">
					<button v-if="index == 4" size="default" type="primary"
					@click="clickLogin()">进入主页</button>
					
					<button v-if="index == 4" size="default" type="primary"
					@click="networkOptios()">网络设置</button>
				</view>
			</swiper-item>
			
		</swiper>
		
					<!-- 输入框示例 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">
				
				<uni-card title="networkOptions" thumbnail=""  note="Tips">
					
					<!-- <uni-forms :model="testForms" label-position="left">
						<uni-forms-item  label="IP地址" name="ipAddrs">
							<uni-easyinput v-model="testForms.ipAddrs" placeholder="" />
						</uni-forms-item>
						<uni-forms-item label="端口号" name="port">
							<uni-easyinput v-model="testForms.port" placeholder=""></uni-easyinput>
						</uni-forms-item>
					</uni-forms> -->
					
					<!-- <text style="display: block;">当前ip:{{testForms.ipAddrs || '192.168.0.1'}}</text> -->
					<text style="display: block;">当前ip:{{netWorkList.ipAddrs || '192.168.0.1'}}</text>
					
					<text style="display: block;">当前端口号:{{netWorkList.port || '8080'}}</text>
					
					<form @submit="modifyNetWork">
						
						<uni-easyinput name="ipAddrs" placeholder="请输入IP地址" />
						<uni-easyinput name="port" placeholder="请输入端口号" />
						
						<button type="default" form-type="submit">修改</button>
						<button type="default" @click="saveSettings()">保存</button>
						
					</form>
					
	
				</uni-card>
				
				<!-- <uni-forms :model="formData">
					<uni-forms-item label="姓名" name="name">
						<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" name="age">
						<input type="text" v-model="formData.age" placeholder="请输入年龄" />
					</uni-forms-item>
					
				</uni-forms>
				<button @click="submitForm">Submit</button> -->
				
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
import homeVue from '../home/home.vue';
	export default {
		data() {
			return {
				total: 0,
				areaShow: true,
				testForms: {
					ipAddrs: "",
					port: ""
				},
				netWorkList: {
					ipAddrs: "",
					port: ""
				}
			};
		},
		onLoad: () => {
			// uni.hideTabBar();
		},
		methods: {
			clickLogin(){
				uni.switchTab({
					url:"/pages/home/home"
				})
			},
			networkOptios() {
				// this.$refs.popup.open('top')
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(value) {
				// console.log(value);
				this.$refs.inputDialog.close()
			},
			modifyNetWork(e) {
				// console.log(this.testForms);
				this.netWorkList = e.detail.value
				console.log(this.netWorkList);
				console.log(this.testForms.ipAddrs);
			},
			saveSettings() {
				uni.setStorageSync('network_key', this.netWorkList);
			}
		}
	}
</script>

<style lang="scss">
	
	.swiper{
		position: relative;
		height: calc(100%);
		width: 100%;
	}
	.box{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		// justify-content: space-between;
		bottom: 3%;
		// left: 50%;
		button{
			width: 100px;
			height: 50px;
			line-height: 50px;
		}
		// display: inline-block;
		
		
		
		
		
		// background-color: pink;
		
		
		
		
	}
	
	.uni-dialog-content{
		flex-direction: column;
		// margin-top: 10rpx;
		// display: flex;
	}
	image{
		height: 100%;
		width: 100%;
	}
</style>
