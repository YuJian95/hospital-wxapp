import request from '@/common/utils/request.js';
import unLoginRequest from '@/common/utils/unloginRequest.js'
/**
 * 用于所有的医生的Api接口
 * 1 通过医生名字获取医生信息
 * 2 通过专科门诊获取医生信息
 * 3 通过医生id号获取医生信息
 * 4 获取医生出诊时间
 * 5 根据医生编号、日期，获取出诊信息
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
 // 4 获取医生出诊时间
 export function getVisitPlanList(doctorId, startDate, endDate) {
   return request({
     url: '/visit/plan/doctor?doctorId=' + doctorId + '&startDate=' + startDate + '&endDate=' + endDate,
     method: 'get'
   })
 }
 // 5 根据医生编号、日期，获取出诊信息
 export function getHospitalVisitPlan(hospitalId, doctorId, date) {
	 return request({
		 url: '/visit/plan/doctor/date?hospitalId=' + hospitalId + '&doctorId=' + doctorId + '&date=' + date,
		 method: 'get'
	 })
 }