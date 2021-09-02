<template>
	<view class="empty-view-container">
		<image class="empty-view-image" src="@/static/icon_status_data_empty.png" />
		<text>暂无数据</text>
	</view>
</template>

<script>
	export default {
		name: "empty-view"
	}
</script>

<style>
	.empty-view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 160rpx;
		justify-content: center;
		font-size: 30rpx;
		color: #666666;
	}

	.empty-view-image {
		width: 400rpx;
		height: 400rpx;
	}
</style>
