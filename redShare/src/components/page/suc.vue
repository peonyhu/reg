<template>
    <div class="suc">
      <div class="xs_suctxt">恭喜您，注册成功</div>
      <div class="xs_sucimg">
        <!--<p>红包已发送至</p>-->
        <!--<p>您的账户</p>-->
      </div>
      <div class="xs_succon">
        <p class="mt74">爽活宝，1元起购，随存随取，红包购买更划算！</p>
        <p>现在登录APP【我的账户】，还有大惊喜。</p>
        <a href="javascript:;" class="mr10" @click="downApp">下载APP</a><a href="javascript:;" @click="seeRed">查看红包</a>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
      data(){
        return {

        }
      },
      methods:{
        downApp(){
            if(document.getElementById('env').value=='productiona'){
              window.location.href='https://m.jinhui365.com/helps/downloadApp';
            }else{
              window.location.href='https://m.jinhui365.cn/helps/downloadApp';
            }
        },
        seeRed(){
          if(document.getElementById('env').value=='productiona'){
            window.location.href='https://m.jinhui365.com/assets/voucher/1';
          }else{
            window.location.href='https://m.jinhui365.cn/assets/voucher/1';
          }
        }
      }
  }
</script>
<style scoped>
  .suc{
    width:100%;
    height:100%;
    background-color: #f00;
    position: absolute;
    overflow: auto;
  }
  .mt74{
    margin-top:2.3125rem;
  }
  .mr10{
    margin-right:0.3125rem;
  }
  .xs_succon a {
    display: inline-block;
    text-align: center;
    background: #fff445;
    font-size: 1.0625rem;
    color: #444444;
    width: 8.71875rem;
    height: 3.28125rem;
    line-height: 3.28125rem;
    border-radius: 2rem;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    margin-bottom: 1.25rem;
    margin-top: 1.5625rem;
  }

  .xs_succon {
    width: 100%;
    position: absolute;
    top: 24.375rem;
    text-align: center;
    color: #fff;
  }

  .xs_succon p {
    font-size: 0.84375rem;
    line-height: 1.25rem;
  }

  /*.xs_succon p:first-child {*/
    /*font-size: 1.25rem;*/
    /*margin-bottom: 0.375rem;*/
  /*}*/

  .xs_suctxt {
    position: relative;
    top: 3.125rem;
    color: #fff445;
    font-size:2.1875rem;
    width:100%;
    text-align: center;
  }

  .xs_sucimg {
    background: url(/static/img/suc_bg.png) no-repeat center top;
    width: 100%;
    height: 20.03125rem;
    -webkit-background-size: 22.96875rem 20.03125rem;
    background-size: 22.96875rem 19.625rem;
    text-align: center;
    margin:3.125rem auto 0;
    padding-top:12.125rem;
  }

  /*.xs_sucimg p{*/
    /*font-size:1.0625rem;*/
    /*color: #ffffff;*/
    /*line-height:2rem;*/
  /*}*/
</style>
