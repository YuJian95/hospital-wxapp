/**
 * 此处是三个平台的授权的方法
 * **/
// 微信小程序的授权
export function weChat() {
	uni.showLoading({
		title: '加载中'
	})
	 wx.getSetting({
		 success(res) {
			if (res.authSetting['scope.userInfo']) {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称
				wx.getUserInfo({
					success: function(res) {
						// console.log(res)
						uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
						uni.setStorageSync("isAuthrization", true)
						// uni.switchTab({
						// 	url: '/pages/center/center'
						// })
						try {} catch (e) {}
						uni.hideLoading()
						return true
					},
					fail: () => {
						uni.hideLoading()
						return false
					}
				})
			}
		}
	})
}
// 支付宝的授权
export function alipay() {
	my.getAuthCode({
		scopes: 'auth_user',
		success: (res) => {
			console.log(res)
			uni.setStorageSync("isAuthrization", true)
			// uni.switchTab({
			// 	url: '/pages/center/center'
			// })
		},
	});
	return true
}
