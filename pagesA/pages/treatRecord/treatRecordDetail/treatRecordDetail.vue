<template>
	<view class="page-backgroud">
		<view class="detail-out-box">
			<text class="blue-text">就诊信息</text>
			<view class="top-info-box">
				<view class="info-box">
					<text class="left black-text">日期：</text>
					<text class="right gray-text">{{ detailData.day | getDate}}/{{ detailData.time | getNoon}}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">医院：</text>
					<text class="right gray-text">{{ detailData.hospitalName}}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">医生：</text>
					<text class="right gray-text">{{ detailData.doctorName}}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">科室：</text>
					<text class="right gray-text">{{ detailData.specialName}}/{{ detailData.outpatientName }}</text>
				</view>
				<view class="info-box">
					<text class="left black-text">患者：</text>
					<text class="right gray-text">{{ detailData.name}}</text>
				</view>
			</view>
		</view>
		
		<view class="detail-out-box">
			<text class="blue-text">病历：</text>
			<view class="medical-record-box">
				{{ detailData.userCase.content }}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTreatRecordDetail
	} from '@/common/api/outCall.js'
	import {error} from '@/common/js/errorTips.js'
	export default {
		data() {
			return {
				detailData: {},
				recordID: 0,
			}
		},
		methods: {
			// 获取就诊详情
			getTreatRecordDetail: function() {
				uni.showLoading({
					title: '加载中'
				})
				getTreatRecordDetail(this.recordID).then(res => {
					if(res.data.code === 200) {
						this.detailData = res.data.data
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取就诊记录失败')
				})
			}
		},
		onLoad(e) {
			this.recordID = e.recordID;
			console.log(this.recordID)
			this.getTreatRecordDetail();
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
