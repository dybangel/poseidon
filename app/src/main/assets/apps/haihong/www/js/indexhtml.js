var app = new Vue({
	el: '#indexnew',
	data: {
		// applist: '',
		coin: '', //金币
		balance: '', //余额
		deviceId: '', //手机唯一标识
		userId: '', //用户ID
		nickName: '', //昵称
		img: '', //头像
		version: '', //apk版本号
		wgtVersion: '' //热升级包版本号
	},
	mounted() {
		var that = this;
		mui.plusReady(function() {
			that.plusReady();
			that.get_device_identifier();
			that.back_listen();
		})
	},
	methods: {
		//获取设备唯一标识
		get_device_identifier() {
			var that = this;
			plus.device.getInfo({
				success: function(e) {
					console.log("获取手机IMEI号====="+JSON.stringify(e))
					var simulateimei = '869863486208367,862836408208365';
					// var imeiHead = 'dqprop01h2' + simulateimei.match('^[^,]*(?=,)');
					// var str0 = simulateimei.match('^[^,]*(?=,)');
					var imeiHead = 'dqprop01h2' + e.imei.match('^[^,]*(?=,)');
					var str0 = e.imei.match('^[^,]*(?=,)');
					str0 = JSON.stringify(str0[0]);
					var str = str0.substring(1, 3);
					var str1 = str.charAt(0) + str.charAt(0).charCodeAt();
					var str2 = str.charAt(1) + str.charAt(1).charCodeAt();
					var str3 = str1 + str2;
					var str4 = str3.substring(0, 5);
					that.deviceId = imeiHead + str4;
					that.first_open();
				},
				fail: function(e) {
					console.log('请先允许权限');
				}
			});
		},
		first_open() {
			var that = this;
			let param = {
				"machineCode": this.deviceId
			};
			console.log("我是否执行了");
			get_json('POST', 'login/first_open', true, param).then(function(res) {
				if (res.code == 0) {
					that.get_data();
				} else {
					check_res(res.code, res.message)
				}
			});
		},
		get_data() {
			var that = this;
			let param = {
				"machineCode": this.deviceId
			}
			get_json('POST', 'login/get_user_id', true, param).then(function(res) {
				if (res.code == 0) {
					that.userId = res.result.userId;
					console.log("获取用户id====="+that.userId);
					let param1 = {
						"ip": ip,
						"userId": that.userId
					};
					let param = {
						"userId": that.userId
					};
					get_json('POST', 'user/upload_ip', true, param1).then(function(res) {
						if (res.code == 0) {
							console.log("上传用户ip地址====="+ip);
						} else {
							check_res(res.code, res.message)
						}
					});
					get_json('POST', 'user/get_user_info', true, param).then(function(res) {
						if (res.code == 0) {
                            console.log("获取用户信息====="+JSON.stringify(res));
						} else {
							console.log("获取用户信息=====失败");
							check_res(res.code, res.message)
						}
					});
					get_json('POST', 'home/get_home_info', true, param).then(function(res) {
						if (res.code == 0) {
							console.log("获取首页信息====="+JSON.stringify(res));
							that.balance = res.result.balance;
							that.coin = res.result.coin;
							that.nickName = res.result.userName;
							that.img = res.result.icon;
							sql_getgonggao(res.result.news);
						} else {
							console.log("获取用户信息====="+JSON.stringify(res));
							check_res(res.code, res.message)
						}
					});
				} else {
					check_res(res.code, res.message)
				}
			});
		},
		plusReady() {
			checknetwork();
			checkupdate();
			checkbackup();
			var that = this;
			Gmainviewid = plus.webview.currentWebview().id;

			mui("body").on("tap", ".event_hx", function() {
				var data = {
					'Gmainviewid': Gmainviewid,
					// 'TaskerModel': "快速任务",
					'userId': that.userId
				};

				openwin_plus("./tasklist.html", data);
			});
			mui("body").on("tap", ".event_sw", function() {
				var data = {
					'Gmainviewid': Gmainviewid,
					// 'TaskerModel': "快速任务",
					'userId': that.userId
				};

				openwin_plus("./tasklist2.html", data);
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
					'deviceId': that.deviceId,
					"Gmainviewid": Gmainviewid
				};
				openwin_plus("tixianlist.html", data);
			});
		},
		to_taskdetail(e) {
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
		cl_st() {
			plus.nativeUI.toast('敬请期待')
		},
		cl_userinfo() {
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
		},
		back_listen() {
			var that = this;
			window.addEventListener('Listener', function(event) {
				var action = event.detail.action;
				if ("refresh" == action) {
					let param = {
						"userId": that.userId
					};
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
				}
			})
			addScriptTag(
				'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=ip&co=&resource_id=6006&t=1562124098965&ie=utf8&oe=gbk&cb=foo&format=json&tn=baidu'
			);
		}
	}
})

function addScriptTag(src) {
	var script = document.createElement('script');
	script.setAttribute("type", "text/javascript");
	script.src = src;
	document.body.appendChild(script);
}

function foo(data) {
	var json = data.data[0];

	// VM.list.push({
	// 	"title": "位置",
	// 	"value": json.location
	// })
	// VM.list.push({
	// 	"title": "IP地址",
	// 	"value": json.origip
	// })
	ip = json.origip;
};
// function showmessage(title, content) {
// 	var btnArray = ['否', '是'];
// 	var message = "<h4>" + content + "</h4>";

// 	mui.confirm(message, title, btnArray, function(e) {
// 		if (e.index == 1) {
// 			var data = {
// 				"Gmainviewid": Gmainviewid,
// 				'UserID': Guserid,
// 				'DeviceType': DeviceType,
// 				'GNickname': GNickname,
// 				'DeviceCode': DeviceCode,
// 				'MacChar': MacChar,
// 				'strIP': strIP,
// 				'cityname': cityname,
// 				'strTokey': strTokey
// 			};
// 			openwin_plus("mobilereg.html", data);
// 		} else {}
// 	}, 'div');
// }

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
