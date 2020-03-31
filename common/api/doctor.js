import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 用于所有的医生的Api接口
 * 1 通过医生名字获取医生信息
 * 2 通过专科门诊获取医生信息
 * 3 通过医生id号获取医生信息
 * **/
 // 1 通过医生名字获取医生信息
 export function getDcotorByName(pageNum, pageSize, doctorName) {
	 return unLoginRequest({
		 url: '/hospital/doctor/list?pageNum=' + pageNum + '&pageSize=' + pageSize + '&name=' + doctorName,
		 method: 'get'
	 })
 }
 // 2 通过专科门诊获取医生信息
 export function getDcotorByDepartment(pageNum, pageSize, specialId, outpatientId) {
	 return unLoginRequest({
		 url: '/hospital/doctor/list/special/outpatient?pageNum=' + pageNum + '&pageSize='
		 + pageSize + '&specialId=' + specialId + '&outpatientId=' + outpatientId,
		 method: 'get'
	 })
 }
 // 3 通过医生id号获取医生信息
 export function getDoctorInfoById(id) {
	 return unLoginRequest({
		 url: '/hospital/doctor/' + id,
		 method: 'get'
	 })
 }