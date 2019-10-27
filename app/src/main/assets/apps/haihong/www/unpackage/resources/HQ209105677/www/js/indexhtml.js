var app = new Vue({
	el: '#indexnew',
	data: {
		applist: '',
		coin: '',
		balance: '',
		deviceId: '',
		userId: '',
		nickName: '',
		img: ''
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
		plusReady() {
			checknetwork();
			checkupdate();
			
			var that = this;
			Gmainviewid = plus.webview.currentWebview().id;

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
					'deviceId': that.deviceId
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
		}
	}
})

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
		} else {}
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

window.addEventListener('Listener', function(event) {
	var action = event.detail.action;
	if ("refresh" == action) {
		location.reload();
	}
})
//金币特效
window.onload = function() {
	// var oBtn=document.getElementById('btn1');
	init();
	// oBtn.onclick=function(){
	//  var coin=new Coin();        
	//}  

	var SHAKE_THRESHOLD = 400;
	var last_update = 0;
	var index = 0;
	var x = y = z = last_x = last_y = last_z = 0;
	var w_curTime = 0;

	function init() {
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		} else {
			alert('not support mobile event');
		}
	}

	function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if ((curTime - last_update) > 100) {
			var diffTime = curTime - last_update;
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			var delta = Math.abs(x + y + z - last_x - last_y - last_z);

			if (speed > SHAKE_THRESHOLD) {
				if ((curTime - w_curTime) > 2000) {
					w_curTime != 0 && new Coin({
						density: Math.round(delta)
					});
					w_curTime = curTime;
				}
			}

			last_x = x;
			last_y = y;
			last_z = z;
		}
	}

}
