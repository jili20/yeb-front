<template>
  <div id="card">
  	<header>
  		<img class="avatar" v-bind:src="user.img" v-bind:alt="user.name">
  		<p class="name">{{user.name}}</p>
  	</header>
  	<footer>
  		<input class="search" type="text" v-model="$store.state.filterKey" placeholder="search user...">
  	</footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      user: {
      	name: 'Li-yiwei',
      	// img: '../src/assets/images/1.jpg'
      	img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F29%2F20200629010226_pthio.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614220464&t=f9ff78e4e060dd1720f1920c76151299'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
	padding: 12px;
  .avatar{
  	width: 40px;
  	height: 40px;
  	vertical-align: middle;/*这个是图片和文字居中对齐*/
  }
  .name {
  	display: inline-block;
  	padding: 10px;
  	margin-bottom: 15px;
  	font-size: 16px;
  }
  .search {
  	background: #26292E;
  	height: 30px;
  	line-height: 30px;
  	padding: 0 10px;
  	border: 1px solid #3a3a3a;
  	border-radius: 4px;
  	outline: none;/*鼠标点击后不会出现蓝色边框*/
    color: #FFF;
  }
}
</style>
