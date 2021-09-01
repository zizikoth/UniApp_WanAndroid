<template>
	<view class="page">
		<view class="collection-container">

			<text class="collection-label">标题</text>
			<u-input class="collection-input" v-model="title" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入标题" :trim="true" />
			<text class="collection-label">作者</text>
			<u-input class="collection-input" v-model="author" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入作者" :trim="true" />
			<text class="collection-label">链接</text>
			<u-input class="collection-input" v-model="link" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入链接" :trim="true" />

			<view class="collection-submit" @click="submit">提交</view>

		</view>
	</view>
</template>

<script>
	import checker from '@/utils/Checker.js'
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	import bus from '@/manager/BusManager.js'
	var self
	export default {
		onLoad(params) {
			self = this
		},
		data() {
			return {
				title: '',
				author: '',
				link: '',
			}
		},
		methods: {
			submit() {
				if (checker.checkCollectionAdd(self.title, self.author, self.link)) {
					api.collectOuterArticle(self.title, self.author, self.link)
						.then(res => {
							getApp().globalData.refresh.collectionRefresh = true
							bus.emitCollect()
							uni.navigateBack({})
						})
				}
			}
		}
	}
</script>

<style>
	.collection-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.collection-label {
		display: flex;
		padding-left: 20rpx;
		margin-bottom: 30rpx;
		height: 40rpx;
		color: #333333;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.collection-input {
		display: flex;
		margin-bottom: 30rpx;
	}

	.collection-submit {
		display: flex;
		width: 100%;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #000000;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		color: #ffffff;
		font-size: 34rpx;
		align-items: center;
		justify-content: center;
	}
</style>
