<template>
	<view class="page">
		<article-list ref="list" />
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
				page: 0,
				cid: 0,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		onLoad(params) {
			self = this
			self.cid = params.cid
			uni.setNavigationBarTitle({
				title: params.title
			})
			self.getSystemArticle()
		},
		onPullDownRefresh() {
			self.page = 0
			self.getSystemArticle()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.getSystemArticle()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			getSystemArticle() {
				api.getSystemArticle(self.cid, self.page).then(res => {
					uni.stopPullDownRefresh()
					res.curPage == 1 ? self.$refs.list.setData(res.datas) :
						self.$refs.list.addData(res.datas)
					if (res.curPage == 1) utils.pageScrollToTop()
					self.enableLoadMore = res.over == false
					self.page++
				})
			}
		}
	}
</script>

<style>

</style>
