<template>
  <div class="reg">
    <div class="xs_banner">
      <a href="javascript:;" @click="bannerGuide"><span></span></a>
    </div>
    <div class="xs_list">
      <div class="xs_listone">
        <div class="xs_icon"><em></em></div>
        <input type="text" v-model="regData.mobile.val" placeholder="请输入手机号码" name="mobile" id="mobile" @blur="mobileBlur" @focus="mobileFocus">
        <p class="xs_error">{{regData.mobile.error}}</p>
      </div>
      <div class="xs_listone xs_listtwo xs_listcode" v-show="isCode == 1">
        <div class="xs_listcodeyzm">
          <div class="xs_icon"><em></em></div>
          <input type="text" id="imgVerify" v-model="regData.checkimgcode.val" placeholder="输入验证码" class="yzmval" name="kaptchaCode">
        </div>
        <img v-bind:src="regData.imgCheckUrl.val" @click="imgCode" class="yzmcode">
        <p class="xs_error yzm_prompt" id="imgVerify_prompt" style="position:absolute;bottom:-2.5rem;">{{regData.checkimgcode.error}}</p>
      </div>
      <div class="xs_listone xs_listtwo">
        <div class="xs_icon"><em></em></div>
        <input type="text" v-model="regData.checkcode.val" placeholder="请输入手机验证码" class="yzmval" name="yzmval" id="yzmval">
        <time-btn :start="start" :seconds="seconds" @countDown="start=false" @click.native="sendCode"></time-btn>
        <p class="xs_error yzm_prompt" id="mobileVerify_prompt">{{regData.checkcode.error}}</p>
      </div>
      <div class="xs_listone xs_listthird">
        <div class="xs_icon"><em></em></div>
        <input type="password" v-model="regData.password.val" placeholder="请输入密码" id="pwd" name="password" @blur="pwdBlur" @focus="pwdFocus">
        <p class="xs_error" id="pwd_prompt">{{regData.password.error}}</p>
      </div>
      <a class="xs_bn" href="javascript:void(0)" id="xsbnmobile" @click="register">下一步</a>
      <div class="xs_info">
        <div class="xs_infotit"><em></em>*金汇金融由中国建设银行资金监管</div>
        <div class="xs_infolist">
          <ul class="xs_infoulone clearfix">
            <li></li>
            <li>信息披露</li>
            <li></li>
          </ul>
          <ul class="xs_infoultwo clearfix">
            <li class="">
              <em></em>中国互金协会成员
            </li>
            <li class="">
              <span><em></em>16年度卓越金融科技平台</span>
            </li>
            <li class="">
              <em></em>累计成交额突破<span>{{volume}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import timeBtn from '@/components/timeBtn/timeBtn';
  import {subAction} from '@/common/js/util';
  export default{
    props:{
      volume:'',
      isCode:''
    },
    data(){
        return{
          start:false,
          seconds:89,
          regData:{
            submited:0,
            mobile:{
              val:'',
              name:'手机号',
              reg: /^1\d{10}$/,
              error:''
            },
            password:{
              val:'',
              name:'密码',
              reg:/^[^\s]{6,16}$/,
              error:''
            },
            checkcode:{
              val:'',
              name:'验证码',
              error:''
            },
            checkimgcode:{
              val:'',
              name:'图形验证码',
              reg:/^\w{4}$/,
              error:''
            },
            imgCheckUrl:{
              val:'/redPacket/api.php?action=code',
              isVerify:false,
              error:''
            }
          }
        }
      },
    methods:{
      bannerGuide(){
        let friendId = this.$route.query.friendId?this.$route.query.friendId:'';
        if(document.getElementById('env').value=='productiona'){
          window.location.href=`https://m.jinhui365.com/helps/guide?ut=2000021&friendId=${friendId}`;
        }else{
          window.location.href=`https://m.jinhui365.cn/helps/guide?ut=2000021&friendId=${friendId}`;
        }
      },
//      图形验证码
      imgCode(){
        this.regData.imgCheckUrl.val = this.regData.imgCheckUrl.val+'&'+Math.floor(Math.random()*100);
      },
      mobileBlur(){
        if (this.regData.mobile.val == '') {
          this.regData.mobile.error = '*手机号不能为空';
          return false;
        } else if (!(/^1\d{10}$/.test(this.regData.mobile.val))) {
          this.regData.mobile.error = '*输入错误，请输入11位手机号码';
          return false;
        } else {
          this.regData.mobile.error = '';
        }
      },
      mobileFocus(){
        this.regData.mobile.error = '';
      },
      pwdBlur () {
        if (this.regData.password.val == '') {
          this.regData.password.error = '*密码不能为空';
          return false;
        } else if (this.regData.password.val.length < 6 || this.regData.password.val.length > 16) {
          this.regData.password.error = '*密码长度应在6-16位，请重新输入';
          return false;
        } else {
          this.regData.password.error = '';
        }
      },
      pwdFocus () {
        this.regData.password.error = '';
      },
      sendCode(){
        let arrnotEmpty;
        let arrReg;
        if(this.isCode == 1){
          arrnotEmpty = ['mobile','checkimgcode'];//非空输入验证
          arrReg = ['mobile','checkimgcode'];//正则验证
        }else{
          arrnotEmpty = ['mobile'];//非空输入验证
          arrReg = ['mobile'];//正则验证
        }
        if(subAction(arrReg,arrnotEmpty,this.regData)!=false){
          let params = {
            mobile:this.regData.mobile.val,
            kaptchaCode:this.regData.checkimgcode.val
          };
          this.$http.post('/redPacket/api.php?action=send'+'&gid='+16,params,{
            emulateJSON: true
          }).then((res) => {
            let data = res.data;
            if(typeof data != 'object'){
              data = JSON.parse(res.data);         //手机号的
            }
            if(data.message.code == 0){
              this.regData.mobile.error= "";
              this.regData.checkimgcode.error= "";
              this.regData.checkcode.error= "";
              this.start = true;
            }else{
              if(data.message.code == -205 || data.message.code == -222){
                if(this.isCode == 1){
                  this.regData.checkimgcode.error = '*'+data.message.message;
                }
              }else{
                this.regData.checkcode.error = '*'+data.message.message;
              }
            }
          })
        }
      },
      register(){
        if(this.isCode == 1){
          var arrnotEmpty = ['mobile','checkimgcode','checkcode','password'];//非空输入验证
          var arrReg = ['mobile','checkimgcode','password'];//正则验证
        }else{
          var arrnotEmpty = ['mobile','checkcode','password'];//非空输入验证
          var arrReg = ['mobile','password'];//正则验证
        }
        if(this.regData.submited )
        {
          return false;
        }
        this.regData.submited =1;
        if(subAction(arrReg,arrnotEmpty,this.regData)!=false){
          let params = {
            kaptchaCode:this.regData.checkimgcode.val,
            mobile:this.regData.mobile.val,
            verifyCode:this.regData.checkcode.val,
            password:this.regData.password.val,
            friendId:this.$route.query.friendId?this.$route.query.friendId:'',
            ut:this.$route.query.ut?this.$route.query.ut:''
          };
          this.$http.post('/redPacket/api.php?action=reg'+'&gid='+16,params,{
            emulateJSON:true
          }).then((res)=>{
            let data = res.data;
            if(data.message.code == 0) {
//              let uid = data.userId;
              this.$router.push({path: '/redShare/dist/suc', query: { ut: this.$route.query.ut ,friendId:this.$route.query.friendId}});
              _hmt.push(['_trackEvent', 'V_reg', 'click', 'reg']);
            }else{
              this.regData.password.error = '*'+data.message.message;
              this.regData.submited = 0;
            }
          })
        }
      }
    },
    components: {
      'time-btn':timeBtn
    }
  }
</script>
<style>

</style>
