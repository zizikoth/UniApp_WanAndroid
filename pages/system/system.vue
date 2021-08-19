<template>
	<view class="page">

		<view class="tab-box sticky">
			<view class="tab-container">
				<u-subsection :current="index" class="tabs" :list="tabs" inactive-color="#333333" active-color="#ffffff"
					:bold="true" bg-color="#ffffff" button-color="#000000" borderRadius="30" @change="onTabChange" />
			</view>
		</view>

		<swiper style="height: 100vh;width: 100%;" :current="index" @change="onSwipChange">
			<swiper-item>
				<scroll-view scroll-y style="height: 100%;">
					<flex-wrap :data="systemTree" @itemClick="onItemClick" />
				</scroll-view>

			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y style="height: 100%;">
					<flex-wrap :data="naviTree" @itemClick="onItemClick" />
				</scroll-view>
			</swiper-item>
		</swiper>


	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	var self
	export default {
		data() {
			return {
				tabs: [{
					name: '体系'
				}, {
					name: '导航'
				}],
				index: 0,
				systemTree: [],
				naviTree: []
			}
		},
		onLoad() {
			self = this
			self.getData()
		},
		methods: {
			getData() {
				api.getSystemAndNaviTree().then(res => {
					res[0].forEach(item => {
						self.systemTree.push({
							isTitle: true,
							title: item.name
						})
						self.systemTree = self.systemTree.concat(item.children.map(item => {
							return {
								title: item.name,
								cid: item.id
							}
						}))
					})

					res[1].forEach(item => {
						self.naviTree.push({
							isTitle: true,
							title: item.name
						})
						self.naviTree = self.naviTree.concat(item.articles.map(item => {
							return {
								title: item.title,
								link: item.link
							}
						}))
					})
				})

			},
			onTabChange(index) {
				self.index = index
			},
			onSwipChange(e) {
				self.index = e.detail.current
			},
			onItemClick(item) {
				if (item.isTitle == undefined) {
					if (item.cid == undefined) {
						// 页面导航
						utils.openLink(item.link)
					} else {
						// 体系文章
						utils.toast(item.cid)
					}
				}
			}
		}
	}
</script>

<style>
	.tab-box {
		display: flex;
		height: 100rpx;
		width: 100%;
		background: #ffffff;
		align-items: center;
	}

	.tab-container {
		width: 500rpx;
		height: 100%;
		height: 74rpx;
		align-self: center;
		border-radius: 10rpx;
		border: solid #000000 1rpx;
	}
</style>
