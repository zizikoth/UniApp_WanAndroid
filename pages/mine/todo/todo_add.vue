<template>
	<view class="page">
		<view class="todo-container">

			<text class="todo-label">标题</text>
			<u-input class="todo-input" v-model="title" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入标题" :trim="true" />
			<text class="todo-label">内容</text>
			<u-input class="todo-input" v-model="content" type="textarea" :border="true" border-color="#333333"
				:clearable="true" placeholder="请输入内容" :trim="true" />
			<text class="todo-label">清单类型</text>
			<u-input class="todo-input" v-model="typeName" type="select" :border="true" border-color="#333333"
				placeholder="请选择清单类型" @click="sheetShow(1)" />
			<u-action-sheet :list="typeList" v-model="typeShow" @click="typeClick" />
			<text class="todo-label">优先级别</text>
			<u-input class="todo-input" v-model="priorityName" type="select" :border="true" border-color="#333333"
				placeholder="请选择优先级别" @click="sheetShow(2)" />
			<u-action-sheet :list="priorityList" v-model="priorityShow" @click="priorityClick" />

			<view class="todo-submit" @click="submit">提交</view>

		</view>
	</view>
</template>

<script>
	import checker from '@/utils/Checker.js'
	import utils from '@/utils/Utils.js'
	import api from '@/http/ApiService.js'
	var self
	export default {
		onLoad(params) {
			self = this
		},
		data() {
			return {
				title: '',
				content: '',
				type: '4',
				typeName: '其他',
				priority: '1',
				priorityName: '随便',
				typeShow: false,
				typeList: [{
					id: 1,
					text: '工作'
				}, {
					id: 2,
					text: '生活'
				}, {
					id: 3,
					text: '个人'
				}, {
					id: 4,
					text: '其他'
				}],
				priorityShow: false,
				priorityList: [{
					id: 1,
					text: '随便'
				}, {
					id: 2,
					text: '一般'
				}, {
					id: 3,
					text: '重要'
				}, {
					id: 4,
					text: '紧急'
				}]
			}
		},
		methods: {
			sheetShow(type) {
				if (type == 1) {
					self.typeShow = true
				} else {
					self.priorityShow = true
				}
			},
			typeClick(index) {
				let temp = self.typeList[index]
				self.type = temp.id
				self.typeName = temp.text
				self.typeShow = false
			},
			priorityClick(index) {
				let temp = self.priorityList[index]
				self.priority = temp.id
				self.priorityName = temp.text
				self.priorityShow = false
			},
			submit() {
				if (checker.checkTodoAdd(self.title, self.content, self.type, self.priority)) {
					api.todoAdd(self.title, self.content, self.type, self.priority)
						.then(res => {
							getApp().globalData.refresh.todoAdd = true
							uni.navigateBack({})
						})
				}
			}
		}
	}
</script>

<style>
	.todo-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.todo-label {
		display: flex;
		padding-left: 20rpx;
		margin-bottom: 30rpx;
		height: 40rpx;
		color: #333333;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.todo-input {
		display: flex;
		margin-bottom: 30rpx;
	}

	.todo-submit {
		display: flex;
		width: 100%;
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
