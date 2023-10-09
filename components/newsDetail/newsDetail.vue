<template>
	<view>
		<uni-section class="mb-10" :title="title" :sub-title="subTitle || '暂无'">
			<text style="padding: 12px 10px;">发布日期: {{publishDate}}</text>
		</uni-section>
		<view class="newsBox">
			<image :src="`http://124.93.196.45:10001${cover}`" mode="widthFix"></image>
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "NewsDetail",
		data() {
			return {
                title: '',
                subTitle: '',
                publishDate: '',
                content: '',
                cover: ''
			}
		},
		props: ['id'],
		created() {
			console.log(this.id);
            const baseUrl = this.$api.getUrl()
			this.$api.getParkPress(this.id).then(({ data }) => {
				this.title = data.title
                this.subTitle = data.subTitle
                this.publishDate = data.publishDate
                this.content = data.content.replace(/\/prod-api\//g, `http://${baseUrl}/prod-api/`)
                this.cover = data.cover
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