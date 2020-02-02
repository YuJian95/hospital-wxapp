<!-- 此页面是首页挂号页面点击搜医生进来的 -->
<template>
	<view>
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
					<input type="text" class="weui-search-bar__input" placeholder="请输入医生姓名" v-model="inputVal" />
					<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
						<icon type="clear" size="14"></icon>
					</view>
				</view>
			</view>
		</view>
		<view class="weui-cells searchbar-result" v-if="inputVal.length > 0">
			<navigator url="" class="weui-cell" hover-class="weui-cell_active">
				<view class="weui-cell__bd">
					<view>实时搜索文本</view>
				</view>
			</navigator>
		</view>
		
		<!-- 医生列表 -->
		<view class="doctor-outbox">
			<image class="doctor-icon" src="/static/appointment/man-doctor.png"></image>
			<view class="doctor-info">
				<text class="doctor-name">杨XX</text>
				<view class="doctor-job">
					<text class="blue-text">儿科门诊</text>
					<text class="gray-text">医师</text>
				</view>
				<text class="gray-text cut-long-text">简介：主要擅长。。。。</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputVal: ""
			}
		},
		methods:{
			clearInput:function(){
				this.inputVal = ''
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/doctor.scss';
	@import '@/common/scss/common.scss';
	// 关于搜索框的样式
	.searchbar-result {margin-top: 0;font-size: 14px;}
	.searchbar-result:before {display: none;}
	.weui-cell {padding: 12px 15px 12px 35px;}
	// 关于医生页面的样式
	.doctor-name{
		height: 50rpx;
		line-height: 50rpx;
		@include font-style(18px,bold,#000000);
	}
	.doctor-job{
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		@include flex-direction(row);
		.blue-text{
			margin-right: 20rpx;
			@include font-style(16px,500,$major-color);
		}
	}
	.gray-text{
		@include font-style(16px,500,$gray-color);
	}
</style>
