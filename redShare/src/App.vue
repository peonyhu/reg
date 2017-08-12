<template>
  <div id="app">
    <share v-on:volumeDate="volumeDate" v-on:isCodeDate="isCodeDate"></share>
    <router-view :volume="volume" :isCode="isCode"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import share from '@/components/share/share'
  import calcBaseRem from '@/assets/js/calcBaseRem.js';
  export default {
    data(){
      return{
        volume:'800亿',
        isCode:0
      }
    },
    methods:{
      volumeDate(volume) { // myHeight事件触发调用的方法
        this.volume = volume; // message就是子组件穿过来的内容
      },
      isCodeDate(isCode) { // myHeight事件触发调用的方法
        this.isCode = isCode; // message就是子组件穿过来的内容
      },
    },
    components: {
      share
    }
  }
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
