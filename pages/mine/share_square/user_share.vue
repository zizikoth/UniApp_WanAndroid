<template>
	<view class="page">
		<view class="share-header">
			<image class="avatar" :src="avatar" @click="login" />
			<view class="share-info-container">
				<text class="share-info-text">{{coinInfo}}</text>
				<text class="share-info-text">{{levelInfo}}</text>
				<text class="share-info-text">{{rankInfo}}</text>
			</view>
			<view class="line10" />
		</view>

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
				userId: '',
				avatar: '',
				coinInfo: '积分：0',
				levelInfo: '等级：0',
				rankInfo: '排名：0',
				page: 1,
				enableLoadMore: false,
				scrollTop: 0
			}
		},
		onLoad(params) {
			self = this
			uni.setNavigationBarTitle({
				title: params.title
			})
			self.userId = params.userId
			self.avatar = utils.getAvatar(self.userId)
			self.userShareList()
		},
		onPullDownRefresh() {
			self.page = 1
			self.userShareList()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.userShareList()
		},
		onPageScroll(e) {
			self.scrollTop = e.scrollTop
		},
		methods: {
			userShareList() {
				api.userShareList(self.userId, self.page).then(res => {
					self.coinInfo = '积分：' + res.coinInfo.coinCount
					self.levelInfo = '等级：' + res.coinInfo.level
					self.rankInfo = '排名：' + res.coinInfo.rank
					uni.stopPullDownRefresh()
					res.shareArticles.curPage == 1 ? self.$refs.list.setData(res.shareArticles.datas) :
						self.$refs.list.addData(res.shareArticles.datas)
					self.enableLoadMore = res.shareArticles.over == false
					self.page++
				})
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
		background-color: #F5f5f5;
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

	.share-add {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
	}
</style>
