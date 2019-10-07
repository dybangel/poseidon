package com.bridge.H5PlusPlugin;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;


/**
 * 5+ SDK 扩展插件示例
 * 5+ 扩扎插件在使用时需要以下两个地方进行配置
 * 		1  WebApp的mainfest.json文件的permissions节点下添加JS标识
 * 		2  assets/data/properties.xml文件添加JS标识和原生类的对应关系
 * 本插件对应的JS文件在 assets/apps/H5Plugin/js/test.js
 * 本插件对应的使用的HTML assest/apps/H5plugin/index.html
 * 
 * 更详细说明请参考文档http://ask.dcloud.net.cn/article/66
 * **/
public class PGPlugintest extends StandardFeature
{   

    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {
        
        /**
         * 如果需要在应用启动时进行初始化，可以继承这个方法，并在properties.xml文件的service节点添加扩展插件的注册即可触发onStart方法
         * */
    }
    public String get_private_key(IWebview pWebview, JSONArray array){   //,

     //   String ReturnValue="我是插件1";
        String ReturnValue="MIICXAIBAAKBgQCXF3UtKoitGrRaAyLAHhXzBQbv58GdMK9llS7zn2EZ7LnG4sqc" +
                "4U5KgEX+WeB9qP7lw1cklxh1BoTIeZl0TCmF5otCuN6r+4uxQKNI5DcMRgSM9zMo" +
                "eFPX1jF8cUijB8nxixl58xz6yoVMz8XTGQ9piR8lVLoFHTYHtnRE6ZV6YwIDAQAB" +
                "AoGAKePNDvqt7iBrRFF+PvmYaEpKhBUjLuuilW1pGQ5lI4TodOXH+vrUc/9gaIaO" +
                "oQhLs3QXIwPpOfjWs6ZTD1VWZWQmTveDBatV+wHwFmWeLFTReELIYXbi22Ylqkmj" +
                "MBau/TU15nUlt/D7IXo7eVlAdimBZIl4KHaexky1I4X1UJECQQDwWk9SG7O79dEH" +
                "6z5KfiSf8WZaZpHW3x3A/O8fWfJUh4SpY6yhRGtG0eUvP/mY+ElAR6EiIfrZjiB2" +
                "LmG7jG9tAkEAoO2IU4tNCCnkR8dk1OOC3n2X4sHDsrmIyOldvJg+Nqr/H9PmsZCw" +
                "yH9EuRvu59h3PkgA7k7cqSo3DzG8lpffDwJBAIbjaBjAi0I1VraHA1JzMMLCi5q4" +
                "baiVVvF0Ag8qP6HI3F7kHYH0D/CS43h9AusijJmSmY+6Wjm2Vel9ZkQHMJECQGlQ" +
                "qbvK2QGzsKJM2i78KSQD20dZeQHYq6yYFHEczPIn28hve3TO9PJxX38oyaNOpVLL" +
                "+lf6oivO5bN64ClJgH8CQHkxKUEizrsYmBY06+ebZ7OVw+O18dV4u39duCUZ5PUD" +
                "IAR6SOiuWUNwqp3SKUSDzgVNs9f5dxRTBSuSbnGjbyU=";
        return JSUtil.wrapJsVar(ReturnValue,true);
    }
    public String get_public_key(IWebview pWebview, JSONArray array){   //,

        String ReturnValue="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXF3UtKoitGrRaAyLAHhXzBQbv" +
                "58GdMK9llS7zn2EZ7LnG4sqc4U5KgEX+WeB9qP7lw1cklxh1BoTIeZl0TCmF5otC" +
                "uN6r+4uxQKNI5DcMRgSM9zMoeFPX1jF8cUijB8nxixl58xz6yoVMz8XTGQ9piR8l" +
                "VLoFHTYHtnRE6ZV6YwIDAQAB";
        return JSUtil.wrapJsVar(ReturnValue,true);
    }
    public String getimei(IWebview pWebview, JSONArray array){   //,

        String ReturnValue="我是插件1";
     //   String ReturnValue="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXF3UtKoitGrRaAyLAHhXzBQbv";// +
        return JSUtil.wrapJsVar(ReturnValue,true);
    }
    public void getmac(IWebview pWebview, JSONArray array){
        String ReturnString = null;
        String CallBackID =  array.optString(0);
        JSONArray newArray = null;
        try {

            newArray = new JSONArray( array.optString(1));
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);
            ReturnString = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        JSUtil.execCallback(pWebview, CallBackID, ReturnString, JSUtil.OK, false);
    }
    public void PluginTestFunction_2(IWebview pWebview, JSONArray array){
        Log.d("fuck", "+-------------++++++++++++++++++++++++++ ");
    }
    public void PluginTestFunction(IWebview pWebview, JSONArray array)
    {Log.d("fuck2", "222222222+++++++++++++++++++++++++++ ");
    	// 原生代码中获取JS层传递的参数，
    	// 参数的获取顺序与JS层传递的顺序一致
//        String CallBackID = array.optString(0);
//        JSONArray newArray = new JSONArray();
//        newArray.put(array.optString(1));
//        newArray.put(array.optString(2));
//        newArray.put(array.optString(3));
//        newArray.put(array.optString(4));
//        newArray.put("path/1.mp4/plusplugin");
//        // 调用方法将原生代码的执行结果返回给js层并触发相应的JS层回调函数
//        JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);

    }

    public void PluginTestFunctionArrayArgu(IWebview pWebview, JSONArray array)
    {
        String ReturnString = null;
        String CallBackID =  array.optString(0);
        JSONArray newArray = null;
        try {

            newArray = new JSONArray( array.optString(1));          
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);
            ReturnString = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        JSUtil.execCallback(pWebview, CallBackID, ReturnString, JSUtil.OK, false);
    }

    public String PluginTestFunctionSyncArrayArgu(IWebview pWebview, JSONArray array)
    {
        JSONArray newArray = null;
        JSONObject retJSONObj = null;
        try {

            newArray = array.optJSONArray(0);
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);

            retJSONObj = new JSONObject();
            retJSONObj.putOpt("RetArgu1", inValue1);
            retJSONObj.putOpt("RetArgu2", inValue2);
            retJSONObj.putOpt("RetArgu3", inValue3);
            retJSONObj.putOpt("RetArgu4", inValue4);

        } catch (JSONException e1) {
            e1.printStackTrace();
        }       

        return JSUtil.wrapJsVar(retJSONObj);
    }

    public String PluginTestFunctionSync(IWebview pWebview, JSONArray array)
    {
        String inValue1 = "这是原生数值";//array.optString(0);
        String inValue2 = array.optString(1);
        String inValue3 = array.optString(2);
        String inValue4 = array.optString(3);

        String ReturnValue = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        // 只能返回String类型到JS层。
        return JSUtil.wrapJsVar(ReturnValue,true);
    }

}