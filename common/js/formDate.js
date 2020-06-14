/**
 * 将获取的国际事件转化为YYYY-MM-DD hh:mm:ss
 * @param date 传进来的日期
 * @param rule 想要的形式 如YYYY-MM-DD YYYY-MM-DD hh:mm:ss day(回复周几), date(今天几号)
 *              week-date(一周的号数)
 **/

// 将getDay()的转换成一二三四...日
function getDay(day) {
	switch (day) {
		case 0:
			return '日';
			break;
		case 1:
			return '一';
			break;
		case 2:
			return '二';
			break;
		case 3:
			return '三';
			break;
		case 4:
			return '四';
			break;
		case 5:
			return '五';
			break;
		case 6:
			return '六';
			break;
	}
}

// 将获取到的时间假如不是两位数的话在前面加0
function turnDouble(num) {
	// 假如长度为2
	if (num >= 10) {
		return num
	} else { // 否则在前面加0
		return ('0' + num)
	}
}

// 获取从今天开始的一周的号数
function getWeekDate() {
	let currentDay = new Date()
	let dateList = []
	// 先将今天的号数存进去
	dateList.push({
		date: turnDouble(currentDay.getDate()),
		day: getDay(currentDay.getDay()),
		year: currentDay.getFullYear(),
		month: turnDouble(currentDay.getMonth() + 1)	
	})
	// 将剩下的6天的号数也存进去
	for(let i=0;i<6;i++) {
		currentDay.setDate(currentDay.getDate() + 1)
		 dateList.push({
		date: turnDouble(currentDay.getDate()),
		day: getDay(currentDay.getDay()),
		year: currentDay.getFullYear(),
		month: turnDouble(currentDay.getMonth() + 1)
	})
	}
	return dateList
}

export function formDate(dateR, rule) {
	let date = new Date(dateR)
	let year = date.getFullYear() // 获取年份
	console.log(year)
	let month = date.getMonth() + 1 // 获取月份
	let today = date.getDate() // 获取今天是几号
	let day = date.getDay() // 获取周几
	let hour = date.getHours() // 获取hour
	let minute = date.getMinutes() // 获取分钟
	let second = date.getSeconds() // 获取秒数
	switch (rule) {
		case 'YYYY-MM-DD':
			return year + '-' + turnDouble(month) + '-' + turnDouble(today);
			break;
		case 'YYYY-MM-DD hh:mm:ss':
			return year + '-' + turnDouble(month) + '-' + turnDouble(today) +
				' ' + turnDouble(hour) + ':' + turnDouble(minute) + ':' + turnDouble(second);
			break;
		case 'day':
			return getDay(day);
			break;
		case 'date':
			return turnDouble(today);
			break;
			case 'week-date': 
			return getWeekDate();
			break;
	}
}
