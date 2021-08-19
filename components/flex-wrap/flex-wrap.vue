<template>
	<view>
		<view class="wrap-container">
			<view v-for="(item,index) in data" :key="index" :class="itemClass(item)" @click="itemClick(item)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "flex-wrap",
		props: {
			// {isTitle:Boolean;title:String}
			data: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				itemClass(item) {
					return item.isTitle ? 'wrap-title' : 'wrap-item'
				},
				itemClick(item) {
					this.$emit("itemClick", item)
				}
			};
		}
	}
</script>

<style>
	.wrap-container {
		display: flex;
		flex-direction: row;
		width: calc(100% - 30rpx);
		margin: 15rpx;
		flex-wrap: wrap;
	}

	.wrap-title {
		display: flex;
		width: calc(100% - 50rpx);
		padding-left: 20rpx;
		margin: 15rpx;
		height: 40rpx;
		color: #333333;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.wrap-item {
		display: flex;
		border: solid #666666 1rpx;
		margin: 15rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		border-radius: 30rpx;
		justify-content: center;
		align-items: center;
		color: #666666;
	}
</style>
