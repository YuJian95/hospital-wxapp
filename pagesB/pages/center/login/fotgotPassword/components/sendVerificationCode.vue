<!-- 凡是需要先获取验证码再进行操作的都要这个页面 -->
<template>
	<viem>
		<view class="top-title">发送验证码至152****7416</view>
		<view class="cu-form-group code-box">
			<view class="title">验证码</view>
			<input placeholder="输入框带个按钮" name="input"></input>
			<button class='cu-btn bg-green shadow' 
			v-show="!isGetCode" @click="isGetCode = true">获取验证码</button>
			<button class='cu-btn bg-gray shadow' v-show="isGetCode">验证码60s</button>
		</view>
		<button class="button-box" @click="toNextStep()">确定</button>
	</viem>
</template>

<script>
	export default {
		data() {
			return {
				isGetCode: false
			}
		},
		methods: {
			toNextStep: function() {
				this.$emit('getStep', 1)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
	@import '@/common/scss/common.scss';
	.top-title{
		width: 100%;
		margin: 20rpx auto;
		text-align: center;
		@include font-style(18px, bold, #000000);
		.bg-gray{
			background-color: $gray-color;
			color: #FFFFFF;
		}
	}
	.code-box{
		border-top: 1px solid $gray-color;
		border-bottom: 1px solid $gray-color;
		margin: 50rpx auto;
	}
</style>
