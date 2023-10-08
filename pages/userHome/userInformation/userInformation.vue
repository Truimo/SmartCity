<template>
	<view class="content">
		
		<view class="informationBox">
			
			<uni-section title="表单校验" type="line">
				<view class="example">
					<!-- 基础表单校验 -->
					<uni-forms ref="valiForm" :model="userInfo">
						
						<!-- <uni-forms-item label="用户名" required name="name">
							<uni-easyinput placeholder="请输入姓名" />
						</uni-forms-item> -->
						
						<uni-forms-item label="用户名" required name="name">
							<uni-easyinput v-model="userInfo.name" placeholder="请输入姓名" />
						</uni-forms-item>
						
						<uni-forms-item label="性别" required name="gender">
							<uni-easyinput v-model="userInfo.gender" placeholder="请输入年龄" />
						</uni-forms-item>
						
						<uni-forms-item label="联系电话" name="telephone">
							<uni-easyinput v-model="userInfo.telephone" :value="maskedTelephone" type="text"  placeholder="请输入电话" />
						</uni-forms-item>
						
					<button form-type="submit" type="primary" size="default" style="width: 50%;" @click="submit('valiForm')">提交</button>
						
					</uni-forms>
					
					
				</view>
			</uni-section>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// displayedTelephone: '11',
				userInfo: {
					name: '',
					gender: '',
					telephone: ''
				}
			};
		},
		computed: {
			maskedTelephone() {
				console.log('正在键入');
				// if(this.userInfo.telephone.length >= 4) {
				// 	const lastFourDigits = this.userInfo.telephone.slice(-4);
				// 	const maskedDigits = lastFourDigits.replace(/\d/g,'*');
				// 	return this.userInfo.telephone.slice(0,-4) + maskedDigits;
				// } else {
				// 	return this.userInfo.telephone;
				// }
				 if (this.userInfo.telephone) {
				      return this.userInfo.telephone.slice(0, -4) + '****';
				    } else {
				      return '';
				    }
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log(res);
					 const formData = { ...this.userInfo, telephone: this.maskedTelephone };
					 console.log(formData,'111');
				})
			}
		}
	}
</script>

<style lang="scss">
	.informationBox{
		width: 100%;
		height: 100%;
		// border: 1px solid red;
	}
</style>
