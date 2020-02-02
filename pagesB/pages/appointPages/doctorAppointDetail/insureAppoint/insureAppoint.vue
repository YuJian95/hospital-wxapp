<template>
	<view>
		<view class="blue-column-border-box">
			<view class="blue-border"></view>
			<view class="blue-text">就诊信息详情</view>
		</view>
		<view class="gray-box">
			<view class="top-row-box">
				<text class="left left-text">挂号诊疗费</text>
				<text class="right right-text"><text style="color: #FFD39B;">10</text>元</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">科室</text>
				<text class="right right-text">XXX儿科二楼</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">医生</text>
				<text class="right right-text">杨XX</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">就诊时间</text>
				<text class="right right-text">2020-01-02 09:00-09:30</text>
			</view>
		</view>
		
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<view class="blue-text">选择就诊卡人</view>
		</view>
		<view class="gray-box">
			<view class="bottom-row-box">
				<view class="left left-icon-text-box">
					<image class="icon" src="/static/center/card/radio-actived.png"></image>
					<text class="left-text">杨XX</text>
				</view>
				<text class="right right-text">(就诊卡号：1000001)</text>
			</view>
			<view class="bottom-row-box">
				<view class="left left-icon-text-box">
					<image class="icon" src="/static/add-crads.png"></image>
					<text class="left-text">添加就诊卡人</text>
				</view>
			</view>
		</view>
		<button class="button">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/form.scss';
	page{
		@extend .page-backgroud;
	}
	.gray-box{
		@extend .gray-border-box;
		.top-row-box{
			@include width-margin(95%, 100rpx);
			@include row-left-right(35%, 65%);
			line-height: 100rpx;
			.left-text{
				@include font-style(16px, bold, #000000);
			}
			.right-text{
				@include font-style(16px, 500, $gray-color);
			}
		}
		.bottom-row-box{
			@include width-margin(95%, 100rpx);
			@include row-left-right(50%, 50%);
			line-height: 100rpx;
			.right-text{
				@include font-style(16px, 500, $gray-color);
			}
			.left-icon-text-box{
				height: 100%;
				@include flex-direction(row);
				align-items: center;
				.icon{
					@include icon-size(50rpx,50rpx);
					margin-right: 20rpx;
				}
				.left-text{
					@include font-style(16px, bold, #000000);
				}
			}
		}
		.top-row-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
		.bottom-row-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
	}
	// 按钮的颜色
	.button{
		@extend .button-box;
		margin-top: 50rpx;
	}
</style>
