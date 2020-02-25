<!-- 这个页面只有是当用户点击的是以往记录，并且是当用户存在失信记录时才会出现 -->
<template>
	<div class="body-box">
		<div class="top-bottom-box">
			<text class="blue-text">信用详情</text>
			<!-- 的信用详情的表格 -->
			<div class="credit-detial">
				<div class="credit-in-box">
					<text class="left">总挂号次数</text>
					<text class="right">3次</text>
				</div>
				<div class="credit-in-box">
					<text class="left">总守信次数</text>
					<text class="right">2次</text>
				</div>
				<div class="credit-in-box">
					<text class="left">总失信次数</text>
					<text class="right">1次</text>
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
				<div class="date-reason-box" :key="index" v-for="(item, index) in lostCreditList">
					<text class="left-right-text">{{ item.date }}</text>
					<text class="left-right-text">{{ item.reason }}</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lostCreditList: [{
					date: '2019-10-12',
					reason: '未按时就诊'
				}, {
					date: '2019-10-22',
					reason: '取消预约挂号'
				}, {
					date: '2019-10-32',
					reason: '未按时就诊'
				}, {
					date: '2019-10-42',
					reason: '取消预约挂号'
				}, {
					date: '2019-10-52',
					reason: '取消预约挂号'
				}, {
					date: '2019-10-62',
					reason: '未按时就诊'
				}]
			}
		},
		methods: {

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
</style>
