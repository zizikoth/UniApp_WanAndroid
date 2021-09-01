<template>
	<view class="page">
		<rank-list ref="list" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150"/>
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
			self.coinRank()
		},
		onPullDownRefresh() {
			self.page = 1
			self.coinRank()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.coinRank()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			coinRank() {
				api.coinRank(self.page).then(res => {
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
