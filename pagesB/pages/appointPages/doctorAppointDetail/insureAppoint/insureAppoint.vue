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
				<text class="right right-text">{{clinicName}}</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">医院</text>
				<text class="right right-text">{{hospital}}</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">医生</text>
				<text class="right right-text">{{visitInfo.doctorName}}</text>
			</view>
			<view class="top-row-box">
				<text class="left left-text">就诊时间</text>
				<text class="right right-text">{{visitInfo.date | getDate}} {{visitInfo.timePeriod | getTimePeriod}}</text>
			</view>
		</view>
		
		<view class="blue-column-border-box" style="margin-top: 30rpx;">
			<view class="blue-border"></view>
			<view class="blue-text">选择就诊卡人</view>
		</view>
		<view class="gray-box">
			<view class="bottom-row-box" @tap="showModal()" v-if="cardID">
				<view class="left left-icon-text-box">
					<image class="icon" :src="iconURL + 'radio-actived.png'"></image>
					<text class="left-text">{{cardName}}</text>
				</view>
				<text class="right right-text">(就诊卡号：{{cardID}})</text>
			</view>
			<view class="bottom-row-box" @tap="getIsCardOverIimit()">
				<view class="left left-icon-text-box">
					<image class="icon" src="/static/add-crads.png"></image>
					<text class="left-text">添加就诊卡人</text>
				</view>
			</view>
		</view>
		<button class="button" @click="insureAppoint()">确认</button>
		
		<!-- 切换就诊卡人的模态框 -->
		<view class="cu-modal" :class="showCardId?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">切换就诊卡人</view>
					<view class="action" @tap="closeShowModal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="weui-cells weui-cells_after-title">
						<view class="gray-box">
							<view class="bottom-row-box" v-for="(item, index) in cardList"
							:key="item.id" @click="selectCardID(item.id, item.name)">
								<view class="left left-icon-text-box">
									<image class="icon" :src="selectId === item.id ? iconURL + 
									'radio-actived.png' : iconURL + 'radio-inactived.png'"></image>
									<text class="left-text">{{item.name}}</text>
								</view>
								<text class="right right-text">(卡号：{{item.id}})</text>
							</view>
						</view>
						
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeShowModal()">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="insureCardId()">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getIsCardOverIimit,
		getUserCardInfo,
	} from '@/common/api/userInfo.js'
	import {
		error
	} from '@/common/js/errorTips.js'
	import {getClinicById} from '@/common/api/outCall.js'
	import {addAppoint, valifyBlacklist} from '@/common/api/appoint.js'
	export default {
		data() {
			return {
				showCardId: false,
				selectId: 0,
				isOverLimit: false,
				cardList: [],
				iconURL: '/static/center/card/',
				cardID: uni.getStorageSync('cardID') || '',
				cardName: '',
				selectName: '',
				selectId: uni.getStorageSync('cardID') || '',
				visitInfo: {}, // 就诊信息
				clinicName: '',
				hospital: ''
			}
		},
		methods: {
			// 显示模态框
			showModal: function() {
				this.showCardId = true
			},
			// 关闭模态框
			closeShowModal: function() {
				this.showCardId = false;
				this.selectId = this.cardID;
				this.selectName = this.cardName
			},
			// 获取用户为家人添加的就诊卡数目是否超过限制
			getIsCardOverIimit: function() {
				uni.showLoading({
					title: '加载中'
				})
				getIsCardOverIimit(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						uni.hideLoading()
						// 等于false就为还没有超过限制
						if (res.data.data === false) {
							// 跳转到添加就诊卡页面
							uni.navigateTo({
								url: '/pagesB/pages/center/addCard/addCard'
							})
						} else {
							uni.showModal({
								content: '已超过绑定就诊卡限制',
								showCancel: false,
								success: function (res) {
								        if (res.cancel) {
								            console.log('用户点击取消');
								        }
								    }
							})
						}
					}
				}).catch(() => {
					uni.hideLoading()
					error('网络')
				})
			},
			// 获取家人就诊卡信息
			getUserCardInfo: function() {
				this.cardList = []
				getUserCardInfo(uni.getStorageSync('accountID')).then(res => {
					if (res.data.code === 200) {
						const data = res.data.data
						const that = this
						if (data.length > 0) {
							this.cardList = data
							this.cardList.forEach(function(item, index) {
								if(item.id === that.cardID) {
									that.selectName = item.name;
									that.cardName = item.name
								}
							})
						}
					}
				}).catch(() => {
					error('网络')
				})
			},
			// 选择就诊卡id号
			selectCardID: function(id, name) {
				this.selectId = id;
				this.selectName = name
			},
			// 最终确定选择的就诊卡
			insureCardId: function() {
				this.cardID = this.selectId
				this.cardName = this.selectName 
				this.showCardId = false
			},
			// 获取诊室信息
			getClinic: function() {
				uni.showLoading({
					title: '加载中'
				})
				getClinicById(this.visitInfo.clinicId).then(res => {
					if(res.data.code === 200) {
						uni.hideLoading()
						this.clinicName = res.data.data.address
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取诊室信息失败')
				})
			},
			
			// 点击确定
			insureAppoint: function() {
				let that = this;
				uni.showModal({
					title: '挂号',
					content: '确认支付10块挂号吗',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
								title: '挂号中'
							})
							valifyBlacklist(that.cardID).then(res => {
								if(!res.data.data) {
									// 查看是否在黑名单
									addAppoint({
										accountId: uni.getStorageSync('accountID'),
										cardId: that.cardID,
										planId: that.visitInfo.planId,
										timePeriod: that.visitInfo.timePeriod
									}).then(res => {
										uni.hideLoading()
										uni.showToast({
											title: '挂号成功',
											icon: 'success'
										})
										setTimeout(function(){
											uni.switchTab({
												url: '/pages/center/center'
											})
										},2000)
									}).catch(() =>{
										uni.hideLoading()
										uni.showToast({
											title: '挂号失败',
											icon: 'none'
										})
									})
								} else {
									uni.hideLoading()
									uni.showToast({
										title: '该卡号进入爽约黑名单，暂时不能挂号',
										icon: 'none'
									})
								}
							})
							
						}
					}
				})
			}
		},
		onShow() {
			this.visitInfo = JSON.parse(uni.getStorageSync("visitInfo"))
			console.log(JSON.parse(uni.getStorageSync('hospital')))
			this.hospital = JSON.parse(uni.getStorageSync('hospital')).name
			this.getUserCardInfo()
			this.getClinic()
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
				width: 60%;
				@include font-style(16px, 500, $gray-color);
			}
			.left-icon-text-box{
				// width: 40%;
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
