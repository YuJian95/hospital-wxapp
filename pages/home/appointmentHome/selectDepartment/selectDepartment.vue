<template>
	<view>
		<department :allData="propsData" ref="department"></department>
	</view>
</template>

<script>
	import department from '../appointment/department.vue'
	import {getDepartmentHospital} from '@/common/api/department.js'
	
	export default {
		components: {
			department
		},
		data() {
			return {
				propsData: {
					departmentList: [],
					hospitalID: 0
				},
			}
		},
		methods: {
			// 获取某个医院ID所属的专科
			getDepartmentHospital: function(hospitalID) {
				uni.showLoading({
					title: '加载中'
				})
				this.departmentList = [];
				getDepartmentHospital(hospitalID, 1, 50).then(res => {
					if(res.data.code === 200) {
						const data = res.data.data.list
						this.propsData.departmentList = data;
						this.$refs.department.changeInit(data[0].id, data[0].name)
						uni.hideLoading();
					}
				}).catch(() => {
					uni.hideLoading();
					error('网络')
				})
			},
		},
		onLoad(e) {
			this.propsData.hospitalID = e.hospitalID
			this.getDepartmentHospital(e.hospitalID)
		}
	}
</script>

<style>

</style>
