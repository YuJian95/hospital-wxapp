<!-- 这个页面只有是当用户点击的是以往记录，并且是当用户存在失信记录时才会出现 -->
<template>
	<div class="body-box">
		<div class="top-bottom-box">
			<text class="blue-text">信用详情</text>
			<!-- 的信用详情的表格 -->
			<div class="credit-detial">
				<div class="credit-in-box">
					<text class="left">总守信次数</text>
					<text class="right">{{creditDetial.finish}}次</text>
				</div>
				<div class="credit-in-box">
					<text class="left">总取消预约次数</text>
					<text class="right">{{creditDetial.cancel}}次</text>
				</div>
				<div class="credit-in-box">
					<text class="left">总就诊迟到次数</text>
					<text class="right">{{creditDetial.miss}}次</text>
				</div>
			</div>
		</div>
		<!-- 底部的失信详情 -->
		<div class="top-bottom-box">
			<text class="blue-text">失信详情</text>
			<div class="lost-credit-box">
				<div class="top-gray-title">
					<text class="left-right-text">
						时间
					</text>
					<text class="left-right-text">
						详情
					</text>
				</div>
				<div class="date-reason-box" :key="item.id" v-for="(item, index) in lostCreditList"
				@click="toCreditDetail(item.id)">
					<text class="left-right-text">{{ item.gmtCreate | getDate}}</text>
					<text class="left-right-text">{{ item.status | statusText }}</text>
				</div>
			</div>
			<view class="loading">{{loadingText}}</view>
		</div>
	</div>
</template>

<script>
	import {error} from '@/common/js/errorTips.js'
	import {getHistoryCredit, getLostCreditRecord} from '@/common/api/credit.js'
	export default {
		data() {
			return {
				creditDetial: {
					cancel: 0,
					miss: 0,
					finish: 0,
				},
				allAppointNum: 0, // 记录失信次数
				page: 1,
				cardId: 0,
				lostCreditList: [],
			}
		},
		// 到达底部时会自动获取新数据
		onReachBottom: function() {
			let _self = this
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				if(_self.loadingText!='已加载全部'){
					_self.getLostCreditRecord(this.cardId, 1);
				}
			}, 1000);
		},
		methods: {
			// 获取信用的次数
			getHistoryCredit: function() {
				uni.showLoading({
					title: "加载中"
				})
				this.page = 1
				getHistoryCredit(uni.getStorageSync("accountID"), 
				uni.getStorageSync("cardID")).then(res => {
					if(res.data.code === 200) {
						let data = res.data.data;
						if(data !== null) {
							this.creditDetial = data;
						} else {
							this.allAppointNum = 0;
							this.creditDetail.miss = 0;
							this.creditDetail.cancel = 0;
							this.creditDetail.finish = 0;
							uni.hideLoading();
						}
					}
				})
			},
			// 获取失信列表
			getLostCreditRecord: function(cardID, status) {
				this.cardId = cardID;
				let that = this; 
				uni.showLoading({
					title: "加载中"
				})
				if(status === 0) {
					this.page = 1;
				}
				getLostCreditRecord(cardID, this.page, 10).then(res => {
						if(res.data.code === 200) {
							let data = res.data.data;
							if(that.page === 1) {
								that.lostCreditList =  data.list
								that.page++
							} else {
								that.lostCreditList = that.lostCreditList.concat(data.list)
								that.page++ 
							} // end if
							
							if(data.list.length < 10) {
								this.loadingText = '已加载全部'
							} else {
								this.loadingText = '加载更多'
								// this.page++
							}
						}
						uni.hideLoading()
					}).catch(() => {
					uni.hideLoading()
					error('获取挂号记录失败')
				})
			},
			// 跳转至查看失信的挂号记录
			toCreditDetail: function(appointId) {
				uni.navigateTo({
					url: '/pagesA/pages/creditDetail/creditAppointDetail/creditAppointDetail'
					 + '?appointId=' + appointId
				})
			}
		},
		created() {
			this.getHistoryCredit()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	.blue-text {
		@include font-style(18px, 500, $major-color);
	}

	.body-box {
		@include width-margin(90%, 100%);

		.top-bottom-box {
			width: 100%;
			height: 100%;
			margin-top: 50rpx;
			margin-bottom: 5rpx;
			text-align: left;

			// 顶部的详情表格
			.credit-detial {
				@include width-margin(100%, 100%);
				border: 1px solid $gray-color;
				border-radius: 4px;

				.credit-in-box {
					@include width-margin(90%, 80rpx);
					@include row-left-right(70%, 30%);
					line-height: 80rpx;
					@include font-style(15px, 500, #000000);
				}

				.credit-in-box:not(:last-child) {
					border-bottom: 1px solid $border-color;
				}
			}

			// 失信详情表格
			%left-right-half {
				width: 50%;
				height: 100%;
				text-align: center;
			}

			.lost-credit-box {
				width: 100%;
				height: 560rpx;
				border: 1px solid $gray-color;
				border-radius: 8px;
				overflow: auto;
				margin-bottom: 30rpx;

				.top-gray-title {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					border-bottom: 1px solid $gray-color;
					background-color: #F2F2F2;
					border-radius: 8px 8px 0 0;
					overflow: hidden;
					position: sticky;
					top: 0;
					@include flex-direction(row);

					.left-right-text {
						@extend %left-right-half;
						@include font-style(18px, bold, $gray-color);
					}
				}
				.date-reason-box {
					@include width-margin(90%, 90rpx);
					line-height: 90rpx;
					@include flex-direction(row);
				
					.left-right-text {
						@extend %left-right-half;
						@include font-style(16px, 500, #000000);
					}
				}
			}
		}

	}
	.loading {
		text-align: center;
		line-height: 80px;
	}
</style>
