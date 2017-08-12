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
