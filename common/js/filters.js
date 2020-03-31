// 用于识别一些特别的,比如身份证号要隐藏部分数字
const filters = {
	// 将身份证号转变一下
	getIdentityNum(identify) {
		return identify.slice(0,3) + 'xxxxxxxxxxxxx' + identify.slice(16,18)
	},
	// 将性别由数字转为文字
	getGender(value) {
		if(value === 1) { 
			return '男'
		} 
		return '女'
	},
	// 获取日期,将日期转化为YYYY-MM-DD格式
	getDate(date) {
		let birthDate = new Date(date)
		const year = birthDate.getFullYear()
		let month = birthDate.getMonth() + 1
		let day = birthDate.getDate()
		if(month < 10) {
			month = '0' + month
		}
		if(day < 10) {
			day = '0' + day
		}
		return year + '-' + month + '-' + day
	},
	// 将电话号码转换一下用****打码
	getPhone(phone) {
		return phone.slice(0,3) + '****' + phone.slice(7,11)
	}
}

export default filters;