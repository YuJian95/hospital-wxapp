<!-- 该页面是从首页直接点击从专科进来的 -->
<template>
	<view>
		<view class="VerticalBox" style="margin-top: 40rpx;">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 175upx)">
				<view class="cu-item" :class="item.id==tabCur?'visited-color':''" v-for="(item,index) in departmentList" :key="item.id" @tap="TabSelect"
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
	import {getAllDepartmentList} from '@/common/api/department.js'
	import {error} from '@/common/js/errorTips.js'
	import {getOutpatientListById} from '@/common/api/outpatient.js'
	
	export default {
		data() {
			return {
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				currentDep: '',// 当前所点击的科室
				departmentList: [],
				outpatientList: []
			};
		},
		methods: {
			// 点击了专科进行切换
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
				this.currentDep = e.currentTarget.dataset.name
				this.getOutpatientListById()
			},
			// 用于滚动的时候的，但是暂时有问题暂不探究
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
			},
			// 跳转到选择医生页面
			toPage: function(outpatientId) {
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorList/doctorList?specialId='
					+ this.tabCur + '&outpatientId=' + outpatientId
				})
			},
			// 获取全部的专科
			getAllDepartmentList: function() {
				this.departmentList = []
				uni.showLoading({
					title: '加载中'
				})
				getAllDepartmentList(1,50, '').then(res => {
					if(res.data.code === 200) {
						this.departmentList = res.data.data.list
						this.tabCur = this.departmentList[0].id
						this.currentDep = this.departmentList[0].name
						this.getOutpatientListById()
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取专科列表失败')
				})
			},
			// 获取某个专科下的全部门诊
			getOutpatientListById: function() {
				this.outpatientList = []
				getOutpatientListById(1, 50, this.tabCur).then(res => {
					if(res.data.code === 200) {
						this.outpatientList = res.data.data.list
						uni.hideLoading()
					}
				}).catch(() => {
					uni.hideLoading()
					error('获取门诊列表失败')
				})
			}
		},
		created() {
			this.getAllDepartmentList()
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
