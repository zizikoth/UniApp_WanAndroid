<template>
	<view class="page">
		<web-view :src="link">
			<!-- #ifdef MP-WEIXIN -->
			<cover-image v-if="!collected && delayShow" class="float-btn card" src="@/static/icon_collect.png"
				@click="collect" />
			<cover-image v-if="collected && delayShow" class="float-btn card" src="@/static/icon_collected.png"
				@click="collect" />
			<!-- #endif -->
		</web-view>

		<!-- #ifndef MP-WEIXIN -->
		<view class="float-btn card" @click="collect">
			<u-icon :name="collected?'heart-fill':'heart'" color="#f56767" size="60" />
		</view>
		<!-- #endif -->


	</view>
</template>

<script>
	import dataManager from '@/manager/DataManager.js'
	import bus from '@/manager/BusManager.js'
	import api from '@/http/ApiService.js'
	var self
	export default {
		data() {
			return {
				id: 0,
				title: '',
				link: '',
				collected: false,
				delayShow: false
			}
		},

		onLoad(params) {
			self = this
			self.id = params.id
			self.link = params.link
			uni.setNavigationBarTitle({
				title: params.title
			})
			self.collected = dataManager.isCollected(self.id)
			console.log(self.id, params.title, params.link)
			console.log("collected = " + self.collected, dataManager.getUser())
			setTimeout(function() {
				self.delayShow = true
			}, 800)
		},
		methods: {
			collect() {
				if (self.collected) {
					// 取消收藏
					api.unCollectInArticle(self.id).then(res => {
						getApp().globalData.refresh.collectionRefresh = true
						dataManager.removeCollection(self.id)
						bus.emitCollect()
						self.collected = false
					})
				} else {
					// 收藏
					api.collectInnerArticle(self.id).then(res => {
						getApp().globalData.refresh.collectionRefresh = true
						dataManager.addCollection(self.id)
						bus.emitCollect()
						self.collected = true
					})
				}
			}
		}
	}
</script>

<style>
	.float-btn {
		display: flex;
		position: fixed;
		top: calc(var(--window-top) + 30rpx);
		right: 30rpx;
		width: 80rpx;
		height: 80rpx;
		align-items: center;
		justify-content: center;
		border-radius: 90rpx;
		background: #FFFFFF;
		z-index: 999;
	}
</style>
