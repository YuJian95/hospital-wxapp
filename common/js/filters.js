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
	},
	// 获取医生出诊时间段
	getVisitPlanTime(num) {
		if(num === 1) {
			return '08:30~12:00'
		} 
		return '14:00~18:00'
	},
	// 获取周几
	getDay(date) {
		let currentDate = new Date(date);
		let num = currentDate.getDay();
		let day = '';
		switch(num) {
			case 0:
			day =  '星期天'
			break;
			case 1:
			day =  '星期一'
			break;
			case 2:
			day =  '星期二'
			break;
			case 3:
			day =  '星期三'
			break;
			case 4:
			day =  '星期四'
			break;
			case 5:
			day =  '星期五'
			break;
			case 6:
			day =  '星期六'
			break;
		}
		return day
	},
	// 获取出诊时间段
	getTimePeriod(num) {
		let time = ''
		switch(num) {
			case 1:
			time = '08:30~09:00'
			break;
			case 2:
			time = '09:00~09:30'
			break;
			case 3:
			time = '09:30~10:00'
			break;
			case 4:
			time = '10:00~10:30'
			break;
			case 5:
			time = '10:30~11:00'
			break;
			case 6:
			time = '11:00~11:30'
			break;
			case 7:
			time = '11:30~12:00'
			break;
			case 8:
			time = '14:00~14:30'
			break;
			case 9:
			time = '14:00~15:00'
			break;
			case 10:
			time = '15:00~15:30'
			break;
			case 11:
			time = '15:30~16:00'
			break;
			case 12:
			time = '16:00~16:30'
			break;
			case 13:
			time = '16:30~17:00'
			break;
			case 14:
			time = '17:00~17:30'
			break;
			case 15:
			time = '17:30~18:00'
			break;
		}
		return time
	},
	// 挂号状态
	statusText: function(value) {
		switch (value) {
			case 0:
				return '未就诊';
			case 1:
				return '未及时就诊';
			case 2:
				return '取消预约挂号';
			case 3:
				return '正常就诊'
		}
	},
	// 获取上下午
	getNoon(num) {
		if(num === 1) {
			return '上午'
		} else { 
			return '下午'
		}
	}
}

export default filters;