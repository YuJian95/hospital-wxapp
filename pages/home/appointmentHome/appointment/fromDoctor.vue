<!-- 此页面是首页挂号页面点击搜医生进来的 -->
<template>
	<view> 
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"
					@tap="getDoctorList()"></icon>
					<input type="text" class="weui-search-bar__input" placeholder="请输入医生姓名"
					 v-model="inputVal" confirm-type="search" @confirm='getDoctorList()'/>
					<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
						<icon type="clear" size="14"></icon>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="weui-cells searchbar-result" v-if="inputVal.length > 0">
			<navigator url="" class="weui-cell" hover-class="weui-cell_active">
				<view class="weui-cell__bd">
					<view>实时搜索文本</view>
				</view>
			</navigator>
		</view> -->
		
		<!-- <view class="blue-column-border-box" style="margin-top: 15rpx;">
			<view class="blue-border"></view>
			<view class="blue-text">最近三个月的挂号医生</view>
		</view>
		<view class="record-box">
			<view class="doctor-box" v-for="(item,index) in doctorRecordList" :key='item.id'>
				<text class="doctor" :data-name='item.id' @click="changeDoctor"
				:class="isActived == item.id?'doctor-blue-background':''">杨XX</text>
			</view>
		</view> -->
		
		<!-- 医生列表 -->
		<view class="doctor-outbox" style="margin-top: 60rpx;"
		 @click="toDoctorBrief(item)" v-for="(item, index) in doctorList" :key='item.id'>
			<image class="doctor-icon" :src="item.gender === 1 ? iconURL + 'man-doctor.png'
			: iconURL + 'women-doctor.png'"></image>
			<view class="doctor-info">
				<text class="doctor-name">{{item.name}}</text>
				<view class="doctor-job">
					<text class="blue-text">{{item.specialName}}/{{item.outpatientName}}</text>
					<text class="gray-text">{{item.jobTitle}}</text>
				</view>
				<text class="gray-text cut-long-text">简介：{{item.specialty}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getDcotorByName} from '@/common/api/doctor.js'
	import {error} from '@/common/js/errorTips.js'
	
	export default {
		data() {
			return {
				inputVal: "",
				isActived: 0,
				iconURL: '/static/appointment/',
				doctorRecordList: [{
					id: 1,
					name: '杨XX'
				},{
					id: 2,
					name: '杨XX'
				},{
					id: 3,
					name: '杨XX'
				},{
					id: 4,
					name: '杨XX'
				},{
					id: 5,
					name: '杨XX'
				},{
					id: 6,
					name: '杨XX'
				},{
					id: 7,
					name: '杨XX'
				},{
					id: 8,
					name: '杨XX'
				},{
					id: 9,
					name: '杨XX'
				}],
				doctorList: []
			}
		},
		methods:{
			// 清除输入框的东西
			clearInput:function(){
				this.inputVal = ''
			},
			// 获取医生信息
			getDoctorList: function() {
				this.doctorList = [];
				uni.showLoading({
					title: '加载中'
				})
				getDcotorByName(1, 50, this.inputVal.trim()).then(res => {
					if(res.data.code === 200) {
						const data = res.data.data.list
						if(data.length > 0) {
							this.doctorList = data
							uni.hideLoading()
						} else {
							uni.hideLoading()
							error('没有该医生信息，请确认医生姓名')
						}
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
			},
			// 跳转到医生的简介及出诊时间详情
			toDoctorBrief:function(doctorInfo){
				let obj = {
					doctorInfo: doctorInfo
				}
				uni.setStorageSync('doctorInfo', JSON.stringify(obj))
				uni.redirectTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail' + 
					'/doctorAppointDetail?isTreatmentTime=' + 2 
				})
			},
			// 切换挂号记录中的医生
			changeDoctor:function(e){
				this.isActived = e.currentTarget.dataset.name
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 2
				})
				var that = this
				setTimeout(function(){
					that.isActived = 0
				},2000)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/doctor.scss';
	@import '@/common/scss/common.scss';
	// 关于搜索框的样式
	.searchbar-result {margin-top: 0;font-size: 14px;}
	.searchbar-result:before {display: none;}
	.weui-cell {padding: 12px 15px 12px 35px;}
	// 关于医生页面的样式
	.doctor-name{
		height: 50rpx;
		line-height: 50rpx;
		@include font-style(18px,bold,#000000);
	}
	.doctor-job{
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		@include flex-direction(row);
		.blue-text{
			margin-right: 20rpx;
			@include font-style(16px,500,$major-color);
		}
	}
	.gray-text{
		@include font-style(16px,500,$gray-color);
	}
	// 挂号记录的医生
	.record-box{
		@include width-margin(90%,160rpx);
		@include flex-direction(row);
		justify-content: space-between;
		flex-wrap: wrap;
		overflow: scroll;
		.doctor-box{
			width: 25%;
			height: 70rpx;
			display: flex;
			align-items: center;
			.doctor{
				@include width-margin(90%,60rpx);
				text-align: center;
				background: #CCCCCC;
				@include font-style(15px, 500, #ffffff);
				border-radius: 4px;
				line-height: 60rpx;
			}
			.doctor-blue-background{
				background: $major-color !important;
			}
		}
	}
</style>
