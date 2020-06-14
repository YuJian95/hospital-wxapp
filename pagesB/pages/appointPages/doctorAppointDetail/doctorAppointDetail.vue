<!-- 该页面是到达某个医生的详情页，可以查看某个医生的号源详情 -->
<template>
	<view>
		<view class="doctor-outbox" style="height: 200rpx;">
			<image class="doctor-icon-box" :src="doctorInfo.gender === 1 ? iconURL + 'man-doctor.png'
			: iconURL + 'women-doctor.png'"></image>
			<view class="doctor-info">
				<text class="doctor-name">{{doctorInfo.name}}</text>
				<text class="gray-text ">{{doctorInfo.jobTitle}}</text>
			</view>
		</view>
		<doctor-treatment-time v-if="isTreatmentTime == 1" ></doctor-treatment-time>
		<doctor-detial v-if="isTreatmentTime == 2" :introduce="doctorInfo.specialty"></doctor-detial>
	</view>
</template>

<script>
	import doctorTreatmentTime from './component/doctorTreatmentTime';
	import doctorDetial from './component/doctorDetial';
	import {getOutCallByDoctor} from '@/common/api/outCall.js'
	export default {
		components: {
			doctorTreatmentTime,
			doctorDetial
		},
		data() {
			return {
				iconURL: '/static/appointment/',
				isTreatmentTime: 0,
				doctorInfo: {}
			}
		},
		methods: {
			// 获取医生的出诊信息
			// getOutCallByDoctor: function() {
			// 	getOutCallByDoctor(this.doctorInfo.id).then(res => {
			// 		if(res.data.code === 200) {
						
			// 		}
			// 	}) 
			// }
		},
		onLoad(e) {
			this.isTreatmentTime = e.isTreatmentTime
			this.doctorInfo = JSON.parse(uni.getStorageSync('doctorInfo')).doctorInfo
			// uni.removeStorageSync('doctorInfo')
			this.getOutCallByDoctor()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/doctor.scss';

	page {
		@extend .page-backgroud;
	}

	.icon-outbox {
		@include width-margin(200rpx, 200rpx);
		border: 1px solid $border-color;
		border-radius: 50%;
	}

	.doctor-name {
		width: 100%;
		height: 50%;
		@include font-style(18px, bold, #000000);
		display: flex;
		align-items: center;
	}

	.gray-text {
		width: 60%;
		height: 50%;
		@include font-style(16px, 500, $gray-color);
		display: flex;
		align-items: center;
	}

	.doctor-icon-box {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		border: 1px solid $border-color;
		margin: 0 8% 0 4%;
	}
</style>
