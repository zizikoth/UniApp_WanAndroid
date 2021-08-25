<template>
	<view class="article-item-container" v-if="data!=undefined&&data!=null&&data.length>0">
		<view v-for="(item,index) in data" :key="item.id" @click="onClick(item)" :style="item.isTop?'background: #fff5fd':'background: #ffffff'">

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

		</view>
	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		name: "article-list",
		props: {
			data: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			hasPic(item) {
				return !utils.isEmpty(item.envelopePic)
			},
			avatar(item) {
				return utils.getAvatar(item.id)
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
			onClick(item) {
				utils.openLink(item.link)
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
