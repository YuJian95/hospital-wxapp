<!-- 凡是需要先获取验证码再进行操作的都要这个页面 -->
<template>
	<viem>
		<view class="top-title">发送验证码至{{phone | getPhone}}</view>
		<view class="cu-form-group code-box">
			<view class="title">验证码</view>
			<input placeholder="输入框带个按钮" name="input"></input>
			<button class='cu-btn bg-green shadow' v-show="!isGetCode" @click="getPhoneCode()" v-if="codeNum === 0">获取验证码</button>
			<button class='cu-btn bg-gray shadow' v-else>再次获取{{codeNum}}s</button>
		</view>
		<button class="button-box" @click="validataCode()">确定</button>
	</viem>
</template>

<script>
	import {
		getPhoneCode,
		validataCode,
		userRegister
	} from '@/common/api/quickRegister.js';
	export default {
		data() {
			return {
				codeNum: 0,
				phone: JSON.parse(uni.getStorageSync('userInfo')).phone,
				phoneNum: '', // 验证码
			}
		},
		methods: {
			// 获取手机验证码
			getPhoneCode: function() {
				this.codeNum = 60;
				let _this = this
				let time = setInterval(function() {
					if (_this.codeNum == 0) {
						clearInterval(time);
						return;
					}
					_this.codeNum--;
				}, 1000)

				getPhoneCode(this.phone).then(res => {}).catch(() => {
					uni.showToast({
						title: '发送失败，请检查网络',
						icon: 'none'
					})
				})
			},
			// 校验验证码
			validataCode: function() {
				if(this.phoneNum !== '' && this.phoneNum !== null && this.phoneNum !== undefined) {
					uni.showLoading({
						title: '加载中'
					})
					validataCode(this.phone, this.phoneNum).then(res => {
						console.log(res)
						if (res.data.code === 200) {
							this.$emit('getStep', 1)
						} else {
							uni.hideLoading()
							error('验证码错误')
					
						}
					}).catch(() => {
						error('网络')
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
	@import '@/common/scss/common.scss';

	.top-title {
		width: 100%;
		margin: 20rpx auto;
		text-align: center;
		@include font-style(18px, bold, #000000);

		.bg-gray {
			background-color: $gray-color;
			color: #FFFFFF;
		}
	}

	.code-box {
		border-top: 1px solid $gray-color;
		border-bottom: 1px solid $gray-color;
		margin: 50rpx auto;
	}
</style>
