<template>
	<view cla="page">
		<article-list ref="list" :disable="false" type="more" @optionClick="showMore" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150"/>
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	var self
	export default {
		data() {
			return {
				page: 0,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		onLoad() {
			self = this
			self.squareShareList()
		},
		onPullDownRefresh() {
			self.page = 0
			self.squareShareList()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.squareShareList()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			squareShareList() {
				api.squareShareList(self.page).then(res => {
					uni.stopPullDownRefresh()
					res.curPage == 1 ? self.$refs.list.setData(res.datas) :
						self.$refs.list.addData(res.datas)
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
			showMore(item, option) {
				if (option.text == '更多') {
					uni.navigateTo({
						url: `user_share?title=${item.shareUser}&userId=${item.userId}`
					})
				}
			}
		}
	}
</script>

<style>

</style>
