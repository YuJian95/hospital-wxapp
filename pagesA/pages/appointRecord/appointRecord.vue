<template>
	<view class="page-backgroud">
		<!-- <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="item.id==TabCur?'text-green cur':''" v-for="(item,index) in cardList" :key="item.id" @tap="tabSelect" :data-id="item.id">
				{{item.name}}
			</view>
		</scroll-view> -->
		<view class="appoint-record-box" v-for="(item, index) in appointRecordList" :key="item.appointmentId">
			<view class="top-title">
				<!-- <text>{{item.appointmentId}}</text> -->
				<text class="left">{{ item.day | getDate }}</text>
				<text class="right">{{ item.specialName }}/{{ item.outpatientName}}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医生：</text>
				<text class="right">{{ item.doctorName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">时间：</text>
				<text class="right">{{ item.time | getVisitPlanTime }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医院：</text>
				<text class="right">{{ item.hospitalName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">诊室：</text>
				<text class="right">{{ item.clinicName }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">患者：</text>
				<text class="right">{{ item.name }}(排队号：
					<text style="color: #7EC0EE;">{{ item.queueNum }}</text>)
				</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">费用：</text>
				<text class="right">10元</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">状态：</text>
				<!-- 状态是4证明正常就诊，所以是灰色 -->
				<text class="right" v-if="item.status === 3">
					{{ item.status | statusText }}</text>
				<view class="right" v-if="item.status === 0">
					<text class="green-text">
						{{ item.status | statusText }}</text>
						<button class="cancel-button red-text" 
						@click="cancelAppoint(item.appointmentId)"
						v-if="(item.day - new Date().getTime()) 
						* 1.0 / (1000 * 60 * 60) > 24 && (new Date().getTime()) < item.day">取消预约</button>
				</view> 
				
				<!-- 当状态为2或者3时证明是失信的 -->
				<text class="right red-text" v-if="item.status === 1 || item.status === 2">
					{{ item.status | statusText }}</text>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script> 
	import {getAppointRecord, getAllAppointRecord, cancelAppoint} from '@/common/api/appoint.js';
	import {getUserCardInfo} from '@/common/api/userInfo.js'
	import {error} from '@/common/js/errorTips.js'
	var _self = 1,timer = null;
	export default {
		data() {
			return {
				appointRecordList: [], // 挂号记录列表
				cardList: [], // 就诊卡列表
				loadingText: '加载中...',
				page: 1,
				TabCur: 0,
				scrollLeft: 0
			}
		},
		// 到达底部时会自动获取新数据
		onReachBottom: function() {
			this.loadingText = '加载中'
			let _self = this
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				if(_self.loadingText!='已加载全部'){
					_self.getAllAppointRecord()
				}
			}, 1000);
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.getAllAppointRecord();
			},
			// 点击取消预约按钮
			cancelAppoint: function(id) {
				let that = this;
				console.log(id)
				uni.showModal({
					title: '提示',
					content: '是否取消该次预约，将视为一次失信',
					success: function(res) {
						if (res.confirm) {
							cancelAppoint(id).then(res => {
								if(res.data.code === 200) {
									uni.showToast({
										title: '取消挂号成功'
									})
									that.getAllAppointRecord()
								}
							})
						}
					}
				})
			},
			// 获取就诊卡列表
			// getUserCardInfo: function() {
			// 	uni.showLoading({
			// 		title: '加载中'
			// 	})
			// 	this.cardList = []
			// 	getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
			// 		if (res.data.code === 200) {
			// 			this.cardList = res.data.data
			// 			this.TabCur = this.cardList[0].id
			// 			this.getAllAppointRecord()
			// 		}
			// 	}).catch(() => {
			// 		uni.hideLoading()
			// 		error('获取就诊卡列表失败')
			// 	})
			// },
			// 获取全部挂号记录
			getAllAppointRecord: function() {
				let that = this;
				uni.showLoading({
					title: '加载中'
				})
				getAllAppointRecord(
				uni.getStorageSync("cardID"), uni.getStorageSync("accountID"), this.page, 3).then(res => {
					if(res.data.code === 200) {
						let data = res.data.data;
						that.total = data.total;
						if(data.list !== null) {
							if(that.page === 1) {
								that.appointRecordList =  data.list
								that.page++
							} else {
								that.appointRecordList = that.appointRecordList.concat(data.list)
								that.page++ 
							} // end if
							
							if(data.list.length < 3) {
								this.loadingText = '已加载全部'
							} else {
								this.loadingText = '加载更多'
								// this.page++
							}
						} else {
							this.loadingText = '已加载全部'
						}
						
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取挂号记录失败')
				})
			}
		},
		onLoad() {
			this.getAllAppointRecord()
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
