<template>
	<view class="page">
		<website-list ref="list" @itemClick="itemClick" @itemOptionClick="itemOptionClick" />

		<empty-view v-show="empty" />

		<view class="float-btn card">
			<u-icon class="website-add" name="plus-circle" color="#333333" size="80" @click="websiteAdd" />
		</view>

	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	var self
	export default {
		onLoad() {
			self = this
			self.websiteList()
		},
		onShow() {
			if (getApp().globalData.refresh.websiteRefresh) {
				getApp().globalData.refresh.websiteRefresh = false
				self.websiteList()
			}
		},
		onPullDownRefresh() {
			self.websiteList()
		},
		data() {
			return {
				empty: false,
			}
		},
		methods: {
			websiteList() {
				api.websiteList().then(res => {
					uni.stopPullDownRefresh()
					self.empty = utils.isEmptyList(res)
					self.$refs.list.setData(res)
				})
			},
			itemClick(item) {
				utils.openLink(-1, item.name, item.link)
			},
			itemOptionClick(item, option) {
				switch (option.text) {
					case "修改":
						let params = `id=${item.id}&name=${item.name}&link=${item.link}`
						uni.navigateTo({
							url: 'website_edit?' + params
						})
						break;
					case "删除":
						api.websiteDelete(item.id).then(res => {
							self.$refs.list.websiteDelete(item.id)
							self.empty = self.$refs.list.isEmpty()
						})
						break;
				}
			},
			websiteAdd() {
				uni.navigateTo({
					url: 'website_edit'
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
