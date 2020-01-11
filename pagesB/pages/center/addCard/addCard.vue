<template>
	<view>
		<view class="weui-cells weui-cells_after-title mt">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">与本人的关系：</view>
				</view>
				<view class="weui-cell_select">
					<view class="weui-cell__bd ">
						<picker bindchange="bindCountryChange" :value="relateIndex" :range="relateArray">
							<view class="weui-input weui-select_in-select-after">{{relateArray[relateIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">姓名：</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" placeholder="请输入患者姓名" v-model="form.name"
					@blur="inputCheck('姓名', 'string', form.name)"/>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">性别：</view>
				</view>
				<view class="weui-cell__bd">
					<view class="radios-button-outbox weui-input">
						<view class="radios-button-inbox" @click="changeGender(1)">
							<image class="icon" :src="gender == 1? '/static/center/card/radio-actived.png'
							   :'/static/center/card/radio-inactived.png'"></image>
							<text class="text">男</text>
						</view>
						<view class="radios-button-inbox" @click="changeGender(2)">
							<image class="icon" :src="gender == 2? '/static/center/card/radio-actived.png'
							   :'/static/center/card/radio-inactived.png'"></image>
							<text class="text">女</text>
						</view>
					</view>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">证件类型：</view>
				</view>
				<view class="weui-cell__bd">
					<text class="weui-input">身份证</text>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">证件号码：</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" placeholder="请输入患者证件号码" v-model="form.identify"
					@blur="inputCheck('身份证号码', 'identify', form.identify)"/>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">出生日期：</view>
				</view>
				<view class="weui-cell__bd">
					<picker mode="date" :value="date" start="1870-01-01" end="2017-09-01" bindchange="bindDateChange">
						<view class="weui-input">{{date}}</view>
					</picker>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">+86</view>
				</view>
				<view class="weui-cell__bd ">
					<input class="weui-input " placeholder="请输入患者手机号码" v-model="form.phone"
					@blur="inputCheck('电话号码', 'phone', form.phone)"/>
				</view>
			</view>
		</view>

		<checkbox-group bindchange="bindAgreeChange">
			<label class="weui-agree" for="weuiAgree">
				<view class="weui-agree__text">
					<checkbox class="weui-agree__checkbox" id="weuiAgree" value="agree" />
					<view class="weui-agree__checkbox-icon">
						<icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="11"></icon>
					</view>
					阅读并同意<navigator url="" class="weui-agree__link">《相关条款》</navigator>
				</view>
			</label>
		</checkbox-group>

		<button class="button">获取就诊卡号</button>
	</view>
</template>

<script>
	import  { inputCheck } from '@/common/js/inputCheck.js';
	export default {
		data() {
			return {
				phoneArray: ['+86'],
				phoneIndex: 0,
				relateArray: ['本人', '父母', '兄弟/姐妹', '伴侣', '子女', '同事/朋友', '其他'],
				relateIndex: 0,
				date: '2016-01-01',
				gender: 1, //性别 1-男   2-女
				form: {
					name: '',
					identify: '',
					phone: ''
				}
			}
		},
		methods: {
			// 切换性别的按钮
			changeGender: function(index) {
				this.gender = index
			},
			// 判断表单的数据
			inputCheck:function(name, rule, value) {
				var error = inputCheck(name, rule, value)
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
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';

	page {
		// background: #F2F2F2;
	}

	.mt {
		margin-top: 50rpx;
	}

	.radios-button-outbox {
		width: 100%;
		height: 100%;
		@include flex-direction(row);
		justify-content: space-between;

		.radios-button-inbox {
			width: 50%;
			height: 100%;
			@include flex-direction(row);
			align-items: center;

			.icon {
				@include icon-size(50rpx, 50rpx);
				margin-right: 20rpx;
			}

			.text {
				@include font-style(16px, 400, #000000);
			}
		}
	}

	.button {
		@extend .button-box;
		margin-top: 50rpx;
	}
</style>
