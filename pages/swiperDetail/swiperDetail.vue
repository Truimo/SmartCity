<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(e) {
			// console.log(e);
			this.getSwiperDetail(e)
		},
		methods: {
			getSwiperDetail(id) {
				// console.log(id);
				// const url = "/prod-api/api/park/press/press/" + id;
				// console.log(url);
				this.$utils.h("/prod-api/api/park/press/press/"+ id.id,"GET").then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
