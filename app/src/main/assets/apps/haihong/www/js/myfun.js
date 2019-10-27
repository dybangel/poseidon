//计算data数量的函数
function JSONLength(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

//close current webview
function closeme() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

//need to determine whether there is a network
//main request function
var get_json = (type, path, isAsync, param) => {
	plus.nativeUI.showWaiting("请求中...");
    // var domain = 'http://haihong.dianqu666.online:8888/'
	// var domain = 'http://xiaomage.natapp1.cc/'
	var domain = 'http://192.168.2.69:8888/'
	var path = path
	var url = domain + path
	var strParam = JSON.stringify(param)
	if (type == 'POST') {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: type,
				url: url,
				async: isAsync,
				data: strParam,
				dataType: "json",
				contentType: "application/json",
				success: function(res) {
					plus.nativeUI.closeWaiting();
					resolve(res)
				},
				error: function(res) {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast('网络连接错误,请检查网络');
				}
			})
		})
	} else {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: type,
				url: url,
				async: isAsync,
				dataType: "json",
				success: function(res) {
					plus.nativeUI.closeWaiting();
					resolve(res)
				},
				error: function(res) {
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast('网络连接错误,请检查网络');
				}
			})
		})
	}
}
//check the return result
//need to be extended
var check_res = (code, message) => {
	mui.plusReady(function() {
		plus.nativeUI.toast(message);
	})
}

//打开新窗体优化
function openwin_plus(winpath, par) {
	mui.openWindow({
		url: winpath,
		id: winpath,
		styles: {
			top: '0px',
			bottom: '0px',
		},
		extras: {
			pars: par
		},
		createNew: false,
		show: {
			autoShow: true,
			aniShow: "slide-in-right",
			duration: 50
		},
		waiting: {
			autoShow: false,
			title: '正在拼命加载...',
			options: {
				width: '120px',
				height: '100px',
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
	var action = functions;

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

function openapp(packname, taskType) {
	if (plus.runtime.isApplicationExist({
			pname: packname
		})) {
		plus.runtime.launchApplication({
				pname: packname
			},
			function(e) {
				alert("failed: " + e.message);
			})
		if (taskType == 0) {
			$('.event_finish').removeClass("disabled");
		} else {
			DaoInterval();
		}
	} else {
		plus.nativeUI.toast('打开app失败');
	}
}

function appupdate(data) {
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

function checkupdate() {
	plus.runtime.getProperty(plus.runtime.appid, function(res) {
		var version = plus.runtime.version;
		var wgtversion = res.version;
		app.version = version;
		app.wgtVersion = wgtversion;
		var param = {
			'appVersion': version,
			// 'appVersion': '1.0.2',//hbuilder版本模拟
			'wgtVersion': wgtversion
		};
		console.log("获取软件当前版本====="+JSON.stringify(param))
		get_json('POST', 'home/check_update', true, param).then(function(res) {
			let strRes = JSON.stringify(res.result);
			plus.nativeUI.closeWaiting();
			if (res.code == 0) {
				if (strRes == "null") {
					plus.nativeUI.toast('已是最新版本');
				} else {
					if (res.result.version != version) {
						let url = res.result.downloadUrl;
						downloadWgt(url, 'fakefunction');
					} else {
						let url = res.result.wgtDownloadUrl;
						downloadWgt(url, 'update');
					}
				}
			} else {
				plus.nativeUI.confirm('检查更新失败 请检查网络', function(e) {
					plus.runtime.quit();
				});
				check_res(res.code, res.message)
			}
		});
	});
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

function checknetwork() {
	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		alert("网络异常，请检查网络设置！");
	} else {
		// mui.toast("网络正常");  
	}
}