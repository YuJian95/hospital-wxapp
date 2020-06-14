<!-- 重新设置密码，从上面的确定了验证码之后跳过来 -->
<template>
	<view>
		<view class="password-out-box">
			<view class="password">
				<text class="title">密码：</text>
				<input placeholder="请输入密码" v-model="password" password="true"
				placeholder-class="placeholder-class" class="input"/>
			</view>
			<view class="password">
				<text class="title">确认密码：</text>
				<input placeholder="请重新输入密码" v-model="confirmPassword"
				 password="true" placeholder-class="placeholder-class" class="input"/>
			</view>
		</view>
		<button class="button-box" @click="updatePassword()">提交</button>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import {updatePassword } from '@/common/api/password.js';
	import  { inputCheck, checkPassword } from '@/common/js/inputCheck.js';
	import {error} from '@/common/js/errorTips.js'
	
	export default{
		data() {
			return{
				password: '',
				confirmPassword: '',
				isValidate: false,
			}
		},
		methods: {
			// 判断两次输入发密码
			checkPassword:function(){
				var error = checkPassword(this.password, this.confirmPassword)
				if(error !== 'ok'){
					this.isValidate = false
					error(error)
					return 
				} else {
					this.isValidate = true
					return
				}
			},
			// 修改密码
			updatePassword: function() {
				uni.showLoading({
					title: '修改中'
				})
				if(this.password !== '' && this.confirmPassword !== '') {
					this.checkPassword();
					if(this.isValidate) {
						updatePassword({
							code: uni.getStorageSync('phoneCode'),
							name: uni.getStorageSync('phone'),
							password: md5(this.password)
						}).then(res => {
							if(res.data.code === 200) {
								uni.hideLoading()
								uni.showToast({
									title: '修改成功',
									icon: 'success'
								})
								uni.redirectTo({
									url: '/pagesB/pages/center/login/login'
								})
							}
						}).catch(() =>{
							uni.hideLoading()
							uni.showToast({
								title: '修改失败',
								icon: 'none'
							})
						})
					}
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';
	.password-out-box{
		@include width-margin(90%, auto);
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		.password{
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			border-top: 1px solid $gray-color;
			@include flex-direction(row);
			.title{
				@include font-style(17px, 500, $gray-color);
				margin-right: 30rpx;
			}
			.placeholder-class{
				height: 110rpx;
				line-height: 110rpx;
				@include font-style(17px, 500, $gray-color);
			}
			.input{
				height: 100rpx;
				display: flex;
				align-items: center;
			}
		}
		.password:nth-last-child(1){
			border-bottom: 1px solid $gray-color;
		}
	}
</style>
