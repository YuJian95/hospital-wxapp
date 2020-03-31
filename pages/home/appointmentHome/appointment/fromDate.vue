<template>
	<view class="page-backgroud">
		<view class="top-date-text">
			<image class="icon" src="/static/appointment/date-blue.png"></image>
			<text class="text">请选择挂号的日期</text>
		</view>
		<view class="date-box">
			<view class="date-line-box" v-for="(item, index) in dateList" :key="index"
			 @click="toDepartmentPage(item, index)">
				<text class="date">{{item.year}}年{{item.month}}月{{item.date}}日</text>
				<text class="day">星期{{item.day}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {formDate} from '@/common/js/formDate.js';
	export default {
		data() {
			return {
				dateList: []
			}
		},
		methods: {
			toDepartmentPage: function(item, index) {
				let hospitalId = uni.getStorageSync('firstHospitalId')
				let dateInfo = {
					dateInfo: item,
					index: index
				}
				uni.setStorageSync('dateInfo', JSON.stringify(dateInfo))
				uni.navigateTo({
					url: '/pages/home/appointmentHome/selectDepartment/selectDepartment?hospitalID='
					+ hospitalId 
				})
			},
			// 获取日期
			getCurrentDate: function() {
				let currentDate = new Date()
				this.dateList = formDate(currentDate, 'week-date');
			}
		},
		mounted() {
			this.getCurrentDate()
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
