<template>
	<view class="article-item-container" v-if="data!=undefined&&data!=null&&data.length>0">

		<u-swipe-action :disabled="disable" :show="item.show" :index="index" v-for="(item,index) in data" :key="item.id"
			btnWidth="160" @click="optionClick" @content-click="contentClick" @open="open" @close="close"
			:options="item.options" :bg-color="item.isTop?'#fff5fd':'#ffffff'">

			<!-- 文章无图片 -->
			<view class="article-item-no-pic-box" v-if="!hasPic(item)">
				<view class="article-item-no-top-box">
					<image class="article-item-avatar" :src="avatar(item)" mode="aspectFill" />
					<text class="article-item-author">{{author(item)}}</text>
				</view>

				<text class="article-item-title">{{title(item)}}</text>

				<text class="article-item-desc">{{desc(item)}}</text>

				<view class="article-item-bottom-box">
					<text class="article-item-bottom">{{chapter(item)}}</text>
					<text class="article-item-bottom">{{item.niceDate}}</text>
				</view>
			</view>

			<!-- 文章有图片 -->
			<view class="article-item-pic-box" v-if="hasPic(item)">
				<view class="article-item-content-pic-box">
					<view class="article-item-pic-content-box">
						<view class="article-item-no-top-box">
							<image class="article-item-avatar" :src="avatar(item)" mode="aspectFill" />
							<text class="article-item-author">{{author(item)}}</text>
						</view>
						<text class="article-item-title">{{title(item)}}</text>

						<text class="article-item-desc">{{desc(item)}}</text>
					</view>

					<image class="article-item-pic" :src="item.envelopePic" mode="aspectFill" />
				</view>
				<view class="article-item-bottom-box">
					<text class="article-item-bottom">{{chapter(item)}}</text>
					<text class="article-item-bottom">{{item.niceDate}}</text>
				</view>
			</view>

			<view class="line10" />
		</u-swipe-action>



	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "article-list",
		props: {
			disable: {
				type: Boolean,
				default: true
			},
			type: {
				// delete 删除 more 更多
				type: String,
				default: 'delete'
			}
		},
		data() {
			return {
				data: []
			}
		},
		methods: {
			formatData(articles) {
				articles.forEach(item => {
					item.show = false
					let text = this.type == 'delete' ? '删除' : '更多'
					let color = this.type == 'delete' ? '#FF4365' : '#94E2FF'
					item.options = [{
						text: text,
						style: {
							'border-radius': '80rpx',
							'align-self': 'center',
							'text-align': 'center',
							'justify-content': 'center',
							'font-size': '26rpx',
							height: '160rpx',
							backgroundColor: color
						}
					}]
				})
				return articles
			},
			setData(articles) {
				this.data = this.formatData(articles)
			},
			addData(articles) {
				this.data = this.data.concat(this.formatData(articles))
			},
			hasPic(item) {
				return !utils.isEmpty(item.envelopePic)
			},
			avatar(item) {
				return utils.getAvatar(item.userId)
			},
			author(item) {
				return utils.isEmpty(item.author) ?
					utils.isEmpty(item.shareUser) ? '匿名' : '分享：' + item.shareUser :
					'作者：' + item.author
			},
			title(item) {
				return utils.formatHtml(item.title)
			},
			desc(item) {
				return utils.formatHtml(item.desc)
			},
			chapter(item) {
				return utils.isEmpty(item.superChapterName) ? utils.formatHtml(item.chapterName) :
					utils.formatHtml(item.superChapterName) + ' · ' + utils.formatHtml(item.chapterName)
			},
			open(index) {
				this.data[index].show = true
			},
			close(index) {
				this.data[index].show = false
			},
			isLastOne() {
				return this.data.length == 1
			},
			itemDelete(id) {
				let index = this.data.findIndex(item => {
					return item.id == id
				})
				if (index != -1) {
					this.data.splice(index, 1)
				}
			},
			contentClick(index) {
				this.data[index].show = false
				this.$u.throttle(utils.openLink(this.data[index].link), 500)
			},
			optionClick(index, position) {
				this.data[index].show = false
				this.$emit("optionClick", this.data[index], this.data[index].options[position])
			}
		}
	}
</script>

<style>
	.article-item-container {
		display: flex;
		flex-direction: column;
	}

	.article-item-no-pic-box {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
	}

	.article-item-no-top-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.article-item-avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
	}

	.article-item-author {
		display: flex;
		font-size: 26rpx;
		margin-left: 30rpx;
		color: #666666;
	}

	.article-item-title {
		display: flex;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.article-item-desc {
		display: flex;
		font-size: 28rpx;
		font-weight: bold;
		color: #666666;

		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.article-item-bottom-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}

	.article-item-bottom {
		display: flex;
		font-size: 26rpx;
		color: #666666;
	}


	.article-item-pic-box {
		display: flex;
		flex-direction: column;
		width: calc(100% - 60rpx);
		padding: 30rpx;
	}

	.article-item-content-pic-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.article-item-pic {
		width: 120rpx;
		height: 180rpx;
		margin-left: 30rpx;
		border-radius: 10rpx;
		background: #eeeeee;
	}

	.article-item-pic-content-box {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
