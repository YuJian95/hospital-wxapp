<!-- 该页面是到达某个医生的详情页，可以查看某个医生的号源详情 -->
<template>
	<view>
		<view class="doctor-outbox" style="height: 200rpx;">
			<image class="doctor-icon-box" src="/static/appointment/man-doctor.png"></image>
			<view class="doctor-info">
				<text class="doctor-name">杨XX</text>
				<text class="gray-text ">副主任医师</text>
			</view>
		</view>
		<doctor-treatment-time v-if="isTreatmentTime"></doctor-treatment-time>
		<doctor-detial v-else></doctor-detial>
	</view>
</template>

<script>
	import doctorTreatmentTime from './component/doctorTreatmentTime';
	import doctorDetial from './component/doctorDetial';
	export default {
		components:{
			doctorTreatmentTime,
			doctorDetial
		},
		data() {
			return {
				isTreatmentTime: ''
			}
		},
		methods: {

		},
		onLoad(e) {
			this.isTreatmentTime = e.isTreatmentTime
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/doctor.scss';

page{
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
