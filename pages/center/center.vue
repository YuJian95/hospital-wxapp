<template>
	<view class="body">
		<view class="top-box">
			<view class="row-box" v-if="isLogin">
				<view class="avatar-url-box">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="name-card-box">
					<view class="name-text-box">
						<text class="name-text">杨月霞</text>
						<image class="icon" src="/static/center/female.png"></image>
					</view>
					<text class="card-text">卡号：1000001</text>
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
				<view class="left-right-half">
					<image class="icon" src="/static/center/money.png"></image>
					<text class="text">我的账户</text>
				</view>
				<view class="left-right-half">
					<image class="icon" src="/static/center/appoint-record.png"></image>
					<text class="text">挂号记录</text>
				</view>
			</view>
		</view>

		<view class="bottom-outbox">
			<view class="option-inbox">
				<image class="icon" src="/static/center/card-list.png"></image>
				<text class="text">我的家人</text>
			</view>
			<view class="option-inbox">
				<image class="icon" src="/static/center/paidui.png"></image>
				<text class="text">候诊队列</text>
			</view>
			<view class="option-inbox">
				<image class="icon" src="/static/center/xinyong.png"></image>
				<text class="text">信用详情</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false
			}
		},
		methods: {
			// 跳转到登录页面
			turnLogin: function() {
				uni.navigateTo({
					url: '/pagesB/pages/center/login/login'
				})
			}
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
