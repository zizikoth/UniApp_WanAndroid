<template>
	<view class="page">
		<article-list ref="list" :disable="false" type="delete" @optionClick="collectionDelete" />
		<u-back-top :scrollTop="scrollTop" top="1000" />
		<u-icon class="collection-add" name="plus-circle" color="#333333" size="80" @click="collectionAdd" />
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
					url: 'collection-add/collection-add'
				})
			}
		}
	}
</script>

<style>
	.collection-add {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
	}
</style>
