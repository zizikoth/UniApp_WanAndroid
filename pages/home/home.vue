<template>
	<view class="page">
		<banner ref="banner" @itemClick="onBannerClick" />
		<grid-view ref="grid" @itemClick="onChapterClick" />
		<article-list :data="articles" />
		<u-back-top :scrollTop="scrollTop" top="1000" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	import GridView from '@/components/grid-view/grid-view.vue'
	var self
	export default {
		components: {
			GridView
		},
		data() {
			return {
				// 当前页码
				page: 0,
				// 是否继续加载下一页
				enableLoadMore: false,
				// 内容数据
				articles: [],
				scrollTop: 0
			}
		},
		onLoad() {
			self = this
			self.getHomeData()
		},
		onPullDownRefresh() {
			self.page = 0
			self.getHomeData()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getHomeArticles()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			getHomeData() {
				api.getHomeData().then(res => {
					// 关闭骨架屏
					self.firstLoading = false
					// 重新允许上拉加载加载
					self.enableLoadMore = true
					// 关闭下啦刷新
					uni.stopPullDownRefresh()
					// 轮播图
					self.$refs.banner.setBanners(res[0].map((item) => {
						return {
							image: item.imagePath,
							extra: item.url
						}
					}))
					// 公众号
					let data = res[1].length > 7 ? res[1].slice(0, 7) : res
					let chapters = data.map((item) => {
						return {
							image: utils.getAvatar(item.id),
							title: item.name,
							extra: item.id
						}
					})
					if (chapters.length < 8) {
						chapters.push({
							image: utils.getAvatar(0),
							title: '更多',
							extra: -1
						})
					}
					self.$refs.grid.setData(chapters)
					// 文章列表
					let topArticles = res[2]
					topArticles.forEach((item) => {
						item.isTop = true
					})
					self.articles = topArticles.concat(res[3].datas)
					self.page++
				})
			},
			getHomeArticles() {
				api.getHomeArticles(self.page).then(res => {
					// 判断是否可以继续加载下一页
					res.curPage == 0 ? self.articles = res.datas :
						self.articles = self.articles.concat(res.datas)
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
			onBannerClick(url) {
				utils.toast(url)
			},
			onChapterClick(id) {
				utils.toast(id)
			}
		}
	}
</script>

<style>

</style>
