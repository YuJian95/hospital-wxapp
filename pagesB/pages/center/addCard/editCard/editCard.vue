<template>
	<view>
		<view class="weui-cells weui-cells_after-title mt">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">与本人的关系：</view>
				</view>
				<picker @change="relateChange" :value="relateIndex" :range="relateArray">
					<view class="weui-cell_select">
						<view class="weui-cell__bd ">
							<view class="weui-input weui-select_in-select-after">{{relateArray[relateIndex]}}</view>
						</view>
					</view>
				</picker>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">姓名：</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" placeholder="请输入患者姓名" v-model="form.name" @blur="inputCheck('姓名', 'string', form.name)" />
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">证件类型：</view>
				</view>
				<view class="weui-cell__bd">
					<text class="weui-input forbiddenInput">身份证</text>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">证件号码：</view>
				</view>
				<view class="weui-cell__bd">
					<text class="weui-input forbiddenInput">440927199705076827</text>
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
					<view class="weui-label">出生日期：</view>
				</view>
				<view class="weui-cell__bd">
					<text class="weui-input forbiddenInput">1997-05-07</text>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">+86</view>
				</view>
				<view class="weui-cell__bd ">
					<input class="weui-input " placeholder="请输入患者手机号码" v-model="form.phone" @blur="inputCheck('电话号码', 'phone', form.phone)" />
				</view>
			</view>
			
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">就诊卡号：</view>
				</view>
				<view class="weui-cell__bd ">
					<text class="weui-input forbiddenInput">1000001</text>
				</view>
			</view>
		</view>

		<button class="button">确定</button>
	</view>
</template>

<script>
	import {
		inputCheck,
		changeDateByIdentify
	} from '@/common/js/inputCheck.js';
	export default {
		data() {
			return {
				phoneArray: ['+86'],
				phoneIndex: 0,
				relateArray: ['本人', '父母', '兄弟/姐妹', '伴侣', '子女', '同事/朋友', '其他'],
				relateIndex: 0,
				date: changeDateByIdentify(new Date()),
				currentDate: new Date(), // 默认不超过最新一天
				gender: 1, //性别 1-男   2-女
				form: {
					name: '',
					identify: '',
					phone: ''
				}
			}
		},
		methods: {
			// 判断表单的数据
			inputCheck: function(name, rule, value) {
				var error = inputCheck(name, rule, value)
				if (error !== 'ok') {
					uni.showToast({
						title: error,
						icon: 'none'
					})
				} else {
					if(rule === 'identify'){
						var date = value.slice(6,14)
						this.date = changeDateByIdentify(date)
					}
					return
				}
			},
			// 改变用户关系
			relateChange: function(e) {
				this.relateIndex = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';

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
