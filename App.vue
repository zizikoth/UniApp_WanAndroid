<script>
	export default {
		globalData: {
			// 用户信息，不要直接使用，从DataManager中获取
			userInfo: null,
			// 用户信息Cookie，不要直接使用，从DataManager中获取
			cookie:null,
			// 判断是否页面需要刷新
			refresh: {
				// todo更新
				todoUpdate: false,
				// todo新增
				todoAdd: false,
				// 网站更新
				websiteRefresh: false,
				// 我的分享新增
				shareAdd: false,
				// 收藏新增
				collectionAdd: true
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/* 全局页面样式 */
	.page {
		display: flex;
		flex-direction: column;
	}

	/* 纵向排列 */
	.vertical {
		display: flex;
		flex-direction: column;
	}
	
	/* 子组件剧中 */
	.center{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 单行 */
	.lineOne {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	/* 双行 */
	.lineTwo {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	/* 分割线 */
	.line {
		display: flex;
		width: 100%;
		height: 2rpx;
		background: #f5f5f5;
	}

	/* 分割线 */
	.line10 {
		display: flex;
		width: 100%;
		height: 10rpx;
		background: #f5f5f5;
	}

	.sticky {
		display: flex;
		flex-direction: column;
		position: sticky;
		top: var(--window-top);
		z-index: 999;
	}

	.card {
		-moz-box-shadow: 0 0 20rpx #999;
		-webkit-box-shadow: 0 0 20rpx #999;
		box-shadow: 0 0 20rpx #999;
	}
</style>
