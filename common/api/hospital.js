import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 作为医院API接口
 * 1 获取全部医院的信息
 * 2 
 * **/
export function getAllHospital(pageNum, pageSize, hospitalName) {
	return unLoginRequest({
		url: '/hospital/info/list?pageNum=' + pageNum + '&pageSize=' + pageSize 
		+ '&hospitalName' + hospitalName,
		method: 'get'
	})
}