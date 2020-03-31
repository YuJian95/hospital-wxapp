<template>
	<view class="page-backgroud">
		<view class="row-50-width">
			<!-- 左边的 -->
			<view class="left-right-half-box">
				<view class="left-right-inbox" v-for="(item, index) in hospitalList" 
				:key="item.id" v-if="index % 2 === 0" @click="toDepartmentPage(item.id)">
					<image style="width: 100%;" mode="widthFix" :src="item.picture"></image>
					<view class="row-width">
						<image class="icon" src="/static/appointment/hosp-icon.png"></image>
						<text class="hospital-text">{{item.name}}</text>
					</view>
					<view class="row-width">
						<text class="blue-title">地址：</text>
						<text class="address-phone-text cut-long-text">{{item.address}}</text>
					</view>
					<view class="row-width">
						<text class="blue-title">电话：</text>
						<text class="address-phone-text cut-long-text">{{item.phone}}</text>
					</view>
				</view>
			</view>
			
			<view class="left-right-half-box">
				<view class="left-right-inbox" v-for="(item, index) in hospitalList" 
				:key="item.id" v-if="index % 2 !== 0" @click="toDepartmentPage(item.id)">
					<image style="width: 100%;" mode="widthFix" :src="item.picture"></image>
					<view class="row-width">
						<image class="icon" src="/static/appointment/hosp-icon.png"></image>
						<text class="hospital-text">{{item.name}}</text>
					</view>
					<view class="row-width">
						<text class="blue-title">地址：</text>
						<text class="address-phone-text cut-long-text">{{item.address}}</text>
					</view>
					<view class="row-width">
						<text class="blue-title">电话：</text>
						<text class="address-phone-text cut-long-text">{{item.phone}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllHospital
	} from '@/common/api/hospital.js'
	import {
		error
	} from '@/common/js/errorTips.js'

	export default {
		data() {
			return {
				/**
				 * @param id 医院id
				 * @param address 医院地址
				 * @param description 医院简述
				 * @param name 医院名称
				 * @param phone 医院联系电话
				 * @param picture 医院地址
				 * **/
				hospitalList: []
			}
		},
		methods: {
			// 跳转到获取专科页面
			toDepartmentPage: function(id) {
				uni.navigateTo({
					url: '/pages/home/appointmentHome/' + 
					'selectDepartment/selectDepartment?hospitalID=' + id
				})
			},
			// 获取医院的信息
			getAllHospitalList: function() {
				getAllHospital(1, 50, '').then(res => {
					if (res.data.code === 200) {
						this.hospitalList = res.data.data.list
						uni.setStorageSync('firstHospitalId', this.hospitalList[0].id)
					}
				}).catch(() => {
					error('网络')
				})
			}
		},
		mounted() {
			this.getAllHospitalList()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	// 先将页面分成左右排列
	.row-50-width {
		width: 100%;
		height: 100%;
		@include flex-direction(row);

		// 将页面分成左右两半
		.left-right-half-box {
			width: 50%;
			height: 100%;
			@include flex-direction(column);

			// 每个小块的样式
			.left-right-inbox {
				@include width-margin(91%, 100%);
				background: #FFFFFF;
				@include flex-direction(column);
				border: 1px solid #BBBBBB;
				border-radius: 8px;
				padding: 10rpx;
				margin-top: 20rpx;

				.row-width {
					width: 100%;
					height: 70rpx;
					@include flex-direction(row);
					align-items: center;

					.icon {
						@include icon-size(50rpx, 50rpx);
						margin-right: 10rpx;
					}

					.hospital-text {
						@include font-style(15px, bold, #000000);
					}

					.blue-title {
						width: 30%;
						@include font-style(16px, 400, $major-color);
						margin-right: 2%;
					}

					.address-phone-text {
						width: 68%;
						@include font-style(16px, 400, $gray-color);
					}
				}
			}
		}
	}
</style>
