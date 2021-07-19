<template>
	<view class="banner-container" v-if="data!=undefined&&data!=null&&data.length!=0">
		<swiper class="banner-box" :circular="true" :indicator-dots="true" :autoplay="true" :interval="4000"
			previous-margin="40rpx" next-margin="40rpx" indicator-color="#46485F" indicator-active-color="#F58F98"
			:duration="1000" @change="change" :current="position">
			<swiper-item v-for="(item,index) in data" :key="index">
				<image class="banner-image" :src="item.image" mode="aspectFill" @click="itemClick(item)" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "banner",
		data() {
			return {
				// image title
				data: [],
				position: 0
			};
		},
		methods: {
			change(e) {
				this.position = e.detail.current
			},
			setBanners(data) {
				this.data = data
				this.position = 0
			},
			itemClick(item){
				this.$emit("itemClick",item.extra)
			}
		}
	}
</script>

<style>
	.banner-container {
		display: flex;
		height: 400rpx;
		width: 100%;
	}

	.banner-box {
		display: flex;
		width: 100%;
		height: 400rpx;
	}

	.banner-image {
		display: flex;
		width: calc(100% - 20rpx);
		margin: 20rpx;
		height: 360rpx;
		border-radius: 20rpx;
	}

	/deep/ .uni-swiper-dots {
		bottom: 40rpx !important;
	}
</style>
