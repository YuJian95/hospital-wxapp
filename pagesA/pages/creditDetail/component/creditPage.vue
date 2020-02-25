<template>
	<div>
		<div class="icon-box">
			<image class="icon-credit-status" 
			:src="creditRecord.isCreditGood ? iconUrl +  'xinyong-zanmei.jpg' :
			 iconUrl + 'xinyong-bad.png'"></image>
		</div>
		<div class="text-illustrate" v-show="creditRecord.isCreditGood">
			<text class="text">信用记录良好，没有失信记录</text>
			<image class="icon" src="/static/center/agree.png"></image>
		</div>
		<div class="text-illustrate" v-show="!creditRecord.isCreditGood">
			<text class="text">已失信{{ breakPromiseCount }}次，注意诚实守信</text>
		</div>
		
		<!-- 底部的信用详情的表格 -->
		<div class="credit-detial">
			<div class="credit-in-box">
				<text class="left">{{ currentStatusText }}挂号次数</text>
				<text class="right">3次</text>
			</div>
			<div class="credit-in-box">
				<text class="left">{{ currentStatusText }}守信次数</text>
				<text class="right">3次</text>
			</div>
			<div class="credit-in-box">
				<text class="left">{{ currentStatusText }}失信次数</text>
				<text class="right">0次</text>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		/**
		 * 此处传过来的状态中不包括以往记录的有失信记录的，
		 * 当以往记录中有失信记录时将跳转到另一个页面
		 * **/
		props: {
			creditRecord: {
				// currentStatus: 0, // 显示当前显示的是当月的还是以往的信用详情
				// isCreditGood: true, // 信用是不是良好，良好即完全没有失信记录
			}
		},
		computed: {
			currentStatusText: function() {
				if(this.creditRecord.currentStatus == 0) {
					return '当月'
				} 
				return '总'
			}
		},
		data() {
			return {
				iconUrl: '/static/center/', // icon图的url
				breakPromiseCount: 1, // 记录失信次数
			}
		},
		methods: {
			// 假如是当月的页面的切换数据
			changeData: function(data) {
				this.creditRecord = data
			}
		},
		mounted() {
			console.log(this.creditRecord)
		}
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
