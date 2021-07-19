<template>
	<view class="article-item-title-container">
		<text class="article-item-title-title">{{title}}</text>
		<text class="article-item-title-more" v-if="more" @click="itemClick">更多</text>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "这个是标题",
			},
			more: {
				type: Boolean,
				default: false
			},
			extra: {
				type: Object,
				default: null
			}
		},
		methods: {
			itemClick() {
				this.$emit("itemClick", this.extra)
			}
		}
	}
</script>

<style>
	.article-item-title-container {
		display: flex;
		flex-direction: row;
		width: calc(100% - 60rpx);
		padding-left: 30rpx;
		padding-right: 30rpx;
		height: 90rpx;
		align-items: center;
		justify-content: space-between;
	}

	.article-item-title-title {
		display: flex;
		font-size: 30rpx;
		color: #333333;
		font-weight: bold;
	}

	.article-item-title-more {
		display: flex;
		height: 30rpx;
		width: 60rpx;
		font-size: 26rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		align-items: center;
		border-radius: 30rpx;
		justify-content: center;
		text-align: center;
		background: #F58F98;
		color: #ffffff;
	}
</style>
