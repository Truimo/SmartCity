<template>
	<view class="content">
		<uni-section title="表单校验" type="line">
			<view class="example">
				<!-- 基础表单校验 -->
				<uni-forms ref="userForm" :model="userPwd">
					
					<uni-forms-item label="原密码" required name="oldPwd">
						<uni-easyinput v-model="userPwd.oldPwd" placeholder="请输入原密码" />
					</uni-forms-item>
					
					<uni-forms-item label="新密码" required name="newPwd">
						<uni-easyinput v-model="userPwd.newPwd" placeholder="请输入新密码" />
					</uni-forms-item>
			
					<button form-type="submit" type="primary" size="default" style="width: 50%;" @click="submit('userForm')">提交</button>
				</uni-forms>
				
				<!-- <form action="" @submit="submit">
					
					<uni-easyinput name="name" placeholder="" />
					
					<button form-type="submit" type="default" size="default" style="width: 100;">提交</button>
				</form>
				 -->
				
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPwd: {
					oldPwd: '22',
					newPwd: '22',
				}
			};
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
