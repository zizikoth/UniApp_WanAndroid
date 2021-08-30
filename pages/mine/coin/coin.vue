<template>
	<view class="page">
		<coin-list ref="list" />
		<u-back-top :scrollTop="scrollTop" top="1000" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	var self
	export default {
		data() {
			return {
				page: 1,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		onLoad() {
			self = this
			self.coinHistory()
		},
		onPullDownRefresh() {
			self.page = 1
			self.coinHistory()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.coinHistory()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			coinHistory() {
				api.coinHistory(self.page).then(res => {
					uni.stopPullDownRefresh()
					res.curPage == 1 ? self.$refs.list.setData(res.datas) :
						self.$refs.list.addData(res.datas)
					self.enableLoadMore = res.over == false
					self.page++
				})
			}
		}
	}
</script>

<style>

</style>
