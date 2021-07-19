<template>
	<view class="page">
		<banner ref="banner" @itemClick="onBannerClick" />
		<grid-view ref="grid" @itemClick="onChapterClick" />
		<article-item-title title="置顶文章" />
		<article-list ref="list"></article-list>
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import utils from '@/utils/Utils.js'
	import GridView from '../../components/grid-view/grid-view.vue'
	var self
	export default {
		components: {
			GridView
		},
		data() {
			return {
			}
		},
		onLoad() {
			self = this
			self.getHomeData()
		},
		methods: {
			getHomeData() {
				api.getHomeData().then(res => {
					// 轮播图
					self.$refs.banner.setBanners(res[0].map((item) => {
						return {
							image:item.imagePath,
							extra:item.url
						}
					}))
					// 公众号
					let data = res[1].length > 7 ? res[1].slice(0, 7) : res
					let chapters = data.map((item) => {
						return {
							image: utils.getAvatar(item.id),
							title: item.name,
							extra: item.id
						}
					})
					if (chapters.length < 8) {
						chapters.push({
							image: utils.getAvatar(0),
							title: '更多',
							extra: -1
						})
					}
					self.$refs.grid.setData(chapters)
					// 置顶文章
					self.$refs.list.setData(res[2])
				})
			},
			onBannerClick(url) {
				utils.toast(url)
			},
			onChapterClick(id) {
				utils.toast(id)
			}
		}
	}
</script>

<style>

</style>
