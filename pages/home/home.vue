<template>
	<view class="content page" style="">
		
		<view>
			<!-- 搜索框 -->
				<uni-search-bar @confirm="search" placeholder="请输入文章标题" bgColor="#EEEEEE"  />
		</view>
		
		<view style="height: 190px; padding: 10px;">
			<!-- swiper -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="">
				<swiper-item v-for="item in list" :key="item.id" @click="goSwiperDetail(item.targetId,item.servModule)">
					<view class="swiper-item">
						<image :src="`http://124.93.196.45:10001${item.advImg}`" mode="widthFix" ></image>
						
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		
		<uni-section title="更多服务" sub-title="" type="line">
			<view class="moreService" >
				<!-- 以图标名称为单元格显示，每行5个，共两行
					 第二行最后一个为“更多服务”
				 -->
				<view class="sortBox" v-for="(item, index) in AllServiceList" :key="item.id" >
					<image :src="`http://124.93.196.45:10001${item.imgUrl}`" mode="widthFix"></image>
					<text>{{item.serviceName}}</text>
				</view>
				
				<view class="sortBox">
					<image src="../../static/images/home/更多服务@2x.png" mode="widthFix"></image>
					<text>更多服务</text>
				</view>
				
			</view>
		</uni-section>
		
		<view>
			<!-- 热门主题模块  每行两个热门主题，每个主题布局为圆角矩形图标 下方为标题 多出标题省略号显示 -->
			<uni-section title="热门主题" sub-title="" type="line">
				<view class="hotBox">
					
					<view v-for="item in hotNewsList" :key="item.id" @click="goNewsDetail(item.id)">
						<image :src="`http://124.93.196.45:10001${item.cover}`" mode=""></image>
						<text>{{item.title}}</text>
					</view>
					
					
				</view>
			</uni-section>
		</view>
		
		<view style=" padding-bottom: var(--window-bottom);">
			<!-- 新闻专栏 上方标签页显示新闻类别，下方显示新闻列表，列表项包括图片，标题，内容缩写（超出省略），评论总数，发布时间 -->
			
			<uni-section title="新闻专栏" sub-title="" type="line">
				<view class="">
					<!-- <uni-segmented-control :current="current" :values="" @clickItem=""></uni-segmented-control> -->
					<uni-segmented-control :current="current" styleType="text" active-color="#0404e1" :values="newsClassify"></uni-segmented-control>
					
					<view class="content">
						
						<view v-show="current === 0">
							
							<uni-card class="" v-for="(item,index) in newsList" :key="item.id">
								
								<view class="newsCardContent">
									<view class="newsCardContentBox">
										<image :src="`http://124.93.196.45:10001${item.cover}`" mode=""></image>
									</view>
									
									<view class="newsCardContentBox">
										<uni-group>
											<view class="newsTitle"> {{item.title}} </view>
											<view> <rich-text :nodes="item.content"></rich-text> </view>
											<view> {{item.total}} </view>
											<view> {{item.publishDate}} </view>
										</uni-group>
									</view>
								</view>
								
							</uni-card>
							
						</view>
						
						<view v-show="current === 1">
							选项卡2的内容
						</view>
						<view v-show="current === 2">
							选项卡3的内容
						</view>
						
					</view>
				</view>
				<view class="">
					
				</view>
			</uni-section>
		</view>
		
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				list: [],
				newsList: [],
				newsClassify: [],
				newsList: [],
				hotNewsList: [],
				AllServiceList: [],
				current: 0,
				items: ['选项1', '选项2', '选项3']
			};
		},
		onLoad() {
			this.getSwiper();
			this.getNewsClassify();
			this.getAllService();
			this.getNewsList();
			this.getHotNews({hot: "Y"});
		},
		methods: {
			// 搜索
			search(res) {
				console.log(res.value);
			},
			
			getSwiper() {
				this.$utils.h("/prod-api/api/rotation/list","GET").then(res => {
					this.list = res.rows
					console.log("轮播图",this.list);
				})
				
			},
			//点击轮播跳转指定页
			goSwiperDetail(id,moduleName) {
				console.log(id,moduleName);
				uni.navigateTo({
					url: "/pages/swiperDetail/swiperDetail?id=" + id
				})
			},
			// 新闻分类
			getNewsClassify() {
				
				this.$utils.h("/prod-api/press/category/list","GET").then(res => {
					// console.log(res.data);
					this.newsList = res.data
					console.log("新闻分类",this.newsList);
					this.newsList.forEach(e => {
						this.newsClassify.push(e.name)
					})
					
					console.log("新闻分类2",this.newsClassify);
					
				})
			},
			// 获取全部服务
			getAllService() {
				this.$utils.h("/prod-api/api/service/list","GET").then(res => {
					// console.log(res.data,"11");
					this.AllServiceList = res.rows
					// console.log(res.rows,"22");
					console.log("全部服务",this.AllServiceList);
					//对数据进行 排序 截取
					this.AllServiceList = this.AllServiceList.sort(this.sortBy('sort')).slice(0,9)
					console.log("排序后",this.AllServiceList);
				})
			},
			// 自定义排序规则
			sortBy(property) {
				return function(value1,value2) {
					let a = value1[property]
					let b = value2[property]
					return a < b ? 1 : a > b ? -1 : 0;
				}
			},
			getNewsList() {
				this.$utils.h("/prod-api/press/press/list","GET").then(res => {
					this.newsList = res.rows
					console.log("新闻列表",this.newsList);
				})
			},
			
			//获取热点新闻列表/prod-api/press/press/list
			getHotNews(data) {
				// const data = data
				this.$utils.h("/prod-api/press/press/list","GET",data).then(res => {
					// console.log("sss",res.rows);
					this.hotNewsList = res.rows
				})
			},
			goNewsDetail(id) {
				uni.navigateTo({
					url: "/pages/newsDetail/newsDetail?id=" + id
				})
			}
			
		}
	}
</script>

<style lang="scss">
	// .grid-item-box {
	// 		flex: 1;
	// 		// position: relative;
	// 		/* #ifndef APP-NVUE */	
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		align-items: center;
	// 		justify-content: center;
	// 		padding: 15px 0;
	// 	}
	uni-swiper{
		height: 100%;
	}
	
	.swiper-item{
		// margin-top:20rpx;
		// display:flex;
		// flex-wrap: wrap;
		// justify-content: space-around;
		image{
			// max-width: 400rpx;
			// width: 320rpx !important;
			width: 100%;
			// height: auto;
		}
	}
	
	
	
	.moreService{
		// box-sizing: border-box;
		padding: 10px;
		display: flex;
		flex-flow: row wrap;
		// flex-wrap: wrap;
		justify-content: start;
		// border: 1px solid red;
		.sortBox{
			box-sizing: border-box;
			// width: 73rpx;
			height: auto;
			padding: 10px;
			display: flex;
			flex: 0 0 20%;
			flex-direction: column;
			align-items: center;
			
			// padding-top: 25%;
			text{
				text-align: center;
				font-size: 10px;
				padding-top: 8rpx;
			}
			image{
				width: 100%;
				height: auto;
			}
		}
		
	}
	
	.hotBox{
		display: flex;
		flex-flow: row nowrap; 
		justify-content: space-around;
		align-items: center;
		
		view{
			display: flex;
			flex-flow: column nowrap; 
			
			
			width: 45%;
			height: 260rpx;
			// background-color: red;
			border-radius: 20rpx;
			text{
				height: 40px;
				// height: 20%;
				line-height: 25px;
				display:block;
				// padding: 8rpx 0;
				text-align: center;
				text-overflow:ellipsis; 
				overflow:hidden; 
				white-space: nowrap; 
				
			}
			
		}
		
		image{
			max-height: 260rpx;
			max-width: 100%;
		}
	}
	
	.newsCardContent{
		height: 300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.newsCardContentBox{
			// display: flex;
			width: 50%;
			// display: block !important;
			image{
				width: 100%;
				height: 300rpx;
			}
			.newsTitle{
				color: #111;
			}
			rich-text{
				
				color: #999;
				max-height: 130upx;
				overflow: hidden;
				word-break: break-all;  /* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;  /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2; /** 显示的行数 **/
			}
		}
	}
	
</style>
