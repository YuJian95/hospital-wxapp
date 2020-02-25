<!-- 该页面是从点击个人中心的就诊记录跳转过来的，用于展示用户的就诊记录 -->
<template>
	<view class="page-backgroud">
		<view class="treat-record-box" v-for="(item, index) in treatRecordList" 
		:key="item.id" @click="toDetail(item.id)">
			<view class="info-box">
				<text class="left black-text">时间：</text>
				<text class="right gray-text">{{ item.date }}/{{ item.time }}</text>
			</view>
			<view class="info-box">
				<text class="left black-text">医生：</text>
				<text class="right gray-text">{{ item.doctor }}</text>
			</view>
			<view class="info-box">
				<text class="left black-text">科室：</text>
				<text class="right gray-text">{{ item.department }}/{{ item.outpatient }}</text>
			</view>
			<view class="more">查看详情...</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				treatRecordList: [{
					id: 1,
					date: '2019-10-02',
					time: '上午',
					doctor: '杨XX',
					department: '内科',
					outpatient: '甲状腺'
				}, {
					id: 2,
					date: '2019-10-02',
					time: '下午',
					doctor: '杨XX',
					department: '内科',
					outpatient: '甲状腺'
				}]
			}
		},
		methods: {
			// 点击跳转到详情页面
			toDetail: function(ID) {
				uni.navigateTo({
					url: '/pagesA/pages/treatRecord/treatRecordDetail/' + 
					'treatRecordDetail?recordID=' + ID
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.treat-record-box{
		@include width-margin(90%, auto);
		background-color: #FFFFFF;
		border-radius: 7px;
		overflow: hidden;
		margin-top: 30rpx;
		.info-box{
			@include width-margin(90%, 80rpx);
			line-height: 80rpx;
			@include row-left-right(20%, 80%);
			.black-text{
				@include font-style(16px, 500, #000000);
			}
			.gray-text{
				@include font-style(16px, 500, $gray-color);
			}
		}
		.info-box:nth-last-child(2){
			border-bottom: 1px solid $uni-border-color;
		}
		.more{
			@include width-margin(90%, 100rpx);
			line-height: 100rpx;
			text-align: right;
			@include font-style(17px, 500, $major-color);
		}
	}
	.treat-record-box:last-child{
		margin-bottom: 30rpx;
	}
</style>
