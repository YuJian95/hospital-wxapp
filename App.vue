<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	/*每个页面公共css */
	@import './common/style/weui.wxss';
	@import "./common/style/colorui/main.css";
	@import "./common/style/colorui/icon.css";
	@import "./common/style/colorui/animation.css";
	/* 去掉H5页面的重复头部的信息 */
	/* #ifdef H5 */
	uni-page-head{
		display: none; 
	} 
	/* #endif */
</style>
