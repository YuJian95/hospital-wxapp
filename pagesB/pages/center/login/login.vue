<template>
	<view>
		<view class="input-inbox">
			<input class="input" placeholder-class="placeholder-class" placeholder="请输入手机号码" />
		</view>
		<view class="password-row-box">
			<input class="input" :password="!isVisible" placeholder-class="placeholder-class" placeholder="请输入登录密码" />
			<image class="eye-icon" :src="isVisible? '/static/login/eye.png':'/static/login/eye-off.png'" @click="changeVisible()"></image>
		</view>
		
		<!-- 此处H5不做授权登录 -->
		<!-- #ifdef MP -->
		<button v-if="!isAuthrization" open-type="getUserInfo" class="button" @getuserinfo="getUserInfo()" @tap="getUserInfo()">授权登录</button>
		<button v-else class="button" @click="toPageCenter()">登录</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<button class="button" @click="toPageCenter()">登录</button>
		<!-- #endif -->
		
		<view class="enroll-changepassword-box">
			<text class="left"  @click="toRegister()" 
			:class="visited == 1? 'visited-color' : ''">立即注册</text>
			<text class="right" :class="visited == 2? 'visited-color' : ''">忘记密码</text>
		</view>

	</view>
</template>

<script>
	import {
		weChat,
		alipay
	} from '@/common/js/authorization.js'
	export default {
		data() {
			return {
				isVisible: false,
				visited: 0, // 默认是0-全都没选  1-选中立即注册  2-选中忘记密码
				isRegisterVisited: false,
				isPasswordVisited: false,
				isAuthrization: uni.getStorageSync("isAuthrization")
			}
		},
		methods: {
			// 切换是否可见密码
			changeVisible: function() {
				this.isVisible = !this.isVisible
			},
			// 跳转到快速注册页面
			toRegister: function() {
				this.visited = 1
				var _this = this
				setTimeout(function(){
					_this.visited = 0
				},2000)
				uni.navigateTo({
					url: '/pagesB/pages/center/login/quickRegister/quickRegister'
				})
			},
			// 授权获取用户信息
			getUserInfo: function() {
				var _this = this
				// 当用微信小程序时调用
				// #ifdef MP-WEIXIN
				weChat()
				// #endif
				// 当用支付宝小程序时调用
				// #ifdef MP-ALIPAY
				alipay()
				// #endif

			},
			// 跳转到center页面
			toPageCenter: function() {
				uni.switchTab({
					url: '/pages/center/center'
				})
			},
		},
		onLoad() {
			console.log(uni.getStorageSync("isAuthrization"))
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
	@import '@/common/scss/common.scss';

	page {
		width: 100%;
		height: 100%;
		background-color: #F2F2F2;
	}

	@mixin mt($top) {
		margin-top: $top;
	}

	.input-inbox {
		@extend .input-box;
		@include mt(80rpx);
		display: flex;
		align-items: center;

		.input {
			@include width-margin(90%, 90%);
		}
	}

	.password-row-box {
		@extend .password-box;
		align-items: center;
		@include mt(40rpx);
		display: flex;
		align-items: center;

		.input {
			width: 83%;
			height: 90%;
			margin-left: 5%;
		}

		.eye-icon {
			width: 17%;
			@include icon-size(50rpx, 50rpx);
		}
	}

	// 登录按钮
	.button {
		@extend .button-box;
		@include mt(50rpx);
	}

	// 选择注册和修改密码
	.enroll-changepassword-box {
		@include width-margin(90%, 70rpx);
		margin-top: 40rpx;
		@include flex-direction(row);
		@include row-left-right(50%, 50%);
	}
</style>
