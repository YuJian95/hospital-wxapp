<template>
	<view>
		<view class="input-inbox">
			<input class="input" placeholder-class="placeholder-class" placeholder="请输入手机号码"/>
		</view>
		<view class="password-row-box">
			<input class="input" :password="!isVisible" placeholder-class="placeholder-class" placeholder="请输入登录密码" />
			<image class="eye-icon" :src="isVisible? '/static/login/eye.png':'/static/login/eye-off.png'" @click="changeVisible()"></image>
		</view>
		<button class="button">登录</button>
		<view class="enroll-changepassword-box">
			<text class="left" :class="isVisited? 'isVisited':'' ">立即注册</text>
			<text class="right" :class="isVisited? 'isVisited':'' ">忘记密码</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVisible:false,
				isVisited:false
			}
		},
		methods: {
			// 切换是否可见密码
			changeVisible:function(){
				this.isVisible = !this.isVisible
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
	@import '@/common/scss/common.scss';
page{
	width: 100%;
	height: 100%;
	background-color: #F2F2F2;
}
@mixin mt($top) {
	margin-top: $top;
}
.input-inbox{
	@extend .input-box;
	@include mt(80rpx);
	.input{
		@include width-margin(90%, 100%);
	}
}
.password-row-box{
	@extend .password-box;
	align-items: center;
	@include mt(40rpx);
	.input{
		width: 85%;
		height: 100%;
		margin-left: 5%;
	}
	.eye-icon{
		width: 15%;
		@include icon-size(50rpx, 50rpx);
	}
}
// 登录按钮
.button{
	@extend .button-box;
	@include mt(50rpx);
}
// 选择注册和修改密码
.enroll-changepassword-box{
	@include width-margin(90%, 70rpx);
	margin-top: 40rpx;
	@include flex-direction(row);
	@extend .row-left-right;
	.isVisited{
		color: $major-color;
	}
}
</style>
