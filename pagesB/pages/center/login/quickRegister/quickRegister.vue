<template>
	<view>
		<view class="weui-cells weui-cells_after-title" style="margin-top: 30rpx;">
		    <view class="weui-cell weui-cell_input">
		        <view class="weui-cell__hd">
		            <view class="weui-label">姓名：</view>
		        </view>
		        <view class="weui-cell__bd">
		            <input class="weui-input" placeholder="请输入姓名" v-model="form.name"
					@blur="inputCheck('姓名','string', form.name)"/>
		        </view>
		    </view>
		    <view class="weui-cell weui-cell_input weui-cell_vcode">
		        <view class="weui-cell__hd">
		            <view class="weui-label">手机号</view>
		        </view>
		        <view class="weui-cell__bd">
		            <input class="weui-input" placeholder="请输入手机号" v-model="form.phone"
					@blur="inputCheck('手机号码', 'phone', form.phone)"/>
		        </view>
		        <view class="weui-cell__ft">
		            <view class="weui-vcode-btn">获取验证码</view>
		        </view>
		    </view>
			<view class="weui-cell weui-cell_input weui-cell_vcode">
			    <view class="weui-cell__hd">
			        <view class="weui-label">验证码</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请输入验证码" v-model="form.identifyCode"
					@blur="inputCheck('验证码', 'identifyCode', form.identifyCode)"/>
			    </view>
			</view>
			<view class="weui-cell weui-cell_input">
			    <view class="weui-cell__hd">
			        <view class="weui-label">密码：</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请输入您的登录密码" v-model="form.password"
					password="false" @blur="inputCheck('密码', 'password', form.password)"/>
			    </view>
			</view>
			<view class="weui-cell weui-cell_input">
			    <view class="weui-cell__hd">
			        <view class="weui-label">确认密码：</view>
			    </view>
			    <view class="weui-cell__bd">
			        <input class="weui-input" placeholder="请再次输入密码" v-model="form.checkPassword"
					password="false" @blur="checkPassword()"/>
			    </view>
			</view>
		</view>
		<button class="button" @click="toAddCard()">立即注册</button>
	</view>
</template>

<script>
	import  { inputCheck, checkPassword } from '@/common/js/inputCheck.js';
	export default {
		data() {
			return {
				// 表单的数据
				form: {
					name: '',
					phone: '',
					identifyCode: '',
					password: '',
					checkPassword: ''
				}
			}
		},
		methods: {
			// 跳转到添加就诊卡页面
			toAddCard:function(){
				uni.navigateTo({
					url: '/pagesB/pages/center/addCard/addCard'
				})
			},
			// 用于表单的判断
			inputCheck:function(name, rule, value){
				var error = inputCheck(name, rule, value)
				if(error !== 'ok'){
					uni.showToast({
						title: error,
						icon: 'none'
					})
				} else {
					return
				}
			},
			// 判断两次输入发密码
			checkPassword:function(){
				var error = checkPassword(this.form.password, this.form.checkPassword)
				if(error !== 'ok'){
					uni.showToast({
						title: error,
						icon: 'none'
					})
				} else {
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/form.scss';
page{
	// background: #F2F2F2;
}
// 注册按钮
.button{
	@extend .button-box;
	margin-top: 50rpx;
}
</style>
