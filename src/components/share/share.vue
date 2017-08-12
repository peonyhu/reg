<template>
  <div class="share">
    <input type="hidden" id="title" value="" v-model="share.title">
    <input type="hidden" id="link" value="" v-model="share.link">
    <input type="hidden" id="imgUrl" value="" v-model="share.imgUrl">
    <input type="hidden" id="env"  v-model="share.env">
    <input type="hidden" id="desc" value="" v-model="share.desc">
    <input type="hidden" id="end-time" v-model="share.endTime">
    <input type="hidden" id="isCode" v-model="share.isCode">
    <input type="hidden" id="volume" v-model="share.volume">
    <!--成交额-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {timeTrans} from '@/common/js/util';
  export default{
    data(){
      return {
        share: {
          title: '我送你一个188元的，你要不要？',
          link: 'http://wx-staging.jinhui365.cn/redPacket/index.php?ut=2003071',
          imgUrl: 'http://download.jinhui365.cn/group112/M00/AF/C2/CgAAcFkaZPmhrSVBAABhEUrdAKc672.jpg',
          desc: '来金汇金融理财，百万人和你一起投资，迄今产品兑付率100%',
          endTime:'2017-7-12 9:00:14',
          env:'',
          isCode:0,        // 为1的时候代表有图形验证码，0代表无
          volume:'800亿'
        }
      }
    },
    methods:{
      static(){
          var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
          // 统计代码
          var jhjr = document.createElement('script');
          jhjr.type = 'text/javascript';
          jhjr.async = true;
          jhjr.src = document.getElementById('env').value != 'productiona'?'https://bd.jinhui365.cn:28080/trace/trace.js?u=654321':'https://tc.jinhui365.com/trace/trace.js?u=nQyR60I21TW';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(jhjr, s);

          // 百度统计代码
          var hm = document.createElement("script");
          hm.src = document.getElementById('env').value != 'productiona'?'' + _bdhmProtocol + 'hm.baidu.com/hm.js?160a8c83ef05f38922c69b9a5fa42f86':'' + _bdhmProtocol + 'hm.baidu.com/hm.js?617f2c6c91d3a02ddc1381024ebf579d';
          var sm = document.getElementsByTagName("script")[0];
          sm.parentNode.insertBefore(hm, sm);
        },
      shareInfo(){
          let oTime =  Math.floor((new Date().getTime())/1000);
          this.$http.get('/redPacket/api.php?action=shareInfo'+'&gid='+16,{
            emulateJSON:true
          }).then((res)=>{
            let data = res.data;
            console.log(data)
            let dataShare = data.data.share[0];
            if(data.message.code == 0) {
                this.share.desc = dataShare.description;
                this.share.imgUrl = dataShare.img_url;
                this.share.title = dataShare.title;
                this.share.link = dataShare.link;
                this.share.env = data.data.env;
                this.share.endTime = dataShare.data.endTime;
                this.share.isCode = dataShare.data.isCode;
            }else{
              this.share.desc = dataShare.description;
              this.share.imgUrl = dataShare.img_url;
              this.share.title = dataShare.title;
              this.share.link = dataShare.link;
              this.share.env = data.data.env;
              this.share.endTime = dataShare.data.endTime;
              this.share.isCode = dataShare.data.isCode;
            }
            this.$emit('isCodeDate',this.share.isCode);
            var end = timeTrans(this.share.endTime);
            let endTime = Math.floor(end.getTime()/1000);
            if(this.share.env != ''){
              if(oTime > endTime){
                if(this.share.env == 'productiona'){
                  window.location.href="https://wx.jinhui365.com/thanksgiving/missPage.php?gid="+16+"&title="+encodeURIComponent(this.share.title)+"&share="+encodeURIComponent(this.share.link);
                }else{
                  window.location.href="https://wx-staging.jinhui365.cn/thanksgiving/missPage.php?gid="+16+"&title="+encodeURIComponent(this.share.title)+"&share="+encodeURIComponent(this.share.link);
                }
              }
            }
            this.wxShare()
          })
        },
      statData(){
        this.$http.get('/redPacket/api.php?action=statData'+'&gid='+16,{
          emulateJSON:true
        }).then((res)=>{
          let data = res.data;
          if(data.message.code == 0) {
            this.share.volume = data.taotalTransaction;
            this.$emit('volumeDate',this.share.volume);
          }else{
            this.$emit('volumeDate',this.share.volume);
          }
        })
      },
      wxShare(){
        window.wx_share = (function() {
          var servers = '',
            params = {},
            sign = '', //签名
            noncestr = '', //随机字符串
            appid = '',
            appSecret = '',
            timestamp = parseInt((new Date()).getTime() / 1000),//时间戳
            _url = window.location.href;
          var title='',
            link='',
            desc='',
            imgUrl='';
          var XMLHttpReq;
          var urls = location.href.split('#')[0];
          var url="/lover/jsajax.php?url=" + encodeURIComponent(urls);
          // console.log(encodeURIComponent(urls));
          function createXMLHttpRequest() {
            try {
              XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
            }
            catch(E) {
              try {
                XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
              }
              catch(E) {
                XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
              }
            }

          }

          function sendAjaxRequest(url) {
            createXMLHttpRequest();  //创建XMLHttpRequest对象
            XMLHttpReq.open("get", url, true);
            XMLHttpReq.onreadystatechange = processResponse; //指定响应函数
            XMLHttpReq.send(null);
          }

          //回调函数
          function processResponse() {
            if (XMLHttpReq.readyState == 4) {
              if (XMLHttpReq.status == 200) {
                var res = eval("(" + XMLHttpReq.responseText + ")");
                noncestr = res.nonceStr; //随机字符串
                appid = res.appId;
                sign=res.signature;//签名
                timestamp =res.timestamp;//时间撮
                _url = res.url;
                title = document.querySelector('#title').value;
                link = document.querySelector("#link").value;
                imgUrl = document.querySelector("#imgUrl").value;
                desc = document.querySelector("#desc").value;
                wx_config(title,link,imgUrl,desc);
              }
            }
          }

          function wx_config(title,link,imgUrl,desc) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: appid, // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳
              nonceStr: noncestr, // 必填，生成签名的随机串
              signature: sign, // 必填，签名，见附录1
              jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
              ]
            });
            wx.error(function(res){});
            wx.ready(function() {
              wx.checkJsApi({
                jsApiList: [
                  'getNetworkType',
                  'previewImage'
                ],
                success: function (res) {
                  //alert(JSON.stringify(res));
                }
              });
              var shardate = {
                'title': title,
                'link':link,
                'imgUrl': imgUrl,
                'desc':desc,
                trigger: function(res) {

                },
                success: function(res) {
                },
                cancel: function(res) {

                },
                fail: function(res) {

                }
              };
              wx.onMenuShareTimeline(shardate);
              wx.onMenuShareAppMessage(shardate);
            });
          }
          ;
          function start() {
            sendAjaxRequest(url);
          }
          return {
            start: start,
          }
        })();
        window.wx_share.start();
      }
    },
    mounted(){
      window.addEventListener('load',this.static);
      window.addEventListener('load',this.shareInfo);
      window.addEventListener('load',this.statData);
    }
  }
</script>
<style>
</style>
