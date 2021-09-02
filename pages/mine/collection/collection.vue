<template>
	<view class="page">
		<article-list ref="list" :disable="false" type="delete" @optionClick="collectionDelete" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150" />

		<view class="float-btn card">
			<u-icon name="plus-circle" color="#333333" size="80" @click="collectionAdd" />
		</view>
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
			self.collectionList()
		},
		onShow() {
			if (getApp().globalData.refresh.collectionRefresh) {
				getApp().globalData.refresh.collectionRefresh = false
				self.page = 0
				self.collectionList()
			}
		},
		onPullDownRefresh() {
			self.page = 0
			self.collectionList()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.collectionList()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			collectionList() {
				api.collectionList(self.page).then(res => {
					uni.stopPullDownRefresh()
					res.curPage == 1 ? self.$refs.list.setData(res.datas) :
						self.$refs.list.addData(res.datas)
					self.enableLoadMore = res.over == false
					self.page++
				})
			},
			collectionDelete(item, option) {
				if (option.text == '删除') {
					api.unCollectInList(item.id, item.originId).then(res => {
						if (self.$refs.list.isLastOne()) {
							self.page = 0
							self.collectionList()
						}
						self.$refs.list.itemDelete(item.id)

					})
				}
			},
			collectionAdd() {
				uni.navigateTo({
					url: 'collection-add'
				})
			}
		}
	}
</script>

<style>
	.float-btn {
		display: flex;
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		align-items: center;
		justify-content: center;
		border-radius: 90rpx;
	}
</style>
