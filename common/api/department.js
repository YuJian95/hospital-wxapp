import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 用于所有的专科的Api接口
 * 1 通过医院ID获取专科
 * 2 获取全部的专科列表
 * 3 
 * **/
 // 1 通过医院ID获取专科 ID为医院的ID,后面的页码和一页多少条数据
 export function getDepartmentHospital(ID, pageNum, pageSize) {
	 return unLoginRequest({
		 url: '/hospital/special/list/' + ID + '?pageNum=' + pageNum + '&pageSize=' + pageSize,
		 method: 'get'
	 })
 }
 // 2 获取全部的专科列表,name为专科名称
 export function getAllDepartmentList(pageNum, pageSize, name) {
	 return unLoginRequest({
		 url: '/hospital/special/list?pageNum=' + pageNum + '&pageSize=' + pageSize + '&name=' + name,
		 method: 'get'
	 })
 }