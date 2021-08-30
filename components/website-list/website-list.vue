<template>
	<view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item,index) in list" :key="item.id" btnWidth="160"
			@click="optionClick" @content-click="contentClick" @open="open" @close="close" :options="item.options">

			<view class="website-container">
				<text class="website-text">{{item.name}}</text>
				<text class="website-text">{{item.link}}</text>
			</view>

			<view class="line" style="margin-top:20rpx" />

		</u-swipe-action>
	</view>

</template>

<script>
	export default {
		name: "website-list",
		data() {
			return {
				list: []
			};
		},
		methods: {
			setData(data) {
				data.forEach(item => {
					item.show = false
					item.options = [{
						text: '修改',
						style: {
							'border-radius': '80rpx',
							'align-self': 'center',
							'text-align': 'center',
							'justify-content': 'center',
							'font-size': '26rpx',
							height: '160rpx',
							backgroundColor: '#49A2FF'
						}
					}, {
						text: '删除',
						style: {
							'border-radius': '80rpx',
							'align-self': 'center',
							'text-align': 'center',
							'justify-content': 'center',
							'font-size': '26rpx',
							height: '160rpx',
							backgroundColor: '#FF4365'
						}
					}]
				})
				this.list = data
			},
			open(index) {
				this.list[index].show = true
			},
			close(index) {
				this.list[index].show = false
			},
			contentClick(index) {
				this.list[index].show = false
				this.$emit("itemClick", this.list[index])
			},
			optionClick(index, position) {
				this.list[index].show = false
				this.$emit("itemOptionClick", this.list[index], this.list[index].options[position])
			},
			isLastOne() {
				return this.list.length == 1
			},
			websiteDelete(id) {
				let index = this.list.findIndex(item => {
					return item.id == id
				})
				if (index != -1) {
					this.list.splice(index, 1)
				}
			},
		}
	}
</script>

<style>
	.website-container {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: space-around;
		height: 160rpx;
	}

	.website-text {
		display: flex;
		width: 100%;
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 28rpx;
		color: #666666;
	}
</style>
