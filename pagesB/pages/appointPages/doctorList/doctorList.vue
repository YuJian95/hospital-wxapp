<!-- 该页面是从专科的页面跳转过来的医生列表页面 -->
<template>
	<view>
		<view class="doctor-outbox" @click="toDoctorBrief()">
			<image class="doctor-icon" src="/static/appointment/man-doctor.png"></image>
			<view class="doctor-info">
				<text class="doctor-name text-position">杨XX</text>
				<text class="gray-text text-position">医师</text>
			</view>
		</view>
		<view class="doctor-outbox" @click="toDoctorBrief()">
			<image class="doctor-icon" src="/static/appointment/women-doctor.png"></image>
			<view class="doctor-info">
				<text class="doctor-name text-position">杨XX</text>
				<text class="gray-text text-position">医师</text>
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
			toDoctorBrief:function() {
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 2
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/doctor.scss';
	.text-position{
		width: 60%;
		height: 50%;
		display: flex;
		align-items: center;
	}
	.gray-text{
		@include font-style(16px, 500, $gray-color);
	}
	.doctor-name{
		@include font-style(16px, bold, #000000);
	}
</style>
