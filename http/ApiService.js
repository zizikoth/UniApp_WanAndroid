import Request from 'luch-request'

import utils from '@/utils/Utils.js'

const http = new Request({
	// #ifdef H5
	baseURL: 'api/',
	// #endif
	// #ifndef H5
	baseURL: 'https://www.wanandroid.com/',
	// #endif
	withCredentials: true,
})


const request = function(method, path, params, showLoading) {
	if (showLoading) {
		uni.showLoading({
			title: '加载中'
		})
	}
	return new Promise((resolve, reject) => {
		http.request({
			method: method,
			url: path,
			params: params,
		}).then(res => {
			if (showLoading) uni.hideLoading()
			if (res.statusCode == 200) {
				if (res.data.errorCode == 0) {
					resolve(res.data.data)
				} else {
					utils.toast(res.data.errorMsg)
				}
			} else {
				reject()
			}
		}).catch(err => {
			if (showLoading) uni.hideLoading()
			reject(err)
		})
	})
}

const get = function(path) {
	return request('GET', path, {}, true)
}

const getParams = function(path, params) {
	return request('GET', path, params, true)
}

const getNoLoading = function(path) {
	return request('GET', path, {}, false)
}

const post = function(path, params) {
	return request('POST', path, params, true)
}

const postNoLoading = function(path, params) {
	return request('POST', path, params, false)
}

module.exports = {
	login: (account, pwd) => {
		return post('user/login', {
			username: account,
			password: pwd
		}, true)
	},
	getHomeData: () => {
		return Promise.all([
			get('banner/json'),
			get('wxarticle/chapters/json'),
			get('article/top/json'),
			get('article/list/1/json')
		])
	},
	getHomeArticles: (page) => {
		return get(`article/list/${page}/json`)
	},
	getChapterArticles: (cid, page, search) => {
		return getParams(`wxarticle/list/${cid}/${page}/json`, {
			k: search
		})
	},
	getProjectTree: () => {
		return get('project/tree/json')
	},
	getProjectArticle: (page, cid) => {
		return getParams(`project/list/${page}/json`, {
			cid: cid
		})
	},
	getSystemAndNaviTree: () => {
		return Promise.all([
			get('tree/json'),
			get('navi/json')
		])
	},
	todoList: (filter) => {
		let params = {}
		if (!utils.isEmpty(filter.status)) params.status = filter.status
		if (!utils.isEmpty(filter.type)) params.type = filter.type
		if (!utils.isEmpty(filter.priority)) params.priority = filter.priority
		if (!utils.isEmpty(filter.orderby)) params.orderby = filter.orderby
		return getParams(`lg/todo/v2/list/${filter.page}/json`, params)
	},
	todoAdd: (title, content, type, priority) => {
		return post('lg/todo/add/json', {
			title: title,
			content: content,
			date: utils.nowDate().YMD,
			type: type,
			priority: priority
		})
	},
	todoUpdate: (id, title, content, type, priority, status) => {
		return post(`lg/todo/update/${id}/json`, {
			title: title,
			content: content,
			date: utils.nowDate().YMD,
			status: status,
			type: type,
			priority: priority
		})
	},
	todoComplete: (id, complete) => {
		return post(`lg/todo/done/${id}/json`, {
			status: complete ? 1 : 0
		})
	},
	todoDelete: (id) => {
		return post(`lg/todo/delete/${id}/json`)
	},
	websiteList: () => {
		return get('lg/collect/usertools/json')
	},
	websiteAdd: (name, link) => {
		return post('lg/collect/addtool/json', {
			name: name,
			link: link
		})
	},
	websiteDelete: (id) => {
		return post('lg/collect/deletetool/json', {
			id: id
		})
	},
	websiteUpdate: (id, name, link) => {
		return post('lg/collect/updatetool/json', {
			id: id,
			name: name,
			link: link
		})
	}
}
