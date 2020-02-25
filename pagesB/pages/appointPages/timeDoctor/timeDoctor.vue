<template>
	<view>
		<view class="top-select-date">
			<view class="box" v-for="(item,index) in dateList" :key="index" v-if="index < 3" @click="changeDate(index)">
				<text class="day" :class="visitedIndex == index?'visited-color':''">{{ item.day }}</text>
				<text class="date" v-if="index == 0" :class="visitedIndex == index?'visited-color':''">今</text>
				<view v-else>
					<text class="date" :class="visitedIndex == index?'visited-color':''">{{ item.date }}</text>
				</view>
			</view>
			<view class="box" @click="isShowMoreDate = !isShowMoreDate">
				<image class="icon" :src="isShowMoreDate?
				'/static/appointment/icon-up.png':'/static/appointment/icon-down.png'"></image>
				<text class="day" v-if="isShowMoreDate">收起</text>
				<text class="day" v-if="!isShowMoreDate">展示</text>
			</view>
		</view>
		<transition name="slide-fade">
			<view class="top-select-date" v-if="isShowMoreDate">
				<view class="box" v-for="(item,index) in dateList" :key="index" v-if="index >= 3" @click="changeDate(index)">
					<text class="day" :class="visitedIndex == index?'visited-color':''">{{ item.day }}</text>
					<text class="date" :class="visitedIndex == index?'visited-color':''">{{ item.date }}</text>
				</view>
			</view>
		</transition>

		<view class="tips-positon">
			<view class="tips-inbox" @tap="showModal()">
				<image class="icon" src="/static/appointment/tips.png"></image>
				<text class="tips-text">您可以点击
					<text style="color: #7EC0EE;">这里</text>
					切换不同分院</text>
			</view>
		</view>

		<!-- 医生列表 -->
		<view class="doctor-outbox" @click="toDoctorAppointDetail()">
			<image class="doctor-icon" src="/static/appointment/man-doctor.png"></image>
			<view class="doctor-info">
				<view class="doctor-job-box">
					<text class="doctor-name">杨XX</text>
					<text class="gray-text">医师</text>
				</view>
				<text class="gray-text ">剩余
					<text style="color: #7EC0EE;">0</text>
					个号</text>
			</view>
		</view>
		
		<view class="doctor-outbox" @click="toDoctorAppointDetail()">
			<image class="doctor-icon" src="/static/appointment/man-doctor.png"></image>
			<view class="doctor-info">
				<view class="doctor-job-box">
					<text class="doctor-name">杨XX</text>
					<text class="gray-text">医师</text>
				</view>
				<text class="gray-text ">剩余
					<text style="color: #7EC0EE;">0</text>
					个号</text>
			</view>
		</view>

		<!-- 从底部弹出选择 -->
		<view class="cu-modal bottom-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="insureChangeHospital()">确定</view>
					<view class="action text-blue" @tap="hideModal()">取消</view>
				</view>
				<view class="bottom-hospital-box">
					<view class="hospital-box" v-for="(item,index) in hospitalList" :key="index">
						<view class="hospital" :class="showVisited == index?
						 'visited-background':'invisited-background'" @click="changeHospital(index)">
							<text class="text">
								{{ item }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import {
		formDate
	} from '@/common/js/formDate.js';
	export default {
		data() {
			return {
				isShowMoreDate: true,
				visitedIndex: 0, // 用来表示当前点击的index是哪个
				dateList: [],
				isShowModal: false,
				hospitalList: ['大学城总院', '1分院', '2分院', '3分院'],
				visitedHospital: 0,
				showVisited: 0
			}
		},
		methods: {
			// 获取今天的日期
			getCurrentDate: function() {
				let currentDate = new Date()
				this.dateList = formDate(currentDate, 'week-date');
			},
			// 切换日期
			changeDate: function(index) {
				this.visitedIndex = index
			},
			// 打开模态框
			showModal: function() {
				this.isShowModal = true
			},
			// 关闭模态框
			hideModal: function() {
				this.isShowModal = false
				this.showVisited = this.visitedHospital
			},
			// 切换医院信息
			changeHospital:function(index) { 
				this.showVisited = index
			},
			// 点击确定确认切换医院
			insureChangeHospital:function() {
				this.visitedHospital = this.showVisited
				this.isShowModal = false
			},
			// 跳转到医生号源页面详情
			toDoctorAppointDetail:function() {
				uni.redirectTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 1
				})
			}
		},
		onLoad() {
			this.getCurrentDate()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/doctor.scss';
	@import '@/common/scss/common.scss';

	// 顶部选择日期
	.top-select-date {
		width: 100%;
		height: 120rpx;
		@include flex-direction(row);
		align-items: center;
		border-bottom: 1px solid $border-color;

		.box {
			width: 25%;
			height: 85%;
			@include flex-direction(column);
			text-align: center;
			align-items: center;

			.date .day .icon {
				width: 100%;
				height: 50%;
				display: flex;
			}

			.day {
				align-items: flex-start;
				@include font-style(16px, 500, $gray-color);
			}

			.date {
				align-items: flex-end;
				@include font-style(16px, 500, #000000);
			}

			.icon {
				@include icon-size(50rpx, 50rpx);
			}
		}

		.box:not(:last-child) {
			border-right: 1px solid $border-color;
		}
	}

	.tips-positon {
		margin-top: 30rpx;
		@extend .tips-box;
		margin-bottom: 10rpx;
	}

	.doctor-job-box {
		width: 100%;
		height: 50%;
		@include flex-direction(row);
		align-items: center;

		.doctor-name {
			width: 30%;
			@include font-style(16px, bold, #000000);
			vertical-align: middle;
		}
	}

	.gray-text {
		width: 60%;
		height: 50%;
		@include font-style(16px, 500, $gray-color);
		display: flex;
		align-items: center;
	}

	// 从底部弹出不同分院的选择
	.bottom-hospital-box {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;
		flex-wrap: wrap;

		.hospital-box {
			width: 33%;
			height: 80rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			.hospital {
				@include width-margin(85%, 85%);
				border-radius: 10px;
				text-align: center;
				display: table;
				.text{
					width: 100%;
					height: 100%;
					@include font-style(16px, 500, #FFFFFF);
					display: table-cell;
					vertical-align: middle;
				}
			}
			.visited-background{
				background: $major-color;
			}
			.invisited-background{
				background: #D1D1D1;
			}
		}
	}
</style>
