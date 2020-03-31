<!-- 该页面为从科室或者日期页面进来的专科门诊 -->
<template>
	<view>
		<view class="VerticalBox" style="margin-top: 40rpx;">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 175upx)">
				<view class="cu-item" :class="item.id==tabCur?'visited-color':''" v-for="(item,index) in allData.departmentList" :key="item.id" @tap="TabSelect"
				 :data-id="item.id" :data-name="item.name">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 175upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title visited-color"></text> {{currentDep}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item, index) in outpatientList"
						:key="item.id" @click="toPage(item.id)">
							<text class="text-position">{{item.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {error} from '@/common/js/errorTips.js'
	import {getOutpatientByHospital} from '@/common/api/outpatient.js'
	
	export default {
		props:{
			allData: {
				departmentList: [], // 用作传过来的专科信息
				hospitalID: 0
			}
		},
		data() {
			return {
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				currentDep: '',// 当前所点击的科室
				outpatientList: [] // 用作装门诊列表的数据
			};
		},
		methods: {
			// 通过父组件调用方法进行修改默认tabCur、currentDep值，因为在专科信息获取之前
			/// data的初始化已经结束
			changeInit: function(id, name) {
				this.tabCur = id;
				this.currentDep = name;
				this.getOutpatientByHospital(this.allData.hospitalID)
			},
			// 点击了专科进行切换
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
				this.currentDep = e.currentTarget.dataset.name
				this.getOutpatientByHospital(this.allData.hospitalID)
			},
			// 用于滚动的时候的，但是暂时有问题暂不探究
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
			},
			// 跳转到选择时间及医生页面
			toPage: function(outpatientId) {
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/timeDoctor/timeDoctor?hospitalId=' + 
					 this.allData.hospitalID + '&departmentId=' + this.tabCur 
					 + '&outpatientId=' + outpatientId
				})
			},
			// 获取医院专科的门诊列表
			getOutpatientByHospital: function(hospitalID) {
				this.outpatientList = []
				getOutpatientByHospital(hospitalID, this.tabCur, 1, 50).then(res => {
					if(res.data.code === 200) {
						this.outpatientList = res.data.data.list
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取门诊列表失败')
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';

	.text-position {
		width: 60%;
		height: 100%;
		margin: 0 auto;
		text-align: left;
		display: flex;
		align-items: center;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
