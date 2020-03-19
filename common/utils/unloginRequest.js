// 没有登录前的没有token的请求
import { requestURL } from './config.js'
import { getToken } from './auth.js'

function unloginRegister(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: requestURL + data.url,
			method: data.method,
			data: data.data,
			header: {
				// 'Content-Type': 'applicatioin/json;charset=UTF-8', // 此处报错
				'Authorization': getToken() || ''
			},
			success: (res => {
				console.log(res);
				if (res.statusCode === 200) {
					console.log("成功200")
					resolve(res)
				} else {
					console.log("失败1")
					reject(res)
				}
			}),
			fail: (res => {
				console.log("失败2")
				reject(res)
			})
		})
	})
}

export default function(data, url, method) {
	return unloginRegister(data, url, method)
}