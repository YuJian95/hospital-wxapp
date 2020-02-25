<!-- 该页面是用户查看自己的当前的就诊队列 -->
<template>
	<view>
		<!-- 假如有数据的时候显示数据的样子 -->
		<view class="out-box" v-show="isGetData">
			<view class="row-in-box">
				<view class="left-icon-text left">
					<image class="icon" src="/static/center/paidui.png"></image>
					<text class="gray-text">前面还有</text>
				</view>
				<text class="gray-text right">
					<text class="orange-text">3</text>
					人候诊
				</text>
			</view>
			<view class="row-in-box">
				<text class="left gray-text">您的就诊号为：</text>
				<text class="gray-text right">
					<text class="orange-text">13</text>
					号
				</text>
			</view>
			<view class="row-in-box">
				<text class="left gray-text">距离您就诊大约还有：</text>
				<text class="gray-text right">
					<text class="orange-text">20</text>
					分钟
				</text>
			</view>
			<view class="row-in-box">
				<text class="gray-text">
					请您在
					<text class="orange-text">11：00 前</text>
					到达诊室外面候诊
				</text>
			</view>
		</view>
		<!-- 当没有数据或者当前还没到预约的就诊时间时显示没有候诊详情 -->
		<noDataPage :message='message'></noDataPage>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isGetData: false,
				message: '候诊', // 此处为传递给没有数据页面的显示文字
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	.out-box {
		@include width-margin(90%, 100%);
		margin-top: 50rpx;

		.row-in-box {
			width: 100%;
			height: 130rpx;
			border-bottom: 1px solid $border-color;
			@include row-left-right(70%, 30%);
			line-height: 130rpx;

			.left-icon-text {
				display: flex;
				align-items: center;

				.icon {
					@include icon-size(80rpx, 80rpx);
					margin-right: 30rpx;
				}
			}

			.gray-text {
				@include font-style(18px, 500, $gray-color);
			}

			.orange-text {
				@include font-style(18px, 500, #FFD39B);
				margin: 0 10rpx;
			}
		}
	}
</style>
