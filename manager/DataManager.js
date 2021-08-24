const globalData = getApp().globalData

// 存储用户信息
const saveUser = function(user) {
	globalData.userInfo = user
	uni.setStorageSync('Core_User', user)
}

// 获取用户信息
const getUser = function() {
	if (globalData.userInfo != null) {
		return globalData.userInfo
	} else {
		globalData.userInfo = uni.getStorageSync('Core_User')
		return globalData.userInfo
	}
}

// 添加收藏
const addCollection = function(id) {
	let user = getUser()
	if (user != null) {
		if (user.collectIds.indexof(id) == -1) {
			user.collectIds.push(id)
			saveUser(user)
		}
	}
}

// 移除收藏
const removeCollection = function(id) {
	let user = getUser()
	if (user != null) {
		let index = user.collectIds.indexof(id)
		if (index != -1) {
			user.collectIds.splice(index, 1)
			saveUser(user)
		}
	}
}

module.exports = {
	saveUser,
	getUser,
	addCollection,
	removeCollection
}
