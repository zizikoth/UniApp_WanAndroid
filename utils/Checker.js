import utils from './Utils.js'


const checkTodoAdd = function(title, content, type, priority, status) {
	let msg
	if (utils.isEmpty(title)) {
		msg = "请输入标题"
	} else if (utils.isEmpty(content)) {
		msg = "请输入内容"
	} else if (utils.isEmpty(type)) {
		msg = "请选择清单类型"
	} else if (utils.isEmpty(priority)) {
		msg = "请选择优先级别"
	}
	utils.toast(msg)
	return msg == undefined
}

const checkTodoUpdate = function(title, content, type, priority, status) {
	let msg
	if (utils.isEmpty(title)) {
		msg = "请输入标题"
	} else if (utils.isEmpty(content)) {
		msg = "请输入内容"
	} else if (utils.isEmpty(type)) {
		msg = "请选择清单类型"
	} else if (utils.isEmpty(priority)) {
		msg = "请选择优先级别"
	} else if (utils.isEmpty(status)) {
		msg = "请选择完成状态"
	}
	utils.toast(msg)
	return msg == undefined
}

const checkWebsite = function(name, link) {
	let msg
	if (utils.isEmpty(name)) {
		msg = "请输入网址标题"
	} else if (utils.isEmpty(link)) {
		msg = "请输入网址链接"
	}
	utils.toast(msg)
	return msg == undefined
}

const checkShareAdd = function(title, link) {
	let msg
	if (utils.isEmpty(title)) {
		msg = '请输入标题'
	} else if (utils.isEmpty(link)) {
		msg = '请输入链接'
	}
	utils.toast(msg)
	return msg == undefined
}

const checkCollectionAdd = function(title, author, link) {
	let msg
	if (utils.isEmpty(title)) {
		msg = '请输入标题'
	} else if (utils.isEmpty(author)) {
		msg = '请输入作者'
	}else if (utils.isEmpty(link)) {
		msg = '请输入链接'
	}
	utils.toast(msg)
	return msg == undefined
}

const checkLogin = function(account, pwd) {
	let msg
	if (utils.isEmpty(account)) {
		msg = '请输入账号'
	} else if (utils.isEmpty(pwd)) {
		msg = '请输入密码'
	}
	utils.toast(msg)
	return msg == undefined
}

const checkRegister = function(account, pwd, repwd) {
	let msg
	if (utils.isEmpty(account)) {
		msg = '请输入账号'
	} else if (utils.isEmpty(pwd)) {
		msg = '请输入密码'
	} else if (utils.isEmpty(repwd)) {
		msg = '请再次输入密码'
	} else if (pwd != repwd) {
		msg = '两次输入的密码不一致'
	}
	utils.toast(msg)
	return msg == undefined
}

module.exports = {
	checkTodoAdd,
	checkTodoUpdate,
	checkWebsite,
	checkShareAdd,
	checkCollectionAdd,
	checkLogin,
	checkRegister
}
