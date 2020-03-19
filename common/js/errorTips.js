// 作为有错误时的提示
/**
 * @param value value作为错误时的种类,分别有网络错误,未登录等,其余的直接用value
 * **/
export function error(value) {
	if(value === '登录') {
		uni.showToast({
			title: '未登录,不能查看此功能',
			icon: 'none'
		})
	} else if(value === '网络') {
		uni.showToast({
			title: '请求失败，请检查网络',
			icon: 'none'
		})
	} else {
		uni.showToast({
			title: value,
			icon: 'none'
		})
	}
}