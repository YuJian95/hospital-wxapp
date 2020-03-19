/**
 * 此页面用于写表单的各个字段是否合法
 * @param name 传进来的中文名字
 * @param rule 传进来的类型,比如字符串 电话等
 * @param value 传进来的要验证的数据
 * **/
 // 验证传进来的大部分数据是否合法
export function inputCheck(name, rule, value) {
	// 先判断输入是否为空
	if (value.length == 0 || value == null || value == '') {
		return name + '不能为空';
	} else {
		// 判断类型是否正确
		switch (rule) {
			case 'phone':
			// 1--以1为开头；2--第二位可为3,4,5,7,8,中的任意一位；3--最后以0-9的9个整数结尾。
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if(!reg.test(value)){
				return '该手机号不是有效的号码'
			}
			break;
			case 'password':
			var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,14}$/;
			if(!reg.test(value)) {
				return '请输入6到14位含数字、字母、符号至少两种或以上元素的密码'
			}
			break;
			case 'identify':
			var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			if(!reg.test(value)){
				return '输入的身份证号码有误'
			}
			break;
			case "string":
			return "ok"
			break;
			case 'identifyCode':
			var reg = /^[0-9]{6}$/;
			if(!reg.test(value)) {
				return '请输入6位有效的验证码'
			}
			break;
		}
		return "ok"
	}
}
// 验证两次输入的密码是否一致
export function checkPassword(password, checkPassword){
	if(checkPassword.length ==0 || checkPassword == null || checkPassword == '') {
		return '输入不能为空'
	} else {
		if(password !== checkPassword) {
			return '两次密码不一致'
		} else {
			return 'ok'
		}
	}
}

// 将日期转化为YYYY-MM-DD格式
export function changeDateByIdentify(date){
	var newDate = ''
	if(date.length == 8){
		newDate = date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8)
		return newDate 
	} else {
		return 'error'
	}
}

// 通过身份证校验性别  1-男  2-女
export function checkGender(identify){
	var num = identify.slice(16,17)
	if(num % 2 === 0) {
		// 是女生
		return 2
	} else {
		return 1
	}
}