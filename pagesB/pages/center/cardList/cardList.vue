<template>
	<view>
		<text class="gray-tips">最多可添加5个就诊卡</text>
		<view class="main" v-if="isGetData">
			<view class="main_item" v-for="(item,index) in cardList" :key='item.relationId'>
				<movable-area>
					<movable-view damping="100" :out-of-bounds="true" direction="horizontal" :x="show==item.relationId?x:''"
					 :animation="false" @change="test" @touchend="touchend" :data-name="item.relationId">
						<view class="info-box">
							<view class="row-box" style="margin-top: 20rpx;">
								<text class="name">{{ item.name }}</text>
								<image class="icon" :src="item.gerder == 1? 
								iconPath + 'male.png': iconPath + 'female.png'"></image>
							</view>
							<view class="row-box">
								<text class="gray-text">卡号：</text>
								<text class="gray-text">{{ item.id }}</text>
							</view>
							<view class="row-box">
								<text class="gray-text">身份证号：</text>
								<text class="gray-text">{{ item.identify | getIdentityNum}}</text>
							</view>
						</view>
					</movable-view>
				</movable-area>
				<view class="delete_box" v-if="show == item.relationId">
					<view class="round-outbox">
						<view class="round-box" :class="handle==1?'blue-background':''" @click="handleEdit(item)">
							<image class="icon" src="/static/appointment/edit.png"></image>
						</view>
					</view>
					<view class="round-outbox">
						<view class="round-box" :class="handle==2?'red-background':''" @click="openConfirm(item.name,show)">
							<image class="icon" src="/static/appointment/delete.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 当用户没有为家人添加就诊卡 -->
		<noDataPage :message='message' v-if="!isGetData"></noDataPage>
		<!-- 添加就诊卡的按钮 -->
		<image class="add-button" src="/static/appointment/add.png" @click="toAddCard()"></image>
	</view>
</template>

<script>
	import {
		getIsCardOverIimit,
		getUserCardInfo,
		deleteCardInfo
	} from '@/common/api/userInfo.js'
	import {
		error
	} from '@/common/js/errorTips.js'

	export default {
		data() {
			return {
				// x轴方向的偏移
				x: 0,
				// 当前x的值
				currentX: 0,
				show: false,
				iconPath: '/static/center/',
				cardList: [],
				handle: 0, // 0代表没有操作，1代表点击编辑，2代表点击删除
				isGetData: true, // 当用户没有添加过就诊卡时使用
				message: '家人就诊卡', // 用于没有家人就诊卡信息时显示
				isOverLimit: false, // 判断是否超过限制
			}
		},
		methods: {
			test(e) {
				this.currentX = e.detail.x;
			},
			//自动关闭左滑效果
			stopSlideView: function() {
				this.x = 0;
				this.show = false
				this.handle = 0
			},
			touchend(e) {
				if (this.currentX < -46) {
					this.x = -92;
					this.show = e.currentTarget.dataset.name
				} else {
					this.stopSlideView()
				}
			},
			// 点击了编辑
			handleEdit: function(item) {
				// index是这个的编号
				this.handle = 1
				uni.navigateTo({
					url: '/pagesB/pages/center/addCard/editCard/editCard?cardInfo=' +
						JSON.stringify(item)

				})
				uni.showLoading({
					title: '加载中'
				})
				var that = this
				setTimeout(function() {
					that.stopSlideView()
				}, 2000)
			},
			// 点击了删除,其实为解除该就诊卡的绑定
			handleDelete: function(relationId) {
				this.handle = 2 // 表示点击的是删除
				var that = this
				uni.showLoading({
					title: '加载中'
				})
				deleteCardInfo(relationId).then(res => {
					if (res.data.code === 200) {
						that.stopSlideView()
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('删除失败')
				})
			},
			// 跳转到添加就诊卡页面
			toAddCard: function() {
				uni.navigateTo({
					url: '/pagesB/pages/center/addCard/addCard'
				})
			},
			// 获取用户为家人添加的就诊卡数目是否超过限制
			getIsCardOverIimit: function() {
				getIsCardOverIimit(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						// 等于false就为还没有超过限制
						if (res.data.data === false) {
							this.isOverLimit = false
						} else {
							this.isOverLimit = true
						}
					}
				}).catch(() => {
					error('网络')
				})
			},
			// 获取用户家人的就诊卡信息
			getUserCardInfo: function() {
				uni.showLoading({
					title: '加载中'
				})
				this.cardList = []
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						const data = res.data.data
						let _this = this
						if (data.length > 0) {
							data.forEach(function(item, index) {
								// 表示只为自己添加了就诊卡没有为家人添加
								if (data.length === 1 && item.type === 0) {
									_this.isGetData = false
									return
								}
								if (item.type !== 0) {
									_this.isGetData = true
									_this.cardList.push(({
										relationId: item.relationId,
										type: item.type, // 表示与该账号的关系的类型
										id: item.id, // 就诊卡id
										name: item.name, //就诊卡的姓名
										gender: item.gender, // 就诊卡的性别
										phone: item.phone, // 电话号码
										identify: item.identificationNumber, // 身份证号
										birthDate: item.birthDate // 生日
									}))
								}
							})
						}
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
			},
			// 点击删除按钮出现的弹框
			openConfirm: function(name, relationId) {
				let that = this
				uni.showModal({
					title: '删除',
					content: '确认解绑' + name + '的就诊卡吗？',
					confirmText: "确认",
					cancelText: "取消",
					success: function(res) {
						console.log(res);
						if (res.confirm) {
							that.deleteCardInfo(relationId)
						} else {
							that.stopSlideView()
						}
					}
				});
			},
		},
		onShow() {
			this.getUserCardInfo()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	page {
		@extend .page-backgroud;
	}

	.main {
		@include flex-direction(column);
		align-items: center;

		.main_item {
			margin-top: 30rpx;
			@include flex-direction(row);

			movable-area {
				width: 740rpx;
				height: 201rpx;
				background: #fff;

				// border-radius: 6px;
				movable-view {
					width: 1016rpx;
					height: 201rpx;
				}
			}

			.delete_box {
				width: 300rpx;
				height: 201rpx;
				background: #F2F2F2;
				@include flex-direction(row);
				position: absolute;
				right: 0px;

				.round-outbox {
					width: 50%;
					height: 100%;
					display: flex;
					align-items: center;

					.round-box {
						@include width-margin(100rpx, 100rpx);
						border-radius: 50%;
						background: #FFFFFF;
						display: flex;
						align-items: center;

						.icon {
							margin: 0 auto;
							@include icon-size(60rpx, 60rpx);
						}
					}

					.blue-background {
						background: $major-color !important;
					}

					.red-background {
						background: red !important;
					}
				}
			}
		}

		.main_item:nth-of-type(1) {
			margin-top: 70rpx;
		}
	}


	// 就诊卡的信息排列
	.info-box {
		@include width-margin(90%, 95%);

		.row-box {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			@include flex-direction(row);
			align-items: center;

			.name {
				@include font-style(18px, bold, #000000);
				margin-right: 30rpx;
			}

			.icon {
				@include icon-size(70rpx, 70rpx);
			}

			.gray-text {
				@include font-style(16px, 500, $gray-color);
				margin-right: 30rpx;
			}
		}
	}

	// 底部提示文字
	.gray-tips {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		@include font-style(16px, 500, $gray-color);
		position: absolute;
		top: 0px;
	}

	// 添加就诊卡的按钮
	.add-button {
		@include icon-size(85rpx, 85rpx);
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
	}
</style>
