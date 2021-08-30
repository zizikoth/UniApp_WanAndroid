<template>
	<view class="page">
		<view class="website-container">
			<text class="website-label">标题</text>
			<u-input class="website-input" v-model="name" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入标题" :trim="true" />
			<text class="website-label">链接</text>
			<u-input class="website-input" v-model="link" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入链接" :trim="true" />

			<view class="website-submit" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import checker from '@/utils/Checker.js'
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	var self
	export default {
		onLoad(params) {
			self = this
			self.id = utils.orEmpty(params.id)
			self.name = utils.orEmpty(params.name)
			self.link = utils.orEmpty(params.link)
			console.log(self.id, self.name, self.link)
		},
		data() {
			return {
				id: '',
				name: '',
				link: ''
			}
		},
		methods: {
			submit() {
				if (checker.checkWebsite(self.name, self.link)) {
					let request = utils.isEmpty(self.id) ? api.websiteAdd(self.name, self.link) :
						api.websiteUpdate(self.id, self.name, self.link)
					request.then(res => {
						getApp().globalData.refresh.websiteRefresh = true
						uni.navigateBack({})
					})
				}
			}
		}
	}
</script>

<style>
	.website-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.website-label {
		display: flex;
		padding-left: 20rpx;
		margin-bottom: 30rpx;
		height: 40rpx;
		color: #333333;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.website-input {
		display: flex;
		margin-bottom: 30rpx;
	}

	.website-submit {
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
