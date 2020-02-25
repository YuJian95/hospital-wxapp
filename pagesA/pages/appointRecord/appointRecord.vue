<template>
	<view class="page-backgroud">
		<view class="appoint-record-box" v-for="(item, index) in appointRecordList"
		 :key="item.id">
			<view class="top-title">
				<text class="left">{{ item.date }}</text>
				<text class="right">{{ item.department }}/{{ item.outpatient}}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医生：</text>
				<text class="right">{{ item.doctor }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">时间：</text>
				<text class="right">{{ item.time }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">医院：</text>
				<text class="right">{{ item.hospital }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">诊室：</text>
				<text class="right">{{ item.outCalRoom }}</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">患者：</text>
				<text class="right">{{ item.patient }}(排队号：
				<text style="color: #7EC0EE;">{{ item.queueNum }}</text>)
				</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">费用：</text>
				<text class="right">{{ item.cost }}元</text>
			</view>
			<view class="appoint-info">
				<text class="left balck-text">状态：</text>
				<!-- 状态是4证明正常就诊，所以是灰色 -->
				<text class="right" v-if="item.status === 4">
				{{ item.status | statusText }}</text>
				<text class="right green-text" v-if="item.status === 1">
				{{ item.status | statusText }}</text>
				<!-- 当状态为2或者3时证明是失信的 -->
				<text class="right red-text" 
				v-if="item.status === 2 || item.status === 3">
				{{ item.status | statusText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters: {
			statusText: function(value) {
				switch(value) {
					case 1:
					return '未就诊';
					case 2:
					return '取消预约挂号';
					case 3: 
					return '未及时就诊';
					case 4: 
					return '正常就诊'
				}
			}
		},
		data() {
			return {
				appointRecordList: [{
					id: 1,
					queueNum: 18,
					date: '2019-10-02',
					time: '08:30~09:00',
					hospital: '大学城医院',
					department: '内科',
					outpatient: '甲状腺',
					doctor: '杨XX',
					outCalRoom: '内科二楼7诊室',
					patient: 'XXX',
					cost: 10,
					status: 1
				}, {
					id: 2,
					queueNum: 10,
					date: '2019-10-01',
					time: '08:30~09:00',
					hospital: '大学城医院',
					department: '内科',
					outpatient: '甲状腺',
					doctor: '杨XX',
					outCalRoom: '内科二楼7诊室',
					patient: 'XXX',
					cost: 10,
					status: 2
				}, {
					id: 3,
					queueNum: 18,
					date: '2019-8-02',
					time: '08:30~09:00',
					hospital: '大学城医院',
					department: '内科',
					outpatient: '甲状腺',
					doctor: '杨XX',
					outCalRoom: '内科二楼7诊室',
					patient: 'XXX',
					cost: 10,
					status: 4
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	// 一个个的数据块
	.appoint-record-box{
		@include width-margin(90%, auto);
		border-radius: 6px;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		.top-title{
			@include width-margin(90%, 80rpx);
			line-height: 80rpx;
			@include row-left-right(50%, 50%);
			@include font-style(16px, 500, $major-color);
			border-bottom: 1px solid $uni-border-color;
		}
		.appoint-info{
			@include width-margin(90%, 70rpx);
			line-height: 70rpx;
			@include row-left-right(20%, 80%);
			@include font-style(16px, 500, $gray-color);
			// 当用户还没到就就诊的时间看到的
			.green-text{
				@include font-style(16px , 500 , #6EC823);
			}
			// 有失信时的状态颜色
			.red-text{
				@include font-style(16px , 500 , #CE1229);
			}
			// 排队号的颜色
			.balck-text{
				@include font-style(16px, 500, #000000);
			}
		}
	}
	.appoint-record-box:last-child{
		margin-bottom: 30rpx;
	}
</style>
