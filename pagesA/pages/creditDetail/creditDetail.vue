<template>
	<view class="weui-tab body">
		<view class="weui-navbar">
			<block v-for="(item, index) in tabs" :key='index'>
				<view :id="index" class="weui-navbar__item" @tap="tabClick" :class="activeIndex == index ? 'weui-bar__item_on nav-bottom-border' : ''">
					<view class="weui-navbar__title">{{ item }}</view>
				</view>
			</block>
		</view>
		<view class="weui-tab__panel">
			<view class="weui-tab__content" :hidden="activeIndex != 0">
				<credit-page ref="creditPage"
				 v-show="activeIndex == 0"></credit-page>
			</view>
			<view class="weui-tab__content" :hidden="activeIndex != 1">
				<history-credit v-show="!isCreditGood" ref="historyCredit"></history-credit>
			</view>
		</view>
		<!-- 底部点击跳出弹出框的按钮 -->
		<image class="icon-up-position" src="/static/appointment/icon-up.png" 
		@click="showModal()" :hidden="activeIndex != 1"></image>
		<!-- 从底部弹出选择 -->
		<view class="cu-modal bottom-modal" :class="isShowModal?'show':''">
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
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import creditPage from './component/creditPage.vue'
	import historyCredit from './component/historyCredit.vue'
	import {
		getUserCardInfo
	} from '@/common/api/userInfo.js'
	
	export default {
		components: {
			creditPage,
			historyCredit
		},
		data() {
			return {
				tabs: ["当月记录", "以往记录"],
				activeIndex: 0,
				cardList: [],
				// 弹窗
				isShowModal: false,
				modalVisited: 0,
				insureVisited: 0,
				showName: ""
			}
		},
		methods: {
			tabClick: function(e) {
				// 只有当页面是当月的任何状态和以往的没有失信记录的情况下才修改这个值
				if (e.currentTarget.id == 1) {
					this.getUserCardInfo()
				} else if(e.currentTarget.id == 0) {
					this.$refs.creditPage.getMonthCredit(this.insureVisited)
				}
				this.activeIndex = e.currentTarget.id
			},
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
				if(this.activeIndex === 0) {
					// this.$refs.creditPage.getMonthCredit(this.insureVisited)
				} else {
					this.$refs.historyCredit.getLostCreditRecord(this.insureVisited, 0)
				}
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
						this.$refs.historyCredit.getLostCreditRecord(this.insureVisited, 0)
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取就诊卡列表失败')
				})
			},
			
			
		},
		onLoad() {
			this.$refs.creditPage.getMonthCredit()
			// this.getUserCardInfo();
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	
	page{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	// 关于顶部导航栏的
	.weui-tab__content {
		// padding-top: 60px;
		text-align: center;
	}

	.body {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.nav-bottom-border {
		border-bottom: 2px solid $major-color;
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
