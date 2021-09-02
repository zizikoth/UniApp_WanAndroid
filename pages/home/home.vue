<template>
	<view class="page">
		<banner ref="banner" />
		<grid-view ref="grid" @itemClick="onChapterClick" />
		<article-list ref="list" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150" />
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
				chapters: [],
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
					// 重新允许上拉加载加载
					self.enableLoadMore = true
					// 关闭下啦刷新
					uni.stopPullDownRefresh()
					// 轮播图
					self.$refs.banner.setBanners(res[0].map((item) => {
						return {
							id: item.id,
							title:item.title,
							image: item.imagePath,
							link: item.url
						}
					}))
					// 公众号
					let data = res[1].length > 7 ? res[1].slice(0, 7) : res
					let chapters = data.map((item) => {
						return {
							image: utils.getAvatar(item.id),
							title: item.name,
							id: item.id
						}
					})
					self.chapters = self.chapters.concat(res[1])
					if (chapters.length < 8) {
						chapters.push({
							image: utils.getAvatar(0),
							title: '更多',
							id: -1
						})
					}
					self.$refs.grid.setData(chapters)
					// 文章列表
					let topArticles = res[2]
					topArticles.forEach((item) => {
						item.isTop = true
					})
					self.$refs.list.setData(topArticles.concat(res[3].datas))
					self.page++
				})
			},
			getHomeArticles() {
				api.getHomeArticles(self.page).then(res => {
					res.curPage == self.$refs.list.addData(res.datas)
					// 判断是否可以继续加载下一页
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
			onChapterClick(id) {
				uni.navigateTo({
					url: `chapter/chapter?chapters=${JSON.stringify(self.chapters)}&id=${id}`
				})
			}
		}
	}
</script>

<style>

</style>
