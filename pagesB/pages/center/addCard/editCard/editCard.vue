<template>
	<view>
		<view class="weui-cells weui-cells_after-title mt">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">与本人的关系：</view>
				</view>
				<picker @change="relateChange" :value="form.type" :range="relateArray">
					<view class="weui-cell_select">
						<view class="weui-cell__bd ">
							<view class="weui-input weui-select_in-select-after">{{relateArray[form.type]}}</view>
						</view>
					</view>
				</picker>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">姓名：</view>
				</view>
				<view class="weui-cell__bd">
					<input class="weui-input" placeholder="请输入患者姓名" v-model="form.name"
					 @blur="inputCheck('姓名', 'string', 'name')" />
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
					<text class="weui-input forbiddenInput">{{form.identify | getIdentityNum}}</text>
				</view>
			</view>
			
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">性别：</view>
				</view>
				<view class="weui-cell__bd">
					<view class="radios-button-outbox weui-input">
						<view class="radios-button-inbox">
							<image class="icon" :src="form.gender == 1? iconURL + 'radio-actived.png'
							   : iconURL + 'radio-inactived.png'"></image>
							<text class="text">男</text>
						</view>
						<view class="radios-button-inbox">
							<image class="icon" :src="form.gender == 2? iconURL + '/radio-actived.png'
							   : iconURL + 'radio-inactived.png'"></image>
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
					<text class="weui-input forbiddenInput">{{form.birthDate | getDate}}</text>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">+86</view>
				</view>
				<view class="weui-cell__bd ">
					<input class="weui-input " placeholder="请输入患者手机号码" 
					v-model="form.phone" @blur="inputCheck('电话号码', 'phone', 'phone')" />
				</view>
			</view>
			
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">就诊卡号：</view>
				</view>
				<view class="weui-cell__bd ">
					<text class="weui-input forbiddenInput">{{form.id}}</text>
				</view>
			</view>
		</view>

		<button class="button" @click="validate">确定</button>
	</view>
</template>

<script>
	import {
		inputCheck
	} from '@/common/js/inputCheck.js';
	import {
		updateCardInfo
	} from '@/common/api/userInfo.js'
	import {error} from '@/common/js/errorTips.js'
	
	export default {
		data() {
			return {
				relateArray: ['父母', '兄弟/姐妹', '伴侣', '子女', '同事/朋友', '其他'],
				form: {},
				iconURL: '/static/center/card/',
				cardID: '',
			}
		},
		methods: {
			// 判断表单的数据
			inputCheck: function(name, rule, value) {
				var error = inputCheck(name, rule, this.form[value])
				if (error !== 'ok') {
					uni.showToast({
						title: error,
						icon: 'none'
					})
					this.form[value] = ''
				}
			},
			validate: function() {
				if(this.form.name !== '' && this.form.phone !== '') {
					this.updateCardInfo()
				} else {
					error('请将信息填写完整')
				}
			},
			// 改变用户关系
			relateChange: function(e) {
				this.form.type = e.detail.value
			},
			// 更新就诊卡的信息
			updateCardInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				updateCardInfo(this.form.relationId, {
					gender: this.form.gender,
					name: this.form.name,
					phone: this.form.phone,
					type: parseInt(this.form.type) + 1
				}).then(res => {
					if(res.data.code === 200) {
						uni.showToast({
							title: '更新成功',
							icon: 'success'
						})
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('更新失败，请检查网络')
				})
			}
		},
		onLoad(e) {
			this.form = JSON.parse(e.cardInfo)
			this.form.type = this.form.type - 1
			uni.hideLoading()
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
