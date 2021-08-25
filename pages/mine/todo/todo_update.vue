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
			<text class="todo-label">完成状态</text>
			<u-input class="todo-input" v-model="statusName" type="select" :border="true" border-color="#333333"
				placeholder="请选择完成状态" @click="sheetShow(3)" />
			<u-action-sheet :list="statusList" v-model="statusShow" @click="statusClick" />
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
			let todo = JSON.parse(params.data)
			console.log(todo)
			self.id = todo.id
			self.title = todo.title
			self.content = todo.content
			if (!utils.isEmpty(todo.type)) self.type = todo.type
			self.typeName = self.type == 1 ? '工作' : self.type == 2 ? '生活' : self.type == 3 ? '个人' : '其他'
			if (!utils.isEmpty(todo.priority)) self.priority = todo.priority
			self.priorityName = self.priority == 4 ? '紧急！！' : self.priority == 3 ? '重要！' : self.priority == 2 ? '一般' : '随便'
			if (!utils.isEmpty(todo.status)) self.status = todo.status
			self.statusName = self.status == 1 ? '已完成' : '未完成'
		},
		data() {
			return {
				id: '',
				title: '',
				content: '',
				type: '4',
				typeName: '',
				priority: '1',
				priorityName: '',
				status: '0',
				statusName: '',
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
				}],
				statusShow: false,
				statusList: [{
					id: 0,
					text: '未完成'
				}, {
					id: 1,
					text: '已完成'
				}]
			}
		},
		methods: {
			sheetShow(type) {
				if (type == 1) {
					self.typeShow = true
				} else if (type == 2) {
					self.priorityShow = true
				} else {
					self.statusShow = true
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
			statusClick(index) {
				let temp = self.statusList[index]
				self.status = temp.id
				self.statusName = temp.text
				self.statusShow = false
			},
			submit() {
				if (checker.checkTodoUpdate(self.title, self.content, self.type, self.priority, self.status)) {
					api.todoUpdate(self.id, self.title, self.content, self.type, self.priority, self.status)
						.then(res => {
							getApp().globalData.refresh.todoRefresh = true
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
