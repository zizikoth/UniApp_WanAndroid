<template>
	<view class="filter-container">
		<text class="filter-title">筛选</text>

		<text class="filter-label">完成状态</text>
		<u-radio-group class="filter-group" v-model="filter.status" @change="statusChange" active-color="#333333">
			<u-radio class="filter-item" v-for="(item,index) in statusList" :key="index" :name="item.id">{{item.name}}
			</u-radio>
		</u-radio-group>

		<text class="filter-label">清单类型</text>
		<u-radio-group class="filter-group" v-model="filter.type" @change="typeChange" active-color="#333333">
			<u-radio class="filter-item" v-for="(item,index) in typeList" :key="index" :name="item.id">{{item.name}}
			</u-radio>
		</u-radio-group>

		<text class="filter-label">优先级别</text>
		<u-radio-group class="filter-group" v-model="filter.priority" @change="priorityChange" active-color="#333333">
			<u-radio class="filter-item" v-for="(item,index) in priorityList" :key="index" :name="item.id">{{item.name}}
			</u-radio>
		</u-radio-group>

		<text class="filter-label">时间排序</text>
		<u-radio-group class="filter-group" v-model="filter.orderby" @change="orderbyChange" active-color="#333333">
			<u-radio class="filter-item" v-for="(item,index) in orderbyList" :key="index" :name="item.id">{{item.name}}
			</u-radio>
		</u-radio-group>

		<text class="filter-submit" @click="submit">确定</text>
	</view>
</template>

<script>
	export default {
		name: "todo-filter",
		data() {
			return {
				filter: {
					status: '',
					type: '',
					priority: '',
					orderby: '3'
				},
				statusList: [{
					id: '',
					name: '全部'
				}, {
					id: '0',
					name: '未完成'
				}, {
					id: '1',
					name: '已完成'
				}],
				typeList: [{
					id: '',
					name: '全部'
				}, {
					id: '1',
					name: '工作'
				}, {
					id: '2',
					name: '生活'
				}, {
					id: '3',
					name: '个人'
				}, {
					id: '4',
					name: '其他'
				}],
				priorityList: [{
					id: '',
					name: '全部'
				}, {
					id: '4',
					name: '紧急'
				}, {
					id: '3',
					name: '重要'
				}, {
					id: '2',
					name: '一般'
				}, {
					id: '1',
					name: '随便'
				}],
				orderbyList: [{
					id: '3',
					name: '创建时间升序'
				}, {
					id: '4',
					name: '创建时间降序'
				}, {
					id: '1',
					name: '完成时间升序'
				}, {
					id: '2',
					name: '完成时间降序'
				}]
			};
		},
		methods: {
			statusChange(status) {
				this.filter.status = status
			},
			typeChange(type) {
				this.filter.type = type
			},
			priorityChange(priority) {
				this.filter.priority = priority
			},
			orderbyChange(orderby) {
				this.filter.orderby = orderby
			},
			setFilter(filter){
				this.filter = filter
			},
			submit() {
				this.$emit("submit", this.filter)
			}
		}
	}
</script>

<style>
	.filter-container {
		display: flex;
		flex-direction: column;
		margin-right: 30rpx;
		margin-left: 30rpx;
		width: calc(100% - 60rpx);
	}

	.filter-title {
		display: flex;
		width: 100%;
		margin-top: 30rpx;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.filter-label {
		display: flex;
		padding-left: 20rpx;
		margin-top: 20rpx;
		height: 40rpx;
		color: #333333;
		font-size: 30rpx;
		border-left: solid #333333 10rpx;
	}

	.filter-group {
		display: flex;
		margin-bottom: 30rpx;
		margin-top: 20rpx;
	}

	.filter-item {
		display: flex;
		margin-right: 20rpx;
		margin-top: 10rpx;
	}

	.filter-submit {
		display: flex;
		width: 100%;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: #000000;
		margin-bottom: 30rpx;
		margin-top: 20rpx;
		color: #ffffff;
		font-size: 34rpx;
		align-items: center;
		justify-content: center;
	}
</style>
