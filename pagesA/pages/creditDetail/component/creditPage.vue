<template>
	<div>
		<div class="icon-box">
			<image class="icon-credit-status" 
			:src="isCreditGood ? iconUrl +  'xinyong-zanmei.jpg' :
			 iconUrl + 'xinyong-bad.png'"></image>
		</div>
		<div class="text-illustrate" v-show="isCreditGood">
			<text class="text">信用记录良好，没有失信记录</text>
			<image class="icon" src="/static/center/agree.png"></image>
		</div>
		<div class="text-illustrate" v-show="!isCreditGood">
			<text class="text">已失信{{ lost }}次，注意诚实守信</text>
		</div>
		
		<!-- 底部的信用详情的表格 -->
		<div class="credit-detial">
			<div class="credit-in-box">
				<text class="left">当月守信次数</text>
				<text class="right">{{ creditDetail.finish }}次</text>
			</div>
			<div class="credit-in-box">
				<text class="left">当月取消预约次数</text>
				<text class="right">{{ creditDetail.cancel }}次</text>
			</div>
			<div class="credit-in-box">
				<text class="left">当月就诊迟到次数</text>
				<text class="right">{{creditDetail.miss}}次</text>
			</div>
		</div>
	</div>
</template>

<script>
	import {error} from '@/common/js/errorTips.js'
	import {getMonthCredit} from '@/common/api/credit.js'
	export default {
		data() {
			return {
				iconUrl: '/static/center/', // icon图的url
				creditDetail: {},
				isCreditGood: false, // 是否失信
				lost: 0, // 失信 = 迟到 + 取消
			}
		},
		methods: {
			// 假如是当月的页面的切换数据
			changeData: function(data) {
				this.creditRecord = data
			},
			test() {
				console.log(2)
			},
			// 获取信用
			getMonthCredit: function() {
				uni.showLoading({
					title: "加载中"
				})
				getMonthCredit(uni.getStorageSync("accountID"), uni.getStorageSync('cardID')).then(res => {
					if(res.data.code === 200) {
						if(res.data.data !== null) {
							let data = res.data.data
							this.creditDetail = data
							if(data.miss === 0 && data.cancel === 0) {
								this.isCreditGood = true
								this.allAppointNum = data.finish
							} else {
								this.isCreditGood = false;
								this.lost = data.miss + data.cancel;
							}
						}
						 else {
							 this.isCreditGood = true;
							 this.allAppointNum = 0;
							 this.creditDetail.miss = 0;
							 this.creditDetail.cancel = 0;
							 this.creditDetail.finish = 0;
						 }
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error("获取信用记录失败")
				})
			}
		},
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	// 表示的顶部的那个图案
	.icon-box{
		width: 100%;
		height: 500rpx;
		display: flex;
		align-items: center;
		.icon-credit-status{
			@include icon-size(380rpx, 380rpx);
			margin: 0 auto;
		}
	}
	// 中间的解释的文字，即是否有失信记录，失信多少次
	.text-illustrate{
		width: 100%;
		height: 100rpx;
		@include flex-direction(row);
		align-items: center;
		justify-content: center;
		.text{
			@include font-style(16px, 500, $gray-color);
			margin-right: 20rpx;
		}
		.icon{
			@include icon-size(60rpx, 60rpx);
		}
	}
	// 底部的详情表格
	.credit-detial{
		@include width-margin(80%, 100%);
		border: 1px solid $gray-color;
		border-radius: 4px;
		margin-top: 30rpx;
		.credit-in-box{
			@include width-margin(90%, 80rpx);
			@include row-left-right(70%, 30%);
			line-height: 80rpx;
			@include font-style(15px, 500, #000000);
		}
		.credit-in-box:not(:last-child) {
			border-bottom: 1px solid $border-color;
		}
	}
</style>
