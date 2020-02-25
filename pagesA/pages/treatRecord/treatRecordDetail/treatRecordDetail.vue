<template>
	<view class="page-backgroud">
		<view class="detail-out-box">
			<text class="blue-text">就诊信息</text>
			<view class="top-info-box">
				<view class="info-box">
					<text class="left black-text">日期：</text>
					<text class="right gray-text">{{ detailData.date}}/{{ detailData.time }}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">医生：</text>
					<text class="right gray-text">{{ detailData.doctor}}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">科室：</text>
					<text class="right gray-text">{{ detailData.department}}/{{ detailData.outpatient }}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">患者：</text>
					<text class="right gray-text">{{ detailData.patient}}</text>
				</view>
			</view>
		</view>
		
		<view class="detail-out-box">
			<text class="blue-text">病历：</text>
			<view class="medical-record-box">
				{{ detailData.medicalRecord }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {
					date: '2019-20-10',
					time: '上午',
					doctor: '杨XX',
					department: '内科',
					outpatient: '甲状腺',
					patient: '杨XX',
					medicalRecord: '四六级的静姬带你看到过几十块的开关'
				}
			}
		},
		methods: {
			
		},
		onLoad(e) {
			console.log(e.recordID)
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.detail-out-box{
		@include width-margin(90%, auto);
		margin-top: 40rpx;
		.blue-text{
			@include font-style(18px, 500, $major-color);
			margin-bottom: 5rpx;
		}
		.top-info-box{
			background-color: #FFFFFF;
			border-radius: 7px;
			.info-box{
				@include width-margin(90%, 90rpx);
				line-height: 90rpx;
				@include row-left-right(20%, 80%);
				.black-text{
					@include font-style(16px, 500, #000000);
				}
				.gray-text{
					@include font-style(16px, 500, $gray-color);
				}
			}
		}
		.medical-record-box{
			height: 500rpx;
			background-color: #FFFFFF;
			border-radius: 7px;
			overflow: auto;
			padding: 10rpx;
		}
	}
</style>
