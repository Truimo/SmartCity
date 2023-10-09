<template>
	<view class="content">
		<view class="userImgBox">
			<image src="../../static/logo.png" mode=""></image>
			<text>昵称：用户昵称</text>
		</view>
		
		<view class="userContent">
			
			<!-- <view class="" v-for="(item,index) in 4" @click="gotoPage(index)">
				<uni-icons type="person" size="30"></uni-icons>
				<text>个人信息</text>
			</view> -->
			
			
			
			<view class="" @click="gotoUserInfo()">
				<uni-icons type="person" size="30"></uni-icons>
				<text>个人信息</text>
			</view>
			
			<view class="" @click="gotoUserPwd()">
				<uni-icons type="locked" size="30"></uni-icons>
				<text>修改密码</text>
			</view>
			
			<view class="" @click="gotoUserPwd()">
				<uni-icons type="locked" size="30"></uni-icons>
				<text>订单列表</text>
			</view>
			
			<view class="" @click="gotoUserPwd()">
				<uni-icons type="locked" size="30"></uni-icons>
				<text>意见反馈</text>
			</view>
			
		</view>
		
		<view class="btnBox">
			<button type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			
			gotoUserInfo() {
				uni.navigateTo({
					url: "/pages/userHome/userInformation/userInformation"
				})
			},
			gotoUserPwd() {
				uni.navigateTo({
					url: '/pages/userHome/userPwd/userPwd',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang="scss">
	.userImgBox{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// margin: 10px;
		// background-color: red;
		image{
			width: 25%;
			height: 200rpx;
			padding-top: 5px;
			padding-bottom: 10px;
		}
		text{
			
		}
		
	}
	
	// 用户列表
	.userContent{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		// align-items: center;
		view{
			padding-left: 12rpx;
			display: flex;
			align-items: center;
			height: 100rpx;
			// background-color: skyblue;
			
			text{
				// line-height: ;
			}
		}
	}
	// 退出按钮
	.btnBox{
		padding: 30rpx;
		display: flex;
		
		button{
			width: 80%;
		}
	}
</style>
