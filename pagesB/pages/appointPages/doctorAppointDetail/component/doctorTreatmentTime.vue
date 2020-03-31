<template>
	<view>
		<view class="gray-box">
			<view class="date-change-box">
				<image class="icon" src="/static/appointment/time-left.png"></image>
				<text>2020-02-01 星期五</text>
				<image class="icon" src="/static/appointment/time-right.png"></image>
			</view>
			<view class="time-money-box" @click="toInsureAppoint()">
				<view class="time-box">
					<view class="time-button">9:00</view>
					<view class="time-button">9:30</view>
				</view>
				<text class="money"><text style="color: #FFD39B;">10</text>元</text>
				<view class="appoint-num">
					<text>可挂号</text>
					<image class="icon" src="/static/icon-right.png"></image>
				</view>
			</view>
			<view class="time-money-box">
				<view class="time-box">
					<view class="time-button gray-background">9:30</view>
					<view class="time-button gray-background">10:00</view>
				</view>
				<text class="money"><text style="color: #FFD39B;">10</text>元</text>
				<view class="appoint-num">
					<text>满号</text>
					<image class="icon"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转到确认挂号页面
			toInsureAppoint: function() {
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/insureAppoint/insureAppoint'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.gray-box{
		@extend .gray-border-box;
		margin-top: 30rpx;
		.date-change-box{
			@include width-margin(90%,100rpx);
			@include flex-direction(row);
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $border-color;
			.icon{
				@include icon-size(60rpx,60rpx);
			}
			.date-day{
				@include font-style(18px,bold,#000000);
			}
		}
		.time-money-box{
			@include width-margin(90%,170rpx);
			@include flex-direction(row);
			justify-content: space-between;
			align-items: center;
			.time-box{
				width: 30%;
				height: 100%;
				margin: 20rpx 0;
				.time-button{
					width: 130rpx;
					height: 55rpx;
					line-height: 55rpx;
					text-align: center;
					background: $major-color;
					margin-top: 20rpx;
					border-radius: 6px;
					overflow: hidden;
					@include font-style(16px,500,#ffffff);
				}
				.gray-background{
					background: #D1D1D1 !important;
				}
			}
			.money{
				width: 40%;
				@include font-style(16px,500,#000000);
				// 多少钱的数字的颜色为#FFD39B
			}
			.appoint-num{
				width: 30%;
				display: flex;
				justify-content: flex-end;
				@include font-style(16px,500,$gray-color);
				align-items: center;
				.icon{
					@include icon-size(60rpx,60rpx);
					// margin-left: 10rpx;
				}
			}
		}
		.time-money-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
	}
</style>
