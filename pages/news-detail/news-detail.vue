<template>
	<view>
		<NewsDetail :id="id"></NewsDetail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			};
		},
		onLoad(e) {
			// console.log(e.id);
			this.id = e.id
		}
	}
</script>

<style lang="scss">

</style>
