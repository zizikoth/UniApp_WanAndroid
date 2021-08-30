<template>
	<view class="page">
		<tab class="sticky" ref="tab" @tabChange="onTabChange" />
		<article-list :data="articles" />
		<u-back-top :scrollTop="scrollTop" top="1000" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		data() {
			return {
				page: 1,
				cid: 0,
				enableLoadMore: false,
				articles: [],
				scrollTop: 0
			}
		},
		onLoad() {
			self = this
			self.getProjectTree()
		},
		onPullDownRefresh() {
			self.getProjectTree()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getProjectArticle()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			getProjectTree() {
				api.getProjectTree().then(res => {
					res.forEach((tab) => {
						tab.name = utils.formatHtml(tab.name)
					})
					self.$refs.tab.setTabsAndIndex(res, 0)
					if (res.length > 0) {
						self.cid = res[0].id
						self.getProjectArticle()
					}
				})
			},
			getProjectArticle() {
				if (self.cid != 0) {
					api.getProjectArticle(self.page, self.cid).then(res => {
						uni.stopPullDownRefresh()
						// 判断是否可以继续加载下一页
						res.curPage == 1 ? self.articles = res.datas :
							self.articles = self.articles.concat(res.datas)
						if (res.curPage == 1) utils.pageScrollToTop()
						self.enableLoadMore = res.over == false
						self.page++
					})
				}
			},
			onTabChange(id) {
				self.cid = id
				self.page = 1
				self.getProjectArticle()
			}
		}
	}
</script>

<style>
</style>
