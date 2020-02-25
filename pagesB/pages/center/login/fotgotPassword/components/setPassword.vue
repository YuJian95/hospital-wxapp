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
		<button class="button-box">提交</button>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				password: '',
				confirmPassword: ''
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
