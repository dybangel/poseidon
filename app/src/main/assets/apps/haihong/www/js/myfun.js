//读取配置文件
if (typeof(Gconfigjson) != "undefined") {
	configjson = Gconfigjson;
} else {
	configjson = "config/config.json";
}
$.ajax({
	url: configjson,
	type: 'get',
	dataType: 'json',
	async: false,
	success: function(res) {
		//alert(res.server);  
		Gserver = res.server;
		Gimgserver = res.imgserver;
		//Gmainviewid=res.mainviewid;
		Gapkname = res.apkname;
		// alert("gserver="+Gserver);
	}
});

//计算data数量的函数
function JSONLength(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

function closeme() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

function getsendsms(action, par) {
	var Gurl = Gimgserver + "/api/user.aspx?action=SendMobile" + par;
	//console.log("url is ++++++++++++++:"+Gurl);
	var actions = action;
	var action = actions.split("|")[0];
	var action_2 = actions.split("|")[1];
	var action_3 = actions.split("|")[2];

	//alert('action ready');
	$.ajax({
		type: "get",
		url: Gurl,
		async: true,
		//data:{"action":action},
		dataType: "json", // 因为PHP返回数据是JSON格式，所以这里类似要用JSON
		success: function(data) {

			if (data != "null") {
				try {


					if (typeof(action_2) == "undefined") {
						//alert('test='+data);
						//	eval(action+'(data)');
						//						alert('不用模板机制');
					} else {
						var tpid = $('#' + action + '_template')[0];
						if (typeof(tpid) == "undefined") {
							alert("模板：" + action + "_template 不存在，请设置");
							return;
						}
						var conid = $('#' + action + '_container')[0];
						if (typeof(conid) == "undefined") {
							alert("容器：" + action + "_container 不存在，请设置");
							return;
						}

						var template = $('#' + action + '_template')[0];
						var dot = doT.template(template.innerHTML);
						if (action_3 == "append") {
							$('#' + action + '_container')[0].innerHTML += dot(data);
						} else {
							$('#' + action + '_container')[0].innerHTML = dot(data);
						}
						//alert('需要找模板绑定');
					}
					//再执行同action私有实现函数以满足一些特殊要求
					//alert("eval run.."+action);
					eval(action + '(data)');
				} catch (e) {
					//TODO handle the exception
					//alert(e);
				}
			} else {
				console.log(action + '返回空值，增加一个procedure返回值');
				eval(action + '(data)');
				//$('.mui-spinner').removeClass('mui-spinner');
				//$('.mui-pull-caption-refresh')[0].innerHTML='没有更多的数据了';
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(errorThrown);
		}
	})
}

function getjson(action, par) {
	// console.log("调用函数" + action + ' 参数是' + par);
	var actions = action;
	var action = actions.split("|")[0];
	var action_2 = actions.split("|")[1];
	var action_3 = actions.split("|")[2];
	//  console.log("appid is:"+plus.push.getClientInfo().appid);
	//pPyZWvH3Fa6PXba10aJ009 hbulider
	//alert('action ready');
	$.ajax({
		type: "get",
		url: Gserver + "/api.aspx?" + par, //+"&appid="+plus.push.getClientInfo().appid 
		async: true,
		data: {
			"appid": plus.push.getClientInfo().appid,
			"action": action
		},
		dataType: "json", // 因为PHP返回数据是JSON格式，所以这里类似要用JSON
		success: function(data) {
			if (data != "null") {
				try {
					if (typeof(action_2) == "undefined") {
						//alert('test='+data);
						//	eval(action+'(data)');
						//						alert('不用模板机制');
					} else {
						var tpid = $('#' + action + '_template')[0];
						if (typeof(tpid) == "undefined") {
							alert("模板：" + action + "_template 不存在，请设置");
							return;
						}
						var conid = $('#' + action + '_container')[0];
						if (typeof(conid) == "undefined") {
							alert("容器：" + action + "_container 不存在，请设置");
							return;
						}
						var template = $('#' + action + '_template')[0];
						var dot = doT.template(template.innerHTML);
						if (action_3 == "append") {
							$('#' + action + '_container')[0].innerHTML += dot(data);
						} else {
							$('#' + action + '_container')[0].innerHTML = dot(data);
						}
						//alert('需要找模板绑定');
					}
					//再执行同action私有实现函数以满足一些特殊要求
					//alert("eval run.."+action);
					eval(action + '(data)');
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
			} else {
				// console.log(action + '返回空值，增加一个procedure返回值');
				eval(action + '(data)');
				//$('.mui-spinner').removeClass('mui-spinner');
				//$('.mui-pull-caption-refresh')[0].innerHTML='没有更多的数据了';
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(errorThrown);
		}
	})
}
//need to determine whether there is a network
var get_json = (type,path,isAsync,param) => {
	// var domain = 'http://47.240.57.96:9999/'
	var domain = 'http://xiaomage.natapp1.cc/'
	var path = path
	var url = domain + path
	var strParam = JSON.stringify(param)
	if(type == 'POST'){
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: type,
				url: url,
				async: isAsync,
				data: strParam,
				dataType: "json",
				contentType: "application/json",
				success: function(res) {
					resolve(res)
				},
				error: function(res) {
					console.log('网络请求错误')
				}
			})
		})
	}else{
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: type,
				url: url,
				async: isAsync,
				dataType: "json",
				success: function(res) {
					resolve(res)
				},
				error: function(res) {
					console.log('网络请求错误')
				}
			})
		})
	}

}
//check the return result
var check_res = (code,message) =>{
	mui.plusReady(function () {
	    plus.nativeUI.toast(message);
	})
}

//打开新窗体优化
function openwin_plus(winpath, par) {
	mui.openWindow({
		url: winpath,
		id: winpath,
		styles: {
			top: '0px', //新页面顶部位置
			bottom: '0px', //新页面底部位置
			//width:newpage-width,//新页面宽度，默认为100%
			//height:newpage-height,//新页面高度，默认为100%
			// ......
		},
		extras: {
			pars: par
			// .....//自定义扩展参数，可以用来处理页面间传值
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
			duration: 50 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在拼命加载...', //等待对话框上显示的提示内容
			options: {
				width: '120px', //等待框背景区域宽度，默认根据内容自动计算合适宽度
				height: '100px', //等待框背景区域高度，默认根据内容自动计算合适高度
				//  ......
			}
		}
	})

}

//接受数值 可打印调试Gparent_value
function getvalue_plus() {
	var pars = plus.webview.currentWebview().pars;
	console.log(JSON.stringify(pars))
	var cmds = '';
	for (var key in pars) {
		var cmd = '' + key + '="' + pars[key] + '";'
		cmds += cmd;
		eval(cmd);
	}
	Gvalue_plus = cmds;
}

//全文替换
function replaceall(str, src, dst) {
	var reg1 = new RegExp(src, "g"); //创建正则RegExp对象   
	str = str.replace(reg1, dst);
	return str;
}
//根据屏幕修改html front-size
//	(function (doc, win) {
//		try{
//			if(Gnoresize==true){
//			return;
//		}
//		}catch(e){
//			//TODO handle the exception
//		}
//      var docEl = doc.documentElement,
//          resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
//          recalc = function () {
//              var clientWidth = docEl.clientWidth;
//              if (!clientWidth) return;
//             //   alert(clientWidth);
//              //iphone5
//              if(320<=clientWidth && clientWidth<375){
//                  docEl.style.fontSize = "16px";
//              }else if(375<=clientWidth && clientWidth<414){
//              //	alert("i6");
//                  docEl.style.fontSize = "21px";
//              }else if(415<=clientWidth && clientWidth<768){
//                  docEl.style.fontSize = "28px";
//              }
//              
//          };
//      if (!doc.addEventListener) return;
//      win.addEventListener(resizeEvt, recalc, false);
//      doc.addEventListener("DOMContentLoaded", recalc, false);
//  })(document, window);
//日期格式化函数
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var wgtWaiting = null;

function downloadWgt(strInstall, functions) {
	//console.log("myfun callback is:"+callback);
	var action = functions;
	//eval(action+'()');

	wgtWaiting = plus.nativeUI.showWaiting("开始下载");
	var wgtUrl = strInstall;
	var wgtOption = {
		filename: "_doc/update/",
		retry: 1
	};
	var task = plus.downloader.createDownload(wgtUrl, wgtOption, function(download, status) {
		if (status == 200) {
			wgtWaiting.setTitle("开始安装");
			if ("update" == action) {
				updateWgt(download.filename);
			} else {
				installApp(download.filename, action);
			}

		} else {
			mui.alert("安装包下载失败！");
			wgtWaiting.close();
		}
	});
	task.addEventListener("statechanged", function(download, status) {
		switch (download.state) {
			case 2:
				wgtWaiting.setTitle("已连接到服务器");
				break;
			case 3:
				var percent = download.downloadedSize / download.totalSize * 100;
				wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
				break;
			case 4:
				wgtWaiting.setTitle("下载完成");
				break;
		}
	});
	task.start();
};

function installApp(wgtpath, functions) {
	// var action=functions;	
	plus.runtime.install(wgtpath, {}, function(wgtinfo) {
		//eval(action+'()');
		wgtWaiting.close();
	}, function(error) {
		wgtWaiting.close();
		//  mui.alert("应用更新失败！\n" + error.message);  
	});
};

function updateWgt(wgtpath) {
	// var action=functions;	
	plus.runtime.install(wgtpath, {}, function(wgtinfo) {
		mui.alert("更新完成，须重启应用！", function() {
			plus.runtime.restart();
		});
		wgtWaiting.close();
	}, function(error) {
		wgtWaiting.close();
		mui.alert("应用更新失败！\n" + error.message);
	});
};

function checkapp(packname) {
	//var packageName = 'com.tencent.mm';
	//var main = plus.android.runtimeMainActivity();  
	//var packageManager = main.getPackageManager();  
	//var PackageManager = plus.android.importClass(packageManager)  
	//var packageInfo = packageManager.getPackageInfo(packageName,PackageManager.GET_ACTIVITIES);  
	//if(packageInfo ){  
	//  alert('已安装' + packageName + '')  
	//}  
	if (plus.runtime.isApplicationExist({
			pname: packname
		})) {
		return 1;
	} else {
		return 0;
	}

}

function openapp(packname) {
	plus.runtime.launchApplication({
			pname: packname
		},
		function(e) {
			alert("failed: " + e.message);
		})
}
//获取cpu信息
function getCpuInfo() {
	var cpuInfo = '/proc/cpuinfo';
	var temp = '',
		cpuHardware;
	var fileReader = plus.android.importClass("java.io.FileReader");
	var bufferedReader = plus.android.importClass("java.io.BufferedReader");
	var FileReader = new fileReader(cpuInfo);
	var BufferedReader = new bufferedReader(FileReader, 8192);
	while ((temp = BufferedReader.readLine()) != null) {
		if (-1 != temp.indexOf('Hardware')) {
			cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
		}
	}
	return cpuHardware;
}

//本地数据存储
function setItemFun(key, value) {
	plus.storage.setItem(key, value);
	//mui.toast( "数据存储成功，存储了"+key+" value为；"+value );
}
//循环打印obj
function printobj(obj) {
	// for (var key in obj) {
	// 	console.log('key=' + key + '  value=' + obj[key]);
	// }

}
//function copytoclip(mystr){
//	var tempstr=mystr;
//  var Context = plus.android.importClass("android.content.Context");
//  var main = plus.android.runtimeMainActivity();
//  var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
//  plus.android.invoke(clip,"setText",tempstr);
//}
//复制内容到剪切板
function copy_fun(copy) { //参数copy是要复制的文本内容
	mui.plusReady(function() {
		//判断是安卓还是ios
		if (mui.os.ios) {
			//ios
			var UIPasteboard = plus.ios.importClass("UIPasteboard");
			var generalPasteboard = UIPasteboard.generalPasteboard();
			//设置/获取文本内容:
			generalPasteboard.plusCallMethod({
				setValue: copy,
				forPasteboardType: "public.utf8-plain-text"
			});
			generalPasteboard.plusCallMethod({
				valueForPasteboardType: "public.utf8-plain-text"
			});
			mui.toast("已成功复制到剪贴板");
		} else {
			//安卓
			var context = plus.android.importClass("android.content.Context");
			var main = plus.android.runtimeMainActivity();
			var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
			plus.android.invoke(clip, "setText", copy);
			mui.toast("已成功复制到剪贴板");
		}
	});
}

//function showmessage(title,content,nofun,yesfun){
//		var btnArray = ['否', '是'];
//  var message = "<h4>"+content+"</h4>";
// 	//console.log("yesfun  is:"+yesfun);
// 	Gyesfun=yesfun;
// 	Gnofun=nofun;
//  //$('#alert-bg').css('display','block');
//  mui.confirm(message, title, btnArray, function(e,yesfun,nofun) {
//  	console.log("dddyesfun  is:"+Gyesfun);
//  	//printobj(e);
//      if (e.index == 1) {
//      	eval(Gyesfun+'();');
//        //  alert("shi"); 
// 
//      } else {
//      	eval(Gnofun+'();');
//      	//alert("0");
//
//      }
//  },'div');
//}

//金币特效
function Coin(opts) {
	//默认参数
	this.defaults = {
		coinSrc: "images/coin.png", //金币图片地址
		audioSrc: "audio/shake.mp3", //金币音频地址
		coinWidth: 20, //金币宽度
		coinHeight: 20, //金币高度
		density: 30
	};
	this.settings = this._extendDeep(this.defaults, opts); //深拷贝
	this.density = this.settings.density; //密度，即金币个数
	this.timeLag = 1000; //金币散落的事件间隔，数字越大表示间隔越大
	this.coinWidth = this.settings.coinWidth; //金币宽度
	this.coinHeight = this.settings.coinHeight; //金币高度
	this.wrapWidth = 0;
	this.wrapHeight = 0;
	this._init();
}
Coin.prototype = {
	constructor: Coin,

	/**
	 * 动画初始化方法
	 * @method _init
	 **/
	_init: function() {
		//初始化包括尺寸大小
		this.wrapWidth = document.documentElement.clientWidth;
		this.wrapHeight = document.documentElement.clientHeight;

		this._requestAnimationFrame();
		this._createCanvas();
		this._createAudio();

	},

	/**
	 * 对象深拷贝方法
	 * @method _extendDeep
	 * @param  {object} parent 父对象
	                   {object} child  子对象
	   @return {object} child  父对象继承给子对象
	**/
	_extendDeep: function(child, parent) {
		var i,
			toStr = Object.prototype.toString,
			astr = "[object Array]";
		child = child || {};
		for (i in parent) {
			if (parent.hasOwnProperty(i)) {
				if (typeof parent[i] === "object") {
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					extendDeep(parent[i], child[i]);
				} else {
					child[i] = parent[i];
				}
			}
		}
		return child;
	},

	/**
	 * requestAnimationFrame做兼容
	 * @method _requestAnimationFrame
	 **/
	_requestAnimationFrame: function() {
		var lastTime = 0;
		var vendors = ['webkit', 'moz'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // name has changed in Webkit
				window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	},

	/**
	 * 创建canvas画布
	 * @method _createCanvas
	 **/
	_createCanvas: function() {
		var _self = this;
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute("data-id", Date.now());
		if (!this.canvas.getContext) {
			alert("您的浏览器不支持canvas");
			return;
		}
		this.context = this.canvas.getContext('2d');
		this.canvas.width = this.wrapWidth;
		this.canvas.height = this.wrapHeight;
		// var oBody=document.getElementsByTagName('body')[0];
		var oBody = document.getElementById("coincav");
		oBody.appendChild(this.canvas);
		this._createCacheCanvas();
	},

	_createCacheCanvas: function() {
		var _self = this;
		this.cacheCanvas = document.createElement('canvas');
		this.cacheContext = this.cacheCanvas.getContext('2d');
		this.cacheCanvas.width = this.wrapWidth;
		this.cacheCanvas.height = this.wrapHeight;
		this.coinImg = new Image();
		this.coinImg.src = this.settings.coinSrc;
		this.coinImg.onload = function() {
			_self._startCacheCanvasAnim();
		}
	},


	/**
	 * 执行金币绘制动画
	 * @method _startCanvasAnim
	 **/
	_startCacheCanvasAnim: function() {
		var _self = this;
		var availWidth = this.cacheCanvas.width - this.coinWidth;
		var availHeight = this.cacheCanvas.height - this.coinHeight;
		//var disX=availWidth/this.density;  //每个硬币X轴的间距
		var coinRange = availWidth * this.density / (this.density + 15);
		var rangeStart = (availWidth - coinRange) / 2;
		var g = 9.8 * 280; //重力加速度
		var bPlayAudio = false;

		var coinAttrArr = []; //存储金币下落过程中的一些属性参数
		for (var i = 0; i < _self.density; i++) {
			coinAttrArr[i] = {
				rndX: Math.random(), //存储金币开始降落x轴随机值
				rndOrder: Math.round(Math.random() * _self.timeLag / 17), //存储金币撒落顺序的一个数组
				time: 0, //存储金币绘制的具体时间
				top: 0, //存储金币绘制距离顶部的距离
				left: 0, //存储金币弹起后距离左边的距离
				endSpeed: 0, //存储金币第一次接触地面的速度
				bEnd: false, //存储金币是否触碰到地面
				reDownSpeed: 0, //存储金币弹起后重新降落的速度
				reDownHDelta: Math.random() * 100 + 250, //存储金币弹起的高度参数，随机值250~350之间
				rndOffsetX: Math.random() * 0.06 + 0.97 //存储金币x轴的偏移量，随机值0.97~1.03之间
			}
		}

		var startTime = Date.now(); //开始绘制前的时间  
		function draw() {

			var drawStart = Date.now(); //记录重绘的结束事件
			var diff = (drawStart - startTime) / 1000; //计算每次重绘所需要的事件，单位为秒
			startTime = drawStart; //结束事件传给开始事件
			_self.context.clearRect(0, 0, _self.canvas.width, _self.canvas.height); //清除画布，方便重绘
			_self.cacheContext.clearRect(0, 0, _self.cacheCanvas.width, _self.cacheCanvas.height); //清除画布，方便重绘
			_self.cacheContext.save();

			//根据金币个数循环绘制金币
			for (var i = 0; i < _self.density; i++) {
				if ((coinAttrArr[i].rndOrder == 0 && coinAttrArr[i].time == 0)) { //如果顺序为0，表示开始下落，同时下落的初始时间为0时，赋值初始时间
					coinAttrArr[i].time = diff;
				}
				if (coinAttrArr[i].time > 0) { //如果初始事件大于0，表示已经在下落过程中,则每次的初始时间递增
					coinAttrArr[i].time = coinAttrArr[i].time + diff;
				}
				if (coinAttrArr[i].rndOrder == 0) { //如果顺序为0，开始下落，则开始绘制金币
					if (!coinAttrArr[i].bEnd) { //金币下落（过程一），自由落体运动
						coinAttrArr[i].top = g * Math.pow(coinAttrArr[i].time, 2) / 2 - _self.coinHeight; //自由落体加速度运动，求下落的高度
						//coinAttrArr[i].left=disX*coinAttrArr[i].rndX+i*disX;
						coinAttrArr[i].left = coinRange * coinAttrArr[i].rndX + rangeStart;
					} else if (coinAttrArr[i].endSpeed == 0) { //金币弹起后在空中重新下落（过程三）
						coinAttrArr[i].reDownSpeed = coinAttrArr[i].reDownSpeed * 1.1;
						coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].reDownSpeed;
						coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
					} else { //金币弹起（过程二）
						coinAttrArr[i].endSpeed = -Math.abs(coinAttrArr[i].endSpeed * 0.96);
						if (Math.abs(coinAttrArr[i].endSpeed) < 1) coinAttrArr[i].endSpeed = 0;
						coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].endSpeed;
						coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
					}

					//金币第一次降落超过地面时，将其高度设置和地面齐平
					if (coinAttrArr[i].top > _self.cacheCanvas.height - _self.coinHeight && !coinAttrArr[i].bEnd) {
						coinAttrArr[i].top = _self.cacheCanvas.height - _self.coinHeight;
					}

					//金币落地时，计算落地的速度
					if (coinAttrArr[i].top == _self.cacheCanvas.height - _self.coinHeight) {
						coinAttrArr[i].endSpeed = g * coinAttrArr[i].time / coinAttrArr[i].reDownHDelta;
						coinAttrArr[i].reDownSpeed = coinAttrArr[i].endSpeed / 10;
						coinAttrArr[i].bEnd = true;
					}

					//绘制金币
					_self.cacheContext.drawImage(_self.coinImg, coinAttrArr[i].left, coinAttrArr[i].top, _self.coinWidth, _self.coinHeight);
				}
				coinAttrArr[i].rndOrder = coinAttrArr[i].rndOrder == 0 ? 0 : coinAttrArr[i].rndOrder - 1; //顺序每一次重绘则递减一次，直到为0时，代表开始下落
			}
			_self.cacheContext.restore();

			_self.context.drawImage(_self.cacheCanvas, 0, 0, _self.canvas.width, _self.canvas.height);

			var firstH = _self._maxNum(coinAttrArr, "top"); //求降落过程中高度最大的金币高度
			if (firstH >= _self.cacheCanvas.height - _self.coinHeight && !bPlayAudio) {
				_self._playAudio();
				bPlayAudio = true;
			}

			var lastH = _self._minNum(coinAttrArr, "top"); //求降落过程中高度最小的金币高度
			if (lastH <= _self.cacheCanvas.height + _self.coinHeight) { //最后一个金币高度超出canvas的高度停止重绘
				window.requestAnimationFrame(draw); //重绘，递回调用绘制方法
			} else {
				console.log("金币都撒完了");
				$('#coincav').css('display', 'none');
				_self._destory();
			}


		}

		window.requestAnimationFrame(draw); //第一次绘制
	},


	/**
	 * 求最小值
	 * @method _minNum
	 * @param   {arr}    arr  属性数组
	                        {string} attr 数组下的属性名称
	 * @return  {number}      返回数组下属性值最小的值
	**/
	_minNum: function(arr, attr) {
		var tempArr = [];
		for (var i = 0; i < arr.length; i++) {
			tempArr.push(arr[i][attr]);
		}
		return tempArr.sort(function(a, b) {
			return a - b
		})[0];
	},

	/**
	 * 求最大值
	 * @method _minNum
	 * @param   {arr}    arr  属性数组
	                        {string} attr 数组下的属性名称
	 * @return  {number}      返回数组下属性值最大的值
	**/
	_maxNum: function(arr, attr) {
		var tempArr = [];
		for (var i = 0; i < arr.length; i++) {
			tempArr.push(arr[i][attr]);
		}
		return tempArr.sort(function(a, b) {
			return b - a
		})[0];
	},

	/**
	 * 创建音频对象
	 * @method _createAudio
	 **/
	_createAudio: function() {
		this.audio = document.createElement('audio');
		this.audio.setAttribute("preload", "load");
		var oSource = document.createElement('source');
		oSource.setAttribute("src", this.settings.audioSrc);
		oSource.setAttribute("type", "audio/mp3");
		this.audio.appendChild(oSource);
		//var oBody=document.getElementsByTagName('body')[0];
		var oBody = document.getElementById("coincav");
		oBody.appendChild(this.audio);
	},

	/**
	 * 播放音频
	 * @method _playAudio
	 **/
	_playAudio: function() {
		this.audio.play();
	},

	/**
	 * 销毁canvas和audio
	 * @method _destory
	 **/
	_destory: function() {
		// var oBody=document.getElementsByTagName('body')[0];
		var oBody = document.getElementById("coincav");
		oBody.removeChild(this.canvas);
		oBody.removeChild(this.audio);
	}
}

function appupdate(data) {
	//console.log(data[0]['status']);

	if (GversionName == data[0]['status']) {
		//console.log("不用升级");	


	} else {

		console.log("要升级");

		if ("apk" == data[0]['mode']) {
			downloadWgt(Gserver + "/" + Gapkname, "update");
		} else if ("wgt" == data[0]['mode']) {
			downloadWgt(Gserver + "/update.wgt", "update");
		}

	}
}

function checkappupdate() {
	mui.getJSON("manifest.json", null, function(manifest) {
		GversionName = manifest.version.name;
		GversionCode = Number(manifest.version.code);
		getjson("appupdate", "&GversionName=" + GversionName + "&GversionCode=" + GversionCode);
	});
}

function getCpuInfo() {
	var cpuInfo = '/proc/cpuinfo';
	var temp = '',
		cpuHardware;
	var fileReader = plus.android.importClass("java.io.FileReader");
	var bufferedReader = plus.android.importClass("java.io.BufferedReader");
	var FileReader = new fileReader(cpuInfo);
	var BufferedReader = new bufferedReader(FileReader, 8192);
	while ((temp = BufferedReader.readLine()) != null) {
		if (-1 != temp.indexOf('Hardware')) {
			cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
		}
	}
	return cpuHardware;
}

function navgetuuid() {
	var mainActivity = plus.android.runtimeMainActivity();
	var Settings = plus.android.importClass("android.provider.Settings");
	return Settings.Secure.getString(mainActivity.getContentResolver(), Settings.Secure.ANDROID_ID);
}
//判断自身前后台
function checkbackup() {
	document.addEventListener("pause", function() {
		console.log("应用从前台切换到后台");
		//   mui.toast('程序在后台运行');  
	}, false);
	document.addEventListener("resume", function() {
		console.log("应用从后台切换到前台");
		// mui.toast('程序在前台运行');  
	}, false);
}

function getmac() {
	var mac = "xxx-xxx-xxx-xxx";
	if (plus.os.name == "Android") {
		//WifiManager
		var Context = plus.android.importClass("android.content.Context");
		var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
		var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
		var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
		var wifiInfo = wifiManager.getConnectionInfo();
		mac = wifiInfo.getMacAddress();
		//alert(mac);   
	}
	return mac;
}

function checknetwork() {
	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		alert("网络异常，请检查网络设置！");

	} else {
		// mui.toast("网络正常");  
	}
}
//微信提现
function wxtx(actionx, token, amount) {
	var myurl = "http://mm.dqu360.com/api/alipay.aspx?token=" + token +
		"&action=save&FokeMode=%E5%BE%AE%E4%BF%A1%E6%8F%90%E7%8E%B0&passwordTo=&Amount=" + amount + "&isAsyn=1";
	console.log("myurl is:" + myurl);
	//return;
	$.ajax({
		type: "get",
		url: myurl, //+"&appid="+plus.push.getClientInfo().appid 
		async: true,
		//data:{action:"save",FokeMode:"微信提现",passwordTo:"",Amount:"1",isAsyn:"1"}, 
		dataType: "json", // 因为PHP返回数据是JSON格式，所以这里类似要用JSON
		success: function(data) {
			console.log("nei " + data);
			eval(actionx + '(data)');
		},
		error: function(xhr, type, errorThrown) {
			console.log(errorThrown);
		}
	})
}

var jup_request = (type, path, isAsync, param) => {
	var domain = 'http://47.240.57.96:9999/'
	// var domain = 'http://repo.natapp1.cc/'
	var path = path
	var url = domain + path
	var strParam = JSON.stringify(param)
	axios.get('../json/user.json').then(response => {
		console.log(response.data);
	}, response => {
		console.log("error");
	});
}
