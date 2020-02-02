<template>
	<view class="page-backgroud">
		<view class="row-50-width">
			<!-- 左边的 -->
			<view class="left-right-half-box">
				<view class="left-right-inbox"  @click="toDepartmentPage()">
					<image style="width: 100%;" mode="widthFix" 
					src="/static/appointment/hospital/hospital1.jpg"></image>
					<view class="row-width">
						<image class="icon" src="/static/appointment/hosp-icon.png"></image>
						<text class="hospital-text">XX医院大学城总院</text>
					</view>
					<view class="row-width">
						<text class="blue-title">地址：</text>
						<text class="address-phone-text cut-long-text">广东省番禺区外环路广东药科大学</text>
					</view>
					<view class="row-width">
						<text class="blue-title">电话：</text>
						<text class="address-phone-text cut-long-text">020-123456</text>
					</view>
				</view>
				
				<view class="left-right-inbox" @click="toDepartmentPage()">
					<image style="width: 100%;" mode="widthFix" 
					src="/static/appointment/hospital/hospital2.jpg"></image>
					<view class="row-width">
						<image class="icon" src="/static/appointment/hosp-icon.png"></image>
						<text class="hospital-text">XX医院大学城总院</text>
					</view>
					<view class="row-width">
						<text class="blue-title">地址：</text>
						<text class="address-phone-text cut-long-text">广东省番禺区外环路广东药科大学</text>
					</view>
					<view class="row-width">
						<text class="blue-title">电话：</text>
						<text class="address-phone-text cut-long-text">020-123456</text>
					</view>
				</view>
			</view>
			<view class="left-right-half-box">
				<view class="left-right-inbox" @click="toDepartmentPage()">
					<image style="width: 100%;" mode="widthFix" 
					src="/static/appointment/hospital/hospital3.jpg"></image>
					<view class="row-width">
						<image class="icon" src="/static/appointment/hosp-icon.png"></image>
						<text class="hospital-text">XX医院大学城总院</text>
					</view>
					<view class="row-width">
						<text class="blue-title">地址：</text>
						<text class="address-phone-text cut-long-text">广东省番禺区外环路广东药科大学</text>
					</view>
					<view class="row-width">
						<text class="blue-title">电话：</text>
						<text class="address-phone-text cut-long-text">020-123456</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toDepartmentPage: function() {
				uni.navigateTo({
					url: '/pages/home/appointmentHome/selectDepartment/selectDepartment'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	// 先将页面分成左右排列
	.row-50-width{
		width: 100%;
		height: 100%;
		@include flex-direction(row);
		// 将页面分成左右两半
		.left-right-half-box{
			width: 50%;
			height: 100%;
			@include flex-direction(column);
			// 每个小块的样式
			.left-right-inbox{
				@include width-margin(91%,100%);
				background: #FFFFFF;
				@include flex-direction(column);
				border: 1px solid #BBBBBB;
				border-radius: 8px;
				padding: 10rpx;
				margin-top: 20rpx;
				.row-width{
					width: 100%;
					height: 70rpx;
					@include flex-direction(row);
					align-items: center;
					.icon{
						@include icon-size(50rpx,50rpx);
						margin-right: 10rpx;
					}
					.hospital-text{
						@include font-style(15px,bold,#000000);
					}
					.blue-title{
						width: 30%;
						@include font-style(16px,400,$major-color);
						margin-right: 2%;
					}
					.address-phone-text{
						width: 68%;
						@include font-style(16px,400,$gray-color);
					}
				}
			}
		}
	}
</style>
