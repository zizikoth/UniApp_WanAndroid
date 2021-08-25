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



module.exports = {
	checkTodoAdd,
	checkTodoUpdate
}
