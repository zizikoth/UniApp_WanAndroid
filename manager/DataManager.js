const globalData = getApp().globalData

// 存储用户信息
const saveUser = function(user) {
	globalData.userInfo = user
	uni.setStorageSync('Core_User', user)
}

// 获取用户信息
const getUser = function() {
	if (globalData.userInfo != null && globalData.userInfo != undefined) {
		return globalData.userInfo
	} else {
		globalData.userInfo = uni.getStorageSync('Core_User')
		return globalData.userInfo
	}
}

const saveCookie = function(cookie) {
	globalData.cookie = cookie
	uni.setStorageSync('Core_Cookie', cookie)
}

const getCookie = function() {
	if (globalData.cookie != null && globalData.cookie != undefined) {
		return globalData.cookie
	} else {
		globalData.cookie = uni.getStorageSync('Core_Cookie')
		return globalData.cookie
	}
}

const clear = function() {
	try {
		globalData.userInfo = null
		globalData.cookie = null
		uni.clearStorageSync()
	} catch (e) {
		console.log("缓存清理失败", e)
	}
}


module.exports = {
	saveUser,
	getUser,
	saveCookie,
	getCookie,
	clear
}
