<template>
	<view>
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<text class="blue-text">专长</text>
		</view>
		<view class="gray-box">
			<text class="introduce-box">擅  长：{{ showIntroduce }}</text>
			<text class="blue-text" v-if="!isOpen" @click="isOpen = true">【展开】</text>
			<text class="blue-text" v-else @click="isOpen = false">【收起】</text>
		</view>
		
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<text class="blue-text">出诊情况</text>
		</view>
		<view class="treatment-box">
			<view class="hospital-box">
				<text class="text">XXX分院</text>
			</view>
			<view class="date-box">
				<view class="left left-box">
					<text>2020-01-31</text>
					<image class="icon" src="/static/appointment/today.png"></image>
				</view>
				<text class="right right-text">暂无可挂号源</text>
			</view>
			<view class="date-box">
				<view class="left left-box">
					<text>2020-02-01</text>
				</view>
				<text class="right right-text">暂无可挂号源</text>
			</view>
		</view>
		
		<view class="treatment-box">
			<view class="hospital-box">
				<text class="text">XXX分院</text>
			</view>
			<view class="date-box">
				<view class="left left-box">
					<text>2020-02-01</text>
				</view>
				<text class="right right-text">暂无可挂号源</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOpen: false,
				introduce: '痤疮、皮肤癣病、外阴念珠菌病、性病、红斑狼疮等常见和疑难皮肤病。'
			}
		},
		computed:{
			showIntroduce:function(){
				if(this.isOpen){
					return this.introduce
				} else{
					// 获取简介中的前面的20个字符的文字
					return this.introduce.substr(0,25)
				}
			}
		},
		methods:{
		},
		created() {
			// this.getBriefIntroduce(this.introduce)
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	.gray-box{
		@extend .gray-border-box;
		@include width-margin(90%, 100%);
		.introduce-box{
			@include font-style(15px,500,#000000);
		}
		.blue-text{
			@include font-style(15px,500,$major-color);
		}
	}
	.treatment-box{
		@include width-margin(90%,100%);
		margin-top: 10rpx;
		border: 1px solid #BBBBBB;
		border-radius: 5px;
		background: #FFFFFF;
		.hospital-box{
			width: 100%;
			height: 80rpx;
			border-bottom: 1px solid #BBBBBB;
			line-height: 80rpx;
			background: #EAEAEA;
			.text{
				@include font-style(16px,bold,#000000);
				margin-left: 3%;
			}
		}
		.date-box{
			@include width-margin(90%, 70rpx);
			@include row-left-right(50%,50%);
			line-height: 70rpx;
			align-items: center;
			.left-box{
				@include flex-direction(row);
				@include font-style(14px, 500, #000000);
				align-items: center;
				.icon{
					@include icon-size(50rpx,50rpx);
					margin-left: 30rpx;
				}
			}
			.right-text{
				@include font-style(14px, 500, $gray-color);
			}
		}
		.date-box:not(:last-child){
			border-bottom: 1px solid $border-color;
		}
	}
	.treatment-box:not(:first-child){
		margin-top: 30rpx;
	}
</style>
