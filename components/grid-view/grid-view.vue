<template>
	<view class="grid-view-container" v-if="data!=undefined&&data!=null&&data.length>0">
		<view class="grid-view-item" v-for="(item,index) in data" :key="index" @click="itemClick(item)">
			<image class="grid-view-item-icon" :src="item.image"></image>
			<text class="grid-view-item-title">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "grid-view",
		data() {
			return {
				// icon,title,extra
				data: []
			};
		},
		methods: {
			setData(data) {
				this.data = data
			},
			itemClick(data) {
				this.$emit("itemClick", data.extra)
			}
		}
	}
</script>

<style>
	.grid-view-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 375rpx;
		flex-wrap: wrap;
	}


	.grid-view-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 187.5rpx;
		height: 187.5rpx;
	}

	.grid-view-item-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.grid-view-item-title {
		display: flex;
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 20rpx;
		width: calc(100% - 30rpx);
		height: 30rpx;
		text-align: center;
		justify-content: center;
		color: #333;

		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
</style>
