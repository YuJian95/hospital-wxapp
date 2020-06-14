<!-- 该页面是用户查看自己的当前的就诊队列 -->
<template>
	<view>
		<!-- 假如有数据的时候显示数据的样子 -->
		<view class="out-box" v-show="isGetData" v-for="item in awaitQueueList" :key="item.appointmentId">
			<view class="row-in-box">
				<view class="left-icon-text left">
					<image class="icon" src="/static/center/paidui.png"></image>
					<text class="gray-text">前面还有</text>
				</view>
				<text class="gray-text right">
					<text class="orange-text">{{item.waitPeopleNum}}</text>
					人候诊
				</text>
			</view>
			<view class="row-in-box">
				<text class="left gray-text">您的就诊号为：</text>
				<text class="gray-text right">
					<text class="orange-text">{{item.queueNum}}</text>
					号
				</text>
			</view>
			<view class="row-in-box">
				<text class="left gray-text">距离您就诊大约还有：</text>
				<text class="gray-text right">
					<text class="orange-text">{{item.waitTime}}</text>
					分钟
				</text>
			</view>
			<view class="row-in-box">
				<text class="gray-text">
					医院： 
					<text class="orange-text">{{item.hospitalName}}</text>
				</text>
			</view>
			<view class="row-in-box">
				<text class="gray-text">
					诊室： 
					<text class="orange-text">{{item.clinicName}}</text>
				</text>
			</view>
		</view>
		<!-- 当没有数据或者当前还没到预约的就诊时间时显示没有候诊详情 -->
		<noDataPage :message='message' v-if="!isGetData"></noDataPage>
		
		<!-- 底部点击跳出弹出框的按钮 -->
		<!-- <image class="icon-up-position" src="/static/appointment/icon-up.png" @click="showModal()"></image> -->
		<!-- 从底部弹出选择 -->
		<!-- <view class="cu-modal bottom-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="changeCardId()">确定</view>
					<view class="action text-blue" @tap="hideModal()">取消</view>
				</view>
				<view class="bottom-hospital-box">
					<view class="hospital-box" v-for="(item,index) in cardList" :key="item.id">
						<view class="hospital" :class="modalVisited == item.id?
						 'visited-background':'invisited-background'" @click="selectCardId(item.id)">
							<text class="text">
								{{ item.name }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import {getAwaitQueue} from '@/common/api/appoint.js';
	import {getUserCardInfo} from '@/common/api/userInfo.js'
	import {formDate} from '@/common/js/formDate.js'
	export default {
		data() {
			return {
				isGetData: false,
				cardList: [],
				message: '候诊', // 此处为传递给没有数据页面的显示文字
				isShowModal: false,
				modalVisited: 0,
				insureVisited: 0,
				awaitQueueList: []
			}
		},
		methods: {
			// 打开模态框
			showModal: function() {
				this.isShowModal = true
			},
			// 关闭模态框
			hideModal: function() {
				this.isShowModal = false
				this.modalVisited = this.insureVisited
			},
			// 点击弹出框的确定改变进入挂号的状态
			changeCardId:function(e){
				this.insureVisited = this.modalVisited
				this.isShowModal = false
				this.getAwaitQueue()
			},
			// 点击弹出框选择某个状态
			selectCardId:function(index) {
				this.modalVisited = index
			},
			// 获取就诊卡列表
			getUserCardInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				this.cardList = []
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						this.cardList = res.data.data
						this.modalVisited = this.cardList[0].id
						this.insureVisited = this.cardList[0].id
						this.getAwaitQueue();
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取就诊卡列表失败')
				})
			},
			// 获取排队队列
			getAwaitQueue: function() {
				this.awaitQueueList = [];
				uni.showLoading({
					title: '加载中'
				})
				getAwaitQueue(uni.getStorageSync('cardID'), uni.getStorageSync('accountID'), 
				formDate(new Date(), 'YYYY-MM-DD')).then(res => {
					if(res.data.code === 200) {
						if(res.data.data.list.length > 0) {
							this.isGetData = true;
							this.awaitQueueList = res.data.data.list;
						} else {
							this.isGetData = false;
						}
					}
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					error('获取排队列表失败')
				})
			}
		},
		onLoad() {
			this.getAwaitQueue()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	.out-box {
		@include width-margin(90%, 100%);
		margin-top: 50rpx;
		margin-bottom: 40rpx;
		background-color: #FFFFFF;
		border-radius: 5px;

		.row-in-box {
			width: 95%;
			height: 130rpx;
			margin: 0 auto;
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
	// 用来唤起底部的选择的按钮
	.icon-up-position{
		@include icon-size(70rpx,70rpx);
		position: fixed;
		// 此处因为H5距离底部是0的话是包括了导航栏,而小程序是除去了导航栏的情况下为0
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		/* #ifdef MP */
		bottom: 0px;
		/* #endif */
		right: 0rpx;
	}
	// 从底部弹出不同就诊卡的选择
	.bottom-hospital-box {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
	
		.hospital-box {
			width: 33%;
			height: 80rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			.hospital {
				@include width-margin(85%, 85%);
				border-radius: 10px;
				text-align: center;
				display: table;
				.text{
					width: 100%;
					height: 100%;
					@include font-style(16px, 500, #FFFFFF);
					display: table-cell;
					vertical-align: middle;
				}
			}
			.visited-background{
				background: $major-color;
			}
			.invisited-background{
				background: #D1D1D1;
			}
		}
	}
</style>
