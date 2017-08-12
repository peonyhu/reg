<template>
  <!--<div class="timerBtn">-->
  <span class="xsreyzm" ref="yzm">{{time | change}}</span>
  <!--</div>-->
</template>
<script type="text/ecmascript-6">
  let flag = false;
  export default{
      props:{
          start:{
              type:Boolean
          },
          seconds:{
              type:Number,
              default:60
          }
      },
      data(){
        return{
            time:'发送'
        }
      },
      watch:{
        start(value,oldvalue){
          if(value == true){
              this.countDown();
          }
        }
      },
      methods:{
        countDown(){
          this.time = this.seconds;
          this.$refs.yzm.style.background = '#FFF9B3';
          this.$refs.yzm.style.borderColor = '#FFF9B3';
          let timer = setInterval(()=>{
            this.time--;
            if(this.time == 0){
                this.$refs.yzm.style.background = '#ffef42';
                this.$refs.yzm.style.borderColor = '#ffef42';
                this.$emit('countDown');
                this.time = '发送';
                flag = true;
                clearInterval(timer);
            }
          },1000)
        }
      },
    filters:{
      change(value){
        if(!value) return '';
        if(!isNaN(value)){
            if(flag == true){
                return `${value}`
            }
            return value
        }else{
            return value
          }
        }
    }
  }
</script>
<style scoped>
  .xsreyzm {
    margin-left: 0.9375rem;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    display: inline-block;
    color: #444444;
    font-size: 0.625rem;
    position: absolute;
    right: -1px;
    top: -1px;
    width: 3.25rem;
    height: 3.125rem;
    line-height: 3.125rem;
    box-sizing: border-box;
    border: 1px solid #ffef42;
    border-radius: 2rem;
    border-right: none;
    background: #ffef42;
    text-align: center;
  }
</style>
