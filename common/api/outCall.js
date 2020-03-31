import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 用于获取出诊计划的接口
 * 1 搜索出诊计划,医院-专科-门诊-时间获取
 * 2 根据医生id，获取出诊信息
 * **/
// 1 搜索出诊计划,医院-专科-门诊-时间获取
export function getOutCall(day, pageNum, pageSize, hospitalId, specialId, outpatientId) {
	return unLoginRequest({
		url: '/visit/plan/list?day=' + day + '&pageNum=' + pageNum + '&pageSize=' + pageSize
		 + '&hospitalId=' + hospitalId + '&specialId=' + specialId + '&outpatientId=' + outpatientId,
		 method: 'get'
	})
}
// 2 根据医生id，获取出诊信息
export function getOutCallByDoctor(id) {
	return unLoginRequest({
		url: '/visit/plan/doctor?doctorId=' + id,
		method: 'get'
	})
}