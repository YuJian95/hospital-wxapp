<!-- 用于某些页面显示没有数据的时候的样子 -->
<template>
	<div class="page-backgroud">
		<!-- <image class="mp-background" src="/static/no-data.jpg" no-repeat></image> -->
		<image class="mp-background" src="http://image.yujian95.cn/Fjhy3rz2StKUCVi24DMOUXt6Zv0n" no-repeat></image>
		<text class="text-positon">暂无{{ message }}数据</text>
	</div>
</template>

<script>
	export default {
		props:{
			message: ''
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/scss/common.scss';
	page{
		width: 100%;
		height: 100%;
		background: #F6F6F6;
	}
	%picture-box{
		width: 100%;
		height: 70%;
		background-size: 100% 100%;
		position: fixed;
	}
	.mp-background{
		@extend %picture-box;
	}
	.text-positon{
		@include font-style(20px, 500, $gray-color);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20%;
	}
</style>
