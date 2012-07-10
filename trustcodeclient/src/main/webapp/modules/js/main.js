var main = function( where ) {
	var tabsNode = $( ".tabs", where );
	var keyManagementTab = undefined;
	var signatureTab = undefined;
	var keyManager = undefined;
	var uiResources = undefined;
	
	var keyManagementModuleLoaded = function() {
		var notificationEvents = {
				onGetKeys : signatureTab.keysGot,
				onGenerateKeyPair : signatureTab.keyPairGenerated
			};
		
		keyManagementTab = keyManagement( $("#keyManagementTab", tabsNode), keyManager, 
										uiResources, notificationEvents );
	};
	
	var signatureModuleLoaded = function() {
		signatureTab = signature( $("#signatureTab", tabsNode), keyManager, uiResources );
		system.moduleLoader.load( "keyManagement", $("#keyManagementTab", tabsNode), keyManagementModuleLoaded );
	};
	
	var keyManagerLoaded = function() {
		system.moduleLoader.load( "signature", $("#signatureTab", tabsNode), signatureModuleLoaded );
	};
	
	var iniKeyManager = function() {
		var getHost = function(href) {
		    var l = document.createElement("a");
		    l.href = href;
		    var ret = l.protocol + '//' + l.host ;
		    return ret;
		};
		
		var serverUrl = 'http://localhost:8180/trustcodeserver/keymanager.html';
	//	var serverUrl = 'http://trustcodeserver-anorimaki.rhcloud.com/keymanager.html';
		
		keyManager = new keymng.CachedClient( getHost(serverUrl), serverUrl, keyManagerLoaded );
	};
	
	var uiResourcesLoaded = function() {
		uiResources = uiAppResources();
		iniKeyManager();
	};
	
	
	system.moduleLoader.load( "uiAppResources", undefined, uiResourcesLoaded );
	tabsNode.tabs();
};
