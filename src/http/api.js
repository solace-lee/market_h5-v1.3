import axios from 'axios'
import store from '@/vuex/store.js'
import router from '../router'
const api = axios.create();
api.defaults.baseURL = 'http://api.zhulixc.com';
axios.defaults.withCredentials = true
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";
// api.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded";
// api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
api.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	store.commit('SET_LOADING', true);
	// 如果有token,添加到请求报文 后台会根据该报文返回status
	// config.headers.Access-Control-Allow-Credentials = true
	const token = window.localStorage.getItem('token')
	if (token) {
		config.headers.ZLXCTOKEN = token;
	}
	return config;
},

	function (error) {
		// 对请求错误做些什么
		const toast = '网络错误,请稍后再试(' + error.response.status + ')'
		store.commit('SET_LOADING', toast);
		setTimeout(() => {
			store.commit('SET_LOADING', true);
		}, 300)
		return Promise.reject(error);
	});

// 添加响应拦截器
api.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	// 加到时器主要是为了 展示Loading效果 项目中应去除
	// setTimeout(() => {
	// 	store.commit('SET_LOADING', false);
	// }, 300)
	return response;
},

	// 对响应错误做点什么
	function (error) {

		// console.log(error);
		if (error.response) {
			// 如果返回401 即没有权限，跳到登录页重新登录
			if (error.response.status == 401) {
				// store.commit('CHANGE_TOKEN', 0);
				if (window.localStorage.getItem('token')) {
					window.localStorage.removeItem('token')
				}
				router.replace({
					path: '/login',
					// query: {
					// 	redirect: router.currentRoute.fullPath
					// }
				})
			} else {
				const toast = '网络错误,请稍后再试(' + error.response.status + ')'
				store.commit('SET_LOADING', toast);
				setTimeout(() => {
					store.commit('SET_LOADING', true);
				}, 300)
			}
		}

		return Promise.reject(error);
	});
export default api