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
		<view class="doctor-outbox" @click="toDoctorAppointDetail(item)" v-if="isGetData"
		v-for="(item, index) in doctorList" :key="item.doctorInfo.id">
			<image class="doctor-icon" :src="item.doctorInfo.gender === 1 ? 
			iconURL + 'man-doctor.png' : iconURL + 'women-doctor.png'"></image>
			<view class="doctor-info">
				<view class="doctor-job-box">
					<text class="doctor-name">{{item.doctorInfo.name}}</text>
					<text class="gray-text">{{item.doctorInfo.jobTitle}}</text>
				</view>
				<text class="gray-text ">出诊：
					<text style="color: #7EC0EE;">{{item.outCallList.time | getVisitPlanTime}}</text></text>
			</view>
		</view>
		<!-- 当没有医生出诊信息时 -->
		<noDataPage :message='message' v-if="!isGetData"></noDataPage>

		<!-- 从底部弹出选择 -->
		<view class="cu-modal bottom-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="insureChangeHospital()">确定</view>
					<view class="action text-blue" @tap="hideModal()">取消</view>
				</view>
				<view class="bottom-hospital-box">
					<view class="hospital-box" v-for="(item,index) in hospitalList" :key="item.id">
						<view class="hospital" :class="showVisited == item.id?
						 'visited-background':'invisited-background'" @click="changeHospital(item.id, item.name)">
							<text class="text">
								{{ item.name }}
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
	import {getOutCall} from '@/common/api/outCall.js';
	import {getDoctorInfoById} from '@/common/api/doctor.js';
	import {
		getAllHospital
	} from '@/common/api/hospital.js'
	export default {
		data() {
			return {
				isShowMoreDate: true,
				visitedIndex: 0, // 用来表示当前点击的index是哪个
				dateList: [],
				isShowModal: false,
				hospitalList: [],
				visitedHospital: 0,
				showVisited: 0,
				showName: '',
				doctorList: [], // 获取的医生出诊列表
				sentDate: '', // 用于传给后台的时间日期
				iconURL: '/static/appointment/',
				isGetData: false, // 没有医生出诊信息时为false
				message: '医生出诊', 
				hospitalData: {}, // 用于获取医院id，专科门诊id,日期
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
				let date = this.dateList[index].year + '-' + this.dateList[index].month + 
				'-' + this.dateList[index].date;
				this.hospitalData.date = date;
				this.getOutCall(date, this.hospitalData.hospitalId, 
				this.hospitalData.departmentId, this.hospitalData.outpatientId)
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
			changeHospital:function(id, name) { 
				this.showVisited = id;
				this.showName = name
			},
			// 点击确定确认切换医院
			insureChangeHospital:function() {
				this.visitedHospital = this.showVisited
				this.isShowModal = false
				// 获取出诊信息
				this.getOutCall(this.hospitalData.date, this.visitedHospital,
				this.hospitalData.departmentId, this.hospitalData.outpatientId)
				let hospital = {
					id: this.visitedHospital,
					name: this.showName
				}
				uni.setStorageSync('hospital', JSON.stringify(hospital))
			},
			// 跳转到医生号源页面详情
			toDoctorAppointDetail:function(doctorInfo) {
				console.log(doctorInfo)
				uni.setStorageSync('doctorInfo', JSON.stringify(doctorInfo))
				uni.redirectTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 1 
				})
			},
			// 获取该医院该专科门诊当天的出诊计划
			getOutCall: function(today, hospitalId, departmentId, outpatientId) {
				this.doctorList = [];
				uni.showLoading({
					title: '加载中'
				})
				getOutCall(today, 1, 50, hospitalId, departmentId, outpatientId).then(res =>{
					if(res.data.code === 200) {
						const data = res.data.data.list;
						let that = this;
						if(data.length === 0 || data === null) {
							this.isGetData = false
							console.log(this.isGetData)
						} else {
							this.isGetData = true
							data.forEach(function(item, index){
								let doctorInfo = {}
								getDoctorInfoById(item.doctorId).then(res => {
									if(res.data.code === 200) {
										doctorInfo = res.data.data;
										that.doctorList.push({
											outCallList: item,
											doctorInfo: doctorInfo
										})
									}
								}).catch(() => {
									uni.hideLoading()
									error('获取医生信息失败')
								})
								
							})
						}
						
					}
					uni.hideLoading()
				}).catch(() => {
					ui.hideLoading()
					error('获取出诊列表信息失败')
				})
			}
		},
		onLoad(e) {
			this.getCurrentDate()
			let today;
			if(uni.getStorageSync('dateInfo')) {
				let date = JSON.parse(uni.getStorageSync('dateInfo'));
				 today = date.dateInfo.year + '-' + date.dateInfo.month + '-' 
				+ date.dateInfo.date;
				this.visitedIndex = date.index
			} else {
				// 获取当天日期
				 today = this.dateList[0].year + '-' + this.dateList[0].month + '-' + this.dateList[0].date;
			}
			this.getOutCall(today, e.hospitalId, e.departmentId, e.outpatientId)
			this.showVisited = e.hospitalId;
			this.visitedHospital = this.showVisited
			this.hospitalData = {
				hospitalId: e.hospitalId,
				departmentId: e.departmentId,
				outpatientId: e.outpatientId,
				date: today
			}
			uni.removeStorageSync('dateInfo')
			console.log(uni.getStorageSync('doctor'))
		},
		onShow() {
			// 获取医院信息
			getAllHospital(1, 50, '').then(res => {
				if (res.data.code === 200) {
					this.hospitalList = res.data.data.list
				}
			}).catch(() => {
				error('网络')
			})
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
			width: 50%;
			@include font-style(16px, bold, #000000);
			vertical-align: middle;
		}
	}

	.gray-text {
		width: 100%;
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
