<template>
	<view class="body">
		<view class="top-box">
			<view class="row-box" v-if="isAlreadyLogin" @click="toBaseInfo()">
				<!-- <view class="avatar-url-box"> -->
					<!-- <open-data type="userAvatarUrl"></open-data> -->
					<image :src="userBaseInfo.avatarUrl" class="avatar-url-box"></image>
				<!-- </view> -->
				<view class="name-card-box">
					<view class="name-text-box">
						<text class="name-text">{{ userBaseInfo.name }}</text>
						<image class="icon" :src="gender === 2 ? iconUrl + 'female.png'
						: iconUrl + 'male.png'" v-show="isGetTreatCard"></image>
					</view>
					<text class="card-text" v-if="cardID !== ''">卡号：{{cardID}}</text>
				</view>
				<image class="right-white-icon" src="/static/center/right-white.png"></image>
			</view>

			<view class="row-box" v-else @click="turnLogin()">
				<image src="/static/center/unknownAvatar.png" class="no-login-img"></image>
				<view class="no-login-text-box">
					<text class="login">点击注册/登录</text>
					<text class="welcome">欢迎来到挂号系统</text>
				</view>
			</view>
		</view>

		<view class="account-acord-outbox">
			<view class="account-acord-inbox">
				<view class="left-right-half" @click="toTreatRecord()">
					<image class="icon" src="/static/center/treat-record.png"></image>
					<text class="text">就诊记录</text>
				</view>
				<view class="left-right-half" @click="toAppointRecord()">
					<image class="icon" src="/static/center/appoint-record.png"></image>
					<text class="text">挂号记录</text>
				</view>
			</view>
		</view>

		<view class="bottom-outbox">
			<view class="option-inbox" @click="toCardList()">
				<image class="icon" src="/static/center/card-list.png"></image>
				<text class="text">我的家人</text>
			</view>
			<view class="option-inbox" @click="toAwaitingQueue()">
				<image class="icon" src="/static/center/paidui.png"></image>
				<text class="text">候诊队列</text>
			</view>
			<view class="option-inbox" @click="toCreditDetail()">
				<image class="icon" src="/static/center/xinyong.png"></image>
				<text class="text">信用详情</text>
			</view>
			<view class="option-inbox" @click="toAboutUs()">
				<image class="icon" src="/static/center/about-us.png"></image>
				<text class="text">关于我们</text>
			</view>
			<view class="option-inbox" @click="outLogin()" v-if="isAlreadyLogin">
				<image class="icon" src="/static/center/outLogin.png"></image>
				<text class="text">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { error } from '@/common/js/errorTips.js'
	import { getUserBaseInfo } from '@/common/api/userInfo.js'
	import {getUserCardInfo} from '@/common/api/userInfo.js'
	import md5 from 'js-md5'
	
	export default {
		data() {
			return {
				isAlreadyLogin: uni.getStorageSync('isAlreadyLogin') || '', // 用于记录是否登录
				isGetTreatCard: false, // 是否填写信息获取了自己的就诊卡
				iconUrl: '/static/center/',
				gender: 1 ,
				userBaseInfo: {
					name: '',
					avatarUrl: '',
					phone: ''
				},
				cardID: uni.getStorageSync('cardID') || ''
			}
		},
		onPullDownRefresh() {
			this.getUserInfo()
			this.isAlreadyLogin = uni.getStorageSync('isAlreadyLogin')
		},
		methods: {
			// 跳转到登录页面
			turnLogin: function() {
				uni.navigateTo({
					url: '/pagesB/pages/center/login/login'
				})
			},
			
			// 跳转到就诊卡队列
			toCardList:function() {
				if(this.isAlreadyLogin) {
					uni.navigateTo({
						url: '/pagesB/pages/center/cardList/cardList'
					})
				} else {
					error('登录')
				} // end if
			},
			// 跳转到候诊队列
			toAwaitingQueue: function() {
				if(this.isAlreadyLogin) {
					uni.navigateTo({
						url: '/pagesA/pages/awaitingQueue/awaitingQueue'
					})
				} else {
					error('登录')
				} // end if
				
			},
			// 跳转到信用详情
			toCreditDetail: function() {
				if(this.isAlreadyLogin) {
					uni.navigateTo({
						url: '/pagesA/pages/creditDetail/creditDetail'
					})
				} else {
					error('登录')
				} // end if
				
			},
			// 跳转到挂号记录
			toAppointRecord: function() {
				if(this.isAlreadyLogin) {
					uni.navigateTo({
						url: '/pagesA/pages/appointRecord/appointRecord'
					})
				} else {
					error('登录')
				} // end if
				
			},
			// 跳转到就诊记录
			toTreatRecord: function() {
				if(this.isAlreadyLogin) {
					uni.navigateTo({
						url: '/pagesA/pages/treatRecord/treatRecord'
					})
				} else {
					error('登录')
				} // end if
				
			},
			// 跳转到关于我们页面
			toAboutUs: function() {
				uni.navigateTo({
					url: '/pagesA/pages/aboutUs/aboutUs'
				})
			},
			// 跳转到基本信息页面
			toBaseInfo: function() {
				uni.navigateTo({
					url: '/pagesB/pages/center/baseInfo/baseInfo'
				})
			},
			// 退出登录
			outLogin: function() {
				let that = this
				uni.showModal({
				    title: '退出登录',
				    content: '是否退出登录？',
				    confirmText: "确认",
				    cancelText: "取消",
				    success: function (res) {
				        if (res.confirm) {
				            uni.removeStorageSync('isAlreadyLogin');
							uni.removeStorageSync('cardID');
							that.isAlreadyLogin = false
				        }else{
							
				        }
				    }
				});
			},
			// 获取用户信息
			getUserInfo: function() {
				uni.showLoading({
					title: '信息加载中'
				})
				getUserBaseInfo().then(res => {
					const data = res.data.data.basicInfo
					this.userBaseInfo.name = data.name
					this.userBaseInfo.avatarUrl = data.avatarUrl
					this.userBaseInfo.phone = data.phone
					// 存储账户id，方便 后面调用
					uni.setStorageSync('accountID', res.data.data.account.id) 
					uni.setStorageSync('userID', data.id)
					this.getMyselfCardInfo()
					uni.setStorageSync('userInfo', JSON.stringify(this.userBaseInfo))
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取用户基本信息失败')
				})
			},
			// 首先获取自己的就诊卡信息
			getMyselfCardInfo: function() {
				let that = this
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if(res.data.code === 200) {
						const data = res.data.data
						if( data.length > 0) {
							data.forEach(function(item, index){
								// 获取自己的就诊卡号
								if(item.type === 0) {
									uni.setStorageSync('cardID', item.id)
									that.cardID = item.id
									wx.stopPullDownRefresh()
									return
								}
							})
						}
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
			},
		},
		onShow() {
			console.log(md5("admin"))
			if(uni.getStorageSync('isAlreadyLogin')) {
				this.getUserInfo()
			}
			this.isAlreadyLogin = uni.getStorageSync('isAlreadyLogin')
		}
	}
</script>

<style lang="scss">
	page {
		@extend .page-backgroud;
	}

	@import '@/common/scss/common.scss';
	$major-color: #7EC0EE;

	.top-box {
		width: 100%;
		height: 250rpx;
		background: $major-color;

		// 头像与信息的盒子
		.row-box {
			@include width-margin(90%, 100%);
			@include flex-direction(row);
			align-items: center;
			justify-content: space-between;

			// 头像框
			.avatar-url-box {
				@include userAvatarUrl-box(90px, 90px, 12px);
			}

			// 姓名和卡号的box
			.name-card-box {
				width: 40%;
				height: 90%;
				@include flex-direction(column);

				// 名字和性别
				.name-text-box {
					width: 100%;
					height: 50%;
					display: flex;
					align-items: center;

					.name-text {
						@include font-style(19px, bold, #ffffff);
					}

					.icon {
						@include icon-size(70rpx, 70rpx);
					}
				}

				// 就诊卡号
				.card-text {
					width: 100%;
					height: 50%;
					@include font-style(17px, 400, #ffffff);
					display: flex;
					align-items: center;
				}
			}

			// 向右的箭头icon
			.right-white-icon {
				@include icon-size(70rpx, 70rpx);
				margin-left: 40rpx;
			}

			// 当用户没有登录时
			.no-login-img {
				@include userAvatarUrl-box(90px, 90px, 12px);
				background: #FFFFFF;
			}

			.no-login-text-box {
				width: 70%;
				height: 50%;
				margin-left: 40rpx;
				@include flex-direction(column);

				.login {
					height: 70rpx;
					@include font-style(19px, bold, #ffffff);
				}

				.welcome {
					height: 50rpx;
					@include font-style(15px, 400, #ffffff);
				}
			}
		}
	}

	// 账户以及挂号记录box
	.account-acord-outbox {
		width: 100%;
		height: 130rpx;
		margin-top: 30rpx;
		background: #FFFFFF;

		.account-acord-inbox {
			@include width-margin(90%, 100%);
			@include flex-direction(row);

			.left-right-half {
				width: 50%;
				height: 100%;
				@include flex-direction(row);
				align-items: center;

				.icon {
					@include icon-size(80rpx, 80rpx);
					margin-right: 20rpx;
				}

				.text {
					width: 70%;
					@include font-style(18px, 500, #A6A6A6);
				}
			}
		}
	}

	// 各种选项
	.bottom-outbox {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		@include flex-direction(column);

		.option-inbox {
			@include width-margin(90%, 130rpx);
			@include flex-direction(row);
			align-items: center;

			.icon {
				@include icon-size(80rpx, 80rpx);
				margin-right: 20rpx;
			}

			.text {
				@include font-style(18px, 500, #A6A6A6);
			}
		}

		// 最后一个不加下划线
		.option-inbox:not(:last-child) {
			border-bottom: 1px solid #F4F4F4;
		}
	}
</style>
