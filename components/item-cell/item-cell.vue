<template>
	<view class="item-cell-box">
		<view class="item-cell-container" @click="onClick" hover-class="item-cell-hover">
			<text>{{title}}</text>
			<u-icon name="arrow-right" size="28" color="#333333" />
		</view>
		<view v-if="showline" class="line" />
	</view>
</template>

<script>
	export default {
		name: "item-cell",
		props: {
			title: {
				type: String,
				default: '请设置标题'
			},
			showline: {
				type: Boolean,
				default: true
			},

		},
		methods: {
			onClick() {
				this.$emit("click", this.title)
			}
		}
	}
</script>

<style>
	.item-cell-box {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	
	.item-cell-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		height: 80rpx;
		font-size: 26rpx;
		color: #333333;
		font-weight: bold;
	}

	.item-cell-hover {
		background-color: #F5F5F5;
	}
</style>
