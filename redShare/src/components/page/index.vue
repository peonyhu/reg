<template>
  <div class="index">
    <div class="xs_mask1"></div>
    <div class="xs_hbwrap">
      <div class="xs_hb xs_hb1">
        <div class="xs_hbcon">
          <p class="f34">爽活宝<em class="c_fff445">4.5%</em>年化，随存随取</p>
          <p>120万人信任、成交额超{{volume}}，兑付率100%</p>
          <a href="javascript:;" @click="regSee">注册查看</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'index',
  props:{
    volume:''
  },
  data () {
    return {
    }
  },
  methods:{
    regSee(){
      this.$router.push({path:'/redShare/reg',query: { ut: this.$route.query.ut ,friendId:this.$route.query.friendId}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .xs_mask1 {
    position: absolute;
    background: url(https://alicdn.jinhui365.com/activity/redPacket/images/xs_bg.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    min-height: 31.21875rem;
  }
  .xs_hbwrap {
    position: relative;
    z-index: 6;
  }
  .xs_hb {
    position: relative;
    background: url(https://alicdn.jinhui365.com/activity/redPacket/images/xs_hb3.png) no-repeat;
    background-size: 22.5rem 30.90625rem;
    width: 22.5rem;
    height: 30.90625rem;
    margin: 0.3125rem auto 0px auto;
  }

  .xs_hb1 {
    background: url(https://alicdn.jinhui365.com/activity/redPacket/images/xs_hb2.png) no-repeat;
    background-size: 22.5rem 30.90625rem;
  }

  /*获得红包*/
  .xs_hbcon {
    position: absolute;
    top: 22.1875rem;
    text-align: center;
    width: 22.5rem;
  }

  .xs_hbcon p {
    color: #fff;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }

  .xs_hbcon p:first-child { /*font-size:1.0416rem;*/
    font-size: 0.8125rem;
    margin-bottom: 0.375rem;
  }

  .xs_hbcon a {
    display: inline-block;
    text-align: center;
    margin-top: 0.4375rem;
    background: #fff445;
    font-size: 1.0416rem;
    color: #444444;
    width: 13.5625rem;
    height: 3.15625rem;
    line-height: 3.15625rem;
    border-radius: 2rem;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    margin-bottom: 1.25rem;
  }
</style>

