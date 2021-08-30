module.exports = {
	emitLogin: () => {
		uni.$emit('loginEvent')
	},
	onLogin: (func) => {
		uni.$on('loginEvent', () => {
			func()
		})
	},
	offLogin: () => {
		uni.$off('loginEvent')
	}
}
