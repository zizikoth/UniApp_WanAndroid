import Request from 'luch-request'

import utils from '@/utils/Utils.js'
import dataManager from '@/manager/DataManager.js'

const http = new Request({
	// #ifdef H5
	baseURL: 'api/',
	// #endif
	// #ifndef H5
	baseURL: 'https://www.wanandroid.com/',
	// #endif
	withCredentials: true,
})


const request = function(method, path, params, showLoading, checkError) {
	if (showLoading) {
		uni.showLoading({
			title: '加载中'
		})
	}
	let header = {}
	if (!utils.isEmpty(dataManager.getCookie())) {
		header = {
			'cookie': dataManager.getCookie()
		}
	}

	return new Promise((resolve, reject) => {
		http.request({
			method: method,
			header: header,
			url: path,
			params: params,
		}).then(res => {
			let cookie = res.header["Set-Cookie"]
			if (!utils.isEmpty(cookie)) {
				dataManager.saveCookie(cookie)
			}
			if (showLoading) uni.hideLoading()
			if (res.statusCode == 200) {
				if (res.data.errorCode == 0) {
					resolve(res.data.data)
				} else if (res.data.errorCode == -1001) {
					// 只要登录失效了 那么就清除缓存
					dataManager.clear()
					if (checkError) {
						utils.toast(res.data.errorMsg)
						uni.navigateTo({
							url: '/pages/other/login/login'
						})
					}
				} else {
					if (checkError) {
						utils.toast(res.data.errorMsg)
					}
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
	return request('GET', path, {}, true, true)
}

const getParams = function(path, params) {
	return request('GET', path, params, true, true)
}

const getNoLoading = function(path) {
	return request('GET', path, {}, false, true)
}

const getNoCheck = function(path) {
	return request('GET', path, {}, false, false)
}

const post = function(path, params) {
	return request('POST', path, params, true, true)
}

const postNoLoading = function(path, params) {
	return request('POST', path, params, false, true)
}

module.exports = {
	login: (account, pwd) => {
		return post('user/login', {
			username: account,
			password: pwd
		}, true)
	},
	register: (account, pwd, repwd) => {
		return post('user/register', {
			username: account,
			password: pwd,
			repassword: repwd
		})
	},
	loginOut: () => {
		return get('user/logout/json')
	},
	getHomeData: () => {
		return Promise.all([
			get('banner/json'),
			get('wxarticle/chapters/json'),
			get('article/top/json'),
			get('article/list/0/json')
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
	getSystemArticle: (cid, page) => {
		return get(`article/list/${page}/json`, {
			cid: cid
		})
	},
	getCoinInfo: () => {
		return Promise.all([
			getNoCheck('lg/collect/list/0/json'),
			getNoCheck('lg/coin/userinfo/json')
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
	},
	myShareList: (page) => {
		return get(`user/lg/private_articles/${page}/json`)
	},
	myShareAdd: (title, link) => {
		return post('lg/user_article/add/json', {
			title: title,
			link: link
		})
	},
	myShareDelete: (id) => {
		return post(`lg/user_article/delete/${id}/json`)
	},
	squareShareList: (page) => {
		return get(`user_article/list/${page}/json`)
	},
	userShareList: (id, page) => {
		return get(`user/${id}/share_articles/${page}/json`)
	},
	coinHistory: (page) => {
		return get(`lg/coin/list/${page}/json`)
	},
	coinRank: (page) => {
		return get(`coin/rank/${page}/json`)
	},
	collectionList: (page) => {
		return get(`lg/collect/list/${page}/json`)
	},
	collectInnerArticle: (id) => {
		return post(`lg/collect/${id}/json`)
	},
	collectOuterArticle: (title, author, link) => {
		return post(`lg/collect/add/json`, {
			title: title,
			author: author,
			link: link
		})
	},
	unCollectInList: (id, originId) => {
		return post(`lg/uncollect/${id}/json`, {
			originId: originId
		})
	},
	unCollectInArticle: (id) => {
		return post(`lg/uncollect_originId/${id}/json`)
	}
}
