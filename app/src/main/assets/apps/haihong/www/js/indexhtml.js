var app = new Vue({
	el: '#indexnew',
	data: {
		applist: '',
		coin: '',
		balance: '',
		deviceId: '',
		userId: '',
		nickName:'',
		img:''
	},
	mounted() {
		var that = this;
		this.get_device_identifier();
		mui.plusReady(function() {
			that.plusReady();
		})
	},
	methods: {
		//obtain device identifier
		get_device_identifier() {
			var that = this;
			mui.plusReady(function() {
				plus.device.getInfo({
					success: function(e) {
						var zzz = '869863486208367,862836408208365';
						var imeiHead = 'dqprop01h2' + zzz.match('^[^,]*(?=,)');
						// var imeiHead = 'dqprop01h2' + e.imei.match('^[^,]*(?=,)');
						var str0 = zzz.match('^[^,]*(?=,)');
						str0 = JSON.stringify(str0[0]);
						var str = str0.substring(1, 3);
						var str1 = str.charAt(0) + str.charAt(0).charCodeAt();
						var str2 = str.charAt(1) + str.charAt(1).charCodeAt();
						var str3 = str1 + str2;
						var str4 = str3.substring(0, 5);
						that.deviceId = imeiHead + str4;
						that.get_data();
					},
					fail: function(e) {
						console.log('请先允许权限');
					}
				});
			});
		},
		//net work request when opening app 
		get_data() {
			var that = this;
			let param = {
				"machineCode": this.deviceId
			}
			//get user ID from machine code
			get_json('POST', 'login/get_user_id', true, param).then(function(res) {
				if (res.code == 0) {
					that.userId = res.result.userId;
					// that.nickName =
					let userId = res.result.userId;
					let param = {
						"userId": userId
					};
					//get user information from userId
					get_json('POST', 'user/get_user_info', true, param).then(function(res) {
						if (res.code == 0) {

						} else {
							check_res(res.code, res.message)
						}
					});
					//get app list from userid
					get_json('POST', 'task/get_task_list', true, param).then(function(res) {
						if (res.code == 0) {
							that.applist = res.result;
						} else {
							check_res(res.code, res.message);
						}
					});
					//get home information
					get_json('POST', 'home/get_home_info', true, param).then(function(res) {
						if (res.code == 0) {
							that.balance = res.result.balance;
							that.coin = res.result.coin;
							that.nickName = res.result.userName;
							that.img = res.result.icon;
							sql_getgonggao(res.result.news);
						} else {
							check_res(res.code, res.message)
						}
					});
				} else {
					check_res(res.code, res.message)
				}
			});
		},
		plusReady(){
			var that = this;
			checknetwork();
			Gmainviewid = plus.webview.currentWebview().id;
			// function hx_app(have, schema, packgename, zhname, durl) {
			// 	if ("1" == have) {
			// 		mui.toast("正在为您打开 " + zhname);
			// 		plus.runtime.openURL(schema, packgename);
			// 		//调用增加金币函数
			// 		//addcoins(5); 
			// 		var par = " @userid=N'" + Guserid + "',@taskid=N'" + Hwakeup_taskid + "',@coins=N'100'";
			// 		console.log("wakeup............." + par);
			// 		getjson('wakeuptask', par);
			
			// 		//console.log("now coins is:"+Gcoins_json[0].coins);
			// 	} else {
			// 		mui.toast("您还没有安装\"" + zhname + "\" 正在为您自动下载");
			// 		downloadWgt(durl, "downloadcb()");
			// 	}
			
			// }

			checkappupdate();
			
			Gmainview = plus.webview.getWebviewById(Gmainviewid);
			Glistview = plus.webview.getWebviewById('./tasklist.html')
			Gdeatilview = plus.webview.getWebviewById('./taskdeatil.html');
				
			mui("body").on("tap", ".event_kuaisu", function() {
				var data = {
					'Gmainviewid': Gmainviewid,
					'TaskerModel': "快速任务",
					'userId': that.userId
				};
			
				openwin_plus("./tasklist.html", data);
			});
			//block1
			mui("body").on("tap", ".event_userinfo", function() {
				var data = {
					'Gmainviewid': Gmainviewid,
					'userId': that.userId,
					'balance': that.balance,
					'nickName': that.nickName,
					'deviceId': that.deviceId,
					'img': that.img
				};
				openwin_plus("userinfo.html", data);
			});
			//event_xinshoujiaocheng
			mui("body").on("tap", ".event_xinshoujiaocheng", function() {
				var datas = {
					"Gmainviewid": Gmainviewid,
					"asdf": "asdf"
				};
				openwin_plus("xinshoujiaocheng.html", datas);
			});
			//event_readnews
			mui("body").on("tap", ".event_readnews", function() {
				var datas = {
					"Gmainviewid": Gmainviewid,
					"asdf": "asdf"
				};
				openwin_plus("readnews.html", datas);
			});
			//event_tixian
			mui("body").on("tap", ".event_tixian", function() {
				var data = {
					'userId': that.userId,
					'deviceId':that.deviceId
				};
				openwin_plus("tixianlist.html", data);
			});
		},
		to_taskdetail(e){
			var that = this;
			var datas = {
				"Gmainviewid": Gmainviewid,
				'userId': this.userId,
				'taskdata': e
			};
			var taskId = e.taskId;
			let param = {
				'userId': this.userId
			};
			//判断是否领取过任务
			get_json('POST', 'task/check_have_task', true, param).then(function(res) {
				if (res.code == 0) {
					//如果有任务
					if (res.result) {
						plus.nativeUI.toast('请先放弃已领取的任务');
					} else {
						//如果没任务直接领取
						let param = {
							'userId': that.userId,
							'taskId': taskId
						};
						console.log(JSON.stringify(param));
						get_json('POST', 'task/get_task', true, param).then(function(res) {
							if (res.code == 0) {
								openwin_plus("./taskdeatil.html", datas);
							} else {
								check_res(res.code, res.message);
							}
						});
					}
				} else {
					check_res(res.code, res.message);
				}
			});
		},
		cl_st(){
			plus.nativeUI.toast('敬请期待')
		},
		cl_userinfo(){
			var that = this;
			var data = {
				'Gmainviewid': Gmainviewid,
				'userId': that.userId,
				'balance': that.balance,
				'nickName': that.nickName,
				'deviceId': that.deviceId,
				'img': that.img
			};
			openwin_plus("userinfo.html", data);
		}
	}
})

//微信提现回调
function weichat_tixian(data) {
	//console.log("this is wxtx callback");
	//console.log("data is:"+data);
	//printobj(data);
	//	 key=success  value=false at js/myfun.js:388
	// key=type  value=alert at js/myfun.js:388
	// key=tips  value=提现次数已超过限制,每日最多允许提现1次 at
	if ("false" == data['success']) {
		alert(data['tips']);
	} else if ("true" == data['success']) {
		alert("微信提现成功，请查看您的收益");
	}
}

function wakeuptask(data) {
	//printobj(data[0]);
	if (data[0]['states'] == 'nocoins') {

	} else {
		$('#coincav').css('display', 'block');
		var coin = new Coin();
		getdate();
	}
}
//全局保存用户信息
// function Stored_SaveUsers(data) {
// 	// if ("undefined" == typeof(data[0]['UserID'])) {
// 	// 	//不等于undefined，说明变量里有status，只有Null的时候才会这样返回
// 	// 	alert("您的手机与平台存在兼容性冲突！\n机器码是:" + uuid);
// 	// 	plus.runtime.quit();
// 	// }

// 	Guserid = data[0].UserID;

// 	$('#yaoqingma')[0].innerHTML = "" + data[0].UserID;
// 	$('#UserName')[0].innerHTML = "用户:" + data[0].Nickname;
// 	GNickname = data[0].Nickname;
// }
//查询会员是否存在 
// function Stored_FindMember(data) {
// 	mydebug("this is stored_findmember callback....");
// 	//printobj(data[0]);
// 	if ("0" == data[0]['isDisplay']) {
// 		alert("账户已停用！");
// 		plus.runtime.quit();
// 	}
// 	if ("undefined" == typeof(data[0]['status'])) {

// 		GstrMobile = data[0]['strMobile'];
// 		GAlipayChar = data[0]['AlipayChar'];
// 		GAlipayname = data[0]['Alipayname'];
// 		Guserid = data[0]['UserID'];
// 		GNickname = data[0]['Nickname'];

// 		//唤醒任务相关
// 		mydebug("执行getdate", sql);
// 		getdate();
// 		// checksn();
// 	} else {
// 		//
// 		//用户不存在
// 		//alert('用户不存在');
// 		//新建用户
// 		var par = " @ParentID=N'0',@AuthorizationType=N'" + 'Define' + "',@AuthorizationKey=N'" + AuthorizationKey +
// 			"',@DeviceType=N'" + DeviceType + "',@DeviceCode=N'" + DeviceCode + "',@DeviceIdentifier=N'" + DeviceIdentifier +
// 			"',";
// 		par += "@DeviceModel=N'" + DeviceModel + "',@DeviceChar=N'" + DeviceChar + "',@MacChar=N'" + MacChar +
// 			"',@strTokey=N'" + strTokey + "',@UserName=N'" + UserName + "',@Password=N'" + Password + "',";
// 		par += "@PasswordTo=N'" + PasswordTo + "',@Nickname=N'" + Nickname + "',@Thumb=N'" + Thumb +
// 			"',@strMobile=N'',@strEmail=N'',@strWeChat=N'',@Fullname=N'',@AlipayChar=N'',@Alipayname=N''";
// 		//console.log("exec [Stored_SaveUsers] "+par);
// 		getjson('Stored_SaveUsers', par);
// 		//弹出拜师界面
// 		// baishi('open');
// 	}
// }
//查询用户信息
// function Stored_FindUserLogin(data) {
// 	$('#yaoqingma')[0].innerHTML = "" + data[0].UserID;
// 	$('#Amount')[0].innerHTML = data[0].Amount + " 元";
// 	$('#BonusAmount')[0].innerHTML = data[0].BonusAmount + " 元"
// 	$('#UserName')[0].innerHTML = "用户:" + data[0].UserName;
// }

//UserID
//getjson('procedure',"[Stored_FindMember] @DeviceType=N'iOS',@DeviceIdentifier=N'6032b4cb4ef976e26a9e98d7cf443a7695242ceb'");
//getjson('Stored_FindUserLogin'," @strKey=N'133292EF159E4D1082CDA02F'");
//拜师界面open close
// function baishi(state) {
// 	if ('open' == state) {
// 		$('.login-alert').css('display', 'block');
// 	} else if ('close' == state) {
// 		$('.login-alert').css('display', 'none');
// 	}

// }
//获取设备信息
// function getdeviceinfo() {
// 	var imei = replaceall(plus.device.imei, ',', '');
// 	mydebug("imei is" + imei);

// 	uuid = replaceall(plus.device.uuid, ',', '');
// 	if ("null" == uuid) {
// 		//uuid=navgetuuid();
// 		alert("程序检测您的手机硬件标识信息异常！\n请尝试其他手机终端");
// 		plus.runtime.quit();
// 	}


// 	var imsi = plus.device.imsi;
// 	mydebug("imsi is:" + imsi);
// 	if ("" == imsi) {
// 		imsi = imei;
// 		mydebug("imsi change is:" + imsi);
// 	}

// 	// DeviceIdentifier = uuid;

// 	strTokey = uuid;
// 	UserName = "HH" + uuid; //imsi.toString().substring(0,8);
// 	mydebug("username is:" + UserName);

// 	DeviceModel = plus.device.vendor + " " + plus.device.model; //huawei
// 	mydebug("devicemodel is:" + DeviceModel);
// 	DeviceChar = plus.os.version; // 安卓版本8.0.0
// 	mydebug("devicechar is:" + DeviceChar);
// 	DeviceType = plus.os.name; //系统类型 android
// 	mydebug("devicetype is:" + DeviceType);
// 	AuthorizationKey = "HH" + imei;
// 	mydebug("authorizationkey is" + AuthorizationKey);
// 	DeviceCode = imsi;
// 	mydebug("devicecode is:" + imsi);

// 	Password = "7df621ac0f16ed886d368f1c";
// 	PasswordTo = "7df621ac0f16ed886d368f1c";
// 	Nickname = "HH" + imsi.toString().substring(0, 8);
// 	mydebug("nickname is:" + Nickname);
// 	Thumb = "/file/user/default.png";

// 	strMobile = '';
// 	strEmail = '';
// 	strWeChat = '';
// 	Fullname = '';
// 	AlipayChar = '';
// 	Alipayname = '';
// 	MacChar = getmac();
// 	mydebug("macchar is:" + MacChar);
// 	// if("02:00:00:00:00:00"==MacChar){
// 	//	MacChar=getmac1();
// 	// }
// 	strIP = "";
// 	cityname = "";
// 	//读取mac http://ask.dcloud.net.cn/article/35355
// 	//alert( "OS language: " + plus.os.language ); //zh_cn
// 	//alert( "Device: " + plus.device.model );//FRD-AL10
// }
//获取硬件mac
// function getmac1() {
// 	//6.0+
// 	var BufferedReader = plus.android.importClass("java.io.BufferedReader");
// 	var FileReader = plus.android.importClass("java.io.FileReader");
// 	var file = new FileReader("/sys/class/net/wlan0/address");
// 	var reader = new BufferedReader(file, 256);
// 	var mac = reader.readLine();
// 	//alert('mac is:'+mac);
// 	return mac;

// 	//7.0+
// 	var NetworkInterface = plus.android.importClass("java.net.NetworkInterface");
// 	var networkInterface = NetworkInterface.getByName("eth1");
// 	networkInterface = NetworkInterface.getByName("wlan0");
// 	var mac = networkInterface.getHardwareAddress();
// 	//alert("mac:"+mac);
// 	return mac;
// }


//var oglHeight = document.querySelector("body").offsetHeight;
//var windowSizeChange = function () {
//  var tempHeight = document.querySelector("body").offsetHeight;
//	console.log("tempHeight is:"+tempHeight);
//	console.log("oglHeight is:"+oglHeight);
//  if(tempHeight == oglHeight) {
//      console.info("屏幕键盘隐藏");
//      // 这里自己添加逻辑
//  } else {
//      console.info("键盘显示");
//     // $('alert-bg').css('margin-top','-10px');
//      // 这里自己添加逻辑
//  }
//};
// function sql(data) {
// 	alert(data[0]['status']);
// }

// function sql_saveuser(data) {
// 	baishi('close');
// 	location.reload();
// 	//console.log("this is sql_saveuser callback");
// }

function showmessage(title, content) {
	var btnArray = ['否', '是'];
	var message = "<h4>" + content + "</h4>";

	mui.confirm(message, title, btnArray, function(e) {

		if (e.index == 1) {
			var data = {
				"Gmainviewid": Gmainviewid,
				'UserID': Guserid,
				'DeviceType': DeviceType,
				'GNickname': GNickname,
				'DeviceCode': DeviceCode,
				'MacChar': MacChar,
				'strIP': strIP,
				'cityname': cityname,
				'strTokey': strTokey
			};
			openwin_plus("mobilereg.html", data);
		} else {
		}
	}, 'div');
}

function sql_getgonggao(data) {
	//公告 swiper-container-horizontal
	$('.event_gonggao')[0].innerHTML = "【公告】" + data;
	var swiper = new Swiper('.swiper-container-horizontal', {
		direction: 'horizontal',
		//direction: 'vertical',
		loop: true,
		speed: 50000,
		slidesPerView: 1, //slide可见数量
		//autoplay:1,
		// freeMode:true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true, //修改swiper的父元素时，自动初始化swiper
		//spaceBetween: 30,
		//centeredSlides: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: true,
		},
		// navigation: {
		//  nextEl: '.swiper-button-next',
		//  prevEl: '.swiper-button-prev',
		//  hideOnClick: true,
		//   disabledClass: 'my-button-disabled',
		//   hiddenClass: 'my-button-hidden'
		// } 
	});
}

//轮播图代码
var swiper = new Swiper('.swiper-container-vertical', {
	direction: 'vertical',
	loop: true,
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true, //修改swiper的父元素时，自动初始化swiper
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	//    pagination: {
	//      el: '.swiper-pagination',
	//      clickable: true,
	//    },
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		hideOnClick: true,
		disabledClass: 'my-button-disabled',
		hiddenClass: 'my-button-hidden'
	}
});

//初始化唤醒任务状态
function sql_initwakeup_task(data) {
	var coins = data[0]['coins'];
	var serverdate = data[0]['nowdate'];
	//将金币信息更新到页面上
	//console.log("coins is------"+coins);
	$('#coins')[0].innerHTML = coins;
	//	//如果WakeupAppStr为空那么初始化并同步到服务器，记录全局变量，方便后面使用
	//	if(null==data[0]['WakeupAppStr']||''==data[0]['WakeupAppStr']){
	//	console.log("WakeupAppStr is null"); 
	//		var wakeup_info_json=[
	//	{"name":"douyin","wakeupstate":"0","date":serverdate},
	//	{"name":"xiguashipin","wakeupstate":"0","date":serverdate},
	//	{"name":"huoshanshipin","wakeupstate":"0","date":serverdate},
	//	{"name":"pinduoduo","wakeupstate":"0","date":serverdate},
	//	{"name":"youku","wakeupstate":"0","date":serverdate},
	//	{"name":"uc","wakeupstate":"0","date":serverdate},
	//	{"name":"baidu","wakeupstate":"0","date":serverdate},
	//	{"name":"taobao","wakeupstate":"0","date":serverdate}];
	//	var sql="&sql=update fooke_user set coins=0,WakeupAppStr='"+JSON.stringify(wakeup_info_json)+"' where userid='"+Guserid+"'";
	//	console.log("sql is:"+sql);
	//	getjson("sql_initWakeupAppStr",sql);
	//	Gwakeup_info_json=wakeup_info_json;
	//	
	//	}else{
	//	//反之读取WakeupAppStr 记录给全局变量，方便后面使用	
	//	console.log("WakeupAppStr is have");
	//	Gwakeup_info_json=data[0]['WakeupAppStr'];
	//	}
	//	console.log("Gwakeup_info_json is:"+Gwakeup_info_json);
	//	
	//	
	//
	//	
	//	
	//	
	//
	//	
	//	var coins_json=[{"coins":coins,"nowdate":serverdate}];
	//	
	//	
	//	
	//	
	//	Gcoins_json="";
	//	Gwakeup_info_json=""; 
	//	
	//	//plus.storage.removeItem("coins_json");
	//	var Gcoins_json_str=plus.storage.getItem("coins_json");
	//	if(null==Gcoins_json_str){
	//		//如果没有金币信息，则初始化
	//		console.log("Gcoins_json_str is null....write init"); 
	//		plus.storage.setItem("coins_json",JSON.stringify(coins_json));
	//		plus.storage.setItem("wakeup_info_json",JSON.stringify(wakeup_info_json));
	//	}else{ 
	//		//如果有金币信息，则读取，并付给全局变量,然后进行对比
	//		//console.log("coinjson is have is"+Gcoins_json_str);
	//		Gcoins_json=JSON.parse(Gcoins_json_str);
	//		Gwakeup_info_json=JSON.parse(plus.storage.getItem("wakeup_info_json"));
	//		console.log("Gconis_json is:"+Gcoins_json);
	//		console.log("Gwakeup_info_json is:"+Gwakeup_info_json);
	//		if(Gcoins_json[0]['nowdate']==serverdate){
	//		//如果服务器时间和本地存储的时间一样	
	//		console.log("时间一致");
	//		
	//		}else{
	//		//如果服务器时间和本地存储的时间不一样，说明是第二天了
	//		//初始化唤醒记录
	//		console.log("时间不一致");
	//		plus.storage.setItem("wakeup_info_json",JSON.stringify(wakeup_info_json));
	//		}
	//		
	//		
	//		for(i=0;i<Gcoins_json.length;i++){
	//			//printobj(Gcoins_json[i]);
	//		} 
	//	} 
	//	//console.log("delme.................."+datas.length);
	//	//datas[0].name="douyin_gai";
	//	
	//	
	//	//printobj(datas.length);
}



