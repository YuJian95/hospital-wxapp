<template>
	<view>
		<view class="VerticalBox" style="margin-top: 40rpx;">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 175upx)">
				<view class="cu-item" :class="index==tabCur?'visited-color':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index" :data-name="item">
					{{item}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 175upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title visited-color"></text> {{currentDep}}</view>
					</view>
					<view class="cu-list menu-avatar" @click="toPage()">
						<view class="cu-item">
							<text class="text-position">普通门诊</text>
						</view>
						<view class="cu-item">
							<text class="text-position">门诊</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentStatues: 0, // 默认0为从首页进来的，1为从科室或者日期页面进来的
		},
		data() {
			return {
				list: ['儿科', '妇科', '眼科', '皮肤科', '内科', '外科', '产科', '儿科1', '儿科2', '儿科3'],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				currentDep: '',// 当前所点击的科室
			};
		},
		created() {
			this.currentDep = this.list[0];
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
				this.currentDep = e.currentTarget.dataset.name
			},
			// 用于滚动的时候的，但是暂时有问题暂不探究
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
			},
			// 跳转到选择时间及医生页面
			toPage: function() {
				if(this.currentStatues == 1) {
					uni.navigateTo({
						url: '/pagesB/pages/appointPages/timeDoctor/timeDoctor'
					})
				} else {
					uni.navigateTo({
						url: '/pagesB/pages/appointPages/doctorList/doctorList'
					})
				}
				
			}
		},
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
