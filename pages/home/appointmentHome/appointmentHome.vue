<!-- 该页面是通过底部弹出框切换挂号进去的入口
 1、关于insureVisited = 0时是按科室进去
 2、关于insureVisited = 1时是搜医生进去
 3、关于insureVisited = 2时是按日期进去
 4、关于insureVisited = 3时是按专科进去
 -->
<template>
	<view>
		<from-hosipital v-if="insureVisited == 0"></from-hosipital>
		<from-doctor v-if="insureVisited == 1"></from-doctor>
		<from-date v-if="insureVisited == 2"></from-date>
		<from-department v-if="insureVisited == 3"></from-department>
		<!-- <department v-if="insureVisited == 3" :allData="allData"></department> -->
		
		<!-- 底部点击跳出弹出框的按钮 -->
		<image class="icon-up-position" src="/static/appointment/icon-up.png" @click="showModal()"></image>
		<!-- 从底部弹出选择 -->
		<view class="cu-modal bottom-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="changeFrom">确定</view>
					<view class="action text-blue" @tap="hideModal()">取消</view>
				</view>
				<view class="change-appoint-form">
					<view class="appoint-inbox" v-for="(item, index) in modalData" :key="index" @click="selectFrom(index)">
						<view v-if="modalVisited == index" :data-name="index">
							<view class="round-icon-box visited-round">
								<image class="icon" :src="imgUrl + item.visited"></image>
							</view>
							<text class="visited-text">{{ item.text }}</text>
						</view>
						<view v-else :data-name="index">
							<view class="round-icon-box invisited-round">
								<image class="icon" :src="imgUrl + item.invisited"></image>
							</view>
							<text class="invisited-text">{{ item.text }}</text>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
		<!-- 弹出框结束 -->
	</view>
</template>

<script>
	import fromDoctor from './appointment/fromDoctor.vue';
	import fromHosipital from './appointment/fromHospital.vue';
	import fromDate from './appointment/fromDate.vue';
	import department from './appointment/department.vue'
	import fromDepartment from './appointment/fromDep.vue'
	export default {
		components: {
			fromDoctor,
			fromHosipital,
			fromDate,
			department,
			fromDepartment
		},
		data() {
			return {
				isShowModal: false,
				imgUrl: '/static/appointment/',
				modalVisited: 0,// 弹出框用户点击的
				insureVisited: 0, // 用户点击确认的
				// 弹出框让用户选择不同的挂号方式
				modalData: [{
					text: '按科室',
					invisited: 'hospital-blue.png',
					visited: 'hospital-white.png',
					isVisited: true
				}, {
					text: '搜医生',
					invisited: 'doctor-blue.png',
					visited: 'doctor-white.png',
					isVisited: false
				}, {
					text: '按日期',
					invisited: 'date-blue.png',
					visited: 'date-white.png',
					isVisited: false
				}, {
					text: '按专科',
					invisited: 'department-blue.png',
					visited: 'department-white.png',
					isVisited: false
				}],
				// 作为专科的入口数据
				allData: {
					departmentList: [], // 用作传过来的专科信息
					currentStatues: 0 // 默认0为从首页进来的，1为从科室或者日期页面进来的
				}
			}
		},
		methods: {
			// 打开模态框
			showModal:function(){
				this.isShowModal = true
			},
			// 关闭模态框
			hideModal:function(){
				this.isShowModal = false
				this.modalVisited = this.insureVisited
			},
			// 点击弹出框的确定改变进入挂号的状态
			changeFrom:function(e){
				this.insureVisited = this.modalVisited
				this.isShowModal = false
			},
			// 点击弹出框选择某个状态
			selectFrom:function(index) {
				this.modalVisited = index
			}
		}
	}
</script>

<style lang="scss">
@import '@/common/scss/common.scss';
	page {
		background: #F2F2F2;
		position: relative;
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
	// 底部弹出框的圆圈的主要样式
	.round-style{
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		margin: 0 auto;
	}
	// 底部弹出来的选择框
	.change-appoint-form{
		width: 100%;
		height: 200rpx;
		@include flex-direction(row);
		align-items: center;
		justify-content: center;
		.appoint-inbox{
			width: 25%;
			height: 90%;
			@include flex-direction(column);
			text-align: center;
			.round-icon-box{
				@extend .round-style;
				.icon{
					@include icon-size(95rpx,95rpx);
					margin: 0 auto;
				}
			}
			.visited-round{
				background: $major-color;
			}
			.invisited-round{
				background: #FFFFFF;
			}
			.invisited-text{
				@include font-style(16px,500,#000000);
			}
			.visited-text{
				@include font-style(16px,500,$major-color);
			}
		}
	}
</style>
