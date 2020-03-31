import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 用于所有的门诊的Api接口
 * 1 获取某个医院某个专科的门诊信息
 * 2 分页获取专科编号下的门诊列表信息
 * **/
 // 1 获取某个医院某个专科的门诊信息
 export function getOutpatientByHospital(hospitalId, specialId, pageNum, pageSize) {
	 return unLoginRequest({
		 url: '/hospital/outpatient/list?hospitalId=' + hospitalId + '&specialId='
		 + specialId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
		 method: 'get'
	 })
 }
 // 2 分页获取专科编号下的门诊列表信息
export function getOutpatientListById(pageNum, pageSize, specialId) {
  return unLoginRequest({
    url: '/hospital/special/list/outpatient?pageNum=' + pageNum + '&pageSize='
	+ pageSize + '&specialId=' + specialId,
    method: 'get'
  })
}