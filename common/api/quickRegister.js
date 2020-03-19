// 用于注册时的api接口页面
import unloginRegister from '@/common/utils/unloginRequest.js'
/**
 * 当用户还没有登录时,所用的api接口的方式和登录以后需要token的不一样
 * 1 刷新token
 * 2 获取手机验证码
 * 3 校验验证码
 * 4 账号注册
 * 5 账号登录
 * 6 获取登录用户的基本信息 
 * **/
 // 1 刷新token
export function tokenRefresh(token) {
	 return unloginRegister({
		 url: '/power/account/token?token=' + token,
		 method: 'get'
	 })
 }
 // 2 获取手机验证码
 export function getPhoneCode(phone) {
	 return unloginRegister({
		 url: '/user/basic/message?phone=' + phone,
		 method: 'get'
	 })
 }
 // 3 校验验证码
 export function validataCode(phone, code) {
	 return unloginRegister({
		 url: '/user/basic/code?phone=' + phone + '&code=' + code,
		 method: 'post'
	 })
 }
 // 4 账号注册   
 export function userRegister(data) {
	 return unloginRegister({
		 url: '/user/basic/account/register',
		 method: 'post',
		 data
	 })
 }
 // 5 账号登录
 export function userLogin(name, password) {
	 return unloginRegister({
		 url: '/power/account/login?name=' + name + '&password=' + password,
		 method: 'get'
	 })
 }