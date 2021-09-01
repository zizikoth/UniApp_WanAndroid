<template>
	<view>
		<tab class="sticky" ref="tab" @tabChange="onTabChange" />
		<article-list ref="list" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150"/>
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		onLoad(params) {
			self = this
			self.chapters = JSON.parse(params.chapters)
			self.index = self.chapters.findIndex((item) => {
				return item.id == params.id
			})
			self.index = self.index < 0 ? 0 : self.index
			self.cid = self.chapters[self.index].id
			self.getChapterArticles()
		},
		onPullDownRefresh() {
			self.getChapterArticles()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getChapterArticles()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		data() {
			return {
				firstLoad: true,
				chapters: [],
				index: 0,
				page: 1,
				cid: 0,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		methods: {
			getChapterArticles() {
				api.getChapterArticles(self.cid, self.page, '').then(res => {
					if (self.firstLoad) {
						self.firstLoad = false
						self.$refs.tab.setTabsAndIndex(self.chapters, self.index)
					}
					uni.stopPullDownRefresh()
					res.curPage == 1 ? self.$refs.list.setData(res.datas) :
						self.$refs.list.addData(res.datas)
					if (res.curPage == 1) utils.pageScrollToTop()
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
			onTabChange(id) {
				self.cid = id
				self.page = 1
				self.getChapterArticles()
			}
		}
	}
</script>

<style>

</style>
