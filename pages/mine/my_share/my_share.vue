<template>
	<view class="page">
		<view class="share-header">
			<image class="avatar" src="@/static/avatar.png" @click="login" />
			<view class="share-info-container">
				<text class="share-info-text">{{coinInfo}}</text>
				<text class="share-info-text">{{levelInfo}}</text>
				<text class="share-info-text">{{rankInfo}}</text>
			</view>
			<view class="line10" />
		</view>

		<article-list ref="list" :disable="false" type="delete" @optionClick="myShareDelete" />
		<u-back-top :scrollTop="scrollTop" top="1000" bottom="150"/>

		<view class="float-btn card">
			<u-icon class="share-add" name="plus-circle" color="#333333" size="80" @click="myShareAdd" />
		</view>

	</view>
</template>
<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		data() {
			return {
				coinInfo: '积分：0',
				levelInfo: '等级：0',
				rankInfo: '排名：0',
				page: 1,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		onLoad() {
			self = this
			self.myShareList()
		},
		onShow() {
			if (getApp().globalData.refresh.shareAdd) {
				getApp().globalData.refresh.shareAdd = false
				self.page = 1
				self.myShareList()
			}
		},
		onPullDownRefresh() {
			self.page = 1
			self.myShareList()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.myShareList()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			myShareList() {
				api.myShareList(self.page).then(res => {
					self.coinInfo = '积分：' + res.coinInfo.coinCount
					self.levelInfo = '等级：' + res.coinInfo.level
					self.rankInfo = '排名：' + res.coinInfo.rank
					uni.stopPullDownRefresh()
					res.shareArticles.curPage == 1 ? self.$refs.list.setData(res.shareArticles.datas) :
						self.$refs.list.addData(res.shareArticles.datas)
					self.enableLoadMore = res.shareArticles.over == false
					self.page++
				})
			},
			myShareAdd() {
				uni.navigateTo({
					url: 'share_add/share_add'
				})
			},
			myShareDelete(item, option) {
				if (option.text == '删除') {
					api.myShareDelete(item.id).then(res => {
						if (self.$refs.list.isLastOne()) {
							self.page = 1
							self.myShareList()
						}
						self.$refs.list.itemDelete(item.id)
					})
				}
			}
		}
	}
</script>

<style>
	.share-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.avatar {
		display: flex;
		width: 160rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		height: 160rpx;
		border-radius: 160rpx;
		border: solid 6rpx #eeeeee;
	}

	.share-info-container {
		display: flex;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		width: 100%;
		flex-direction: row;
		align-items: center;
	}

	.share-info-text {
		display: flex;
		flex: 1;
		color: #666666;
		font-size: 28rpx;
		justify-content: center;
		text-align: center;
		align-items: center;
	}

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
