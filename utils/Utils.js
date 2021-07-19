import DataManager from '@/manager/DataManager.js'

const avatars = [
	"https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg",
	"https://pic2.zhimg.com/80/v2-d7bee94aabb2f2999f1d60523b724e63_720w.jpg",
	"https://pic2.zhimg.com/80/v2-c2439c09ef02f924583b04b2c05c8f71_720w.jpg",
	"https://pic1.zhimg.com/80/v2-1ed0f37177bd9735ab09dcdfde99c8f4_720w.jpg",
	"https://pic4.zhimg.com/80/v2-903b496f4563959da9291bf0bc58bb46_720w.jpg",
	"https://pic4.zhimg.com/80/v2-0e340beaa1d476abb2ced515bce189c6_720w.jpg",
	"https://pic1.zhimg.com/80/v2-98f9b30c77ba002974c349295eb15509_720w.jpg",
	"https://pic2.zhimg.com/80/v2-c75aca8c1bbd39219d01a427d521de45_720w.jpg",
	"https://pic2.zhimg.com/80/v2-17871d0eb2e7f84bac7636054a7c0dc1_720w.jpg",
	"https://pic2.zhimg.com/80/v2-7863881260af94eb248eb120f976a11f_720w.jpg"
]

// 获取头像
const getAvatar = function(id) {
	let index = id < 0 ? 0 : id % 10
	return avatars[index]
}

// 格式化字符串
const formatHtml = function(html) {
	let data = ''
	if (!isEmpty(html)) {
		var regSymbol = RegExp("&.*;")
		var regHtml = RegExp(/<[^>]*>/g);
		data = html.replace(regSymbol, '').replace(regHtml, '')
	}
	return data
}

// 是否是空字符串
const isEmpty = function(data) {
	return data == "" || data == undefined || data == null
}

// 是否是空列表
const isEmptyList = function(data) {
	return data == undefined || data == null || data.length == 0
}

// 格式化空数据
const orEmpty = function(data) {
	return isEmpty(data) ? '' : data
}

// toast弹窗
const toast = function(message) {
	if (!isEmpty(message)) {
		uni.showToast({
			title: message.toString(),
			icon: "none",
			duration: 1500
		})
	}
}

// 是否已经登录
const isLogined = function() {
	return DataManager.getUser() != null
}

module.exports = {
	getAvatar,
	formatHtml,
	isEmpty,
	isEmptyList,
	orEmpty,
	toast,
	isLogined
}
