var user = {
	"name": "刘一帆",
	"withdraw": "20",
	"coin": "300"
}
var applist = [{
	"taskid" : "1001",
	"schema" : "snssdk1128://detail?id=6674528242147413251&gd_label=click_schema_xjys3",
	"packgename" : "com.ss.android.ugc.aweme",
	"zhname" : "抖音",
	"durl" : "https://s9.pstatp.com/package/apk/aweme/app_ame_aiouaisi1_v5.9.0_ac754ef.apk",
	"src": "images/douyin.png"
}, {
	"taskid" : "1002",
	"schema" : "snssdk32://home/news?gd_label=click_schema_xjys27",
	"packgename" : "com.ss.android.article.video",
	"zhname" : "西瓜视频",
	"durl" : "http://fast.yingyonghui.com/963deadbd87c6a079965f58033563984/5cca7381/apk/6428549/958baa3608b4efc574fc8a223afd3e32",
	"src": "images/xiguashipin.png"
}, {
	"taskid" : "1001",
	"schema" : "snssdk1128://detail?id=6674528242147413251&gd_label=click_schema_xjys3",
	"packgename" : "com.ss.android.ugc.aweme",
	"zhname" : "抖音",
	"durl" : "https://s9.pstatp.com/package/apk/aweme/app_ame_aiouaisi1_v5.9.0_ac754ef.apk",
	"src": "images/douyin.png"
}, {
	"taskid" : "1001",
	"schema" : "snssdk1128://detail?id=6674528242147413251&gd_label=click_schema_xjys3",
	"packgename" : "com.ss.android.ugc.aweme",
	"zhname" : "抖音",
	"durl" : "https://s9.pstatp.com/package/apk/aweme/app_ame_aiouaisi1_v5.9.0_ac754ef.apk",
	"src": "images/douyin.png"
}, {
	"taskid" : "1001",
	"schema" : "snssdk1128://detail?id=6674528242147413251&gd_label=click_schema_xjys3",
	"packgename" : "com.ss.android.ugc.aweme",
	"zhname" : "抖音",
	"durl" : "https://s9.pstatp.com/package/apk/aweme/app_ame_aiouaisi1_v5.9.0_ac754ef.apk",
	"src": "images/douyin.png"
}, {
	"taskid" : "1001",
	"schema" : "snssdk1128://detail?id=6674528242147413251&gd_label=click_schema_xjys3",
	"packgename" : "com.ss.android.ugc.aweme",
	"zhname" : "抖音",
	"durl" : "https://s9.pstatp.com/package/apk/aweme/app_ame_aiouaisi1_v5.9.0_ac754ef.apk",
	"src": "images/douyin.png"
}]

// <li class="item event_hx_xiguashipin" taskid="1002" schema="snssdk32://home/news?gd_label=click_schema_xjys27"
//  packgename="com.ss.android.article.video" zhname="西瓜视频" durl="http://fast.yingyonghui.com/963deadbd87c6a079965f58033563984/5cca7381/apk/6428549/958baa3608b4efc574fc8a223afd3e32">
// 	<a target="_blank" class="external alipay">
// 		<img src="images/xiguashipin.png">
// 		<p>西瓜视频</p>
// 	</a>
// </li>
// <li class="item event_hx_huoshanshipin" taskid="1003" schema="snssdk1112://item?id=6666417034265496835&gd_label=click_schema_xjys38"
//  packgename="com.ss.android.ugc.live" zhname="火山视频" durl="http://fast.yingyonghui.com/fcf58b7ab1fedd3c1565067dbf7b7c4f/5cca76d5/apk/6427364/8f7ccfe55b077e47eca376fa4173e2ad">
// 	<a class="external ">
// 		<img src="images/huoshanshipin.png">
// 		<p>火山视频</p>
// 	</a>
// </li>
// <li class="item event_hx_pinduoduo" taskid="1004" schema="pinduoduo://com.xunmeng.pinduoduo/duo_cms_mall.html?pid=8487723_57623320&cpsSign=CM8487723_57623320_79bfd0055839d44efcd00b748b3052e8&duoduo_type=2"
//  packgename="com.xunmeng.pinduoduo" zhname="拼多多" durl="http://a.gdown.baidu.com/data/wisegame/b71e39ec5d9baa06/pinduoduo_45301.apk?from=a1101">
// 	<a class="external ">
// 		<img src="images/pinduoduo.png">
// 		<p>拼多多</p>
// 	</a>
// </li>
// <li class="item event_hx_youku" taskid="1005" schema="youku://weex?source=00002198&url=https%3A%2F%2Fmarket.m.taobao.com%2Fyep%2Fweexmaker%2Fykpage%2Fpigspring_wmdt.js%3Fwh_weex%3Dtrue%26refer%3Dsanfang1903_operation.anne.hxl_00002198_7000_bm2Iz2_19022700&refer=sanfang1903_operation.anne.hxl_00002198_7000_bm2Iz2_19022700"
//  packgename="com.youku.phone" zhname="优酷" durl="http://fast.yingyonghui.com/76cd88e4483f77ae1cf42d6689f97a94/5cca7ac7/apk/6424254/29b69be41d40183139203ef5e4fac8a3">
// 	<a class="external">
// 		<img src="images/youku.png">
// 		<p>优酷</p>
// 	</a>
// </li>
// <li class="item event_hx_uc" taskid="1006" schema="uclink://www.uc.cn/cc77796ca7c25dff9607d31b29effc07?action=open_url&src_pkg=sxmhx&src_ch=sxmhx53&src_scene=pullup&url=ext%3Ainfo_flow_open_channel%3Ach_id%3D100%26insert_item_ids%3D3218119357323753218%26type%3Dmultiple%26from%3D6001"
//  packgename="com.UCMobile" zhname="uc" durl="http://gdown.baidu.com/data/wisegame/580995faf96d5297/UCliulanqi_1022.apk">
// 	<a class="external ">
// 		<img src="images/uc.png">
// 		<p>uc</p>
// 	</a>
// </li>
// <li class="item event_hx_baidu" taskid="1007" schema="baiduboxapp://utils?action=sendIntent&minver=7.4&params=%7B%22intent%22%3A%22intent%3A%23Intent%3Baction%3Dcom.baidu.searchbox.action.HOME%3BS.targetCommand%3D%257B%2522mode%2522%253A%25220%2522%252C%2522intent%2522%253A%2522intent%253A%2523Intent%253BB.bdsb_append_param%253Dtrue%253BS.bdsb_light_start_url%253Dhttp%25253A%25252F%25252Fbaijiahao.baidu.com%25252Fs%25253Fid%25253D1625601765740888148%253Bend%2522%252C%2522class%2522%253A%2522com.baidu.searchbox.xsearch.UserSubscribeCenterActivity%2522%252C%2522min_v%2522%253A%252216787968%2522%257D%3Bend%22%7D&needlog=1&logargs=%7B%22source%22%3A%221021285o%22%2C%22from%22%3A%22openbox%22%2C%22page%22%3A%22other%22%2C%22type%22%3A%22%22%2C%22value%22%3A%22url%22%2C%22channel%22%3A%22%22%2C%22ext%22%3A%22%7B%5C%22sid%5C%22%3A%5C%22%7Bqueryid%7D%5C%22%7D%22%7D"
//  packgename="com.baidu.searchbox" zhname="百度" durl="https://dl001.liqucn.com/upload/2017/293/x/ee96442c7409bf447dd0554ebe133259.apk">
// 	<a class="external ">
// 		<img src="images/baidu.png">
// 		<p>百度</p>
// 	</a>
// </li>
// <li class="item event_hx_taobao" taskid="1008" schema="tbopen://m.taobao.com/tbopen/index.html?source=auto&action=ali.open.nav&module=h5&bootImage=0&spm=2014.ugdhh.2200633263965.10008-2601&bc_fl_src=growth_dhh_2200633263965_10008-2601&materialid=10008&h5Url=https%3A%2F%2Fh5.m.taobao.com%2Fbcec%2Fdahanghai-jump.html%3Fspm%3D2014.ugdhh.2200633263965.10008-2601%26bc_fl_src%3Dgrowth_dhh_2200633263965_10008-2601"
//  packgename="com.taobao.taobao" zhname="淘宝" durl="https://dl001.liqucn.com/upload/2017/277/o/com.taobao.taobao_8.7.0_liqucn.com.apk">
// 	<a class="external ">
// 		<img src="images/taobao.png">
// 		<p>淘宝</p>
// 	</a>
// </li>
