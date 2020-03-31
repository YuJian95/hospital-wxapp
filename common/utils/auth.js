// 作为存储token的接口
const jwt_token = 'jwt'

// 存储token
export function setToken(token) {
	uni.setStorageSync(jwt_token, token)
}

// 获取token
export function getToken() {
	return uni.getStorageSync(jwt_token)
}

// 移除token
export function removeToken() {
	uni.removeStorageSync(jwt_token)
}