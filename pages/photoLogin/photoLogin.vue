<template>
	<view>
		<!-- #ifdef MP -->
		<image src="/static/login.jpg" class="mp-background" no-repeat></image>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
				Countdown() {
					var timer = setTimeout(function() {				
						uni.switchTab({
							url: '/pages/home/appointmentHome/appointmentHome'
						})
					}, 3000);
				}
		},
		onLoad() {
			this.Countdown()
			console.log("dkjgdj")
			
		}
	}
</script>

<style lang="scss" scoped>
	%background-img {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		position: fixed;
	}
	.mp-background{
		@extend %background-img;
	}
	/* #ifdef H5 */
	page {
		width: 100%;
		height: 100%;
		background: url(../../static/login.jpg) no-repeat;
		background-size: 100% 100%;
		position: fixed;
	}
	/* #endif */
</style>
