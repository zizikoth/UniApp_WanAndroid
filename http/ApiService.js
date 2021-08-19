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
	}
}
