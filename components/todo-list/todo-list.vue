<template>
	<view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item,index) in list" :key="item.id" btnWidth="160"
			@click="optionClick" @content-click="contentClick" @open="open" @close="close" :options="item.options">

			<view class="todo-box">
				<view class="todo-container"
					:style="
				item.type == 1 ? 'background:rgba(255,67,101,0.3);-moz-box-shadow: 0 0 20rpx rgba(255,67,101,0.3);-webkit-box-shadow: 0 0 20rpx rgba(255,67,101,0.3);box-shadow: 0 0 20rpx rgba(255,67,101,0.3)':
				item.type == 2 ? 'background:rgba(245,224,43,0.3);-moz-box-shadow: 0 0 20rpx rgba(245,224,43,0.3);-webkit-box-shadow: 0 0 20rpx rgba(245,224,43,0.3);box-shadow: 0 0 20rpx rgba(245,224,43,0.3)':
				item.type == 3 ? 'background:rgba(148,226,255,0.3);-moz-box-shadow: 0 0 20rpx rgba(148,226,255,0.3);-webkit-box-shadow: 0 0 20rpx rgba(148,226,255,0.3);box-shadow: 0 0 20rpx rgba(148,226,255,0.3)':
				'background:rgba(179,135,118,0.3);-moz-box-shadow: 0 0 20rpx rgba(179,135,118,0.3);-webkit-box-shadow: 0 0 20rpx rgba(179,135,118,0.3);box-shadow: 0 0 20rpx rgba(179,135,118,0.3)'">
					<view class="todo-top">
						<text class="todo-label">{{label(item)}}</text>
						<text class="todo-title">{{item.title}}</text>
					</view>

					<text class="todo-content">{{item.content}}</text>

					<view class="todo-bottom">
						<text class="todo-text">{{priority(item)}}</text>
						<text class="todo-text">{{item.dateStr}}</text>
					</view>
				</view>
				<image v-show="item.status==1" class="todo-complete" src="@/static/ic_status_complete.png" />
			</view>

		</u-swipe-action>
	</view>
</template>

<script>
	export default {
		name: "todo-list",
		data() {
			return {
				list: []
			};
		},
		methods: {
			label(item) {
				return item.type == 1 ? '工作' : item.type == 2 ? '生活' :
					item.type == 3 ? '个人' : '其他'
			},
			priority(item) {
				return item.priority == 4 ? '紧急！！' : item.priority == 3 ? '重要！' : item.priority == 2 ? '一般' : '随便'
			},
			setData(data) {
				data.forEach(item => {
					item.show = false
					item.options = [{
						text: item.status == 0 ? '已完成' : '未完成',
						style: {
							'border-radius': '80rpx',
							'align-self': 'center',
							'text-align': 'center',
							'justify-content': 'center',
							'font-size': '26rpx',
							height: '160rpx',
							backgroundColor: '#FBCEAD'
						}
					}, {
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
			optionClick(index, position) {
				this.list[index].show = false
				this.$emit("itemOptionClick", this.list[index], this.list[index].options[position])
			},
			contentClick(index) {
				this.list[index].show = false
				this.$emit("itemClick", this.list[index])
			},
			isEmpty() {
				return this.list.length == 0
			},
			todoDelete(id) {
				let index = this.list.findIndex(item => {
					return item.id == id
				})
				if (index != -1) {
					this.list.splice(index, 1)
				}
			},
			todoComplete(id, complete) {
				this.list.forEach(item => {
					if (item.id == id) {
						item.status = complete ? 1 : 0
						item.options[0].text = complete ? '未完成' : '已完成'
					}
				})
			}
		}
	}
</script>

<style>
	.todo-box {
		position: relative;
	}

	.todo-top {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.todo-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		border-radius: 20rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.todo-title {
		display: flex;
		margin-right: 100rpx;
		margin-left: 20rpx;
		color: #333333;
		text-align: center;
		justify-content: center;
		align-items: center;
		flex: 1;
		font-size: 30rpx;
	}

	.todo-content {
		display: flex;
		color: #666666;
		width: 100%;
		margin-top: 20rpx;
		font-size: 26rpx;
	}

	.todo-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.todo-text {
		display: flex;
		color: #666666;
		font-size: 26rpx;
	}

	.todo-label {
		display: flex;
		border-radius: 20rpx;
		color: #FFFFFF;
		width: 80rpx;
		height: 35rpx;
		font-size: 25rpx;
		text-align: center;
		align-items: center;
		justify-content: center;
		background-color: #83AF9B;
	}

	.todo-complete {
		position: absolute;
		width: 80rpx;
		height: 80rpx;
		right: 40rpx;
		bottom: 60rpx;
	}
</style>
