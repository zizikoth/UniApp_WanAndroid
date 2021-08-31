<template>
	<view class="page">
		<image class="background-image" src="@/static/bg_login.png" mode="aspectFill" />

		<view class="tab-container">
			<u-subsection :current="index" class="tabs" :list="tabs" inactive-color="#333333" active-color="#ffffff"
				:bold="true" bg-color="rgba(255,255,255,0.5)" button-color="#000000" borderRadius="30"
				@change="onTabChange" />
		</view>

		<swiper class="swiper-container" :current="index" @change="onSwipChange">

			<swiper-item>
				<view class="login-container">
					<text class="label">账号</text>
					<view style="height: 80rpx; margin-top: 30rpx;margin-bottom: 120rpx;">
						<u-input class="input" v-model="account" type="text" :border="true" border-color="#333333"
							:clearable="true" placeholder="请输入账号" :trim="true" placeholder-style="color:#666666" />
					</view>

					<text class="label">密码</text>
					<view style="height: 80rpx;margin-top: 30rpx;">
						<u-input class="input" v-model="pwd" type="password" :border="true" border-color="#333333"
							:clearable="true" placeholder="请输入密码" :trim="true" placeholder-style="color:#666666" />
					</view>

					<text class="submit" @click="login">登录</text>
				</view>
			</swiper-item>

			<swiper-item>
				<view class="login-container">
					<text class="label">账号</text>
					<view style="height: 80rpx; margin-top: 30rpx;margin-bottom: 30rpx;">
						<u-input class="input" v-model="account" type="text" :border="true" border-color="#333333"
							:clearable="true" placeholder="请输入账号" :trim="true" placeholder-style="color:#666666" />
					</view>

					<text class="label">密码</text>
					<view style="height: 80rpx;margin-top: 30rpx;margin-bottom: 30rpx;">
						<u-input class="input" v-model="pwd" type="password" :border="true" border-color="#333333"
							:clearable="true" placeholder="请输入密码" :trim="true" placeholder-style="color:#666666" />
					</view>

					<text class="label">重复密码</text>
					<view style="height: 80rpx;margin-top: 30rpx;">
						<u-input class="input" v-model="repwd" type="password" :border="true" border-color="#333333"
							:clearable="true" placeholder="请再次输入密码" :trim="true" placeholder-style="color:#666666" />
					</view>

					<text class="submit" @click="register">注册</text>

				</view>
			</swiper-item>

		</swiper>

	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	import dataManager from '@/manager/DataManager.js'
	import bus from '@/manager/BusManager.js'
	import checker from '@/utils/Checker.js'
	export default {
		data() {
			return {
				tabs: [{
					name: '登录'
				}, {
					name: '注册'
				}],
				index: 0,
				account: 'Mr.Memo',
				pwd: 'zhx931024',
				repwd: 'zhx931024'
			}
		},
		onLoad() {
			self = this
		},
		methods: {
			onTabChange(index) {
				self.index = index
			},
			onSwipChange(e) {
				self.index = e.detail.current
			},
			login() {
				if (checker.checkLogin(self.account, self.pwd)) {
					api.login(self.account, self.pwd).then(res => {
						dataManager.saveUser(res)
						bus.emitLogin()
						uni.navigateBack({})
					})
				}
			},
			register() {
				if (checker.checkRegister(self.account, self.pwd, self.repwd)) {
					api.register(self.account, self.pwd, self.repwd).then(res => {
						self.login()
					})
				}
			}
		}
	}
</script>

<style>
	.background-image {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	.tab-container {
		width: 400rpx;
		height: 100%;
		margin-top: 80rpx;
		height: 74rpx;
		align-self: center;
		border-radius: 10rpx;
		border: solid #000000 1rpx;
	}

	.swiper-container {
		display: flex;
		width: 640rpx;
		height: 800rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		border-radius: 20rpx;
		margin-top: 80rpx;
		align-self: center;
		background: rgba(255, 255, 255, 0.5);
		-moz-box-shadow: 10 10 40rpx rgba(255, 255, 255, 0.5);
		-webkit-box-shadow: 10 10 40rpx rgba(255, 255, 255, 0.5);
		box-shadow: 10 10 40rpx rgba(148, 255, 255, 0.5);

	}

	.login-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.label {
		display: flex;
		padding-left: 20rpx;
		margin-top: 30rpx;
		height: 40rpx;
		color: #333333;
		width: 100%;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.input {
		display: flex;
		width: 100%;
		margin-bottom: 30rpx;
	}

	.submit {
		display: flex;
		position: absolute;
		bottom: 0;
		width: calc(100% - 60rpx);
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #000000;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		color: #ffffff;
		font-size: 34rpx;
		align-items: center;
		justify-content: center;
	}
</style>
