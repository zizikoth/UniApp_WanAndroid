<template>
	<view class="page">
		<view class="card-container card" style="align-items: center;">
			<view style="display: flex;flex-direction: column; align-items: center;">
				<image class="avatar" src="@/static/avatar.png" @click="login" />
				<text class="name" @click="login">{{userName}}</text>
			</view>
			<image class="login-out" src="@/static/icon_login_out.png" @click="showLoginOut" />
			<view class="info-container">
				<view class="info-item" @click="onItemClick('收藏')">
					<text class="info-item-num">{{collectNum}}</text>
					<text class="info-item-name">收藏</text>
				</view>
				<view class="info-item" @click="onItemClick('积分')">
					<text class="info-item-num">{{coinNum}}</text>
					<text class="info-item-name">积分</text>
				</view>
				<view class="info-item" @click="onItemClick('排名')">
					<text class="info-item-num">{{rankNum}}</text>
					<text class="info-item-name">排名</text>
				</view>
			</view>
		</view>

		<view class="card-container card">
			<item-cell title="未完清单" @click="onItemClick" />
			<item-cell title="网址收藏" @click="onItemClick" />
			<item-cell title="我的分享" @click="onItemClick" />
			<item-cell title="分享广场" @click="onItemClick" :showline="false" />
		</view>


		<u-mask class="tip-mask" :show="show" @click="show = false">
			<tip-mask content="是否退出登录" @positive="loginOut" />
		</u-mask>

	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	import dataManager from '@/manager/DataManager.js'
	import bus from '@/manager/BusManager.js'
	var self
	export default {
		data() {
			return {
				userName: '请登录',
				collectNum: 0,
				coinNum: 0,
				rankNum: 0,
				show: false,
			}
		},
		onLoad() {
			self = this
			if(utils.isLogined()){
				let name = dataManager.getUser().nickname
				if (!utils.isEmpty(name)) self.userName = name
			}
			self.getCoinInfo()
			bus.onLogin(function() {
				let name = dataManager.getUser().nickname
				if (!utils.isEmpty(name)) self.userName = name
				self.getCoinInfo()
			})
			bus.onCollect(function() {
				self.getCoinInfo()
			})
		},
		onUnload() {
			bus.offLogin()
		},
		methods: {
			getCoinInfo() {
				api.getCoinInfo().then(res => {
					self.collectNum = res[0].total
					self.coinNum = res[1].coinCount
					self.rankNum = res[1].rank
				})
			},
			login() {
				utils.isLogined()
			},
			showLoginOut() {
				if (utils.isLogined(false)) {
					self.show = true
				} else {
					utils.toast("请先登录")
				}
			},
			loginOut() {
				api.loginOut().then(res => {
					dataManager.clear()
					self.userName = '请登录',
						self.collectNum = 0,
						self.coinNum = 0,
						self.rankNum = 0,
						uni.navigateTo({
							url: '../other/login/login'
						})
				})
			},
			onItemClick(title) {
				if (utils.isLogined()) {
					switch (title) {
						case "收藏":
							uni.navigateTo({
								url: 'collection/collection'
							})
							break;
						case "积分":
							uni.navigateTo({
								url: 'coin/coin'
							})
							break;
						case "排名":
							uni.navigateTo({
								url: 'rank/rank'
							})
							break;
						case "未完清单": {
							uni.navigateTo({
								url: 'todo/todo'
							})
							break;
						}
						case "网址收藏": {
							uni.navigateTo({
								url: 'website/website'
							})
							break;
						}
						case "我的分享": {
							uni.navigateTo({
								url: 'my_share/my_share'
							})
							break;
						}
						case "分享广场": {
							uni.navigateTo({
								url: 'share_square/share_square'
							})
							break;
						}
					}
				}
			}
		}
	}
</script>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		border-radius: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin: 30rpx;
	}

	.login-out {
		position: fixed;
		right: 50rpx;
		width: 40rpx;
		height: 40rpx;
		color: #000000;
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

	.name {
		display: flex;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.info-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		width: 100%;
	}

	.info-item {
		height: 80rpx;
		width: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}

	.info-item-num {
		display: flex;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.info-item-name {
		display: flex;
		font-size: 25rpx;
		color: #999999;
	}

	.tip-mask {
		display: flex;
		align-content: center;
		align-self: center;
		align-items: center;
		justify-content: center;
	}
</style>
