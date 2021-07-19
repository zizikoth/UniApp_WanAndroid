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

const get = function(path, showLoading) {
	return request('GET', path, {}, showLoading)
}

const post = function(path, params, showLoading) {
	return request('POST', path, params, showLoading)
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
			get('banner/json', true),
			get('wxarticle/chapters/json', true),
			get('article/top/json', true)
		])
	}
}
