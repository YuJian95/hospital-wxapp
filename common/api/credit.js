import request from '@/common/utils/request.js'
/**
 * 信用api
 * 1 获取每个月的cardId的信用
 * 2 获取以往的cardId的信用
 * 3 获取失信记录
 * 4 获取失信记录详情(即某条挂号记录的详情)
 * **/
 //  1 获取每个月的cardId的信用
 export function getMonthCredit(accountId, cardId) {
	 return request({
		url: '/visit/credit/current?accountId=' + accountId + '&cardId=' + cardId,
		method: 'get'
	 })
 }
 // 2 获取以往的cardId的信用
 export function getHistoryCredit(accountId, cardId) {
	 return request({
		 url: '/visit/credit/all?accountId=' + accountId + '&cardId=' + cardId,
		 method: 'get'
	 })
 }
 // 3 获取失信记录
 export function getLostCreditRecord(cardId, pageNum, pageSize) {
	 return request({
		 url: '/visit/credit/miss?cardId=' + cardId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
		 method: 'get'
	 })
 }
 // 4 获取失信记录详情(即某条挂号记录的详情)
 export function getCreditDetail(appointmentId) {
	 return request({
		 url: '/visit/appointment/miss/details?appointmentId=' + appointmentId,
		 method: 'get'
	 })
 }