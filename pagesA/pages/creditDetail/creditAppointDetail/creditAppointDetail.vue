<template>
	<view class="page-backgroud">
		<view class="appoint-record-box">
			<view class="top-title">
				<text class="left">{{ appointRecord.day | getDate }}</text>
				<text class="right">{{ appointRecord.specialName }}/{{ appointRecord.outpatientName}}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医生：</text>
				<text class="right">{{ appointRecord.doctorName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">时间：</text>
				<text class="right">{{ appointRecord.time | getTimePeriod }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医院：</text>
				<text class="right">{{ appointRecord.hospitalName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">诊室：</text>
				<text class="right">{{ appointRecord.clinicName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">患者：</text>
				<text class="right">{{ appointRecord.name }}(排队号：
					<text style="color: #7EC0EE;">{{ appointRecord.queueNum }}</text>)
				</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">费用：</text>
				<text class="right">10元</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">状态：</text>
				<!-- 状态是4证明正常就诊，所以是灰色 -->
				<text class="right" v-if="appointRecord.status === 3">
					{{ appointRecord.status | statusText }}</text>
				<text class="green-text" v-if="appointRecord.status === 0">
					{{ appointRecord.status | statusText }}</text>
				
				<!-- 当状态为2或者3时证明是失信的 -->
				<text class="right red-text" v-if="appointRecord.status === 1 || appointRecord.status === 2">
					{{ appointRecord.status | statusText }}</text>
			</view>
		</view>
	</view>
</template>

<script> 
	import {getCreditDetail} from '@/common/api/credit.js';
	import {error} from '@/common/js/errorTips.js';
	
	export default {
		data() {
			return {
				appointRecord: {}, // 挂号记录
			}
		},
		methods: {
			// 获取该挂号记录详情
			getCreditDetail: function(appointId) {
				uni.showLoading({
					title: '加载中'
				})
				getCreditDetail(appointId).then(res => {
					if(res.data.code === 200) {
						this.appointRecord = res.data.data;
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取挂号记录失败')
				})
			}
		},
		onLoad(e) {
			this.getCreditDetail(e.appointId)
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	// 一个个的数据块
	.appoint-record-box {
		@include width-margin(90%, auto);
		border-radius: 6px;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-top: 30rpx;

		.top-title {
			@include width-margin(90%, 80rpx);
			line-height: 80rpx;
			@include row-left-right(50%, 50%);
			@include font-style(16px, 500, $major-color);
			border-bottom: 1px solid $uni-border-color;
		}

		.appoint-info {
			@include width-margin(90%, 70rpx);
			line-height: 70rpx;
			@include row-left-right(20%, 80%);
			@include font-style(16px, 500, $gray-color);
			align-items: center;

			// 当用户还没到就就诊的时间看到的
			.green-text {
				@include font-style(16px, 500, #6EC823);
			}

			// 有失信时的状态颜色
			.red-text {
				@include font-style(16px, 500, #CE1229);
			}

			// 排队号的颜色
			.balck-text {
				@include font-style(16px, 500, #000000);
			}

			// /取消预约按钮
			.cancel-button {
				width: 190rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin-left: 20rpx;
				margin-right: 0;
			}
		}
	}

	.appoint-record-box:last-child {
		margin-bottom: 30rpx;
	}
	.loading {
		text-align: center;
		line-height: 80px;
	}
</style>
