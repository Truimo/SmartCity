<template>
	<view>
		
		<uni-section class="mb-10" :title="list.title" :sub-title="list.subTitle || '暂无'">
			<text style="padding: 12px 10px;">发布日期: {{list.publishDate}}</text>
		</uni-section>
		<view class="newsBox">
			<image :src="`http://124.93.196.45:10001${list.cover}`" mode="widthFix"></image>
			<rich-text :nodes="list.content"></rich-text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"newsDetail",
		data() {
			return {
				list: []
			};
		},
		props: ['id'],
		created() {
			console.log(this.id);
			this.$utils.h("/prod-api/api/park/press/press/" + this.id,"GET").then(res => {
				// console.log(res.data);
				this.list = res.data
				// console.log(this.list);
			})
		}
	}
</script>

<style lang="scss">
	.newsBox{
		display: flex;
		flex-direction: column;
		padding: 12px 10px;
		rich-text{
			padding: 12px 0;
		}
		image{
			width: 100%;
			height: auto;
		}
	}
</style>