// 作为ajax请求的统一的api请求
 import { requestURL } from './config.js'
 import { setToken, getToken } from './auth.js'
 import { tokenRefresh } from '@/common/api/quickRegister.js'
 
 function Request(data) {
	 console.log(getToken())
 	return new Promise((resolve, reject) => {
 		if(uni.getStorageSync('isAlreadyLogin')== false||uni.getStorageSync('isAlreadyLogin')==''||uni.getStorageSync('isAlreadyLogin')==null){
 			uni.showToast({
 				title: "您暂未登录",
 				icon: 'none',
 				mask: true,
 				duration: 1000
 			});
 		}else {
 			uni.request({
 				url: requestURL + data.url,
 				method: data.method,
				data: data.data,
 				header: {
 						'content-type': 'application/json',
 						'Authorization': getToken() || ''
 				},
 				success: (res => {
 				if (res.statusCode === 200) {
 						console.log("成功200")
 						resolve(res)
 				}else if(res.statusCode === 401){
 					uni.showToast({
 						title: "token凭证已过期，请重新登录",
 						icon: 'none',
 						mask: true,
 						duration: 1000
 					});
 					tokenRefresh().then(res=>{
 						console.log(res)
 						setToken(res.data);
 					})
 					console.log(getToken())
 				} else {
 						console.log("失败1")
 						reject(res)
 				}
 			  }),
 			  fail: (res => {
				  console.log(res)
 					  console.log("失败2")
 				reject(res)
 			  })
 			})
 		}
     })
 }
 
 export default function(data, url, method) {
 	return Request(data, url, method)
 }