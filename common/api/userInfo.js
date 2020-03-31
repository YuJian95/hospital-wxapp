import request from '@/common/utils/request.js'
/**
 * 该页面作为获取用户的基本信息的API接口,包括自己的和别人的
 * 1 获取用户账号的基本信息
 * 2 获取用户就诊卡信息(根据账户ID获得)
 * 3 添加就诊卡信息
 * 4 获取用户所添加的就诊卡是否超过限制
 * 5 删除就诊卡 (通过关系编号)
 * 6 修改就诊卡信息(通过关系编号)
 * 7 获取某个就诊卡的信息(通过就诊卡id)
 * 8 修改用户账号的基本信息
 * 
 * **/
 // 1 获取用户账号的基本信息
 export function getUserBaseInfo() {
	 return request({
		 url: '/user/basic/info',
		 method: 'get'
	 })
 }
 // 2 获取用户就诊卡信息(根据账户ID获得)
 export function getUserCardInfo(id) {
	 return request({
		 url: '/user/card/list/' + id,
		 method: 'get'
	 })
 }
 // 3 添加就诊卡信息
 export function addCard(accountId, data) {
	 return request({
		 url: '/user/card/' + accountId,
		 method: 'post',
		 data
	 })
 }
 // 4 获取用户所添加的就诊卡是否超过限制
 export function getIsCardOverIimit(accountId) {
	 return request({
		 url: '/user/card/number/' + accountId,
		 method: 'get'
	 })
 }
 // 5 删除就诊卡(通过关系编号)
 export function deleteCardInfo(relationId) {
	 return request({
		 url: '/user/card/' + relationId,
		 method: 'delete'
	 })
 }
 // 6 修改就诊卡信息(通过关系编号)
 export function updateCardInfo(relationId, data) {
	 return request({
		 url: '/user/card/' + relationId,
		 method: 'put',
		 data
	 })
 }
 // 7 获取某个就诊卡的信息(通过就诊卡id)
/* export function getCardInfoByCardID(cardID) {
	 return request({
		 url: '/user/card/' + cardID,
		 method: 'get'
	 })
 } */
 // 8 修改用户账号的基本信息
 export function updateBaseInfo(userID, data) {
	 return request({
		 url: '/user/basic/' + userID,
		 method: 'put',
		 data
	 })
 }