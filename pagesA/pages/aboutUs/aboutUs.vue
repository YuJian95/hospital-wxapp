<template>
	<view class="page-backgroud">
		<view class="tips-positon">
			<view class="tips-inbox" @tap="showModal()">
				<image class="icon" src="/static/appointment/tips.png"></image>
				<text class="tips-text">您可以左右滑切换医院信息</text>
			</view>
		</view>

		<swiper class="screen-swiper square-dot swiper-out-box" :indicator-dots="true" :circular="true" duration="500"
		 indicator-color="#A6A6A6" indicator-active-color="#7EC0EE">
			<swiper-item v-for="(item,index) in hospitalList" :key="index">
				<view class="info-image-box">
					<view class="info-box">
						<view class="info">
							<h1>{{ item.name }}</h1>
						</view>
						<view class="info">
							<text class="gray-text">{{ item.phone }}</text>
						</view>
					</view>
					<view class="image-box">
						<image mode="widthFix" :src="item.picture"></image>
					</view>
				</view>
				<view class="address-box">
					<text class="left">地址：</text>
					<text class="gray-text right">{{ item.address }}</text>
				</view>
				<view class="hospital-brief">
					<text class="black-text brif-title">医院介绍：</text>
					<text class="brief-content gray-text">{{item.description}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getAllHospital
	} from '@/common/api/hospital.js'
	import {
		error
	} from '@/common/js/errorTips.js'
	export default {
		data() {
			return {
				imageURL: '/static/appointment/hospital/',
				hospitalList: []
			}
		},
		methods: {
			// 获取医院的信息
			getAllHospitalList: function() {
				getAllHospital(1, 50, '').then(res => {
					if (res.data.code === 200) {
						this.hospitalList = res.data.data.list
					}
				}).catch(() => {
					error('网络')
				})
			}
		},
		onLoad() {
			this.getAllHospitalList()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	/* #ifdef H5 */
	page {
		@extend .page-backgroud;
	}

	/* #endif */
	.tips-positon {
		margin-top: 10rpx;
		@extend .tips-box;
		margin-bottom: 10rpx;
	}

	.swiper-out-box {
		@include width-margin(90%, 1250rpx);
		height: 1030rpx !important;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		border-radius: 8px;
		padding: 15rpx;
		overflow: auto;

		.info-image-box {
			@include width-margin(95%, 200rpx);
			@include row-left-right(60%, 40%);
			margin-top: 20rpx;

			.info-box {
				@include flex-direction(column);

				.info {
					height: auto;
					display: flex;
					align-items: center;
					margin: 10rpx 0;
				}
			}

			.image-box {
				width: 200rpx;
				height: 120rpx;
			}
		}

		.address-box {
			@include width-margin(95%, auto);
			@include row-left-right(25%, 75%);
			align-items: center;
			margin: 10rpx auto;
		}

		.hospital-brief {
			@include width-margin(95%, auto);
			@include flex-direction(column);
			margin-top: 20rpx;

			.brif-title {
				height: 70rpx;
				line-height: 70rpx;
			}

			.brief-content {
				@include width-margin(90%, 550rpx);
				overflow: scroll;
			}
		}

		.black-text {
			@include font-style(18px, 500, #000000);
		}

		.gray-text {
			@include font-style(16px, 500, $gray-color);
		}
	}
</style>
