<!-- 该页面是从专科的页面跳转过来的医生列表页面 -->
<template>
	<view>
		<view class="doctor-outbox" v-for="(item, index) in doctorList"
		:key="item.id" @click="toDoctorBrief(item)">
			<image class="doctor-icon" :src="item.gender === 1 ? iconURL + 'man-doctor.png'
			: iconURL + 'women-doctor.png'"></image>
			<view class="doctor-info">
				<text class="doctor-name text-position">{{item.name}}</text>
				<text class="gray-text text-position">{{item.jobTitle}}</text>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
	import {getDcotorByDepartment} from '@/common/api/doctor.js'
	import {error} from '@/common/js/errorTips.js'
	
	var _self = 1,
		timer = null;
	export default {
		// 到达底部时会自动获取新数据
		onReachBottom: function() {
			let _self = this
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				if(_self.loadingText!='已加载全部'){
					_self.getDcotorByDepartment()
				}
			}, 1000);
		},
		data() {
			return {
				doctorList: [],
				loadingText: '加载中...',
				page: 1,
				specialId: 0,
				outpatientId: 0,
				iconURL: '/static/appointment/',
			}
		},
		methods: {
			// 跳转到医生简介页面
			toDoctorBrief:function(doctorInfo) {
				let obj = {
					doctorInfo: doctorInfo
				}
				uni.setStorageSync('doctorInfo', JSON.stringify(obj))
				uni.navigateTo({
					url: '/pagesB/pages/appointPages/doctorAppointDetail/doctorAppointDetail?isTreatmentTime=' + 2
				})
			},
			// 根据专科门诊获取医生列表
			getDcotorByDepartment: function() {
				this.doctorList = []
				getDcotorByDepartment(this.page, 10, this.specialId, this.outpatientId)
				.then(res => {
					if(res.data.code === 200) {
						const data = res.data.data.list
						if(this.page === 1) {
							this.doctorList = data
							this.page++
							this.loadingText = '加载更多'
						} else {
							this.doctorList = this.doctorList.concat(data)
							this.page++
						}
						// 当数据已经完全获取
						if(data.length < 10 || data.length === 0) {
							this.loadingText = '已加载全部'
						} else {
							this.loadingText = '加载更多'
							// this.page++
						}
					}
				}).catch(() => {
					error('获取医生列表失败')
				})
			}
		},
		onLoad(e) {
			console.log(e)
			this.specialId = e.specialId
			this.outpatientId = e.outpatientId
			this.getDcotorByDepartment()
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	@import '@/common/scss/doctor.scss';
	.text-position{
		width: 60%;
		height: 50%;
		display: flex;
		align-items: center;
	}
	.gray-text{
		@include font-style(16px, 500, $gray-color);
	}
	.doctor-name{
		@include font-style(16px, bold, #000000);
	}
	.loading {
		text-align: center;
		line-height: 80px;
	}
</style>
