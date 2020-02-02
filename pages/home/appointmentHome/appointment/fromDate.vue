<template>
	<view class="page-backgroud">
		<view class="top-date-text">
			<image class="icon" src="/static/appointment/date-blue.png"></image>
			<text class="text">请选择挂号的日期</text>
		</view>
		<view class="date-box" @click="toDepartmentPage()">
			<view class="date-line-box">
				<text class="date">2020年1月18日</text>
				<text class="day">星期六</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月19日</text>
				<text class="day">星期日</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月20日</text>
				<text class="day">星期一</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月21日</text>
				<text class="day">星期二</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月18日</text>
				<text class="day">星期三</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月22日</text>
				<text class="day">星期四</text>
			</view>
			<view class="date-line-box">
				<text class="date">2020年1月23日</text>
				<text class="day">星期五</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toDepartmentPage: function() {
				uni.navigateTo({
					url: '/pages/home/appointmentHome/selectDepartment/selectDepartment'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.top-date-text{
		@include width-margin(70%,100rpx);
		@include flex-direction(row);
		align-items: center;
		text-align: center;
		.icon{
			width: 30%;
			height: 100%;
			margin: 0 auto;
			@include icon-size(80rpx,80rpx);
			margin-right: 5%;
		}
		.text{
			width: 60%;
			vertical-align: middle;
			@include font-style(18px,bold,$major-color);
		}
	}
	.date-box{
		width: 100%;
		height: 100%;
		border: 1px solid $border-color;
		background: #FFFFFF;
		@include flex-direction(column);
		margin-top: 20rpx;
		.date-line-box{
			@include width-margin(90%,100rpx);
			@include flex-direction(row);
			align-items: center;
			.date{
				width: 60%;
				vertical-align: middle;
				@include font-style(17px,bold,#000000);
			}
			.day{
				width: 40%;
				vertical-align: middle;
				@include font-style(16px,500,#000000);
			}
		}
		.date-line-box:not(:last-child) {
			border-bottom: 1px solid $border-color;
		}
	}
	
</style>
