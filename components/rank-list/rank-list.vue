<template>
	<view>
		<view class="rank-container" v-for="(item,index) in list" :key="item.userId">
			<view class="rank-rank-box">
				<image v-if="item.rank==1" class="rank-rank-image" src="@/static/ic_first.png" mode="aspectFit" />
				<image v-if="item.rank==2" class="rank-rank-image" src="@/static/ic_second.png" mode="aspectFit" />
				<image v-if="item.rank==3" class="rank-rank-image" src="@/static/ic_third.png" mode="aspectFit" />
				<text v-if="item.rank>3" class="rank-text">{{item.rank}}</text>
			</view>
			<text class="rank-name">{{item.username}}</text>
			<text class="rank-text">{{item.coinCount}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "rank-list",
		data() {
			return {
				list: []
			}
		},
		methods: {
			src(item) {
				return item.rank == 1 ? '@/static/ic_first.png' :
					item.rank == 2 ? '@/static/ic_second.png' :
					item.rank == 2 ? '@/static/ic_third.png' : ''
			},
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
	.rank-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: calc(100% - 30rpx);
		margin-right: 30rpx;
	}

	.rank-rank-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 80rpx;
	}

	.rank-rank-image {
		display: flex;
		width: 50rpx;
		height: 50rpx;
	}

	.rank-text {
		display: flex;
		color: #666666;
		font-size: 28rpx;
	}

	.rank-name {
		display: flex;
		margin-left: 30rpx;
		flex: 1;
		color: #666666;
		font-size: 28rpx;
	}
</style>
