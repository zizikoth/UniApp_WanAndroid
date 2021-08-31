<template>
	<view class="page">
		<web-view :src="link" />
	</view>
</template>

<script>
	var self
	export default {
		data() {
			return {
				title: '',
				link: ''
			}
		},
		onLoad(params) {
			self = this
			uni.setNavigationBarTitle({
				title: params.title
			})
			self.link = params.link
			console.log(params.title, params.link)
		},
		methods: {

		}
	}
</script>

<style>

</style>
