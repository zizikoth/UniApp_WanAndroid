<template>
	<view>
		<view class="coin-container" v-for="(item,index) in list" :key="item.id">
			<text class="coin-text">{{item.userName}}</text>
			<text class="coin-text">{{item.reason}}</text>
			<text class="coin-text">{{item.desc}}</text>
			<view class="line" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "coin-list",
		data() {
			return {
				list: []
			};
		},
		methods: {
			setData(data) {
				this.list = data
			},
			addData(data) {
				this.list = this.list.concat(data)
			}
		}
	}
</script>

<style>
	.coin-container {
		display: flex;
		flex-direction: column;
		width: ;
		margin-left: 30rpx;
		margin-top: 20rpx;
		margin-right: 30rpx;
	}

	.coin-text {
		display: flex;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #666666;
	}
</style>
