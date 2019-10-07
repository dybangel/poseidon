document.addEventListener( "plusready",  function()
{
    var _BARCODE = 'dianquplug',
		B = window.plus.bridge;
    var plugintest = 
    {
        get_public_key:function(){
         return B.execSync(_BARCODE, "get_public_key",[] );//[ Argus1]
        },
        get_private_key:function(){
         return B.execSync(_BARCODE, "get_private_key",[] );//[ Argus1]
        },
        getimei:function()
        {
      //  callbackID = B.callbackId(success, fail);
            //exesync 调用的原生函数，原生部分可以直接返回，不需要回调
           return B.execSync(_BARCODE, "getimei",[] );//[ Argus1]

        },
        getmac:function(Argus, successCallback, errorCallback){
        	var success = typeof successCallback !== 'function' ? null : function(args)
        			{
        				successCallback(args);
        			},
        			fail = typeof errorCallback !== 'function' ? null : function(code)
        			{
        				errorCallback(code);
        			};
        			callbackID = B.callbackId(success, fail);
        			return B.exec(_BARCODE, "getmac", [callbackID, Argus]);
        },
    	p2 : function (Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback )
    		{
    			var success = typeof successCallback !== 'function' ? null : function(args)
    			{
    			alert("success");
    				successCallback(args);
    			},
    			fail = typeof errorCallback !== 'function' ? null : function(code)
    			{
    			    			alert("error");

    				errorCallback(code);
    			};
    			callbackID = B.callbackId(success, fail);
    			//alert("callbackid is:"+callbackID);

    			return B.execSync(_BARCODE, "PluginTestFunction_2", [callbackID, Argus1, Argus2, Argus3, Argus4]);
    		},
    	PluginTestFunction : function (Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback ) 
		{
			var success = typeof successCallback !== 'function' ? null : function(args) 
			{
				successCallback(args);
			},
			fail = typeof errorCallback !== 'function' ? null : function(code) 
			{
				errorCallback(code);
			};
			callbackID = B.callbackId(success, fail);

			return B.exec(_BARCODE, "PluginTestFunction", [callbackID, Argus1, Argus2, Argus3, Argus4]);
		},
		PluginTestFunctionArrayArgu : function (Argus, successCallback, errorCallback ) 
		{
			var success = typeof successCallback !== 'function' ? null : function(args) 
			{
				successCallback(args);
			},
			fail = typeof errorCallback !== 'function' ? null : function(code) 
			{
				errorCallback(code);
			};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE, "PluginTestFunctionArrayArgu", [callbackID, Argus]);
		},		
        PluginTestFunctionSync : function (Argus1, Argus2, Argus3, Argus4) 
        {                                	
            return B.execSync(_BARCODE, "PluginTestFunctionSync", [Argus1, Argus2, Argus3, Argus4]);
        },
        PluginTestFunctionSyncArrayArgu : function (Argus) 
        {                                	
            return B.execSync(_BARCODE, "PluginTestFunctionSyncArrayArgu", [Argus]);
        }
    };
    //封装plus插件 给js调用
    window.plus.plugintest = plugintest;
    window.plus.dianquapi=plugintest;

}, true );