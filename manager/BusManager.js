module.exports = {

	//--------------- 登录事件 ---------------//
	emitLogin: () => {
		uni.$emit('loginEvent')
	},
	onLogin: (func) => {
		uni.$on('loginEvent', func)
	},
	offLogin: () => {
		uni.$off('loginEvent')
	},

	//--------------- 收藏事件 ---------------//
	emitCollect: () => {
		uni.$emit('collectEvent')
	},
	onCollect: (func) => {
		uni.$on('collectEvent', func)
	},
	offCollect: () => {
		uni.$off('collectEvent')
	}

}
