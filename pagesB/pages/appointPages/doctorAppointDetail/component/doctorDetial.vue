<template>
	<view>
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<text class="blue-text">专长</text>
		</view>
		<view class="gray-box">
			<text class="introduce-box">擅  长：{{ showIntroduce }}</text>
			<text class="blue-text" v-if="!isOpen" @click="isOpen = true">【展开】</text>
			<text class="blue-text" v-else @click="isOpen = false">【收起】</text>
		</view>
		
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<text class="blue-text">出诊情况</text>
		</view>
		<view class="treatment-box" v-for="(item, index) in visitPlanList" :key="index">
			<view class="hospital-box">
				<text class="text">{{item.info.name}}</text>
			</view>
			<view class="date-box" v-for="(item2,index2) in item.planResiduesDTOList" 
			:key="index2" @click="toDoctorTreatmentTime(item2, item.info)">
				<view class="left left-box">
					<text>{{item2.day | getDate}}</text>
					<!-- <image class="icon" src="/static/appointment/today.png"></image> -->
				</view>
				<text class="right right-text">{{item2.time | getVisitPlanTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getVisitPlanList} from '@/common/api/doctor.js'
	import {formDate} from '@/common/js/formDate.js'
	export default {
		props: {
			introduce: ''
		},
		data() {
			return {
				isOpen: false,
				visitPlan: {},
				visitPlanList: []
			}
		},
		computed:{
			// 将简介只保留前面26个字符，用于展开收起
			showIntroduce:function(){
				if(this.isOpen){
					return this.introduce
				} else{
					// 获取简介中的前面的20个字符的文字
					return this.introduce.substr(0,25)
				}
			}
		},
		methods:{
			// 跳转到医生某天的出诊详情
			toDoctorTreatmentTime: function(outCallList, hospital){
				let hospitalInfo = {
					id: hospital.id,
					name: hospital.name
				}
				this.visitPlan.outCallList = outCallList
				uni.setStorageSync('doctorInfo', JSON.stringify(this.visitPlan))
				uni.setStorageSync('hospital', JSON.stringify(hospitalInfo))
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 1
				})
			},
			// 获取医生出诊计划
			getVisitPlanList: function() {
				uni.showLoading({
					title: '加载中'
				})
				let currentDate = new Date()
				let start = formDate(currentDate, 'YYYY-MM-DD')
				let nextWeek = new Date(currentDate.setDate(currentDate.getDate() + 6))
				let end = formDate(nextWeek, 'YYYY-MM-DD')
				let doctorId = JSON.parse(uni.getStorageSync('doctorInfo')).doctorInfo.id
				let that = this
				getVisitPlanList(doctorId, start, end).then(res => {
					if(res.data.code === 200) {
						let data = res.data.data.planListDTOList
						this.visitPlanList = data
						this.visitPlan.doctorInfo = res.data.data.doctorDTO
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取出诊计划失败')
				})
			}
		},
		created() {
			this.getVisitPlanList()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.gray-box{
		@extend .gray-border-box;
		@include width-margin(90%, 100%);
		.introduce-box{
			@include font-style(15px,500,#000000);
		}
		.blue-text{
			@include font-style(15px,500,$major-color);
		}
	}
	.treatment-box{
		@include width-margin(90%,100%);
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		border: 1px solid #BBBBBB;
		border-radius: 5px;
		background: #FFFFFF;
		.hospital-box{
			width: 100%;
			height: 80rpx;
			border-bottom: 1px solid #BBBBBB;
			line-height: 80rpx;
			background: #EAEAEA;
			.text{
				@include font-style(16px,bold,#000000);
				margin-left: 3%;
			}
		}
		.date-box{
			@include width-margin(90%, 70rpx);
			@include row-left-right(50%,50%);
			line-height: 70rpx;
			align-items: center;
			.left-box{
				@include flex-direction(row);
				@include font-style(14px, 500, #000000);
				align-items: center;
				.icon{
					@include icon-size(50rpx,50rpx);
					margin-left: 30rpx;
				}
			}
			.right-text{
				@include font-style(14px, 500, $gray-color);
			}
		}
		.date-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
	}
	.treatment-box:not(:first-child){
		margin-top: 30rpx;
	}
</style>
