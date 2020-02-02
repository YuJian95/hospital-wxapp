<template>
	<view>
		<text class="gray-tips">最多可添加5个就诊卡</text>
		<view class="main">
			<view class="main_item" v-for="(item,index) in cardList" :key='item.id'>
				<movable-area>
					<movable-view damping="100" :out-of-bounds="true" direction="horizontal" 
					:x="show==item.id?x:''" :animation="false" @change="test" 
					@touchend="touchend" :data-name="item.id">
						<view class="info-box">
							<view class="row-box" style="margin-top: 20rpx;">
								<text class="name">{{ item.name }}</text>
								<image class="icon" :src="item.gerder == 1? 
								iconPath + 'male.png': iconPath + 'female.png'"></image>
							</view>
							<view class="row-box">
								<text class="gray-text">卡号：</text>
								<text class="gray-text">{{ item.card }}</text>
							</view>
							<view class="row-box">
								<text class="gray-text">身份证号：</text>
								<text class="gray-text">{{ item.identify }}</text>
							</view>
						</view>
					</movable-view>
				</movable-area>
				<view class="delete_box" v-if="show == item.id">
					<view class="round-outbox">
						<view class="round-box" :class="handle==1?'blue-background':''" 
						@click="handleEdit(show)">
							<image class="icon" src="/static/appointment/edit.png"></image>
						</view>
					</view>
					<view class="round-outbox">
						<view class="round-box":class="handle==2?'red-background':''" 
						@click="handleDelete(show)">
							<image class="icon" src="/static/appointment/delete.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<image class="add-button" src="/static/appointment/add.png"
		@click="toAddCard()"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// x轴方向的偏移
				x: 0,
				// 当前x的值
				currentX: 0,
				show: false,
				iconPath: '/static/center/',
				cardList: [{
					id: 1,
					name: '杨XX',
					gerder: 2,
					card: '1000001',
					identify: '440921199705076827'
				},{
					id: 2,
					name: '潘XX',
					gerder: 1,
					card: '1000001',
					identify: '440921199705076827'
				},{
					id: 3,
					name: '余XX',
					gerder: 2,
					card: '1000001',
					identify: '440921199705076827'
				},{
					id: 4,
					name: '杨XX',
					gerder: 2,
					card: '1000001',
					identify: '440921199705076827'
				},{
					id: 5,
					name: '杨XX',
					gerder: 2,
					card: '1000001',
					identify: '440921199705076827'
				}],
				handle: 0, // 0代表没有操作，1代表点击编辑，2代表点击删除
			}
		},
		methods: {
			test(e) {
				this.currentX = e.detail.x;
			},
			//自动关闭左滑效果
			stopSlideView: function(){
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
			handleEdit: function(index) {
				// index是这个的编号
				this.handle = 1
				uni.navigateTo({
					url: '/pagesB/pages/center/addCard/editCard/editCard'
				})
				var that = this
				setTimeout(function(){
					that.stopSlideView()
				},2000)
			},
			// 点击了删除
			handleDelete:function(index){
				this.handle = 2
				var that = this
				setTimeout(function(){
					that.stopSlideView()
				},2000)
			},
			// 跳转到添加就诊卡页面
			toAddCard: function(){
				uni.navigateTo({
					url: '/pagesB/pages/center/addCard/addCard'
				})
			}
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
				.round-outbox{
					width: 50%;
					height: 100%;
					display: flex;
					align-items: center;
					.round-box{
						@include width-margin(100rpx, 100rpx);
						border-radius: 50%;
						background: #FFFFFF;
						display: flex;
						align-items: center;
						.icon{
							margin: 0 auto;
							@include icon-size(60rpx, 60rpx);
						}
					}
					.blue-background{
						background: $major-color !important;
					}
					.red-background{
						background: red !important;
					}
				}
			}
		}
		.main_item:nth-of-type(1){
			margin-top: 70rpx;
		}
	}
	
	
	// 就诊卡的信息排列
	.info-box{
		@include width-margin(90%,95%);
		.row-box{
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			@include flex-direction(row);
			align-items: center;
			.name{
				@include font-style(18px, bold, #000000);
				margin-right: 30rpx;
			}
			.icon{
				@include icon-size(70rpx, 70rpx);
			}
			.gray-text{
				@include font-style(16px, 500, $gray-color);
				margin-right: 30rpx;
			}
		}
	}
	// 底部提示文字
	.gray-tips{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		@include font-style(16px,500,$gray-color);
		position: absolute;
		top: 0px;
	}
	// 添加就诊卡的按钮
	.add-button{
		@include icon-size(85rpx,85rpx);
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
	}
</style>
