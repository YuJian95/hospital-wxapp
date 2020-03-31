<template>
	<view>
		<view class="weui-cells weui-cells_after-title mt">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">与本人的关系：</view>
				</view>
				<!-- 当是本人时 -->
				<view class="weui-cell__bd" v-if="isMyself">
					<text class="weui-input forbiddenInput">本人</text>
				</view>
				<!-- 当不是本人时选择别的关系 -->
				<picker @change="relateChange" :value="relateIndex" :range="relateArray" v-if="!isMyself">
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
					<input class="weui-input" placeholder="请输入患者姓名" v-model="form.name" @blur="inputCheck('姓名', 'string', 'name')" />
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
					<input class="weui-input" placeholder="请输入患者证件号码" v-model="form.identify" @blur="inputCheck('身份证号码', 'identify', 'identify')" />
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
					<view class="weui-input forbiddenInput">{{form.date}}</view>
				</view>
			</view>

			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label">+86</view>
				</view>
				<view class="weui-cell__bd ">
					<input class="weui-input " placeholder="请输入患者手机号码" v-model="form.phone" @blur="inputCheck('电话号码', 'phone', 'phone')" />
				</view>
			</view>
		</view>

		<!-- <checkbox-group bindchange="bindAgreeChange">
			<label class="weui-agree" for="weuiAgree">
				<view class="weui-agree__text">
					<checkbox class="weui-agree__checkbox" id="weuiAgree" :value="isAgree" />
					<view class="weui-agree__checkbox-icon">
						<icon class="weui-agree__checkbox-icon-check" type="success_no_circle" size="11"></icon>
					</view>
					阅读并同意<navigator url="" class="weui-agree__link">《相关条款》</navigator>
				</view>
			</label>
		</checkbox-group> -->

		<button class="button" @click="validate()">获取就诊卡号</button>
	</view>
</template>

<script>
	import {
		inputCheck,
		changeDateByIdentify,
		checkGender

	} from '@/common/js/inputCheck.js';
	import {
		addCard
	} from '@/common/api/userInfo.js'
	import {
		error
	} from '@/common/js/errorTips.js'
	import {getUserCardInfo} from '@/common/api/userInfo.js'

	export default {
		data() {
			return {
				phoneArray: ['+86'],
				phoneIndex: 0,
				relateArray: ['父母', '兄弟/姐妹', '伴侣', '子女', '同事/朋友', '其他'],
				relateIndex: 0,
				gender: 1, //性别 1-男   2-女
				form: {
					name: '',
					identify: '',
					phone: '',
					date: ''
				},
				isMyself: false, // 用于确认是不是本人
				isValidate: true, //用于确认是否信息都填写完整且正确
			}
		},
		methods: {
			// 切换性别的按钮
			changeGender: function(index) {
				if (inputCheck('身份证', 'identify', this.form.identify) === 'ok') {
					this.gender = checkGender(this.form.identify)
					if (index !== this.gender) {
						uni.showToast({
							title: '请查看身份证号码是否有误',
							icon: 'none'
						})
					}
				} else {
					this.gender = index
				}
			},
			// 判断表单的数据
			inputCheck: function(name, rule, value) {
				this.isValidate = true
				var error = inputCheck(name, rule, this.form[value])
				if (error !== 'ok') {
					uni.showToast({
						title: error,
						icon: 'none'
					})
					this.form[value] = ''
				} else {
					if (rule === 'identify') {
						var date = this.form[value].slice(6, 14)
						this.form.date = changeDateByIdentify(date)
						this.gender = checkGender(this.form[value])
					}
					return
				}
			},
			// 在提交前确认是否填写完整
			validate: function() {
				for (let item in this.form) {
					if (this.form[item] === '') {
						error('请将信息填写完整')
						this.isValidate = false
						break;
					}
				}
				
				if(this.isValidate) {
					this.addCard()
				}
			},
			// 添加用户就诊卡信息
			addCard: function() {
				let type; // 用于选择的类型，如本人，朋友这些
				uni.showLoading({
					title: '加载中'
				})
				// 先确认是否是本人,假如是本人，还会将本人的就诊卡ID号存起来
				if (this.isMyself) {
					type = 0
				} else {
					type = this.relateIndex + 1
				}
				
				addCard(uni.getStorageSync('accountID'), {
					birthDate: this.form.date,
					gender: this.gender,
					identificationNumber: this.form.identify,
					name: this.form.name,
					phone: this.form.phone,
					type: type
				}).then(res => {
					if(res.data.code === 200) {
						uni.hideLoading()
						uni.showToast({
							title: '添加成功',
							icon: 'success'
						})
						if(type === 0) {
							this.getMyselfCardInfo()
							uni.switchTab({
								url: '/pages/center/center'
							})
						} else {
							uni.navigateTo({
								url: '/pagesB/pages/center/cardList/cardList'
							})
						}
						
					}
				}).catch(() => {
					uni.hideLoading()
					error('添加失败')
				})
			},
			// 获取当新建的是本人的就诊卡号
			getMyselfCardInfo: function() {
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if(res.data.code === 200) {
						const data = res.data.data
						if(data.length > 0) {
							data.forEach(function(item, index){
								// 获取自己的就诊卡号
								if(item.type === 0) {
									uni.setStorageSync('cardID', item.id)
									return
								}
							})
						}
					}
				}).catch(() => {
				})
			},
			// 改变用户关系
			relateChange: function(e) {
				this.relateIndex = e.detail.value
			},
		},
		onLoad(e) {
			this.isMyself = e.isMyself
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
