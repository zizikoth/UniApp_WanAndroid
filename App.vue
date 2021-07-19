<script>
	export default {
		globalData: {
			// 用户信息，不要直接使用，从DataManager中获取
			userInfo: null
		}
	}
</script>

<style>
	/* 全局页面样式 */
	.page {
		display: flex;
		flex-direction: column;
	}
	
	/* 纵向排列 */
	.vertical{
		display: flex;
		flex-direction: column;
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
</style>
