<!-- 该页面是从点击个人中心的就诊记录跳转过来的，用于展示用户的就诊记录 -->
<template>
	<view class="page-backgroud">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="item.id==TabCur?'text-green cur':''" v-for="(item,index) in cardList" :key="item.id"
			 @tap="tabSelect" :data-id="item.id">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="treat-record-box" v-for="(item, index) in treatRecordList" :key="item.appointmentId" @click="toDetail(item.appointmentId)">
			<view class="info-box">
				<text class="left black-text">时间：</text>
				<text class="right gray-text">{{ item.day | getDate }}/{{ item.time | getNoon}}</text>
			</view>
			<view class="info-box">
				<text class="left black-text">医生：</text>
				<text class="right gray-text">{{ item.doctorName }}</text>
			</view>
			<view class="info-box">
				<text class="left black-text">科室：</text>
				<text class="right gray-text">{{ item.specialName }}/{{ item.outpatientName }}</text>
			</view>
			<view class="more">查看详情...</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
	import {
		getUserCardInfo
	} from '@/common/api/userInfo.js'
	import {
		getTreatRecord
	} from '@/common/api/outCall.js'
	import {error} from '@/common/js/errorTips.js'
	var _self = 1,
		timer = null;

	export default {
		data() {
			return {
				treatRecordList: [],
				cardList: [],
				TabCur: 0,
				scrollLeft: 0,
				loadingText: '加载中...',
				page: 1,
			}
		},
		// 到达底部时会自动获取新数据
		onReachBottom: function() {
			let _self = this
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				if (_self.loadingText != '已加载全部') {
					_self.getTreatRecord()
				}
			}, 1000);
		},

		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.getTreatRecord();
			},
			// 获取就诊卡列表
			getUserCardInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				this.cardList = []
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						this.cardList = res.data.data
						this.TabCur = this.cardList[0].id
						this.getTreatRecord()
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取就诊卡列表失败')
				})
			},
			// 点击跳转到详情页面
			toDetail: function(ID) {
				uni.navigateTo({
					url: '/pagesA/pages/treatRecord/treatRecordDetail/' +
						'treatRecordDetail?recordID=' + ID
				})
			},
			// 获取用户就诊记录列表
			getTreatRecord: function() {
				uni.showLoading({
					title: '加载中'
				})
				let that = this;
				this.treatRecordList = [];
				getTreatRecord(this.TabCur, this.page, 2).then(res => {
					if (res.data.code === 200) {
						let data = res.data.data;
						if(data.list === null) {
							this.loadingText = '已加载全部'
						} else {
							if (that.page === 1) {
								that.treatRecordList = data.list
								that.page++
							} else {
								that.treatRecordList = that.treatRecordList.concat(data.list)
								that.page++
							} // end if
							
							if (data.list.length < 2) {
								this.loadingText = '已加载全部'
							} else {
								this.loadingText = '加载更多'
								// this.page++
							}
						}
						
						
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取就诊记录失败')
				})
			}
		},
		onLoad() {
			this.getUserCardInfo()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	.treat-record-box {
		@include width-margin(90%, auto);
		background-color: #FFFFFF;
		border-radius: 7px;
		overflow: hidden;
		margin-top: 30rpx;

		.info-box {
			@include width-margin(90%, 80rpx);
			line-height: 80rpx;
			@include row-left-right(20%, 80%);

			.black-text {
				@include font-style(16px, 500, #000000);
			}

			.gray-text {
				@include font-style(16px, 500, $gray-color);
			}
		}

		.info-box:nth-last-child(2) {
			border-bottom: 1px solid $uni-border-color;
		}

		.more {
			@include width-margin(90%, 100rpx);
			line-height: 100rpx;
			text-align: right;
			@include font-style(17px, 500, $major-color);
		}
	}

	.treat-record-box:last-child {
		margin-bottom: 30rpx;
	}

	.loading {
		text-align: center;
		line-height: 80px;
	}
</style>
