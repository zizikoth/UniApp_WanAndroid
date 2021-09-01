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

// 存储用户登录Cookie
const saveCookie = function(cookie) {
	globalData.cookie = cookie
	uni.setStorageSync('Core_Cookie', cookie)
}
// 获取用户登录Cookie
const getCookie = function() {
	if (globalData.cookie != null && globalData.cookie != undefined) {
		return globalData.cookie
	} else {
		globalData.cookie = uni.getStorageSync('Core_Cookie')
		return globalData.cookie
	}
}

const isCollected = function(id) {
	let index = getUser().collectIds.indexOf(Number(id))
	return index != -1
}

const addCollection = function(id) {
	if (!isCollected(id)) {
		getUser().collectIds.push(Number(id))
		saveUser(getUser())
	}
}

const removeCollection = function(id) {
	let index = getUser().collectIds.indexOf(Number(id))
	if (index != -1) {
		getUser().collectIds.splice(index, 1)
		saveUser(getUser())
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
	isCollected,
	addCollection,
	removeCollection,
	clear
}
