<template>
	<view class="page">
		<todo-list ref="list" @itemOptionClick="onItemOptionClick" />
		<u-popup v-model="showFilter" mode="bottom" :safe-area-inset-bottom="true" border-radius="14" @open="open">
			<todo-filter ref="dialog" @submit="submit" />
		</u-popup>

		<u-icon class="todo-add" name="plus-circle" color="#333333" size="80" @click="todoAdd" />
	</view>
</template>

<script>
	import api from '@/http/ApiService.js'
	var self
	export default {
		onLoad() {
			self = this
			self.todoList()
		},
		onShow() {
			if (getApp().globalData.refresh.todoUpdate) {
				getApp().globalData.refresh.todoUpdate = false
				self.filter.page = 1
				self.todoList()
			} else if (getApp().globalData.refresh.todoAdd) {
				getApp().globalData.refresh.todoAdd = false
				self.filter.page = 1
				self.filter.type = ''
				self.filter.priority = ''
				self.filter.status = ''
				self.filter.orderby = '3'
				self.todoList()
			}
		},
		onPullDownRefresh() {
			self.filter.page = 1
			self.todoList()
		},
		onReachBottom() {
			if (self.enableLoadMore) self.todoList()
		},
		onNavigationBarButtonTap() {
			self.showFilter = true
		},
		data() {
			return {
				filter: {
					// 页码
					page: 1,
					// 1 工作 2 生活 3 个人 4 其他
					type: '',
					// 1 随便 2 一般 3 重要 4 紧急
					priority: '',
					// 0 未完成 1 已完成
					status: '',
					// 1 完成时间顺序 2 完成时间倒叙 3 创建时间顺序 4 创建时间倒序
					orderby: '3'
				},
				showFilter: false,
				data: [],
				enableLoadMore: false
			}
		},
		methods: {
			todoList() {
				api.todoList(self.filter).then(res => {
					uni.stopPullDownRefresh()
					// 判断是否可以继续加载下一页
					res.curPage == 1 ? self.data = res.datas :
						self.data = self.data.concat(res.datas)
					self.enableLoadMore = res.over == false
					self.filter.page++
					self.$refs.list.setData(self.data)
				})
			},
			onItemOptionClick(item, option) {
				switch (option.text) {
					case '已完成':
						api.todoComplete(item.id, true).then(res => {
							self.$refs.list.todoComplete(item.id, true)
						})
						break;
					case '未完成':
						api.todoComplete(item.id, false).then(res => {
							self.$refs.list.todoComplete(item.id, false)
						})
						break;
					case '修改':
						let json = JSON.stringify(item)
						uni.navigateTo({
							url: '../todo/todo_update?data=' + json
						})
						break;
					case '删除':
						api.todoDelete(item.id).then(res => {
							if (self.$refs.list.isLastOne()) {
								self.filter.page = 1
								self.todoList()
							} else {
								self.$refs.list.todoDelete(item.id)
							}
						})
						break;
				}
			},
			open() {
				// 在显示的时候设置因为组件还没有创建会报undefined
				self.$refs.dialog.setFilter(self.filter)
			},
			submit(filter) {
				self.showFilter = false
				self.filter = filter
				self.filter.page = 1
				self.todoList()
			},
			todoAdd() {
				uni.navigateTo({
					url: './todo_add'
				})
			}
		}
	}
</script>

<style>
	.todo-add {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
	}
</style>
