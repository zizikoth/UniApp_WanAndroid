<template>
	<view class="tip-box">
		<view class="tip-container">
			<view class="tip-title">{{title}}</view>
			<view class="tip-content">{{content}}</view>
			<view class="tip-line-h" />
			<view class="tip-tap-container">
				<text class="tip-tap-text" @click="onNegative">{{negative}}</text>
				<view class="tip-line-v" />
				<text class="tip-tap-text" @click="onPositive">{{positive}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "tip-mask",
		props: {
			title: {
				type: String,
				default: "提示"
			},
			content: {
				type: String,
				default: "内容"
			},
			positive: {
				type: String,
				default: "确定"
			},
			negative: {
				type: String,
				default: "取消"
			}
		},
		data() {
			return {
				show: true
			};
		},
		methods: {
			onNegative() {
				this.$emit("negative")
			},
			onPositive() {
				this.$emit("positive")
			}
		}
	}
</script>

<style>
	.tip-box {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.tip-container {
		display: flex;
		flex-direction: column;
		width: 500rpx;
		height: auto;
		border-radius: 20rpx;
		background: #ffffff;
		align-items: center;
		justify-content: center;
	}

	.tip-title {
		display: flex;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		color: #333333;
	}

	.tip-content {
		display: flex;
		text-align: center;
		font-size: 28rpx;
		margin: 30rpx;
		font-weight: bold;
		color: #666666;
	}

	.tip-line-h {
		display: flex;
		width: 100%;
		height: 2rpx;
		background: #F5F5F5;
	}

	.tip-tap-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80rpx;
	}

	.tip-line-v {
		display: flex;
		width: 2rpx;
		height: 100%;
		background: #F5F5F5;
	}

	.tip-tap-text {
		display: flex;
		flex: 1;
		font-size: 28rpx;
		color: #666666;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
</style>
