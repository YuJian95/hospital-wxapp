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
				<credit-page :creditRecord="creditRecord"
				 v-if="activeIndex == 0"></credit-page>
			</view>
			<view class="weui-tab__content" :hidden="activeIndex != 1">
				<!-- 当完全没有失信记录时 -->
				<credit-page :creditRecord="creditRecord" 
				v-if="activeIndex == 1 && isCreditGood"></credit-page>
				<!-- 当有失信记录时 -->
				<history-credit v-if="!isCreditGood"></history-credit>
			</view>
		</view>
	</view>
</template>

<script>
	import creditPage from './component/creditPage.vue'
	import historyCredit from './component/historyCredit.vue'
	export default {
		components: {
			creditPage,
			historyCredit
		},
		data() {
			return {
				tabs: ["当月记录", "以往记录"],
				activeIndex: 0,
				creditRecord: {}, // 这个是用来传数据给creditPage页面的
				isCreditGood: false, //这个是从后台获取的数据
			}
		},
		methods: {
			tabClick: function(e) {
				// 只有当页面是当月的任何状态和以往的没有失信记录的情况下才修改这个值
				if (e.currentTarget.id == 1 && !this.isCreditGood) {

				} else {
					this.creditRecord = {
						currentStatus: e.currentTarget.id,
						isCreditGood: this.isCreditGood
					}
				}
				this.activeIndex = e.currentTarget.id
			}
		},
		onLoad() {
			this.creditRecord = {
				currentStatus: 0,
				isCreditGood: this.isCreditGood
			}
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
</style>
