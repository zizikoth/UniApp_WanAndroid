<template>
	<view class="page">
		<view @click="login">登录</view>
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import dataManager from '@/manager/DataManager.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			login() {
				api.login('Mr.Memo', 'zhx931024').then(res => {
					dataManager.saveUser(res)
				})
			}
		}
	}
</script>

<style>

</style>
