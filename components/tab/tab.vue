<template>
	<view>
		<u-tabs :list="tabs" :is-scroll="true" :current="position" inactive-color="#999999" activeColor="#333333"
			:bold="bold" @change="change" :show-bar="true" bar-width="80" ></u-tabs>
	</view>
</template>

<script>
	export default {
		name: "tab",
		data() {
			return {
				//{name:'tab',id:0}
				tabs: [],
				position: 0,
				bold: true
			};
		},
		methods: {
			setTabs(tabs) {
				this.tabs = tabs
				this.position = 0
			},
			change(index) {
				this.position = index
				this.$emit("tabChange", this.tabs[index].id)
			}
		}
	}
</script>

<style>

</style>
