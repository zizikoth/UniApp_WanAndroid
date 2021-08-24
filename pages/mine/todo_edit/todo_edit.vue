<template>
	<view>

	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	var self
	export default {
		onLoad(params) {
			self = this
			self.todo = JSON.parse(params.data)
		},
		data() {
			return {
				todo: {}
			}
		},
		methods: {
			title() {
				return utils.orEmpty(self.todo.title)
			},
			content() {
				return utils.orEmpty(self.todo.content)
			}
		}
	}
</script>

<style>

</style>
