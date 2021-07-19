const globaData = getApp().globalData

// 存储用户信息
const saveUser = function(user) {
	globaData.userInfo = user
	uni.setStorageSync('user',user)
}

// 获取用户信息
const getUser = function(){
	if(globaData.userInfo!=null){
		return globaData.userInfo
	}else{
		return uni.getStorageSync('user')
	}
}

// 添加收藏
const addCollection= function(id){
	let user = getUser()
	if(user!=null){
		if(user.collectIds.indexof(id)==-1){
			user.collectIds.push(id)
			saveUser(user)
		}
	}
}

// 移除收藏
const removeCollection = function(id){
	let user = getUser()
	if(user!=null){
		let index = user.collectIds.indexof(id)
		if(index!=-1){
			user.collectIds.splice(index,1)
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
