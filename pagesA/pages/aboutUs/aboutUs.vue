<template>
	<view class="page-backgroud">
		<view class="tips-positon">
			<view class="tips-inbox" @tap="showModal()">
				<image class="icon" src="/static/appointment/tips.png"></image>
				<text class="tips-text">您可以左右滑切换医院信息</text>
			</view>
		</view>

		<swiper class="screen-swiper square-dot swiper-out-box" :indicator-dots="true" :circular="true" duration="500"
		 indicator-color="#A6A6A6" indicator-active-color="#7EC0EE">
			<swiper-item v-for="(item,index) in hospitalList" :key="index">
				<view class="info-image-box">
					<view class="info-box">
						<view class="info">
							<h1>{{ item.name }}</h1>
						</view>
						<view class="info">
							<text class="gray-text">{{ item.phone }}</text>
						</view>
					</view>
					<view class="image-box">
						<image mode="widthFix" :src="imageURL + item.url"></image>
					</view>
				</view>
				<view class="address-box">
					<text class="left">地址：</text>
					<text class="gray-text right">{{ item.address }}</text>
				</view>
				<view class="hospital-brief">
					<text class="black-text brif-title">医院介绍：</text>
					<text class="brief-content gray-text">的卡就发来得及法兰克福老师发的
						复合属性。设置或检索弹性盒模型对象的子元素如何分配空间。 3
						flex-grow 设置或检索弹性盒的扩展比率。 3
						flex-shrink 设置或检索弹性盒的收缩比率。 3
						flex-basis 设置或检索弹性盒伸缩基准值。 3
						flex-flow 复合属性。设置或检索弹性盒模型对象的子元素排列方式。 3
						flex-direction 该属性通过定义flex容器的主轴方向来决定felx子项在flex容器中的位置。 3
						flex-wrap 该属性控制flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。 3
						align-content 在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）。 3
						align-items 定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 3
						align-self 定义flex子项单独在侧轴（纵轴）方向上的对齐方式。 3
						justify-content 设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 3
						order 设置或检索弹性盒模型对象的子元素出现的順序。</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL: '/static/appointment/hospital/',
				hospitalList: [{
					name: '总院',
					url: 'hospital1.jpg',
					phone: '020-123456',
					address: '看两集孤苦伶仃就搞定了广阔的看过的郭老师的实'
				}, {
					name: '分院1',
					url: 'hospital2.jpg',
					phone: '020-123457',
					address: 'sjhfhdhfdhf'
				}, {
					name: '分院2',
					url: 'hospital3.jpg',
					phone: '020-123458',
					address: 'sjhfhdhfdhf'
				}, {
					name: '分院3',
					url: 'hospital4.jpg',
					phone: '020-123459',
					address: 'sjhfhdhfdhf'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	/* #ifdef H5 */
	page {
		@extend .page-backgroud;
	}

	/* #endif */
	.tips-positon {
		margin-top: 10rpx;
		@extend .tips-box;
		margin-bottom: 10rpx;
	}

	.swiper-out-box {
		@include width-margin(90%, 1250rpx);
		height: 1030rpx !important;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		border-radius: 8px;
		padding: 15rpx;
		overflow: auto;

		.info-image-box {
			@include width-margin(95%, 200rpx);
			@include row-left-right(60%, 40%);
			margin-top: 20rpx;

			.info-box {
				@include flex-direction(column);

				.info {
					height: auto;
					display: flex;
					align-items: center;
					margin: 10rpx 0;
				}
			}

			.image-box {
				width: 200rpx;
				height: 120rpx;
			}
		}

		.address-box {
			@include width-margin(95%, auto);
			@include row-left-right(25%, 75%);
			align-items: center;
			margin: 10rpx auto;
		}

		.hospital-brief {
			@include width-margin(95%, auto);
			@include flex-direction(column);
			margin-top: 20rpx;

			.brif-title {
				height: 70rpx;
				line-height: 70rpx;
			}

			.brief-content {
				@include width-margin(90%, 550rpx);
				overflow: scroll;
			}
		}

		.black-text {
			@include font-style(18px, 500, #000000);
		}

		.gray-text {
			@include font-style(16px, 500, $gray-color);
		}
	}
</style>
