<template>
	<view class="body-background">
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<send-verification-code v-if="num == 0" @getStep="getStep"></send-verification-code>
		<set-password v-if="num == 1"></set-password>
	</view>
</template>

<script>
	import sendVerificationCode from './components/sendVerificationCode.vue'
	import setPassword from './components/setPassword.vue'
	
	export default {
		components: {
			sendVerificationCode,
			setPassword
		},
		data() {
			return {
				numList: [{
					name: '获取验证码'
				}, {
					name: '修改密码'
				}],
				num: 0,
				phone: ''
			}
		}, 
		methods: {
			// 获取到发送验证码的步骤的num
			getStep: function(step) {
				this.num = step
			},
		},
		mounted() {
			this.phone = JSON.parse(uni.getStorageSync('userInfo')).phone
		}
	}
</script>

<style lang="scss">
	.body-background{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	page{
		@extend .body-background;
	}
</style>
